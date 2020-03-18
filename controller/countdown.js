// let count = 3, interval;
// const countdownDiv = document.querySelector('.countdown');
// const countdown = () => {
//   while(count > 0) {
//     // countdownDiv.style.opacity = '0'
//     setTimeout(console.log('Setting to 0'), (3 - count + 1) * 400);
//     setTimeout(setText, (3 - count + 1) * 500);
//     count--;
//   }
//   // interval = setInterval(countdownFunc, 1000);
// }

// const setText = () => {
//   console.log('setting to 1');
//   countdownDiv.style.opacity = '1';
// }

// const countdownFunc = () => {
//   countdownDiv.style.opacity = '0';
//   if (count > 0) {
//     console.log(count);
//     countdownDiv.textContent = count;
//     countdownDiv.style.opacity = '1';
//     count--;
//   } else {
//     countdownDiv.textContent = 'Start';
//     clearInterval(interval);
//   }
// }