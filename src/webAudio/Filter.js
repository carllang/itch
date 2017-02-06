class Filter {

	constructor (filterType, frequency, gain, q, deck, audioCtx) {
		this.filter = audioCtx.createBiquadFilter();
		this.filter.type = filterType;
		this.filter.frequency.value = frequency;
		this.filter.Q.value = q;
		if (filterType !== 'bandpass'){
			this.filter.gain.value = gain;
		}

		this.filter.deck = deck;
	}

}


export default Filter;
