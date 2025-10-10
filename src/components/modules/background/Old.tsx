import { useEffect } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  speed: number;
}

export const useStarryBackground = (isDarkMode: boolean) => {
  useEffect(() => {
    if (!isDarkMode) return;

    const createStars = () => {
      const container = document.querySelector('.dark-bg');
      if (!container) return;

      // Clear existing stars
      container.innerHTML = '';

      const numStars = 80; // Increased for more magical effect
      const stars: Star[] = [];

      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 4 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 3;
        const speed = Math.random() * 0.5 + 0.2;
        
        star.style.left = x + '%';
        star.style.top = y + '%';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDelay = delay + 's';
        star.style.animationDuration = (2 + Math.random() * 2) + 's';
        
        // Add random movement
        star.style.setProperty('--random-x', (Math.random() - 0.5) * 20 + 'px');
        star.style.setProperty('--random-y', (Math.random() - 0.5) * 20 + 'px');
        
        container.appendChild(star);
        
        stars.push({
          id: i,
          x,
          y,
          size,
          delay,
          speed
        });
      }

      // Add floating animation to stars
      const animateStars = () => {
        stars.forEach((starData, index) => {
          const starElement = container.children[index] as HTMLElement;
          if (starElement) {
            const time = Date.now() * 0.001;
            const newX = starData.x + Math.sin(time * starData.speed) * 2;
            const newY = starData.y + Math.cos(time * starData.speed * 0.7) * 1.5;
            
            starElement.style.left = newX + '%';
            starElement.style.top = newY + '%';
          }
        });
        
        requestAnimationFrame(animateStars);
      };
      
      animateStars();
    };

    createStars();

    // Cleanup function
    return () => {
      const container = document.querySelector('.dark-bg');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [isDarkMode]);
};