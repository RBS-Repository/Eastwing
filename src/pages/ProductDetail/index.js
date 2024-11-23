import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from "../../api";
import { Box, Text, Button, Image } from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import { Link } from "react-router-dom";
import moment from "moment";
import { FiArrowLeft } from "react-icons/fi";
import "./ProductDetailuser.css";

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div>Error.</div>;
  }

  const findBasketItem = items.find((item) => item._id === product_id);

  return (
    <div className="product-detail-container">
      <div className="product-content">
        <div className="product-image-section">
          <Image
            src={data.photos[0]}
            alt={data.title}
            className="product-image"
          />
          <Text className="product-date">
            Added {moment(data.createdAt).format("MMMM DD, YYYY")}
          </Text>
        </div>

        <div className="product-info">
          <Text className="product-title">{data.title}</Text>
          <Text className="product-description">{data.description}</Text>
          <Text className="product-price">₱{data.price}</Text>

          <Button
            onClick={() => addToBasket(data, findBasketItem)}
            className={`cart-button ${findBasketItem ? 'remove' : 'add'}`}
          >
            {findBasketItem ? 'Remove from Cart' : 'Add to Cart'}
          </Button>
        </div>

        <Link to="/" className="back-button">
          <FiArrowLeft /> Back to Products
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;
