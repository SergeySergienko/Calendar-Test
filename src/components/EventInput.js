import React, {Component} from 'react';

export default class EventInput extends Component {
  inputTitleHandler = e => {
    const newInput = this.props.currentInput;
    newInput.title.value = e.target.value;
    let isValid = newInput.title.value.length > 0;
    newInput.title.isValid = isValid;
    this.setState({
      currentInput: newInput
    });
  };
  inputStartHandler = e => {
    const newInput = this.props.currentInput;
    newInput.start = parseInt(e.target.value, 10);

    // let isValid = newInput.start
    this.setState({
      currentInput: newInput
    });
  };
  inputDurationHandler = e => {
    const newInput = this.props.currentInput;
    newInput.duration = parseInt(e.target.value, 10);
    this.setState({
      currentInput: newInput
    });
  };

  render() {
    const {currentInput} = this.props;

    return(
      <div style={{ position: "absolute", top: "400px" }}>
      <div>
        <label>Title</label>
        <br />
        <input
          type="text"
          placeholder= "Event title"
          value={currentInput.title.value}
          onChange={this.inputTitleHandler}
          required
        />
      </div>
      <div>
        <label>Start</label>
        <br />
        <input
          type="number"
          placeholder= "Start time"
          value={currentInput.start}
          onChange={this.inputStartHandler}
          required
        />
      </div>
      <div>
        <label>Duration</label>
        <br />
        <input
          type="number"
          placeholder= "Duration time"
          value={currentInput.duration}
          onChange={this.inputDurationHandler}
          required
        />
      </div>
      <br />
      <button onClick={this.props.onReset}>Reset</button>
      <button onClick={this.props.onAddEvent} disabled={!currentInput.title.isValid} >Submit</button>
    </div>

    )
  }
}