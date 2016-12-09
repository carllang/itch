import Filter from './Filter';
import WebMidi from 'webMIDI';


class WebAudio {

	constructor () {
		AudioContext = AudioContext||webkitAudioContext;
		this.audioContext = new AudioContext();

		this.gainNode = {
			'deckA': this.audioContext.createGain(),
			'deckB': this.audioContext.createGain()
		};

		this.crossFadeGainNode = {
			'deckA': this.audioContext.createGain(),
			'deckB': this.audioContext.createGain()
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

		this.masterGain = this.audioContext.createGain();
		this.analyser = this.audioContext.createAnalyser();
	}

	loadTrack (files, deckName, callback) {
		let _this = this;
		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			let reader = new FileReader();
			reader.readAsArrayBuffer(file);
			reader.addEventListener('loadend', function(buffer){
				document.querySelector('#' + deckName).src = null;
				let audio = document.querySelector('#' + deckName);
				let objUrl = URL.createObjectURL(file);
				audio.src = objUrl;
				let source = _this.audioContext.createMediaElementSource(audio);
				source.connect(_this.filters[deckName]['hp'].filter);
				_this.filters[deckName]['hp'].filter.connect(_this.filters[deckName]['bp'].filter);
				_this.filters[deckName]['bp'].filter.connect(_this.filters[deckName]['lp'].filter);
				_this.filters[deckName]['lp'].filter.connect(_this.gainNode[deckName]);
				_this.gainNode[deckName].connect(_this.crossFadeGainNode[deckName]);
				_this.crossFadeGainNode[deckName].connect(_this.masterGain);
				_this.masterGain.connect(_this.analyser);
				_this.analyser.connect(_this.audioContext.destination);
				callback(file);
			});
		}
	}
}

export default WebAudio;
