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

		this.javascriptNode = {
			deckA: this.audioContext.createScriptProcessor(2048, 1, 1),
			deckB: this.audioContext.createScriptProcessor(2048, 1, 1)
		}

		// left channel ?
		this.analyser = {
			deckA: this.audioContext.createAnalyser(),
			deckB: this.audioContext.createAnalyser()
		}

		this.analyser.deckA.smoothingTimeConstant = 0.0;
		this.analyser.deckA.fftSize = 1024;
		this.analyser.deckB.smoothingTimeConstant = 0.0;
		this.analyser.deckB.fftSize = 1024;

		// right channel ?
		this.analyser2 = {
			deckA: this.audioContext.createAnalyser(),
			deckB: this.audioContext.createAnalyser()
		}

		this.analyser2.deckA.smoothingTimeConstant = 0.0;
		this.analyser2.deckA.fftSize = 1024;
		this.analyser2.deckB.smoothingTimeConstant = 0.0;
		this.analyser2.deckB.fftSize = 1024;

		this.splitter = {
			deckA: this.audioContext.createChannelSplitter(),
			deckB: this.audioContext.createChannelSplitter()
		};

		this.trackProperties = {
			deckA: {
				currentPlaybackRate: 1.0,
				stopTime: 0,
				lastTimeStamp: 0,
				restartTime: 0,
				offset: 0,
				lastPBR: 1.0,
				lastBufferTime: 0.0
			},
			deckB: {
				currentPlaybackRate: 1.0,
				stopTime: 0,
				lastTimeStamp: 0,
				restartTime: 0,
				offset: 0,
				lastPBR: 1.0,
				lastBufferTime: 0.0
			}
		}



	}

}

export default WebAudio;
