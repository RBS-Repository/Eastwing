import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomeSlider.css';
import banner4 from './images/banner4.webp';
import banner2 from './images/banner2.webp';
import banner3 from './images/banner3.jpeg';
import banner from './images/banner.jpg';
import wing3 from './images/wing3.jpg';
import wing2 from './images/wing2.jpg';
import wing1 from './images/wing1.jpg';
import wing4 from './images/wing4.jpg';


const HomeSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
  
        cssEase: 'linear',
        pauseOnHover: true,
    };

    const slides = [
        {
            title: "Welcome to Eastwing",
            slogan: "The Best Wings in Town",
            image: banner2,
            alt: "Signature Wings"
        },
        {
            title: "Discover Our Flavors",
            slogan: "Taste the Difference",
            image: banner4,
            alt: "Wing Varieties"
        },

        {
            title: "Join Us Today",
            slogan: "Experience the Magic",
            image: banner3,
            alt: "Restaurant Ambiance"
        },
        
        {
            title: "Join Us Today",
            slogan: "Experience the Magic",
            image: banner,
            alt: "Restaurant Ambiance"
        },
        
    ];

    return (
        <div className="main-container">
            <div className="slider-container">
                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <div className="slider-slide" key={index}>
                            <img 
                                src={slide.image} 
                                alt={slide.alt} 
                                className="slider-image"
                            />
                            <div className="overlay">
                                <header className="slide-header">
                                    <h1>{slide.title}</h1>
                                    <p className="slogan">{slide.slogan}</p>
                                </header>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            
            <div className="bottom-section">
                <p className="animated-text">
                    Discover Our Menu: Premium Wings with Signature Sauces!
                </p>
                <button className="order-now-btn">
                    <span className="btn-text">Order Now</span>
                </button>
                <div className="arrow-down">↓</div>
            </div>
            
            <div className="chicken-ads-section" id="special-offers">
                <h2 className="section-title">Special Offers</h2>
                
                <div className="ads-row">
                    <div className="ad-container">
                        <div className="ad-image-wrapper">
                            <img 
                                src={wing1} 
                                alt="Family Pack" 
                                className="ad-image"
                            />
                            <div className="discount-badge">SAVE 25%</div>
                        </div>
                        <div className="ad-content">
                            <h3>Family Pack Special</h3>
                            <p className="description">24 wings with 4 flavors of your choice</p>
                            <div className="price-container">
                                <span className="original-price">₱989.00</span>
                                <span className="current-price">₱739.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="ad-container">
                        <div className="ad-image-wrapper">
                            <img 
                                src={wing2} 
                                alt="Lunch Special" 
                                className="ad-image"
                            />
                            <div className="discount-badge">LUNCH DEAL</div>
                        </div>
                        <div className="ad-content">
                            <h3>Lunch Combo</h3>
                            <p className="description">8 wings + fries + drink (11AM-3PM)</p>
                            <div className="price-container">
                                <span className="current-price">₱299.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="ad-container">
                        <div className="ad-image-wrapper">
                            <img 
                                src={wing3} 
                                alt="Game Day Special" 
                                className="ad-image"
                            />
                            <div className="discount-badge">GAME DAY</div>
                        </div>
                        <div className="ad-content">
                            <h3>Game Day Bundle</h3>
                            <p className="description">36 wings + 2 large sides + 2L soda</p>
                            <div className="price-container">
                                <span className="original-price">₱1,499.00</span>
                                <span className="current-price">₱1,199.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="ad-container">
                        <div className="ad-image-wrapper">
                            <img 
                                src={wing4} 
                                alt="First Order Special" 
                                className="ad-image"
                            />
                            <div className="discount-badge">NEW CUSTOMER</div>
                        </div>
                        <div className="ad-content">
                            <h3>First Order Special</h3>
                            <p className="description">15% off on your first order</p>
                            <div className="price-container">
                                <div className="promo-code-container">
                                    <span className="promo-label">Use code:</span>
                                    <span className="promo-code">WELCOME15</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSlider;