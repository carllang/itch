import React from 'react';
import Transport from './Transport';
import './Deck.scss';
import { connect } from 'react-redux';
import { loadTrackDispatch }  from '../../actions/actionCreators';
import { PropTypes } from 'prop-types';
//import AnimationHelper from '../Visualizer/AnimationHelper';





class Deck extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            trackName: 'drop a track',
            deckName: this.props.deckName
        };

        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.drawDisk = this.drawDisk.bind(this);
        this.REVPERSEC = 33.3 / 60.0;
        this.lastBufferTime = 0.0;
        this.lastTimeStamp = 0;
    }

    drawDisk () {
         this.c = this.refs.canvas;
         this.ctx = this.c.getContext("2d");
        
         
        try {
            var context = this.ctx;
            var now = this.props.webaudio.audioContext.currentTime;
            var bufferTime;
            var keepAnimating = true; //this.props.state.decks[this.props.deckName].isPlaying;

            if (!this.props.state.decks[this.props.deckName].isPlaying) {
                if (this.stopTime) {    // still in spin-down;
                    if (now > (this.stopTime + 1) ) {    // done spinning down.
                        this.lastBufferTime = this.lastBufferTime + 0.5;
                        this.stopTime = 0;
                        return false;
                    } else {
                        
                        bufferTime = 1 - (now-this.stopTime);
                        bufferTime = bufferTime * bufferTime;
                        bufferTime = bufferTime / 2;
                        bufferTime = 0.5 - bufferTime + this.lastBufferTime;
                        keepAnimating = true;
        
                    }
                } else{
                     bufferTime = this.lastBufferTime;
                }
                   
            } else if ((this.restartTime + 1) > now) {    // we're still in "spin-up"
                
                bufferTime = now-this.restartTime;
                bufferTime = bufferTime * bufferTime;
                bufferTime = bufferTime / 2;
                bufferTime += this.offset;
            } else {
                this.updateTime( now );
                bufferTime = this.lastBufferTime;
            }

            if (this.props.state.decks[this.props.deckName].isPlaying) {
                var radians = ((bufferTime * this.REVPERSEC) % 1) * 2 * Math.PI;
                
                context.fillStyle = "red";
                context.clearRect(0, 0,300, 328);  // TODO: shouldn't hardcode
                
                
                context.translate(150, 119);
                context.rotate( radians );
                context.translate(-150, -119);
                context.fillStyle = "white";
                context.font = "36px bold Skia, Arial, sans-serif";
                
				//
                var time = parseFloat(Math.round((this.props.webaudio.audioContext.currentTime - this.state.startTime) * 100) / 100).toFixed(2);
                context.fillText('itchy & scratchy', 20 , 135);

                context.translate(150, 119);
                context.rotate( -radians );
                context.translate(-150, -119);
				context.fillText(time, 20 , 135);
                //context.restore();
                //context.fillText(this.props.webaudio.audioContext.currentTime, 10 ,80);

            }




        //     if (this.props.webaudio.source[this.props.deckName].buffer) {
        //     // Now draw the position in the buffer

        //     var w = 300;
        //     var h = 300;
        //     //var ctx = this.trackDisplayCanvas.getContext('2d');
        //     context.clearRect(0,0,w,h);
        //     context.drawImage( this.c, 0, 0 );
        //     var boxWidth = w * bufferTime / this.props.webaudio.source[this.props.deckName].buffer.duration;
        //     context.fillStyle = "rgba(255,255,255,0.33)";
        //     context.fillRect(0,0,boxWidth,h);

        //     // for (var i=0; i<4; i++) {
        //     //     var cue = this.cues[i];
        //     //     if (cue ) {
        //     //         var x = cue.time / this.buffer.duration * w;
        //     //         context.fillStyle = cueColors[i];
        //     //         context.fillRect( x, 0, 1, h );
        //     //         context.font = "12px bold Skia, Arial, sans-serif";
        //     //         context.fillText( cueText[i], x+2, h/4 );
        //     //     }
        //     // }

        //     //drawRunningDisplay( runningDisplayContext, this.waveformDisplayCache, bufferTime );

        //     // draw the center bar
        //     // var isTop = this.isLeftTrack;
        //     // ctx = runningDisplayContext;
        //     // runningDisplayContext.fillStyle = "gray";
        //     // runningDisplayContext.fillRect(RUNNING_DISPLAY_HALF_WIDTH,isTop?0:RUNNING_DISPLAY_HALF_HEIGHT,1,RUNNING_DISPLAY_HALF_HEIGHT);

        //     // draw cues on the running display
        //     // var begin = bufferTime - (SECONDS_OF_RUNNING_DISPLAY/2);
        //     // var end = begin + SECONDS_OF_RUNNING_DISPLAY;
        //     // for (var i=0; i<4; i++) {
        //     //     var cue = this.cues[i];
        //     //     if (cue && (cue.time>begin) && (cue.time<end)) {
        //     //         var x = (cue.time-begin) * RUNNING_DISPLAY_WIDTH / SECONDS_OF_RUNNING_DISPLAY;
        //     //         ctx.fillStyle = cueColors[i];
        //     //         ctx.fillRect( x, isTop ? 0 : RUNNING_DISPLAY_HALF_HEIGHT, 1, RUNNING_DISPLAY_HALF_HEIGHT );
        //     //         ctx.font = "12px bold Skia, Arial, sans-serif";
        //     //         ctx.fillText( cueText[i], x+2, isTop ? RUNNING_DISPLAY_HALF_HEIGHT/2 : RUNNING_DISPLAY_HALF_HEIGHT*1.5 );
        //     //     }
        //     // }

        // }




    window.requestAnimationFrame(this.drawDisk);
            //console.log('repeater');
        }catch(e){
            console.log('ERROR::: ', e.message);
        }
        


    }

    updateTime ( now ) {

            this.lastBufferTime += (now-this.lastTimeStamp) * 1;
            this.lastTimeStamp = now;
    }

    handleDragOver (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDropBody (e){
        e.preventDefault();
        e.stopPropagation();
    }

    handleDrop (e) {
        e.preventDefault();
        e.stopPropagation();

        let files = e.dataTransfer.files;
        let _this = this;

        this.loadTrack(files, this.props.deckName, function(result) {
            if (result){

                let loader = {
                            deckName: _this.props.deckName,
                            trackName: result.name
                        };

                _this.props.dispatch(loadTrackDispatch(loader));
                _this.setState({
                    trackName: result.name
                });
                
                window.requestAnimationFrame(_this.drawDisk);
            }else{
                _this.setState({
                    trackName: result.error
                });
            }
        });
    }

    loadTrack (files, deckName, callback) {
        let _this = this;

            let file = files[0];
            let reader = new FileReader();

            reader.onloadstart = function (event) {
                _this.setState({
                    trackName: 'loading...'
                });
            };

            reader.onload = function (event) {
                  _this.props.webaudio.audioContext.decodeAudioData( event.target.result, function(buffer) {
                    // if (thisTrack.isPlaying)
                    //     thisTrack.togglePlayback();
                    _this.props.webaudio.source[_this.props.deckName] = _this.props.webaudio.audioContext.createBufferSource();
                    _this.props.webaudio.source[_this.props.deckName].buffer = buffer;
                    callback(file);
                    //thisTrack.postLoadTasks();
                  }, function(){console.log("error loading!");} );

              };
            reader.readAsArrayBuffer(file);

    }

    componentDidMount () {
        if (this.state.trackName !== 'loading...'){
            //this.drawDisk();
        }
        
        // When the component is mounted, grab a reference and add a DOM listener;
        this.refs.canvas.addEventListener("drop", this.handleDrop);
        this.refs.canvas.addEventListener("dragover", this.handleDragOver);
    }

    componentWillUnmount () {
        // Make sure to remove the DOM listener when the component is unmounted
        this.refs.canvas.removeEventListener("drop", this.handleDrop);
        this.refs.canvas.removeEventListener("dragover", this.handleDragOver);
    }

    componentDidUpdate () {
        if (this.state.trackName !== 'loading...'){
        //    this.drawDisk();
        }
    }

    render () {
        return (
            <div className="droppable">
                <h4>{this.state.trackName}</h4>
                <canvas ref="canvas" id={this.props.deckName} className={(this.props.state.decks[this.props.deckName].loadTrack)? 'Deck animateDeck':'Deck'} width="400px" height="338px"></canvas>
                <Transport {...this.props} deck={this.deck}/>
            </div>
        );
    }
}


Deck.propTypes = {
    deckName: PropTypes.string.isRequired
};

const mapStateToProps = function (state) {
  return {
      state: state
  };
}

export default connect(mapStateToProps)(Deck);
