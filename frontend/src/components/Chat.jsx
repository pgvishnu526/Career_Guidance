import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chat.css";
import CareerCard from "./CareerCard";
import SkillAdvisor from "./SkillAdvisor";

export default function Chat() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your Career AI assistant. I can help you explore career options, suggest skills to develop, and provide personalized career guidance. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleAsk = async () => {
    if (!query.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentQuery = query;
    setQuery("");
    setIsThinking(true);

    try {
      const response = await axios.post("http://localhost:8000/ask", { query: currentQuery });
      setResult(response.data);
      
      // Add bot response to chat
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.data.suggestion,
        result: response.data, // Store full result for displaying cards
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsThinking(false);
      
    } catch (err) {
      console.error(err);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "Sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setResult({ suggestion: "Error fetching response." });
      setIsThinking(false);
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Hello! I'm your Career AI assistant. I can help you explore career options, suggest skills to develop, and provide personalized career guidance. What would you like to know?",
        timestamp: new Date()
      }
    ]);
    setResult(null);
  };

  const suggestedQuestions = [
    "What careers are good for creative people?",
    "I'm interested in technology careers", 
    "What business skills should I develop?",
    "How do I change careers?",
    "What are high-paying remote jobs?"
  ];

  const handleSuggestedQuestion = (question) => {
    setQuery(question);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAsk();
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <h2>Career Guidance & Skill Advisor</h2>
        <p className="chat-subtitle">Ask me anything about careers, skills, and professional development!</p>
      </div>

      {/* Clear Conversation Button */}
      {messages.length > 1 && (
        <div className="clear-conversation">
          <button onClick={clearConversation} className="clear-btn">
            🗑️ Clear Conversation
          </button>
        </div>
      )}

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="suggested-questions">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuestion(question)}
              className="suggested-question"
            >
              {question}
            </button>
          ))}
        </div>
      )}

      {/* Messages Container */}
      <div className="messages-container">
        <div className="messages-list">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="avatar">
                {message.type === 'user' ? 'You' : 'AI'}
              </div>
              <div className="message-content">
                <div className="message-text">
                  {message.content.split('\n').map((line, i) => (
                    <div key={i}>
                      {line}
                      {i < message.content.split('\n').length - 1 && <br />}
                    </div>
                  ))}
                </div>
                <div className="message-time">
                  {formatTime(message.timestamp)}
                </div>

                {/* Display Career Cards and Skill Advisor for bot messages with results */}
                {message.type === 'bot' && message.result && message.result.matches && (
                  <div className="message-results">
                    <div className="top-matches">
                      <h4>🎯 Top Career Matches:</h4>
                      <div className="career-cards-container">
                        {message.result.matches.map((career, idx) => (
                          <CareerCard key={idx} career={career} />
                        ))}
                      </div>
                    </div>

                    {message.result.matches[0] && (
                      <div className="skill-advisor">
                        <h4>📚 Skill Development:</h4>
                        <SkillAdvisor career={message.result.matches[0]} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Thinking Animation */}
          {isThinking && (
            <div className="thinking">
              <div className="avatar">AI</div>
              <div className="thinking-content">
                <span className="thinking-text">Thinking</span>
                <div className="thinking-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="input-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about a career, skills, or professional advice..."
          disabled={isThinking}
        />
        <button onClick={handleAsk} disabled={isThinking || !query.trim()}>
          {isThinking ? (
            <>
              <div className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
              Thinking...
            </>
          ) : (
            <>
              ➤ Ask
            </>
          )}
        </button>
      </div>
    </div>
  );
}