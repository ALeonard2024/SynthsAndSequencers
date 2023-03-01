let slider;

const synth = new Tone.PluckSynth();

const reverb = new Tone.JCReverb(0.4);
synth.connect(reverb);

const osc = new Tone.OmniOscillator("C#6", "pwm").start();

const ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.5,
  decay: 0.6,
  sustain: 0.3,
  release: 0.2
})

let notes = {
  'a': 'C6',
  's': 'D6',
  'd': 'E6',
  'f': 'F6',
  'g': 'G6',
  'h': 'A6',
  'j': 'B6',
  'k': 'C7'
}

function setup() {
  createCanvas(400, 400);

  slider = new Nexus.Slider("#slider");
  reverb.toDestination();

  synth.release = 2;
  synth.resonance = 0.98;

  slider.on('change', (v) =>  {
    reverb.roomSize.value = v;
  }); 

  osc.connect(ampEnv);
  ampEnv.connect(reverb);
}

function draw() {
  background(220);
  text('Adjust the slider to apply reverb! ', 0, 25)
  text('Push Buttons to play MUSIC!!!!', 50, 100)
  text('A = C6', 50, 125)
  text('S = D6', 50, 150)
  text('D = E6', 50, 175)
  text('F = F6', 50, 200)
  text('G = G6', 50, 225)
  text('H = A6', 50, 250)
  text('J = B6', 50, 275)
  text('K = C7', 50, 300)
}

function keyPressed() {
  let toPlay = notes[key];
  console.log(toPlay);

  osc.frequency.value = toPlay;
  ampEnv.triggerAttackRelease('8n');

  synth.triggerAttackRelease(toPlay, 0.5);
}