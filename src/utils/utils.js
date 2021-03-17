import imgSrc from '../images/errorPic.jpg';

export function visualSubmit(button) {
  if (button.textContent === 'Сохранить') {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

export const imagesCheck = (link) => new Promise((resolve, reject) => {
  const image = new Image();
  image.src = link;
  image.onload = () => resolve(link);
  image.onerror = () => reject(imgSrc);
});
