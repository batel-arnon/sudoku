import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* This is where the homepage loads */}
        <Route path="/app" element={<ReactApp />} /> {/* This is where the React app loads */}
      </Routes>
    </Router>
  );
}

function Homepage() {
  return (
    <div>
      <h1>Welcome to My Custom Homepage</h1>
      <p>Click below to enter the React app:</p>
      <a href="/app">Go to App</a>
    </div>
  );
}

function ReactApp() {
  return (
    <div>
      <h1>This is my React App!</h1>
    </div>
  );
}

export default App;
