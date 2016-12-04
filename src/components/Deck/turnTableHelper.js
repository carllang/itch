// class TurnTableHelper {
//
// 	constructor (turnTable) {
// 		this.turnTable = turntable;
// 	}
// 	//needs refactoring
// 	dropFile () {
// 		this.turnTable.addEventListener('drop', function (ev) {
// 		  		ev.preventDefault();
// 				this.turnTable.classList.remove("droptarget");
// 		  		this.turnTable.firstChild.innerHTML = ev.dataTransfer.files[0].name;
// 		  		this.turnTable.classList.add("loading");
//
// 			  	var reader = new FileReader();
// 			  	reader.onload = function (event) {
// 			  		audioCtx.decodeAudioData( event.target.result, function(buffer) {
// 						if (thisTrack.isPlaying)
// 							thisTrack.togglePlayback();
//
// 						thisTrack.buffer = buffer;
// 						thisTrack.postLoadTasks();
// 			  		}, function(){alert("error loading!");} );
//
// 			  	};
// 			  	reader.onerror = function (event) {
// 			  		alert("Error: " + reader.error );
// 				};
// 			  	reader.readAsArrayBuffer(ev.dataTransfer.files[0]);
// 			  	return false;
// 			}, false );
// 	}
//
// }
