import React from 'react'
import './style/main.less'
import { throws } from 'assert'
import Context from './Context'
import moment from 'moment'

function compressArray(original) {
  var compressed = []
  // make a copy of the input array
  var copy = original.slice(0)

  // first loop goes over every element
  for (var i = 0; i < original.length; i++) {
    var myCount = 0
    var actors = []
    // loop over every element in the copy and see if it's the same
    for (var w = 0; w < copy.length; w++) {
      if (original[i] && copy[w] && original[i].reaction == copy[w].reaction) {
        // increase amount of times duplicate is found
        myCount++
        actors.push(copy[w].actor)
        // sets item to undefined
        delete copy[w]
      }
    }

    if (myCount > 0) {
      var a = new Object()
      a.value = original[i]
      a.value.actors = actors
      a.count = myCount
      compressed.push(a)
    }
  }
  return compressed
}

class ContextChatBubble extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { showContext: false }
  }

  onClick = () => {
    this.setState({ showContext: !this.state.showContext })
  }
  render() {
    const props = this.props
    const compressedArray = compressArray(props.reactions)
    return (
      <div className="row">
        <div className="bubble-container">
          <div className="talk-bubble tri-right round right-in" onClick={this.onClick}>
            <div className="talktext">{props.message}</div>
            {props.image && <img src={`../photos/${props.image.uri.substring(props.image.uri.lastIndexOf('/') + 1)}`} />}
            <div className="writer">{props.writer}</div>
            <div className="date">{moment(props.timestamp).format('YYYY-MM-DD HH:mm')}</div>
          </div>
          <div className="emojis">
            {compressedArray.map((reaction, index) => (
              <div key={index}>{`${reaction.value.reaction}(${reaction.count})`}</div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default ContextChatBubble
