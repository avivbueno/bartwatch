const bart_sound = {
    HIGH_DING: 'C3',
    LOW_DING: 'D3',
    WOOSH: 'E3',
}
var sampler = undefined;
function initSampler(){
    sampler = new Tone.Sampler({
        "C3" : "./audio/high-ding.mp3",
        "D3" : "./audio/low-ding.mp3",
        "E3" : "./audio/woosh.mp3",
    }).toMaster();
}
function toggleSound(){
    if(sampler==undefined){
        initSampler();
        Tone.context.resume();
    } else{
        Tone.Master.mute = !Tone.Master.mute;
    }
}
function playSampler(bart_sound_to_play) {
    if(sampler !== undefined){
        sampler.triggerAttack(bart_sound_to_play)
    }
}