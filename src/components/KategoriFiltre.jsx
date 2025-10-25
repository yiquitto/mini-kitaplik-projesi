import React from 'react';

// Kontrollü bir select bileşeni
function KategoriFiltre({ kategoriler, seciliKategori, setKategori }) {
  return (
    <select
      className="kategori-filtre"
      value={seciliKategori}
      onChange={(e) => setKategori(e.target.value)}
    >
      {/* App'ten gelen kategorileri map ile dönüp option oluştur */}
      {kategoriler.map((kategori) => (
        <option key={kategori} value={kategori}>
          {kategori}
        </option>
      ))}
    </select>
  );
}

export default KategoriFiltre;