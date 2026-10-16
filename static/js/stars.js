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

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stars = [];
  let numStars = window.innerWidth < 768 ? 36 : 70;
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 0.7 + 0.35,
      alpha: Math.random() * 0.28 + 0.12,
      twinkleSpeed: Math.random() * 0.004 + 0.001,
      parallaxFactor: Math.random() * 0.15
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      if (!reducedMotion) {
        star.alpha += (Math.random() - 0.5) * star.twinkleSpeed;
        star.alpha = Math.max(0.1, Math.min(0.42, star.alpha));
      }
      
      let drawY = (star.y - scrollY * star.parallaxFactor) % canvas.height;
      if (drawY < 0) drawY += canvas.height;

      ctx.save();
      ctx.globalAlpha = star.alpha;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(star.x, drawY, star.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    if (!reducedMotion) maybeSpawnShootingStar();
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const star = shootingStars[i];
      if (star.alpha < 0.4 && star.y < canvas.height * 0.3) {
        star.alpha += 0.02;
      } else {
        star.alpha -= 0.015;
      }
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(star.x - star.length, star.y + star.length * 0.5);
      ctx.stroke();

      star.y += star.speed;
      star.x += star.speed * 0.3;

      if (star.alpha <= 0 || star.y > canvas.height) {
        shootingStars.splice(i, 1);
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  let animationId;
  animate();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const newNum = window.innerWidth < 768 ? 36 : 70;
      if (newNum !== numStars) {
        numStars = newNum;
        stars.length = 0;
        for (let i = 0; i < numStars; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 0.7 + 0.35,
            alpha: Math.random() * 0.28 + 0.12,
            twinkleSpeed: Math.random() * 0.004 + 0.001,
            parallaxFactor: Math.random() * 0.15
          });
        }
      }
    }, 200);
  });

});
