class WebAudio {

	constructor () {
		AudioContext = AudioContext||webkitAudioContext;
		this.audioContext = new AudioContext();
		this.sourceBuffer = [{
							'deckA': null,
							'deckB': null,
							}];
		this.getMediaElementSource = this.getMediaElementSource.bind(this);
	}

	getContext () {
		return this.audioContext;
	}

	getNewBufferSource () {
		return this.context.createBufferSource();
	}

	getMediaElementSource (audioElement) {
		if (!this.mediaElementSource){
			this.mediaElementSource = this.audioContext.createMediaElementSource(audioElement);
		}
		return this.mediaElementSource;
	}

	loadTrack (files, deckName, callback) {
		let _this = this;
		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			let reader = new FileReader();
			reader.readAsArrayBuffer(file);
			reader.addEventListener('loadend', function(buffer){
				let audio = document.querySelector('#' + deckName)
				let objUrl = URL.createObjectURL(file);
				audio.src = objUrl;
				let source = _this.getMediaElementSource(audio);
				source.connect(_this.audioContext.destination);
				callback(file);
			});
		}
	}
	// loadTrack (url, deck) {
	// 	let request = new XMLHttpRequest();
	// 	let _this = this;
	// 	request.open("GET", url, true);
	// 	request.responseType = "arraybuffer";
	// 	request.onload = function() {
	// 		_this.audioContext.decodeAudioData( request.response, function(buffer) {
	//
	// 			_this.buffer = buffer;
	// 			//console.log(_this.sourceBuffer[deck]);
	// 		});
	// 	}
	// 	request.send();
	// 	request.addEventListener("load", this.transferComplete());
	// }
	//
	// transferComplete () {
	//
	// 	//this.dispatch(enablePlayButton());
	// }
}

export default WebAudio;
