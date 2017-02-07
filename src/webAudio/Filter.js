class Filter {

	constructor (filterType, frequency, gain, q, deck, audioCtx) {
		this.filter = audioCtx.createBiquadFilter();
		this.filter.type = filterType;

		this.filter.Q.value = q;

		this.filter.gain.value = gain;

		this.filter.frequency.value = frequency;


		this.filter.deck = deck;
	}

}


export default Filter;
