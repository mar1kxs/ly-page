const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const FALLING_COUNT = 300;

class FallingText {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.speed = 1 + Math.random() * 3;
    this.fontSize = 20 + Math.random() * 20;
    this.text = "love you";
    this.opacity = 0.4 + Math.random() * 0.6;
    this.color = `rgba(255,105,180,${this.opacity})`;
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.reset();
      this.y = 0;
    }
  }

  draw() {
    ctx.font = `${this.fontSize}px Arial`;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }
}

class ClickText {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.text = "bbycat02";
    this.opacity = 1;
    this.lifetime = 120;
    this.fontSize = 50;
  }

  update() {
    this.y -= 1;
    this.opacity -= 1 / this.lifetime;
  }

  draw() {
    ctx.font = `${this.fontSize}px Arial`;
    ctx.fillStyle = `rgba(255, 255, 255,${this.opacity})`;
    ctx.fillText(this.text, this.x - 90, this.y);
  }

  isAlive() {
    return this.opacity > 0;
  }
}

class FlyingEmoji {
  constructor(x, y, emoji) {
    this.x = x;
    this.y = y;
    this.emoji = emoji;
    this.opacity = 1;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = -1 - Math.random() * 1.0;
    this.life = 120;
    this.fontSize = 30 + Math.random() * 8;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.008;
    this.life--;
  }

  draw() {
    ctx.font = `${this.fontSize}px Arial`;
    ctx.fillStyle = `rgba(255, 182, 193, ${this.opacity})`; // рожевий
    ctx.fillText(this.emoji, this.x, this.y);
  }

  isAlive() {
    return this.opacity > 0 && this.life > 0;
  }
}

const fallingTexts = [];
const clickTexts = [];
const flyingEmojis = [];

for (let i = 0; i < FALLING_COUNT; i++) {
  fallingTexts.push(new FallingText());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const t of fallingTexts) {
    t.update();
    t.draw();
  }

  for (let i = flyingEmojis.length - 1; i >= 0; i--) {
    flyingEmojis[i].update();
    flyingEmojis[i].draw();
    if (!flyingEmojis[i].isAlive()) {
      flyingEmojis.splice(i, 1);
    }
  }

  for (let i = clickTexts.length - 1; i >= 0; i--) {
    const ct = clickTexts[i];
    ct.update();
    ct.draw();
    if (!ct.isAlive()) {
      clickTexts.splice(i, 1);
    }
  }
  requestAnimationFrame(animate);
}

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  clickTexts.push(new ClickText(x, y));
  for (let i = 0; i < 10; i++) {
    flyingEmojis.push(new FlyingEmoji(x, y, "💖"));
  }
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

animate();
