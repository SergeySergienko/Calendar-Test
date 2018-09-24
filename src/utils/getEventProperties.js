import getChainID from "./getChainID";

const SHORTEN_WIDTH = 100;
const FULL_WIDTH = 200;

// get array with overlapped events for particular event
const getOverlappedArray = (event, eventList) => {
  const { start, duration } = event;
  const end = start + duration;
  return eventList.filter(item => {
    return (
      ((start >= item.start && start <= item.start + item.duration) ||
        (item.start >= start && item.start <= end)) &&
      item
    );
  });
};

// has the array overlapped events?
const hasOverlappedEvents = eventArray => {
  let hasOverlapped = false;
  eventArray.forEach((event, index, array) => {
    const cutArr = array.filter(item => item.title !== event.title);
    const overArr = getOverlappedArray(event, cutArr);
    if (overArr.length > 0) {
      hasOverlapped = true;
    }
  });
  return hasOverlapped;
};

// filter array by events with chainID
const getChainIdArray = eventArray => {
  return eventArray.filter(item => item.chainID);
};

const insertEvent = (overlappedArray, chainIDArray) => {
  overlappedArray.forEach(item => {
    item.visualWidth = SHORTEN_WIDTH;
    item.shift = chainIDArray[0].shift;
    item.chainID = chainIDArray[0].chainID;
  });

  const shift = chainIDArray[0].shift === 0 ? SHORTEN_WIDTH : 0;
  const chainID = chainIDArray[0].chainID;
  return {
    visualWidth: SHORTEN_WIDTH,
    shift,
    chainID
  };
};

// turn over the shift of the events chain
const invertShift = eventList => {
  eventList.forEach(
    item => (item.shift = item.shift === 0 ? SHORTEN_WIDTH : 0)
  );
};

const attachEvent = overlappedArray => {
  const chainID = getChainID();
  overlappedArray.forEach(item => {
    item.visualWidth = SHORTEN_WIDTH;
    item.shift = 0;
    item.chainID = chainID;
  });
  return {
    visualWidth: SHORTEN_WIDTH,
    shift: SHORTEN_WIDTH,
    chainID
  };
};

//-----------------------------------------------------------//

export default (event, eventList) => {
  const overlappedArray = getOverlappedArray(event, eventList);
  if (overlappedArray.length === 0) {
    return {
      visualWidth: FULL_WIDTH,
      shift: 0,
      chainID: null
    };
  }

  if (hasOverlappedEvents(overlappedArray)) return console.log("STOP");

  const chainIDArray = getChainIdArray(overlappedArray);

  if (chainIDArray.length === 0) {
    return attachEvent(overlappedArray);
  }
  if (chainIDArray.length === 1) {
    return insertEvent(overlappedArray, chainIDArray);
  }
  if (chainIDArray.length === 2) {
    const secondChainArray = eventList.filter(
      item => item.chainID === chainIDArray[1].chainID
    );
    if (chainIDArray[0].shift !== chainIDArray[1].shift) {
      invertShift(secondChainArray);
    }
    secondChainArray.forEach(item => item.chainID = chainIDArray[0].chainID);
    return insertEvent(overlappedArray, chainIDArray);
  }
};
