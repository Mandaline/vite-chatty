import FileUploader from '../components/FileUploader';
import ProductGrid from '../components/ProductGrid';

const Products = () => {
  return (
    <div className="product-page">
      <FileUploader />
      <ProductGrid />
    </div>
  )
}

export default Products