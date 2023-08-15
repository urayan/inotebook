import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import AlertState from './context/notes/AlertSatate';
import Alert from './components/Alert';

function App() {
  return (
    <>
      <NoteState>
        <AlertState>
          <Router>
            <Navbar />
            <Alert />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
            </Routes>
          </Router>
        </AlertState>
      </NoteState>
    </>
  );
}

export default App;
