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
  let numStars = window.innerWidth < 768 ? 60 : 105;
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
      twinkleSpeed: Math.random() * 0.005 + 0.002,
      parallaxFactor: Math.random() * 0.4,
      driftSpeedX: (Math.random() - 0.5) * 0.2,
      driftSpeedY: (Math.random() - 0.5) * 0.1
    });
  }
  const nebulae = [];
  for (let i = 0; i < 3; i++) {
    nebulae.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.6,
      radius: 160 + Math.random() * 140,
      alpha: 0.025 + Math.random() * 0.015,
      speedX: (Math.random() - 0.5) * 0.08,
      speedY: (Math.random() - 0.5) * 0.05
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

    let frame = (window.frameCount = (window.frameCount || 0) + 1);

    nebulae.forEach(n => {
      n.x += n.speedX;
      n.y += n.speedY;
      if (n.x < -n.radius) n.x = canvas.width + n.radius;
      if (n.x > canvas.width + n.radius) n.x = -n.radius;
      if (n.y < -n.radius) n.y = canvas.height + n.radius;
      if (n.y > canvas.height + n.radius) n.y = -n.radius;

      const grad = ctx.createRadialGradient(n.x, n.y * 0.8, n.radius * 0.2, n.x, n.y * 0.8, n.radius);
      grad.addColorStop(0, `rgba(130, 70, 200, ${n.alpha})`);
      grad.addColorStop(0.6, `rgba(90, 40, 160, ${n.alpha * 0.4})`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(n.x - n.radius, n.y * 0.8 - n.radius, n.radius * 2, n.radius * 2);
    });

    stars.forEach(star => {
      star.x += star.driftSpeedX * (1 + star.parallaxFactor * 2);
      star.y += star.driftSpeedY * (1 + star.parallaxFactor * 2);

      if (star.x < 0) star.x += canvas.width;
      if (star.x > canvas.width) star.x -= canvas.width;
      if (star.y < 0) star.y += canvas.height;
      if (star.y > canvas.height) star.y -= canvas.height;

      star.alpha += (Math.random() - 0.5) * star.twinkleSpeed;
      star.alpha = Math.max(0.2, Math.min(0.7, star.alpha));
      
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

    if (frame % 4 === 0) {
      ctx.strokeStyle = 'rgba(176, 98, 235, 0.06)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i += 3) {
        for (let j = i + 4; j < Math.min(i + 15, stars.length); j++) {
          const s1 = stars[i];
          const s2 = stars[j];
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 105 && d > 35) {
            ctx.globalAlpha = 0.06;
            ctx.beginPath();
            ctx.moveTo(s1.x, (s1.y - scrollY * s1.parallaxFactor) % canvas.height);
            ctx.lineTo(s2.x, (s2.y - scrollY * s2.parallaxFactor) % canvas.height);
            ctx.stroke();
          }
        }
      }
    }

    // Subtle shooting stars
    maybeSpawnShootingStar();
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const star = shootingStars[i];
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
      const newNum = window.innerWidth < 768 ? 80 : 140;
      if (newNum !== numStars) {
        numStars = newNum;
        stars.length = 0;
        for (let i = 0; i < numStars; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.2,
            twinkleSpeed: Math.random() * 0.005 + 0.002,
            parallaxFactor: Math.random() * 0.4,
            driftSpeedX: (Math.random() - 0.5) * 0.2,
            driftSpeedY: (Math.random() - 0.5) * 0.1
          });
        }
        nebulae.length = 0;
        for (let i = 0; i < 3; i++) {
          nebulae.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.6,
            radius: 160 + Math.random() * 140,
            alpha: 0.025 + Math.random() * 0.015,
            speedX: (Math.random() - 0.5) * 0.08,
            speedY: (Math.random() - 0.5) * 0.05
          });
        }
      }
    }, 200);
  });

  AOS.init({
    duration: 1200,
    once: true,
    offset: 100
  });
});
