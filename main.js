const draggable = document.getElementById('draggable');

draggable.addEventListener('mousedown', evt => {
  const {
    clientX: startX,
    clientY: startY
  } = evt;
  const drag = ({ clientX, clientY }) => {
    const movedX = clientX - startX;
    const movedY = clientY - startY
    draggable.style.transform = `translate(${movedX}px, ${movedY}px)`;
    draggable.style.opacity = '70%';
  }
  const mouseup = ({ clientX, clientY }) => {
    draggable.style.transform = `translate(${0}px, ${0}px)`;
    draggable.style.opacity = '100%';

    const range = getNearest(clientX, clientY);
    range.insertNode(draggable); // insert 方法都会把插入的元素从原位置上移除

    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', mouseup);
  }
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', mouseup);
})

document.addEventListener('selectstart', evt => evt.preventDefault())

const ranges = [];

const container = document.getElementById('container');
const textNode = container.childNodes[0];

for (let i = 0; i < textNode.textContent.length; i++) {
  if (textNode.textContent.charAt(i) && textNode.textContent.charAt(i).match(/\w/)) {
    continue;
  }
  const range = document.createRange();
  range.setStart(textNode, i);
  range.setEnd(textNode, i);
  // console.log(range.getBoundingClientRect())
  ranges.push(range);
}

function getNearest(x, y) {
  let min = Infinity;
  let nearest = null;

  for (const range of ranges) {
    const rect = range.getBoundingClientRect();
    const distance = (rect.x - x) ** 2 + (rect.y - y) ** 2;

    if (distance < min) {
      nearest = range;
      min = distance;
    }
  }
  return nearest;
}