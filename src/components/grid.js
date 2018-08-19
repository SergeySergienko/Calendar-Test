import React from "react";

const grid = () => {
  let timeGrid = [];
  for (let i = 8; i <= 17; i++) {
    const hour = (
      <div key={i} style={styles.hourBlock}>
        <hr style={{ margin: 0, width: "243px" }} color="#eee"/>
        <div style={styles.hour}>
          {i}
          :00
        </div>
        <div style={styles.minute}>
          {i}
          :30
        </div>
      </div>
    );
    timeGrid.push(hour);
  }

  return <div style={styles.grid}>{timeGrid}</div>;
};

export default grid;

const styles = {
  grid: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignContent: "space-between",
    position: "absolute",
    height: "300px"
  },
  hourBlock: {
    height: "60px",
    width: "270px",
    display: "flex",
    flexDirection: "column",
    color: "#aaa"
  },
  hour: {
    fontFamily: "Open Sans",
    fontSize: "16px",
    fontWeight: "200"
  },
  minute: {
    fontFamily: "Open Sans",
    fontSize: "12px",
    fontWeight: "200",
    lineHeight: "30px"
  }
};
