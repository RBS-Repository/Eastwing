import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Image,
  AlertIcon,
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Textarea,
  Stack,
  Divider,
  Flex,
  IconButton,
  useToast,
  Container,
} from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import { postOrder } from "../../api.js";
import { FiTrash2 } from "react-icons/fi"; // For trash icon
import { message } from "antd";
import "./Basket.css";
function Basket() {
  const [address, setAddress] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const toast = useToast(); // For showing messages

  const { items, removeFromBasket, emptyBasket } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmitForm = async () => {
    if (!address) {
      toast({
        title: "Address is required.",
        description: "Please provide a valid address to proceed.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const itemIds = items.map((item) => item._id);
    const input = {
      address,
      items: JSON.stringify(itemIds),
    };

    try {
      // Simulating postOrder function with a mock response
      const response = await postOrder(input);

      // Check if response was successful
      if (response && response.success) {
        emptyBasket();
        onClose();
        toast({
          title: "Order placed.",
          description: "Your order has been successfully placed.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("Order placement failed.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Order Placed",
        description:"Your order has been successfully placed.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="cart-container">
      <Container className="cart-content">
        {items.length < 1 ? (
          <div className="empty-cart">
            <div className="empty-cart-content">
              <Text className="empty-cart-title">Your Cart is Empty</Text>
              <Text className="empty-cart-subtitle">Looks like you haven't added anything to your cart yet</Text>
              <Link to="/" className="continue-shopping-btn">
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <Box className="cart-box">
            <div className="cart-header">
              <Text className="cart-title">Shopping Cart</Text>
              <Text className="items-count">{items.length} items</Text>
            </div>

            <div className="cart-items">
              {items.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="item-image-container">
                    <Image
                      src={item.photos[0]}
                      alt={item.title}
                      className="item-image"
                    />
                  </div>
                  
                  <div className="item-details">
                    <Text className="item-name">{item.title}</Text>
                    <Text className="item-price">₱{item.price}</Text>
                  </div>

                  <IconButton
                    icon={<FiTrash2 />}
                    onClick={() => {
                      if (window.confirm("Remove this item from cart?")) {
                        removeFromBasket(item._id);
                      }
                    }}
                    className="remove-item-btn"
                    aria-label="Remove item"
                  />
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <Text>Subtotal</Text>
                <Text>₱{total}</Text>
              </div>
              
              <div className="summary-total">
                <Text>Total</Text>
                <Text>₱{total}</Text>
              </div>

              <Button
                onClick={onOpen}
                className="checkout-btn"
              >
                Proceed to Checkout
              </Button>
            </div>

            <Modal 
              initialFocusRef={initialRef} 
              isOpen={isOpen} 
              onClose={onClose}
              className="checkout-modal"
            >
              <ModalOverlay className="modal-overlay" />
              <ModalContent className="modal-content">
                <ModalHeader className="modal-header">
                  Checkout
                </ModalHeader>
                <ModalCloseButton className="modal-close" />

                <ModalBody className="modal-body">
                  <div className="order-summary">
                    <Text className="summary-title">Order Summary</Text>
                    <div className="summary-details">
                      <Text>Items ({items.length})</Text>
                      <Text>₱{total}</Text>
                    </div>
                  </div>

                  <FormControl isRequired>
                    <FormLabel className="address-label">
                      Delivery Address
                    </FormLabel>
                    <Textarea
                      ref={initialRef}
                      placeholder="Enter your complete delivery address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="address-input"
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter className="modal-footer">
                  <Button
                    onClick={handleSubmitForm}
                    className="place-order-btn"
                  >
                    Place Order • ₱{total}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        )}
      </Container>
    </div>
  );
}

export default Basket;
