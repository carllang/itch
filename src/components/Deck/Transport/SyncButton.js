import React from 'react'

const SyncButton = (props) =>
  <button onClick={props.syncTrack}>
    <span className={((props.isSync)? 'active' : '') + ' sync button glyphicon glyphicon-link'} ></span>
  </button>

export default SyncButton
