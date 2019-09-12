let ctx = null;
let image = null;
const diamonds = [];
// var x = new Image(100, 200);
// x.setAttribute('src', 'ic_diamond.svg');
// x.setAttribute('width', '100');
// x.setAttribute('height', '100');

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
    ctx.drawImage(image, d.x, d.y);

    const pick = paths[~~((Math.random() * 10) % 12)];

    d.x += pick.x;
    d.y += pick.y;

    if (d.y < 0) {
      d.x = 600;
      d.y = 500;
    }
  });

  requestAnimationFrame(animation);
};

const createDiamond = n => {
  for (let i = 0; i < n; i++) {
    diamonds.push({ x: 600, y: 500 });
  }
};

onmessage = function(evt) {
  this.console.log(evt.data);
  var canvas = evt.data.canvas;
  ctx = canvas.getContext('2d');
  image = evt.data.bit;

  createDiamond(10);
  animation();
};
