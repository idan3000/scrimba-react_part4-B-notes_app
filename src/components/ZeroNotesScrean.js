import React from "react";

const ZeroNotesScrean = (props) => (
  <div className="no-notes">
    <h1>You have no notes</h1>
    <button className="first-note" onClick={props.createNewNote}>
      Create one now
    </button>
  </div>
);
export default ZeroNotesScrean;
