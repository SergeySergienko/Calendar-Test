import React, { Component, Fragment } from "react";
import Event from "./Event";

const dummyEvents = [
  { start: 0, duration: 20, title: "Exercise", visualWidth: 200, shifted: 0 },
  { start: 25, duration: 30, title: "Travel to Work", visualWidth: 200, shifted: 0 },
  { start: 120, duration: 50, title: "Plan the Day", visualWidth: 200, shifted: 0 }
];

export default class Events extends Component {
  state = {
    events: dummyEvents,
    currentInput: {
      start: "",
      duration: "",
      title: ""
    }
  };

  deleteHandler = index => {
    this.setState({
      events: this.state.events.filter((elem, i) => i !== index)
    });
  };

  addEventHandler = () => {
    const newEvents = this.state.events;
    const { start, duration, title } = this.state.currentInput;
    // console.log(newEvents);

    let overlappedElement = newEvents.find(
      el =>
        (start >= el.start && start <= el.start + el.duration) ||
        (el.start >= start && el.start <= start + duration)
    );
    console.log(overlappedElement);
    let shift = overlappedElement ? 100 : 0;
    let visualWidth = overlappedElement ? 100 : 200;
    overlappedElement.visualWidth = 100;

    newEvents.push({
      start,
      duration,
      title,
      visualWidth,
      shift
    });
    this.setState({
      events: newEvents
    });
    this.reset();
  };

  reset = () => {
    const newCurrentInput = this.state.currentInput;
    newCurrentInput.start = "";
    newCurrentInput.duration = "";
    newCurrentInput.title = "";
    this.setState({
      currentInput: newCurrentInput
    });
  };

  inputTitleHandler = e => {
    const newInput = this.state.currentInput;
    newInput.title = e.target.value;
    this.setState({
      currentInput: newInput
    });
  };
  inputStartHandler = e => {
    const newInput = this.state.currentInput;
    newInput.start = parseInt(e.target.value, 10);
    this.setState({
      currentInput: newInput
    });
  };
  inputDurationHandler = e => {
    const newInput = this.state.currentInput;
    newInput.duration = parseInt(e.target.value, 10);
    this.setState({
      currentInput: newInput
    });
  };

  render() {
    const eventList = this.state.events.map((event, index) => (
      <Fragment key={index}>
        <Event event={event} index={index} onDelete={this.deleteHandler} />
      </Fragment>
    ));
    return (
      <Fragment>
        <h2>Event List</h2>

        <div className="container" style={{ position: "relative" }}>
          {eventList}
        </div>

        <div style={{ position: "absolute", top: "400px" }}>
          <div>
            <label>Title</label>
            <br />
            <input
              type="text"
              value={this.state.currentInput.title}
              onChange={this.inputTitleHandler}
            />
          </div>
          <div>
            <label>Start</label>
            <br />
            <input
              type="number"
              value={this.state.currentInput.start}
              onChange={this.inputStartHandler}
            />
          </div>
          <div>
            <label>Duration</label>
            <br />
            <input
              type="number"
              value={this.state.currentInput.duration}
              onChange={this.inputDurationHandler}
            />
          </div>
          <br />
          <button onClick={this.reset}>Reset</button>
          <button onClick={this.addEventHandler}>Submit</button>
        </div>
      </Fragment>
    );
  }
}
