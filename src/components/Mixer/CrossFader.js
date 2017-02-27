import React from 'react';


const CrossFader = (props) => {
	return (
		<div>
			<input type="range" value={props.gainB} name="cross-fader" min="0" max="1" step="0.01" onChange={props.crossFade} />
		</div>
	);
}

export default CrossFader;
