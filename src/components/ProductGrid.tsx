import React from 'react';
import ReactMarkdown from 'react-markdown';
import { DeleteOutlined } from '@ant-design/icons';

interface ImageData {
  id: number;
  title: string;
  user_description: string;
  optimized_description: string;
  image_url: string;
  keywords: string;
}

interface ProductGridProps {
  images: ImageData[];
  handleDelete: (id: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ images, handleDelete }) => {

  return (
    <div className="image-gallery">
      {images.map((image: ImageData) => (
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
            <h3 className="keywords">Keywords</h3>
            <p>{image.keywords}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
