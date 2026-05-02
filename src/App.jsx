import { useState, useRef, useEffect } from "react";


const ADMIN_PASSWORD = "Sos.1453";

const NAV = [
  { id:"dashboard", label:"Dashboard", icon:"⊞" },
  { id:"summaries", label:"Konular", icon:"📋" },
  { id:"mydecks", label:"Flashcard Oluştur", icon:"✦" },
  { id:"upload", label:"PDF Yükle", icon:"↑" },
  { id:"but", label:"BÜT Hesapla", icon:"🧮" },
  { id:"anatomy", label:"Zilli Sınav", icon:"🦴" },
  { id:"profile", label:"Profil", icon:"◉" },
];

const ADMIN_NAV = [
  { id:"admin_dashboard", label:"Genel Bakış", icon:"⊞" },
  { id:"admin_subjects", label:"Konu ve Özetler", icon:"📋" },
  { id:"admin_schedule", label:"Ders Programları", icon:"📅" },
  { id:"admin_sources", label:"Kaynaklar", icon:"📁" },
  { id:"admin_questions", label:"Test Soruları", icon:"✓" },
  { id:"admin_exams", label:"Sınav Tarihleri", icon:"🎯" },
  { id:"admin_anatomy", label:"Zilli Sınav", icon:"🦴" },
  { id:"admin_users", label:"Kullanıcılar", icon:"◉" },
];

const SINIFLAR = ["1. Sınıf","2. Sınıf","3. Sınıf","4. Sınıf","5. Sınıf"];
const GROUPS = ["Grup A","Grup B","Grup C","Grup D","Grup E","Grup F","Grup G","Grup H"];

const INIT_SUBJECTS = [
  { id:1, name:"Tıbba Merhaba", color:"#00d4aa", sinif:"1. Sınıf", topics:[] },
  { id:2, name:"Yaşamın Moleküler Temelleri", color:"#7c5cfc", sinif:"1. Sınıf", topics:[] },
  { id:3, name:"Hücre", color:"#0891b2", sinif:"1. Sınıf", topics:[] },
  { id:4, name:"Doku", color:"#059669", sinif:"1. Sınıf", topics:[
    { id:401, name:"Biyofizik", content:"Biyofizik, fizik yasalarının biyolojik sistemlere uygulanmasını inceler." },
    { id:402, name:"Tıbbi Biyoloji", content:"Tıbbi biyoloji; hücre biyolojisi, genetik ve moleküler biyoloji temelinde hastalıkların biyolojik mekanizmalarını inceler." },
    { id:403, name:"Histoloji", content:"Histoloji, dokuların mikroskobik yapısını inceler." },
    { id:404, name:"Fizyoloji", content:"Fizyoloji, vücudun normal işlevlerini inceler." },
    { id:405, name:"Nöroloji Entegre", content:"Sinir sisteminin doku düzeyindeki yapısı ve işlevi incelenir." },
  ]},
  { id:5, name:"Hayatın Evreleri", color:"#ffb03a", sinif:"1. Sınıf", topics:[
    { id:501, name:"Klinik Bilimler", content:"Yaşamın farklı evrelerinde klinik yaklaşım ele alınır." },
    { id:502, name:"Temel Bilimler", content:"Embriyoloji, büyüme-gelişme biyolojisi ve yaşlanma mekanizmaları incelenir." },
  ]},
  { id:6, name:"Hareket", color:"#ff5252", sinif:"1. Sınıf", topics:[
    { id:601, name:"Anatomi", content:"Hareket sistemi anatomisi kapsamlı olarak incelenir." },
    { id:602, name:"Histoloji", content:"Kas dokusunun mikroskobik yapısı ele alınır." },
    { id:603, name:"Fizyoloji", content:"Kas kasılma mekanizmaları incelenir." },
    { id:604, name:"Biyokimya", content:"Kas metabolizması ele alınır." },
    { id:605, name:"Biyofizik", content:"Hareket sisteminin biyomekaniği incelenir." },
    { id:606, name:"Fizik Tedavi", content:"Hareket sistemi rehabilitasyonu ele alınır." },
    { id:607, name:"Nöroloji", content:"Hareket sistemi nörolojisi incelenir." },
    { id:608, name:"Ortopedi", content:"Kas-iskelet sistemi hastalıkları ele alınır." },
  ]},
  { id:10, name:"2. Sınıf Konu 1", color:"#0ea5e9", sinif:"2. Sınıf", topics:[
    { id:1001, name:"Başlık 1", content:"2. Sınıf Konu 1 - Başlık 1 içeriği buraya eklenecek." },
    { id:1002, name:"Başlık 2", content:"2. Sınıf Konu 1 - Başlık 2 içeriği buraya eklenecek." },
    { id:1003, name:"Başlık 3", content:"2. Sınıf Konu 1 - Başlık 3 içeriği buraya eklenecek." },
  ]},
  { id:11, name:"2. Sınıf Konu 2", color:"#6366f1", sinif:"2. Sınıf", topics:[
    { id:1101, name:"Başlık 1", content:"2. Sınıf Konu 2 - Başlık 1 içeriği buraya eklenecek." },
    { id:1102, name:"Başlık 2", content:"2. Sınıf Konu 2 - Başlık 2 içeriği buraya eklenecek." },
    { id:1103, name:"Başlık 3", content:"2. Sınıf Konu 2 - Başlık 3 içeriği buraya eklenecek." },
  ]},
  { id:12, name:"2. Sınıf Konu 3", color:"#8b5cf6", sinif:"2. Sınıf", topics:[
    { id:1201, name:"Başlık 1", content:"2. Sınıf Konu 3 - Başlık 1 içeriği buraya eklenecek." },
    { id:1202, name:"Başlık 2", content:"2. Sınıf Konu 3 - Başlık 2 içeriği buraya eklenecek." },
    { id:1203, name:"Başlık 3", content:"2. Sınıf Konu 3 - Başlık 3 içeriği buraya eklenecek." },
  ]},
  { id:13, name:"2. Sınıf Konu 4", color:"#06b6d4", sinif:"2. Sınıf", topics:[
    { id:1301, name:"Başlık 1", content:"2. Sınıf Konu 4 - Başlık 1 içeriği buraya eklenecek." },
    { id:1302, name:"Başlık 2", content:"2. Sınıf Konu 4 - Başlık 2 içeriği buraya eklenecek." },
    { id:1303, name:"Başlık 3", content:"2. Sınıf Konu 4 - Başlık 3 içeriği buraya eklenecek." },
  ]},
  { id:20, name:"3. Sınıf Konu 1", color:"#10b981", sinif:"3. Sınıf", topics:[
    { id:2001, name:"Başlık 1", content:"3. Sınıf Konu 1 - Başlık 1 içeriği buraya eklenecek." },
    { id:2002, name:"Başlık 2", content:"3. Sınıf Konu 1 - Başlık 2 içeriği buraya eklenecek." },
    { id:2003, name:"Başlık 3", content:"3. Sınıf Konu 1 - Başlık 3 içeriği buraya eklenecek." },
  ]},
  { id:21, name:"3. Sınıf Konu 2", color:"#14b8a6", sinif:"3. Sınıf", topics:[
    { id:2101, name:"Başlık 1", content:"3. Sınıf Konu 2 - Başlık 1 içeriği buraya eklenecek." },
    { id:2102, name:"Başlık 2", content:"3. Sınıf Konu 2 - Başlık 2 içeriği buraya eklenecek." },
    { id:2103, name:"Başlık 3", content:"3. Sınıf Konu 2 - Başlık 3 içeriği buraya eklenecek." },
  ]},
  { id:22, name:"3. Sınıf Konu 3", color:"#0d9488", sinif:"3. Sınıf", topics:[
    { id:2201, name:"Başlık 1", content:"3. Sınıf Konu 3 - Başlık 1 içeriği buraya eklenecek." },
    { id:2202, name:"Başlık 2", content:"3. Sınıf Konu 3 - Başlık 2 içeriği buraya eklenecek." },
    { id:2203, name:"Başlık 3", content:"3. Sınıf Konu 3 - Başlık 3 içeriği buraya eklenecek." },
  ]},
  { id:23, name:"3. Sınıf Konu 4", color:"#059669", sinif:"3. Sınıf", topics:[
    { id:2301, name:"Başlık 1", content:"3. Sınıf Konu 4 - Başlık 1 içeriği buraya eklenecek." },
    { id:2302, name:"Başlık 2", content:"3. Sınıf Konu 4 - Başlık 2 içeriği buraya eklenecek." },
    { id:2303, name:"Başlık 3", content:"3. Sınıf Konu 4 - Başlık 3 içeriği buraya eklenecek." },
  ]},
  { id:30, name:"4. Sınıf Konu 1", color:"#f59e0b", sinif:"4. Sınıf", topics:[
    { id:3001, name:"Başlık 1", content:"4. Sınıf Konu 1 - Başlık 1 içeriği buraya eklenecek." },
    { id:3002, name:"Başlık 2", content:"4. Sınıf Konu 1 - Başlık 2 içeriği buraya eklenecek." },
    { id:3003, name:"Başlık 3", content:"4. Sınıf Konu 1 - Başlık 3 içeriği buraya eklenecek." },
  ]},
  { id:31, name:"4. Sınıf Konu 2", color:"#ef4444", sinif:"4. Sınıf", topics:[
    { id:3101, name:"Başlık 1", content:"4. Sınıf Konu 2 - Başlık 1 içeriği buraya eklenecek." },
    { id:3102, name:"Başlık 2", content:"4. Sınıf Konu 2 - Başlık 2 içeriği buraya eklenecek." },
    { id:3103, name:"Başlık 3", content:"4. Sınıf Konu 2 - Başlık 3 içeriği buraya eklenecek." },
  ]},
  { id:32, name:"4. Sınıf Konu 3", color:"#f97316", sinif:"4. Sınıf", topics:[
    { id:3201, name:"Başlık 1", content:"4. Sınıf Konu 3 - Başlık 1 içeriği buraya eklenecek." },
    { id:3202, name:"Başlık 2", content:"4. Sınıf Konu 3 - Başlık 2 içeriği buraya eklenecek." },
    { id:3203, name:"Başlık 3", content:"4. Sınıf Konu 3 - Başlık 3 içeriği buraya eklenecek." },
  ]},
  { id:33, name:"4. Sınıf Konu 4", color:"#e11d48", sinif:"4. Sınıf", topics:[
    { id:3301, name:"Başlık 1", content:"4. Sınıf Konu 4 - Başlık 1 içeriği buraya eklenecek." },
    { id:3302, name:"Başlık 2", content:"4. Sınıf Konu 4 - Başlık 2 içeriği buraya eklenecek." },
    { id:3303, name:"Başlık 3", content:"4. Sınıf Konu 4 - Başlık 3 içeriği buraya eklenecek." },
  ]},
  { id:40, name:"5. Sınıf Konu 1", color:"#a855f7", sinif:"5. Sınıf", topics:[
    { id:4001, name:"Başlık 1", content:"5. Sınıf Konu 1 - Başlık 1 içeriği buraya eklenecek." },
    { id:4002, name:"Başlık 2", content:"5. Sınıf Konu 1 - Başlık 2 içeriği buraya eklenecek." },
    { id:4003, name:"Başlık 3", content:"5. Sınıf Konu 1 - Başlık 3 içeriği buraya eklenecek." },
  ]},
  { id:41, name:"5. Sınıf Konu 2", color:"#9333ea", sinif:"5. Sınıf", topics:[
    { id:4101, name:"Başlık 1", content:"5. Sınıf Konu 2 - Başlık 1 içeriği buraya eklenecek." },
    { id:4102, name:"Başlık 2", content:"5. Sınıf Konu 2 - Başlık 2 içeriği buraya eklenecek." },
    { id:4103, name:"Başlık 3", content:"5. Sınıf Konu 2 - Başlık 3 içeriği buraya eklenecek." },
  ]},
  { id:42, name:"5. Sınıf Konu 3", color:"#7e22ce", sinif:"5. Sınıf", topics:[
    { id:4201, name:"Başlık 1", content:"5. Sınıf Konu 3 - Başlık 1 içeriği buraya eklenecek." },
    { id:4202, name:"Başlık 2", content:"5. Sınıf Konu 3 - Başlık 2 içeriği buraya eklenecek." },
    { id:4203, name:"Başlık 3", content:"5. Sınıf Konu 3 - Başlık 3 içeriği buraya eklenecek." },
  ]},
  { id:43, name:"5. Sınıf Konu 4", color:"#6d28d9", sinif:"5. Sınıf", topics:[
    { id:4301, name:"Başlık 1", content:"5. Sınıf Konu 4 - Başlık 1 içeriği buraya eklenecek." },
    { id:4302, name:"Başlık 2", content:"5. Sınıf Konu 4 - Başlık 2 içeriği buraya eklenecek." },
    { id:4303, name:"Başlık 3", content:"5. Sınıf Konu 4 - Başlık 3 içeriği buraya eklenecek." },
  ]},
];

const INIT_QUESTIONS = [
  { id:1, subject:"Doku", topic:"Histoloji", q:"Temel doku tipleri kaç tanedir?", opts:["2","3","4","5"], ans:2 },
  { id:2, subject:"Doku", topic:"Fizyoloji", q:"İstirahat membran potansiyeli yaklaşık kaç mV'tur?", opts:["-40","-55","-70","-90"], ans:2 },
  { id:3, subject:"Hareket", topic:"Anatomi", q:"Rotator manşet kaç kastan oluşur?", opts:["2","3","4","5"], ans:2 },
  { id:4, subject:"Hareket", topic:"Fizyoloji", q:"Nöromüsküler kavşakta salınan nörotransmitter nedir?", opts:["Dopamin","Serotonin","Asetilkolin","Glutamat"], ans:2 },
  { id:5, subject:"Hareket", topic:"Biyokimya", q:"Kas kasılmasında ilk enerji kaynağı hangisidir?", opts:["Glikoliz","Beta oksidasyon","Kreatin fosfat","Oksidatif fosforilasyon"], ans:2 },
];

const FLASHCARDS_DB = {
  "Doku|Histoloji":[
    { q:"Temel doku tipleri nelerdir?", a:"Epitel, Bağ, Kas, Sinir doku." },
    { q:"Goblet hücreleri ne salgılar?", a:"Mukus — tek katlı silindirik epitelde bulunur." },
  ],
  "Doku|Fizyoloji":[
    { q:"İstirahat membran potansiyeli neden negatiftir?", a:"K+ iyonlarının difüzyonu ve Na+/K+ ATPaz pompası (~-70 mV)." },
  ],
  "Hareket|Anatomi":[
    { q:"Rotator manşet kasları (SITS)?", a:"Supraspinatus, Infraspinatus, Teres minor, Subscapularis." },
    { q:"Carpal tunnel sendromunda sıkışan sinir?", a:"N. medianus." },
  ],
  "Hareket|Fizyoloji":[
    { q:"Nöromüsküler kavşakta ne olur?", a:"ACh salınır, nikotinik reseptöre bağlanır, kas kasılır." },
  ],
  "Hareket|Biyokimya":[
    { q:"Kas kasılmasında enerji sırası?", a:"1. Kreatin fosfat 2. Anaerobik glikoliz 3. Aerobik fosforilasyon." },
  ],
};

const TOPIC_GROUPS = {
  "Doku":[
    { groupLabel:"Biyofizik", topics:["Biyofizik"] },
    { groupLabel:"Tıbbi Biyoloji", topics:["Tıbbi Biyoloji"] },
    { groupLabel:"Histoloji", topics:["Histoloji"] },
    { groupLabel:"Fizyoloji + Nöroloji Entegre", topics:["Fizyoloji","Nöroloji Entegre"] },
  ],
  "Hareket":[
    { groupLabel:"Anatomi", topics:["Anatomi"] },
    { groupLabel:"Histoloji + Fizyoloji + Biyokimya + Biyofizik", topics:["Histoloji","Fizyoloji","Biyokimya","Biyofizik"] },
    { groupLabel:"Fizik Tedavi + Nöroloji + Ortopedi", topics:["Fizik Tedavi","Nöroloji","Ortopedi"] },
  ],
};

const DAYS = ["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"];
const HOURS = ["08:00-09:00","09:00-10:00","10:00-11:00","11:00-12:00","12:00-13:00","13:00-14:00","14:00-15:00","15:00-16:00","16:00-17:00","17:00-18:00","18:00-19:00","19:00-20:00","20:00-21:00","21:00-22:00","22:00-23:00"];

// ── AdminSchedule ──────────────────────────────────────────────
function AdminSchedule({ schedules, setSchedules, practiceSchedules, setPracticeSchedules, sheetUrls, setSheetUrls, s }) {
  const [editCell, setEditCell] = useState(null);
  const [editVal, setEditVal] = useState("");
  const [viewSinif, setViewSinif] = useState("1. Sınıf");
  const [fetchStatus, setFetchStatus] = useState({});

  function extractSheetId(url) {
    const m = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
    return m ? m[1] : null;
  }

  function extractGid(url) {
    const m = url.match(/gid=(\d+)/);
    return m ? m[1] : "0";
  }

  async function fetchSheet(url, sinif, type) {
    const key = sinif + "|" + type;
    setFetchStatus(p => ({ ...p, [key]:{ loading:true, error:null, done:false } }));
    try {
      const sheetId = extractSheetId(url);
      if (!sheetId) throw new Error("Geçersiz Google Sheets bağlantısı");
      const gid = extractGid(url);
      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
      const resp = await fetch(csvUrl);
      if (!resp.ok) throw new Error("Sayfa yüklenemedi. Sayfanın 'Herkese açık' olduğundan emin olun.");
      const text = await resp.text();
      const lines = text.split("\n").map(l => l.split(",").map(c => c.replace(/^"|"$/g,"").trim()));

      if (type === "general") {
        let grid = {};
        HOURS.forEach(h => { grid[h] = {}; DAYS.forEach(d => { grid[h][d] = ""; }); });
        let startRow = 0;
        for (let r = 0; r < Math.min(3, lines.length); r++) {
          if (lines[r].some(c => DAYS.some(d => c.toLowerCase().includes(d.slice(0,3).toLowerCase())))) { startRow = r+1; break; }
        }
        lines.slice(startRow).forEach(row => {
          if (!row[0]) return;
          const saat = row[0].trim();
          const matched = HOURS.find(h => h.startsWith(saat.slice(0,5)) || h===saat) || saat;
          if (grid[matched] !== undefined) {
            DAYS.forEach((d, i) => { grid[matched][d] = row[i+1] || ""; });
          }
        });
        setSchedules(p => ({ ...p, [sinif]:grid }));
      } else {
        // Practice schedule: parse rows as [Hafta, Gün, Saat, Grup, Uygulama Adı]
        // Or flexible: detect columns by header
        const header = lines[0]?.map(h => h.toLowerCase()) || [];
        const entries = [];
        lines.slice(1).forEach(row => {
          if (!row[0]) return;
          const entry = {};
          header.forEach((h, i) => { entry[h] = row[i] || ""; });
          entries.push(entry);
        });
        setPracticeSchedules(p => ({ ...p, [sinif]:entries }));
      }
      setFetchStatus(p => ({ ...p, [key]:{ loading:false, error:null, done:true } }));
    } catch(e) {
      setFetchStatus(p => ({ ...p, [key]:{ loading:false, error:e.message||"Veri çekilemedi.", done:false } }));
    }
  }

  function saveCell() {
    if (!editCell) return;
    const { sinif, hour, day } = editCell;
    setSchedules(p => ({ ...p, [sinif]:{ ...(p[sinif]||{}), [hour]:{ ...((p[sinif]||{})[hour]||{}), [day]:editVal } } }));
    setEditCell(null);
  }

  const curGrid = schedules[viewSinif] || null;
  const curPractice = practiceSchedules[viewSinif] || [];

  return (
    <>
      <p style={s.title}>Ders Programları</p>
      <p style={{ fontSize:13, color:"#94a3b8", marginBottom:20 }}>Google E-Tablolar bağlantılarını girin. Tablolarınız "Herkes görüntüleyebilir" olarak paylaşılmış olmalı.</p>

      {/* Sınıf seçimi */}
      <div style={{ display:"flex", gap:6, marginBottom:20, background:"rgba(16,24,44,0.6)", padding:5, borderRadius:12, width:"fit-content" }}>
        {SINIFLAR.map(sf => <button key={sf} onClick={() => setViewSinif(sf)} style={{ padding:"8px 16px", borderRadius:9, border:"none", background:viewSinif===sf?"rgba(0,212,170,0.15)":"transparent", color:viewSinif===sf?"#00d4aa":"#94a3b8", cursor:"pointer", fontSize:13, fontWeight:viewSinif===sf?700:500 }}>{sf}</button>)}
      </div>

      {/* URL giriş kartları */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
        {/* Genel Ders Programı */}
        <div style={{ ...s.card, border:"1px solid rgba(61,90,241,0.3)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <span style={{ fontSize:18 }}>📅</span>
            <div>
              <p style={{ fontWeight:700, fontSize:14, margin:0 }}>Genel Ders Programı</p>
              <p style={{ fontSize:11, color:"#64748b", margin:0 }}>{viewSinif} · Teorik + Uygulama saatleri</p>
            </div>
          </div>
          <input style={s.input} placeholder="Google Sheets bağlantısını yapıştırın..."
            value={(sheetUrls[viewSinif]||{}).general||""} 
            onChange={e => setSheetUrls(p => ({ ...p, [viewSinif]:{ ...(p[viewSinif]||{}), general:e.target.value } }))} />
          <div style={{ display:"flex", gap:8, marginTop:10 }}>
            <button style={{ ...s.btn(true), flex:1, fontSize:12 }}
              onClick={() => { const url = (sheetUrls[viewSinif]||{}).general; if(url) fetchSheet(url, viewSinif, "general"); else alert("Bağlantı girin."); }}
              disabled={fetchStatus[viewSinif+"|general"]?.loading}>
              {fetchStatus[viewSinif+"|general"]?.loading ? "Çekiliyor..." : "📥 Verileri Çek"}
            </button>
            {schedules[viewSinif] && <button style={{ padding:"7px 10px", borderRadius:8, border:"1px solid rgba(255,82,82,0.3)", background:"transparent", color:"#ff5252", cursor:"pointer", fontSize:12 }} onClick={() => setSchedules(p => { const n={...p}; delete n[viewSinif]; return n; })}>Sil</button>}
          </div>
          {fetchStatus[viewSinif+"|general"]?.done && <p style={{ fontSize:11, color:"#00e676", margin:"8px 0 0" }}>✓ Program başarıyla çekildi!</p>}
          {fetchStatus[viewSinif+"|general"]?.error && <p style={{ fontSize:11, color:"#ff5252", margin:"8px 0 0" }}>{fetchStatus[viewSinif+"|general"].error}</p>}
          {schedules[viewSinif] && <p style={{ fontSize:11, color:"#00d4aa", margin:"8px 0 0" }}>✓ Veri mevcut</p>}
        </div>

        {/* Uygulama Takvimi */}
        <div style={{ ...s.card, border:"1px solid rgba(255,176,58,0.3)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <span style={{ fontSize:18 }}>🔬</span>
            <div>
              <p style={{ fontWeight:700, fontSize:14, margin:0 }}>Uygulama Takvimi</p>
              <p style={{ fontSize:11, color:"#64748b", margin:0 }}>{viewSinif} · Hafta / Grup / Saat eşleştirme</p>
            </div>
          </div>
          <input style={s.input} placeholder="Google Sheets bağlantısını yapıştırın..."
            value={(sheetUrls[viewSinif]||{}).practice||""} 
            onChange={e => setSheetUrls(p => ({ ...p, [viewSinif]:{ ...(p[viewSinif]||{}), practice:e.target.value } }))} />
          <div style={{ display:"flex", gap:8, marginTop:10 }}>
            <button style={{ ...s.btn(true), flex:1, fontSize:12, background:"linear-gradient(135deg,#ffb03a,#f59e0b)" }}
              onClick={() => { const url = (sheetUrls[viewSinif]||{}).practice; if(url) fetchSheet(url, viewSinif, "practice"); else alert("Bağlantı girin."); }}
              disabled={fetchStatus[viewSinif+"|practice"]?.loading}>
              {fetchStatus[viewSinif+"|practice"]?.loading ? "Çekiliyor..." : "📥 Verileri Çek"}
            </button>
            {practiceSchedules[viewSinif] && <button style={{ padding:"7px 10px", borderRadius:8, border:"1px solid rgba(255,82,82,0.3)", background:"transparent", color:"#ff5252", cursor:"pointer", fontSize:12 }} onClick={() => setPracticeSchedules(p => { const n={...p}; delete n[viewSinif]; return n; })}>Sil</button>}
          </div>
          {fetchStatus[viewSinif+"|practice"]?.done && <p style={{ fontSize:11, color:"#00e676", margin:"8px 0 0" }}>✓ Uygulama takvimi başarıyla çekildi!</p>}
          {fetchStatus[viewSinif+"|practice"]?.error && <p style={{ fontSize:11, color:"#ff5252", margin:"8px 0 0" }}>{fetchStatus[viewSinif+"|practice"].error}</p>}
          {practiceSchedules[viewSinif] && <p style={{ fontSize:11, color:"#ffb03a", margin:"8px 0 0" }}>✓ {curPractice.length} uygulama kaydı mevcut</p>}
        </div>
      </div>

      {/* Uygulama takvimi önizleme */}
      {curPractice.length>0 && (
        <div style={{ ...s.card, marginBottom:16 }}>
          <p style={{ fontWeight:700, margin:"0 0 12px" }}>🔬 Uygulama Takvimi Önizleme <span style={{ fontSize:12, color:"#64748b", fontWeight:400 }}>({curPractice.length} kayıt)</span></p>
          <div style={{ maxHeight:200, overflowY:"auto" }}>
            <table style={{ borderCollapse:"collapse", width:"100%", fontSize:12 }}>
              <thead>
                <tr>
                  {Object.keys(curPractice[0]||{}).map(k => <th key={k} style={{ padding:"6px 10px", background:"rgba(255,176,58,0.2)", color:"#ffb03a", border:"1px solid rgba(148,163,184,0.1)", fontWeight:700, textAlign:"left", textTransform:"capitalize" }}>{k}</th>)}
                </tr>
              </thead>
              <tbody>
                {curPractice.slice(0,20).map((row,i) => (
                  <tr key={i} style={{ background:i%2===0?"rgba(16,24,44,0.3)":"rgba(16,24,44,0.5)" }}>
                    {Object.values(row).map((v,j) => <td key={j} style={{ padding:"5px 10px", border:"1px solid rgba(148,163,184,0.08)", color:"#e8edf5", fontSize:11 }}>{v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
            {curPractice.length>20 && <p style={{ fontSize:11, color:"#64748b", margin:"8px 0 0" }}>... ve {curPractice.length-20} kayıt daha</p>}
          </div>
        </div>
      )}

      {/* Program tablosu + Manuel düzenleme */}
      <div style={s.card}>
        <p style={{ fontWeight:700, margin:"0 0 16px" }}>Program Görüntüle / Düzenle</p>
        {!curGrid ? (
          <div style={{ textAlign:"center", padding:"32px 24px" }}>
            <p style={{ fontSize:28, margin:"0 0 8px" }}>📅</p>
            <p style={{ color:"#64748b", margin:0 }}>{viewSinif} için henüz program yüklenmemiş. Yukarıdan Google Sheets bağlantısı girin.</p>
          </div>
        ) : (
          <>
            <div style={{ overflowX:"auto" }}>
              <table style={{ borderCollapse:"collapse", width:"100%", minWidth:700, fontSize:12 }}>
                <thead>
                  <tr>
                    <th style={{ padding:"8px 10px", background:"rgba(0,212,170,0.8)", color:"#fff", border:"1px solid rgba(148,163,184,0.15)", fontWeight:700, whiteSpace:"nowrap", textAlign:"center" }}>SAAT</th>
                    {DAYS.map(d => <th key={d} style={{ padding:"8px 10px", background:"rgba(0,212,170,0.8)", color:"#fff", border:"1px solid rgba(148,163,184,0.15)", fontWeight:700, textAlign:"center", minWidth:100 }}>{d.toUpperCase()}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {HOURS.map((hour,ri) => (
                    <tr key={hour} style={{ background:ri%2===0?"#fff":"#fafafa" }}>
                      <td style={{ padding:"8px 10px", border:"1px solid rgba(148,163,184,0.1)", whiteSpace:"nowrap", fontWeight:600, color:"#e8edf5", background:"rgba(16,24,44,0.4)" }}>{hour}</td>
                      {DAYS.map(day => {
                        const val = curGrid?.[hour]?.[day] || "";
                        const isEditing = editCell?.sinif===viewSinif&&editCell?.hour===hour&&editCell?.day===day;
                        const isUygulama = val.toLowerCase().includes("uygulama");
                        return (
                          <td key={day} style={{ padding:"4px 6px", border:"1px solid rgba(148,163,184,0.1)", verticalAlign:"top", minWidth:100, cursor:"pointer", background:isUygulama?"rgba(255,176,58,0.08)":undefined }}
                            onClick={() => { if (!isEditing) { setEditCell({ sinif:viewSinif, hour, day }); setEditVal(val); } }}>
                            {isEditing
                              ? <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                                  <textarea value={editVal} onChange={e => setEditVal(e.target.value)} autoFocus
                                    style={{ width:"100%", minHeight:50, fontSize:11, padding:4, border:"1px solid rgba(0,212,170,0.3)", borderRadius:4, resize:"none", boxSizing:"border-box", fontFamily:"inherit" }} />
                                  <div style={{ display:"flex", gap:4 }}>
                                    <button onClick={e => { e.stopPropagation(); saveCell(); }} style={{ flex:1, padding:"3px", background:"#00d4aa", color:"#fff", border:"none", borderRadius:4, cursor:"pointer", fontSize:10, fontWeight:700 }}>✓</button>
                                    <button onClick={e => { e.stopPropagation(); setEditCell(null); }} style={{ flex:1, padding:"3px", background:"rgba(148,163,184,0.15)", color:"#e8edf5", border:"none", borderRadius:4, cursor:"pointer", fontSize:10 }}>✕</button>
                                  </div>
                                </div>
                              : val ? <span style={{ fontSize:11, color:isUygulama?"#ffb03a":"#e8edf5", lineHeight:1.4, display:"block", fontWeight:isUygulama?600:400 }}>{val}{isUygulama&&" 🔬"}</span>
                                    : <span style={{ fontSize:10, color:"rgba(148,163,184,0.15)" }}>+</span>
                            }
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize:11, color:"#64748b", margin:"10px 0 0" }}>Herhangi bir hücreye tıklayarak düzenleyebilirsiniz. 🔬 işaretli hücreler "Uygulama" içeriyor.</p>
          </>
        )}
      </div>
    </>
  );
}
const DEMO_USERS = [
  { email:"demo@medstudypro.com", password:"demo123", name:"Demo Kullanıcı", year:"1. Sınıf", group:"Grup A", university:"İstanbul Tıp Fakültesi", avatar:"DK", avatarColor:"#3d5af1", role:"user" },
];
const AVATAR_COLORS = ["#3d5af1","#059669","#dc2626","#d97706","#7c3aed","#0891b2"];

function initStats() { return { cards:0, testScore:0, testCount:0, topics:0, streak:1 }; }

// ── BUTCalculator ──────────────────────────────────────────────
function BUTCalculator() {
  const [vize, setVize] = useState("");
  const [final, setFinal] = useState("");
  const [uygulama, setUygulama] = useState("");
  const v = parseFloat(vize), f = parseFloat(final), u = parseFloat(uygulama);
  const valid = !isNaN(v)&&!isNaN(f)&&!isNaN(u)&&v>=0&&v<=100&&f>=0&&f<=100&&u>=0&&u<=100;
  const sonuc = valid ? v*0.4+f*0.3+u*0.3 : null;
  const durum = sonuc===null ? null : sonuc>=60
    ? { text:"Tebrikler, Geçtiniz!", icon:"🎉", bg:"#f0fdf4", col:"#16a34a", border:"#86efac" }
    : sonuc>=50
      ? { text:"Şartlı Geçtiniz", icon:"⚠️", bg:"#fef9ec", col:"#d97706", border:"#fcd34d" }
      : { text:"Kaldınız", icon:"❌", bg:"#fef2f2", col:"#dc2626", border:"#fca5a5" };
  const inp = { width:"100%", padding:"11px 14px", border:"1px solid rgba(148,163,184,0.15)", borderRadius:10, fontSize:15, background:"rgba(12,18,34,0.4)", color:"#e8edf5", boxSizing:"border-box", outline:"none" };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      {[["Vize (%40)", vize, setVize],["Final (%30)", final, setFinal],["Uygulama (%30)", uygulama, setUygulama]].map(([label,val,setter]) => (
        <div key={label}>
          <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 6px", fontWeight:600 }}>{label}</p>
          <input style={inp} type="number" min="0" max="100" placeholder="0-100 arası girin" value={val} onChange={e => setter(e.target.value)} />
        </div>
      ))}
      {sonuc!==null && (
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:4 }}>
          <div style={{ padding:"18px", borderRadius:14, background:"rgba(0,212,170,0.1)", border:"1px solid rgba(0,212,170,0.3)", textAlign:"center" }}>
            <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 6px", fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>Sınav Sonucu</p>
            <p style={{ fontSize:42, fontWeight:800, margin:0, color:"#00d4aa", lineHeight:1 }}>{sonuc.toFixed(1)}</p>
          </div>
          <div style={{ padding:"16px", borderRadius:14, background:durum.bg, border:"1px solid "+durum.border, textAlign:"center" }}>
            <p style={{ fontSize:28, margin:"0 0 6px" }}>{durum.icon}</p>
            <p style={{ fontSize:16, fontWeight:700, margin:0, color:durum.col }}>{durum.text}</p>
          </div>
        </div>
      )}
      {!valid&&(vize||final||uygulama) && <p style={{ fontSize:12, color:"#64748b", textAlign:"center", margin:0 }}>Tüm alanları doldurun (0-100)</p>}
    </div>
  );
}

// ── CardEditor ─────────────────────────────────────────────────
function CardEditor({ card, idx, onChange, onRemove }) {
  const qRef = useRef(), aRef = useRef();
  function readImg(file, side) {
    const r = new FileReader();
    r.onload = () => onChange(idx, side==="q"?"qImg":"aImg", r.result);
    r.readAsDataURL(file);
  }
  return (
    <div style={{ border:"1px solid rgba(148,163,184,0.15)", borderRadius:12, padding:16, marginBottom:14, background:"rgba(16,24,44,0.6)" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
        <span style={{ fontSize:13, fontWeight:600, color:"#94a3b8" }}>Kart {idx+1}</span>
        {onRemove && <button onClick={() => onRemove(idx)} style={{ padding:"3px 10px", borderRadius:6, border:"1px solid rgba(255,82,82,0.3)", background:"transparent", color:"#ff5252", cursor:"pointer", fontSize:12 }}>Sil</button>}
      </div>
      <div style={{ display:"flex", gap:12 }}>
        {["q","a"].map(side => (
          <div key={side} style={{ flex:1, border:"1px solid rgba(148,163,184,0.15)", borderRadius:10, padding:14, background:"rgba(12,18,34,0.4)" }}>
            <p style={{ fontSize:11, color:"#94a3b8", marginBottom:6, fontWeight:600, textTransform:"uppercase" }}>{side==="q"?"Ön Yüz":"Arka Yüz"}</p>
            <textarea style={{ width:"100%", minHeight:80, padding:"8px 10px", border:"1px solid rgba(148,163,184,0.15)", borderRadius:8, fontSize:13, background:"rgba(16,24,44,0.6)", color:"#e8edf5", resize:"vertical", boxSizing:"border-box", fontFamily:"inherit" }}
              placeholder={side==="q"?"Soruyu yaz...":"Cevabı yaz..."}
              value={card[side]} onChange={e => onChange(idx, side, e.target.value)} />
            {card[side==="q"?"qImg":"aImg"] && (
              <div>
                <img src={card[side==="q"?"qImg":"aImg"]} alt="" style={{ width:"100%", borderRadius:8, marginTop:8, maxHeight:130, objectFit:"contain" }} />
                <span style={{ display:"block", fontSize:11, color:"#ff5252", cursor:"pointer", marginTop:4 }} onClick={() => onChange(idx, side==="q"?"qImg":"aImg", "")}>Görseli kaldır</span>
              </div>
            )}
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:8, padding:"6px 12px", borderRadius:6, border:"1px dashed rgba(148,163,184,0.15)", cursor:"pointer", fontSize:12, color:"#94a3b8" }}
              onClick={() => (side==="q"?qRef:aRef).current.click()}>Görsel ekle</div>
            <input ref={side==="q"?qRef:aRef} type="file" accept="image/*" style={{ display:"none" }} onChange={e => readImg(e.target.files[0], side)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── StudyDeck ──────────────────────────────────────────────────
function StudyDeck({ deck, onBack, onUpdateStats }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const cards = deck.cards.filter(c => c.q||c.qImg);
  if (!cards.length) return (
    <div style={{ textAlign:"center", padding:40 }}>
      <p style={{ color:"#64748b" }}>Bu destede kart yok.</p>
      <button onClick={onBack} style={{ padding:"8px 18px", borderRadius:8, border:"1px solid rgba(148,163,184,0.15)", background:"rgba(16,24,44,0.6)", cursor:"pointer" }}>Geri</button>
    </div>
  );
  const card = cards[idx];
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <button onClick={onBack} style={{ padding:"8px 16px", borderRadius:8, border:"1px solid rgba(148,163,184,0.15)", background:"rgba(16,24,44,0.6)", cursor:"pointer", fontSize:14 }}>Geri</button>
        <span style={{ fontSize:14, color:"#94a3b8" }}>{idx+1} / {cards.length}</span>
        <span style={{ fontSize:13, fontWeight:600, color:"#00d4aa" }}>{deck.name}</span>
      </div>
      <div onClick={() => { setFlipped(!flipped); if (!flipped) onUpdateStats(); }}
        style={{ border:"1.5px solid "+(flipped?"#a5b4fc":"rgba(148,163,184,0.15)"), borderRadius:16, padding:"36px 28px", cursor:"pointer", minHeight:200, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:flipped?"rgba(0,212,170,0.1)":"rgba(12,18,34,0.4)", marginBottom:16 }}>
        {(flipped?card.aImg:card.qImg) && <img src={flipped?card.aImg:card.qImg} alt="" style={{ maxWidth:"100%", maxHeight:180, borderRadius:10, marginBottom:16, objectFit:"contain" }} />}
        {(flipped?card.a:card.q) && <p style={{ fontSize:16, lineHeight:1.7, margin:0, color:"#e8edf5", textAlign:"center", maxWidth:520 }}>{flipped?card.a:card.q}</p>}
      </div>
      <p style={{ fontSize:12, color:"#64748b", textAlign:"center", margin:"0 0 20px" }}>Kartı çevirmek için tıkla</p>
      <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
        <button disabled={idx===0} onClick={() => { setIdx(idx-1); setFlipped(false); }} style={{ padding:"9px 22px", borderRadius:8, border:"1px solid rgba(148,163,184,0.15)", background:"rgba(16,24,44,0.6)", cursor:idx===0?"default":"pointer", opacity:idx===0?0.4:1, fontSize:14 }}>Önceki</button>
        <button disabled={idx===cards.length-1} onClick={() => { setIdx(idx+1); setFlipped(false); }} style={{ padding:"9px 22px", borderRadius:8, border:"none", background:"#00d4aa", color:"#fff", cursor:idx===cards.length-1?"default":"pointer", opacity:idx===cards.length-1?0.5:1, fontSize:14, fontWeight:600 }}>Sonraki</button>
      </div>
    </div>
  );
}

// ── AI Helper ─────────────────────────────────────────────────
let pdfjsLoaded = false;
async function ensurePdfJs() {
  if (pdfjsLoaded) return;
  await new Promise((res, rej) => {
    if (window.pdfjsLib) { pdfjsLoaded = true; res(); return; }
    const sc = document.createElement("script");
    sc.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    sc.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = "";
      pdfjsLoaded = true;
      res();
    };
    sc.onerror = () => rej(new Error("PDF kütüphanesi yüklenemedi."));
    document.head.appendChild(sc);
  });
}

async function pdfToImages(file, maxPages) {
  await ensurePdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages = Math.min(pdf.numPages, maxPages || 8);
  const images = [];
  for (let i = 1; i <= pages; i++) {
    const page = await pdf.getPage(i);
    const vp = page.getViewport({ scale: 1.2 });
    const canvas = document.createElement("canvas");
    canvas.width = vp.width;
    canvas.height = vp.height;
    await page.render({ canvasContext: canvas.getContext("2d"), viewport: vp }).promise;
    images.push(canvas.toDataURL("image/jpeg", 0.6).split(",")[1]);
  }
  return images;
}

async function callAI(contentParts) {
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: contentParts }]
    })
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data?.error?.message || "API hatası: " + resp.status);
  const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
  if (!text) throw new Error("API'den yanıt alınamadı.");
  return text;
}

// ── AdminQuestions ─────────────────────────────────────────────
function AdminQuestions({ subjects, questions, setQuestions, s }) {
  const [showManual, setShowManual] = useState(null);
  const [pdfUploading, setPdfUploading] = useState(null);
  const [pdfStatus, setPdfStatus] = useState({});
  const [manualTopic, setManualTopic] = useState("");
  const [manualQ, setManualQ] = useState("");
  const [manualOpts, setManualOpts] = useState(["","","",""]);
  const [manualAns, setManualAns] = useState(0);
  const [pdfTargetTopic, setPdfTargetTopic] = useState({});
  const [pendingUpload, setPendingUpload] = useState(null);
  const pdfRef = useRef();

  function getGroups(sub) {
    const defined = TOPIC_GROUPS[sub.name];
    if (defined) return defined;
    return sub.topics.map(t => ({ groupLabel:t.name, topics:[t.name] }));
  }

  async function handlePdfUpload(file, subjectName, topics) {
    const key = subjectName+"|"+topics.join(",");
    setPdfStatus(p => ({ ...p, [key]:{ loading:true, added:0, error:null } }));
    try {
      const images = await pdfToImages(file, 10);
      const parts = images.map(img => ({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: img } }));
      parts.push({ type: "text", text: 'Bu sayfalardaki tıp sınav sorularını çıkar.\nSoruları BİREBİR AYNI ŞEKİLDE yaz. Şıkları koru. Doğru cevabı ans alanına yaz (0=A,1=B,2=C,3=D,4=E).\nSADECE JSON döndür:\n{"questions":[{"q":"soru","opts":["A","B","C","D"],"ans":0}]}' });
      const aiText = await callAI(parts);
      const cleaned = aiText.replace(/```json\s*/gi,"").replace(/```\s*/g,"").trim();
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("AI yanıtı JSON formatında değil.");
      const parsed = JSON.parse(jsonMatch[0]);
      const targetTopic = pdfTargetTopic[key]||topics[0];
      const newQs = (parsed.questions||[]).map(q => ({ id:Date.now()+Math.random(), subject:subjectName, topic:targetTopic, q:q.q, opts:q.opts, ans:q.ans, source:"gecmis" }));
      setQuestions(p => [...p,...newQs]);
      setPdfStatus(p => ({ ...p, [key]:{ loading:false, added:newQs.length, error:null } }));
    } catch(e) {
      setPdfStatus(p => ({ ...p, [key]:{ loading:false, added:0, error:"PDF işlenemedi: " + (e.message||"Bilinmeyen hata") } }));
    }
  }

  return (
    <>
      <p style={s.title}>Test Soruları</p>
      {subjects.map(sub => {
        const groups = getGroups(sub);
        const subQCount = questions.filter(q => q.subject===sub.name).length;
        return (
          <div key={sub.id} style={{ ...s.card, marginBottom:18 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <span style={{ width:12, height:12, borderRadius:"50%", background:sub.color, display:"inline-block" }}></span>
              <span style={{ fontWeight:700, fontSize:16 }}>{sub.name}</span>
              <span style={s.tag}>{subQCount} soru</span>
            </div>
            {sub.topics.length===0 ? <p style={{ fontSize:13, color:"#64748b", margin:0 }}>Alt konu yok.</p> : groups.map(group => {
              const gKey = sub.name+"|"+group.topics.join(",");
              const gQs = questions.filter(q => q.subject===sub.name && group.topics.includes(q.topic));
              const isManual = showManual===gKey;
              const isPdf = pdfUploading===gKey;
              const pdfSt = pdfStatus[gKey];
              return (
                <div key={group.groupLabel} style={{ border:"1px solid rgba(148,163,184,0.12)", borderRadius:12, padding:"12px 16px", marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:gQs.length>0||isManual||isPdf?12:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontWeight:600, fontSize:14 }}>{group.groupLabel}</span>
                      {gQs.length>0 && <span style={{ fontSize:11, padding:"2px 7px", borderRadius:8, background:"rgba(0,212,170,0.1)", color:"#00d4aa", fontWeight:600 }}>{gQs.length} soru</span>}
                    </div>
                    <div style={{ display:"flex", gap:8 }}>
                      <button style={{ ...s.btn(isPdf), fontSize:12, padding:"5px 12px" }} onClick={() => { setPdfUploading(isPdf?null:gKey); if (!isPdf) setShowManual(null); }}>{isPdf?"İptal":"PDF Yükle"}</button>
                      <button style={{ ...s.btn(isManual), fontSize:12, padding:"5px 12px" }} onClick={() => { if (isManual) { setShowManual(null); } else { setShowManual(gKey); setPdfUploading(null); setManualTopic(group.topics[0]); setManualQ(""); setManualOpts(["","","",""]); setManualAns(0); } }}>{isManual?"İptal":"+ Manuel"}</button>
                    </div>
                  </div>
                  {isPdf && (
                    <div style={{ background:"rgba(12,18,34,0.4)", borderRadius:10, padding:14, marginBottom:12, border:"1px solid rgba(148,163,184,0.15)" }}>
                      {group.topics.length>1 && (
                        <div style={{ marginBottom:10 }}>
                          <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 5px", fontWeight:600 }}>Sorular hangi konuya eklensin?</p>
                          <select style={s.input} value={pdfTargetTopic[gKey]||group.topics[0]} onChange={e => setPdfTargetTopic(p => ({ ...p, [gKey]:e.target.value }))}>
                            {group.topics.map(t => <option key={t}>{t}</option>)}
                          </select>
                        </div>
                      )}
                      <div style={{ border:"2px dashed rgba(0,212,170,0.3)", borderRadius:10, padding:20, textAlign:"center", cursor:pdfSt&&pdfSt.loading?"default":"pointer", background:"rgba(12,18,34,0.4)" }}
                        onClick={() => { if (!pdfSt||!pdfSt.loading) { setPendingUpload({ subjectName:sub.name, topics:group.topics, key:gKey }); pdfRef.current.click(); } }}>
                        {pdfSt&&pdfSt.loading ? <p style={{ fontSize:13, color:"#00d4aa", margin:0, fontWeight:600 }}>AI sorular çıkarıyor...</p>
                          : <><p style={{ fontSize:22, margin:"0 0 6px" }}>📄</p><p style={{ fontSize:13, fontWeight:600, margin:"0 0 3px" }}>PDF yükle — sorular otomatik eklenir</p><p style={{ fontSize:12, color:"#94a3b8", margin:0 }}>Tıkla veya sürükle</p></>}
                      </div>
                      {pdfSt&&pdfSt.added>0 && <div style={{ marginTop:10, padding:"8px 12px", background:"rgba(0,230,118,0.1)", borderRadius:8, fontSize:13, color:"#00e676", fontWeight:600 }}>{pdfSt.added} soru eklendi!</div>}
                      {pdfSt&&pdfSt.error && <div style={{ marginTop:10, padding:"8px 12px", background:"rgba(255,82,82,0.1)", borderRadius:8, fontSize:13, color:"#ff5252" }}>{pdfSt.error}</div>}
                    </div>
                  )}
                  {isManual && (
                    <div style={{ background:"rgba(12,18,34,0.4)", borderRadius:10, padding:14, marginBottom:12, border:"1px solid rgba(148,163,184,0.15)" }}>
                      {group.topics.length>1 && (
                        <div style={{ marginBottom:10 }}>
                          <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 5px", fontWeight:600 }}>Konu</p>
                          <select style={s.input} value={manualTopic} onChange={e => setManualTopic(e.target.value)}>{group.topics.map(t => <option key={t}>{t}</option>)}</select>
                        </div>
                      )}
                      <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 5px", fontWeight:600 }}>Soru Metni</p>
                      <textarea value={manualQ} onChange={e => setManualQ(e.target.value)} placeholder="Soruyu yaz..." style={{ width:"100%", minHeight:70, padding:"10px 14px", border:"1px solid rgba(148,163,184,0.15)", borderRadius:8, fontSize:14, background:"rgba(16,24,44,0.6)", color:"#e8edf5", resize:"vertical", boxSizing:"border-box", fontFamily:"inherit", marginBottom:10 }} />
                      <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 8px", fontWeight:600 }}>Seçenekler</p>
                      {manualOpts.map((o,i) => (
                        <div key={i} style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
                          <input type="radio" checked={manualAns===i} onChange={() => setManualAns(i)} />
                          <span style={{ fontSize:13, fontWeight:700, color:"#00d4aa", minWidth:20 }}>{["A","B","C","D"][i]}.</span>
                          <input style={{ ...s.input, flex:1 }} placeholder={"Seçenek "+["A","B","C","D"][i]} value={o} onChange={e => setManualOpts(p => p.map((x,j) => j===i?e.target.value:x))} />
                        </div>
                      ))}
                      <button style={s.btn(true)} onClick={() => { if (!manualQ.trim()||manualOpts.some(o => !o.trim())) return; setQuestions(p => [...p,{ id:Date.now(), subject:sub.name, topic:manualTopic||group.topics[0], q:manualQ.trim(), opts:manualOpts, ans:manualAns }]); setManualQ(""); setManualOpts(["","","",""]); setManualAns(0); }}>Kaydet</button>
                    </div>
                  )}
                  {gQs.map(q => (
                    <div key={q.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"8px 10px", borderRadius:8, background:"rgba(12,18,34,0.4)", border:"1px solid rgba(148,163,184,0.12)", marginBottom:6 }}>
                      <div style={{ flex:1, marginRight:10 }}>
                        <div style={{ display:"flex", gap:6, marginBottom:4 }}>
                          <span style={{ fontSize:11, padding:"2px 7px", borderRadius:8, background:"rgba(0,230,118,0.1)", color:"#00e676", fontWeight:600 }}>{q.topic}</span>
                          <span style={{ fontSize:11, color:"#64748b" }}>Doğru: {["A","B","C","D"][q.ans]}</span>
                        </div>
                        <p style={{ margin:0, fontSize:13 }}>{q.q}</p>
                      </div>
                      <button onClick={() => setQuestions(p => p.filter(x => x.id!==q.id))} style={{ padding:"4px 10px", borderRadius:6, border:"1px solid rgba(255,82,82,0.3)", background:"transparent", color:"#ff5252", cursor:"pointer", fontSize:12, flexShrink:0 }}>Sil</button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        );
      })}
      <input ref={pdfRef} type="file" accept=".pdf" style={{ display:"none" }} onChange={e => { const file=e.target.files[0]; if (!file||!pendingUpload) return; handlePdfUpload(file, pendingUpload.subjectName, pendingUpload.topics); e.target.value=""; }} />
    </>
  );
}

// ══════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("login");
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(DEMO_USERS);
  const [userStats, setUserStats] = useState({});
  const [userDecks, setUserDecks] = useState({});
  const [authEmail, setAuthEmail] = useState(""); const [authPass, setAuthPass] = useState("");
  const [authName, setAuthName] = useState(""); const [authYear, setAuthYear] = useState("1. Sınıf");
  const [authGroup, setAuthGroup] = useState("Grup A");
  const [authUni, setAuthUni] = useState(""); const [authError, setAuthError] = useState("");
  const [adminPass, setAdminPass] = useState(""); const [adminError, setAdminError] = useState("");
  const [schedules, setSchedules] = useState({});
  const [practiceSchedules, setPracticeSchedules] = useState({});
  const [sheetUrls, setSheetUrls] = useState({});
  const [examDates, setExamDates] = useState({});
  const [subjects, setSubjects] = useState(INIT_SUBJECTS);
  const [sources, setSources] = useState([]);
  const [questions, setQuestions] = useState(INIT_QUESTIONS);
  const [page, setPage] = useState("dashboard");
  const [adminPage, setAdminPage] = useState("admin_dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicTab, setTopicTab] = useState("ozet");
  const [topicFcIdx, setTopicFcIdx] = useState(0);
  const [topicFcFlipped, setTopicFcFlipped] = useState(false);
  const [topicTestTab, setTopicTestTab] = useState("gecmis"); // gecmis | ai
  const [topicAnswers, setTopicAnswers] = useState({});
  const [topicSubmitted, setTopicSubmitted] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiProgress, setAiProgress] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [aiTab, setAiTab] = useState("summary");
  const [aiFcIdx, setAiFcIdx] = useState(0); const [aiFcFlipped, setAiFcFlipped] = useState(false);
  const [aiTestAnswers, setAiTestAnswers] = useState({}); const [aiTestSubmitted, setAiTestSubmitted] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [editName, setEditName] = useState(""); const [editYear, setEditYear] = useState(""); const [editUni, setEditUni] = useState(""); const [editGroup, setEditGroup] = useState("");
  const [deckView, setDeckView] = useState("list"); const [activeDeckIdx, setActiveDeckIdx] = useState(null);
  const [deckName, setDeckName] = useState(""); const [deckSubject, setDeckSubject] = useState("");
  const [deckCards, setDeckCards] = useState([{ q:"", a:"", qImg:"", aImg:"" }]);
  const [editingSubject, setEditingSubject] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null);
  const [editingSource, setEditingSource] = useState(null);
  const [newSubjectName, setNewSubjectName] = useState(""); const [newSubjectColor, setNewSubjectColor] = useState("#00d4aa"); const [newSubjectSinif, setNewSubjectSinif] = useState("1. Sınıf");
  const [newTopicName, setNewTopicName] = useState(""); const [newTopicContent, setNewTopicContent] = useState(""); const [newTopicSubjectId, setNewTopicSubjectId] = useState(null);
  const [newSourceName, setNewSourceName] = useState(""); const [newSourceType, setNewSourceType] = useState("Kitap"); const [newSourceUrl, setNewSourceUrl] = useState("");
  // Zilli Sınav State
  const [anatomyTopics, setAnatomyTopics] = useState([]); // [{id, name, sinif, images:[{id, image, questions:[{id,label,answer,x,y}]}]}]
  const [anatView, setAnatView] = useState("menu"); // menu | quiz | done
  const [anatSelected, setAnatSelected] = useState([]); // selected topic ids
  const [anatQIdx, setAnatQIdx] = useState(0);
  const [anatInput, setAnatInput] = useState("");
  const [anatAnswers, setAnatAnswers] = useState([]);
  const [anatTimer, setAnatTimer] = useState(30);
  const [anatShuffled, setAnatShuffled] = useState([]);
  const anatTimerRef = useRef(null);
  const anatImgRef = useRef();
  const anatBellRef = useRef(null);
  const [anatPendingPin, setAnatPendingPin] = useState(null);
  const [anatPinLabel, setAnatPinLabel] = useState("");
  const [anatPinAnswer, setAnatPinAnswer] = useState("");
  const [anatAdminSinif, setAnatAdminSinif] = useState("1. Sınıf");
  const [anatNewTopicName, setAnatNewTopicName] = useState("");
  const [anatExpandedTopic, setAnatExpandedTopic] = useState(null);
  const fileRef = useRef();
  const summaryPdfRef = useRef();
  const [summaryTarget, setSummaryTarget] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(null);
  const stats = user ? (userStats[user.email]||initStats()) : initStats();
  const decks = user ? (userDecks[user.email]||[]) : [];

  async function handleSummaryPdf(file) {
    if (!file || !summaryTarget) return;
    const { subId, topicId } = summaryTarget;
    setSummaryLoading(topicId);
    try {
      const images = await pdfToImages(file, 10);
      const parts = images.map(img => ({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: img } }));
      parts.push({ type: "text", text: 'Sen bir tıp fakültesi eğitmenisin. Bu sayfalardaki içeriği sınavda başarılı olacak detayda Türkçe özetle.\nKlinik önemi olan her detayı dahil et. Mekanizmaları, tanı kriterlerini açıkla. Önemli sayısal değerleri dahil et. Alt başlıklarla organize et.\nSADECE özet metnini döndür.' });
      const summary = await callAI(parts);
      setSubjects(p => p.map(x => x.id===subId ? { ...x, topics:x.topics.map(tp => tp.id===topicId ? { ...tp, content: summary } : tp) } : x));
    } catch(e) { alert("PDF özetlenemedi: " + (e.message||"Hata")); }
    setSummaryLoading(null); setSummaryTarget(null);
  }

  function updateStats(patch) { setUserStats(prev => { const cur = prev[user.email]||initStats(); return { ...prev, [user.email]:{ ...cur, ...patch } }; }); }
  function saveDecks(nd) { setUserDecks(prev => ({ ...prev, [user.email]:nd })); }
  function newBlankCard() { return { q:"", a:"", qImg:"", aImg:"" }; }
  function hcc(i,f,v) { setDeckCards(prev => prev.map((c,j) => j===i?{ ...c,[f]:v }:c)); }

  // Zilli Sınav fonksiyonları
  function anatStartQuiz(topicIds) {
    const ids = topicIds || anatSelected;
    const allQs = ids.flatMap(topicId => {
      const topic = anatomyTopics.find(t => t.id===topicId);
      if (!topic) return [];
      return topic.images.flatMap(img =>
        img.questions.map(q => ({ ...q, topicName:topic.name, imgSrc:img.image }))
      );
    }).sort(() => Math.random()-0.5).slice(0, 10);
    setAnatShuffled(allQs); setAnatQIdx(0); setAnatInput(""); setAnatAnswers([]); setAnatTimer(30); setAnatView("quiz");
  }
  function anatSaveAnswer(val) {
    clearInterval(anatTimerRef.current);
    const q = anatShuffled[anatQIdx];
    const norm = (s) => s.trim().toLowerCase().replace(/\s+/g," ");
    setAnatAnswers(prev => [...prev, { label:q.label, topicName:q.topicName, correct:q.answer, user:val.trim()||"Cevapsız", ok:norm(val)===norm(q.answer) }]);
    if (anatQIdx+1 >= anatShuffled.length) { setAnatView("done"); }
    else { setAnatQIdx(i => i+1); setAnatInput(""); setAnatTimer(30); }
  }
  useEffect(() => {
    if (anatView!=="quiz") return;
    anatTimerRef.current = setInterval(() => {
      setAnatTimer(prev => {
        if (prev <= 1) { clearInterval(anatTimerRef.current); anatSaveAnswer(""); return 0; }
        return prev-1;
      });
    }, 1000);
    return () => clearInterval(anatTimerRef.current);
  }, [anatQIdx, anatView]);

  const sinp = { width:"100%", padding:"11px 14px", border:"1px solid rgba(148,163,184,0.15)", borderRadius:10, fontSize:14, background:"rgba(12,18,34,0.6)", color:"#e8edf5", boxSizing:"border-box", outline:"none" };
  const s = {
    app:{ display:"flex", minHeight:"100vh", fontFamily:"Inter,system-ui,sans-serif", background:"#060a14", color:"#e8edf5", flexDirection:"column", position:"relative" },
    topbar:{ height:56, background:"rgba(12,18,34,0.85)", borderBottom:"1px solid rgba(148,163,184,0.12)", display:"flex", alignItems:"center", padding:"0 20px", gap:14, flexShrink:0, boxShadow:"0 1px 12px rgba(0,0,0,0.3)", position:"sticky", top:0, zIndex:100, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)" },
    overlay:{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", backdropFilter:"blur(4px)", zIndex:150 },
    sidebar:{ position:"fixed", top:0, left:0, bottom:0, width:260, background:"rgba(12,18,34,0.95)", borderRight:"1px solid rgba(148,163,184,0.12)", display:"flex", flexDirection:"column", boxShadow:"4px 0 30px rgba(0,0,0,0.4)", zIndex:200, transform:sidebarOpen?"translateX(0)":"translateX(-100%)", transition:"transform 0.35s cubic-bezier(0.4,0,0.2,1)", backdropFilter:"blur(20px)" },
    adminSidebar:{ position:"fixed", top:0, left:0, bottom:0, width:260, background:"rgba(12,18,34,0.95)", display:"flex", flexDirection:"column", boxShadow:"4px 0 30px rgba(0,0,0,0.4)", zIndex:200, transform:sidebarOpen?"translateX(0)":"translateX(-100%)", transition:"transform 0.35s cubic-bezier(0.4,0,0.2,1)", backdropFilter:"blur(20px)", borderRight:"1px solid rgba(148,163,184,0.12)" },
    nav:(a) => ({ display:"flex", alignItems:"center", gap:10, padding:"11px 20px", cursor:"pointer", fontSize:14, color:a?"#00d4aa":"#94a3b8", background:a?"rgba(0,212,170,0.1)":"transparent", borderRadius:a?"0 10px 10px 0":0, margin:a?"2px 12px 2px 0":0, fontWeight:a?700:400, transition:"all 0.25s ease" }),
    adminNav:(a) => ({ display:"flex", alignItems:"center", gap:10, padding:"11px 20px", cursor:"pointer", fontSize:14, color:a?"#00d4aa":"rgba(255,255,255,0.5)", background:a?"rgba(0,212,170,0.12)":"transparent", borderRadius:a?"0 10px 10px 0":0, margin:a?"2px 12px 2px 0":0, fontWeight:a?700:400, transition:"all 0.25s ease" }),
    main:{ flex:1, padding:"24px 28px", overflowY:"auto" },
    title:{ fontSize:22, fontWeight:700, margin:"0 0 24px", color:"#e8edf5" },
    card:{ background:"rgba(16,24,44,0.75)", border:"1px solid rgba(148,163,184,0.12)", borderRadius:16, padding:"18px 22px", boxShadow:"0 4px 12px rgba(0,0,0,0.3)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", transition:"all 0.25s ease" },
    metric:{ background:"rgba(16,24,44,0.75)", borderRadius:14, padding:"16px 18px", textAlign:"center", border:"1px solid rgba(148,163,184,0.12)", backdropFilter:"blur(20px)", transition:"all 0.25s ease" },
    btn:(p) => ({ padding:"9px 20px", borderRadius:10, border:p?"none":"1px solid rgba(148,163,184,0.2)", background:p?"linear-gradient(135deg,#00d4aa,#00b894)":"rgba(16,24,44,0.6)", color:p?"#060a14":"#e8edf5", cursor:"pointer", fontSize:13.5, fontWeight:p?700:500, boxShadow:p?"0 2px 12px rgba(0,212,170,0.25)":"none", transition:"all 0.25s ease" }),
    input:{ width:"100%", padding:"10px 14px", border:"1px solid rgba(148,163,184,0.15)", borderRadius:10, fontSize:14, background:"rgba(12,18,34,0.6)", color:"#e8edf5", boxSizing:"border-box" },
    avatar:(size,color) => ({ width:size, height:size, borderRadius:"50%", background:color||"#00d4aa", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:size*0.35, color:"#060a14", flexShrink:0 }),
    tag:{ display:"inline-block", padding:"3px 10px", borderRadius:20, fontSize:12, background:"rgba(0,212,170,0.12)", color:"#00d4aa", fontWeight:600 },
    row:{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 14px", borderRadius:10, border:"1px solid rgba(148,163,184,0.12)", marginBottom:8, fontSize:14, background:"rgba(16,24,44,0.5)", transition:"all 0.25s ease" },
  };

  // hamburger button
  const HamburgerBtn = ({ dark }) => (
    <button onClick={() => setSidebarOpen(o => !o)}
      style={{ background:"transparent", border:"none", cursor:"pointer", padding:6, borderRadius:8, display:"flex", flexDirection:"column", gap:5, alignItems:"center", justifyContent:"center" }}>
      {[0,1,2].map(i => <span key={i} style={{ display:"block", width:22, height:2, background:dark?"rgba(255,255,255,0.7)":"#3d5af1", borderRadius:2 }}></span>)}
    </button>
  );

  // LOGIN
  if (screen==="login") return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#060a14", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"fixed", top:"-50%", left:"-50%", width:"200%", height:"200%", background:"radial-gradient(ellipse at 20% 50%, rgba(0,212,170,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(124,92,252,0.04) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.03) 0%, transparent 50%)", pointerEvents:"none", animation:"ambientShift 20s ease-in-out infinite alternate" }}></div>
      <style>{`@keyframes ambientShift { 0% { transform: translate(0,0) rotate(0deg); } 100% { transform: translate(-2%,-2%) rotate(3deg); } } @keyframes pageEnter { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } } @keyframes glowPulse { 0%,100% { box-shadow: 0 0 20px rgba(0,212,170,0.1); } 50% { box-shadow: 0 0 40px rgba(0,212,170,0.2); } }`}</style>
      <div style={{ width:420, background:"rgba(16,24,44,0.75)", borderRadius:20, border:"1px solid rgba(148,163,184,0.12)", padding:"40px 36px", boxShadow:"0 16px 50px rgba(0,0,0,0.5)", backdropFilter:"blur(20px)", animation:"pageEnter 0.5s ease forwards", position:"relative", zIndex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
          <div style={{ width:40, height:40, borderRadius:12, background:"linear-gradient(135deg,#00d4aa,#7c5cfc)", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:20 }}>🩺</span></div>
          <div><p style={{ fontSize:20, fontWeight:700, color:"#e8edf5", margin:0 }}>MedStudy Pro</p><p style={{ fontSize:12, color:"#94a3b8", margin:0 }}>Tıp Eğitim Platformu</p></div>
        </div>
        <div style={{ display:"flex", marginBottom:24, border:"1px solid rgba(148,163,184,0.15)", borderRadius:12, overflow:"hidden", background:"rgba(16,24,44,0.5)" }}>
          {["login","register"].map(m => <button key={m} onClick={() => { setAuthMode(m); setAuthError(""); }} style={{ flex:1, padding:10, border:"none", background:authMode===m?"#00d4aa":"transparent", color:authMode===m?"#060a14":"#94a3b8", cursor:"pointer", fontSize:14, fontWeight:authMode===m?700:500 }}>{m==="login"?"Giriş Yap":"Kayıt Ol"}</button>)}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {authMode==="register" && <input style={sinp} placeholder="Ad Soyad" value={authName} onChange={e => setAuthName(e.target.value)} />}
          <input style={sinp} placeholder="E-posta" type="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
          <input style={sinp} placeholder="Şifre" type="password" value={authPass} onChange={e => setAuthPass(e.target.value)} />
          {authMode==="register" && <>
            <select style={sinp} value={authYear} onChange={e => setAuthYear(e.target.value)}>{["1. Sınıf","2. Sınıf","3. Sınıf","4. Sınıf","5. Sınıf","6. Sınıf","Asistan"].map(y => <option key={y}>{y}</option>)}</select>
            <select style={sinp} value={authGroup} onChange={e => setAuthGroup(e.target.value)}>{GROUPS.map(g => <option key={g}>{g}</option>)}</select>
            <input style={sinp} placeholder="Üniversite (isteğe bağlı)" value={authUni} onChange={e => setAuthUni(e.target.value)} />
          </>}
          {authError && <p style={{ fontSize:13, color:"#ff5252", margin:0, padding:"8px 12px", background:"rgba(255,82,82,0.1)", borderRadius:8 }}>{authError}</p>}
          <button style={{ padding:11, borderRadius:12, border:"none", background:"linear-gradient(135deg,#00d4aa,#7c5cfc)", color:"#fff", cursor:"pointer", fontSize:15, fontWeight:700, boxShadow:"0 4px 14px rgba(0,212,170,0.25)", marginTop:4 }}
            onClick={() => {
              if (authMode==="login") {
                const f = users.find(u => u.email===authEmail&&u.password===authPass);
                if (!f) { setAuthError("E-posta veya şifre hatalı."); return; }
                setUser(f); setScreen("app");
              } else {
                if (!authName||!authEmail||!authPass) { setAuthError("Tüm alanları doldurun."); return; }
                if (users.find(u => u.email===authEmail)) { setAuthError("Bu e-posta zaten kayıtlı."); return; }
                const initials = authName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2);
                const ac = AVATAR_COLORS[Math.floor(Math.random()*AVATAR_COLORS.length)];
                const nu = { email:authEmail, password:authPass, name:authName, year:authYear, group:authGroup, university:authUni||"Belirtilmedi", avatar:initials, avatarColor:ac, role:"user" };
                setUsers(p => [...p,nu]); setUser(nu); setScreen("app");
              }
            }}>{authMode==="login"?"Giriş Yap":"Hesap Oluştur"}</button>
        </div>
        <div style={{ margin:"20px 0 0" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <div style={{ flex:1, height:1, background:"rgba(148,163,184,0.15)" }} /><span style={{ fontSize:12, color:"#64748b" }}>veya</span><div style={{ flex:1, height:1, background:"rgba(148,163,184,0.15)" }} />
          </div>
          <button style={{ width:"100%", padding:10, borderRadius:12, border:"1px solid rgba(148,163,184,0.15)", background:"rgba(12,18,34,0.4)", color:"#e8edf5", cursor:"pointer", fontSize:14, fontWeight:500, marginBottom:8 }}
            onClick={() => { setUser({ name:"Misafir", email:"__guest__", avatar:"M", avatarColor:"#6c7ff2", year:"Misafir", group:"", university:"—", password:"", role:"user" }); setScreen("app"); }}>
            Misafir olarak devam et
          </button>
          <button style={{ width:"100%", padding:10, borderRadius:12, border:"1px solid rgba(124,92,252,0.3)", background:"rgba(124,92,252,0.1)", color:"#7c5cfc", cursor:"pointer", fontSize:14, fontWeight:500 }}
            onClick={() => { setAdminPass(""); setAdminError(""); setScreen("admin_login"); }}>
            🔐 Admin Girişi
          </button>
          {authMode==="login" && <div style={{ marginTop:14, padding:"12px 14px", background:"rgba(16,24,44,0.5)", borderRadius:10, border:"1px solid rgba(148,163,184,0.15)" }}><p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 3px", fontWeight:600 }}>Demo hesap:</p><p style={{ fontSize:12, color:"#64748b", margin:0 }}>demo@medstudypro.com / demo123</p></div>}
        </div>
      </div>
    </div>
  );

  // ADMIN LOGIN
  if (screen==="admin_login") return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#060a14", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"fixed", top:"-50%", left:"-50%", width:"200%", height:"200%", background:"radial-gradient(ellipse at 20% 50%, rgba(0,212,170,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(124,92,252,0.04) 0%, transparent 50%)", pointerEvents:"none", animation:"ambientShift 20s ease-in-out infinite alternate" }}></div>
      <div style={{ width:380, background:"rgba(16,24,44,0.75)", borderRadius:20, border:"1px solid rgba(148,163,184,0.12)", padding:"44px 36px", backdropFilter:"blur(20px)", boxShadow:"0 16px 50px rgba(0,0,0,0.5)", animation:"pageEnter 0.5s ease forwards", position:"relative", zIndex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:32 }}>
          <div style={{ width:40, height:40, borderRadius:12, background:"linear-gradient(135deg,#00d4aa,#7c5cfc)", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:20 }}>🩺</span></div>
          <div><p style={{ fontSize:11, color:"#94a3b8", margin:"0 0 2px", letterSpacing:3, textTransform:"uppercase" }}>Admin Paneli</p><p style={{ fontSize:18, fontWeight:700, color:"#e8edf5", margin:0 }}>MedStudy Pro</p></div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div><p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 8px", fontWeight:500 }}>Şifre</p>
            <input type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)}
              onKeyDown={e => { if (e.key==="Enter") { if (adminPass===ADMIN_PASSWORD) { setScreen("admin"); setAdminPage("admin_dashboard"); setAdminError(""); } else setAdminError("Hatalı şifre."); } }}
              placeholder="••••••••" style={{ width:"100%", padding:"12px 16px", borderRadius:12, border:"1px solid rgba(148,163,184,0.15)", background:"rgba(12,18,34,0.6)", color:"#e8edf5", fontSize:15, boxSizing:"border-box", outline:"none" }} />
          </div>
          {adminError && <p style={{ fontSize:13, color:"#ff5252", margin:0, padding:"8px 12px", background:"rgba(255,82,82,0.1)", borderRadius:8 }}>{adminError}</p>}
          <button style={{ width:"100%", padding:12, borderRadius:12, border:"none", background:"linear-gradient(135deg,#00d4aa,#00b894)", color:"#060a14", cursor:"pointer", fontSize:15, fontWeight:700, marginTop:4, boxShadow:"0 2px 12px rgba(0,212,170,0.25)" }}
            onClick={() => { if (adminPass===ADMIN_PASSWORD) { setScreen("admin"); setAdminPage("admin_dashboard"); setAdminError(""); } else setAdminError("Hatalı şifre."); }}>Giriş Yap</button>
          <button style={{ background:"transparent", border:"none", color:"#64748b", cursor:"pointer", fontSize:13, padding:0, textAlign:"left" }} onClick={() => setScreen("login")}>Kullanıcı girişine dön</button>
        </div>
      </div>
    </div>
  );

  // ADMIN PANEL
  if (screen==="admin") {
    const totalTopics = subjects.reduce((a,sub) => a+sub.topics.length,0);
    return (
      <div style={{ ...s.app, position:"relative" }}>
        <div style={{ position:"fixed", top:"-50%", left:"-50%", width:"200%", height:"200%", background:"radial-gradient(ellipse at 20% 50%, rgba(0,212,170,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(124,92,252,0.04) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.03) 0%, transparent 50%)", pointerEvents:"none", zIndex:0, animation:"ambientShift 20s ease-in-out infinite alternate" }}></div>
        {sidebarOpen && <div style={s.overlay} onClick={() => setSidebarOpen(false)} />}
        <div style={s.adminSidebar}>
          <div style={{ padding:"18px 20px 14px", borderBottom:"1px solid rgba(148,163,184,0.12)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:10, background:"linear-gradient(135deg,#00d4aa,#7c5cfc)", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:16 }}>🩺</span></div>
              <div><p style={{ fontSize:11, color:"#94a3b8", margin:"0 0 1px", letterSpacing:2, textTransform:"uppercase" }}>Admin</p><p style={{ fontSize:14, fontWeight:700, color:"#e8edf5", margin:0 }}>MedStudy Pro</p></div>
            </div>
            <button onClick={() => setSidebarOpen(false)} style={{ background:"transparent", border:"none", color:"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:20, lineHeight:1, padding:4 }}>×</button>
          </div>
          <div style={{ paddingTop:8 }}>
            {ADMIN_NAV.map(n => <div key={n.id} style={s.adminNav(adminPage===n.id)} onClick={() => { setAdminPage(n.id); setSidebarOpen(false); }}><span>{n.icon}</span><span style={{ marginLeft:8 }}>{n.label}</span></div>)}
          </div>
          <div style={{ marginTop:"auto", padding:"12px 16px", borderTop:"1px solid rgba(255,255,255,0.1)" }}>
            <button onClick={() => setScreen("login")} style={{ width:"100%", padding:9, borderRadius:8, border:"1px solid rgba(255,255,255,0.15)", background:"transparent", color:"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:13 }}>Çıkış</button>
          </div>
        </div>
        <div style={s.topbar}>
          <HamburgerBtn dark />
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#00d4aa,#7c5cfc)", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:14 }}>🩺</span></div>
            <p style={{ fontSize:15, fontWeight:700, color:"#e8edf5", margin:0 }}>MedStudy Pro <span style={{ fontSize:11, color:"#64748b", fontWeight:400 }}>Admin</span></p>
          </div>
          <div style={{ marginLeft:"auto" }}>
            <button onClick={() => setScreen("login")} style={{ padding:"6px 14px", borderRadius:8, border:"1px solid rgba(148,163,184,0.15)", background:"transparent", color:"#94a3b8", cursor:"pointer", fontSize:13 }}>Çıkış</button>
          </div>
        </div>
        <div style={s.main}>
          {adminPage==="admin_dashboard" && (
            <>
              <p style={s.title}>Genel Bakış</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:28 }}>
                {[["Kullanıcı",users.length],["Ders",subjects.length],["Konu",totalTopics],["Soru",questions.length]].map(([l,v]) => (
                  <div key={l} style={s.metric}><p style={{ fontSize:28, fontWeight:800, margin:0, color:"#00d4aa" }}>{v}</p><p style={{ fontSize:12, color:"#94a3b8", margin:"4px 0 0" }}>{l}</p></div>
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                <div style={s.card}><p style={{ fontWeight:700, marginTop:0 }}>Dersler</p>{subjects.slice(0,8).map(sub => <div key={sub.id} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:"1px solid rgba(148,163,184,0.1)", fontSize:14 }}><div style={{ display:"flex", alignItems:"center", gap:8 }}><span style={{ width:10, height:10, borderRadius:"50%", background:sub.color, display:"inline-block" }}></span><span>{sub.name}</span></div><span style={s.tag}>{sub.sinif}</span></div>)}</div>
                <div style={s.card}><p style={{ fontWeight:700, marginTop:0 }}>Son Sorular</p>{questions.slice(-4).reverse().map(q => <div key={q.id} style={{ padding:"9px 0", borderBottom:"1px solid rgba(148,163,184,0.1)", fontSize:13 }}><span style={{ ...s.tag, marginRight:6, fontSize:11 }}>{q.topic}</span><span style={{ color:"#94a3b8" }}>{q.q.slice(0,50)}...</span></div>)}</div>
              </div>
              <div style={{ ...s.card, marginTop:16 }}>
                <p style={{ fontWeight:700, marginTop:0 }}>🤖 Yapay Zeka Motoru</p>
                <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 10px" }}>PDF'den özet, flashcard ve soru üretimi için yerleşik AI kullanılmaktadır. Harici API anahtarına gerek yoktur.</p>
                <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px", background:"rgba(0,212,170,0.08)", borderRadius:10, border:"1px solid rgba(0,212,170,0.2)" }}>
                  <span style={{ fontSize:16 }}>✓</span>
                  <span style={{ fontSize:13, color:"#00d4aa", fontWeight:600 }}>AI Motoru Aktif</span>
                </div>
              </div>
            </>
          )}
          {adminPage==="admin_subjects" && (
            <>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
                <p style={{ ...s.title, margin:0 }}>Konu ve Özetler</p>
                <button style={s.btn(true)} onClick={() => { setNewSubjectName(""); setNewSubjectColor("#00d4aa"); setNewSubjectSinif("1. Sınıf"); setEditingSubject("new"); }}>+ Yeni Ders</button>
              </div>
              {editingSubject==="new" && (
                <div style={{ ...s.card, marginBottom:16, border:"1px solid rgba(0,212,170,0.3)" }}>
                  <p style={{ fontWeight:700, marginTop:0 }}>Yeni Ders</p>
                  <div style={{ display:"flex", gap:12, marginBottom:12, flexWrap:"wrap" }}>
                    <input style={{ ...s.input, flex:2, minWidth:160 }} placeholder="Ders adı" value={newSubjectName} onChange={e => setNewSubjectName(e.target.value)} />
                    <select style={{ ...s.input, flex:1, minWidth:120 }} value={newSubjectSinif} onChange={e => setNewSubjectSinif(e.target.value)}>{SINIFLAR.map(y => <option key={y}>{y}</option>)}</select>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}><span style={{ fontSize:13, color:"#94a3b8" }}>Renk:</span><input type="color" value={newSubjectColor} onChange={e => setNewSubjectColor(e.target.value)} style={{ width:40, height:36, borderRadius:6, border:"1px solid rgba(148,163,184,0.15)", cursor:"pointer", padding:2 }} /></div>
                  </div>
                  <div style={{ display:"flex", gap:10 }}>
                    <button style={s.btn(true)} onClick={() => { if (!newSubjectName.trim()) return; setSubjects(p => [...p,{ id:Date.now(), name:newSubjectName.trim(), color:newSubjectColor, sinif:newSubjectSinif, topics:[] }]); setEditingSubject(null); }}>Kaydet</button>
                    <button style={s.btn(false)} onClick={() => setEditingSubject(null)}>İptal</button>
                  </div>
                </div>
              )}
              {SINIFLAR.map(sinif => {
                const sinifSubs = subjects.filter(sb => sb.sinif===sinif);
                if (sinifSubs.length===0) return null;
                return (
                  <div key={sinif} style={{ marginBottom:28 }}>
                    <p style={{ fontWeight:700, fontSize:16, color:"#00d4aa", margin:"0 0 12px", borderBottom:"1px solid rgba(0,212,170,0.2)", paddingBottom:8 }}>{sinif} <span style={{ fontSize:12, color:"#64748b", fontWeight:400 }}>({sinifSubs.length} ders)</span></p>
                    {sinifSubs.map(sub => (
                <div key={sub.id} style={{ ...s.card, marginBottom:16 }}>
                  {editingSubject===sub.id ? (
                    <div style={{ marginBottom:14 }}>
                      <p style={{ fontWeight:700, marginTop:0, fontSize:13, color:"#94a3b8" }}>Dersi Düzenle</p>
                      <div style={{ display:"flex", gap:12, marginBottom:12, flexWrap:"wrap" }}>
                        <input style={{ ...s.input, flex:2, minWidth:160 }} value={newSubjectName} onChange={e => setNewSubjectName(e.target.value)} placeholder="Ders adı" />
                        <select style={{ ...s.input, flex:1, minWidth:120 }} value={newSubjectSinif} onChange={e => setNewSubjectSinif(e.target.value)}>{SINIFLAR.map(y => <option key={y}>{y}</option>)}</select>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}><span style={{ fontSize:13, color:"#94a3b8" }}>Renk:</span><input type="color" value={newSubjectColor} onChange={e => setNewSubjectColor(e.target.value)} style={{ width:40, height:36, borderRadius:6, border:"1px solid rgba(148,163,184,0.15)", cursor:"pointer", padding:2 }} /></div>
                      </div>
                      <div style={{ display:"flex", gap:10 }}>
                        <button style={s.btn(true)} onClick={() => { if (!newSubjectName.trim()) return; setSubjects(p => p.map(x => x.id===sub.id?{ ...x, name:newSubjectName.trim(), sinif:newSubjectSinif, color:newSubjectColor }:x)); setEditingSubject(null); }}>Kaydet</button>
                        <button style={s.btn(false)} onClick={() => setEditingSubject(null)}>İptal</button>
                      </div>
                    </div>
                  ) : (
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}><span style={{ width:12, height:12, borderRadius:"50%", background:sub.color, display:"inline-block" }}></span><span style={{ fontWeight:700, fontSize:16 }}>{sub.name}</span><span style={s.tag}>{sub.sinif}</span></div>
                    <div style={{ display:"flex", gap:8 }}>
                      <button style={{ ...s.btn(false), fontSize:12, padding:"6px 12px" }} onClick={() => { setEditingSubject(sub.id); setNewSubjectName(sub.name); setNewSubjectSinif(sub.sinif); setNewSubjectColor(sub.color); }}>✏️ Düzenle</button>
                      <button style={{ ...s.btn(false), fontSize:12, padding:"6px 12px" }} onClick={() => { setNewTopicName(""); setNewTopicContent(""); setNewTopicSubjectId(sub.id); setEditingTopic("new"); }}>+ Konu Ekle</button>
                      <button onClick={() => setSubjects(p => p.filter(x => x.id!==sub.id))} style={{ padding:"6px 12px", borderRadius:8, border:"1px solid rgba(255,82,82,0.3)", background:"transparent", color:"#ff5252", cursor:"pointer", fontSize:12 }}>Sil</button>
                    </div>
                  </div>
                  )}
                  {editingTopic==="new" && newTopicSubjectId===sub.id && (
                    <div style={{ background:"rgba(12,18,34,0.4)", borderRadius:10, padding:14, marginBottom:12 }}>
                      <input style={{ ...s.input, marginBottom:10 }} placeholder="Konu başlığı" value={newTopicName} onChange={e => setNewTopicName(e.target.value)} />
                      <textarea value={newTopicContent} onChange={e => setNewTopicContent(e.target.value)} placeholder="Özet..." style={{ width:"100%", minHeight:100, padding:"10px 14px", border:"1px solid rgba(148,163,184,0.15)", borderRadius:8, fontSize:14, background:"rgba(16,24,44,0.6)", color:"#e8edf5", resize:"vertical", boxSizing:"border-box", fontFamily:"inherit" }} />
                      <div style={{ display:"flex", gap:10, marginTop:10 }}>
                        <button style={s.btn(true)} onClick={() => { if (!newTopicName.trim()) return; setSubjects(p => p.map(x => x.id===sub.id?{ ...x, topics:[...x.topics,{ id:Date.now(), name:newTopicName.trim(), content:newTopicContent }] }:x)); setEditingTopic(null); }}>Kaydet</button>
                        <button style={s.btn(false)} onClick={() => setEditingTopic(null)}>İptal</button>
                      </div>
                    </div>
                  )}
                  {sub.topics.length===0 ? <p style={{ fontSize:13, color:"#64748b", margin:0 }}>Konu yok.</p>
                    : sub.topics.map(t => (
                      <div key={t.id} style={{ ...s.row, flexDirection:"column", alignItems:"stretch" }}>
                        {editingTopic===t.id ? (
                          <div style={{ background:"rgba(12,18,34,0.4)", borderRadius:10, padding:14 }}>
                            <input style={{ ...s.input, marginBottom:10 }} value={newTopicName} onChange={e => setNewTopicName(e.target.value)} placeholder="Konu başlığı" />
                            <textarea value={newTopicContent} onChange={e => setNewTopicContent(e.target.value)} placeholder="Özet içeriği..." style={{ width:"100%", minHeight:140, padding:"10px 14px", border:"1px solid rgba(148,163,184,0.15)", borderRadius:8, fontSize:14, background:"rgba(16,24,44,0.6)", color:"#e8edf5", resize:"vertical", boxSizing:"border-box", fontFamily:"inherit", lineHeight:1.7 }} />
                            <div style={{ display:"flex", gap:10, marginTop:10 }}>
                              <button style={s.btn(true)} onClick={() => { if (!newTopicName.trim()) return; setSubjects(p => p.map(x => x.id===sub.id?{ ...x, topics:x.topics.map(tp => tp.id===t.id?{ ...tp, name:newTopicName.trim(), content:newTopicContent }:tp) }:x)); setEditingTopic(null); }}>Kaydet</button>
                              <button style={s.btn(false)} onClick={() => setEditingTopic(null)}>İptal</button>
                            </div>
                          </div>
                        ) : (
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                            <div style={{ flex:1, minWidth:0 }}><p style={{ margin:"0 0 2px", fontWeight:600, fontSize:14 }}>{t.name}</p><p style={{ margin:0, fontSize:12, color:"#94a3b8", maxWidth:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t.content}</p></div>
                            <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                              <button disabled={summaryLoading===t.id} onClick={() => { setSummaryTarget({ subId:sub.id, topicId:t.id }); setTimeout(() => summaryPdfRef.current?.click(), 50); }} style={{ padding:"5px 10px", borderRadius:6, border:"1px solid rgba(0,230,118,0.3)", background: summaryLoading===t.id ? "#f0fdf4" : "transparent", color:"#00e676", cursor:"pointer", fontSize:12, opacity: summaryLoading===t.id ? 0.6 : 1 }}>{summaryLoading===t.id ? "⏳ Özetleniyor..." : "📄 PDF'den Özet"}</button>
                              <button onClick={() => { setEditingTopic(t.id); setNewTopicName(t.name); setNewTopicContent(t.content); }} style={{ padding:"5px 10px", borderRadius:6, border:"1px solid rgba(0,212,170,0.3)", background:"transparent", color:"#00d4aa", cursor:"pointer", fontSize:12 }}>Düzenle</button>
                              <button onClick={() => setSubjects(p => p.map(x => x.id===sub.id?{ ...x, topics:x.topics.filter(tp => tp.id!==t.id) }:x))} style={{ padding:"5px 10px", borderRadius:6, border:"1px solid rgba(255,82,82,0.3)", background:"transparent", color:"#ff5252", cursor:"pointer", fontSize:12 }}>Sil</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ))}
                  </div>
                );
              })}
              <input ref={summaryPdfRef} type="file" accept=".pdf" style={{ display:"none" }} onChange={e => { const f=e.target.files[0]; if (f) handleSummaryPdf(f); e.target.value=""; }} />
            </>
          )}
          {adminPage==="admin_sources" && (
            <>
              <p style={s.title}>Kaynaklar</p>
              {subjects.map(sub => (
                <div key={sub.id} style={{ ...s.card, marginBottom:16 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                    <span style={{ width:12, height:12, borderRadius:"50%", background:sub.color, display:"inline-block" }}></span>
                    <span style={{ fontWeight:700, fontSize:16 }}>{sub.name}</span>
                    <span style={s.tag}>{sources.filter(src => src.subjectId===sub.id).length} kaynak</span>
                  </div>
                  {sub.topics.length===0 ? <p style={{ fontSize:13, color:"#64748b", margin:0 }}>Alt konu yok.</p>
                    : sub.topics.map(topic => {
                        const topicSources = sources.filter(src => src.subjectId===sub.id&&src.topicId===topic.id);
                        const isAdding = editingSource!==null&&editingSource.subjectId===sub.id&&editingSource.topicId===topic.id;
                        return (
                          <div key={topic.id} style={{ border:"1px solid rgba(148,163,184,0.12)", borderRadius:12, padding:"12px 16px", marginBottom:10 }}>
                            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:isAdding||topicSources.length>0?12:0 }}>
                              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                                <span style={{ fontWeight:600, fontSize:14 }}>{topic.name}</span>
                                {topicSources.length>0 && <span style={{ fontSize:11, padding:"2px 7px", borderRadius:8, background:"rgba(59,130,246,0.1)", color:"#40c4ff", fontWeight:600 }}>{topicSources.length} kaynak</span>}
                              </div>
                              <button style={{ ...s.btn(isAdding), fontSize:12, padding:"5px 12px" }}
                                onClick={() => { if (isAdding) { setEditingSource(null); } else { setNewSourceName(""); setNewSourceType("Kitap"); setNewSourceUrl(""); setEditingSource({ subjectId:sub.id, topicId:topic.id }); } }}>
                                {isAdding?"İptal":"+ Kaynak Ekle"}
                              </button>
                            </div>
                            {isAdding && (
                              <div style={{ background:"rgba(12,18,34,0.4)", borderRadius:10, padding:14, marginBottom:12, border:"1px solid rgba(148,163,184,0.15)" }}>
                                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                                  <div><p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 5px", fontWeight:600 }}>Kaynak Adı</p><input style={s.input} placeholder="örn. Gray's Anatomy" value={newSourceName} onChange={e => setNewSourceName(e.target.value)} /></div>
                                  <div><p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 5px", fontWeight:600 }}>Tür</p><select style={s.input} value={newSourceType} onChange={e => setNewSourceType(e.target.value)}>{["Kitap","Makale","Video","Web Sitesi","Diğer"].map(t => <option key={t}>{t}</option>)}</select></div>
                                  <div style={{ gridColumn:"1/-1" }}><p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 5px", fontWeight:600 }}>URL</p><input style={s.input} placeholder="https://..." value={newSourceUrl} onChange={e => setNewSourceUrl(e.target.value)} /></div>
                                </div>
                                <button style={s.btn(true)} onClick={() => { if (!newSourceName.trim()) return; setSources(p => [...p,{ id:Date.now(), name:newSourceName.trim(), type:newSourceType, subjectId:sub.id, topicId:topic.id, url:newSourceUrl, addedAt:new Date().toLocaleDateString("tr-TR") }]); setEditingSource(null); }}>Kaydet</button>
                              </div>
                            )}
                            {topicSources.map(src => (
                              <div key={src.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 10px", borderRadius:8, background:"rgba(12,18,34,0.4)", border:"1px solid rgba(148,163,184,0.12)", marginBottom:6 }}>
                                <div><span style={{ fontWeight:600, fontSize:13 }}>{src.name}</span><div style={{ display:"flex", gap:6, marginTop:3 }}><span style={{ ...s.tag, fontSize:11 }}>{src.type}</span>{src.url&&<a href={src.url} target="_blank" style={{ fontSize:12, color:"#00d4aa" }}>Bağlantı</a>}<span style={{ fontSize:11, color:"#64748b" }}>{src.addedAt}</span></div></div>
                                <button onClick={() => setSources(p => p.filter(x => x.id!==src.id))} style={{ padding:"4px 10px", borderRadius:6, border:"1px solid rgba(255,82,82,0.3)", background:"transparent", color:"#ff5252", cursor:"pointer", fontSize:12 }}>Sil</button>
                              </div>
                            ))}
                          </div>
                        );
                      })
                  }
                </div>
              ))}
            </>
          )}
          {adminPage==="admin_schedule" && <AdminSchedule schedules={schedules} setSchedules={setSchedules} practiceSchedules={practiceSchedules} setPracticeSchedules={setPracticeSchedules} sheetUrls={sheetUrls} setSheetUrls={setSheetUrls} s={s} />}
          {adminPage==="admin_questions" && <AdminQuestions subjects={subjects} questions={questions} setQuestions={setQuestions} s={s} />}
          {adminPage==="admin_exams" && (
            <>
              <p style={s.title}>Sınav Tarihleri</p>
              <p style={{ fontSize:13, color:"#94a3b8", marginBottom:20 }}>Her dersin Vize, Final ve BÜT tarihlerini girin.</p>
              {SINIFLAR.map(sinif => {
                const sinifSubs = subjects.filter(sb => sb.sinif===sinif);
                if (sinifSubs.length===0) return null;
                return (
                  <div key={sinif} style={{ marginBottom:24 }}>
                    <p style={{ fontWeight:700, fontSize:15, margin:"0 0 10px", color:"#00d4aa" }}>{sinif}</p>
                    <div style={s.card}>
                      {sinifSubs.map(sub => {
                        const vals = (examDates[sinif]||{})[sub.name] || {};
                        const setVal = (type, v) => setExamDates(prev => ({ ...prev, [sinif]:{ ...(prev[sinif]||{}), [sub.name]:{ ...((prev[sinif]||{})[sub.name]||{}), [type]:v } } }));
                        return (
                          <div key={sub.id} style={{ marginBottom:14, paddingBottom:14, borderBottom:"1px solid #f0f2f8" }}>
                            <p style={{ fontSize:13, fontWeight:700, margin:"0 0 8px", color:"#e8edf5" }}>{sub.name}</p>
                            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                              {[["vize","Vize","#3d5af1"],["final","Final","#059669"],["but","BÜT","#d97706"]].map(([key,label,col]) => (
                                <div key={key} style={{ display:"flex", alignItems:"center", gap:6 }}>
                                  <span style={{ fontSize:12, fontWeight:600, color:col, minWidth:36 }}>{label}</span>
                                  <input type="date" value={vals[key]||""} onChange={e => setVal(key, e.target.value)} style={{ padding:"6px 10px", border:"1px solid rgba(148,163,184,0.15)", borderRadius:8, fontSize:12, background:"rgba(12,18,34,0.4)" }} />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {adminPage==="admin_anatomy" && (
            <>
              <p style={s.title}>🦴 Zilli Sınav Yönetimi</p>
              <p style={{ fontSize:13, color:"#94a3b8", marginBottom:20 }}>Konu başlığı ekleyin, sınıf seviyesi belirleyin, fotoğraf yükleyip üzerine soru noktaları işaretleyin.</p>

              {/* Sınıf Filtreleme Sekmeleri */}
              <div style={{ display:"flex", gap:6, marginBottom:20, background:"rgba(16,24,44,0.6)", padding:5, borderRadius:12, width:"fit-content" }}>
                {["1. Sınıf","2. Sınıf"].map(sinif => (
                  <button key={sinif} onClick={() => setAnatAdminSinif(sinif)}
                    style={{ padding:"8px 18px", borderRadius:9, border:"none", cursor:"pointer", fontSize:13, fontWeight:anatAdminSinif===sinif?700:500, background:anatAdminSinif===sinif?"rgba(0,212,170,0.15)":"transparent", color:anatAdminSinif===sinif?"#00d4aa":"#94a3b8" }}>
                    {sinif}
                  </button>
                ))}
              </div>

              {/* Yeni Konu Başlığı Ekle */}
              <div style={{ ...s.card, marginBottom:20, border:"1px solid rgba(0,212,170,0.3)" }}>
                <p style={{ fontWeight:700, marginTop:0, fontSize:15 }}>+ Yeni Konu Başlığı Ekle <span style={{ fontSize:12, color:"#64748b", fontWeight:400 }}>({anatAdminSinif})</span></p>
                <div style={{ display:"flex", gap:12, alignItems:"flex-end" }}>
                  <div style={{ flex:1 }}>
                    <input style={s.input} placeholder="Konu adı (örn. Kemik, Kas, Eklem, Sinir Sistemi)" value={anatNewTopicName} onChange={e => setAnatNewTopicName(e.target.value)} />
                  </div>
                  <button style={s.btn(true)} onClick={() => {
                    if (!anatNewTopicName.trim()) { alert("Konu adı girin."); return; }
                    setAnatomyTopics(prev => [...prev, { id:Date.now(), name:anatNewTopicName.trim(), sinif:anatAdminSinif, images:[] }]);
                    setAnatNewTopicName("");
                  }}>Ekle</button>
                </div>
              </div>

              {/* Konu Listesi */}
              {anatomyTopics.filter(t => t.sinif===anatAdminSinif).length===0 && (
                <div style={{ ...s.card, textAlign:"center", padding:"40px 24px" }}>
                  <p style={{ fontSize:28, margin:"0 0 10px" }}>📂</p>
                  <p style={{ fontWeight:600, margin:"0 0 6px", color:"#94a3b8" }}>{anatAdminSinif} için henüz konu eklenmemiş</p>
                  <p style={{ fontSize:12, color:"#64748b", margin:0 }}>Yukarıdan bir konu başlığı ekleyin.</p>
                </div>
              )}

              {anatomyTopics.filter(t => t.sinif===anatAdminSinif).map(topic => {
                const totalQs = topic.images.reduce((sum, img) => sum + img.questions.length, 0);
                const isExpanded = anatExpandedTopic === topic.id;
                return (
                  <div key={topic.id} style={{ ...s.card, marginBottom:16 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:isExpanded?16:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", flex:1 }} onClick={() => setAnatExpandedTopic(isExpanded?null:topic.id)}>
                        <span style={{ fontSize:18, transition:"transform 0.2s", transform:isExpanded?"rotate(90deg)":"rotate(0deg)" }}>▶</span>
                        <span style={{ fontWeight:700, fontSize:16 }}>{topic.name}</span>
                        <span style={s.tag}>{totalQs} soru</span>
                        <span style={{ fontSize:11, padding:"2px 8px", borderRadius:8, background:"rgba(124,92,252,0.1)", color:"#a78bfa", fontWeight:600 }}>{topic.images.length} görsel</span>
                      </div>
                      <button onClick={() => { if(confirm("\""+topic.name+"\" konusunu silmek istediğinize emin misiniz?")) setAnatomyTopics(p => p.filter(x => x.id!==topic.id)); }} style={{ padding:"6px 12px", borderRadius:8, border:"1px solid rgba(255,82,82,0.3)", background:"transparent", color:"#ff5252", cursor:"pointer", fontSize:12 }}>Sil</button>
                    </div>

                    {isExpanded && (
                      <div>
                        {/* Fotoğraf Yükleme */}
                        <div style={{ background:"rgba(12,18,34,0.4)", borderRadius:12, padding:14, marginBottom:14, border:"1px dashed rgba(0,212,170,0.3)" }}>
                          <p style={{ fontSize:13, fontWeight:600, color:"#94a3b8", margin:"0 0 10px" }}>📷 Yeni Fotoğraf Yükle</p>
                          <input ref={anatImgRef} type="file" accept="image/*" style={{ fontSize:13, color:"#94a3b8" }}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                setAnatomyTopics(prev => prev.map(t => t.id===topic.id ? { ...t, images:[...t.images, { id:Date.now(), image:ev.target.result, questions:[] }] } : t));
                              };
                              reader.readAsDataURL(file);
                              e.target.value = "";
                            }}
                          />
                        </div>

                        {/* Yüklenen Görseller */}
                        {topic.images.map(img => (
                          <div key={img.id} style={{ border:"1px solid rgba(148,163,184,0.15)", borderRadius:12, padding:14, marginBottom:14, background:"rgba(16,24,44,0.5)" }}>
                            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                              <span style={{ fontSize:12, color:"#94a3b8", fontWeight:600 }}>{img.questions.length} soru işaretli</span>
                              <button onClick={() => setAnatomyTopics(prev => prev.map(t => t.id===topic.id ? { ...t, images:t.images.filter(im => im.id!==img.id) } : t))} style={{ padding:"4px 10px", borderRadius:6, border:"1px solid rgba(255,82,82,0.3)", background:"transparent", color:"#ff5252", cursor:"pointer", fontSize:11 }}>Görseli Sil</button>
                            </div>
                            <div style={{ position:"relative", cursor:"crosshair" }}>
                              <img src={img.image} style={{ width:"100%", display:"block", borderRadius:10, background:"rgba(16,24,44,0.6)" }}
                                onClick={(e) => {
                                  const rect = e.target.getBoundingClientRect();
                                  const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                                  const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
                                  setAnatPendingPin({ topicId:topic.id, imgId:img.id, x, y });
                                  setAnatPinLabel(""); setAnatPinAnswer("");
                                }}
                              />
                              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none" }}>
                                {img.questions.map(q => (
                                  <g key={q.id}>
                                    <circle cx={q.x} cy={q.y} r="3" fill="#00d4aa" opacity="0.8"/>
                                    <text x={q.x} y={q.y+0.5} textAnchor="middle" dominantBaseline="middle" fontSize="2.5" fill="#060a14" fontWeight="bold">{q.label}</text>
                                  </g>
                                ))}
                                {anatPendingPin && anatPendingPin.topicId===topic.id && anatPendingPin.imgId===img.id && (
                                  <circle cx={anatPendingPin.x} cy={anatPendingPin.y} r="3" fill="#ffb03a" opacity="0.9">
                                    <animate attributeName="r" from="2" to="5" dur="1s" repeatCount="indefinite"/>
                                  </circle>
                                )}
                              </svg>
                              <p style={{ fontSize:11, color:"#64748b", margin:"8px 0 0" }}>📌 Fotoğrafa tıklayarak soru noktası ekleyin</p>
                            </div>
                            {anatPendingPin && anatPendingPin.topicId===topic.id && anatPendingPin.imgId===img.id && (
                              <div style={{ background:"rgba(0,212,170,0.08)", border:"1px solid rgba(0,212,170,0.3)", borderRadius:12, padding:14, marginTop:10 }}>
                                <p style={{ fontSize:13, fontWeight:700, color:"#00d4aa", margin:"0 0 10px" }}>📍 Pin Ekleniyor ({anatPendingPin.x}%, {anatPendingPin.y}%)</p>
                                <div style={{ display:"flex", gap:10, marginBottom:10 }}>
                                  <input style={{ ...s.input, flex:"0 0 80px" }} placeholder="Etiket (A, B...)" value={anatPinLabel} onChange={e => setAnatPinLabel(e.target.value)} />
                                  <input style={{ ...s.input, flex:1 }} placeholder="Doğru cevap (yapı adı)" value={anatPinAnswer} onChange={e => setAnatPinAnswer(e.target.value)} />
                                </div>
                                <div style={{ display:"flex", gap:8 }}>
                                  <button style={s.btn(true)} onClick={() => {
                                    if (!anatPinLabel.trim()||!anatPinAnswer.trim()) return;
                                    setAnatomyTopics(prev => prev.map(t => t.id===topic.id ? {
                                      ...t, images:t.images.map(im => im.id===img.id ? {
                                        ...im, questions:[...im.questions, { id:Date.now(), label:anatPinLabel.trim(), answer:anatPinAnswer.trim(), x:anatPendingPin.x, y:anatPendingPin.y }]
                                      } : im)
                                    } : t));
                                    setAnatPendingPin(null);
                                  }}>Kaydet</button>
                                  <button style={s.btn(false)} onClick={() => setAnatPendingPin(null)}>İptal</button>
                                </div>
                              </div>
                            )}
                            {/* Soru Listesi */}
                            {img.questions.length>0 && (
                              <div style={{ marginTop:10 }}>
                                {img.questions.map(q => (
                                  <div key={q.id} style={{ ...s.row, marginBottom:4, padding:"8px 12px" }}>
                                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                                      <span style={{ fontWeight:700, color:"#00d4aa", minWidth:24 }}>{q.label}</span>
                                      <span style={{ fontSize:13 }}>{q.answer}</span>
                                      <span style={{ fontSize:11, color:"#64748b" }}>({q.x}%, {q.y}%)</span>
                                    </div>
                                    <button onClick={() => setAnatomyTopics(prev => prev.map(t => t.id===topic.id ? { ...t, images:t.images.map(im => im.id===img.id ? { ...im, questions:im.questions.filter(qq => qq.id!==q.id) } : im) } : t))} style={{ padding:"4px 10px", borderRadius:6, border:"1px solid rgba(255,82,82,0.3)", background:"transparent", color:"#ff5252", cursor:"pointer", fontSize:12 }}>Sil</button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        {topic.images.length===0 && <p style={{ fontSize:13, color:"#64748b", margin:"8px 0 0", textAlign:"center" }}>Henüz fotoğraf yüklenmemiş.</p>}
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
          {adminPage==="admin_users" && (
            <>
              <p style={s.title}>Kullanıcılar</p>
              <div style={{ ...s.card, marginBottom:16 }}><p style={{ fontSize:13, color:"#94a3b8", margin:0 }}>Toplam <strong>{users.length}</strong> kullanıcı</p></div>
              {users.map(u => (
                <div key={u.email} style={s.row}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={s.avatar(38,u.avatarColor)}><span>{u.avatar}</span></div>
                    <div><p style={{ margin:"0 0 2px", fontWeight:600 }}>{u.name}</p><p style={{ margin:0, fontSize:12, color:"#94a3b8" }}>{u.email} · {u.year}</p></div>
                  </div>
                  <div style={{ display:"flex", gap:8 }}><span style={s.tag}>{u.role||"user"}</span><button onClick={() => setUsers(p => p.filter(x => x.email!==u.email))} style={{ padding:"5px 10px", borderRadius:6, border:"1px solid rgba(255,82,82,0.3)", background:"transparent", color:"#ff5252", cursor:"pointer", fontSize:12 }}>Sil</button></div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }

  // MAIN APP
  async function handleUpload(file) {
    if (!file) return;
    if (file.size > 30 * 1024 * 1024) { setAiResult({ error: "Dosya boyutu 30 MB'ı aşamaz." }); return; }
    setUploadedFile(file.name); setAiLoading(true); setAiResult(null); setAiProgress("PDF sayfaları okunuyor...");
    try {
      const images = await pdfToImages(file, 8);
      setAiProgress("AI içerik üretiyor... (bu 1-2 dk sürebilir)");
      const imgParts = images.map(img => ({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: img } }));

      const aiText = await callAI([...imgParts, { type: "text", text: 'Bu PDF sayfalarını analiz et. Türkçe olarak aşağıdaki 3 bölümü üret.\n\nBölüm ayracı olarak ---BOLUM--- kullan.\n\n1. BÖLÜM - ÖZET:\nKapsamlı bir özet yaz. Mekanizmaları, tanı kriterlerini, önemli değerleri dahil et. Alt başlıklarla organize et.\n\n---BOLUM---\n\n2. BÖLÜM - FLASHCARD:\nÖnemli kavramlardan en az 5 flashcard üret.\nSADECE JSON array döndür: [{"q":"soru","a":"cevap"}]\n\n---BOLUM---\n\n3. BÖLÜM - TEST:\nÇoktan seçmeli en az 5 soru üret.\nSADECE JSON array döndür: [{"q":"soru","opts":["A","B","C","D"],"ans":0}]\nans: doğru şıkkın indexi (0=A,1=B,2=C,3=D)' }]);

      setAiProgress("Sonuçlar derleniyor...");
      const sections = aiText.split(/---BOLUM---/i).map(s => s.trim());

      const summary = (sections[0] || "Özet oluşturulamadı.").replace(/```[a-z]*\s*/gi,"").replace(/```/g,"").trim();

      let flashcards = [];
      try {
        const fcRaw = (sections[1] || "").replace(/```[a-z]*\s*/gi,"").replace(/```/g,"").trim();
        const fcMatch = fcRaw.match(/\[[\s\S]*\]/);
        if (fcMatch) flashcards = JSON.parse(fcMatch[0]);
      } catch(e) {}

      let qs = [];
      try {
        const qRaw = (sections[2] || "").replace(/```[a-z]*\s*/gi,"").replace(/```/g,"").trim();
        const qMatch = qRaw.match(/\[[\s\S]*\]/);
        if (qMatch) qs = JSON.parse(qMatch[0]);
      } catch(e) {}

      setAiResult({ summary, flashcards, questions: qs, pageCount: images.length });
      updateStats({ topics:(stats.topics||0)+1 });
    } catch(e) { setAiResult({ error:"PDF işlenirken hata: " + (e.message||"Bilinmeyen hata") }); }
    setAiLoading(false); setAiProgress("");
  }

  const userSinif = SINIFLAR.includes(user.year) ? user.year : null;
  const visibleSubjects = userSinif ? subjects.filter(sub => sub.sinif===userSinif) : subjects;

  function renderSummaries() {
    if (!selectedSubject) return (
      <>
        <p style={s.title}>Konular</p>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:20, background:"rgba(0,212,170,0.1)", marginBottom:20 }}>
          <span style={{ fontSize:13, color:"#00d4aa", fontWeight:700 }}>{userSinif||"Tüm Sınıflar"}</span>
          <span style={{ fontSize:12, color:"#94a3b8" }}>müfredatı</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
          {visibleSubjects.map(sub => (
            <div key={sub.id} style={{ ...s.card, cursor:"pointer" }} onClick={() => setSelectedSubject(sub)}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <span style={{ width:12, height:12, borderRadius:"50%", background:sub.color, display:"inline-block", flexShrink:0 }}></span>
                <span style={{ fontWeight:700, fontSize:15 }}>{sub.name}</span>
              </div>
              <p style={{ fontSize:13, color:"#94a3b8", margin:"0 0 10px" }}>{sub.topics.length} alt konu</p>
              <div>{sub.topics.slice(0,4).map(t => <span key={t.id} style={{ ...s.tag, marginRight:5, marginBottom:4, fontSize:11 }}>{t.name}</span>)}</div>
            </div>
          ))}
          {visibleSubjects.length===0 && <div style={{ gridColumn:"1/-1", ...s.card, textAlign:"center", padding:32 }}><p style={{ color:"#64748b", margin:0 }}>Bu sınıf için henüz konu eklenmemiş.</p></div>}
        </div>
      </>
    );
    if (!selectedTopic) return (
      <>
        <p style={s.title}>Konular</p>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
          <button style={s.btn(false)} onClick={() => setSelectedSubject(null)}>Geri</button>
          <div><p style={{ fontWeight:700, fontSize:18, margin:0 }}>{selectedSubject.name}</p>{selectedSubject.sinif&&<span style={{ fontSize:12, color:"#94a3b8" }}>{selectedSubject.sinif}</span>}</div>
        </div>
        {selectedSubject.topics.length===0
          ? <div style={{ ...s.card, textAlign:"center", padding:32 }}><p style={{ color:"#64748b" }}>Henüz alt konu eklenmemiş.</p></div>
          : <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {selectedSubject.topics.map(t => {
                const fcCount = (FLASHCARDS_DB[selectedSubject.name+"|"+t.name]||[]).length;
                const qCount = questions.filter(q => q.subject===selectedSubject.name&&q.topic===t.name).length;
                const srcCount = sources.filter(src => src.subjectId===selectedSubject.id&&src.topicId===t.id).length;
                return (
                  <div key={t.id} style={{ ...s.card, cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}
                    onClick={() => { setSelectedTopic(t); setTopicTab("ozet"); setTopicAnswers({}); setTopicSubmitted(false); setTopicFcIdx(0); setTopicFcFlipped(false); }}>
                    <span style={{ fontWeight:600, fontSize:14 }}>{t.name}</span>
                    <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                      {fcCount>0 && <span style={{ fontSize:11, padding:"2px 8px", borderRadius:8, background:"rgba(255,176,58,0.1)", color:"#ffb03a", fontWeight:700 }}>{fcCount} kart</span>}
                      {qCount>0 && <span style={{ fontSize:11, padding:"2px 8px", borderRadius:8, background:"rgba(0,212,170,0.1)", color:"#00d4aa", fontWeight:700 }}>{qCount} soru</span>}
                      {srcCount>0 && <span style={{ fontSize:11, padding:"2px 8px", borderRadius:8, background:"rgba(59,130,246,0.1)", color:"#40c4ff", fontWeight:700 }}>{srcCount} kaynak</span>}
                      <span style={{ color:"#64748b", fontSize:16 }}>→</span>
                    </div>
                  </div>
                );
              })}
            </div>
        }
      </>
    );
    const fcKey = selectedSubject.name+"|"+selectedTopic.name;
    const topicFCs = FLASHCARDS_DB[fcKey]||[];
    const topicQsAll = questions.filter(q => q.subject===selectedSubject.name&&q.topic===selectedTopic.name);
    const topicQsGecmis = topicQsAll.filter(q => q.source==="gecmis");
    const topicQsAI = topicQsAll.filter(q => q.source!=="gecmis");
    const topicQs = topicTab==="test" ? (topicTestTab==="gecmis" ? topicQsGecmis : topicQsAI) : topicQsAll;
    const topicSources = sources.filter(src => src.subjectId===selectedSubject.id && src.topicId===selectedTopic.id);
    const score = topicSubmitted ? Object.entries(topicAnswers).filter(([i,a]) => topicQs[Number(i)]&&topicQs[Number(i)].ans===a).length : 0;
    return (
      <>
        <p style={s.title}>Konular</p>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
          <button style={s.btn(false)} onClick={() => setSelectedTopic(null)}>Geri</button>
          <div><p style={{ fontWeight:700, fontSize:18, margin:0 }}>{selectedTopic.name}</p><span style={{ fontSize:12, color:"#94a3b8" }}>{selectedSubject.name}</span></div>
        </div>
        <div style={{ display:"flex", gap:6, marginBottom:20, background:"rgba(16,24,44,0.6)", padding:5, borderRadius:12, width:"fit-content", flexWrap:"wrap" }}>
          {[["ozet","Özet"],["flashcard","Flashcard"+(topicFCs.length?" ("+topicFCs.length+")":"")],["test","Test"+(topicQsAll.length?" ("+topicQsAll.length+")":"")],["kaynaklar","Kaynaklar"+(topicSources.length?" ("+topicSources.length+")":"")]].map(([id,label]) => (
            <button key={id} onClick={() => { setTopicTab(id); setTopicAnswers({}); setTopicSubmitted(false); setTopicFcIdx(0); setTopicFcFlipped(false); }}
              style={{ padding:"8px 18px", borderRadius:9, border:"none", cursor:"pointer", fontSize:13, fontWeight:topicTab===id?700:500, background:topicTab===id?"rgba(0,212,170,0.15)":"transparent", color:topicTab===id?"#00d4aa":"#94a3b8", boxShadow:topicTab===id?"0 0 12px rgba(0,212,170,0.15)":"none" }}>
              {label}
            </button>
          ))}
        </div>
        {topicTab==="ozet" && <div style={s.card}><p style={{ fontSize:14, lineHeight:1.8, color:"#94a3b8", margin:0 }}>{selectedTopic.content||"Henüz özet eklenmemiş."}</p></div>}
        {topicTab==="kaynaklar" && (
          topicSources.length===0
            ? <div style={{ ...s.card, textAlign:"center", padding:40 }}><p style={{ fontSize:28, margin:"0 0 8px" }}>📁</p><p style={{ color:"#64748b", margin:0 }}>Bu konu için henüz kaynak eklenmemiş.</p></div>
            : <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {topicSources.map(src => (
                  <div key={src.id} style={{ ...s.card, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                        <span style={{ fontSize:18 }}>{src.type==="Kitap"?"📖":src.type==="Video"?"🎬":src.type==="Makale"?"📄":src.type==="Web Sitesi"?"🌐":"📁"}</span>
                        <span style={{ fontWeight:700, fontSize:15 }}>{src.name}</span>
                        <span style={{ ...s.tag, fontSize:11 }}>{src.type}</span>
                      </div>
                      {src.url && <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ fontSize:13, color:"#00d4aa", wordBreak:"break-all" }}>{src.url}</a>}
                      <p style={{ fontSize:11, color:"#64748b", margin:"6px 0 0" }}>Eklenme: {src.addedAt}</p>
                    </div>
                    {src.url && <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ ...s.btn(true), textDecoration:"none", fontSize:13, padding:"10px 20px", flexShrink:0, marginLeft:12 }}>Aç →</a>}
                  </div>
                ))}
              </div>
        )}
        {topicTab==="flashcard" && (topicFCs.length===0
          ? <div style={{ ...s.card, textAlign:"center", padding:40 }}><p style={{ color:"#64748b" }}>Henüz flashcard yok.</p></div>
          : <div style={s.card}>
              <p style={{ fontSize:13, color:"#94a3b8", marginTop:0, textAlign:"center" }}>{topicFcIdx+1} / {topicFCs.length}</p>
              <div onClick={() => { setTopicFcFlipped(!topicFcFlipped); if (!topicFcFlipped) updateStats({ cards:(stats.cards||0)+1 }); }}
                style={{ border:"1.5px solid "+(topicFcFlipped?"#a5b4fc":"rgba(148,163,184,0.15)"), borderRadius:14, padding:"36px 28px", cursor:"pointer", minHeight:150, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:topicFcFlipped?"rgba(0,212,170,0.1)":"rgba(12,18,34,0.4)", marginBottom:14 }}>
                <span style={{ fontSize:11, fontWeight:700, color:topicFcFlipped?"#3d5af1":"#9ca3af", letterSpacing:1, marginBottom:12, textTransform:"uppercase" }}>{topicFcFlipped?"CEVAP":"SORU"}</span>
                <p style={{ fontSize:16, lineHeight:1.7, margin:0, color:"#e8edf5", textAlign:"center", maxWidth:520 }}>{topicFcFlipped?topicFCs[topicFcIdx].a:topicFCs[topicFcIdx].q}</p>
              </div>
              <p style={{ fontSize:12, color:"#64748b", textAlign:"center", margin:"0 0 16px" }}>Kartı çevirmek için tıkla</p>
              <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
                <button style={s.btn(false)} disabled={topicFcIdx===0} onClick={() => { setTopicFcIdx(topicFcIdx-1); setTopicFcFlipped(false); }}>Önceki</button>
                <button style={s.btn(true)} disabled={topicFcIdx===topicFCs.length-1} onClick={() => { setTopicFcIdx(topicFcIdx+1); setTopicFcFlipped(false); }}>Sonraki</button>
              </div>
            </div>
        )}
        {topicTab==="test" && (
          <div>
            {/* Alt sekmeler */}
            <div style={{ display:"flex", gap:8, marginBottom:16 }}>
              {[["gecmis","Çıkmış Sorular",topicQsGecmis.length],["ai","Yapay Zeka Soruları",topicQsAI.length]].map(([id,label,count]) => (
                <button key={id}
                  onClick={() => { setTopicTestTab(id); setTopicAnswers({}); setTopicSubmitted(false); }}
                  style={{ padding:"9px 18px", borderRadius:10, border:topicTestTab===id?"none":"1px solid rgba(148,163,184,0.15)", background:topicTestTab===id?"#3d5af1":"#fff", color:topicTestTab===id?"#fff":"#6b7280", cursor:"pointer", fontSize:13, fontWeight:topicTestTab===id?700:500, boxShadow:topicTestTab===id?"0 2px 8px rgba(0,212,170,0.2)":"none" }}>
                  {label} {count>0 && <span style={{ marginLeft:4, fontSize:11, padding:"1px 6px", borderRadius:10, background:topicTestTab===id?"rgba(255,255,255,0.25)":"rgba(0,212,170,0.1)", color:topicTestTab===id?"#fff":"#3d5af1" }}>{count}</span>}
                </button>
              ))}
            </div>
            {topicQs.length===0
              ? <div style={{ ...s.card, textAlign:"center", padding:40 }}>
                  <p style={{ fontSize:28, margin:"0 0 8px" }}>{topicTestTab==="gecmis"?"📄":"🤖"}</p>
                  <p style={{ color:"#64748b", margin:0, fontWeight:500 }}>{topicTestTab==="gecmis"?"Bu konu için henüz çıkmış soru yüklenmemiş.":"Bu konu için henüz yapay zeka sorusu eklenmemiş."}</p>
                </div>
              : <div style={s.card}>
                  {topicQs.map((q,i) => (
                    <div key={q.id} style={{ marginBottom:26 }}>
                      <p style={{ fontWeight:700, marginBottom:12, fontSize:14 }}>{i+1}. {q.q}</p>
                      {q.opts.map((o,j) => {
                        let bg="rgba(12,18,34,0.4)",col="#374151",border="1px solid rgba(148,163,184,0.15)";
                        if (topicSubmitted) { if(j===q.ans){bg="#f0fdf4";col="#16a34a";border="1px solid #86efac";}else if(topicAnswers[i]===j){bg="#fef2f2";col="#dc2626";border="1px solid #fca5a5";} }
                        else if(topicAnswers[i]===j){bg="rgba(0,212,170,0.1)";col="#3d5af1";border="1px solid #a5b4fc";}
                        return <div key={j} onClick={() => { if(!topicSubmitted) setTopicAnswers(p => ({ ...p,[i]:j })); }} style={{ padding:"11px 16px", borderRadius:10, marginBottom:8, cursor:topicSubmitted?"default":"pointer", background:bg, color:col, border, fontSize:14, fontWeight:topicAnswers[i]===j||(topicSubmitted&&j===q.ans)?700:400 }}><span style={{ fontWeight:700, marginRight:8 }}>{["A","B","C","D"][j]}.</span>{o}</div>;
                      })}
                    </div>
                  ))}
                  {!topicSubmitted
                    ? <button style={{ ...s.btn(true), width:"100%" }} onClick={() => { setTopicSubmitted(true); const sc=Object.entries(topicAnswers).filter(([i,a]) => topicQs[Number(i)]&&topicQs[Number(i)].ans===a).length; updateStats({ testCount:(stats.testCount||0)+1, testScore:(stats.testScore||0)+Math.round(sc/topicQs.length*100) }); }}>Testi Tamamla</button>
                    : <div style={{ padding:22, background:score/topicQs.length>=0.7?"#f0fdf4":"#fef9ec", borderRadius:14, border:"1px solid "+(score/topicQs.length>=0.7?"#86efac":"#fcd34d"), textAlign:"center" }}>
                        <p style={{ fontSize:32, fontWeight:800, margin:"0 0 4px", color:score/topicQs.length>=0.7?"#16a34a":"#d97706" }}>{"%" + Math.round(score/topicQs.length*100)}</p>
                        <p style={{ fontSize:14, color:"#94a3b8", margin:"0 0 16px" }}>{score} / {topicQs.length} doğru</p>
                        <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
                          <button style={s.btn(false)} onClick={() => { setTopicAnswers({}); setTopicSubmitted(false); }}>Tekrar Çöz</button>
                          <button style={s.btn(true)} onClick={() => { setTopicTab("ozet"); setTopicAnswers({}); setTopicSubmitted(false); }}>Özete Dön</button>
                        </div>
                      </div>
                  }
                </div>
            }
          </div>
        )}
      </>
    );
  }

  return (
    <div style={{ ...s.app, position:"relative" }}>
      <div style={{ position:"fixed", top:"-50%", left:"-50%", width:"200%", height:"200%", background:"radial-gradient(ellipse at 20% 50%, rgba(0,212,170,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(124,92,252,0.04) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.03) 0%, transparent 50%)", pointerEvents:"none", zIndex:0, animation:"ambientShift 20s ease-in-out infinite alternate" }}></div>
      {sidebarOpen && <div style={s.overlay} onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <div style={s.sidebar}>
        <div style={{ padding:"18px 20px 14px", borderBottom:"1px solid rgba(148,163,184,0.12)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:10, background:"linear-gradient(135deg,#00d4aa,#7c5cfc)", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:16 }}>🩺</span></div>
            <div><p style={{ fontSize:15, fontWeight:700, color:"#e8edf5", margin:0 }}>MedStudy Pro</p><p style={{ fontSize:10, color:"#94a3b8", margin:0 }}>Tıp Eğitim Platformu</p></div>
          </div>
          <button onClick={() => setSidebarOpen(false)} style={{ background:"transparent", border:"none", color:"#94a3b8", cursor:"pointer", fontSize:20, lineHeight:1, padding:4 }}>×</button>
        </div>
        <div style={{ padding:"12px 16px 8px", borderBottom:"1px solid rgba(148,163,184,0.12)", display:"flex", alignItems:"center", gap:10 }}>
          <div style={s.avatar(36,user.avatarColor)}><span>{user.avatar}</span></div>
          <div style={{ overflow:"hidden" }}>
            <p style={{ fontSize:13, fontWeight:600, margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", color:"#e8edf5" }}>{user.name}</p>
            <p style={{ fontSize:11, color:"#94a3b8", margin:0 }}>{user.year}{user.group ? ` · ${user.group}` : ""}</p>
          </div>
        </div>
        <div style={{ paddingTop:8, flex:1, overflowY:"auto" }}>
          {NAV.map(n => (
            <div key={n.id} style={s.nav(page===n.id)} onClick={() => { setPage(n.id); setSelectedSubject(null); setSelectedTopic(null); if (n.id==="mydecks"){ setDeckView("list"); setActiveDeckIdx(null); } setSidebarOpen(false); }}>
              <span style={{ fontSize:16 }}>{n.icon}</span><span style={{ marginLeft:4 }}>{n.label}</span>
            </div>
          ))}
        </div>
        <div style={{ padding:"12px 16px", borderTop:"1px solid rgba(148,163,184,0.12)" }}>
          <button onClick={() => { setUser(null); setScreen("login"); setSidebarOpen(false); }} style={{ ...s.btn(false), width:"100%", fontSize:13, color:"#ff5252", borderColor:"rgba(255,82,82,0.3)", background:"rgba(255,82,82,0.1)" }}>Çıkış Yap</button>
        </div>
      </div>

      {/* Topbar */}
      <div style={s.topbar}>
        <button onClick={() => setSidebarOpen(o => !o)}
          style={{ background:"transparent", border:"none", cursor:"pointer", padding:6, borderRadius:8, display:"flex", flexDirection:"column", gap:5, alignItems:"center", justifyContent:"center" }}>
          {[0,1,2].map(i => <span key={i} style={{ display:"block", width:22, height:2, background:"#00d4aa", borderRadius:2 }}></span>)}
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#00d4aa,#7c5cfc)", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:14 }}>🩺</span></div>
          <p style={{ fontSize:15, fontWeight:700, color:"#e8edf5", margin:0 }}>MedStudy Pro</p>
        </div>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8 }}>
          <div style={s.avatar(32,user.avatarColor)}><span style={{ fontSize:12 }}>{user.avatar}</span></div>
          <div>
            <p style={{ fontSize:13, fontWeight:600, color:"#e8edf5", margin:0, lineHeight:1.2 }}>{user.name}</p>
            <p style={{ fontSize:11, color:"#64748b", margin:0 }}>{user.year}{user.group ? ` · ${user.group}` : ""}</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div ref={mainRef} style={s.main}>
        {page==="dashboard" && (
          <>
            <p style={s.title}>Hoş geldin, {user.name.split(" ")[0]} 👋</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
              {[["Çalışılan Kart",stats.cards||0],["Ort. Test Skoru",stats.testCount?"%"+Math.round(stats.testScore/stats.testCount):"—"],["Kendi Destem",decks.length],["Günlük Seri",(stats.streak||1)+" gün"]].map(([l,v]) => (
                <div key={l} style={s.metric}><p style={{ fontSize:26, fontWeight:800, margin:0, color:"#00d4aa" }}>{v}</p><p style={{ fontSize:12, color:"#94a3b8", margin:"4px 0 0", fontWeight:500 }}>{l}</p></div>
              ))}
            </div>
            {(() => {
              const grid = schedules[userSinif||""] || null;
              const practice = practiceSchedules[userSinif||""] || [];
              const userGroup = user.group || "";
              const today = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"][new Date().getDay()];

              // Build a lookup from practice schedule for this user's group
              // Practice entries have flexible column names - try to match common patterns
              function findPracticeMatch(day, hour) {
                if (!practice.length || !userGroup) return null;
                const keys = Object.keys(practice[0]||{});
                const dayKey = keys.find(k => k.toLowerCase().includes("gün") || k.toLowerCase().includes("gun") || k.toLowerCase() === "day");
                const hourKey = keys.find(k => k.toLowerCase().includes("saat") || k.toLowerCase().includes("hour") || k.toLowerCase() === "time");
                const groupKey = keys.find(k => k.toLowerCase().includes("grup") || k.toLowerCase().includes("group"));
                const nameKey = keys.find(k => k.toLowerCase().includes("ders") || k.toLowerCase().includes("uygulama") || k.toLowerCase().includes("ad") || k.toLowerCase().includes("name") || k.toLowerCase().includes("konu"));
                if (!groupKey) return null;

                return practice.find(entry => {
                  const eGroup = entry[groupKey]?.trim();
                  if (!eGroup || !eGroup.toLowerCase().includes(userGroup.toLowerCase().replace("grup ","").trim())) {
                    if (eGroup?.toLowerCase() !== userGroup.toLowerCase()) return false;
                  }
                  // Match day if available
                  if (dayKey && entry[dayKey]) {
                    const eDay = entry[dayKey].trim().toLowerCase();
                    if (!day.toLowerCase().startsWith(eDay.slice(0,3)) && !eDay.startsWith(day.toLowerCase().slice(0,3))) return false;
                  }
                  // Match hour if available
                  if (hourKey && entry[hourKey]) {
                    const eHour = entry[hourKey].trim();
                    if (!hour.startsWith(eHour.slice(0,5)) && !eHour.startsWith(hour.slice(0,5))) return false;
                  }
                  return true;
                }) || null;
              }

              function getCellContent(day, hour) {
                const val = grid?.[hour]?.[day] || "";
                if (!val) return { text:"", isUygulama:false, isPracticeMatch:false };
                const isUygulama = val.toLowerCase().includes("uygulama");
                if (isUygulama && practice.length > 0 && userGroup) {
                  const match = findPracticeMatch(day, hour);
                  if (match) {
                    const keys = Object.keys(match);
                    const nameKey = keys.find(k => k.toLowerCase().includes("ders") || k.toLowerCase().includes("uygulama") || k.toLowerCase().includes("ad") || k.toLowerCase().includes("name") || k.toLowerCase().includes("konu"));
                    const practiceName = nameKey ? match[nameKey] : "";
                    return { text: practiceName ? `🔬 ${practiceName}` : `🔬 ${val}`, isUygulama:true, isPracticeMatch:true };
                  }
                  // No match for this group - show as dimmed
                  return { text: val, isUygulama:true, isPracticeMatch:false, noGroup:true };
                }
                return { text:val, isUygulama:false, isPracticeMatch:false };
              }

              return (
                <>
                  <p style={{ fontWeight:700, fontSize:16, margin:"0 0 12px" }}>📅 Haftalık Ders Programı</p>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:20, background:"rgba(0,212,170,0.1)", marginBottom:16 }}>
                    {userSinif && <span style={{ fontSize:13, color:"#00d4aa", fontWeight:700 }}>{userSinif}</span>}
                    {userGroup && <><span style={{ fontSize:12, color:"#64748b" }}>·</span><span style={{ fontSize:13, color:"#ffb03a", fontWeight:700 }}>{userGroup}</span></>}
                    <span style={{ fontSize:12, color:"#94a3b8" }}>programı</span>
                  </div>
                  {!grid ? (
                    <div style={{ ...s.card, textAlign:"center", padding:"48px 24px" }}>
                      <p style={{ fontSize:32, margin:"0 0 12px" }}>📅</p>
                      <p style={{ fontWeight:700, margin:"0 0 8px" }}>Henüz ders programı yüklenmemiş</p>
                      <p style={{ fontSize:13, color:"#64748b", margin:0 }}>Admin tarafından {userSinif||"sınıfın"} için ders programı eklendiğinde burada görünecek.</p>
                    </div>
                  ) : (
                    <div style={{ ...s.card, padding:"12px", overflowX:"auto" }}>
                      <table style={{ borderCollapse:"collapse", width:"100%", minWidth:700, fontSize:12 }}>
                        <thead>
                          <tr>
                            <th colSpan={8} style={{ padding:"10px", background:"rgba(0,212,170,0.8)", color:"#fff", border:"1px solid rgba(148,163,184,0.15)", fontWeight:700, fontSize:14, textAlign:"center", letterSpacing:1 }}>HAFTALIK DERS PROGRAMI{userGroup ? ` — ${userGroup}` : ""}</th>
                          </tr>
                          <tr>
                            <th style={{ padding:"8px 10px", background:"rgba(220,38,38,0.15)", color:"#ff5252", border:"1px solid rgba(148,163,184,0.15)", fontWeight:700, textAlign:"center" }}>SAAT</th>
                            {DAYS.map(d => <th key={d} style={{ padding:"8px 10px", background:d===today?"#3d5af1":"#f8d7da", color:d===today?"#fff":"#721c24", border:"1px solid rgba(148,163,184,0.15)", fontWeight:700, textAlign:"center", minWidth:100 }}>{d.toUpperCase()}{d===today&&<span style={{ display:"block", fontSize:9, fontWeight:400, opacity:0.8 }}>BUGÜN</span>}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {HOURS.map((hour,ri) => (
                            <tr key={hour} style={{ background:ri%2===0?"#fff":"#fafafa" }}>
                              <td style={{ padding:"8px 12px", border:"1px solid rgba(148,163,184,0.1)", whiteSpace:"nowrap", fontWeight:600, color:"#e8edf5", background:"rgba(16,24,44,0.4)", textAlign:"center" }}>{hour}</td>
                              {DAYS.map(day => {
                                const cell = getCellContent(day, hour);
                                if (cell.noGroup) return (
                                  <td key={day} style={{ padding:"6px 8px", border:"1px solid rgba(148,163,184,0.1)", verticalAlign:"top", opacity:0.3 }}>
                                    <span style={{ fontSize:11, color:"#64748b", lineHeight:1.5, display:"block", fontStyle:"italic" }}>Uygulama (başka grup)</span>
                                  </td>
                                );
                                return (
                                  <td key={day} style={{ padding:"6px 8px", border:"1px solid rgba(148,163,184,0.1)", verticalAlign:"top", background:day===today&&cell.text?"rgba(0,212,170,0.1)":cell.isPracticeMatch?"rgba(255,176,58,0.08)":undefined }}>
                                    {cell.text && <span style={{ fontSize:11, color:cell.isPracticeMatch?"#ffb03a":day===today?"#3d5af1":"#1a1d2e", fontWeight:(day===today||cell.isPracticeMatch)?600:400, lineHeight:1.5, display:"block" }}>{cell.text}</span>}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div style={{ display:"flex", gap:16, margin:"10px 0 0", fontSize:11, color:"#64748b" }}>
                        <span>🔵 Bugünün dersleri</span>
                        <span>🔬 Uygulama dersleri (grubunuza özel)</span>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}

            {/* Sınava Kalan Gün */}
            {(() => {
              const sinifExams = examDates[userSinif||""] || {};
              const sinifSubs = subjects.filter(sb => sb.sinif===userSinif);
              const now = new Date();
              now.setHours(0,0,0,0);
              const examTypes = [["vize","Vize","#3d5af1"],["final","Final","#059669"],["but","BÜT","#d97706"]];
              const upcoming = [];
              sinifSubs.forEach(sub => {
                const vals = sinifExams[sub.name] || {};
                examTypes.forEach(([key,label,col]) => {
                  if (!vals[key]) return;
                  const target = new Date(vals[key]);
                  target.setHours(0,0,0,0);
                  const diff = Math.ceil((target - now) / (1000*60*60*24));
                  if (diff >= 0) upcoming.push({ name: sub.name, type: label, color: col, target, diff });
                });
              });
              upcoming.sort((a,b) => a.diff - b.diff);
              if (upcoming.length === 0) return (
                <div style={{ marginTop:24 }}>
                  <p style={{ fontWeight:700, fontSize:16, margin:"0 0 12px" }}>🎯 Sınava Kalan Gün</p>
                  <div style={{ ...s.card, textAlign:"center", padding:"32px 24px" }}>
                    <p style={{ fontSize:28, margin:"0 0 8px" }}>🎉</p>
                    <p style={{ fontWeight:600, margin:0, color:"#94a3b8" }}>Yaklaşan sınav bulunmuyor</p>
                  </div>
                </div>
              );
              return (
                <div style={{ marginTop:24 }}>
                  <p style={{ fontWeight:700, fontSize:16, margin:"0 0 12px" }}>🎯 Sınava Kalan Gün</p>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                    {upcoming.map((ex,i) => (
                      <div key={i} style={{ background:"rgba(16,24,44,0.6)", borderRadius:14, padding:"18px 14px", textAlign:"center", border: ex.diff<=7 ? "2px solid "+ex.color : "1px solid rgba(148,163,184,0.12)", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
                        <p style={{ fontSize:12, fontWeight:600, color:"#94a3b8", margin:"0 0 2px", lineHeight:1.3 }}>{ex.name}</p>
                        <p style={{ fontSize:10, fontWeight:700, color:ex.color, margin:"0 0 6px" }}>{ex.type}</p>
                        <p style={{ fontSize:32, fontWeight:800, margin:"0 0 2px", color: ex.diff === 0 ? "#dc2626" : ex.diff<=7 ? "#d97706" : ex.color }}>{ex.diff === 0 ? "BUGÜN!" : ex.diff}</p>
                        {ex.diff !== 0 && <p style={{ fontSize:11, color:"#64748b", margin:0 }}>gün kaldı</p>}
                        <p style={{ fontSize:10, color:"#b0b5c0", margin:"6px 0 0" }}>{ex.target.toLocaleDateString("tr-TR",{day:"numeric",month:"long"})}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </>
        )}

        {page==="summaries" && renderSummaries()}

        {page==="but" && (
          <>
            <p style={s.title}>BÜT Hesaplama</p>
            <div style={{ maxWidth:480 }}>
              <div style={s.card}>
                <p style={{ fontSize:13, color:"#94a3b8", margin:"0 0 20px", lineHeight:1.6 }}>
                  Vize, final ve uygulama notlarını girerek sınav sonucunu hesapla.
                </p>
                <div style={{ display:"flex", gap:12, marginBottom:20, padding:"10px 14px", background:"rgba(12,18,34,0.4)", borderRadius:10, border:"1px solid rgba(148,163,184,0.15)" }}>
                  {[["Vize","%40"],["Final","%30"],["Uygulama","%30"]].map(([l,p]) => <div key={l} style={{ flex:1, textAlign:"center" }}><p style={{ fontSize:20, fontWeight:800, color:"#00d4aa", margin:"0 0 2px" }}>{p}</p><p style={{ fontSize:12, color:"#94a3b8", margin:0 }}>{l}</p></div>)}
                </div>
                <BUTCalculator />
              </div>
            </div>
          </>
        )}

        {page==="anatomy" && (
          <>
            {anatView==="menu" && (
              <>
                <p style={s.title}>🦴 Zilli Sınav</p>
                <p style={{ fontSize:13, color:"#94a3b8", marginBottom:24 }}>Bir konu seç, rastgele 10 sorudan oluşan süreli sınava gir!</p>
                {(() => {
                  const userClass = SINIFLAR.includes(user.year) ? user.year : null;
                  const availableTopics = anatomyTopics.filter(t => {
                    if (userClass) return t.sinif === userClass;
                    return true;
                  }).filter(t => t.images.some(img => img.questions.length > 0));

                  if (availableTopics.length===0) return (
                    <div style={{ ...s.card, textAlign:"center", padding:"48px 24px" }}>
                      <p style={{ fontSize:32, margin:"0 0 12px" }}>🦴</p>
                      <p style={{ fontWeight:700, margin:"0 0 8px" }}>Henüz sınav konusu eklenmemiş</p>
                      <p style={{ fontSize:13, color:"#64748b", margin:0 }}>Admin panelinden {userClass||"sınıfın"} için konu ve soru eklendiğinde burada görünecek.</p>
                    </div>
                  );

                  return (
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:14 }}>
                      {availableTopics.map(topic => {
                        const totalQs = topic.images.reduce((sum, img) => sum + img.questions.length, 0);
                        const firstImg = topic.images.find(im => im.image);
                        return (
                          <div key={topic.id} onClick={() => { setAnatSelected([topic.id]); anatStartQuiz([topic.id]); }}
                            style={{ ...s.card, cursor:"pointer", padding:0, overflow:"hidden", textAlign:"center", transition:"all 0.3s ease", border:"1px solid rgba(148,163,184,0.12)", position:"relative", height:180, display:"flex", alignItems:"center", justifyContent:"center", backgroundImage:firstImg?`linear-gradient(rgba(6,10,20,0.55),rgba(6,10,20,0.55)),url(${firstImg.image})`:"none", backgroundSize:"cover", backgroundPosition:"center" }}>
                            <div>
                              <p style={{ fontSize:28, margin:"0 0 8px" }}>⏱</p>
                              <p style={{ fontWeight:700, fontSize:16, margin:"0 0 6px", color:"#ffb03a" }}>{topic.name}</p>
                              <p style={{ fontSize:12, color:"#94a3b8", margin:0 }}>{Math.min(10, totalQs)} soru · 30 sn</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </>
            )}
            {anatView==="quiz" && anatShuffled.length>0 && (() => {
              const q = anatShuffled[anatQIdx];
              return (
                <>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                    <div>
                      <div style={{ fontSize:11, color:"#64748b", letterSpacing:1 }}>{q.topicName.toUpperCase()} · {anatQIdx+1}/{anatShuffled.length}</div>
                      <div style={{ fontSize:28, fontWeight:800, color:anatTimer<=5?"#ff5252":"#00d4aa" }}>00:{anatTimer<10?`0${anatTimer}`:anatTimer}</div>
                    </div>
                    <button onClick={() => { clearInterval(anatTimerRef.current); setAnatView("menu"); }} style={{ padding:"8px 16px", borderRadius:8, border:"1px solid rgba(255,82,82,0.3)", background:"rgba(255,82,82,0.1)", color:"#ff5252", cursor:"pointer", fontSize:12, fontWeight:700 }}>Sınavı Kapat</button>
                  </div>
                  <div style={{ ...s.card, position:"relative", overflow:"hidden", marginBottom:16, padding:0 }}>
                    {q.imgSrc && <img src={q.imgSrc} style={{ width:"100%", display:"block", opacity:0.9, borderRadius:16 }} />}
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%" }}>
                      <circle cx={q.x} cy={q.y} r="3" fill="none" stroke="rgba(0,212,170,0.35)" strokeWidth="0.4">
                        <animate attributeName="r" from="3" to="10" dur="2s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx={q.x} cy={q.y} r="2" fill="none" stroke="rgba(0,212,170,0.3)" strokeWidth="0.3">
                        <animate attributeName="r" from="2" to="8" dur="2s" begin="0.6s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" from="0.35" to="0" dur="2s" begin="0.6s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx={q.x} cy={q.y} r="1.5" fill="none" stroke="rgba(0,212,170,0.6)" strokeWidth="0.4"/>
                      <line x1={q.x} y1={q.y} x2={q.x>50?q.x-16:q.x+16} y2={q.y>50?q.y-10:q.y-10} stroke="rgba(0,212,170,0.3)" strokeWidth="0.25" strokeDasharray="1,1"/>
                      <rect x={q.x>50?q.x-26:q.x+10} y={q.y>50?q.y-15:q.y-15} width="12" height="6" rx="2" fill="rgba(0,212,170,0.7)"/>
                      <text x={q.x>50?q.x-20:q.x+16} y={q.y>50?q.y-11.5:q.y-11.5} textAnchor="middle" dominantBaseline="middle" fontSize="3.5" fill="#060a14" fontWeight="bold">{q.label}</text>
                    </svg>
                  </div>
                  <div style={s.card}>
                    <p style={{ margin:"0 0 10px", color:"#64748b", fontSize:12 }}>İşaretlenen yapının adını girin:</p>
                    <input value={anatInput} onChange={e => setAnatInput(e.target.value)} onKeyDown={e => { if (e.key==="Enter") anatSaveAnswer(anatInput); }} autoFocus style={{ ...sinp, fontFamily:"monospace", fontSize:16, marginBottom:12 }} />
                    <button onClick={() => anatSaveAnswer(anatInput)} style={{ ...s.btn(true), width:"100%", padding:14, fontSize:15 }}>Onayla ve Devam Et</button>
                  </div>
                </>
              );
            })()}
            {anatView==="done" && (
              <>
                <div style={{ ...s.card, textAlign:"center", padding:"2rem" }}>
                  <p style={{ fontSize:22, fontWeight:700, color:"#00d4aa", margin:"0 0 10px" }}>Sınav Tamamlandı</p>
                  <p style={{ fontSize:48, fontWeight:800, color:"#ffb03a", margin:"0 0 4px" }}>{anatAnswers.filter(a => a.ok).length} / {anatAnswers.length}</p>
                  <p style={{ fontSize:13, color:"#94a3b8" }}>Başarı: %{Math.round((anatAnswers.filter(a => a.ok).length/anatAnswers.length)*100)}</p>
                  <div style={{ marginTop:20, textAlign:"left", maxHeight:300, overflowY:"auto" }}>
                    {anatAnswers.map((a,i) => (
                      <div key={i} style={{ padding:"10px 0", borderBottom:"1px solid rgba(148,163,184,0.1)", display:"flex", justifyContent:"space-between", fontSize:13 }}>
                        <span><b style={{ color:"#00d4aa" }}>{a.topicName}</b> — {a.label}</span>
                        <span style={{ color:a.ok?"#00e676":"#ff5252" }}>{a.user} {a.ok?"✓":`(Doğru: ${a.correct})`}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { setAnatView("menu"); setAnatSelected([]); }} style={{ ...s.btn(true), marginTop:20, width:"100%", padding:14 }}>Geri Dön</button>
                </div>
              </>
            )}
          </>
        )}

        {page==="upload" && (
          <>
            <p style={s.title}>PDF Yükle ve Çalış</p>
            <div style={s.card}>
              <p style={{ fontWeight:700, marginTop:0 }}>Kendi notunu yükle</p>
              <p style={{ fontSize:13, color:"#94a3b8" }}>AI otomatik olarak kapsamlı özet, flashcard ve test soruları üretir.</p>
              <div onClick={() => fileRef.current.click()} style={{ border:"2px dashed rgba(148,163,184,0.2)", borderRadius:12, padding:"32px 20px", textAlign:"center", cursor:"pointer", marginTop:12, background:"rgba(12,18,34,0.4)" }}>
                <p style={{ fontSize:28, margin:"0 0 8px" }}>↑</p>
                <p style={{ fontWeight:600, margin:0 }}>PDF dosyasını buraya sürükle veya tıkla</p>
                <p style={{ fontSize:13, color:"#64748b", marginTop:4 }}>Maks. 30 MB · İlk 8 sayfa işlenir</p>
              </div>
              <input ref={fileRef} type="file" accept=".pdf" style={{ display:"none" }} onChange={e => handleUpload(e.target.files[0])} />
              {uploadedFile && <p style={{ marginTop:12, fontSize:13, color:"#00d4aa", fontWeight:600 }}>📄 {uploadedFile}</p>}
            </div>
            {aiLoading && (
              <div style={{ ...s.card, marginTop:16, textAlign:"center", padding:"36px 24px" }}>
                <div style={{ display:"inline-block", width:40, height:40, border:"3px solid rgba(0,212,170,0.2)", borderTop:"3px solid #00d4aa", borderRadius:"50%", animation:"spin 1s linear infinite", marginBottom:16 }}></div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <p style={{ color:"#e8edf5", fontWeight:600, margin:"0 0 6px", fontSize:15 }}>{aiProgress || "İşleniyor..."}</p>
                <p style={{ color:"#64748b", fontSize:12, margin:0 }}>Bu işlem PDF boyutuna göre 1-3 dakika sürebilir</p>
              </div>
            )}
            {aiResult&&!aiResult.error && (
              <div style={{ ...s.card, marginTop:16 }}>
                {aiResult.pageCount && <p style={{ fontSize:12, color:"#64748b", margin:"0 0 14px" }}>📄 {aiResult.pageCount} sayfa işlendi · {(aiResult.flashcards||[]).length} flashcard · {(aiResult.questions||[]).length} soru</p>}
                <div style={{ display:"flex", gap:8, marginBottom:20, background:"rgba(16,24,44,0.6)", padding:5, borderRadius:12, width:"fit-content" }}>
                  {[["summary","Özet"],["flashcards","Flashcard ("+(aiResult.flashcards||[]).length+")"],["test","Test ("+(aiResult.questions||[]).length+")"]].map(([id,label]) => <button key={id} onClick={() => { setAiTab(id); setAiFcFlipped(false); setAiFcIdx(0); setAiTestAnswers({}); setAiTestSubmitted(false); }} style={{ padding:"7px 16px", borderRadius:9, border:"none", background:aiTab===id?"rgba(0,212,170,0.15)":"transparent", color:aiTab===id?"#00d4aa":"#94a3b8", cursor:"pointer", fontSize:13, fontWeight:aiTab===id?700:500, boxShadow:aiTab===id?"0 0 12px rgba(0,212,170,0.15)":"none" }}>{label}</button>)}
                </div>
                {aiTab==="summary" && <div style={{ fontSize:14, lineHeight:1.8, color:"#94a3b8", margin:0, whiteSpace:"pre-wrap" }}>{aiResult.summary}</div>}
                {aiTab==="flashcards"&&(aiResult.flashcards||[]).length>0 && (
                  <div style={{ textAlign:"center" }}>
                    <p style={{ fontSize:13, color:"#94a3b8", marginTop:0 }}>{aiFcIdx+1} / {aiResult.flashcards.length}</p>
                    <div onClick={() => setAiFcFlipped(!aiFcFlipped)} style={{ border:"1.5px solid "+(aiFcFlipped?"#a5b4fc":"rgba(148,163,184,0.15)"), borderRadius:14, padding:"32px 24px", cursor:"pointer", minHeight:120, display:"flex", alignItems:"center", justifyContent:"center", background:aiFcFlipped?"rgba(0,212,170,0.1)":"rgba(12,18,34,0.4)" }}>
                      <p style={{ fontSize:15, lineHeight:1.6, margin:0, color:"#e8edf5" }}>{aiFcFlipped?aiResult.flashcards[aiFcIdx].a:aiResult.flashcards[aiFcIdx].q}</p>
                    </div>
                    <p style={{ fontSize:12, color:"#64748b", marginTop:8 }}>Çevirmek için tıkla</p>
                    <div style={{ display:"flex", gap:10, justifyContent:"center", marginTop:16 }}>
                      <button style={s.btn(false)} disabled={aiFcIdx===0} onClick={() => { setAiFcIdx(Math.max(0,aiFcIdx-1)); setAiFcFlipped(false); }}>Önceki</button>
                      <button style={s.btn(true)} disabled={aiFcIdx===aiResult.flashcards.length-1} onClick={() => { setAiFcIdx(Math.min(aiResult.flashcards.length-1,aiFcIdx+1)); setAiFcFlipped(false); }}>Sonraki</button>
                    </div>
                  </div>
                )}
                {aiTab==="flashcards"&&(aiResult.flashcards||[]).length===0 && <p style={{ color:"#64748b", textAlign:"center", padding:20 }}>Flashcard oluşturulamadı.</p>}
                {aiTab==="test"&&(aiResult.questions||[]).length>0 && (
                  <div>
                    {aiResult.questions.map((q,i) => (
                      <div key={i} style={{ marginBottom:20 }}>
                        <p style={{ fontWeight:700, marginBottom:10 }}>{i+1}. {q.q}</p>
                        {(q.opts||[]).map((o,j) => { let bg="rgba(12,18,34,0.4)",col="#374151",border="1px solid rgba(148,163,184,0.15)"; if(aiTestSubmitted){if(j===q.ans){bg="#f0fdf4";col="#16a34a";border="1px solid #86efac";}else if(aiTestAnswers[i]===j){bg="#fef2f2";col="#dc2626";border="1px solid #fca5a5";}}else if(aiTestAnswers[i]===j){bg="rgba(0,212,170,0.1)";col="#3d5af1";border="1px solid #a5b4fc";} return <div key={j} onClick={() => { if(!aiTestSubmitted) setAiTestAnswers(p => ({ ...p,[i]:j })); }} style={{ padding:"10px 14px", borderRadius:10, marginBottom:6, cursor:aiTestSubmitted?"default":"pointer", background:bg, color:col, border, fontSize:14 }}>{["A","B","C","D","E"][j]}. {o}</div>; })}
                      </div>
                    ))}
                    {!aiTestSubmitted ? <button style={s.btn(true)} onClick={() => setAiTestSubmitted(true)}>Testi Bitir</button>
                      : <div style={{ padding:"14px 18px", background:"rgba(0,212,170,0.1)", borderRadius:10 }}><p style={{ margin:0, fontWeight:700, color:"#00d4aa" }}>Sonuç: {Object.entries(aiTestAnswers).filter(([i,a]) => aiResult.questions[i]&&aiResult.questions[i].ans===a).length} / {aiResult.questions.length} doğru</p></div>}
                  </div>
                )}
                {aiTab==="test"&&(aiResult.questions||[]).length===0 && <p style={{ color:"#64748b", textAlign:"center", padding:20 }}>Test sorusu oluşturulamadı.</p>}
              </div>
            )}
            {aiResult&&aiResult.error && <div style={{ ...s.card, marginTop:16, background:"rgba(255,82,82,0.1)" }}><p style={{ color:"#ff5252", margin:0 }}>{aiResult.error}</p></div>}
          </>
        )}

        {page==="mydecks" && (
          <>
            {deckView==="study"&&activeDeckIdx!==null && <StudyDeck deck={decks[activeDeckIdx]} onBack={() => setDeckView("list")} onUpdateStats={() => updateStats({ cards:(stats.cards||0)+1 })} />}
            {deckView==="list" && (
              <>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
                  <p style={{ ...s.title, margin:0 }}>Flashcard Oluştur</p>
                  <button style={s.btn(true)} onClick={() => { setDeckView("create"); setActiveDeckIdx(null); setDeckName(""); setDeckSubject(""); setDeckCards([newBlankCard()]); }}>+ Yeni Deste</button>
                </div>
                {decks.length===0
                  ? <div style={{ ...s.card, textAlign:"center", padding:"48px 24px" }}><p style={{ fontSize:32, margin:"0 0 12px" }}>✦</p><p style={{ fontWeight:700, margin:"0 0 8px" }}>Henüz deste yok</p><button style={s.btn(true)} onClick={() => { setDeckView("create"); setDeckName(""); setDeckCards([newBlankCard()]); }}>İlk desteni oluştur</button></div>
                  : <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
                      {decks.map((d,i) => (
                        <div key={d.id} style={s.card}>
                          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                            <div><p style={{ fontWeight:700, margin:"0 0 4px", fontSize:16 }}>{d.name}</p>{d.subject&&<span style={s.tag}>{d.subject}</span>}</div>
                            <span style={{ fontSize:12, color:"#64748b" }}>{d.createdAt}</span>
                          </div>
                          <p style={{ fontSize:13, color:"#94a3b8", margin:"0 0 14px" }}>{d.cards.filter(c => c.q||c.qImg).length} kart</p>
                          <div style={{ display:"flex", gap:8 }}>
                            <button style={{ ...s.btn(true), flex:1, fontSize:13, padding:8 }} onClick={() => { setActiveDeckIdx(i); setDeckView("study"); }}>Çalış</button>
                            <button style={{ ...s.btn(false), fontSize:13, padding:"8px 14px" }} onClick={() => { setActiveDeckIdx(i); setDeckName(d.name); setDeckSubject(d.subject); setDeckCards(d.cards.map(c => ({ ...c }))); setDeckView("create"); }}>Düzenle</button>
                            <button onClick={() => saveDecks(decks.filter((_,j) => j!==i))} style={{ padding:"8px 12px", borderRadius:8, border:"1px solid rgba(255,82,82,0.3)", background:"transparent", color:"#ff5252", cursor:"pointer", fontSize:13 }}>Sil</button>
                          </div>
                        </div>
                      ))}
                    </div>
                }
              </>
            )}
            {deckView==="create" && (
              <>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
                  <p style={{ ...s.title, margin:0 }}>{activeDeckIdx!==null?"Desteyi Düzenle":"Yeni Deste"}</p>
                  <button style={s.btn(false)} onClick={() => setDeckView("list")}>Geri</button>
                </div>
                <div style={{ ...s.card, marginBottom:16 }}>
                  <div style={{ display:"flex", gap:12 }}>
                    <div style={{ flex:2 }}><p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 6px" }}>Deste Adı</p><input style={s.input} placeholder="örn. Kardiyovasküler Sistem" value={deckName} onChange={e => setDeckName(e.target.value)} /></div>
                    <div style={{ flex:1 }}><p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 6px" }}>Ders</p><input style={s.input} placeholder="örn. Anatomi" value={deckSubject} onChange={e => setDeckSubject(e.target.value)} /></div>
                  </div>
                </div>
                {deckCards.map((card,i) => <CardEditor key={i} card={card} idx={i} onChange={hcc} onRemove={deckCards.length>1?(idx) => setDeckCards(prev => prev.filter((_,j) => j!==idx)):null} />)}
                <div style={{ display:"flex", gap:12 }}>
                  <button style={{ ...s.btn(false), fontSize:13 }} onClick={() => setDeckCards(p => [...p,newBlankCard()])}>+ Kart Ekle</button>
                  <button style={s.btn(true)} disabled={!deckName.trim()} onClick={() => {
                    const deck = { id:Date.now(), name:deckName, subject:deckSubject, cards:deckCards, createdAt:new Date().toLocaleDateString("tr-TR") };
                    if (activeDeckIdx!==null) { const u=[...decks]; u[activeDeckIdx]=deck; saveDecks(u); } else saveDecks([...decks,deck]);
                    setDeckView("list"); setActiveDeckIdx(null); setDeckName(""); setDeckCards([newBlankCard()]);
                  }}>Desteyi Kaydet</button>
                </div>
              </>
            )}
          </>
        )}

        {page==="profile" && (
          <>
            <p style={s.title}>Profilim</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <div style={s.card}>
                {!editProfile ? (
                  <>
                    <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:20 }}>
                      <div style={s.avatar(64,user.avatarColor)}><span style={{ fontSize:22 }}>{user.avatar}</span></div>
                      <div><p style={{ fontWeight:700, fontSize:18, margin:"0 0 4px" }}>{user.name}</p><p style={{ fontSize:13, color:"#94a3b8", margin:0 }}>{user.email}</p></div>
                    </div>
                    {[["Sınıf",user.year],["Uygulama Grubu",user.group||"Belirtilmedi"],["Üniversite",user.university||"Belirtilmedi"]].map(([k,v]) => <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid rgba(148,163,184,0.1)", fontSize:14 }}><span style={{ color:"#94a3b8" }}>{k}</span><span style={{ fontWeight:600 }}>{v}</span></div>)}
                    {user.email!=="__guest__" && <button style={{ ...s.btn(true), marginTop:16, width:"100%" }} onClick={() => { setEditName(user.name); setEditYear(user.year); setEditGroup(user.group||"Grup A"); setEditUni(user.university); setEditProfile(true); }}>Profili Düzenle</button>}
                  </>
                ) : (
                  <>
                    <p style={{ fontWeight:700, marginTop:0 }}>Profili Düzenle</p>
                    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                      <div><p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 6px" }}>Ad Soyad</p><input style={s.input} value={editName} onChange={e => setEditName(e.target.value)} /></div>
                      <div><p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 6px" }}>Sınıf</p><select style={s.input} value={editYear} onChange={e => setEditYear(e.target.value)}>{["1. Sınıf","2. Sınıf","3. Sınıf","4. Sınıf","5. Sınıf","6. Sınıf","Asistan"].map(y => <option key={y}>{y}</option>)}</select></div>
                      <div><p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 6px" }}>Uygulama Grubu</p><select style={s.input} value={editGroup} onChange={e => setEditGroup(e.target.value)}>{GROUPS.map(g => <option key={g}>{g}</option>)}</select></div>
                      <div><p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 6px" }}>Üniversite</p><input style={s.input} value={editUni} onChange={e => setEditUni(e.target.value)} /></div>
                      <div style={{ display:"flex", gap:10 }}>
                        <button style={{ ...s.btn(true), flex:1 }} onClick={() => { const u={ ...user, name:editName, year:editYear, group:editGroup, university:editUni }; setUsers(p => p.map(x => x.email===user.email?u:x)); setUser(u); setEditProfile(false); }}>Kaydet</button>
                        <button style={{ ...s.btn(false), flex:1 }} onClick={() => setEditProfile(false)}>İptal</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div style={s.card}>
                  <p style={{ fontWeight:700, marginTop:0 }}>İstatistikler</p>
                  {[["Çalışılan Kart",stats.cards||0],["Çözülen Test",stats.testCount||0],["Ort. Test Skoru",stats.testCount?"%"+Math.round(stats.testScore/stats.testCount):"—"],["Oluşturulan Deste",decks.length]].map(([k,v]) => <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid rgba(148,163,184,0.1)", fontSize:14 }}><span style={{ color:"#94a3b8" }}>{k}</span><span style={{ fontWeight:700, color:"#00d4aa" }}>{v}</span></div>)}
                </div>
                <div style={s.card}>
                  <p style={{ fontWeight:700, marginTop:0 }}>Rozetler</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                    {[{ icon:"⭐", label:"İlk Giriş", ok:true },{ icon:"🏆", label:"10 Kart", ok:(stats.cards||0)>=10 },{ icon:"🃏", label:"İlk Deste", ok:decks.length>=1 },{ icon:"🎯", label:"%80 Test", ok:stats.testCount>0&&(stats.testScore/stats.testCount)>=80 }].map(b => (
                      <div key={b.label} style={{ textAlign:"center", padding:"10px 14px", borderRadius:10, background:b.ok?"rgba(0,212,170,0.1)":"rgba(12,18,34,0.4)", border:"1px solid "+(b.ok?"#a5b4fc":"rgba(148,163,184,0.12)"), opacity:b.ok?1:0.45 }}>
                        <p style={{ fontSize:22, margin:"0 0 4px" }}>{b.icon}</p>
                        <p style={{ fontSize:11, margin:0, color:b.ok?"#3d5af1":"#9ca3af", fontWeight:600 }}>{b.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
