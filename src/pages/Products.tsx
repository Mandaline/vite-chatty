import { useState, useEffect} from 'react';
import FileUploader from '../components/FileUploader';
import ProductGrid from '../components/ProductGrid';
import axios from 'axios';

interface ImageData {
  id: number;
  title: string;
  user_description: string;
  optimized_description: string;
  image_url: string;
  keywords: string;
}
const flaskUrl = import.meta.env.VITE_FLASK_APP_URL;

const Products = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchImages = async () => {
    try {
      const response = await axios.get<ImageData[]>(`${flaskUrl}/api/get-images`);
      const sortedImages = response.data.sort((a, b) => b.id - a.id);

      setImages(sortedImages);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      fetchImages();
    }
  }, [isLoading]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${flaskUrl}/api/delete-image/${id}`);
        setImages(images.filter(image => image.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="product__page-wrap">
      <FileUploader setIsLoading={setIsLoading} isLoading={isLoading} />
      <ProductGrid handleDelete={handleDelete} images={images} />
    </div>
  )
}

export default Products