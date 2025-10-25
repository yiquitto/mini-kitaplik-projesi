import React from 'react';

// Sağdaki favori listesi paneli
function FavoriPaneli({ favoriKitaplar, toggleFavori }) {
  return (
    <div className="favori-paneli">
      <h2>Favoriler ({favoriKitaplar.length})</h2>
      <ul>
        {favoriKitaplar.map((kitap) => (
          <li key={kitap.id}>
            {kitap.baslik}
            {/* Buradan da favorilerden kaldırabilmek için */}
            <button onClick={() => toggleFavori(kitap.id)}>Kaldır</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriPaneli;