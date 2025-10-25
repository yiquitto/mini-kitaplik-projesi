import React, { useState, useEffect } from 'react';
import { kitaplarData } from './data';
import AramaCubugu from './components/AramaCubugu';
import KategoriFiltre from './components/KategoriFiltre';
import KitapListe from './components/KitapListe';
import FavoriPaneli from './components/FavoriPaneli';
import './App.css'; // CSS dosyamızı import ediyoruz

// localStorage'da verileri saklamak için anahtarlar
const LOCAL_STORAGE_KEY_ARAMA = 'miniKitaplik.aramaMetni';
const LOCAL_STORAGE_KEY_FAVORILER = 'miniKitaplik.favoriler';

function App() {
  // --- STATE'LER ---

  // Kitapların orijinal listesi
  const [kitaplar] = useState(kitaplarData);

  // Filtreleme için kategori state'i
  const [kategori, setKategori] = useState('Tümü');

  // Arama metni state'i - Başlangıç değerini localStorage'dan alır
  const [aramaMetni, setAramaMetni] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY_ARAMA) || '';
  });

  // Favori kitapların ID'lerini tutan state - Başlangıç değerini localStorage'dan alır
  const [favoriler, setFavoriler] = useState(() => {
    const kayitliFavoriler = localStorage.getItem(LOCAL_STORAGE_KEY_FAVORILER);
    // Kayıtlı veri varsa JSON'dan parse et, yoksa boş dizi ata
    return kayitliFavoriler ? JSON.parse(kayitliFavoriler) : [];
  });

  // --- useEffect KULLANIMI (KALICILIK İÇİN) ---

  // 'aramaMetni' her değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ARAMA, aramaMetni);
  }, [aramaMetni]);

  // 'favoriler' dizisi her değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_FAVORILER, JSON.stringify(favoriler));
  }, [favoriler]);

  // --- OLAY YÖNETİCİLERİ VE TÜRETİLMİŞ VERİ ---

  // Favoriye ekleme/çıkarma fonksiyonu
  const toggleFavori = (id) => {
    // ID, favoriler dizisinde zaten var mı?
    const favoriMi = favoriler.includes(id);

    if (favoriMi) {
      // Varsa: O ID dışındakileri filtrele (favoriden çıkar)
      setFavoriler(favoriler.filter((favId) => favId !== id));
    } else {
      // Yoksa: Mevcut favorilere bu ID'yi ekle (favoriye ekle)
      setFavoriler([...favoriler, id]);
    }
  };

  // Kategori filtresi için benzersiz kategori listesi oluşturma
  // 'Set' kullanarak tekrarlananları eliyoruz
  const kategoriler = ['Tümü', ...new Set(kitaplar.map((kitap) => kitap.kategori))];

  // Arama ve filtrelemeye göre gösterilecek kitapları hesapla
  const filtrelenmisKitaplar = kitaplar
    .filter((kitap) => {
      // Kategori filtresi
      return kategori === 'Tümü' || kitap.kategori === kategori;
    })
    .filter((kitap) => {
      // Arama filtresi (başlık veya yazarda arar - küçük/büyük harf duyarsız)
      const arama = aramaMetni.toLowerCase();
      return (
        kitap.baslik.toLowerCase().includes(arama) ||
        kitap.yazar.toLowerCase().includes(arama)
      );
    });

  // Favori paneli için favori ID'lerine karşılık gelen kitap objelerini bul
  const favoriKitaplar = kitaplar.filter((kitap) =>
    favoriler.includes(kitap.id)
  );

  // --- RENDER (GÖRÜNÜM) ---
  return (
    <div className="App">
      <header>
        <h1>Mini Kitaplık</h1>
        <div className="filtre-alani">
          {/* State ve state'i güncelleyen fonksiyonları prop olarak geçiyoruz */}
          <AramaCubugu aramaMetni={aramaMetni} setAramaMetni={setAramaMetni} />
          <KategoriFiltre
            kategoriler={kategoriler}
            seciliKategori={kategori}
            setKategori={setKategori}
          />
        </div>
      </header>

      <main className="icerik-alani">
        <div className="sol-panel">
          {/* Sadece filtrelenmiş kitapları listeye gönder */}
          <KitapListe
            kitaplar={filtrelenmisKitaplar}
            favoriler={favoriler}
            toggleFavori={toggleFavori}
          />
        </div>
        <div className="sag-panel">
          {/* Sadece favori kitapların objelerini panele gönder */}
          <FavoriPaneli
            favoriKitaplar={favoriKitaplar}
            toggleFavori={toggleFavori}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
