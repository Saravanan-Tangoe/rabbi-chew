import React from 'react';
import './App.css';
import './style.scss';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      scoreTotal: 0,
      timeOut: false,
      isShown: true
    }
    this.imageRef = React.createRef(null); 
  }

  play = () => {
    this.setState({
      scoreTotal: 0,
      isShown: false
    })
    this.peep();
    setTimeout(() => this.setState({
      timeOut: true
    }), 10000)
  }

  peep = () => {
    const time = this.randomTime(200, 500);
    const hole = this.randomHole();
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      if (!this.state.timeOut) this.peep();
    }, time);
    this.click();
  }

  randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  }

  randomHole = () => {
    const holes = this.imageRef.current.children;
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    return hole;
  }

  click = () => {
    const childrens = Array.from(this.imageRef.current.children);
    const value = [];
    childrens.forEach(children => {
      value.push(children.lastChild);
    })
    value.forEach(rabbit => rabbit.addEventListener('click', this.bonk));
  }

  bonk = (e) => {
    const holes = this.imageRef.current.children;
    const hole = this.randomHole(holes);
    if (e.isTrusted) {
      this.setState({
        scoreTotal: this.state.scoreTotal + 1
      })
    }
    hole.parentNode.classList.remove('up');
  }

  playAgain = () => {
    window.location.reload(false);
  }

  render() {
    const congrats = <div>
      <p>Congrats! you've got me<span className="score">{this.state.scoreTotal}</span>times</p>
    </div>
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        <p style={{fontSize:'15px'}}>How it works?</p>
        <p style={{fontSize:'10px'}}>1. Click on the rabbies to get your score.<br/>
        2. You will gain 1 point on each click.</p>
      </Tooltip>
    );
    return (
      <div className="main-div" >
        <div className="secondary-div">
          <div className="title-div">
            {
              this.state.isShown ?
                <p>Rabbi chew! <span className="score"></span></p> :
                <div>{congrats}</div>
            }
            {
              this.state.isShown ?
                <button className="btn btn-primary" onClick={() => this.play()}><strong>Play!</strong></button> :
                <button className="btn btn-primary" onClick={() => this.playAgain()}><strong>Replay!</strong></button>
            }

            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <i className="far fa-question-circle"/>
            </OverlayTrigger>
          </div>
          <div className="game-panel" ref = {this.imageRef}>
            <div className="hole hole1">
              <div className="rabbit">
              </div>
            </div>
            <div className="hole hole2">
              <div className="rabbit">
              </div>
            </div>
            <div className="hole hole3">
              <div className="rabbit">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
