import React, { Component, Fragment } from "react";
import Event from "./Event";
import EventInput from "./EventInput";

const SHORTEN_WIDTH = 100;
const FULL_WIDTH = 200;
const JSON_HEADER =
  "// `start` & `duration` are measured in minutes\n// `start: 0` is 8:00a\n";

const dummyEvents = [
  {
    start: 0,
    duration: 20,
    title: {
      value: "Exercise Home Exercises"
    },
    visualWidth: FULL_WIDTH,
    shift: 0
  },
  {
    start: 125,
    duration: 70,
    title: {
      value: "Travel to Work"
    },
    visualWidth: FULL_WIDTH,
    shift: 0
  },
  {
    start: 330,
    duration: 50,
    title: {
      value: "Plan the Working Day and Thinking About Future"
    },
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
      title: {
        value: "",
        isValid: false
      }
    }
  };

  deleteEventHandler = (event, index) => {
    const newEvents = this.state.events;

    // --- parallel events check out ---

    const arr = newEvents.filter(el => {
      return (
        ((event.start >= el.start &&
          event.start <= el.start + el.duration &&
          event.title !== el.title) ||
          (el.start >= event.start &&
            el.start <= event.start + event.duration &&
            event.title !== el.title)) &&
        el
      );
    });

    this.setState({
      events: this.state.events.filter((elem, i) => i !== index)
    });

    // console.log(arr);
    
    // dummy check out for overlapped events
    if (arr.length > 0) {
      const arr2 = newEvents.filter(el => {
        return (
          ((arr[0].start >= el.start &&
            arr[0].start <= el.start + el.duration &&
            arr[0].title !== el.title &&
            el.title !== event.title) ||
            (el.start >= arr[0].start &&
              el.start <= arr[0].start + arr[0].duration &&
              arr[0].title !== el.title &&
              el.title !== event.title)) &&
          el
        );
      });
      // console.log(arr2, event);

      arr.forEach(el => {
        if (arr2.length === 0) {
          el.shift = 0;
          el.visualWidth = FULL_WIDTH;
        }
      });
    }
  };

  addEventHandler = () => {
    const newEvents = this.state.events;
    const { start, duration, title } = this.state.currentInput;

    // --- overlapped events check out ---

    const arr = newEvents.filter(el => {
      return (
        ((start >= el.start && start <= el.start + el.duration) ||
          (el.start >= start && el.start <= start + duration)) &&
        el
      );
    });
    // console.log(arr);

    arr.forEach(el => {
      if (el) {
        // el.shift = 0;
        el.visualWidth = SHORTEN_WIDTH;
      }
    });

    const shift = arr.length > 0 ? SHORTEN_WIDTH : 0;
    const visualWidth = arr.length > 0 ? SHORTEN_WIDTH : FULL_WIDTH;
    const titleObj = { value: title.value, isValid: title.isValid };

    newEvents.push({
      start,
      duration,
      title: titleObj,
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
    newCurrentInput.title.value = "";
    newCurrentInput.title.isValid = false;
    this.setState({
      currentInput: newCurrentInput
    });
  };

  toJSON = () => {
    let json = JSON.stringify(
      this.state.events,
      (key, value) => {
        if (key === "shift" || key === "visualWidth") return undefined;
        if (key === "title") return value.value;
        return value;
      },
      1
    );
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
        <div className="container" style={styles.container}>
          {eventList}
        </div>
        <button onClick={this.toJSON}>JSON</button>
        <EventInput
          currentInput={this.state.currentInput}
          onAddEvent={this.addEventHandler}
          onReset={this.reset}
        />
      </Fragment>
    );
  }
}

const styles = {
  container: {
    position: "relative",
    left: "45px",
    // display: "flex",
    // flexDirection: "column",
    // flexWrap: "wrap",
    // alignContent: "space-between",
    height: "330px"
  }
};
