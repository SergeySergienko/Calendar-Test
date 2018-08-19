import React, { Component, Fragment } from "react";

export default class Event extends Component {
  render() {
    const { event, index, onDelete } = this.props;

    const styles = {
      event: {
        position: "absolute",
        background: "#e2ecf5",
        borderLeftColor: "#6e9ecf",
        borderLeftWidth: "2px",
        borderLeftStyle: "solid",
        width: `${event.visualWidth}px`,
        height: `${event.duration}px`,
        top: `${event.start}px`,
        left: `${event.shift}px`,
        padding: "4px",
        boxSizing: "border-box",
        fontFamily: "Open Sans",
        fontSize: "14px",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    };

    return (
      <Fragment>
        <div style={styles.event} onClick={() => onDelete(event, index)}>
          {event.title.value} {event.start} - {event.duration}
        </div>
      </Fragment>
    );
  }
}
