import React, { useState, useRef, useEffect } from "react";
import "./ChatBotButton.css";

function ChatBotButton() {

  // ✅ 1. STATES
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  // ✅ 2. FUNCTIONS (HERE — NOT INSIDE RETURN)
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: data.reply }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "⚠️ Something went wrong. Try again." }
      ]);
    } finally {
      setTyping(false);
    }
  };

  // ✅ 3. JSX ONLY HERE
  return (
    <>
      <div className="chat-btn" onClick={() => setOpen(!open)}>💬</div>

      {open && (
        <div className="chat-window">
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i}>{m.text}</div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>📤</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBotButton;
