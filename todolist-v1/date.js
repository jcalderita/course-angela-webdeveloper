exports.getDate = () => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };

  return new Date().toLocaleDateString('es-ES', options);
};

exports.getDay = () => {
  const options = {
    weekday: 'long',
  };

  return new Date().toLocaleDateString('es-ES', options);
};
