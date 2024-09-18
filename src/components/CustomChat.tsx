import React, { useState, useRef, useEffect } from "react";
import parse from 'html-react-parser';
import { CameraOutlined, SendOutlined } from "@ant-design/icons";
import { ProductData } from "./types";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface FetchAPIResult {
  message: string;
  products: ProductData[];  // Array of ProductData objects
}

interface CustomChatProps {
  fetchAPI: (messageText: string) => Promise<FetchAPIResult>
  setProducts: (product: any) => void;
  screenshot: string | null;
  setWebcamActive: (active: boolean) => void;
}

const CustomChat: React.FC<CustomChatProps> = ({
  fetchAPI,
  setProducts,
  setWebcamActive,
  screenshot
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    try {
    
    const result = await fetchAPI(input);
  
    setMessages([...messages, { sender: "user", text: input }]);

    setInput("");

    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: result.message }
    ]);

    setProducts(result?.products)
    
    } catch (e) {
      console.log("Error occurred while fetching", e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  console.log(messages)
  return (
    <div className="chat-container">
      <div className="chat-history">
        {messages.map((message, index) => {
          
          const text = message.sender === "user" ? message.text : parse(message.text)
          return (
            <div
            key={index}
            className={`chat-message ${
              message.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {text}
          </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-container">
        <button
          className="camera-button"
          onClick={() => setWebcamActive(true)}
        >
          <CameraOutlined />
          {screenshot && <div className="camera-badge">1</div>}
        </button>
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="send-button" onClick={handleSendMessage}>
          <SendOutlined />
        </button>
      </div>
    </div>
  );
};

export default CustomChat;

