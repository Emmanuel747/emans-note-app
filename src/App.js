import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HeaderBar from "./components/Header";
import NotesPage from "./pages/NotesPage";
import Note from "./pages/Note"
import "./App.css";

function App() {

  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <HeaderBar />
          <Routes>
            <Route path="/" exact element={<NotesPage />} />
            <Route path="/note/:id" element={<Note />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

// Don't forget to turn inlineSugges back on