import React from 'react';

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
    color: props.isHeld ? "white" : "black",
  };

  return (
    <div className="p-2">
      <button
        className="w-full h-full font-extrabold px-4 py-2 rounded flex items-center justify-center shadow-md"
        style={styles}
        onClick={props.toggleHold}
      >
        {props.value}
      </button>
    </div>
  );
}

export default Die;
