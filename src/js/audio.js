import Tone from "tone";
let sampler = undefined;
export function initSampler() {
  sampler = new Tone.Sampler({
    C3: "../audio/high-ding.mp3",
    D3: "../audio/low-ding.mp3",
    E3: "../audio/woosh.mp3"
  }).toMaster();
}
export function toggleSound() {
  if (sampler == undefined) {
    initSampler();
    Tone.context.resume();
  } else {
    Tone.Master.mute = !Tone.Master.mute;
  }
}
export function playSampler(bart_sound_to_play) {
  if (sampler !== undefined) {
    sampler.triggerAttack(bart_sound_to_play);
  }
}
