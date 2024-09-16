import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';

interface ImageData {
  id: number;
  title: string;
  user_description: string;
  optimized_description: string;
  image_url: string;
}

const ProductGrid: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  // Fetch image data from the backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get<ImageData[]>('http://127.0.0.1:8000/api/get-images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/delete-image/${id}`);
        // Remove the deleted image from the local state
        setImages(images.filter(image => image.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="image-gallery">
      <div className="">
        {images.map((image) => (
          <div key={image.id} className="flex-container">
            <div className="flex-image">
              <img src={image.image_url} alt={image.title} />
              <div className="title-block">
                <h3>{image.title}</h3>
                
                <button onClick={() => handleDelete(image.id)}><DeleteOutlined /></button>
              </div>
              <p><strong>User Description:</strong> {image.user_description}</p>
            </div>
            <div className="flex-item">
              <ReactMarkdown>{image.optimized_description}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
