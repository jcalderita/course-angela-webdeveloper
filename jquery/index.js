// $(document).ready(function () {
//   $('h1').css('color', 'red');
// });

// $('h1').css('color', 'red');
$('h1').addClass('big-title margin-50');
// $('h1').text('Nuevo texto');

// $('button').html('<em>Hey</em>');

const tecla = (e) => {
  // e.preventDefault();
  $('h1').text(e.key);
};

$('input').keypress(tecla);
