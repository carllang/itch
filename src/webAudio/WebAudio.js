class WebAudio {

	constructor () {
		AudioContext = AudioContext||webkitAudioContext;
		this.context = new AudioContext();
		this.sourceBuffer = [{
							'deckA': null,
							'deckB': null,
							}];
		//this.buffer = null;
	}

	getContext () {
		return this.contex;
	}

	getNewBufferSource () {
		return this.context.createBufferSource();
	}

	play (deck) {
		this.sourceBuffer[deck] = this.getNewBufferSource();
		this.sourceBuffer[deck] = this.buffer;
		this.sourceBuffer[deck].connect(this.context.destination);
		this.sourceBuffer[deck].start(0);
	}

	stop (deck) {
		this.sourceBuffer[deck].stop(0);
	}

	loadTrack (url, deck) {
		let request = new XMLHttpRequest();
		let _this = this;
		request.open("GET", url, true);
		request.responseType = "arraybuffer";
		request.onload = function() {
			_this.context.decodeAudioData( request.response, function(buffer) {

				_this.buffer = buffer;
				//console.log(_this.sourceBuffer[deck]);
			});
		}
		request.send();
		request.addEventListener("load", this.transferComplete());
	}

	transferComplete () {

		//this.dispatch(enablePlayButton());
	}
}

export default WebAudio;
