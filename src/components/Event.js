import React, { Component, Fragment } from "react";

export default class Event extends Component {
  render() {
    const { event, index, onDelete } = this.props;

    let top = event.start;
    let left = event.shift;
    if(event.start >= 300) {
      top = event.start - 300;
      left = event.shift + 270;
    }
    const styles = {
      event: {
        position: "absolute",
        background: "#e2ecf5",
        borderLeftColor: "#6e9ecf",
        borderLeftWidth: "2px",
        borderLeftStyle: "solid",
        width: `${event.visualWidth}px`,
        height: `${event.duration}px`,
        top: `${top}px`,
        left: `${left}px`,
        padding: "4px",
        boxSizing: "border-box",
        fontFamily: "Open Sans",
        fontSize: "14px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
      }
    };

    return (
      <Fragment>
        <div style={styles.event} onClick={() => onDelete(event, index)}>
          {event.title.value}
        </div>
      </Fragment>
    );
  }
}
