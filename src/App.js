import { useState, useRef } from "react";

// ========== REAL PRICE DATABASE (from Odoo data) ==========
const PRICE_DB = {
  "security_control_room": {
    name: "Security Control Room - Equipment",
    nameAr: "غرفة التحكم الأمني - المعدات",
    icon: "🖥️",
    items: [
      { id: "SCR-001", name: "CCTV Management Client", nameAr: "جهاز إدارة كاميرات المراقبة", unit: "Each", unitAr: "عدد", price: 350 },
      { id: "SCR-002", name: "Management Client", nameAr: "جهاز إدارة النظام", unit: "Each", unitAr: "عدد", price: 350 },
      { id: "SCR-003", name: "Monitor", nameAr: "شاشة عرض", unit: "Each", unitAr: "عدد", price: 350 },
      { id: "SCR-004", name: "Joystick", nameAr: "ذراع تحكم", unit: "Each", unitAr: "عدد", price: 350 },
      { id: "SCR-005", name: "Badging Station", nameAr: "محطة إصدار البطاقات", unit: "Each", unitAr: "عدد", price: 350 },
      { id: "SCR-006", name: "Workstation - Badging", nameAr: "محطة عمل البطاقات", unit: "Each", unitAr: "عدد", price: 350 },
      { id: "SCR-007", name: "ID Camera", nameAr: "كاميرا تعريف", unit: "Each", unitAr: "عدد", price: 350 },
      { id: "SCR-008", name: "Card Reader", nameAr: "قارئ بطاقات", unit: "Each", unitAr: "عدد", price: 800 },
      { id: "SCR-009", name: "Redundant Management Server", nameAr: "سيرفر إدارة احتياطي", unit: "Each", unitAr: "عدد", price: 350 },
      { id: "SCR-010", name: "NVR", nameAr: "جهاز تسجيل شبكي", unit: "Each", unitAr: "عدد", price: 300 },
      { id: "SCR-011", name: "Storage Unit 128 TB with Spare", nameAr: "وحدة تخزين 128 تيرا مع قطع غيار", unit: "Each", unitAr: "عدد", price: 500 },
    ]
  },
  "cctv_system": {
    name: "CCTV System",
    nameAr: "نظام كاميرات المراقبة",
    icon: "📹",
    items: [
      { id: "CCTV-001", name: "Outdoor PTZ Camera Wall Mount", nameAr: "كاميرا خارجية متحركة PTZ", unit: "Each", unitAr: "عدد", price: 1700 },
      { id: "CCTV-002", name: "8M Pole Installation only", nameAr: "تركيب عامود 8 متر", unit: "Each", unitAr: "عدد", price: 2000 },
      { id: "CCTV-003", name: "Outdoor Fixed Box Camera", nameAr: "كاميرا خارجية ثابتة", unit: "Each", unitAr: "عدد", price: 1000 },
      { id: "CCTV-004", name: "5M Pole Installation only", nameAr: "تركيب عامود 5 متر", unit: "Each", unitAr: "عدد", price: 750 },
      { id: "CCTV-005", name: "Indoor Fixed Dome Camera Ceiling Mount", nameAr: "كاميرا داخلية ثابتة سقفية", unit: "Each", unitAr: "عدد", price: 750 },
      { id: "CCTV-006", name: "Indoor Fixed Dome Camera Wall Mount", nameAr: "كاميرا داخلية ثابتة جدارية", unit: "Each", unitAr: "عدد", price: 750 },
      { id: "CCTV-007", name: "Camera Junction Box", nameAr: "صندوق توصيل كاميرا", unit: "Each", unitAr: "عدد", price: 150 },
    ]
  },
  "access_control": {
    name: "ACCESS Control System",
    nameAr: "نظام التحكم بالدخول",
    icon: "🔐",
    items: [
      { id: "ACS-001", name: "Advanced Central Controller", nameAr: "وحدة تحكم مركزية متقدمة", unit: "Each", unitAr: "عدد", price: 1000 },
      { id: "ACS-002", name: "ACC Enclosure with PSU", nameAr: "خزانة تحكم مع مزود طاقة", unit: "Each", unitAr: "عدد", price: 300 },
      { id: "ACS-003", name: "Single Reader Interface", nameAr: "واجهة قارئ مفرد", unit: "Each", unitAr: "عدد", price: 1000 },
      { id: "ACS-004", name: "SRI Enclosure with PSU", nameAr: "خزانة SRI مع مزود طاقة", unit: "Each", unitAr: "عدد", price: 300 },
      { id: "ACS-005", name: "Dual Reader Interface", nameAr: "واجهة قارئ مزدوج", unit: "Each", unitAr: "عدد", price: 1000 },
      { id: "ACS-006", name: "DRI Enclosure with PSU", nameAr: "خزانة DRI مع مزود طاقة", unit: "Each", unitAr: "عدد", price: 300 },
      { id: "ACS-007", name: "Eight Reader Interface", nameAr: "واجهة 8 قارئات", unit: "Each", unitAr: "عدد", price: 1000 },
      { id: "ACS-008", name: "ERI Enclosure with PSU", nameAr: "خزانة ERI مع مزود طاقة", unit: "Each", unitAr: "عدد", price: 300 },
      { id: "ACS-009", name: "Card Reader", nameAr: "قارئ بطاقات", unit: "Each", unitAr: "عدد", price: 1200 },
      { id: "ACS-010", name: "1M Poles for RFID readers", nameAr: "أعمدة 1 متر لقارئات RFID", unit: "Each", unitAr: "عدد", price: 1500 },
      { id: "ACS-011", name: "Electromagnetic Lock", nameAr: "قفل كهرومغناطيسي", unit: "Each", unitAr: "عدد", price: 1000 },
      { id: "ACS-012", name: "Break Glass Unit", nameAr: "وحدة كسر الزجاج", unit: "Each", unitAr: "عدد", price: 850 },
      { id: "ACS-013", name: "REX", nameAr: "زر خروج طوارئ", unit: "Each", unitAr: "عدد", price: 850 },
      { id: "ACS-014", name: "Door Contact", nameAr: "حساس باب", unit: "Each", unitAr: "عدد", price: 850 },
      { id: "ACS-015", name: "Suprema (Fingerprint)", nameAr: "جهاز بصمة سوبريما", unit: "Each", unitAr: "عدد", price: 900 },
      { id: "ACS-016", name: "Magnetic Lock", nameAr: "قفل مغناطيسي", unit: "Each", unitAr: "عدد", price: 600 },
      { id: "ACS-017", name: "Normal Reader", nameAr: "قارئ عادي", unit: "Each", unitAr: "عدد", price: 600 },
      { id: "ACS-018", name: "Pushbutton", nameAr: "زر ضغط", unit: "Each", unitAr: "عدد", price: 600 },
      { id: "ACS-019", name: "K32 Controller", nameAr: "كنترولر K32", unit: "Each", unitAr: "عدد", price: 900 },
    ]
  },
  "intercom": {
    name: "Intercom System",
    nameAr: "نظام الاتصال الداخلي",
    icon: "📞",
    items: [
      { id: "INT-001", name: "IP Desk / Wall Master Station", nameAr: "محطة رئيسية IP مكتبية/جدارية", unit: "Each", unitAr: "عدد", price: 1400 },
      { id: "INT-002", name: "Wall Bracket for Desktop", nameAr: "حامل جداري", unit: "Each", unitAr: "عدد", price: 200 },
      { id: "INT-003", name: "Intercom Sub Station", nameAr: "محطة فرعية انتركم", unit: "Each", unitAr: "عدد", price: 1000 },
    ]
  },
  "fire_alarm": {
    name: "Fire Alarm System",
    nameAr: "نظام إنذار الحريق",
    icon: "🔥",
    items: [
      { id: "FA-001", name: "Fire Alarm Control Panel", nameAr: "لوحة تحكم إنذار حريق", unit: "Each", unitAr: "عدد", price: 5000 },
      { id: "FA-002", name: "Smoke Detector", nameAr: "كاشف دخان", unit: "Each", unitAr: "عدد", price: 300 },
      { id: "FA-003", name: "Heat Detector", nameAr: "كاشف حرارة", unit: "Each", unitAr: "عدد", price: 280 },
      { id: "FA-004", name: "Manual Call Point", nameAr: "نقطة استدعاء يدوية", unit: "Each", unitAr: "عدد", price: 250 },
      { id: "FA-005", name: "Sounder / Strobe", nameAr: "صافرة / ضوء وامض", unit: "Each", unitAr: "عدد", price: 350 },
    ]
  },
  "conduit_cable": {
    name: "Conduit & Cabling",
    nameAr: "المواسير والكابلات",
    icon: "🔌",
    items: [
      { id: "CC-001", name: "RGS Pipe Supply and Installation", nameAr: "توريد وتركيب مواسير RGS", unit: "Meter", unitAr: "م.ط", price: 90 },
      { id: "CC-002", name: "UTP BELDEN 7965E Cable", nameAr: "كابل UTP بلدن 7965E", unit: "Meter", unitAr: "م.ط", price: 12 },
      { id: "CC-003", name: "BELDEN 7940A Outdoor Cable", nameAr: "كابل بلدن خارجي 7940A", unit: "Meter", unitAr: "م.ط", price: 18 },
      { id: "CC-004", name: "Cat6 Cable Supply and Installation", nameAr: "توريد وتركيب كابل Cat6", unit: "Meter", unitAr: "م.ط", price: 15 },
      { id: "CC-005", name: "Fiber Optic Cable", nameAr: "كابل ألياف بصرية", unit: "Meter", unitAr: "م.ط", price: 25 },
      { id: "CC-006", name: "Conduit RGS 3/4 inch", nameAr: "كوندويت RGS 3/4 بوصة", unit: "Meter", unitAr: "م.ط", price: 45 },
    ]
  },
  "electrical": {
    name: "Electrical Works",
    nameAr: "الأعمال الكهربائية",
    icon: "⚡",
    items: [
      { id: "EL-001", name: "Main Distribution Board (MDB)", nameAr: "لوحة توزيع رئيسية", unit: "Each", unitAr: "عدد", price: 15000 },
      { id: "EL-002", name: "Sub Distribution Board (SDB)", nameAr: "لوحة توزيع فرعية", unit: "Each", unitAr: "عدد", price: 5000 },
      { id: "EL-003", name: "LED Light Fixture", nameAr: "وحدة إنارة LED", unit: "Each", unitAr: "عدد", price: 350 },
      { id: "EL-004", name: "Switch & Socket Point", nameAr: "نقطة مفتاح وفيش", unit: "Each", unitAr: "عدد", price: 150 },
      { id: "EL-005", name: "UPS System", nameAr: "نظام طاقة احتياطي UPS", unit: "Each", unitAr: "عدد", price: 8000 },
    ]
  },
};

// AI Matching
function matchItemFromDB(searchText) {
  const lower = searchText.toLowerCase().trim();
  let bestMatch = null, bestScore = 0;
  Object.entries(PRICE_DB).forEach(([catKey, cat]) => {
    cat.items.forEach(item => {
      const nL = item.name.toLowerCase();
      let score = 0;
      if (nL === lower) score = 100;
      else if (nL.includes(lower) || lower.includes(nL)) score = 85;
      else {
        const words = lower.split(/\s+/);
        const matched = words.filter(w => w.length > 2 && nL.includes(w));
        score = words.length > 0 ? (matched.length / words.length) * 70 : 0;
      }
      if (score > bestScore) { bestScore = score; bestMatch = { ...item, category: catKey, categoryName: cat.name, matchScore: score }; }
    });
  });
  return bestScore >= 25 ? bestMatch : null;
}

function analyzeAndPrice(text) {
  const lines = text.split(/\n/).filter(l => l.trim());
  const sections = [];
  let cur = { name: "General", items: [] };

  // Step 1: Detect if this is structured CSV/Excel data with headers
  const headerPatterns = [
    /item\s*(description|part|no)/i,
    /description.*unit.*qty/i,
    /ITEM.*Part\s*No/i,
    /qty.*unit\s*price/i,
    /الوصف.*الكمية/,
  ];
  
  let hasHeaders = false;
  let headerLineIdx = -1;
  let colMap = { item: -1, partNo: -1, desc: -1, unit: -1, qty: -1, unitPrice: -1, totalPrice: -1, remarks: -1 };

  // Find header row and map columns
  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    if (headerPatterns.some(p => p.test(lines[i]))) {
      hasHeaders = true;
      headerLineIdx = i;
      const cols = lines[i].split(",").map(c => c.trim().toLowerCase());
      cols.forEach((c, idx) => {
        if (/^item$|^#$|^رقم/.test(c)) colMap.item = idx;
        else if (/part\s*no|item\s*part|رقم القطعة/.test(c)) colMap.partNo = idx;
        else if (/desc|الوصف|item\s*desc/.test(c)) colMap.desc = idx;
        else if (/^unit$|الوحدة|وحدة/.test(c)) colMap.unit = idx;
        else if (/^qty$|الكمية|quantity/.test(c)) colMap.qty = idx;
        else if (/unit\s*price|سعر الوحدة/.test(c)) colMap.unitPrice = idx;
        else if (/total\s*price|الإجمالي|amount/.test(c)) colMap.totalPrice = idx;
        else if (/remark|ملاحظ/.test(c)) colMap.remarks = idx;
      });
      break;
    }
  }

  // Step 2: Parse lines
  const startLine = hasHeaders ? headerLineIdx + 1 : 0;

  for (let i = startLine; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!l || /^[\s,]+$/.test(l)) continue;

    // Skip summary/total rows
    if (/^total|^المجموع|^الإجمالي/i.test(l)) continue;

    const parts = l.split(",").map(p => p.trim());

    // Detect section headers: "Scope:" lines or all-caps text
    if (/^scope\s*:/i.test(l) || (/^[A-Z][A-Z\s&\-\/]{4,}$/.test(parts[0] || "") && !parts[1]) ||
        (parts.length <= 2 && !parts.some(p => /^\d+\.?\d*$/.test(p)) && (parts[0]||"").length > 5 && !/^\d/.test(parts[0]||""))) {
      if (cur.items.length > 0) sections.push(cur);
      const sectionName = l.replace(/^scope\s*:\s*/i, "").replace(/,+/g, " ").trim();
      if (sectionName.length > 2) cur = { name: sectionName, items: [] };
      continue;
    }

    // Try structured parsing with column map
    if (hasHeaders && parts.length >= 3) {
      const descCol = colMap.desc >= 0 ? colMap.desc : (colMap.partNo >= 0 ? colMap.partNo + 1 : 2);
      const desc = (parts[descCol] || "").trim();
      
      // Skip sub-description lines (start with "- " and no item number)
      if (/^-\s/.test(desc) || /^-\s/.test(parts[0])) {
        // Append to previous item description if exists
        if (cur.items.length > 0) {
          cur.items[cur.items.length - 1].description += " | " + desc.replace(/^-\s*/, "");
        }
        continue;
      }

      const partNo = colMap.partNo >= 0 ? (parts[colMap.partNo] || "").trim() : "";
      const unit = colMap.unit >= 0 ? (parts[colMap.unit] || "Each").trim() : "Each";
      
      let qty = 1;
      if (colMap.qty >= 0) {
        const qVal = parseFloat(parts[colMap.qty]);
        if (!isNaN(qVal) && qVal > 0) qty = qVal;
      }

      let unitPrice = 0;
      if (colMap.unitPrice >= 0) {
        const pVal = parseFloat((parts[colMap.unitPrice] || "").replace(/[^0-9.]/g, ""));
        if (!isNaN(pVal)) unitPrice = pVal;
      }

      // Skip empty/header-like rows
      if (!desc || desc.length < 2 || /^item$|^ITEM$/i.test(desc)) continue;
      // Skip currency label rows
      if (/^BHD|^SAR|^USD/i.test(desc)) continue;

      const match = matchItemFromDB(desc);
      const displayDesc = partNo ? `${desc} (${partNo})` : desc;

      cur.items.push({
        id: `i-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        description: displayDesc,
        descriptionAr: match?.nameAr || "",
        qty: qty,
        unit: unit === "EA" ? "Each" : unit,
        unitPrice: unitPrice > 0 ? unitPrice : (match?.price || 0),
        matched: !!match,
        dbId: match?.id || null,
        partNo: partNo,
      });
    } else {
      // Fallback: unstructured text parsing
      if (/^[A-Z][A-Z\s&\-]{4,}$/.test(l) || /^(Security|CCTV|ACCESS|Intercom|Fire|PA |Conduit|Guard|Electrical)/i.test(l)) {
        if (cur.items.length > 0) sections.push(cur);
        cur = { name: l, items: [] };
        continue;
      }
      let desc = parts[0]?.replace(/^(Low Current|Electrical)\s*/i, "").trim() || l;
      let qty = 1;
      parts.forEach(p => { const n = parseFloat(p); if (!isNaN(n) && n > 0 && n < 100000 && p === String(n)) qty = n; });
      const match = matchItemFromDB(desc);
      if (desc.length > 2 && !/^[\d.]+$/.test(desc)) {
        cur.items.push({
          id: `i-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          description: desc, descriptionAr: match?.nameAr || "", qty,
          unit: match?.unit || "Each", unitPrice: match?.price || 0,
          matched: !!match, dbId: match?.id || null,
        });
      }
    }
  }
  if (cur.items.length > 0) sections.push(cur);

  // If no sections found, put all in General
  if (sections.length === 0 && cur.items.length === 0) {
    sections.push({ name: "General", items: [{ id: "empty", description: "لم يتم العثور على بنود - يرجى التأكد من صيغة الملف", descriptionAr: "", qty: 0, unit: "Each", unitPrice: 0, matched: false }] });
  }

  return { sections };
}

// ========== STYLES ==========
const S = { font: "'Tajawal', sans-serif", dark: "#0a1628", navy: "#1a2d50", gold: "#c8973e", goldLight: "#e8c068", bg: "#f3f5f8", white: "#fff", gray: "#7a8a9e", gl: "#e4e8ee", green: "#10b981", red: "#ef4444", blue: "#3b82f6" };

function Header({ activeTab, setActiveTab }) {
  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${S.dark}, ${S.navy})`, padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `3px solid ${S.gold}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: `linear-gradient(135deg, ${S.gold}, ${S.goldLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, color: S.dark, fontFamily: S.font }}>EU</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", fontFamily: S.font }}>Excellency Union</div>
            <div style={{ fontSize: 10, color: S.gold, fontFamily: S.font, letterSpacing: 2 }}>AI PRICING SYSTEM V2</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(200,151,62,0.12)", padding: "5px 12px", borderRadius: 14, border: "1px solid rgba(200,151,62,0.25)" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: S.green, boxShadow: `0 0 6px ${S.green}` }} />
          <span style={{ fontSize: 11, color: S.gold, fontFamily: S.font }}>AI Active</span>
        </div>
      </div>
      <div style={{ background: S.white, borderBottom: `1px solid ${S.gl}`, display: "flex", padding: "0 24px" }}>
        {[{ id: "pricing", label: "تسعير جديد", icon: "🧮" }, { id: "database", label: "قاعدة الأسعار", icon: "💾" }, { id: "quotations", label: "عروض الأسعار", icon: "📋" }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "11px 20px", border: "none", background: "transparent",
            borderBottom: activeTab === tab.id ? `3px solid ${S.gold}` : "3px solid transparent",
            color: activeTab === tab.id ? S.gold : S.gray, fontWeight: activeTab === tab.id ? 700 : 500,
            fontSize: 13, fontFamily: S.font, cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
          }}>{tab.icon} {tab.label}</button>
        ))}
      </div>
    </div>
  );
}

function PricingTab() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [vatRate, setVatRate] = useState(15);
  const [margin, setMargin] = useState(0);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteInfo, setQuoteInfo] = useState({ number: `EXUQ-${new Date().toISOString().slice(0,10)}-001`, customer: "", project: "", pm: "", email: "", presales: "Eng. Khaled S. Shakour" });
  const fileRef = useRef(null);
  const resRef = useRef(null);

  const [fileStatus, setFileStatus] = useState(""); // "", "loading", "done", "error"
  const [fileName, setFileName] = useState("");

  // Load external library via script tag
  const loadScript = (url) => new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${url}"]`);
    if (existing) { resolve(); return; }
    const s = document.createElement("script");
    s.src = url;
    s.onload = resolve;
    s.onerror = () => reject(new Error("فشل تحميل المكتبة"));
    document.head.appendChild(s);
  });

  const handleFileUpload = async (file) => {
    if (!file) return;
    const name = file.name.toLowerCase();
    setFileName(file.name);
    setFileStatus("loading");
    setInputText("");

    try {
      const reader = new FileReader();
      
      if (name.endsWith(".csv") || name.endsWith(".txt") || name.endsWith(".md")) {
        reader.onload = (ev) => { setInputText(ev.target.result); setFileStatus("done"); };
        reader.readAsText(file, "UTF-8");
      }
      else if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
        reader.onload = async (ev) => {
          try {
            await loadScript("https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js");
            const X = window.XLSX;
            const wb = X.read(new Uint8Array(ev.target.result), { type: "array" });
            let t = "";
            wb.SheetNames.forEach(s => { t += X.utils.sheet_to_csv(wb.Sheets[s]) + "\n"; });
            setInputText(t);
            setFileStatus("done");
          } catch (err) { setFileStatus("error"); alert("خطأ في قراءة Excel: " + err.message); }
        };
        reader.readAsArrayBuffer(file);
      }
      else if (name.endsWith(".pdf")) {
        reader.onload = async (ev) => {
          try {
            await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js");
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
            const pdf = await window.pdfjsLib.getDocument({ data: new Uint8Array(ev.target.result) }).promise;
            let allText = "";
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const content = await page.getTextContent();
              allText += content.items.map(item => item.str).join(" ") + "\n";
            }
            setInputText(allText);
            setFileStatus("done");
          } catch (err) { setFileStatus("error"); alert("خطأ في قراءة PDF: " + err.message); }
        };
        reader.readAsArrayBuffer(file);
      }
      else if (name.endsWith(".docx")) {
        reader.onload = async (ev) => {
          try {
            await loadScript("https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js");
            const result = await window.mammoth.extractRawText({ arrayBuffer: ev.target.result });
            setInputText(result.value);
            setFileStatus("done");
          } catch (err) { setFileStatus("error"); alert("خطأ في قراءة Word: " + err.message); }
        };
        reader.readAsArrayBuffer(file);
      }
      else {
        // Try reading as text for any other file
        reader.onload = (ev) => { setInputText(ev.target.result); setFileStatus("done"); };
        reader.readAsText(file, "UTF-8");
      }
    } catch (err) {
      setFileStatus("error");
      alert("خطأ: " + err.message);
    }
  };

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setTimeout(() => { setResult(analyzeAndPrice(inputText)); setLoading(false); setTimeout(() => resRef.current?.scrollIntoView({ behavior: "smooth" }), 200); }, 1500);
  };

  const updateItem = (sI, iI, field, val) => setResult(p => { const n = JSON.parse(JSON.stringify(p)); n.sections[sI].items[iI][field] = val; return n; });
  const addItem = (sI) => setResult(p => { const n = JSON.parse(JSON.stringify(p)); n.sections[sI].items.push({ id: `n-${Date.now()}`, description: "", descriptionAr: "", qty: 1, unit: "Each", unitPrice: 0, matched: false }); return n; });
  const removeItem = (sI, iI) => setResult(p => { const n = JSON.parse(JSON.stringify(p)); n.sections[sI].items.splice(iI, 1); return n; });
  const addSection = () => setResult(p => { const n = JSON.parse(JSON.stringify(p)); n.sections.push({ name: "New Section", items: [] }); return n; });

  const totals = (() => {
    if (!result) return { sub: 0, mar: 0, bv: 0, vat: 0, total: 0 };
    const sub = result.sections.reduce((s, sec) => s + sec.items.reduce((a, i) => a + i.qty * i.unitPrice, 0), 0);
    const mar = sub * margin / 100; const bv = sub + mar; const v = bv * vatRate / 100;
    return { sub, mar, bv, vat: v, total: bv + v };
  })();

  const getFileIcon = (n) => {
    if (!n) return "📄";
    const ext = n.split(".").pop().toLowerCase();
    if (ext === "pdf") return "📕";
    if (["xlsx", "xls", "csv"].includes(ext)) return "📊";
    if (["docx", "doc"].includes(ext)) return "📘";
    return "📄";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Input */}
      <div style={{ background: S.white, borderRadius: 12, border: `1px solid ${S.gl}`, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${S.gl}`, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>📥</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: S.dark, fontFamily: S.font }}>إدخال BOQ أو وصف المشروع</span>
        </div>
        <div style={{ padding: 18 }}>
          <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv,.txt,.pdf,.docx,.doc,.md" style={{ display: "none" }} onChange={e => {
            handleFileUpload(e.target.files?.[0]);
            e.target.value = "";
          }} />
          
          {/* File upload area */}
          <div style={{ marginBottom: 14 }}>
            <div onClick={() => fileRef.current?.click()} style={{
              border: `2px dashed ${fileStatus === "done" ? S.green : S.gl}`,
              borderRadius: 10, padding: fileStatus ? "12px 16px" : "24px 16px",
              textAlign: "center", cursor: "pointer", transition: "all 0.2s",
              background: fileStatus === "done" ? "#f0faf1" : fileStatus === "loading" ? "#fffbf0" : "#f9fafb",
            }}>
              {fileStatus === "loading" ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <div style={{ width: 18, height: 18, border: `2px solid ${S.gold}40`, borderTopColor: S.gold, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: S.gold, fontFamily: S.font }}>جاري قراءة {fileName}...</span>
                </div>
              ) : fileStatus === "done" ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{getFileIcon(fileName)}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: S.green, fontFamily: S.font }}>✅ تم قراءة {fileName}</span>
                  <button onClick={(e) => { e.stopPropagation(); setFileStatus(""); setFileName(""); setInputText(""); }}
                    style={{ padding: "3px 10px", background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 6, color: S.red, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: S.font }}>✕</button>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>📎</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: S.dark, fontFamily: S.font }}>اسحب الملف أو اضغط للرفع</div>
                  <div style={{ fontSize: 11, color: S.gray, marginTop: 4, fontFamily: S.font, display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
                    {["PDF", "Excel", "Word", "CSV", "TXT"].map(t => (
                      <span key={t} style={{ padding: "2px 8px", background: `${S.dark}06`, borderRadius: 4, fontSize: 10, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <textarea value={inputText} onChange={e => setInputText(e.target.value)} dir="rtl"
            placeholder={`الصق BOQ أو اكتب وصف المشروع...

مثال BOQ:
Outdoor PTZ Camera	4	Each	1700
Card Reader	40	Each	1200
Electromagnetic Lock	34	Each

مثال نص حر:
نظام كاميرات CCTV مع Access Control لمبنى إداري`}
            style={{ width: "100%", minHeight: 140, border: `1.5px solid ${S.gl}`, borderRadius: 10, padding: 12, fontSize: 13, lineHeight: 1.8, fontFamily: S.font, color: S.dark, resize: "vertical", outline: "none", boxSizing: "border-box" }}
            onFocus={e => e.target.style.borderColor = S.gold} onBlur={e => e.target.style.borderColor = S.gl} />
          <button onClick={handleAnalyze} disabled={!inputText.trim() || loading} style={{
            marginTop: 12, width: "100%", padding: "12px", background: inputText.trim() && !loading ? `linear-gradient(135deg, ${S.dark}, ${S.navy})` : "#d0d5de",
            color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: S.font,
            cursor: inputText.trim() && !loading ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            {loading ? <><div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />جاري التحليل...</> : "🤖 تحليل وتسعير"}
          </button>
        </div>
      </div>

      {result && (
        <div ref={resRef} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 10 }}>
            {[{ l: "الأقسام", v: result.sections.length, i: "📂" }, { l: "البنود", v: result.sections.reduce((s, c) => s + c.items.length, 0), i: "📝" },
              { l: "مطابق من قاعدة الأسعار", v: result.sections.reduce((s, c) => s + c.items.filter(i => i.matched).length, 0), i: "✅", c: S.green },
              { l: "الإجمالي شامل الضريبة", v: `${totals.total.toLocaleString()} ر.س`, i: "💰", c: S.gold },
            ].map((card, i) => (
              <div key={i} style={{ background: S.white, borderRadius: 10, padding: "12px 16px", border: `1px solid ${S.gl}` }}>
                <div style={{ fontSize: 10, color: S.gray, fontFamily: S.font }}>{card.i} {card.l}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: card.c || S.dark, fontFamily: S.font, marginTop: 2 }}>{card.v}</div>
              </div>
            ))}
          </div>

          {/* BOQ Table */}
          <div style={{ background: S.white, borderRadius: 12, border: `1px solid ${S.gl}`, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${S.gl}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: S.dark, fontFamily: S.font }}>📊 جدول الكميات والتسعير</span>
              <button onClick={addSection} style={{ padding: "5px 12px", background: `${S.gold}15`, border: `1px solid ${S.gold}40`, borderRadius: 6, color: S.gold, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: S.font }}>+ قسم</button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: S.font, minWidth: 700 }}>
                <thead>
                  <tr style={{ background: "#f7f8fa" }}>
                    {["#", "الوصف", "الكمية", "الوحدة", "سعر الوحدة", "الإجمالي", "حالة", ""].map((h, i) => (
                      <th key={i} style={{ padding: "9px 10px", fontSize: 10, fontWeight: 700, color: S.gray, textAlign: i > 1 ? "center" : "right", borderBottom: `2px solid ${S.gl}`, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.sections.map((sec, sI) => (
                    <>{/* Section header */}
                      <tr key={`s-${sI}`}><td colSpan={8} style={{ padding: "9px 14px", background: `${S.dark}05`, borderBottom: `1px solid ${S.gl}`, borderTop: sI > 0 ? `2px solid ${S.gl}` : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <input value={sec.name} onChange={e => setResult(p => { const n = JSON.parse(JSON.stringify(p)); n.sections[sI].name = e.target.value; return n; })}
                            style={{ border: "none", background: "transparent", fontSize: 13, fontWeight: 800, color: S.dark, fontFamily: S.font, outline: "none", flex: 1 }} />
                          <button onClick={() => addItem(sI)} style={{ padding: "3px 10px", background: `${S.green}12`, border: `1px solid ${S.green}30`, borderRadius: 5, color: S.green, fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: S.font }}>+ بند</button>
                        </div>
                      </td></tr>
                      {sec.items.map((item, iI) => (
                        <tr key={item.id} style={{ borderBottom: "1px solid #f0f2f5" }}
                          onMouseEnter={e => e.currentTarget.style.background = "#fafbfc"} onMouseLeave={e => e.currentTarget.style.background = ""}>
                          <td style={{ padding: "7px 10px", fontSize: 10, color: S.gray, width: 28 }}>{iI + 1}</td>
                          <td style={{ padding: "7px 8px", minWidth: 180 }}>
                            <input value={item.description} onChange={e => updateItem(sI, iI, "description", e.target.value)}
                              style={{ width: "100%", border: "none", background: "transparent", fontSize: 12, fontWeight: 600, color: S.dark, fontFamily: S.font, outline: "none" }} />
                            {item.descriptionAr && <div style={{ fontSize: 10, color: S.gray, marginTop: 1 }}>{item.descriptionAr}</div>}
                          </td>
                          <td style={{ padding: "7px 4px", textAlign: "center", width: 60 }}>
                            <input type="number" value={item.qty} onChange={e => updateItem(sI, iI, "qty", Number(e.target.value))}
                              style={{ width: 50, padding: "4px 5px", border: `1px solid ${S.gl}`, borderRadius: 5, textAlign: "center", fontSize: 12, fontFamily: S.font, fontWeight: 600, outline: "none" }} />
                          </td>
                          <td style={{ padding: "7px 4px", textAlign: "center", width: 65 }}>
                            <select value={item.unit} onChange={e => updateItem(sI, iI, "unit", e.target.value)}
                              style={{ padding: "4px 3px", border: `1px solid ${S.gl}`, borderRadius: 5, fontSize: 10, fontFamily: S.font, outline: "none" }}>
                              {["Each", "Meter", "Set", "Lot"].map(u => <option key={u}>{u}</option>)}
                            </select>
                          </td>
                          <td style={{ padding: "7px 4px", textAlign: "center", width: 80 }}>
                            <input type="number" value={item.unitPrice} onChange={e => updateItem(sI, iI, "unitPrice", Number(e.target.value))}
                              style={{ width: 68, padding: "4px 5px", border: `1px solid ${S.gl}`, borderRadius: 5, textAlign: "center", fontSize: 12, fontFamily: S.font, fontWeight: 600, outline: "none", color: item.unitPrice === 0 ? S.red : S.dark }} />
                          </td>
                          <td style={{ padding: "7px 8px", textAlign: "center", fontSize: 12, fontWeight: 800, color: S.dark }}>{(item.qty * item.unitPrice).toLocaleString()}</td>
                          <td style={{ padding: "7px 4px", textAlign: "center" }}>
                            <span style={{ padding: "2px 7px", borderRadius: 8, fontSize: 9, fontWeight: 600, fontFamily: S.font,
                              background: item.matched ? S.green + "15" : item.unitPrice > 0 ? S.gold + "15" : S.red + "15",
                              color: item.matched ? S.green : item.unitPrice > 0 ? S.gold : S.red }}>
                              {item.matched ? "✓ DB" : item.unitPrice > 0 ? "يدوي" : "⚠"}
                            </span>
                          </td>
                          <td style={{ padding: "7px 8px 7px 4px", width: 24 }}>
                            <button onClick={() => removeItem(sI, iI)} style={{ background: "none", border: "none", color: "#ddd", cursor: "pointer", fontSize: 14 }}
                              onMouseEnter={e => e.target.style.color = S.red} onMouseLeave={e => e.target.style.color = "#ddd"}>×</button>
                          </td>
                        </tr>
                      ))}
                      <tr><td colSpan={5} style={{ padding: "7px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: S.navy, fontFamily: S.font, background: "#f9fafb" }}>إجمالي {sec.name}</td>
                        <td style={{ padding: "7px 8px", textAlign: "center", fontSize: 12, fontWeight: 800, color: S.gold, background: "#f9fafb" }}>{sec.items.reduce((s, i) => s + i.qty * i.unitPrice, 0).toLocaleString()}</td>
                        <td colSpan={2} style={{ background: "#f9fafb" }} /></tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals & Actions */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 14 }}>
            <div style={{ background: S.white, borderRadius: 12, border: `1px solid ${S.gl}`, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: S.dark, fontFamily: S.font, marginBottom: 12 }}>⚡ إضافة سريعة من قاعدة الأسعار</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {Object.entries(PRICE_DB).map(([k, c]) => (
                  <details key={k} style={{ width: "100%" }}>
                    <summary style={{ padding: "6px 10px", background: `${S.dark}06`, borderRadius: 6, fontSize: 11, fontWeight: 600, color: S.navy, fontFamily: S.font, cursor: "pointer", listStyle: "none" }}>
                      {c.icon} {c.name} ({c.items.length})
                    </summary>
                    <div style={{ padding: "6px 0 6px 12px", display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {c.items.map(item => (
                        <button key={item.id} onClick={() => {
                          if (!result) return;
                          const sI = result.sections.length - 1;
                          setResult(p => {
                            const n = JSON.parse(JSON.stringify(p));
                            n.sections[sI >= 0 ? sI : 0].items.push({
                              id: `db-${Date.now()}`, description: item.name, descriptionAr: item.nameAr,
                              qty: 1, unit: item.unit, unitPrice: item.price, matched: true, dbId: item.id,
                            });
                            return n;
                          });
                        }} style={{ padding: "4px 8px", background: S.white, border: `1px solid ${S.gl}`, borderRadius: 5, fontSize: 10, color: S.dark, fontFamily: S.font, cursor: "pointer" }}
                          onMouseEnter={e => { e.target.style.borderColor = S.gold; e.target.style.color = S.gold; }}
                          onMouseLeave={e => { e.target.style.borderColor = S.gl; e.target.style.color = S.dark; }}>
                          {item.name} <span style={{ color: S.gold, fontWeight: 700 }}>{item.price}</span>
                        </button>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div style={{ background: S.white, borderRadius: 12, border: `1px solid ${S.gl}`, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: S.dark, fontFamily: S.font, marginBottom: 12 }}>💰 ملخص التسعير</div>
              {[{ l: "إجمالي البنود", v: totals.sub }, { l: `هامش الربح (${margin}%)`, v: totals.mar, c: S.gold }].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: r.c || S.gray, fontFamily: S.font, marginBottom: 8 }}>
                  <span>{r.l}</span><span style={{ fontWeight: 700, color: r.c || S.dark }}>{r.v.toLocaleString()} ر.س</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                <div style={{ flex: 1 }}><label style={{ fontSize: 10, color: S.gray, fontFamily: S.font }}>هامش %</label>
                  <input type="number" value={margin} onChange={e => setMargin(Number(e.target.value))} style={{ width: "100%", padding: "5px", border: `1px solid ${S.gl}`, borderRadius: 5, fontSize: 12, fontFamily: S.font, outline: "none", textAlign: "center" }} />
                </div>
                <div style={{ flex: 1 }}><label style={{ fontSize: 10, color: S.gray, fontFamily: S.font }}>VAT %</label>
                  <input type="number" value={vatRate} onChange={e => setVatRate(Number(e.target.value))} style={{ width: "100%", padding: "5px", border: `1px solid ${S.gl}`, borderRadius: 5, fontSize: 12, fontFamily: S.font, outline: "none", textAlign: "center" }} />
                </div>
              </div>
              <div style={{ borderTop: `1px dashed ${S.gl}`, paddingTop: 8, marginBottom: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontFamily: S.font }}><span style={{ fontWeight: 700 }}>قبل الضريبة</span><span style={{ fontWeight: 800 }}>{totals.bv.toLocaleString()}</span></div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: S.gray, fontFamily: S.font, marginBottom: 8 }}><span>VAT {vatRate}%</span><span>{totals.vat.toLocaleString()}</span></div>
              <div style={{ borderTop: `2px solid ${S.gold}`, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 800, fontFamily: S.font }}>الإجمالي</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: S.gold, fontFamily: S.font }}>{totals.total.toLocaleString()} <span style={{ fontSize: 11 }}>ر.س</span></span>
              </div>
              <button onClick={() => setShowQuoteForm(true)} style={{ marginTop: 14, width: "100%", padding: "10px", background: `linear-gradient(135deg, ${S.gold}, ${S.goldLight})`, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, fontFamily: S.font, cursor: "pointer" }}>📄 إنشاء عرض سعر</button>
            </div>
          </div>
        </div>
      )}

      {showQuoteForm && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={() => setShowQuoteForm(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: S.white, borderRadius: 14, padding: 24, width: "90%", maxWidth: 550, maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: S.dark, fontFamily: S.font, marginBottom: 16 }}>📋 بيانات عرض السعر</div>
            {[{ k: "number", l: "رقم العرض" }, { k: "customer", l: "العميل" }, { k: "project", l: "المشروع" }, { k: "pm", l: "مدير المشروع" }, { k: "email", l: "الإيميل" }, { k: "presales", l: "Presales" }].map(f => (
              <div key={f.k} style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: S.gray, fontFamily: S.font, display: "block", marginBottom: 3 }}>{f.l}</label>
                <input value={quoteInfo[f.k]} onChange={e => setQuoteInfo(p => ({ ...p, [f.k]: e.target.value }))}
                  style={{ width: "100%", padding: "7px 10px", border: `1px solid ${S.gl}`, borderRadius: 7, fontSize: 12, fontFamily: S.font, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button onClick={() => setShowQuoteForm(false)} style={{ flex: 1, padding: "9px", background: S.gl, border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, fontFamily: S.font, cursor: "pointer", color: S.gray }}>إلغاء</button>
              <button style={{ flex: 2, padding: "9px", background: `linear-gradient(135deg, ${S.dark}, ${S.navy})`, color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 700, fontFamily: S.font, cursor: "pointer" }}>📄 تصدير PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DatabaseTab() {
  const [search, setSearch] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: S.white, borderRadius: 10, border: `1px solid ${S.gl}`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
        <span>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث عن منتج..." dir="rtl"
          style={{ flex: 1, border: "none", outline: "none", fontSize: 13, fontFamily: S.font }} />
        <span style={{ fontSize: 11, color: S.gray, fontFamily: S.font }}>{Object.values(PRICE_DB).reduce((s, c) => s + c.items.length, 0)} بند</span>
      </div>
      {Object.entries(PRICE_DB).map(([key, cat]) => {
        const items = cat.items.filter(i => !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.nameAr.includes(search));
        if (search && !items.length) return null;
        return (
          <div key={key} style={{ background: S.white, borderRadius: 10, border: `1px solid ${S.gl}`, overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", background: `${S.dark}05`, borderBottom: `1px solid ${S.gl}`, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: S.dark, fontFamily: S.font }}>{cat.icon} {cat.name}</span>
              <span style={{ fontSize: 11, color: S.gray, fontFamily: S.font }}>{items.length} بند</span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: S.font }}>
              <thead><tr style={{ background: "#f8f9fb" }}>
                {["الكود", "Description", "الوصف", "الوحدة", "السعر"].map((h, i) => (
                  <th key={i} style={{ padding: "7px 10px", fontSize: 10, fontWeight: 700, color: S.gray, textAlign: "right", borderBottom: `1px solid ${S.gl}` }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} style={{ borderBottom: "1px solid #f2f4f6" }}>
                    <td style={{ padding: "7px 10px", fontSize: 10, color: S.blue, fontWeight: 600 }}>{item.id}</td>
                    <td style={{ padding: "7px 10px", fontSize: 11, fontWeight: 600, color: S.dark }}>{item.name}</td>
                    <td style={{ padding: "7px 10px", fontSize: 11, color: S.navy }}>{item.nameAr}</td>
                    <td style={{ padding: "7px 10px", fontSize: 10, color: S.gray }}>{item.unit}</td>
                    <td style={{ padding: "7px 10px", fontSize: 12, fontWeight: 800, color: S.gold }}>{item.price.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

function QuotationsTab() {
  return (
    <div style={{ background: S.white, borderRadius: 12, border: `1px solid ${S.gl}`, padding: 36, textAlign: "center" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: S.dark, fontFamily: S.font }}>عروض الأسعار المحفوظة</div>
      <div style={{ fontSize: 12, color: S.gray, fontFamily: S.font, marginTop: 6 }}>ابدأ بإنشاء عرض سعر من تبويب "تسعير جديد"</div>
      <div style={{ marginTop: 16, padding: "10px 18px", background: `${S.gold}10`, borderRadius: 8, border: `1px solid ${S.gold}30`, display: "inline-block" }}>
        <span style={{ fontSize: 11, color: S.gold, fontFamily: S.font, fontWeight: 600 }}>🔄 ربط Odoo API — قريباً</span>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("pricing");
  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: S.bg, fontFamily: S.font }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes spin { to { transform: rotate(360deg) } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #f0f2f5; }
        ::-webkit-scrollbar-thumb { background: #c8973e; border-radius: 3px; }
        details summary::-webkit-details-marker { display: none; }
        details summary::before { content: "▸ "; }
        details[open] summary::before { content: "▾ "; }
      `}</style>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "18px 14px 50px" }}>
        {activeTab === "pricing" && <PricingTab />}
        {activeTab === "database" && <DatabaseTab />}
        {activeTab === "quotations" && <QuotationsTab />}
      </div>
    </div>
  );
}
