import React from 'react';

// Kontrollü bir input bileşeni
function AramaCubugu({ aramaMetni, setAramaMetni }) {
  return (
    <input
      type="text"
      className="arama-cubugu"
      placeholder="Başlık veya yazar ara..."
      value={aramaMetni}
      onChange={(e) => setAramaMetni(e.target.value)}
    />
  );
}

export default AramaCubugu;