import React from 'react';

// Tek bir kitap kartını gösterir
// Props'ları istendiği gibi 'destructuring' ile alıyoruz
function KitapKarti({ kitap, favoriMi, toggleFavori }) {
  const { id, baslik, yazar, kategori } = kitap;

  return (
    <div className="kitap-karti">
      <div className="kitap-bilgisi">
        <h3>{baslik}</h3>
        <p>
          {yazar} • <span>{kategori}</span>
        </p>
      </div>
      <button
        // favoriMi durumuna göre CSS sınıfı ve metin değişir
        className={`favori-buton ${favoriMi ? 'favoride' : ''}`}
        onClick={() => toggleFavori(id)} // ilgili kitabın id'si ile fonksiyonu çağır
      >
        {favoriMi ? '★ Favoride' : '☆ Favori Ekle'}
      </button>
    </div>
  );
}

export default KitapKarti;