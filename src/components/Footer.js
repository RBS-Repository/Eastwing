// Footer.js
import React from 'react';
import { Box, Container, Grid, VStack, Text, Heading, Input, Textarea, Button, Icon, Link } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaCoffee } from 'react-icons/fa';
import BackToTopButton from './BackToTopButton';
import './Footer.css';

// Features data array for better organization
const features = [
  {
    title: "Fresh Quality Wings",
    description: "We source the highest quality chicken wings and prepare them fresh daily."
  },
  {
    title: "Variety of Flavors",
    description: "From classic buffalo to unique specialty sauces, explore our wing world."
  },
  {
    title: "Welcoming Atmosphere",
    description: "A comfortable space to enjoy wings with friends and family."
  },
  {
    title: "Eco-Friendly Practices", 
    description: "Committed to sustainability with recyclable packaging and responsible sourcing."
  }
];

const Footer = () => {
  return (
    <Box as="footer" id="about-us" className="footer-container">
      <Container maxW="1200px" py={10}>
        {/* Features Section */}
        <VStack spacing={8} mb={12}>
          <Heading className="section-heading" textAlign="center" w="100%">
            Our Features
          </Heading>
          
          <Grid 
            templateColumns={{ 
              base: "1fr", 
              md: "repeat(2, 1fr)", 
              lg: "repeat(4, 1fr)" 
            }} 
            gap={6}
            w="100%"
          >
            {features.map((feature, index) => (
              <Box key={index} className="feature-item" height="100%">
                <VStack align="start" spacing={3}>
                  <Text fontWeight="bold" fontSize="1.1rem">
                    {feature.title}
                  </Text>
                  <Text fontSize="0.95rem" color="whiteAlpha.800">
                    {feature.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </Grid>
        </VStack>

        {/* Contact Form */}
        <Box className="contact-form-container" id="contact-section">
          <Heading className="section-heading" mb={6}>Contact Us</Heading>
          <form 
            action="https://formspree.io/f/xgveklqj" 
            method="POST"
            className="contact-form"
          >
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
              <Input
                name="name"
                placeholder="Your Name"
                required
                className="form-input"
              />
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                required
                className="form-input"
              />
            </Grid>
            <Input
              name="address"
              placeholder="Your Address"
              mt={4}
              className="form-input"
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              mt={4}
              className="form-input"
              rows={4}
            />
            <Button type="submit" className="submit-button" mt={6}>
              Send Message
            </Button>
          </form>
        </Box>

        {/* Contact Info */}
        <Grid 
          templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} 
          gap={6}
          mt={12}
          className="contact-info"
        >
          <VStack className="info-card">
            <Icon as={FaMapMarkerAlt} className="info-icon" />
            <Text fontWeight="bold">Location</Text>
            <Text>Dolores Eastern Samar</Text>
          </VStack>

          <VStack className="info-card">
            <Icon as={FaPhone} className="info-icon" />
            <Text fontWeight="bold">Phone</Text>
            <Text>09632371247</Text>
          </VStack>

          <VStack className="info-card">
            <Icon as={FaEnvelope} className="info-icon" />
            <Text fontWeight="bold">Email</Text>
            <Link href="mailto:avesmoratalpombo@gmail.com">
              avesmoratalpombo@gmail.com
            </Link>
          </VStack>

          <VStack className="info-card">
            <Icon as={FaCoffee} className="info-icon" />
            <BackToTopButton />
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
