import React from 'react'
import Transport from './Transport'
import './Deck.scss'
import { connect } from 'react-redux'
import { loadTrackDispatch }  from '../../actions/actionCreators'
import { PropTypes } from 'prop-types'


class Deck extends React.Component {

    constructor (props) {
        super (props)

        this.state = {
            trackName: 'drop a track',
            deckName: this.props.deckName
        }

        this.handleDrop = this.handleDrop.bind(this)
        this.handleDragOver = this.handleDragOver.bind(this)
        this.drawDisk = this.drawDisk.bind(this)
        this.REVPERSEC = 33.3 / 60.0
        this.lastBufferTime = 0.0
        this.lastTimeStamp = 0
    }

    drawDisk () {
         this.c = this.refs.canvas
         this.ctx = this.c.getContext("2d")
        try {
            let context = this.ctx
            let now = this.props.webaudio.audioContext.currentTime
            let bufferTime
            let keepAnimating = this.props.state.decks[this.props.deckName].isPlaying

            if (!this.props.state.decks[this.props.deckName].isPlaying) {
                if (this.stopTime) {    // still in spin-down
                    if (now > (this.stopTime + 1) ) {    // done spinning down.
                        this.lastBufferTime = this.lastBufferTime + 0.5
                        this.stopTime = 0
                        return false
                    } else {

                        bufferTime = 1 - (now-this.stopTime)
                        bufferTime = bufferTime * bufferTime
                        bufferTime = bufferTime / 2
                        bufferTime = 0.5 - bufferTime + this.lastBufferTime
                        keepAnimating = true

                    }
                } else{
                     bufferTime = this.lastBufferTime
                }

            } else if ((this.restartTime + 1) > now) {    // we're still in "spin-up"

                bufferTime = now-this.restartTime
                bufferTime = bufferTime * bufferTime
                bufferTime = bufferTime / 2
                bufferTime += this.offset
            } else {
                this.updateTime( now )
                bufferTime = this.lastBufferTime
            }

            if (this.props.state.decks[this.props.deckName].isPlaying) {
                let radians = ((bufferTime * this.REVPERSEC) % 1) * 2 * Math.PI

                context.fillStyle = "red"
                context.clearRect(0, 0,500, 328)
                context.translate(150, 119)
                context.rotate( radians )
                context.translate(-150, -119)
                context.fillStyle = "white"
                context.font = "36px bold Skia, Arial, sans-serif"

	                let time = parseFloat(Math.round((this.props.webaudio.audioContext.currentTime) * 100) / 100).toFixed(2)

                context.fillText('___', 150 , 119)
                context.translate(150, 119)
                context.rotate( -radians )
                context.translate(-150, -119)
								context.fillText(time, 20 , 325)

								let dataArray = null
								let bufferLength = this.props.webaudio.analyser[this.props.deckName].frequencyBinCount
								dataArray = new Uint8Array(this.props.webaudio.analyser[this.props.deckName].frequencyBinCount)
								this.props.webaudio.analyser[this.props.deckName].getByteFrequencyData(dataArray)
								let barWidth = (200 / bufferLength) * 2.5 - 1
							  let barHeight
							  let x = 0
								for(let i = 0; i < bufferLength; i++) {
							    barHeight = dataArray[i]
							    context.fillStyle = 'rgb(' + (barHeight) + ',50,50)'
							    context.fillRect(x,328-barHeight/2,barWidth,barHeight/2)
							    x += barWidth
							  }
            }

    	window.requestAnimationFrame(this.drawDisk)

        }catch(e){
            console.log('ERROR::: ', e.message)
        }
    }

		drawWave() {
			let audioCtx = this.props.webaudio.audioContext
			let sourceNode = audioCtx.createBufferSource()
			sourceNode.buffer = this.props.webaudio.source[this.props.deckName].buffer

			this.c = this.refs.canvas
			this.ctx = this.c.getContext("2d")
			let context = this.ctx
			let dataArray = null
			this.props.webaudio.analyser[this.props.deckName].fftSize = 2048
			sourceNode.connect(this.props.webaudio.analyser[this.props.deckName])

			let bufferLength = this.props.webaudio.analyser[this.props.deckName].frequencyBinCount
			dataArray = new Uint8Array(this.props.webaudio.analyser[this.props.deckName].fftSize)
			this.props.webaudio.analyser[this.props.deckName].getByteTimeDomainData(dataArray)
			let barWidth = (500 / bufferLength) * 2.5 - 1
			let barHeight
			let x = 0
			for(let i = 0; i < bufferLength; i++) {
				barHeight = dataArray[i]

				context.fillStyle = 'rgb(' + (barHeight) + ',50,50)'
				context.fillRect(x,328-barHeight/2,barWidth,barHeight/2)

				x += barWidth
			}
			console.log(dataArray)
		}


		displayBuffer(buff) {
			let audioCtx = this.props.webaudio.audioContext
			let sourceNode = audioCtx.createBufferSource()
			buff = this.props.webaudio.source[this.props.deckName].buffer

			this.c = this.refs.waveCanvas
			let context = this.ctx
			context = this.c.getContext("2d")

			let canvasWidth = 400
			let canvasHeight = 100
		  let drawLines = 500000
		   let leftChannel = buff.getChannelData(0) // Float32Array describing left channel
		   let lineOpacity = canvasWidth / leftChannel.length
		   context.save()
		   context.fillStyle = '#080808'
		   context.fillRect(0,0,canvasWidth,canvasHeight )
		   context.strokeStyle = '#46a0ba'
		   context.globalCompositeOperation = 'lighter'
		   context.translate(0,canvasHeight / 2)
		   context.globalAlpha = 0.6  // lineOpacity
		   context.lineWidth=1
		   let totallength = leftChannel.length
		   let eachBlock = Math.floor(totallength / drawLines)
		   let lineGap = (canvasWidth/drawLines)

		  context.beginPath()
		   for(let i=0;i<=drawLines;i++){
		      let audioBuffKey = Math.floor(eachBlock * i)
		       let x = i*lineGap
		       let y = leftChannel[audioBuffKey] * canvasHeight / 2
		       context.moveTo( x, y )
		       context.lineTo( x, (y*-1) )
		   }
		   context.stroke()
		   context.restore()
		}



    updateTime ( now ) {
        this.lastBufferTime += (now-this.lastTimeStamp) * 1
        this.lastTimeStamp = now
    }

    handleDragOver (e) {
        e.preventDefault()
        e.stopPropagation()
    }

    handleDropBody (e){
        e.preventDefault()
        e.stopPropagation()
    }

    handleDrop (e) {
        e.preventDefault()
        e.stopPropagation()

        let files = e.dataTransfer.files

        this.loadTrack(files, this.props.deckName, (result) =>{
            if (result){

                let loader = {
                            deckName: this.props.deckName,
                            trackName: result.name
                        }

                this.props.dispatch(loadTrackDispatch(loader))
                this.setState({
                    trackName: result.name
                })
								//TODO this draws the animation
                window.requestAnimationFrame(this.drawDisk)
								//this.drawWave()
								this.displayBuffer()
            }else{
                this.setState({
                    trackName: result.error
                })
            }
        })
    }

    loadTrack (files, deckName, callback) {


            let file = files[0]
            let reader = new FileReader()

            reader.onloadstart =  (event) => {
                this.setState({
                    trackName: 'loading...'
                })
            }

            reader.onload = (event) => {
                  this.props.webaudio.audioContext.decodeAudioData( event.target.result, (buffer) => {
                    // if (thisTrack.isPlaying)
                    //     thisTrack.togglePlayback()
                    this.props.webaudio.source[this.props.deckName] = this.props.webaudio.audioContext.createBufferSource()
                    this.props.webaudio.source[this.props.deckName].buffer = buffer
                    callback(file)
                    //thisTrack.postLoadTasks()
                  }, ()=>{console.log("error loading!")} )

              }
            reader.readAsArrayBuffer(file)

    }

    componentDidMount () {
        if (this.state.trackName !== 'loading...'){
            //this.drawDisk()
        }

        // When the component is mounted, grab a reference and add a DOM listener
        this.refs.dropHere.addEventListener("drop", this.handleDrop)
        this.refs.dropHere.addEventListener("dragover", this.handleDragOver)
    }

    componentWillUnmount () {
        // Make sure to remove the DOM listener when the component is unmounted
        this.refs.dropHere.removeEventListener("drop", this.handleDrop)
        this.refs.dropHere.removeEventListener("dragover", this.handleDragOver)
    }

    componentDidUpdate () {
        if (this.state.trackName !== 'loading...'){
        //    this.drawDisk()
        }
    }

    render () {
        return (
            <div ref="dropHere" className="droppable" className={(this.props.state.decks[this.props.deckName].loadTrack)? 'Deck animateDeck':'Deck'}>
                <h4>{this.state.trackName}</h4>
								<canvas ref="waveCanvas" id={this.props.deckName} width="400px" height="100px"></canvas>
                <canvas ref="canvas" id={this.props.deckName}  width="400px" height="100px"></canvas>
								<Transport {...this.props} deck={this.deck}/>
            </div>
        )
    }
}


Deck.propTypes = {
    deckName: PropTypes.string.isRequired
}

const mapStateToProps = function (state) {
  return {
      state: state
  }
}

export default connect(mapStateToProps)(Deck)
