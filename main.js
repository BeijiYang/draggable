const draggable = document.getElementById('draggable');

let baseX = 0, baseY = 0;
let movedX = 0, movedY = 0;

draggable.addEventListener('mousedown', evt => {
  const {
    clientX: startX,
    clientY: startY
  } = evt;
  const drag = ({ clientX, clientY }) => {
    movedX = clientX - startX;
    movedY = clientY - startY
    // draggable.style.transform = `translate(${baseX + movedX}px, ${baseY + movedY}px)`;
    const range = getNearest(clientX, clientY);
    range.insertNode(draggable); // insert 方法都会把插入的元素从原位置上移除
  }
  const mouseup = () => {
    baseX += movedX;
    baseY += movedY;
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
// console.log(container.childNodes[0].textContent)

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