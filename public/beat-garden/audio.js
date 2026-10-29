export const voices = [
  {name:'Thump',kind:'Kick',color:'#b78b43',type:'root'},
  {name:'Snap',kind:'Snare',color:'#c66b56',type:'poppy'},
  {name:'Tsk',kind:'Hi-hat',color:'#829460',type:'grass'},
  {name:'Root',kind:'Bass',color:'#668b70',type:'leaf'},
  {name:'Bloom',kind:'Bell',color:'#be7c9d',type:'flower'},
  {name:'Dew',kind:'Pluck',color:'#6b8eac',type:'bud'},
];
export const pitches=[0,7,12,15,19,12,7,3,0,7,15,12,19,15,7,3];
export function stepTime(step,bpm,swing){const tick=60/bpm/4;return step*tick+(step%2?tick*swing/100:0)}
export function makeBus(ctx,volume){const gain=ctx.createGain();gain.gain.value=volume*.65;const compressor=ctx.createDynamicsCompressor();compressor.threshold.value=-14;compressor.knee.value=18;compressor.ratio.value=4;gain.connect(compressor);compressor.connect(ctx.destination);return gain}
const noiseCache=new WeakMap();
function noiseBuffer(ctx){if(noiseCache.has(ctx))return noiseCache.get(ctx);const buffer=ctx.createBuffer(1,ctx.sampleRate*.5,ctx.sampleRate);const data=buffer.getChannelData(0);let seed=8731;for(let i=0;i<data.length;i++){seed=(seed*16807)%2147483647;data[i]=seed/1073741823.5-1}noiseCache.set(ctx,buffer);return buffer}
export function sound(ctx,bus,row,col,when){
 const t=Math.max(when,ctx.currentTime), env=ctx.createGain();env.connect(bus);
 const tone=(type,freq,duration,amount=.4)=>{const osc=ctx.createOscillator();osc.type=type;osc.frequency.setValueAtTime(freq,t);const level=ctx.createGain();level.gain.value=amount;osc.connect(level);level.connect(env);osc.start(t);osc.stop(t+duration);return osc};
 const envelope=(peak,duration,attack=.004)=>{env.gain.setValueAtTime(.0001,t);env.gain.exponentialRampToValueAtTime(peak,t+attack);env.gain.exponentialRampToValueAtTime(.0001,t+duration)};
 if(row===0){envelope(.9,.35);const o=tone('sine',140,.4,1);o.frequency.exponentialRampToValueAtTime(43,t+.13)}
 else if(row===1||row===2){const src=ctx.createBufferSource();src.buffer=noiseBuffer(ctx);const filter=ctx.createBiquadFilter();filter.type='highpass';filter.frequency.value=row===1?1200:7000;src.connect(filter);filter.connect(env);envelope(row===1?.38:.19,row===1?.16:.055);src.start(t);src.stop(t+.2);if(row===1)tone('triangle',180,.12,.25)}
 else {const semitone=pitches[col]+(row===3?-12:row===4?12:24);const freq=220*Math.pow(2,semitone/12);const duration=row===3?.28:row===4?.8:.45;envelope(row===3?.55:row===4?.3:.25,duration,row===3?.007:.003);tone(row===3?'triangle':'sine',freq,duration,.8);if(row===4)tone('sine',freq*2.003,duration,.19);if(row===5)tone('sine',freq*3,duration*.4,.13)}
}
export async function renderLoop(pattern,muted,bpm,swing,volume){const duration=stepTime(16,bpm,swing);const ctx=new OfflineAudioContext(2,Math.ceil((duration+.9)*44100),44100);const bus=makeBus(ctx,volume);for(let row=0;row<6;row++)for(let col=0;col<16;col++)if(pattern[row][col]&&!muted[row])sound(ctx,bus,row,col,.02+stepTime(col,bpm,swing));const rendered=await ctx.startRendering();const length=Math.floor(duration*44100);const wav=new ArrayBuffer(44+length*4),view=new DataView(wav);const str=(o,s)=>[...s].forEach((c,i)=>view.setUint8(o+i,c.charCodeAt(0)));str(0,'RIFF');view.setUint32(4,36+length*4,true);str(8,'WAVE');str(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,2,true);view.setUint32(24,44100,true);view.setUint32(28,176400,true);view.setUint16(32,4,true);view.setUint16(34,16,true);str(36,'data');view.setUint32(40,length*4,true);const channels=[rendered.getChannelData(0),rendered.getChannelData(1)];for(let i=0;i<length;i++)for(let ch=0;ch<2;ch++){// Fold the synthesis tail around the loop boundary for a continuous WAV loop.
let value=channels[ch][i];if(i+length<channels[ch].length)value+=channels[ch][i+length];value=Math.max(-1,Math.min(1,value));view.setInt16(44+(i*2+ch)*2,value<0?value*32768:value*32767,true)}return new Blob([wav],{type:'audio/wav'})}
