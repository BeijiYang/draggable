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
    draggable.style.transform = `translate(${baseX + movedX}px, ${baseY + movedY}px)`;
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