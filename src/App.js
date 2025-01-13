import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/" className="Nav_Links">Login</Link>
            </li>
            <li>
              <Link to="/Register" className="Nav_Links">Register</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact="true" path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
