import axios from 'axios'
import CustomChat from '../components/CustomChat'
import ProductCard from '../components/ProductCard';
import { useState } from 'react';


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
  console.log("p", products)
  return (
    <div className="chat-page__wrap">
      <CustomChat fetchAPI={fetchAPI} setProducts={setProducts}/>
      <div className="product-card__list">
        {products?.map((product, i) => (
          <ProductCard key={`product-${i}`} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Chat