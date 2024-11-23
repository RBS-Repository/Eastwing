import React, { useState, useRef } from "react";
import {
  Card,
  Text,
  Image,
  Stack,
  Heading,
  CardBody,
  CardFooter,
  Divider,
  ButtonGroup,
  Button,
  Box,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Textarea,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import { useBasket } from "../../contexts/BasketContext";
import { useAuth } from "../../contexts/AuthContext";
// Remove or comment out the App.css import
// import "../../App.css";

// Add this import instead
import "./Card.css";

function CoffeeShopCard({ item }) {
  const { addToBasket, items } = useBasket();
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const initialRef = useRef();
  const toast = useToast(); // Initialize toast

  const findBasketItem = items.find(
    (basket_item) => basket_item._id === item._id
  );

  const handleRating = (e, value) => {
    e.preventDefault();
    setRating(value);
    
    // Show an aesthetically pleasing modal for rating confirmation
    toast({
      position: 'top',
      duration: 3000,
      isClosable: true,
      render: () => (
        <Box
          color='white'
          p={4}
          bg='rgba(0, 0, 0, 0.8)'
          borderRadius='lg'
          boxShadow='2xl'
          backdropFilter='blur(10px)'
        >
          <Stack spacing={3} align='center'>
            <Text fontSize='lg' fontWeight='bold'>
              Rating Submitted
            </Text>
            <Box display='flex' alignItems='center' gap={1}>
              {[...Array(value)].map((_, i) => (
                <StarIcon key={i} color='yellow.400' />
              ))}
            </Box>
            <Text>
              Thank you for rating this product!
            </Text>
          </Stack>
        </Box>
      )
    });
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleBuyNowClick = () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to log in to proceed with the purchase.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    // Handle further submission logic here
  };

  return (
    <>
      <Card id="menu" className="cardContainer">
        <Link to={`/product/${item._id}`}>
          <CardBody p={5}>
            <Box position="relative">
              <Text className="card-date">
                {moment(item.createdAt).format("MMM DD, YYYY")}
              </Text>
              <Image
                src={item.photos[0]}
                alt={item.title}
                className="cardImage"
                loading="lazy"
                boxSize={300}
                objectFit="cover"
                mb={4}
              />
              {item.isNew && <Badge className="badge">New</Badge>}
            </Box>
            <Stack spacing="3" align="center" textAlign="center">
              <Heading className="cardHeading">{item.title}</Heading>
              
              <Text className="card-description">
                {item.description}
              </Text>
              {/* The Star rating inside the card 


              <Box display="flex" justifyContent="center" mb={2}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    color={(hoverRating || rating) >= star ? "orange.400" : "gray.300"}
                    cursor="pointer"
                    boxSize={5}
                    mx={0.5}
                    onClick={(e) => handleRating(e, star)}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                  />
                ))}
              </Box>
                                            */}
              <Text className="cardPrice">₱{item.price.toFixed(2)}</Text>
            </Stack>
          </CardBody>
        </Link>

        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2" w="full">
            {user?.role === "admin" ? (
              <>
                {/* Show "Edit" button for admins */}
                <Button
                  colorScheme="blue"
                  variant="solid"
                  as={Link}
                  to={`/admin/products/${item._id}`} // Directs to the specific admin product detail page
                  w="full"
                  className="cardButton"
                >
                  Edit
                </Button>
                {/* Show "Add to Cart" button for admins */}
                <Button
                  colorScheme={findBasketItem ? "red" : "orange"}
                  variant="solid"
                  onClick={() => addToBasket(item, findBasketItem)}
                  w="full"
                  className="cardButton"
                >
                  {findBasketItem ? "Remove item" : "Add to Cart"}
                </Button>
              </>
            ) : user ? (
              // Show "Add to Cart" button for regular logged-in users
              <>
                <Button
                  colorScheme={findBasketItem ? "red" : "orange"}
                  variant="solid"
                  onClick={() => addToBasket(item, findBasketItem)}
                  w="full"
                  className="cardButton"
                >
                  {findBasketItem ? "Remove" : "Add to Cart"}
                </Button>
                {/* Show "Buy Now" button for regular users */}
                <Button
                  colorScheme="orange"
                  variant="solid"
                  onClick={handleBuyNowClick}
                  w="full"
                  className="cardButton"
                >
                  Buy Now
                </Button>
              </>
            ) : (
              // Show "Sign Up" button for logged-out users
              <>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  as={Link}
                  to="/signup" // Redirects to the signup page
                  w="full"
                  className="cardButton"
                >
                  Sign Up now!
                </Button>
                {/* Show "Buy Now" button for logged-out users */}
                <Button
                  colorScheme="orange"
                  variant="solid"
                  onClick={handleBuyNowClick}
                  w="full"
                  className="cardButton"
                >
                  Buy Now
                </Button>
              </>
            )}
          </ButtonGroup>
        </CardFooter>
      </Card>

      <Modal initialFocusRef={initialRef} isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent borderRadius="xl" boxShadow="lg" bg="gray.50" p={6}>
          <ModalHeader
            fontSize="xl"
            fontWeight="bold"
            textAlign="center"
            color="gray.700"
          >
            Enter Your Shipping Address
          </ModalHeader>
          <ModalCloseButton color="gray.600" />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel fontWeight="semibold" color="gray.600">
                Shipping Address
              </FormLabel>
              <Textarea
                ref={initialRef}
                placeholder="Please enter your full delivery address here..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                size="lg"
                borderRadius="md"
                bg="white"
                boxShadow="sm"
                _focus={{
                  borderColor: "orange.400",
                  boxShadow: "0 0 0 1px rgba(255, 165, 0, 0.6)",
                }}
                _hover={{
                  borderColor: "orange.300",
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={handleSubmitForm}>
              Submit
            </Button>
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CoffeeShopCard;
