import React, { Component, Fragment } from "react";
import Event from "./Event";
import EventInput from "./EventInput";
import getChainID from "../utils/getChainID";
import getEventProperties from "../utils/getEventProperties";

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

  // get array with overlapped events for particular event
  getOverlappedEvents = (event, eventArray) => {
    const { start, duration } = event;
    const end = start + duration;
    return eventArray.filter(item => {
      return (
        ((start >= item.start && start <= item.start + item.duration) ||
          (item.start >= start && item.start <= end)) &&
        item
      );
    });
  };

  // has the array overlapped events?
  hasOverlapped = eventArray => {
    let hasOverlapped = false;
    eventArray.forEach((event, index, array) => {
      const cutArr = array.filter(item => item.title !== event.title);
      const overArr = this.getOverlappedEvents(event, cutArr);
      if (overArr.length > 0) {
        hasOverlapped = true;
      }
    });
    return hasOverlapped;
  };
  getChainIdArray = eventArray => {
    return eventArray.filter(item => item.chainID);
  };

  addEventHandler = () => {
    // const newEvents = this.state.events;
    const { start, duration, title } = this.state.currentInput;

    // --- overlapped events check out ---

    // const arr = newEvents.filter(el => {
    //   return (
    //     ((start >= el.start && start <= el.start + el.duration) ||
    //       (el.start >= start && el.start <= start + duration)) &&
    //     el
    //   );
    // });
    const overlappedArray = this.getOverlappedEvents(
      this.state.currentInput,
      this.state.events
    );
    console.log("Overlapped array: ", overlappedArray);
    console.log(
      "are the events inside overlapped? ",
      this.hasOverlapped(overlappedArray)
    );
    console.log("Array with chainID: ", this.getChainIdArray(overlappedArray));

    const CHAIN_ID = getChainID();
    overlappedArray.forEach(el => {
      if (el) {
        // el.shift = 0;
        el.visualWidth = SHORTEN_WIDTH;
        el.chainID = CHAIN_ID;
      }
    });

    const shift = overlappedArray.length > 0 ? SHORTEN_WIDTH : 0;
    const visualWidth = overlappedArray.length > 0 ? SHORTEN_WIDTH : FULL_WIDTH;
    const titleObj = { value: title.value, isValid: title.isValid };
    const chainID = overlappedArray.length > 0 ? CHAIN_ID : null;

    // newEvents.push({
    //   start,
    //   duration,
    //   title: titleObj,
    //   visualWidth,
    //   shift
    // });

    const eventList = [
      ...this.state.events,
      { start, duration, title: titleObj, visualWidth, shift, chainID }
    ];

    this.setState({
      events: eventList
    });
    this.reset();
  };

  addEventHandler_2 = () => {
    const { start, duration, title } = this.state.currentInput;

    const properties = getEventProperties(
      this.state.currentInput,
      this.state.events
    );
    const titleObj = { value: title.value, isValid: title.isValid };

    console.log(properties)
if (!properties) return alert("Too many events!");

    const newEvents = [
      ...this.state.events,
      {
        start,
        duration,
        title: titleObj,
        visualWidth: properties.visualWidth,
        shift: properties.shift,
        chainID: properties.chainID
      }
    ];

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
        if (key === "shift" || key === "visualWidth")
          return undefined;
        if (key === "title") return value.value;
        return value;
      },
      1
    );
    const phrase =
      JSON_HEADER +
      "\n" +
      "Events amount: " +
      this.state.events.length +
      "\n" +
      json;

    console.log(phrase);
    alert(phrase);
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
          onAddEvent={this.addEventHandler_2}
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
