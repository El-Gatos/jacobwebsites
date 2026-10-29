import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Exercise the actual handler with browser dependencies replaced, without sending mail.
const source = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8');
const handler = source.slice(source.indexOf('  async function submitInquiry(e) {'), source.indexOf('\n  return (\n    <>', source.indexOf('  async function submitInquiry(e) {')));
async function submit(fetch) {
  let status;
  let draft;
  const context = vm.createContext({
    fetch, AbortSignal, service: 'Maintenance', formStatus: 'idle',
    FORM_ENDPOINT: 'https://formsubmit.co/ajax/jacob@jacobwebsites.com',
    FormData: class { get(key) { return ({name: 'Test', email: 'test@example.com', message: 'Maintenance test'})[key]; } },
    setDraft(value) { draft = value; },
    setFormStatus(value) { status = value; },
  });
  await vm.runInContext(`${handler}\nsubmitInquiry({ preventDefault() {}, currentTarget: {} })`, context);
  return {status, draft};
}
test('acknowledgement after the former 12-second deadline succeeds', async () => {
  const result = await submit(async (_, { signal }) => {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, 13000);
      signal.addEventListener('abort', () => { clearTimeout(timer); reject(signal.reason); }, {once: true});
    });
    return {ok: true, json: async () => ({success: 'true'})};
  });
  assert.equal(result.status, 'sent');
});
for (const success of [true, 'true']) test(`accepts success ${JSON.stringify(success)}`, async () => {
  assert.equal((await submit(async () => ({ok: true, json: async () => ({success})}))).status, 'sent');
});
for (const success of [false, 'false']) test(`explicit rejection ${JSON.stringify(success)}`, async () => {
  assert.equal((await submit(async () => ({ok: true, json: async () => ({success})}))).status, 'failed');
});
test('network failure preserves draft and reports uncertainty', async () => {
  const result = await submit(async () => { throw new TypeError('Failed to fetch'); });
  assert.equal(result.status, 'unconfirmed');
  assert.match(result.draft, /Maintenance test/);
});
test('unreadable acknowledgement cannot claim failure or success', async () => {
  assert.equal((await submit(async () => ({ok: true, json: async () => {throw new Error('invalid JSON');}}))).status, 'unconfirmed');
});
