export function visualSubmit(button) {
 if(button.textContent === 'Сохранить') {
   button.textContent = 'Сохранение...';
 }
 else{
   button.textContent = 'Сохранить'
 }
}