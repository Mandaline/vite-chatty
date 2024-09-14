import React, { useState, useRef, useEffect } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface CustomChatProps {
  fetchAPI: (messageText: string) => Promise<string>;  // Define the prop type for fetchAPI
}

const CustomChat: React.FC<CustomChatProps> = ({ fetchAPI }: any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  // Reference to the bottom of the chat history
  const bottomRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    try {
    
    const result = await fetchAPI(input);
    // Add the user's message
    setMessages([...messages, { sender: "user", text: input }]);

    // Clear the input field
    setInput("");

    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: result }
    ]);
    
    } catch (e) {
      console.log("Error occurred while fetching", e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      {/* Chat History */}
      <div className="chat-history">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {message.text}
          </div>
        ))}
        {/* This is the reference to the bottom of the chat */}
        <div ref={bottomRef} />
      </div>

      {/* Input Field */}
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default CustomChat;

