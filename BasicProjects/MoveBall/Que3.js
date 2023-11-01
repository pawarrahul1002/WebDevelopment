const ball = document.getElementById("ball");
const speed = 10;
const viewportWidth = window.innerWidth - 50;
const viewportHeight = window.innerHeight - 50;

//random initial position of ball
let x = Math.random() * (viewportWidth - 50);
let y = Math.random() * (viewportHeight - 50);

ball.style.left = `${x}px`;
ball.style.top = `${y}px`;

document.addEventListener("keydown", (event) => {
    event.preventDefault(); 
    switch (event.key) {
    case "w":
    case "W":
      y -= speed;
      break;
    case "a":
    case "A":
      x -= speed;
      break;
    case "s":
    case "S":
      y += speed;
      break;
    case "d":
    case "D":
      x += speed;
      break;
  }

  if (x < 0) x = 0;
  if (x > viewportWidth) x = viewportWidth;
  if (y < 0) y = 0;
  if (y > viewportHeight) y = viewportHeight;

  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;
});
