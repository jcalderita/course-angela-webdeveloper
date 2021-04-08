const buttons = document.querySelector('.set');
const audio = new Audio('./sounds/tom-1.mp3');

const handleClick = (e) => {
  e.preventDefault();
  const button = e.target.closest('.drum');

  if (!button) return;
  buttonAnimation(button.textContent);
  const audio = new Audio('./sounds/' + audioReturn(button.textContent) + '.mp3');
  audio.play();
};

const handleKeyPress = (e) => {
  e.preventDefault();
  const audio = audioReturn(e.key);
  if (audio === '') return;
  buttonAnimation(e.key);
  const sonido = new Audio('./sounds/' + audio + '.mp3');
  sonido.play();
};

const audioReturn = (clase) => {
  let audio = '';
  switch (clase) {
    case 'w':
      audio = 'tom-1';
      break;
    case 'a':
      audio = 'tom-2';
      break;
    case 's':
      audio = 'tom-3';
      break;
    case 'd':
      audio = 'tom-4';
      break;
    case 'j':
      audio = 'snare';
      break;
    case 'k':
      audio = 'crash';
      break;
    case 'l':
      audio = 'kick-bass';
      break;
    default:
      audio = '';
      break;
  }
  return audio;
};

const buttonAnimation = (key) => {
  const button = document.querySelector(`.${key}`);
  if (!button) return;
  button.classList.toggle('pressed');
  setTimeout(() => {
    button.classList.toggle('pressed');
  }, 100);
};
buttons.addEventListener('click', handleClick);
document.addEventListener('keypress', handleKeyPress);
