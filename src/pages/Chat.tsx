import axios from 'axios'
import CustomChat from '../components/CustomChat'
import ProductCard from '../components/ProductCard';
import { useState } from 'react';
import WebcamModal from '../components/Webcam';
import { ArrowDownOutlined, CameraOutlined, CloseSquareOutlined } from '@ant-design/icons';
import { faceShapes } from '../constants';
import { FaceShape } from '../types';


const fetchAPI = async (
  messageText: string,
  screenshot: string | null,
  selectedFaceShape: string | null
) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/chat", {
      message: messageText,
      screenshot: screenshot,
      faceShape: selectedFaceShape
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
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [faceShape, setFaceShape] = useState<FaceShape>(faceShapes[0]);

  return (
    <div className="chat__page-wrap">
      <CustomChat
        fetchAPI={fetchAPI}
        setProducts={setProducts}
        setWebcamActive={setWebcamActive}
        screenshot={screenshot}
        selectedFaceShape={faceShape?.shapeType}
      />
      {products?.length ?
      <div id="products" className="product-card__list">
        {products?.map((product, i) => (
          <ProductCard key={`product-${i}`} product={product} />
        ))}
      </div>
      :
      <div className="instructions__wrap">
        <h2>Instructions</h2>
        <h3>Find your perfect pair of sunglasses</h3>
        <p>First, in order to know your face shape to make the best match possible:</p>
        <div className="instructions__flex">
          <p>
            Either take a screenshot of your face, (up close and in good lighting)
          </p>
          <button 
            className="chat__camera-button" 
            onClick={() => setWebcamActive(true)}
          >
            <CameraOutlined />
          </button>
        </div>
        <p>Or select one of the following if you already know your type:</p>
          {!screenshot ? faceShapes.map((shape, i) => (
            <span
              key={`shape-${i}`}
              onClick={() => setFaceShape(shape)}
              className={shape.shapeType === faceShape?.shapeType ? "active tab-select" : "tab-select"}
            >
              {shape.shapeType}
            </span>
          )):
          <span onClick={() => setScreenshot(null)} className="tab-select">Choose face shape</span>
          }
        <div className="faceshape__arrow-wrap">
          <p>Then <strong>ask in the chat</strong> what style you are looking for!</p>
          <a href="#chat" className="faceshape__arrow">
            <ArrowDownOutlined />
          </a>
        </div>
        {faceShape && !screenshot &&
          <div className="faceshapes__wrap">
            <img src={faceShape.image} />
            <div>
              <h3>{faceShape.shapeType}</h3>
              <p>{faceShape.shapeDef}</p>
            </div>
          </div>
        }
      </div>
      }
      {webcamActive && 
        <WebcamModal
          setWebcamActive={setWebcamActive}
          screenshot={screenshot}
          setScreenshot={setScreenshot}
        />
      }
      {products?.length > 0 &&
        <div onClick={() => setProducts([])} className="clear-button">
          <CloseSquareOutlined />
        </div>
      }
    </div>
  )
}

export default Chat