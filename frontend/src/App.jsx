import React from "react";
import Chat from "./components/Chat";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>
            <span className="icon">💡</span>
            Career Guidance RAG Bot
          </h1>
          <p>Discover your ideal career path with AI-powered guidance</p>
        </div>
      </header>
      <main className="app-main">
        <Chat />
      </main>
      <footer className="app-footer">
        <p>Powered by AI Career Assistance • Find your perfect career match</p>
      </footer>
    </div>
  );
}

export default App;