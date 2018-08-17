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
        minWidth: '100px',
        maxWidth: "200px",
        height: `${event.duration}px`,
        top: `${event.start}px`,
        left: `${event.shifted}px`,
        padding: "2px",
        margin: "2px",
        fontFamily: "Open Sans",
        fontSize: "14px"
      }
    };

    return (
      <Fragment>
        <div style={styles.event} onClick={()=>onDelete(index)}>{event.title} {event.start} - {event.duration}</div>
      </Fragment>
    );
  }
}
