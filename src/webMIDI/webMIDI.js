// class WebMIDI {
//
// 	constructor () {
// 		navigator.requestMIDIAccess({
// 			sysex: false
// 		}).then(onMIDISuccess, onMIDIFailure);
// 	}
//
// 	onMIDISuccess (midiAccess) {
// 		// when we get a succesful response, run this code
// 		midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status
//
// 		var inputs = midi.inputs.values();
// 		// loop over all available inputs and listen for any MIDI input
// 		for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
// 			// each time there is a midi message call the onMIDIMessage function
// 			input.value.onmidimessage = onMIDIMessage;
// 			listInputs(input);
//
// 		}
// 	}
//
// 	listInputs (inputs) {
// 		var input = inputs.value;
// 		log("Input port : [ type:'" + input.type + "' id: '" + input.id +
// 		"' manufacturer: '" + input.manufacturer + "' name: '" + input.name +
// 		"' version: '" + input.version + "']");
// 	}
//
// 	onMIDIMessage (message) {
// 		data = message.data; // this gives us our [command/channel, note, velocity] data.
// 		console.log('MIDI data', data); // MIDI data [144, 63, 73]
// 	}
//
// }
//
// export default WebMIDI;
