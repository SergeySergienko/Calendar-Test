import React, { Component, Fragment } from "react";
import Event from "./Event";

const SHORTEN_WIDTH = 100;
const FULL_WIDTH = 200;

const dummyEvents = [
  {
    start: 0,
    duration: 20,
    title: "Exercise",
    visualWidth: FULL_WIDTH,
    shift: 0
  },
  {
    start: 25,
    duration: 30,
    title: "Travel to Work",
    visualWidth: FULL_WIDTH,
    shift: 0
  },
  {
    start: 120,
    duration: 50,
    title: "Plan the Day",
    visualWidth: FULL_WIDTH,
    shift: 0
  }
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

  deleteEventHandler = (event, index) => {
    // --- parallel events check out ---
    const newEvents = this.state.events;
    let shortenedElement = newEvents.find(
      el =>
        (event.start >= el.start &&
          event.start <= el.start + el.duration &&
          event.title !== el.title) ||
        (el.start >= event.start &&
          el.start <= event.start + event.duration &&
          event.title !== el.title)
    );
    console.log("ShortenedElement: ", shortenedElement);
    if (shortenedElement) {
      shortenedElement.shift = 0;
      shortenedElement.visualWidth = FULL_WIDTH;
    }
    // ----------------------------------

    this.setState({
      events: this.state.events.filter((elem, i) => i !== index)
    });
  };

  addEventHandler = () => {
    const newEvents = this.state.events;
    const { start, duration, title } = this.state.currentInput;

    // --- overlapped events check out ---
    let overlappedElement = newEvents.find(
      el =>
        (start >= el.start && start <= el.start + el.duration) ||
        (el.start >= start && el.start <= start + duration)
    );
    console.log("OverlappedElement: ", overlappedElement);
    let shift = overlappedElement && overlappedElement.shift !== 100 ? 100 : 0;
    let visualWidth = overlappedElement ? SHORTEN_WIDTH : FULL_WIDTH;
    if (overlappedElement) {
      overlappedElement.visualWidth = SHORTEN_WIDTH;
    }
    // ----------------------------------

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
        <Event event={event} index={index} onDelete={this.deleteEventHandler} />
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
