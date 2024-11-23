import React, { useState, useEffect } from 'react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button onClick={scrollToTop} style={styles.button}>
        ↑ 
      </button>
    )
  );
};

// Inline CSS styles for the button
const styles = {
  button: {
    position: 'fixed',
    bottom: '50px',
    right: '100px',
    width: '70px',  // Ensure circular shape
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',  // Adjust font for circular space
    borderRadius: '50%',
    backgroundColor: '#ff6600',  // Orange scheme
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'opacity 0.4s, transform 0.3s',
    opacity: 0.8,
    
  },
  buttonHover: {
    transform: 'scale(3.1)',  // Slightly larger on hover
    opacity: 1,
  },
  
};

export default BackToTopButton;
