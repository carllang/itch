class WebAudio {

	constructor () {
		AudioContext = AudioContext||webkitAudioContext;
		this.audioContext = new AudioContext();

		/*TODO Abstract this */
		this.gainNode = {
			'deckA': this.audioContext.createGain(),
			'deckB': this.audioContext.createGain()
		};

		this.crossFadeGainNode = {
			'deckA': this.audioContext.createGain(),
			'deckB': this.audioContext.createGain()
		};

		this.hiPassFilterNode = {
			'deckA': this.audioContext.createBiquadFilter(),
			'deckB': this.audioContext.createBiquadFilter()
		};
		this.hiPassFilterNode['deckA'].type = "highshelf";
		this.hiPassFilterNode['deckA'] = 3200.0;
		//this.hiPassFilterNode['deckA'].gain.value = 0.0;
		this.hiPassFilterNode['deckB'].type = "highshelf";
		this.hiPassFilterNode['deckB'] = 3200.0;
		//this.hiPassFilterNode['deckB'].gain.value = 0.0;
		/*END TODO Abstract this */


		this.masterGain = this.audioContext.createGain();
	}

	loadTrack (files, deckName, callback) {
		let _this = this;
		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			let reader = new FileReader();
			reader.readAsArrayBuffer(file);
			reader.addEventListener('loadend', function(buffer){
				let audio = document.querySelector('#' + deckName);
				let objUrl = URL.createObjectURL(file);
				audio.src = objUrl;
				let source = _this.audioContext.createMediaElementSource(audio)
				//console.log('Deck name', deckName);
				source.connect(_this.gainNode[deckName]);
				_this.gainNode[deckName].connect(_this.crossFadeGainNode[deckName]);
				_this.crossFadeGainNode[deckName].connect(_this.masterGain);
				_this.masterGain.connect(_this.audioContext.destination);
				callback(file);
			});
		}
	}
}

export default WebAudio;
