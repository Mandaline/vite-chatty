import React, { useState, useRef, useEffect } from "react";
import parse from "html-react-parser";
import { CameraOutlined, SendOutlined } from "@ant-design/icons";
import { ProductData } from "./types";

interface Message {
  sender: "user" | "bot";
  text: string | JSX.Element;
}

interface FetchAPIResult {
  message: string;
  screenshot: string | null;
  products: ProductData[]; // Array of ProductData objects
}

interface CustomChatProps {
  fetchAPI: (messageText: string, screenshot: string | null) => Promise<FetchAPIResult>;
  setProducts: (product: any) => void;
  screenshot: string | null;
  setWebcamActive: (active: boolean) => void;
}

const CustomChat: React.FC<CustomChatProps> = ({
  fetchAPI,
  setProducts,
  setWebcamActive,
  screenshot,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

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
      const result = await fetchAPI(input, screenshot);

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
    <div className="chat-container">
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
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-container">
        <button className="camera-button" onClick={() => setWebcamActive(true)}>
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

const TypingAnimation: React.FC = () => (
  <div className="typing">
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </div>
);

export default CustomChat;
