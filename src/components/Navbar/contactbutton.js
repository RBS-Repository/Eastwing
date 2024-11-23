import React from 'react';

const ContactButton = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button onClick={scrollToContact}>Contact</button>
  );
};

export default ContactButton;