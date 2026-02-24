// Subtle starry bg with occasional shooting stars and data constellations
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'stars-canvas';
  canvas.className = 'star-bg';
  document.documentElement.prepend(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  const stars = [];
  // More stars to emphasize depth and connections
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
      twinkleSpeed: Math.random() * 0.005 + 0.002,
      // Parallax factor creates the depth effect (larger = closer/faster)
      parallaxFactor: Math.random() * 0.4,
      // Drift speed for constant orbital movement (Concept 2)
      driftSpeedX: (Math.random() - 0.5) * 0.2,
      driftSpeedY: (Math.random() - 0.5) * 0.1
    });
  }

  // Occasional shooting stars (1-2 at a time, rare)
  const shootingStars = [];
  let lastShootTime = 0;

  function maybeSpawnShootingStar() {
    const now = Date.now();
    // Only spawn every 4-8 seconds, max 1 at a time
    if (now - lastShootTime > 4000 + Math.random() * 4000 && shootingStars.length < 1) {
      shootingStars.push({
        x: Math.random() * canvas.width * 0.5 + canvas.width * 0.25,
        y: 0,
        length: Math.random() * 40 + 15,
        speed: Math.random() * 1.5 + 1,
        alpha: 0
      });
      lastShootTime = now;
    }
  }

  function animate() {
    ctx.fillStyle = 'rgba(10, 10, 20, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Concept 1: Data Constellations (Connecting lines)
    // We check distances between stars. If they are close, draw a faint line.
    ctx.lineWidth = 0.5;
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        // Adjust Y distance calculation to account for parallax scrolling
        const dy1 = (stars[i].y - scrollY * stars[i].parallaxFactor) % canvas.height;
        let finalY1 = dy1 < 0 ? dy1 + canvas.height : dy1;
        
        const dy2 = (stars[j].y - scrollY * stars[j].parallaxFactor) % canvas.height;
        let finalY2 = dy2 < 0 ? dy2 + canvas.height : dy2;
        
        const dy = finalY1 - finalY2;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Connect stars if they are within 100px (like optical inter-satellite links)
        if (distance < 100) {
          // Opacity of the line depends on how close they are
          const lineAlpha = (1 - distance / 100) * 0.2; // Max opacity 0.2
          ctx.strokeStyle = `rgba(176, 98, 235, ${lineAlpha})`; // Use the theme's purple accent color
          ctx.beginPath();
          ctx.moveTo(stars[i].x, finalY1);
          ctx.lineTo(stars[j].x, finalY2);
          ctx.stroke();
        }
      }
    }

    // Gentle twinkling, parallax effect, and continuous drift
    stars.forEach(star => {
      // Continuous Orbital Drift (Concept 2)
      // Scale drift by parallax factor so closer stars drift slightly faster
      star.x += star.driftSpeedX * (1 + star.parallaxFactor * 2);
      star.y += star.driftSpeedY * (1 + star.parallaxFactor * 2);

      // Wrap around screen horizontally for drift
      if (star.x < 0) star.x += canvas.width;
      if (star.x > canvas.width) star.x -= canvas.width;
      // Wrap around screen vertically for drift
      if (star.y < 0) star.y += canvas.height;
      if (star.y > canvas.height) star.y -= canvas.height;

      // Twinkling
      star.alpha += (Math.random() - 0.5) * star.twinkleSpeed;
      star.alpha = Math.max(0.2, Math.min(0.7, star.alpha));
      
      // Calculate parallax offset based on scroll position and star depth
      let drawY = (star.y - scrollY * star.parallaxFactor) % canvas.height;
      if (drawY < 0) drawY += canvas.height; // Wrap around for infinite scrolling

      // Draw Star
      ctx.save();
      ctx.globalAlpha = star.alpha;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(star.x, drawY, star.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Subtle shooting stars
    maybeSpawnShootingStar();
    shootingStars.forEach((star, i) => {
      // Fade in, then fade out
      if (star.alpha < 0.4 && star.y < canvas.height * 0.3) {
        star.alpha += 0.02;
      } else {
        star.alpha -= 0.015;
      }
      
      ctx.strokeStyle = `rgba(200, 220, 255, ${star.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(star.x - star.length, star.y + star.length * 0.5);
      ctx.stroke();

      star.y += star.speed;
      star.x += star.speed * 0.3;

      // Remove when off screen or faded
      if (star.alpha <= 0 || star.y > canvas.height) {
        shootingStars.splice(i, 1);
      }
    });

    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  AOS.init({
    duration: 1200,
    once: true,
    offset: 100
  });
});
