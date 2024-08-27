import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';

import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const Note = () => {
  const navigate = useNavigate();
  const { id: noteId } = useParams();
  const [note, setNote] = useState(null)

  useEffect(() => { getNote(); }, [noteId])

  const getNote = async () => {
    if (noteId === 'new') return; // STOPS EARLY
    try {
      const res = await fetch(`http://localhost:5000/notes/${noteId}`);
      const data = await res.json();
      setNote(data);

    } catch (err) {
      setNote(null);
    }
  }

  const createNote = async () => {
    await fetch(`http://localhost:5000/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...note, 'updated': new Date() })
    })
  };

  const updateNote = async () => {
    await fetch(`http://localhost:5000/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...note, 'updated': new Date() })
    })
  };

  const deleteNote = async () => {
    await fetch(`http://localhost:5000/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    navigate('/');
  }

  const handleSubmit = async () => {
    if (noteId !== 'new' && !note.body) {
      await deleteNote();
    } else if (noteId !== 'new') {
      await updateNote();
    } else if (noteId === 'new' && note) {
      await createNote();
    }
    navigate('/');
  }

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to="/"> <ArrowLeft onClick={handleSubmit} /></Link>
        </h3>
        {noteId !== 'new' ? (
          <button onClick={deleteNote}> Delete </button>
        ) : (
          <button onClick={handleSubmit}> Done </button>
        )}
      </div>

      {/* Body - to enter text*/}
      <textarea
        onChange={(e) => { setNote({ ...note, 'body': e.target.value }) }}
        value={note?.body}>
      </textarea>
    </div>
  )
}

export default Note;