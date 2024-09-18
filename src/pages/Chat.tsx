import axios from 'axios'
import CustomChat from '../components/CustomChat'
import ProductCard from '../components/ProductCard';
import { useState } from 'react';
import WebcamModal from '../components/Webcam';


const fetchAPI = async (messageText: string) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/chat", {
      message: messageText
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching API:", error);
    return "Error fetching response";
  }
}

const Chat = () => {
  const [products, setProducts] = useState([]);
  const [webcamActive, setWebcamActive] = useState(false);
  const [screenshot, setScreenshot] = useState(null);

  console.log("p", screenshot)
  return (
    <div className="chat-page__wrap">
      <CustomChat
        fetchAPI={fetchAPI}
        setProducts={setProducts}
        setWebcamActive={setWebcamActive}
        screenshot={screenshot}
      />
      <div className="product-card__list">
        {products?.map((product, i) => (
          <ProductCard key={`product-${i}`} product={product} />
        ))}
      </div>
      {webcamActive && 
        <WebcamModal
          setWebcamActive={setWebcamActive}
          screenshot={screenshot}
          setScreenshot={setScreenshot}
        />
      }
    </div>
  )
}

export default Chat