import Filter from './Filter';
import WebMidi from 'webMIDI';


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
				//TODO figure out best filters and frequency and Q values...for now it sounds okish...
				hp: new Filter('highshelf', 6000, 0, 0, 'deckA', this.audioContext),
				bp: new Filter('peaking', 1200, 0, 0.1, 'deckA', this.audioContext),
				lp: new Filter('lowshelf', 400, 0, 0, 'deckA', this.audioContext)
			},
			deckB : {
				hp: new Filter('highshelf', 6000, 0, 0, 'deckB', this.audioContext),
				bp: new Filter('peaking', 1200, 0, 0.1, 'deckB', this.audioContext),
				lp: new Filter('lowshelf', 400, 0, 0, 'deckB', this.audioContext)
			}
		};

		this.source = {
			deckA: null,
			deckB: null
		};

		this.masterGain = this.audioContext.createGain();

		this.javascriptNode = this.audioContext.createScriptProcessor(2048, 1, 1);

		this.analyser = this.audioContext.createAnalyser();
		this.analyser.smoothingTimeConstant = 0.0;
		this.analyser.fftSize = 1024;

		this.analyser2 = this.audioContext.createAnalyser();
		this.analyser2.smoothingTimeConstant = 0.0;
		this.analyser2.fftSize = 1024;


		this.splitter = this.audioContext.createChannelSplitter();

	}

}

export default WebAudio;
