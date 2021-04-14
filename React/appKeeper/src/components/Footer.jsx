import React from 'react';
const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer>
      <p>copyright © {currentYear}</p>
    </footer>
  );
}
