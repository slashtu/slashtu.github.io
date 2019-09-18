let ctx = null;
let image = null;
const diamonds = [];

const paths = [
  { x: 1, y: -1 },
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -2 },
  { x: -1, y: -2 },
  { x: 0, y: -2 },
  { x: 1, y: -3 },
  { x: -1, y: -3 },
  { x: 0, y: -3 },
  { x: 1, y: -4 },
  { x: -1, y: -4 },
  { x: 0, y: -4 },
];

const animation = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  diamonds.forEach(d => {
    ctx.drawImage(image, d.x, d.y, 30, 30);

    const pick = paths[~~((Math.random() * 10) % 12)];

    d.x += pick.x;
    d.y += pick.y;

    if (d.y < 0) {
      d.x = 500;
      d.y = 350;
    }
  });

  requestAnimationFrame(animation);
};

const createDiamond = n => {
  for (let i = 0; i < n; i++) {
    diamonds.push({ x: 500, y: 350 });
  }
};

onmessage = function(evt) {
  this.console.log(evt.data);
  var canvas = evt.data.canvas;
  ctx = canvas.getContext('2d');
  image = evt.data.image;

  createDiamond(100);
  animation();
};
