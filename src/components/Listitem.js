import React from 'react'
import { Link } from "react-router-dom";

const getTitle = (note) => {
  // split by new lines and just get the first line
  // split will make a list of each line and will only pull on the first 
  const title = note.body.split('\n')[0];
  if (title.length > 45) {
    return title.slice(0, 45);
  }
  return title;
}

const getTime = (note) => {
  return new Date(note.updated).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
}

const getContent = (note) => {
  //
  const title = getTitle(note);
  const content = note.body.replaceAll('\n', '').replaceAll(title, ''); // trimming down

  if (content.length > 45) {
    return content.slice(0, 45) + '...';
  } else return content
}

const ListItem = ({ note }) => {
  return (
    <Link to={`/note/${note.id}`}>
      <div id={note.id} className="notes-list-item">
        <h2>{getTitle(note)}</h2>
        <p>
          <span>{getTime(note)}</span>
          <div>{getContent(note)}</div>
        </p>
      </div>
    </Link>
  )
}

export default ListItem