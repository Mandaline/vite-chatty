import ReactMarkdown from "react-markdown";

const ProductCard = ({ product }: any) => {

  return (
    <div className="product-card">
      <div className="image-wrap">
        <img src={product.image_url} />
        <div className="metadata">
          <h3>{product.title}</h3>
          <p>{product.keywords}</p>
        </div>
      </div>
      <div className="text-wrap">
        <ReactMarkdown>{product.optimized_description}</ReactMarkdown>
      </div>
    </div>
  )
};
export default ProductCard;