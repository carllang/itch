import React from 'react';

const PlayButton = (props) => {
	return (
		<button onClick={props.togglePlaybackSpinUpDown}>
			<span className={((props.isPlaying)? 'active' : '') + ' play button glyphicon glyphicon-play'} ></span>
		</button>
	);

}
export default PlayButton;
