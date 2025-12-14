import React, { useState } from "react";
import "./ChatBotButton.css";

function ChatBotButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi there!\n🖼️ Give a template name and I’ll help you choose the best one 😊",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

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
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: data.reply },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error. Please try again." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      <div className="chat-btn" onClick={() => setOpen(!open)}>
        💬
      </div>

      {open && (
        <div className="chat-window animate">
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.sender}`}>
                {m.text.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            ))}
            {typing && <div className="typing">Typing...</div>}
          </div>

          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about templates..."
            />
            <button onClick={sendMessage}>📤</button>
          </div>
        </div>
      )}
    </>
  );
}       

export default ChatBotButton;
