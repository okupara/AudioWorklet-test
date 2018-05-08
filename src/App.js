import React, { Component } from 'react';
import './App.css';


const buttonStyle = {
  width: '100px',
  height: '30px',
  backgroundColor: '#000',
  display: 'inline-block',
  textDecoration: 'none',
  color: '#7ed8f7',
  fontWeight: 'bold',
  lineHeight: '1.6em',
  fontSize: '1em'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    };
  }
  handleClick = () => {
    if (!this.state.isPlaying) {
      this.props.start();
      this.setState({ isPlaying: true });
      return;
    }
    this.props.stop();
    this.setState({ isPlaying: false });
  }
  handleSliderChange = () => {
    const linearVol = this.slider.value / 127;
    this.props.setVol(linearVol);
  }
  componentDidMount () {
    this.slider.value = 32.0;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Audio Worklet</h1>
        </header>
        <div style={{paddingTop: '30px'}}>
          <p>
            <button onClick={this.handleClick} style={buttonStyle}>{this.state.isPlaying ? 'Stop' : 'Play'}</button>
          </p>
          <div>
            <p style={{display: 'inline-block'}}>Volume</p>
            <p className="App-intro" style={{display: 'inline-block',paddingLeft: '10px'}}>
              <input ref={(slider) => this.slider = slider} onChange={this.handleSliderChange} type="range" style={{width: '200px'}} min="0.0" max="127" />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
