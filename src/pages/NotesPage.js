import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { API_BASE_URL } from '../constants';
import AddButton from '../components/AddButton'
import ListItem from '../components/Listitem';

const NotesPage = () => {
  const location = useLocation();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, [location]);

  const getNotes = async () => {
    const res = await fetch(`${API_BASE_URL}`);
    const data = await res.json();
    setNotes(data);
  }

  return (
    <div className="notes">
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>

      <div className='notes-list'>
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  )
}

export default NotesPage;