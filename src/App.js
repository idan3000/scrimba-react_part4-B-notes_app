import React, { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import ZeroNotesScrean from "./components/ZeroNotesScrean";

const App = () => {
  const nextState = () =>
    JSON.parse(localStorage.getItem(`notesStorage`)) || [];
  const [notesState, setNotesState] = useState(() => nextState());
  const [currentNoteIdState, setCurrentNoteIdState] = useState(
    notesState[0]?.id || ""
  );

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotesState((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteIdState(newNote.id);
  };

  const updateNote = (text) =>
    setNotesState((oldNotes) => {
      const stateWithoutCurrentNote = oldNotes.filter(
        (note) => note.id !== currentNoteIdState
      );
      const prevCurrentNote = oldNotes.find(
        (note) => note.id === currentNoteIdState
      );
      const currentNote = {
        ...prevCurrentNote,
        body: text,
      };
      return [currentNote, ...stateWithoutCurrentNote];
    });

  useEffect(() => {
    localStorage.setItem(`notesStorage`, JSON.stringify(notesState));
  }, [notesState]);

  const findCurrentNote = () =>
    notesState.find((note) => note.id === currentNoteIdState) || notesState[0];

  const deleteNote = (e, noteId) => {
    e.stopPropagation();
    setNotesState((prevState) => {
      if (prevState.length === 1) return [];
      const state = prevState.filter((note) => note.id !== noteId);
      if (noteId === currentNoteIdState) setCurrentNoteIdState(state[0].id);
      return state;
    });
  };

  const NotesScrean = () => (
    <Split sizes={[30, 70]} direction="horizontal" className="split">
      <Sidebar
        notes={notesState}
        currentNote={findCurrentNote()}
        setCurrentNoteId={setCurrentNoteIdState}
        newNote={createNewNote}
        deleteNote={deleteNote}
      />
      {currentNoteIdState && notesState.length > 0 && (
        <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
      )}
    </Split>
  );

  return (
    <main>
      {notesState.length > 0 ? (
        NotesScrean()
      ) : (
        <ZeroNotesScrean createNewNote={createNewNote} />
      )}
    </main>
  );
};
export default App;
