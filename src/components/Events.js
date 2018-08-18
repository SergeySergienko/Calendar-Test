import React, { Component, Fragment } from "react";
import Event from "./Event";

const SHORTEN_WIDTH = 100;
const FULL_WIDTH = 200;
const JSON_HEADER =
  "// `start` & `duration` are measured in minutes\n// `start: 0` is 8:00a\n";

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
    // let shortenedElement = newEvents.find(
    //   el =>
    //     event.start >= el.start &&
    //     event.start <= el.start + el.duration &&
    //     event.title !== el.title
    // );
    // let shortenedElement_2 = newEvents.find(
    //   el =>
    //     event.start + event.duration >= el.start &&
    //     event.start + event.duration <= el.start + el.duration &&
    //     event.title !== el.title
    // );

    // console.log("ShortenedElement: ", shortenedElement);
    // console.log("ShortenedElement_2: ", shortenedElement_2);

    // if (shortenedElement) {
    //   shortenedElement.shift = 0;
    //   shortenedElement.visualWidth = FULL_WIDTH;
    // }
    // if (shortenedElement_2) {
    //   shortenedElement_2.shift = 0;
    //   shortenedElement_2.visualWidth = FULL_WIDTH;
    // }
    // ----------------------------------
    const arr = newEvents.map(el => {
      return (el =
        (event.start >= el.start &&
          event.start <= el.start + el.duration &&
          event.title !== el.title) ||
        (el.start >= event.start &&
          el.start <= event.start + event.duration &&
          event.title !== el.title)
          ? el
          : null);
    });
    console.log(arr);
    arr.forEach(el => {
      if (el) {
        el.shift = 0;
        el.visualWidth = FULL_WIDTH;
      }
    });

    //  const shift = arr.includes(SHORTEN_WIDTH) ? SHORTEN_WIDTH : 0;
    //  const visualWidth = arr.includes(SHORTEN_WIDTH) ? SHORTEN_WIDTH : FULL_WIDTH;

    this.setState({
      events: this.state.events.filter((elem, i) => i !== index)
    });
  };

  addEventHandler = () => {
    const newEvents = this.state.events;
    const { start, duration, title } = this.state.currentInput;

    // --- overlapped events check out ---

    // let overlappedElement = newEvents.find(
    //   el => start >= el.start && start <= el.start + el.duration
    // );
    // console.log("OverlappedElement: ", overlappedElement);
    // if (overlappedElement) {
    //   overlappedElement.visualWidth = SHORTEN_WIDTH;
    // }

    // let overlappedElement_2 = newEvents.find(
    //   el =>
    //     start + duration >= el.start &&
    //     start + duration <= el.start + el.duration
    // );
    // console.log("OverlappedElement_2: ", overlappedElement_2);
    // if (overlappedElement_2) {
    //   overlappedElement_2.visualWidth = SHORTEN_WIDTH;
    // }

    // let shift =
    //   (overlappedElement && overlappedElement.shift !== 100) ||
    //   (overlappedElement_2 && overlappedElement_2.shift !== 100)
    //     ? 100
    //     : 0;
    // let visualWidth =
    //   overlappedElement || overlappedElement_2 ? SHORTEN_WIDTH : FULL_WIDTH;

    // ----------------------------------

    const arr = newEvents.map(el => {
      return (el.visualWidth =
        (start >= el.start && start <= el.start + el.duration) ||
        (el.start >= start && el.start <= start + duration)
          ? SHORTEN_WIDTH
          : FULL_WIDTH);
    });
    console.log(arr);

    const shift = arr.includes(SHORTEN_WIDTH) ? SHORTEN_WIDTH : 0;
    const visualWidth = arr.includes(SHORTEN_WIDTH)
      ? SHORTEN_WIDTH
      : FULL_WIDTH;

    // _______________________________________

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

  toJSON = () => {
    let json = JSON.stringify(this.state.events, [
      "start",
      "duration",
      "title"
    ]);
    console.log(JSON_HEADER + "\n" + json);
    alert(JSON_HEADER + "\n" + json);
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
              required
            />
          </div>
          <div>
            <label>Start</label>
            <br />
            <input
              type="number"
              value={this.state.currentInput.start}
              onChange={this.inputStartHandler}
              required
            />
          </div>
          <div>
            <label>Duration</label>
            <br />
            <input
              type="number"
              value={this.state.currentInput.duration}
              onChange={this.inputDurationHandler}
              required
            />
          </div>
          <br />
          <button onClick={this.reset}>Reset</button>
          <button onClick={this.addEventHandler}>Submit</button>
          <button onClick={this.toJSON}>JSON</button>
        </div>
      </Fragment>
    );
  }
}
