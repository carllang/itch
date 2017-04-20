import React from 'react';

const SyncButton = (props) => {
	return (
		<button onClick={props.syncTrack}>
			<span className={((props.isSync)? 'active' : '') + ' sync button glyphicon glyphicon-link'} ></span>
		</button>
	);

}
export default SyncButton;
