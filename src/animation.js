// animation.js

export const setupCardAnimations = () => {
  const cards = document.querySelectorAll(".cardContainer");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("cardVisible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  cards.forEach(card => {
    observer.observe(card);
  });
};
