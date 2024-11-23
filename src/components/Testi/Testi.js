import React, { useState, useCallback, useEffect } from 'react';
import { StarIcon } from '@chakra-ui/icons';
import './index23.css';

const testimonials = [
    {
        text: "Grabe sobrang sarap ng wings nila! Legit na legit yung siga wings, napaka-anghang! Must try talaga!",
        author: "Maria Santos",
        title: "Food Vlogger",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        rating: 5
    },
    {
        text: "Solid ang ambiance dito pre! Perfect tambayan kasama ang tropa. Sulit na sulit ang bucket ng wings!",
        author: "Paolo Dela Cruz",
        title: "Suki Customer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        rating: 5
    },
    {
        text: "Ang sarap ng sauce combinations nila! Pati service napakabilis at super friendly ng staff.",
        author: "Jenny Reyes",
        title: "Food Enthusiast",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        rating: 5
    },
    {
        text: "Panalo ang wings dito! Talagang babalik-balikan mo. Pati yung gravy nila, walang kupas!",
        author: "Ramon Bautista",
        title: "Regular Customer",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        rating: 5
    },
    {
        text: "Sobrang worth it! Hindi ka magsisisi sa lasa. Perfect pulutan sa inuman with friends!",
        author: "Ana Mercado",
        title: "Wing Lover",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        rating: 5
    }
];

const Testimonial = ({ text, author, title, image, rating }) => (
    <div className="testimonial-card">
        <div className="testimonial-content">
            <p className="testimonial-text">{text}</p>
            <div className="testimonial-author">
                <img 
                    src={image} 
                    alt={author} 
                    className="author-image"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/45';
                    }}
                />
                <div className="author-info">
                    <h4 className="author-name">{author}</h4>
                    <p className="author-title">{title}</p>
                    <div className="rating">
                        {[...Array(rating)].map((_, i) => (
                            <StarIcon key={i} className="star-icon" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Get number of items to show based on screen width
    const getItemsToShow = () => {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    };

    const [itemsToShow, setItemsToShow] = useState(getItemsToShow());

    // Update items to show on window resize
    useEffect(() => {
        const handleResize = () => {
            setItemsToShow(getItemsToShow());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const slideTestimonials = useCallback((direction) => {
        if (isAnimating) return;
        
        setIsAnimating(true);
        
        setStartIndex(prevIndex => {
            if (direction === 'next') {
                return (prevIndex + itemsToShow) >= testimonials.length ? 
                    0 : prevIndex + itemsToShow;
            } else {
                return prevIndex === 0 ? 
                    Math.max(0, testimonials.length - itemsToShow) : 
                    Math.max(0, prevIndex - itemsToShow);
            }
        });

        setTimeout(() => setIsAnimating(false), 600);
    }, [isAnimating, itemsToShow]);

    return (
        <section className="testimonials-container">
            <div className="testimonial-heading">
                <h2>What Our Customers Say</h2>
            </div>

            <div className="testimonials-wrapper">
                <div 
                    className="testimonials-grid" 
                    style={{
                        transform: `translateX(-${startIndex * (100 / itemsToShow)}%)`,
                    }}
                >
                    {testimonials.map((testimonial, index) => (
                        <Testimonial 
                            key={index} 
                            {...testimonial}
                        />
                    ))}
                </div>
            </div>

            <div className="testimonial-nav">
                <button 
                    className="nav-button" 
                    onClick={() => slideTestimonials('prev')}
                    disabled={isAnimating}
                >
                    ←
                </button>
                <button 
                    className="nav-button" 
                    onClick={() => slideTestimonials('next')}
                    disabled={isAnimating}
                >
                    →
                </button>
            </div>
        </section>
    );
};

export default Testimonials;