import React from 'react';
import KitapKarti from './KitapKarti';

// Kitapların listelendiği ana alan
function KitapListe({ kitaplar, favoriler, toggleFavori }) {
  return (
    <div className="kitap-listesi">
      {kitaplar.map((kitap) => (
        <KitapKarti
          key={kitap.id}
          kitap={kitap}
          // Bu kitabın id'si favoriler dizisinde var mı? (true/false)
          favoriMi={favoriler.includes(kitap.id)}
          toggleFavori={toggleFavori}
        />
      ))}
    </div>
  );
}

export default KitapListe;