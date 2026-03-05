import { useState, useRef, useEffect } from "react";

const CATEGORIES = {
  construction: {
    name: "مقاولات وبناء",
    icon: "🏗️",
    items: [
      { name: "أعمال الخرسانة المسلحة", unit: "م³", priceRange: [1200, 2500] },
      { name: "أعمال البلوك", unit: "م²", priceRange: [80, 150] },
      { name: "أعمال البلاط والسيراميك", unit: "م²", priceRange: [100, 350] },
      { name: "أعمال الدهانات", unit: "م²", priceRange: [25, 80] },
      { name: "أعمال العزل المائي", unit: "م²", priceRange: [40, 120] },
      { name: "أعمال العزل الحراري", unit: "م²", priceRange: [50, 150] },
      { name: "أعمال الحديد والصلب", unit: "طن", priceRange: [4500, 7000] },
      { name: "أعمال النجارة والأبواب", unit: "عدد", priceRange: [800, 3500] },
      { name: "أعمال الألمنيوم والزجاج", unit: "م²", priceRange: [350, 900] },
      { name: "أعمال الجبس والأسقف", unit: "م²", priceRange: [60, 200] },
      { name: "أعمال الحفر والردم", unit: "م³", priceRange: [30, 80] },
      { name: "أعمال الأساسات", unit: "م³", priceRange: [1500, 3000] },
    ],
  },
  electrical: {
    name: "تركيبات كهربائية",
    icon: "⚡",
    items: [
      { name: "لوحة توزيع رئيسية MDB", unit: "عدد", priceRange: [5000, 25000] },
      { name: "لوحة توزيع فرعية SDB", unit: "عدد", priceRange: [2000, 8000] },
      { name: "كابلات كهربائية (تغذية رئيسية)", unit: "م.ط", priceRange: [50, 350] },
      { name: "كابلات كهربائية (فرعية)", unit: "م.ط", priceRange: [15, 80] },
      { name: "أنابيب حماية (كوندويت)", unit: "م.ط", priceRange: [10, 45] },
      { name: "مفاتيح وأفياش", unit: "نقطة", priceRange: [80, 250] },
      { name: "إنارة LED داخلية", unit: "عدد", priceRange: [150, 800] },
      { name: "إنارة خارجية", unit: "عدد", priceRange: [300, 2000] },
      { name: "نظام أرضي (Earthing)", unit: "نقطة", priceRange: [500, 2000] },
      { name: "UPS وأنظمة الطاقة الاحتياطية", unit: "عدد", priceRange: [3000, 30000] },
      { name: "مولد كهربائي", unit: "عدد", priceRange: [15000, 150000] },
      { name: "نظام حماية من الصواعق", unit: "مجموعة", priceRange: [5000, 15000] },
    ],
  },
  lowCurrent: {
    name: "أنظمة التيار الخفيف",
    icon: "📡",
    items: [
      { name: "نظام كاميرات مراقبة CCTV", unit: "كاميرا", priceRange: [800, 3500] },
      { name: "نظام إنذار حريق", unit: "نقطة", priceRange: [300, 900] },
      { name: "نظام صوتي PA System", unit: "نقطة", priceRange: [400, 1200] },
      { name: "شبكة بيانات (Data Network)", unit: "نقطة", priceRange: [250, 700] },
      { name: "نظام تحكم بالدخول (Access Control)", unit: "باب", priceRange: [1500, 5000] },
      { name: "نظام إنتركم", unit: "نقطة", priceRange: [500, 2000] },
      { name: "نظام BMS", unit: "نقطة", priceRange: [800, 3000] },
      { name: "كابلات شبكة Cat6/Cat6A", unit: "م.ط", priceRange: [8, 25] },
      { name: "رفوف وخزانة سيرفرات (Rack)", unit: "عدد", priceRange: [3000, 12000] },
      { name: "أنظمة Wi-Fi (Access Points)", unit: "عدد", priceRange: [800, 3000] },
      { name: "نظام IPTV", unit: "نقطة", priceRange: [500, 1500] },
    ],
  },
  maintenance: {
    name: "صيانة وترميم",
    icon: "🔧",
    items: [
      { name: "صيانة كهربائية شاملة", unit: "زيارة", priceRange: [500, 2000] },
      { name: "صيانة أنظمة تيار خفيف", unit: "زيارة", priceRange: [400, 1500] },
      { name: "ترميم واجهات", unit: "م²", priceRange: [100, 400] },
      { name: "صيانة سباكة", unit: "نقطة", priceRange: [200, 800] },
      { name: "صيانة تكييف", unit: "وحدة", priceRange: [200, 600] },
      { name: "عقد صيانة سنوي", unit: "شهر", priceRange: [3000, 15000] },
    ],
  },
  supply: {
    name: "توريد مواد ومعدات",
    icon: "📦",
    items: [
      { name: "توريد أسلاك ومواسير كهربائية", unit: "مجموعة", priceRange: [5000, 50000] },
      { name: "توريد أجهزة إنارة", unit: "مجموعة", priceRange: [3000, 30000] },
      { name: "توريد معدات تيار خفيف", unit: "مجموعة", priceRange: [5000, 80000] },
      { name: "توريد مواد بناء", unit: "مجموعة", priceRange: [10000, 200000] },
      { name: "توريد أدوات صحية", unit: "مجموعة", priceRange: [5000, 50000] },
    ],
  },
};

// Keyword matching for AI analysis
const KEYWORD_MAP = {
  construction: ["بناء", "خرسانة", "بلوك", "بلاط", "سيراميك", "دهان", "عزل", "حديد", "نجارة", "أبواب", "ألمنيوم", "زجاج", "جبس", "أسقف", "حفر", "ردم", "أساسات", "تشطيب", "فيلا", "عمارة", "مبنى", "مجمع", "طوابق", "أدوار", "طابق", "غرفة", "غرف", "حمام", "مطبخ", "صالة", "سور", "واجهة", "ترميم"],
  electrical: ["كهرباء", "كهربائي", "لوحة", "توزيع", "كابل", "أسلاك", "مفاتيح", "أفياش", "إنارة", "إضاءة", "مولد", "UPS", "جنريتر", "أرضي", "تأسيس كهربائي", "قواطع", "نقاط كهرب"],
  lowCurrent: ["كاميرا", "مراقبة", "CCTV", "إنذار", "حريق", "صوتي", "شبكة", "بيانات", "إنتركم", "تحكم", "دخول", "access", "BMS", "واي فاي", "wifi", "انترنت", "سيرفر", "rack", "Cat6", "نقاط شبكة", "تيار خفيف", "low current"],
  maintenance: ["صيانة", "ترميم", "إصلاح", "تجديد", "عقد صيانة"],
  supply: ["توريد", "مواد", "معدات", "شراء", "تزويد"],
};

function analyzeRequest(text) {
  const lower = text.toLowerCase();
  const detected = {};
  const boqItems = [];
  let projectType = "عام";
  let area = 0;
  let floors = 1;

  // Detect area
  const areaMatch = text.match(/(\d+)\s*(م²|متر مربع|م مربع|sqm|م2)/);
  if (areaMatch) area = parseInt(areaMatch[1]);

  const areaMatch2 = text.match(/مساحة?\s*(\d+)/);
  if (!area && areaMatch2) area = parseInt(areaMatch2[1]);

  // Detect floors
  const floorMatch = text.match(/(\d+)\s*(طابق|دور|أدوار|طوابق)/);
  if (floorMatch) floors = parseInt(floorMatch[1]);

  // Detect project type
  if (lower.includes("فيلا")) projectType = "فيلا سكنية";
  else if (lower.includes("عمارة")) projectType = "عمارة سكنية";
  else if (lower.includes("مكتب") || lower.includes("تجاري")) projectType = "مبنى تجاري/مكتبي";
  else if (lower.includes("مستودع") || lower.includes("مصنع")) projectType = "مستودع/مصنع";
  else if (lower.includes("مطعم") || lower.includes("كافي")) projectType = "مطعم/كافيه";
  else if (lower.includes("مدرسة") || lower.includes("جامعة")) projectType = "مبنى تعليمي";
  else if (lower.includes("مستشفى") || lower.includes("عيادة")) projectType = "مبنى صحي";

  // Match categories and items
  Object.entries(KEYWORD_MAP).forEach(([catKey, keywords]) => {
    keywords.forEach((kw) => {
      if (lower.includes(kw.toLowerCase())) {
        detected[catKey] = true;
      }
    });
  });

  // If no specific category detected, assume full project
  if (Object.keys(detected).length === 0) {
    detected.construction = true;
    detected.electrical = true;
    detected.lowCurrent = true;
  }

  // Generate BOQ items based on detected categories and context
  const multiplier = area > 0 ? area / 100 : 1;

  Object.keys(detected).forEach((catKey) => {
    const cat = CATEGORIES[catKey];
    if (!cat) return;

    cat.items.forEach((item) => {
      let qty = 1;
      const avgPrice = (item.priceRange[0] + item.priceRange[1]) / 2;

      // Smart quantity estimation
      if (item.unit === "م²") qty = Math.max(1, Math.round(area > 0 ? area * floors * 0.8 : 50));
      else if (item.unit === "م³") qty = Math.max(1, Math.round(area > 0 ? area * floors * 0.3 : 20));
      else if (item.unit === "م.ط") qty = Math.max(1, Math.round(area > 0 ? area * floors * 1.5 : 100));
      else if (item.unit === "نقطة") qty = Math.max(1, Math.round(area > 0 ? (area * floors) / 15 : 10));
      else if (item.unit === "عدد") qty = Math.max(1, Math.round(area > 0 ? (area * floors) / 25 : 5));
      else if (item.unit === "طن") qty = Math.max(1, Math.round(area > 0 ? (area * floors) / 50 : 3));
      else if (item.unit === "كاميرا" || item.unit === "باب") qty = Math.max(1, Math.round(area > 0 ? (area * floors) / 40 : 4));
      else if (item.unit === "زيارة") qty = 12;
      else if (item.unit === "شهر") qty = 12;
      else if (item.unit === "وحدة") qty = Math.max(1, Math.round(area > 0 ? (area * floors) / 30 : 5));
      else if (item.unit === "مجموعة") qty = 1;

      const unitPrice = Math.round(avgPrice * (0.85 + Math.random() * 0.3));
      boqItems.push({
        id: `${catKey}-${boqItems.length}`,
        category: catKey,
        categoryName: cat.name,
        name: item.name,
        unit: item.unit,
        qty,
        unitPrice,
        total: qty * unitPrice,
      });
    });
  });

  return {
    projectType,
    area: area || "غير محدد",
    floors,
    categories: Object.keys(detected),
    boqItems,
    totalBeforeVAT: boqItems.reduce((s, i) => s + i.total, 0),
  };
}

// ============== COMPONENTS ==============

function Header() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #0a1628 0%, #1a2d50 50%, #0d2137 100%)",
      padding: "28px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "2px solid #c8973e",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "radial-gradient(circle at 20% 50%, rgba(200,151,62,0.08) 0%, transparent 50%)",
        pointerEvents: "none",
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 1 }}>
        <div style={{
          width: 52, height: 52,
          background: "linear-gradient(135deg, #c8973e, #e8c068)",
          borderRadius: 12,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, fontWeight: 900, color: "#0a1628",
          boxShadow: "0 4px 15px rgba(200,151,62,0.3)",
          fontFamily: "'Tajawal', sans-serif",
        }}>EU</div>
        <div>
          <div style={{
            fontSize: 22, fontWeight: 800, color: "#fff",
            fontFamily: "'Tajawal', sans-serif",
            letterSpacing: "-0.3px",
          }}>Excellency Union</div>
          <div style={{
            fontSize: 12, color: "#c8973e",
            fontFamily: "'Tajawal', sans-serif",
            letterSpacing: 3, textTransform: "uppercase", marginTop: 2,
          }}>نظام التسعير الذكي</div>
        </div>
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "rgba(200,151,62,0.12)",
        padding: "8px 16px", borderRadius: 20,
        border: "1px solid rgba(200,151,62,0.25)",
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "#4ade80",
          boxShadow: "0 0 8px rgba(74,222,128,0.5)",
          animation: "pulse 2s infinite",
        }} />
        <span style={{ fontSize: 13, color: "#c8973e", fontFamily: "'Tajawal', sans-serif" }}>
          AI مُفعّل
        </span>
      </div>
    </div>
  );
}

function InputSection({ onAnalyze, loading }) {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("text");
  const textRef = useRef(null);

  const placeholderText = `مثال: أحتاج تسعير لمشروع بناء فيلا سكنية مساحة 400 م² دورين، تشمل أعمال البناء والتشطيب والكهرباء وأنظمة التيار الخفيف (كاميرات مراقبة وشبكة بيانات ونظام إنذار حريق)

أو: صيانة كهربائية شاملة لمبنى تجاري 3 طوابق مع تركيب نظام كاميرات CCTV 16 كاميرا

أو: توريد وتركيب نظام إنذار حريق لمستودع مساحة 2000 م²`;

  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 2px 20px rgba(10,22,40,0.06)",
      border: "1px solid #e8ecf2",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "20px 24px 16px",
        borderBottom: "1px solid #f0f2f5",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(135deg, #0a1628, #1a2d50)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18,
        }}>📋</div>
        <div>
          <div style={{
            fontSize: 17, fontWeight: 700, color: "#0a1628",
            fontFamily: "'Tajawal', sans-serif",
          }}>إدخال الطلب</div>
          <div style={{ fontSize: 12, color: "#8896a8", fontFamily: "'Tajawal', sans-serif" }}>
            صِف مشروعك وسيقوم الذكاء الاصطناعي بتحليله وتسعيره
          </div>
        </div>
      </div>

      {/* Mode Tabs */}
      <div style={{ display: "flex", gap: 0, padding: "12px 24px 0", borderBottom: "1px solid #f0f2f5" }}>
        {[
          { id: "text", label: "كتابة نصية", icon: "✍️" },
          { id: "paste", label: "نسخ من إيميل", icon: "📧" },
          { id: "file", label: "رفع ملف", icon: "📎" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              padding: "10px 20px",
              border: "none",
              background: mode === m.id ? "#fff" : "transparent",
              borderBottom: mode === m.id ? "2px solid #c8973e" : "2px solid transparent",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: mode === m.id ? 700 : 500,
              color: mode === m.id ? "#c8973e" : "#8896a8",
              fontFamily: "'Tajawal', sans-serif",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      <div style={{ padding: 24 }}>
        {mode === "file" ? (
          <div style={{
            border: "2px dashed #d0d8e4",
            borderRadius: 12,
            padding: "48px 24px",
            textAlign: "center",
            background: "#f8fafc",
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#0a1628", fontFamily: "'Tajawal', sans-serif" }}>
              اسحب الملف هنا أو اضغط للرفع
            </div>
            <div style={{ fontSize: 12, color: "#8896a8", marginTop: 6, fontFamily: "'Tajawal', sans-serif" }}>
              PDF, Excel, Word — الحد الأقصى 10 MB
            </div>
            <div style={{
              marginTop: 16,
              display: "inline-block",
              padding: "8px 24px",
              background: "linear-gradient(135deg, #c8973e, #e8c068)",
              color: "#fff",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Tajawal', sans-serif",
            }}>اختر ملف</div>
          </div>
        ) : (
          <textarea
            ref={textRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={mode === "paste" ? "الصق محتوى الإيميل أو الطلب هنا..." : placeholderText}
            dir="rtl"
            style={{
              width: "100%",
              minHeight: 160,
              border: "1.5px solid #e0e5ed",
              borderRadius: 12,
              padding: 16,
              fontSize: 14,
              lineHeight: 1.8,
              fontFamily: "'Tajawal', sans-serif",
              color: "#1a2d50",
              resize: "vertical",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => e.target.style.borderColor = "#c8973e"}
            onBlur={(e) => e.target.style.borderColor = "#e0e5ed"}
          />
        )}

        <button
          onClick={() => text.trim() && onAnalyze(text)}
          disabled={!text.trim() || loading}
          style={{
            marginTop: 16,
            width: "100%",
            padding: "14px 24px",
            background: text.trim() && !loading
              ? "linear-gradient(135deg, #0a1628 0%, #1a2d50 100%)"
              : "#d0d8e4",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 700,
            cursor: text.trim() && !loading ? "pointer" : "not-allowed",
            fontFamily: "'Tajawal', sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            transition: "all 0.3s",
            boxShadow: text.trim() ? "0 4px 15px rgba(10,22,40,0.2)" : "none",
          }}
        >
          {loading ? (
            <>
              <div style={{
                width: 20, height: 20, border: "2px solid rgba(255,255,255,0.3)",
                borderTopColor: "#fff", borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }} />
              جاري التحليل بالذكاء الاصطناعي...
            </>
          ) : (
            <>🤖 تحليل وتسعير بالذكاء الاصطناعي</>
          )}
        </button>
      </div>
    </div>
  );
}

function AnalysisSummary({ result }) {
  const cats = result.categories.map((c) => CATEGORIES[c]);
  return (
    <div style={{
      background: "linear-gradient(135deg, #0a1628, #1a2d50)",
      borderRadius: 16,
      padding: 24,
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -60, right: -60,
        width: 200, height: 200,
        background: "radial-gradient(circle, rgba(200,151,62,0.15), transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
      }}>
        <span style={{ fontSize: 22 }}>🔍</span>
        <span style={{
          fontSize: 18, fontWeight: 700, fontFamily: "'Tajawal', sans-serif",
        }}>نتيجة التحليل الذكي</span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 12,
      }}>
        <InfoCard label="نوع المشروع" value={result.projectType} />
        <InfoCard label="المساحة" value={typeof result.area === "number" ? `${result.area} م²` : result.area} />
        <InfoCard label="عدد الطوابق" value={result.floors} />
        <InfoCard label="بنود BOQ" value={result.boqItems.length} />
      </div>

      <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {cats.filter(Boolean).map((c, i) => (
          <span key={i} style={{
            padding: "6px 14px",
            background: "rgba(200,151,62,0.2)",
            border: "1px solid rgba(200,151,62,0.4)",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "'Tajawal', sans-serif",
            color: "#e8c068",
          }}>
            {c.icon} {c.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.06)",
      borderRadius: 10,
      padding: "12px 16px",
      border: "1px solid rgba(255,255,255,0.08)",
    }}>
      <div style={{
        fontSize: 11, color: "#8896a8", fontFamily: "'Tajawal', sans-serif", marginBottom: 4,
      }}>{label}</div>
      <div style={{
        fontSize: 18, fontWeight: 800, color: "#c8973e", fontFamily: "'Tajawal', sans-serif",
      }}>{value}</div>
    </div>
  );
}

function BOQTable({ items, onUpdateItem }) {
  const [filter, setFilter] = useState("all");
  const categories = [...new Set(items.map((i) => i.category))];
  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);

  const groupedItems = {};
  filtered.forEach((item) => {
    if (!groupedItems[item.categoryName]) groupedItems[item.categoryName] = [];
    groupedItems[item.categoryName].push(item);
  });

  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 2px 20px rgba(10,22,40,0.06)",
      border: "1px solid #e8ecf2",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "20px 24px",
        borderBottom: "1px solid #f0f2f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>📊</span>
          <span style={{
            fontSize: 17, fontWeight: 700, color: "#0a1628",
            fontFamily: "'Tajawal', sans-serif",
          }}>جدول الكميات BOQ</span>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")} label="الكل" />
          {categories.map((c) => (
            <FilterChip
              key={c}
              active={filter === c}
              onClick={() => setFilter(c)}
              label={`${CATEGORIES[c]?.icon || ""} ${CATEGORIES[c]?.name || c}`}
            />
          ))}
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "'Tajawal', sans-serif",
        }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["#", "البند", "الوحدة", "الكمية", "سعر الوحدة (ر.س)", "الإجمالي (ر.س)"].map((h, i) => (
                <th key={i} style={{
                  padding: "12px 16px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#6b7a8d",
                  textAlign: i > 2 ? "center" : "right",
                  borderBottom: "2px solid #e8ecf2",
                  whiteSpace: "nowrap",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedItems).map(([catName, catItems]) => (
              <>
                <tr key={`cat-${catName}`}>
                  <td colSpan={6} style={{
                    padding: "10px 16px",
                    background: "linear-gradient(90deg, #f0f4f8, #f8fafc)",
                    fontWeight: 800,
                    fontSize: 14,
                    color: "#0a1628",
                    borderBottom: "1px solid #e8ecf2",
                  }}>{catName}</td>
                </tr>
                {catItems.map((item, idx) => (
                  <tr key={item.id} style={{
                    borderBottom: "1px solid #f0f2f5",
                    transition: "background 0.15s",
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#fafbfc"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "10px 16px", fontSize: 12, color: "#8896a8", width: 40 }}>
                      {idx + 1}
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: 13, fontWeight: 600, color: "#1a2d50" }}>
                      {item.name}
                    </td>
                    <td style={{
                      padding: "10px 16px", fontSize: 12, color: "#6b7a8d", textAlign: "center",
                    }}>
                      <span style={{
                        background: "#f0f4f8", padding: "3px 10px", borderRadius: 6,
                      }}>{item.unit}</span>
                    </td>
                    <td style={{ padding: "10px 8px", textAlign: "center" }}>
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => onUpdateItem(item.id, "qty", Number(e.target.value))}
                        style={{
                          width: 70, padding: "6px 8px", border: "1.5px solid #e0e5ed",
                          borderRadius: 8, textAlign: "center", fontSize: 13,
                          fontFamily: "'Tajawal', sans-serif", fontWeight: 600,
                          outline: "none", color: "#1a2d50",
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#c8973e"}
                        onBlur={(e) => e.target.style.borderColor = "#e0e5ed"}
                      />
                    </td>
                    <td style={{ padding: "10px 8px", textAlign: "center" }}>
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => onUpdateItem(item.id, "unitPrice", Number(e.target.value))}
                        style={{
                          width: 90, padding: "6px 8px", border: "1.5px solid #e0e5ed",
                          borderRadius: 8, textAlign: "center", fontSize: 13,
                          fontFamily: "'Tajawal', sans-serif", fontWeight: 600,
                          outline: "none", color: "#1a2d50",
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#c8973e"}
                        onBlur={(e) => e.target.style.borderColor = "#e0e5ed"}
                      />
                    </td>
                    <td style={{
                      padding: "10px 16px", textAlign: "center",
                      fontSize: 14, fontWeight: 800, color: "#0a1628",
                    }}>
                      {(item.qty * item.unitPrice).toLocaleString("ar-SA")}
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, label }) {
  return (
    <button onClick={onClick} style={{
      padding: "6px 14px",
      border: active ? "1.5px solid #c8973e" : "1.5px solid #e0e5ed",
      background: active ? "rgba(200,151,62,0.1)" : "#fff",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 600,
      color: active ? "#c8973e" : "#8896a8",
      cursor: "pointer",
      fontFamily: "'Tajawal', sans-serif",
      transition: "all 0.2s",
      whiteSpace: "nowrap",
    }}>{label}</button>
  );
}

function PricingSummary({ items, vatRate, margin, onVatChange, onMarginChange }) {
  const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const marginAmount = subtotal * (margin / 100);
  const totalBeforeVAT = subtotal + marginAmount;
  const vat = totalBeforeVAT * (vatRate / 100);
  const grandTotal = totalBeforeVAT + vat;

  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 2px 20px rgba(10,22,40,0.06)",
      border: "1px solid #e8ecf2",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "20px 24px",
        borderBottom: "1px solid #f0f2f5",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: 20 }}>💰</span>
        <span style={{
          fontSize: 17, fontWeight: 700, color: "#0a1628",
          fontFamily: "'Tajawal', sans-serif",
        }}>ملخص التسعير</span>
      </div>

      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 150 }}>
            <label style={{
              fontSize: 12, fontWeight: 600, color: "#6b7a8d",
              fontFamily: "'Tajawal', sans-serif", display: "block", marginBottom: 6,
            }}>نسبة الضريبة (VAT %)</label>
            <input
              type="number"
              value={vatRate}
              onChange={(e) => onVatChange(Number(e.target.value))}
              style={{
                width: "100%", padding: "10px 14px", border: "1.5px solid #e0e5ed",
                borderRadius: 10, fontSize: 14, fontFamily: "'Tajawal', sans-serif",
                fontWeight: 600, outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 150 }}>
            <label style={{
              fontSize: 12, fontWeight: 600, color: "#6b7a8d",
              fontFamily: "'Tajawal', sans-serif", display: "block", marginBottom: 6,
            }}>هامش الربح (%)</label>
            <input
              type="number"
              value={margin}
              onChange={(e) => onMarginChange(Number(e.target.value))}
              style={{
                width: "100%", padding: "10px 14px", border: "1.5px solid #e0e5ed",
                borderRadius: 10, fontSize: 14, fontFamily: "'Tajawal', sans-serif",
                fontWeight: 600, outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        <div style={{
          background: "#f8fafc",
          borderRadius: 12,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}>
          <PriceRow label="إجمالي البنود (قبل هامش الربح)" value={subtotal} />
          <PriceRow label={`هامش الربح (${margin}%)`} value={marginAmount} highlight />
          <div style={{
            borderTop: "1px dashed #d0d8e4", paddingTop: 12,
          }}>
            <PriceRow label="الإجمالي قبل الضريبة" value={totalBeforeVAT} bold />
          </div>
          <PriceRow label={`ضريبة القيمة المضافة (${vatRate}%)`} value={vat} />
          <div style={{
            borderTop: "2px solid #c8973e", paddingTop: 14, marginTop: 4,
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{
                fontSize: 18, fontWeight: 800, color: "#0a1628",
                fontFamily: "'Tajawal', sans-serif",
              }}>الإجمالي النهائي</span>
              <span style={{
                fontSize: 28, fontWeight: 900, color: "#c8973e",
                fontFamily: "'Tajawal', sans-serif",
              }}>{grandTotal.toLocaleString("ar-SA")} <span style={{ fontSize: 14 }}>ر.س</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PriceRow({ label, value, bold, highlight }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span style={{
        fontSize: bold ? 14 : 13,
        fontWeight: bold ? 700 : 500,
        color: highlight ? "#c8973e" : bold ? "#0a1628" : "#6b7a8d",
        fontFamily: "'Tajawal', sans-serif",
      }}>{label}</span>
      <span style={{
        fontSize: bold ? 16 : 14,
        fontWeight: bold ? 800 : 600,
        color: highlight ? "#c8973e" : "#1a2d50",
        fontFamily: "'Tajawal', sans-serif",
      }}>{value.toLocaleString("ar-SA")} ر.س</span>
    </div>
  );
}

function CategoryBreakdown({ items }) {
  const catTotals = {};
  items.forEach((item) => {
    if (!catTotals[item.categoryName]) catTotals[item.categoryName] = 0;
    catTotals[item.categoryName] += item.qty * item.unitPrice;
  });
  const total = Object.values(catTotals).reduce((s, v) => s + v, 0);
  const colors = ["#c8973e", "#1a2d50", "#4a90d9", "#e85d75", "#4ade80", "#a78bfa"];

  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 2px 20px rgba(10,22,40,0.06)",
      border: "1px solid #e8ecf2",
      padding: 24,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
      }}>
        <span style={{ fontSize: 20 }}>📈</span>
        <span style={{
          fontSize: 17, fontWeight: 700, color: "#0a1628",
          fontFamily: "'Tajawal', sans-serif",
        }}>توزيع التكاليف</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {Object.entries(catTotals).map(([name, val], i) => {
          const pct = total > 0 ? (val / total * 100) : 0;
          return (
            <div key={name}>
              <div style={{
                display: "flex", justifyContent: "space-between", marginBottom: 6,
              }}>
                <span style={{
                  fontSize: 13, fontWeight: 600, color: "#1a2d50",
                  fontFamily: "'Tajawal', sans-serif",
                }}>{name}</span>
                <span style={{
                  fontSize: 13, fontWeight: 700, color: colors[i % colors.length],
                  fontFamily: "'Tajawal', sans-serif",
                }}>{val.toLocaleString("ar-SA")} ر.س ({pct.toFixed(1)}%)</span>
              </div>
              <div style={{
                height: 8, background: "#f0f4f8", borderRadius: 4, overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, ${colors[i % colors.length]}, ${colors[i % colors.length]}dd)`,
                  borderRadius: 4,
                  transition: "width 0.8s ease",
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============== MAIN APP ==============
export default function App() {
  const [result, setResult] = useState(null);
  const [boqItems, setBoqItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vatRate, setVatRate] = useState(15);
  const [margin, setMargin] = useState(15);
  const [animateIn, setAnimateIn] = useState(false);
  const resultRef = useRef(null);

  const handleAnalyze = (text) => {
    setLoading(true);
    setAnimateIn(false);
    // Simulate AI processing
    setTimeout(() => {
      const analysis = analyzeRequest(text);
      setResult(analysis);
      setBoqItems(analysis.boqItems);
      setLoading(false);
      setTimeout(() => {
        setAnimateIn(true);
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 2000);
  };

  const handleUpdateItem = (id, field, value) => {
    setBoqItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, [field]: value, total: field === "qty" ? value * item.unitPrice : item.qty * value }
          : item
      )
    );
  };

  return (
    <div dir="rtl" style={{
      minHeight: "100vh",
      background: "#f4f6f9",
      fontFamily: "'Tajawal', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.5 } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeUp 0.5s ease forwards; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        ::-webkit-scrollbar { height: 6px; width: 6px; }
        ::-webkit-scrollbar-track { background: #f0f2f5; }
        ::-webkit-scrollbar-thumb { background: #c8973e; border-radius: 3px; }
      `}</style>

      <Header />

      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "28px 20px 60px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}>
        {/* Hero */}
        <div style={{
          textAlign: "center",
          padding: "8px 0 16px",
        }}>
          <h1 style={{
            fontSize: 28,
            fontWeight: 900,
            color: "#0a1628",
            fontFamily: "'Tajawal', sans-serif",
            marginBottom: 8,
          }}>
            نظام التسعير الذكي <span style={{ color: "#c8973e" }}>AI</span>
          </h1>
          <p style={{
            fontSize: 14,
            color: "#6b7a8d",
            fontFamily: "'Tajawal', sans-serif",
            maxWidth: 500,
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            أدخل وصف المشروع أو الطلب وسيقوم النظام تلقائياً بتحليله وإنشاء جدول الكميات (BOQ) والتسعير الكامل
          </p>
        </div>

        <InputSection onAnalyze={handleAnalyze} loading={loading} />

        {result && (
          <div
            ref={resultRef}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            <AnalysisSummary result={result} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <BOQTable items={boqItems} onUpdateItem={handleUpdateItem} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <PricingSummary
                  items={boqItems}
                  vatRate={vatRate}
                  margin={margin}
                  onVatChange={setVatRate}
                  onMarginChange={setMargin}
                />
                <CategoryBreakdown items={boqItems} />
              </div>
            </div>

            {/* Actions */}
            <div style={{
              display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap",
              padding: "8px 0",
            }}>
              {[
                { icon: "📄", label: "تصدير PDF", bg: "#0a1628" },
                { icon: "📊", label: "تصدير Excel", bg: "#1a7a3a" },
                { icon: "🖨️", label: "طباعة", bg: "#4a5568" },
                { icon: "📧", label: "إرسال للعميل", bg: "#c8973e" },
              ].map((btn, i) => (
                <button key={i} style={{
                  padding: "10px 24px",
                  background: btn.bg,
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Tajawal', sans-serif",
                  display: "flex", alignItems: "center", gap: 8,
                  transition: "transform 0.2s",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  {btn.icon} {btn.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
