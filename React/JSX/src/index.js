import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const root = document.querySelector('#root');
// const name = 'Jorge';
// const lastName = 'Calderita';
// const luckyNumber = 3;
// const currentYear = new Date().getFullYear();

ReactDOM.render(<App />, root);

// const customStyle = { color: '' };
// const currentHour = () => {
//   const hour = new Date().getHours();
//   if (hour < 12) {
//     customStyle.color = 'red';
//     return 'Good morning';
//   }
//   if (hour >= 12 && hour < 18) {
//     customStyle.color = 'green';
//     return 'Good Afternoon';
//   }
//   customStyle.color = 'blue';
//   return 'Good evening';
// };

// const img = 'https://picsum.photos/200';

// ReactDOM.render(
//   <div>
//     <h1 style={customStyle} className="heading">
//       {currentHour()}
//     </h1>
//   </div>,
//   root
// );

// ReactDOM.render(
//   <div>
//     <h1>Created by {name}!</h1>
//     <p>Copyright {currentYear}</p>
//   </div>,
//   root
// );
// ReactDOM.render(
//   <div>
//     <h1>
//       Hello {name} {lastName}!
//     </h1>
//     <p>This is a paragraph.</p>
//     <p>Your lucky number is {luckyNumber}.</p>
//   </div>,
//   root
// );

// ReactDOM.render(
//   <div>
//     <h1 className="heading" contentEditable="true" spellCheck="false">
//       My Favourite Foods
//     </h1>
//     <ul>
//       <li>Bacon</li>
//       <li>Jamon</li>
//       <li>Noodles</li>
//     </ul>
//   </div>,
//   root
// );

// ReactDOM.render(
//   <div>
//     <h1 className="heading" contentEditable="true" spellCheck="false">
//       My Favourite Foods
//     </h1>
//     <img className="food-img" src="https://s1.eestatic.com/2015/02/03/cocinillas/cocinillas_8259323_116065167_1024x576.jpg" />
//     <img className="food-img" src="https://images-na.ssl-images-amazon.com/images/I/71lNrnbMXsL._SL1200_.jpg" />
//     <img className="food-img" src="https://www.viamalama.com/wp-content/uploads/2018/01/IMG_5379.jpg" />
//   </div>,
//   root
// );

// ReactDOM.render(
//   <div>
//     <h1 className="heading" contentEditable="true" spellCheck="false">
//       My Favourite Foods
//     </h1>
//     <img src={img} />
//   </div>,
//   root
// );
