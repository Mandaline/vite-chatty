import React, { useState, useRef, useEffect } from "react";
import parse from "html-react-parser";
import { CameraOutlined, SendOutlined } from "@ant-design/icons";
import { CustomChatProps, Message } from "../types";


const CustomChat: React.FC<CustomChatProps> = ({
  fetchAPI,
  setProducts,
  setWebcamActive,
  screenshot,
  selectedFaceShape
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    setLoading(true);
    setMessages([
      ...messages,
      { sender: "user", text: input },
      { sender: "bot", text: <TypingAnimation /> },
    ]);

    setInput("");

    try {
      const result = await fetchAPI(input, screenshot, selectedFaceShape);

      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages.pop();
        return [...updatedMessages, { sender: "bot", text: parse(result.message) as string}];
      });

      setProducts(result?.products);
    } catch (e) {
      console.log("Error occurred while fetching", e);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div id="chat" className="chat__container">
      <div className="chat__history">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat__message ${
              message.sender === "user" ? "chat__user-message" : "chat__bot-message"
            }`}
          >
            {message.text}
          </div>
        ))}
        {!loading && messages.length > 1 &&
          <a href="#products" className="chat__products-link">See products</a>
        }
        <div ref={bottomRef} />
      </div>

      <div className="chat__input-container">
        <button className="chat__camera-button" onClick={() => setWebcamActive(true)}>
          <CameraOutlined />
          {screenshot && <div className="chat__camera-badge">1</div>}
        </button>
        <input
          type="text"
          className="chat__input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="chat__send-button" onClick={handleSendMessage}>
          <SendOutlined />
        </button>
      </div>
    </div>
  );
};

const TypingAnimation: React.FC = () => (
  <div className="typing">
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </div>
);

export default CustomChat;
