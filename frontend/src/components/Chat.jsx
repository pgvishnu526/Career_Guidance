import React, { useState } from "react";
import axios from "axios";
import CareerCard from "./CareerCard";  // Correct path - same directory
import "./Chat.css";  // Correct path - in styles folder


const API_URL = "http://localhost:8000/ask";

function Chat() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleAsk = async () => {
    if (!query.trim()) return;
    
    // Add user message to chat history
    const userMessage = { type: "user", content: query };
    setChatHistory(prev => [...prev, userMessage]);
    
    setIsLoading(true);
    try {
      const res = await axios.post(API_URL, { query });
      setResponse(res.data);
      
      // Add AI response to chat history
      const aiMessage = { 
        type: "ai", 
        content: res.data.suggestion,
        matches: res.data.matches
      };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = { 
        type: "ai", 
        content: "Sorry, I'm having trouble connecting to the career database. Please try again later.",
        isError: true
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setQuery("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    setResponse(null);
  };

  const sampleQuestions = [
    "What careers are good for creative people?",
    "I'm good with numbers, what jobs should I consider?",
    "What are some high-demand tech careers?",
    "I enjoy helping people, what careers match this?"
  ];

  const handleSampleQuestionClick = (question) => {
    setQuery(question);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Career Explorer</h1>
        <p>Discover careers that match your skills and interests</p>
        {chatHistory.length > 0 && (
          <button className="clear-chat-btn" onClick={clearChat}>
            Clear Conversation
          </button>
        )}
      </div>

      <div className="chat-messages">
        {chatHistory.length === 0 ? (
          <div className="welcome-message">
            <div className="welcome-icon">💼</div>
            <h2>Hello! I'm your Career Assistant</h2>
            <p>Tell me about your skills, interests, or career goals and I'll suggest matching professions.</p>
            
            <div className="sample-questions">
              <h3>Try asking:</h3>
              {sampleQuestions.map((question, i) => (
                <div 
                  key={i} 
                  className="sample-question"
                  onClick={() => handleSampleQuestionClick(question)}
                >
                  {question}
                </div>
              ))}
            </div>
          </div>
        ) : (
          chatHistory.map((message, i) => (
            <div key={i} className={`message ${message.type}-message`}>
              <div className="message-content">
                {message.type === "user" ? (
                  <div className="user-bubble">
                    <div className="avatar">You</div>
                    <div className="text">{message.content}</div>
                  </div>
                ) : (
                  <div className="ai-bubble">
                    <div className="avatar">Career AI</div>
                    <div className="text">
                      {message.isError ? (
                        <div className="error-message">{message.content}</div>
                      ) : (
                        <>
                          <div className="suggestion">{message.content}</div>
                          {message.matches && message.matches.length > 0 && (
                            <>
                              <h4>Matched Careers:</h4>
                              <div className="career-matches">
                                {message.matches.map((career, idx) => (
                                  <CareerCard key={idx} career={career} />
                                ))}
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="message ai-message">
            <div className="message-content">
              <div className="ai-bubble">
                <div className="avatar">Career AI</div>
                <div className="text">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-container">
        <div className="input-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about careers (e.g., What careers are good for creative people?)"
            className="chat-input"
            disabled={isLoading}
          />
          <button 
            onClick={handleAsk} 
            className="send-button"
            disabled={isLoading || !query.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;