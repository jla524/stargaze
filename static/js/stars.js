// Subtle starry bg with occasional shooting stars
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas');
canvas.id = 'stars-canvas';
canvas.className = 'star-bg';
document.documentElement.prepend(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
// Fewer, calmer stars
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1 + 0.5,
    alpha: Math.random() * 0.4 + 0.3,
    twinkleSpeed: Math.random() * 0.005 + 0.002
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

  // Gentle twinkling
  stars.forEach(star => {
    star.alpha += (Math.random() - 0.5) * star.twinkleSpeed;
    star.alpha = Math.max(0.2, Math.min(0.7, star.alpha));
    ctx.save();
    ctx.globalAlpha = star.alpha;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
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
