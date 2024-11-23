import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Flex, HStack, IconButton, useBreakpointValue, Menu, MenuButton, MenuItem, MenuList, MenuDivider } from '@chakra-ui/react';
import { FiShoppingCart, FiUser, FiMenu, FiLogIn, FiUserPlus, FiCoffee, FiTag } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useBasket } from '../../contexts/BasketContext';
import './Navbar.css'; // Import the external CSS file
import './contactbutton'; // Import the external CSS file

function Navbar() {
  const { loggedIn, user } = useAuth();
  const { items } = useBasket();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for changing navbar background
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigate, location]);

  // IntersectionObserver to detect active section
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is in view

    // Observe each section based on their existing IDs
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    // Clean up the observer on unmount
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle smooth scroll to Special Offers
  const scrollToSpecialOffers = () => {
    const specialOffersSection = document.getElementById('special-offers');
    if (specialOffersSection) {
      specialOffersSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <Flex as="nav" className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      {/* Logo Section */}
      <Box>
        <Link to="/" className="navbar-logo" style={{fontFamily: 'Segoe UI Cursive', fontSize: '32px'}}>
          Eastwing
        </Link>
      </Box>

      {/* Desktop Menu Items */}
      {!isMobile && (
       <HStack as="ul" className="navbar-menu">
       <li>
         <a href="#menu" className={activeSection === 'menu' ? 'active' : ''}>Menu</a>
       </li>
       <li>
         <Link to="/" className={activeSection === 'home' ? 'active' : ''}>Home</Link>
       </li>
       <li>
         <a href="#contact-section" className={activeSection === 'contact-section' ? 'active' : ''}>Contact</a>
       </li>
       <li>
         <a href="#location" className={activeSection === 'contact-section' ? 'active' : ''}>Location</a>
       </li>
       

       
     </HStack>
     
      )}

      {/* CTA Buttons */}
      {!isMobile && (
        <HStack spacing={2} mx={4} className="cta-buttons">
          <Button
            leftIcon={<FiCoffee />}
            className="cta-button primary"
            size="sm"
            onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
          >
            Order Now
          </Button>
          <Button
            leftIcon={<FiTag />}
            className="cta-button secondary"
            size="sm"
            onClick={scrollToSpecialOffers}
          >
           Special Offers
          </Button>
        </HStack>
      )}

      {/* Mobile Menu Icon */}
      {isMobile && (
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FiMenu />}
            variant="outline"
            colorScheme="gray"
            aria-label="Options"
          />
          <MenuList>
            <MenuItem 
              icon={<FiCoffee />}
              onClick={() => navigate('/order')}
              className="cta-menu-item"
            >
              Order Now
            </MenuItem>
            <MenuItem 
              icon={<FiTag />}
              onClick={scrollToSpecialOffers}
              className="cta-menu-item"
            >
              Today's Special
            </MenuItem>
            <MenuDivider />
            <MenuItem className="Top text" as={Link} to="/">Products</MenuItem>
            <MenuItem className="Top text" as="a" href="/xtraa/index.html">
              About Us
            </MenuItem>
            {!loggedIn && (
              <>
                <MenuItem as={Link} to="/signin">Login</MenuItem>
                <MenuItem as={Link} to="/signup">Register</MenuItem>
              </>
            )}
            {loggedIn && (
              <>
                <MenuItem as={Link} to="/profile">Profile</MenuItem>
                {user?.role === "admin" && (
                  <MenuItem as={Link} to="/admin">Admin</MenuItem>
                )}
                {items.length > 0 && (
                  <MenuItem as={Link} to="/basket">Basket ({items.length})</MenuItem>
                )}
              </>
            )}
          </MenuList>
        </Menu>
      )}

      {/* Authentication / User Options */}
      {!isMobile && (
        <HStack spacing={4}>
          {!loggedIn ? (
            <>
              <Link to="/signin">
                <Button leftIcon={<FiLogIn />} className="navbar-button">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button leftIcon={<FiUserPlus />} className="navbar-button">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <>
              {items.length > 0 && (
                <Link to="/basket">
                  <Button leftIcon={<FiShoppingCart />} colorScheme="blue" variant="outline">
                    Basket ({items.length})
                  </Button>
                </Link>
              )}

              {user?.role === "admin" && (
                <Link to="/admin">
                  <Button colorScheme="blue" variant="ghost">
                    Admin
                  </Button>
                </Link>
              )}

              <Link to="/profile">
                <Button leftIcon={<FiUser />} colorScheme="teal">
                  Profile
                </Button>
              </Link>
            </>
          )}
        </HStack>
      )}
    </Flex>
  );
}

export default Navbar;
