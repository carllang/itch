import Filter from './Filter';
//import WebMidi from 'webMIDI';


class WebAudio {

	constructor () {
		AudioContext = AudioContext || webkitAudioContext;
		this.audioContext = new AudioContext();

		this.gainNode = {
			deckA: this.audioContext.createGain(),
			deckB: this.audioContext.createGain()
		};

		this.crossFadeGainNode = {
			deckA: this.audioContext.createGain(),
			deckB: this.audioContext.createGain()
		};

		this.filters = {
			deckA : {
				hp: new Filter('highpass', 100.0, 0, 0, 'deckA', this.audioContext),
				bp: new Filter('bandpass', 600.0, 0, 0.5, 'deckA', this.audioContext),
				lp: new Filter('lowpass', 10000.0, 0, 0, 'deckA', this.audioContext)
			},
			deckB : {
				hp: new Filter('highpass', 100.0, 0, 0, 'deckB', this.audioContext),
				bp: new Filter('bandpass', 600.0, 0, 0.5, 'deckB', this.audioContext),
				lp: new Filter('lowpass', 10000.0, 0, 0, 'deckB', this.audioContext)
			}
		};

		this.source = {
			deckA: this.audioContext.createBufferSource(),
			deckB: this.audioContext.createBufferSource()
		};

		this.masterGain = this.audioContext.createGain();
		this.analyser = this.audioContext.createAnalyser();

	}

}

export default WebAudio;
