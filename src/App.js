import { useState, useRef, useEffect } from "react";

// ========== FULL TRANSLATIONS ==========
const TR = {
  ar: {
    dir: "rtl", newPricing: "تسعير جديد", quotations: "عروض الأسعار", priceDb: "قاعدة الأسعار",
    inputBoq: "إدخال BOQ أو ملف المشروع", uploadFile: "ارفع ملف (PDF, Excel, Word, CSV)",
    pasteBoq: "أو الصق BOQ / وصف المشروع هنا...", analyze3: "تحليل وتسعير من 3 مصادر",
    analyzing: "جاري التحليل...", scopeDetected: "نطاق العمل المكتشف:",
    db: "قاعدة البيانات", ai: "ذكاء اصطناعي", web: "أسعار الإنترنت",
    showAll: "عرض الكل", compare: "مقارنة", saveQuote: "حفظ كعرض سعر والتعديل",
    pricingFrom: "تسعير من", loading: "جاري...", noData: "لا تتوفر أسعار من",
    takesSec: "قد يستغرق 10-30 ثانية",
    sections: "الأقسام", items: "البنود", matched: "مطابق", totalVat: "الإجمالي شامل الضريبة", sar: "ر.س",
    readingFile: "جاري قراءة", fileRead: "تم قراءة",
    si: "توريد وتركيب", io: "تركيب فقط", so: "توريد فقط", svc: "خدمات",
    editPrices: "تعديل الأسعار", closeEdit: "إغلاق التعديل",
    approveAll: "اعتماد الكل", cancelApprove: "إلغاء اعتماد الكل",
    setScopeAll: "تحديد نطاق العمل للكل", printQuote: "طباعة عرض السعر", sendOdoo: "إرسال إلى Odoo",
    noQuotes: "لا توجد عروض أسعار", createFirst: "أنشئ تسعير جديد ثم احفظه هنا",
    draft: "مسودة", sent: "تم الإرسال", approved: "معتمد",
    desc: "الوصف", scope: "نطاق العمل", qty: "الكمية", unit: "الوحدة", unitPrice: "سعر الوحدة",
    total: "الإجمالي", status: "حالة", confidence: "الثقة", source: "المصدر", finalPrice: "السعر النهائي",
    img: "صورة", editTip: "اضغط على أي سعر من أعمدة DB/AI/Web لنسخه — غيّر نطاق العمل لكل بند",
    learned: "منتجات مُتعلَّمة تلقائياً", learnedDesc: "تتحدث تلقائياً من عروض الأسعار المعتمدة",
    addManual: "إضافة يدوية", addProduct: "إضافة منتج جديد", prodName: "اسم المنتج",
    price: "السعر", lastUpdate: "آخر تحديث", save: "حفظ", search: "ابحث عن منتج...",
    builtin: "مدمج", auto: "تلقائي", manual: "يدوي",
    terms: "الشروط والأحكام", signature: "التوقيع",
    approveFirst: "اعتمد بنود أولاً", high: "عالية", medium: "متوسطة", low: "منخفضة",
    chooseScope: "اختر نطاق العمل:\n1=توريد وتركيب\n2=تركيب فقط\n3=توريد فقط\n4=خدمات",
    sentMsg: (n, t) => `✅ تم إرسال ${n} بند إلى Odoo!\n✅ تم تحديث قاعدة الأسعار تلقائياً\nالإجمالي: ${t} ر.س`,
    quotationDate: "تاريخ العرض", quotationNo: "رقم العرض", customer: "العميل", address: "العنوان",
    deliveryDate: "تاريخ التسليم", projectTitle: "عنوان المشروع", projectCode: "كود المشروع",
    vendorCode: "كود المورد", notes: "ملاحظات", from: "من", to: "إلى", clientName: "اسم العميل",
    expiryDate: "تاريخ الانتهاء", pricelist: "قائمة الأسعار", paymentTerms: "شروط السداد",
    email: "البريد الإلكتروني", pm: "مدير المشروع", pmPhone: "هاتف المدير",
    presales: "Presales", presalesPhone: "هاتف Presales",
    progressStatus: "حالة التقدم", poNumber: "رقم أمر الشراء", poDate: "تاريخ أمر الشراء",
    totalExVat: "الإجمالي قبل الضريبة", partNo: "رقم القطعة", amount: "المبلغ",
    payTermsLabel: "شروط الدفع",
    // Print
    pQuotation: "عرض سعر", pScopeWork: "نطاق العمل:", pPayment: "الدفع:", pConditions: "الشروط:",
    defaultTerms: `نطاق العمل:\n1- هذا العرض لا يشمل رسومات ورشة أو رسومات كما بنيت، فقط رسومات خطوط حمراء.\n2- يشمل هذا العرض جميع أعمال التحميل والتفريغ والتركيب.\n3- يشمل هذا العرض جميع الأدوات المطلوبة.\n4- أي انحراف عن النطاق أعلاه يعتبر أمر تغيير مدفوع.\n5- لا يشمل هذا النطاق أي أعمال مدنية.\n\nالدفع:\n1- 100% تدريجي خلال 60 يوم من تاريخ فاتورتنا.\n2- يمكن الدفع عبر:\n- شيك باسم اتحاد الامتياز\n- تحويل بنكي لبنك الرياض حساب (2620855259940) آيبان (SA0220000002620855259940)\n\nالشروط:\n1- هذا العرض ساري لمدة شهرين.\n2- جاهزية الموقع وتصاريح الدخول مسؤولية العميل.\n3- استلام المواد والأعمال مسؤولية العميل.`,
  },
  en: {
    dir: "ltr", newPricing: "New Pricing", quotations: "Quotations", priceDb: "Price Database",
    inputBoq: "Input BOQ or Project File", uploadFile: "Upload file (PDF, Excel, Word, CSV)",
    pasteBoq: "Or paste BOQ / project description here...", analyze3: "Analyze & Price from 3 Sources",
    analyzing: "Analyzing...", scopeDetected: "Detected Scope of Work:",
    db: "Database", ai: "AI Pricing", web: "Web Prices",
    showAll: "Show All", compare: "Compare", saveQuote: "Save as Quotation & Edit",
    pricingFrom: "Pricing from", loading: "Loading...", noData: "No prices from",
    takesSec: "May take 10-30 seconds",
    sections: "Sections", items: "Items", matched: "Matched", totalVat: "Total inc. VAT", sar: "SAR",
    readingFile: "Reading", fileRead: "Read",
    si: "Supply & Install", io: "Installation Only", so: "Supply Only", svc: "Service",
    editPrices: "Edit Prices", closeEdit: "Close Editing",
    approveAll: "Approve All", cancelApprove: "Cancel Approve All",
    setScopeAll: "Set Scope for All", printQuote: "Print Quotation", sendOdoo: "Send to Odoo",
    noQuotes: "No Quotations", createFirst: "Create a new pricing and save it here",
    draft: "Draft", sent: "Sent", approved: "Approved",
    desc: "Description", scope: "Scope", qty: "QTY", unit: "Unit", unitPrice: "Unit Price",
    total: "Total", status: "Status", confidence: "Confidence", source: "Source", finalPrice: "Final Price",
    img: "Image", editTip: "Click any price from DB/AI/Web to copy as final price — change scope per item",
    learned: "Auto-Learned Products", learnedDesc: "Auto-updated from approved quotations",
    addManual: "Add Manual", addProduct: "Add New Product", prodName: "Product Name",
    price: "Price", lastUpdate: "Last Update", save: "Save", search: "Search product...",
    builtin: "Built-in", auto: "Auto", manual: "Manual",
    terms: "Terms & Conditions", signature: "Signature",
    approveFirst: "Approve items first", high: "High", medium: "Medium", low: "Low",
    chooseScope: "Choose scope:\n1=Supply & Install\n2=Installation Only\n3=Supply Only\n4=Service",
    sentMsg: (n, t) => `✅ Sent ${n} items to Odoo!\n✅ Auto-updated price database\nTotal: ${t} SAR`,
    quotationDate: "Quotation Date", quotationNo: "Quotation No", customer: "Customer", address: "Address",
    deliveryDate: "Delivery Date", projectTitle: "Project Title", projectCode: "Project Code",
    vendorCode: "Vendor Code", notes: "Notes", from: "From", to: "To", clientName: "Client Name",
    expiryDate: "Expiry Date", pricelist: "Pricelist", paymentTerms: "Payment Terms",
    email: "Email Address", pm: "Project Manager", pmPhone: "Manager Phone",
    presales: "Presales", presalesPhone: "Presales Phone",
    progressStatus: "Progress Status", poNumber: "PO Number", poDate: "PO Date",
    totalExVat: "Total (Excluded VAT)", partNo: "Part No", amount: "Amount",
    payTermsLabel: "Payment terms",
    pQuotation: "QUOTATION", pScopeWork: "Scope of Work:", pPayment: "Payment:", pConditions: "Conditions:",
    defaultTerms: `Scope of work:\n1- This proposal covers no shop or as-built drawing only red lines drawing.\n2- This proposal covers all loading unloading mounting.\n3- This proposal covers all Tools needed for the above services.\n4- Above scope is based on the given information any deviation from that is a payable change order.\n5- This scope does not include any civil works.\n\nPayment:\n1- 100% Progressive no later than 60 days from our invoice date.\n2- Payment could be processed via:\n- Check under the name of Excellency Union (اتحاد الامتياز)\n- Wire transfer to our Riyad Bank account number (2620855259940) IBAN number (SA0220000002620855259940)\n\nConditions:\n1- This proposal is valid for 2 months.\n2- Site readiness and gate pass are the responsibility of the client.\n3- Materials and works acceptance are the responsibility of the client.`,
  }
};

const scopeKey = { supply_and_install: "si", install_only: "io", supply_only: "so", service: "svc" };
const scopeIcon = { supply_and_install: "📦🔧", install_only: "🔧", supply_only: "📦", service: "🛠️" };
const scopeColor = { supply_and_install: "#059669", install_only: "#d97706", supply_only: "#2563eb", service: "#8b5cf6" };

// ========== PRICE DB ==========
const PRICE_DB = {
  security: { name: "Security Control Room", icon: "🖥️", items: [
    { id:"SCR-001",name:"CCTV Management Client",unit:"Each",price:350 },{ id:"SCR-003",name:"Monitor",unit:"Each",price:350 },
    { id:"SCR-008",name:"Card Reader (SCR)",unit:"Each",price:800 },{ id:"SCR-010",name:"NVR",unit:"Each",price:300 },
    { id:"SCR-011",name:"Storage Unit 128 TB",unit:"Each",price:500 },
  ]},
  cctv: { name: "CCTV System", icon: "📹", items: [
    { id:"CCTV-001",name:"Outdoor PTZ Camera",unit:"Each",price:1700 },{ id:"CCTV-003",name:"Outdoor Fixed Box Camera",unit:"Each",price:1000 },
    { id:"CCTV-005",name:"Indoor Fixed Dome Camera",unit:"Each",price:750 },
  ]},
  acs: { name: "Access Control", icon: "🔐", items: [
    { id:"ACS-001",name:"Advanced Central Controller",unit:"Each",price:1000 },{ id:"ACS-009",name:"Card Reader (ACS)",unit:"Each",price:1200 },
    { id:"ACS-011",name:"Electromagnetic Lock",unit:"Each",price:1000 },{ id:"ACS-012",name:"Break Glass Unit",unit:"Each",price:850 },
    { id:"ACS-013",name:"REX",unit:"Each",price:850 },{ id:"ACS-014",name:"Door Contact",unit:"Each",price:850 },
    { id:"ACS-015",name:"Suprema Fingerprint",unit:"Each",price:900 },
  ]},
  intercom: { name: "Intercom", icon: "📞", items: [
    { id:"INT-001",name:"IP Master Station",unit:"Each",price:1400 },{ id:"INT-003",name:"Intercom Sub Station",unit:"Each",price:1000 },
  ]},
  cable: { name: "Conduit & Cabling", icon: "🔌", items: [
    { id:"CC-001",name:"RGS Pipe Supply and Installation",unit:"Meter",price:90 },{ id:"CC-002",name:"Cat6 Cable",unit:"Meter",price:15 },
  ]},
  elec: { name: "Electrical", icon: "⚡", items: [
    { id:"EL-001",name:"Main Distribution Board MDB",unit:"Each",price:15000 },{ id:"EL-002",name:"Sub Distribution Board SDB",unit:"Each",price:5000 },
  ]},
};

const S = { font:"'Tajawal',sans-serif", dark:"#0a1628", navy:"#1a2d50", gold:"#c8973e", goldL:"#e8c068", bg:"#f3f5f8", white:"#fff", gray:"#7a8a9e", gl:"#e4e8ee", green:"#10b981", red:"#ef4444", blue:"#3b82f6", purple:"#8b5cf6" };

function matchDB(text, learned) {
  const l = text.toLowerCase().trim(); let best=null, bs=0;
  Object.values(PRICE_DB).forEach(c=>c.items.forEach(i=>{const n=i.name.toLowerCase();let sc=n===l?100:n.includes(l)||l.includes(n)?85:l.split(/\s+/).filter(w=>w.length>2&&n.includes(w)).length/Math.max(l.split(/\s+/).length,1)*70;if(sc>bs){bs=sc;best={...i,score:sc}}}));
  if(learned)learned.forEach(i=>{const n=i.name.toLowerCase();let sc=n===l?105:n.includes(l)||l.includes(n)?90:l.split(/\s+/).filter(w=>w.length>2&&n.includes(w)).length/Math.max(l.split(/\s+/).length,1)*75;if(sc>bs){bs=sc;best={...i,score:sc}}});
  return bs>=25?best:null;
}

const loadScript=(url)=>new Promise((r,j)=>{if(document.querySelector(`script[src="${url}"]`)){r();return}const s=document.createElement("script");s.src=url;s.onload=r;s.onerror=()=>j();document.head.appendChild(s)});

function detectScope(t){const l=t.toLowerCase();if(/installation\s*only|تركيب\s*فقط/.test(l))return"install_only";if(/supply\s*only|توريد\s*فقط/.test(l))return"supply_only";if(/supply\s*(and|&)\s*install|توريد.*(و|وتركيب)/.test(l))return"supply_and_install";if(/maintenance|service|صيانة|خدم/.test(l))return"service";if(/install|تركيب/.test(l))return"install_only";return"supply_and_install"}

function parseInput(text){const lines=text.split(/\n/).filter(l=>l.trim());const sections=[];let cur={name:"General",scope:"supply_and_install",items:[]};let hI=-1,cm={desc:-1,unit:-1,qty:-1,price:-1,pn:-1};
cur.scope=detectScope(text);
for(let i=0;i<Math.min(lines.length,10);i++){if(/item.*desc|desc.*unit.*qty|ITEM.*Part/i.test(lines[i])){hI=i;lines[i].split(",").forEach((c,idx)=>{const cl=c.trim().toLowerCase();if(/desc|item\s*desc/.test(cl))cm.desc=idx;else if(/^unit$/.test(cl))cm.unit=idx;else if(/^qty$|quant/.test(cl))cm.qty=idx;else if(/unit\s*price/.test(cl))cm.price=idx;else if(/part\s*no/.test(cl))cm.pn=idx});break}}
for(let i=hI>=0?hI+1:0;i<lines.length;i++){const l=lines[i].trim();if(!l||/^total|^المجموع/i.test(l))continue;const parts=l.split(",").map(p=>p.trim());
if(/^scope\s*:/i.test(l)||(parts.length<=2&&!/^\d/.test(parts[0]||"")&&(parts[0]||"").length>5&&!parts.some(p=>/^\d+\.?\d*$/.test(p)))){if(cur.items.length>0)sections.push(cur);cur={name:l.replace(/^scope\s*:\s*/i,"").replace(/,+/g," ").trim(),scope:detectScope(l),items:[]};continue}
if(/^-\s/.test(l)&&cur.items.length>0){cur.items[cur.items.length-1].description+=" | "+l.replace(/^-\s*/,"");continue}
const dI=cm.desc>=0?cm.desc:hI>=0?2:0;const desc=(parts[dI]||parts[0]||"").replace(/^(Low Current|Electrical)\s*/i,"").trim();
if(!desc||desc.length<3||/^BHD|^SAR|^ITEM$/i.test(desc))continue;
let qty=1;if(cm.qty>=0){const q=parseFloat(parts[cm.qty]);if(!isNaN(q)&&q>0)qty=q}else parts.forEach(p=>{const n=parseFloat(p);if(!isNaN(n)&&n>0&&n<100000&&p===String(n))qty=n});
let pr=0;if(cm.price>=0){const p=parseFloat((parts[cm.price]||"").replace(/[^0-9.]/g,""));if(!isNaN(p))pr=p}
const un=cm.unit>=0?(parts[cm.unit]||"Each").replace(/^EA$/i,"Each"):"Each";const pn=cm.pn>=0?parts[cm.pn]||"":"";
cur.items.push({id:`i-${i}-${Math.random().toString(36).substr(2,4)}`,description:pn?`${desc} (${pn})`:desc,qty,unit:un,originalPrice:pr,partNo:pn})}
if(cur.items.length>0)sections.push(cur);return sections}

async function getAIPricing(sections){
  const list=sections.flatMap(s=>[`\n[Section: ${s.name} — Scope: ${s.scope}]`,...s.items.map(i=>`- ${i.description} | Qty:${i.qty} | Unit:${i.unit}`)]).join("\n");
  try{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-5-20250514",max_tokens:4000,messages:[{role:"user",content:`Pricing expert for contracting in Saudi Arabia. Price these items in SAR based on scope (Supply&Install=full, InstallOnly=20-40%, SupplyOnly=material only):\n${list}\n\nRESPOND ONLY JSON, no markdown:\n[{"description":"name","unitPrice":number,"confidence":"high/medium/low","notes":"basis"}]`}]})});
  const d=await r.json();const t=d.content?.map(c=>c.text||"").join("")||"";return JSON.parse(t.replace(/```json|```/g,"").trim())}catch(e){return null}}

async function getWebPricing(sections){
  const items=sections.flatMap(s=>s.items).slice(0,15).map(i=>i.description.replace(/\(.*?\)/g,"").trim());
  try{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-5-20250514",max_tokens:4000,tools:[{type:"web_search_20250305",name:"web_search"}],messages:[{role:"user",content:`Search Saudi market prices (SAR) for:\n${items.join("\n")}\n\nRESPOND ONLY JSON:\n[{"description":"name","unitPrice":number,"source":"source","notes":"info"}]`}]})});
  const d=await r.json();const t=d.content?.filter(c=>c.type==="text").map(c=>c.text).join("")||"";const m=t.replace(/```json|```/g,"").trim().match(/\[[\s\S]*\]/);return m?JSON.parse(m[0]):null}catch(e){return null}}

// ========== UI COMPONENTS ==========
function Header({activeTab,setActiveTab,lang,setLang,t}){return(
<div>
<div style={{background:`linear-gradient(135deg,${S.dark},${S.navy})`,padding:"16px 22px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`3px solid ${S.gold}`}}>
  <div style={{display:"flex",alignItems:"center",gap:11}}>
    <div style={{width:40,height:40,borderRadius:9,background:`linear-gradient(135deg,${S.gold},${S.goldL})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,fontWeight:900,color:S.dark,fontFamily:S.font}}>EU</div>
    <div><div style={{fontSize:16,fontWeight:800,color:"#fff",fontFamily:S.font}}>Excellency Union</div><div style={{fontSize:9,color:S.gold,fontFamily:S.font,letterSpacing:2}}>AI PRICING V4</div></div>
  </div>
  <div style={{display:"flex",alignItems:"center",gap:3,background:"rgba(255,255,255,0.08)",borderRadius:7,padding:2}}>
    <button onClick={()=>setLang("ar")} style={{padding:"4px 11px",borderRadius:5,border:"none",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:S.font,background:lang==="ar"?S.gold:"transparent",color:lang==="ar"?"#fff":"#ffffff60"}}>العربية</button>
    <button onClick={()=>setLang("en")} style={{padding:"4px 11px",borderRadius:5,border:"none",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Arial",background:lang==="en"?S.gold:"transparent",color:lang==="en"?"#fff":"#ffffff60"}}>English</button>
  </div>
</div>
<div style={{background:S.white,borderBottom:`1px solid ${S.gl}`,display:"flex",padding:"0 18px",overflowX:"auto"}}>
  {[{id:"pricing",label:t.newPricing,icon:"🧮"},{id:"quotations",label:t.quotations,icon:"📋"},{id:"database",label:t.priceDb,icon:"💾"}].map(tab=>(
    <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{padding:"10px 16px",border:"none",background:"transparent",borderBottom:activeTab===tab.id?`3px solid ${S.gold}`:"3px solid transparent",color:activeTab===tab.id?S.gold:S.gray,fontWeight:activeTab===tab.id?700:500,fontSize:12,fontFamily:S.font,cursor:"pointer",display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>{tab.icon} {tab.label}</button>
  ))}
</div></div>)}

function Results({sections,src,color,icon,label,loading,total,t}){
  if(loading)return(<div style={{background:S.white,borderRadius:11,border:`1px solid ${S.gl}`,padding:"35px 18px",textAlign:"center"}}><div style={{width:24,height:24,border:`3px solid ${color}30`,borderTopColor:color,borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 10px"}}/><div style={{fontSize:13,fontWeight:700,color,fontFamily:S.font}}>{icon} {t.pricingFrom} {label}...</div><div style={{fontSize:10,color:S.gray,fontFamily:S.font,marginTop:3}}>{t.takesSec}</div></div>);
  if(!sections||!sections.length)return(<div style={{background:S.white,borderRadius:11,border:`1px solid ${S.gl}`,padding:"25px 18px",textAlign:"center"}}><div style={{fontSize:12,color:S.gray,fontFamily:S.font}}>{icon} {t.noData} {label}</div></div>);
  return(<div style={{background:S.white,borderRadius:11,border:`1px solid ${S.gl}`,overflow:"hidden"}}>
  <div style={{padding:"10px 14px",borderBottom:`1px solid ${S.gl}`,display:"flex",justifyContent:"space-between",alignItems:"center",background:`${color}08`}}>
    <span style={{fontSize:12,fontWeight:700,color,fontFamily:S.font}}>{icon} {t.pricingFrom} {label}</span>
    <span style={{fontSize:14,fontWeight:900,color,fontFamily:S.font}}>{total.toLocaleString()} {t.sar}</span></div>
  <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontFamily:S.font,minWidth:450}}>
    <thead><tr style={{background:"#f7f8fa"}}>{["#",t.desc,t.qty,t.unitPrice,t.total,...(src==="ai"?[t.confidence]:src==="web"?[t.source]:[])].map((h,i)=>(<th key={i} style={{padding:"7px 8px",fontSize:9,fontWeight:700,color:S.gray,textAlign:i>1?"center":"right",borderBottom:`1px solid ${S.gl}`}}>{h}</th>))}</tr></thead>
    <tbody>{sections.flatMap(s=>s.items).map((item,i)=>(<tr key={i} style={{borderBottom:"1px solid #f2f4f6"}}>
      <td style={{padding:"6px 8px",fontSize:9,color:S.gray}}>{i+1}</td>
      <td style={{padding:"6px 8px",fontSize:11,fontWeight:600,color:S.dark}}>{item.description}{item.notes&&<div style={{fontSize:9,color:S.gray}}>{item.notes}</div>}</td>
      <td style={{padding:"6px",textAlign:"center",fontSize:11,fontWeight:600}}>{item.qty}</td>
      <td style={{padding:"6px",textAlign:"center",fontSize:11,fontWeight:700,color}}>{item.unitPrice?.toLocaleString()||0}</td>
      <td style={{padding:"6px",textAlign:"center",fontSize:11,fontWeight:800,color:S.dark}}>{((item.qty||1)*(item.unitPrice||0)).toLocaleString()}</td>
      {src==="ai"&&<td style={{padding:"6px",textAlign:"center"}}><span style={{padding:"2px 5px",borderRadius:3,fontSize:8,fontWeight:700,background:item.confidence==="high"?"#ecfdf5":item.confidence==="medium"?"#fffbeb":"#fef2f2",color:item.confidence==="high"?S.green:item.confidence==="medium"?"#d97706":S.red}}>{t[item.confidence]||item.confidence}</span></td>}
      {src==="web"&&<td style={{padding:"6px",textAlign:"center",fontSize:8,color:S.blue,maxWidth:80,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.source||"-"}</td>}
    </tr>))}</tbody></table></div></div>)
}

function PricingTab({onSave,goToQuotations,learnedItems,lang,t}){
  const[inputText,setInputText]=useState("");const[parsed,setParsed]=useState(null);
  const[dbR,setDbR]=useState(null);const[aiR,setAiR]=useState(null);const[webR,setWebR]=useState(null);
  const[lDb,setLDb]=useState(false);const[lAi,setLAi]=useState(false);const[lWeb,setLWeb]=useState(false);
  const[fStatus,setFStatus]=useState("");const[fName,setFName]=useState("");const[src,setSrc]=useState("all");
  const fileRef=useRef(null);const resRef=useRef(null);

  const handleFile=async(file)=>{if(!file)return;setFName(file.name);setFStatus("loading");setInputText("");
    const r=new FileReader();const n=file.name.toLowerCase();
    if(/\.csv|\.txt|\.md$/.test(n)){r.onload=e=>{setInputText(e.target.result);setFStatus("done")};r.readAsText(file)}
    else if(/\.xlsx?$/.test(n)){r.onload=async e=>{try{await loadScript("https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js");const X=window.XLSX;const wb=X.read(new Uint8Array(e.target.result),{type:"array"});let t="";wb.SheetNames.forEach(s=>{t+=X.utils.sheet_to_csv(wb.Sheets[s])+"\n"});setInputText(t);setFStatus("done")}catch{setFStatus("error")}};r.readAsArrayBuffer(file)}
    else if(n.endsWith(".pdf")){r.onload=async e=>{try{await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js");window.pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";const pdf=await window.pdfjsLib.getDocument({data:new Uint8Array(e.target.result)}).promise;let t="";for(let i=1;i<=pdf.numPages;i++){const pg=await pdf.getPage(i);const c=await pg.getTextContent();t+=c.items.map(x=>x.str).join(" ")+"\n"}setInputText(t);setFStatus("done")}catch{setFStatus("error")}};r.readAsArrayBuffer(file)}
    else if(n.endsWith(".docx")){r.onload=async e=>{try{await loadScript("https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js");const res=await window.mammoth.extractRawText({arrayBuffer:e.target.result});setInputText(res.value);setFStatus("done")}catch{setFStatus("error")}};r.readAsArrayBuffer(file)}
    else{r.onload=e=>{setInputText(e.target.result);setFStatus("done")};r.readAsText(file)}};

  const analyze=async()=>{if(!inputText.trim())return;const secs=parseInput(inputText);setParsed(secs);setSrc("all");setTimeout(()=>resRef.current?.scrollIntoView({behavior:"smooth"}),200);
    setLDb(true);setTimeout(()=>{setDbR(secs.map(s=>({...s,items:s.items.map(i=>{const m=matchDB(i.description,learnedItems);return{...i,unitPrice:i.originalPrice>0?i.originalPrice:(m?.price||0),matched:!!m}})})));setLDb(false)},800);
    setLAi(true);try{const ai=await getAIPricing(secs);if(ai)setAiR(secs.map(s=>({...s,items:s.items.map(i=>{const f=ai.find(p=>i.description.toLowerCase().includes(p.description?.toLowerCase()?.split(" ")[0]||"___"))||ai.find(p=>i.description.toLowerCase().split(/\s+/).some(w=>w.length>3&&(p.description||"").toLowerCase().includes(w)));return{...i,unitPrice:f?.unitPrice||0,confidence:f?.confidence||"low",notes:f?.notes||""}})})))}catch{}setLAi(false);
    setLWeb(true);try{const wp=await getWebPricing(secs);if(wp)setWebR(secs.map(s=>({...s,items:s.items.map(i=>{const f=wp.find(p=>i.description.toLowerCase().includes(p.description?.toLowerCase()?.split(" ")[0]||"___"))||wp.find(p=>i.description.toLowerCase().split(/\s+/).some(w=>w.length>3&&(p.description||"").toLowerCase().includes(w)));return{...i,unitPrice:f?.unitPrice||0,source:f?.source||"",notes:f?.notes||""}})})))}catch{}setLWeb(false)};

  const calc=(s)=>s?s.reduce((a,sec)=>a+sec.items.reduce((b,i)=>b+(i.qty||1)*(i.unitPrice||0),0),0):0;
  const sources=[{id:"all",label:t.showAll,icon:"📊",c:S.dark},{id:"db",label:t.db,icon:"💾",c:S.green},{id:"ai",label:t.ai,icon:"🤖",c:S.purple},{id:"web",label:t.web,icon:"🌐",c:S.blue},{id:"compare",label:t.compare,icon:"⚖️",c:S.gold}];

  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{background:S.white,borderRadius:11,border:`1px solid ${S.gl}`,overflow:"hidden"}}>
      <div style={{padding:"12px 16px",borderBottom:`1px solid ${S.gl}`,display:"flex",alignItems:"center",gap:7}}><span style={{fontSize:15}}>📥</span><span style={{fontSize:13,fontWeight:700,color:S.dark,fontFamily:S.font}}>{t.inputBoq}</span></div>
      <div style={{padding:14}}>
        <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv,.txt,.pdf,.docx,.md" style={{display:"none"}} onChange={e=>{handleFile(e.target.files?.[0]);e.target.value=""}}/>
        <div onClick={()=>fileRef.current?.click()} style={{border:`2px dashed ${fStatus==="done"?S.green:S.gl}`,borderRadius:9,padding:fStatus?"10px 14px":"18px 14px",textAlign:"center",cursor:"pointer",background:fStatus==="done"?"#f0faf1":"#f9fafb",marginBottom:10}}>
          {fStatus==="loading"?<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7}}><div style={{width:14,height:14,border:`2px solid ${S.gold}40`,borderTopColor:S.gold,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/><span style={{fontSize:11,fontWeight:600,color:S.gold,fontFamily:S.font}}>{t.readingFile} {fName}...</span></div>
          :fStatus==="done"?<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7}}><span style={{fontSize:11,fontWeight:600,color:S.green,fontFamily:S.font}}>✅ {t.fileRead} {fName}</span><button onClick={e=>{e.stopPropagation();setFStatus("");setFName("");setInputText("")}} style={{padding:"2px 7px",background:"#fee2e2",border:"1px solid #fca5a5",borderRadius:4,color:S.red,fontSize:9,cursor:"pointer",fontFamily:S.font}}>✕</button></div>
          :<><div style={{fontSize:22,marginBottom:3}}>📎</div><div style={{fontSize:11,fontWeight:600,color:S.dark,fontFamily:S.font}}>{t.uploadFile}</div></>}
        </div>
        <textarea value={inputText} onChange={e=>setInputText(e.target.value)} dir={t.dir} placeholder={t.pasteBoq} style={{width:"100%",minHeight:90,border:`1.5px solid ${S.gl}`,borderRadius:9,padding:10,fontSize:12,lineHeight:1.7,fontFamily:S.font,color:S.dark,resize:"vertical",outline:"none",boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor=S.gold} onBlur={e=>e.target.style.borderColor=S.gl}/>
        <button onClick={analyze} disabled={!inputText.trim()||lAi||lWeb} style={{marginTop:9,width:"100%",padding:"11px",background:inputText.trim()?`linear-gradient(135deg,${S.dark},${S.navy})`:"#d0d5de",color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:S.font,cursor:inputText.trim()?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
          {(lAi||lWeb)?<><div style={{width:14,height:14,border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/>{t.analyzing}</>:`🤖 ${t.analyze3}`}
        </button>
      </div>
    </div>

    {parsed&&(<div ref={resRef} style={{display:"flex",flexDirection:"column",gap:12}}>
      {/* Scope */}
      <div style={{background:S.white,borderRadius:9,border:`1px solid ${S.gl}`,padding:"10px 14px"}}>
        <div style={{fontSize:11,fontWeight:700,color:S.dark,fontFamily:S.font,marginBottom:6}}>📋 {t.scopeDetected}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{parsed.map((s,i)=>{const sc=scopeColor[s.scope]||"#059669";return(<div key={i} style={{padding:"5px 10px",borderRadius:7,background:`${sc}10`,border:`1px solid ${sc}30`,display:"flex",alignItems:"center",gap:5}}>
          <span style={{fontSize:12}}>{scopeIcon[s.scope]}</span><div><div style={{fontSize:10,fontWeight:700,color:sc,fontFamily:S.font}}>{s.name.substring(0,35)}</div><div style={{fontSize:9,color:S.gray,fontFamily:S.font}}>{t[scopeKey[s.scope]]} — {s.items.length} {t.items}</div></div></div>)})}</div></div>
      {/* Cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:8}}>
        {[{l:`💾 ${t.db}`,v:calc(dbR),c:S.green,ld:lDb},{l:`🤖 ${t.ai}`,v:calc(aiR),c:S.purple,ld:lAi},{l:`🌐 ${t.web}`,v:calc(webR),c:S.blue,ld:lWeb}].map((c,i)=>(<div key={i} style={{background:S.white,borderRadius:9,padding:"10px 12px",border:`1px solid ${S.gl}`,borderTop:`3px solid ${c.c}`}}>
          <div style={{fontSize:9,color:S.gray,fontFamily:S.font,marginBottom:3}}>{c.l}</div>
          {c.ld?<div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:12,height:12,border:`2px solid ${c.c}30`,borderTopColor:c.c,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/><span style={{fontSize:10,color:S.gray,fontFamily:S.font}}>{t.loading}</span></div>
          :<div style={{fontSize:16,fontWeight:900,color:c.c,fontFamily:S.font}}>{c.v.toLocaleString()} <span style={{fontSize:9}}>{t.sar}</span></div>}
        </div>))}
      </div>
      {/* Source Tabs */}
      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{sources.map(s=>(<button key={s.id} onClick={()=>setSrc(s.id)} style={{padding:"6px 12px",border:src===s.id?`2px solid ${s.c}`:`1px solid ${S.gl}`,background:src===s.id?`${s.c}10`:S.white,borderRadius:7,fontSize:10,fontWeight:700,color:src===s.id?s.c:S.gray,fontFamily:S.font,cursor:"pointer",display:"flex",alignItems:"center",gap:3}}>{s.icon} {s.label}</button>))}</div>
      {(src==="all"||src==="db")&&<Results sections={dbR} src="db" color={S.green} icon="💾" label={t.db} loading={lDb} total={calc(dbR)} t={t}/>}
      {(src==="all"||src==="ai")&&<Results sections={aiR} src="ai" color={S.purple} icon="🤖" label={t.ai} loading={lAi} total={calc(aiR)} t={t}/>}
      {(src==="all"||src==="web")&&<Results sections={webR} src="web" color={S.blue} icon="🌐" label={t.web} loading={lWeb} total={calc(webR)} t={t}/>}
      {src==="compare"&&parsed&&<div style={{background:S.white,borderRadius:11,border:`1px solid ${S.gl}`,overflow:"hidden"}}>
        <div style={{padding:"10px 14px",borderBottom:`1px solid ${S.gl}`,background:`${S.gold}08`}}><span style={{fontSize:12,fontWeight:700,color:S.gold,fontFamily:S.font}}>⚖️ {t.compare}</span></div>
        <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontFamily:S.font,minWidth:550}}>
          <thead><tr style={{background:"#f7f8fa"}}>{["#",t.desc,t.qty,`💾 ${t.db}`,`🤖 ${t.ai}`,`🌐 ${t.web}`].map((h,i)=>(<th key={i} style={{padding:"7px 7px",fontSize:9,fontWeight:700,color:S.gray,textAlign:i>1?"center":"right",borderBottom:`2px solid ${S.gl}`}}>{h}</th>))}</tr></thead>
          <tbody>{parsed.flatMap(s=>s.items).map((item,i)=>{const dp=dbR?.flatMap(s=>s.items)?.[i]?.unitPrice||0;const ap=aiR?.flatMap(s=>s.items)?.[i]?.unitPrice||0;const wp=webR?.flatMap(s=>s.items)?.[i]?.unitPrice||0;const ps=[dp,ap,wp].filter(p=>p>0);const best=ps.length?Math.min(...ps):0;
          return(<tr key={i} style={{borderBottom:"1px solid #f2f4f6"}}><td style={{padding:"6px 7px",fontSize:9,color:S.gray}}>{i+1}</td><td style={{padding:"6px 7px",fontSize:10,fontWeight:600,color:S.dark}}>{item.description}</td><td style={{padding:"6px",textAlign:"center",fontSize:11,fontWeight:600}}>{item.qty}</td>
          <td style={{padding:"6px",textAlign:"center",fontSize:11,fontWeight:700,color:dp===best&&best>0?S.green:S.dark}}>{dp>0?dp.toLocaleString():"-"}</td>
          <td style={{padding:"6px",textAlign:"center",fontSize:11,fontWeight:700,color:ap===best&&best>0?S.green:S.dark}}>{ap>0?ap.toLocaleString():lAi?"...":"-"}</td>
          <td style={{padding:"6px",textAlign:"center",fontSize:11,fontWeight:700,color:wp===best&&best>0?S.green:S.dark}}>{wp>0?wp.toLocaleString():lWeb?"...":"-"}</td></tr>)})}</tbody></table></div></div>}
      {/* Save */}
      {(dbR||aiR||webR)&&<div style={{display:"flex",justifyContent:"center",padding:"6px 0"}}><button onClick={()=>{
        const q={id:`Q-${Date.now()}`,date:new Date().toLocaleDateString(lang==="ar"?"ar-SA":"en-US"),info:{quotationDate:new Date().toISOString().split("T")[0],quotationNo:`EXUQ-${new Date().toISOString().slice(0,10)}-001`,customer:"",customerAddress:"",projectTitle:"",projectCode:"quotation",vendorCode:"",deliveryDate:"",notes:"",emailAddress:"",projectManager:"",projectManagerPhone:"",presales:"Eng. Khaled S. Shakour",presalesPhone:"+966592345364",progressStatus:"quotation",poNumber:"",poDate:"",pricelist:"",paymentTerms:"",fromName:"Eng. Khaled S. Shakour",toName:"",clientName:"",expiryDate:"",terms:t.defaultTerms},
        sections:parsed,dbPricing:dbR,aiPricing:aiR,webPricing:webR,status:"draft",
        items:(dbR||parsed||[]).flatMap((s,sI)=>s.items.map(i=>({...i,dbPrice:0,aiPrice:0,webPrice:0,finalPrice:i.unitPrice||0,approved:false,scope:parsed?.[sI]?.scope||"supply_and_install"})))};
        q.items.forEach((item,idx)=>{item.dbPrice=dbR?.flatMap(s=>s.items)?.[idx]?.unitPrice||0;item.aiPrice=aiR?.flatMap(s=>s.items)?.[idx]?.unitPrice||0;item.webPrice=webR?.flatMap(s=>s.items)?.[idx]?.unitPrice||0;item.finalPrice=item.dbPrice||item.aiPrice||item.webPrice||0});
        onSave(q);goToQuotations()}} style={{padding:"10px 28px",background:`linear-gradient(135deg,${S.gold},${S.goldL})`,color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:S.font,cursor:"pointer",display:"flex",alignItems:"center",gap:7}}>📋 {t.saveQuote}</button></div>}
    </div>)}
  </div>)
}

function QuotationsTab({quotations,setQuotations,onLearn,lang,t}){
  const[editId,setEditId]=useState(null);
  const upItem=(qId,i,f,v)=>setQuotations(p=>p.map(q=>q.id===qId?{...q,items:q.items.map((it,idx)=>idx===i?{...it,[f]:v}:it)}:q));
  const upInfo=(qId,f,v)=>setQuotations(p=>p.map(q=>q.id===qId?{...q,info:{...q.info,[f]:v}}:q));
  const toggleApprove=(qId,i)=>setQuotations(p=>p.map(q=>q.id===qId?{...q,items:q.items.map((it,idx)=>idx===i?{...it,approved:!it.approved}:it)}:q));
  const approveAll=(qId)=>setQuotations(p=>p.map(q=>{if(q.id!==qId)return q;const all=q.items.every(i=>i.approved);return{...q,items:q.items.map(i=>({...i,approved:!all}))}}));
  const sendOdoo=(q)=>{const ap=q.items.filter(i=>i.approved);if(!ap.length){alert(t.approveFirst);return}onLearn(ap);alert(t.sentMsg(ap.length,ap.reduce((s,i)=>s+i.qty*i.finalPrice,0).toLocaleString()));setQuotations(p=>p.map(qo=>qo.id===q.id?{...qo,status:"sent"}:qo))};

  if(!quotations.length)return(<div style={{background:S.white,borderRadius:11,border:`1px solid ${S.gl}`,padding:35,textAlign:"center"}}><div style={{fontSize:36,marginBottom:10}}>📋</div><div style={{fontSize:15,fontWeight:700,color:S.dark,fontFamily:S.font}}>{t.noQuotes}</div><div style={{fontSize:11,color:S.gray,fontFamily:S.font,marginTop:5}}>{t.createFirst}</div></div>);

  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
    {quotations.map(q=>{const total=q.items.reduce((s,i)=>s+i.qty*i.finalPrice,0);const appCt=q.items.filter(i=>i.approved).length;const isEdit=editId===q.id;const info=q.info||{};
    return(<div key={q.id} style={{background:S.white,borderRadius:11,border:`1px solid ${S.gl}`,overflow:"hidden"}}>
      {/* Header */}
      <div style={{padding:"12px 16px",borderBottom:`1px solid ${S.gl}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:7,background:`${S.gold}05`}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18}}>{q.status==="sent"?"✅":"📋"}</span><div><div style={{fontSize:13,fontWeight:700,color:S.dark,fontFamily:S.font}}>{info.quotationNo||q.id}</div><div style={{fontSize:10,color:S.gray,fontFamily:S.font}}>{q.date} — {q.items.length} {t.items} — {appCt} {t.approved}</div></div></div>
        <div style={{display:"flex",gap:5,alignItems:"center"}}>
          <span style={{padding:"3px 9px",borderRadius:5,fontSize:10,fontWeight:700,fontFamily:S.font,background:q.status==="sent"?"#ecfdf5":"#fffbeb",color:q.status==="sent"?S.green:"#d97706"}}>{q.status==="sent"?`✅ ${t.sent}`:`⏳ ${t.draft}`}</span>
          <span style={{fontSize:14,fontWeight:900,color:S.gold,fontFamily:S.font}}>{total.toLocaleString()} {t.sar}</span>
        </div>
      </div>

      {/* Info Form */}
      <div style={{padding:"12px 16px",borderBottom:`1px solid ${S.gl}`,background:"#fafbfc"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,border:`1px solid ${S.gl}`,borderRadius:7,overflow:"hidden"}}>
          {[[{k:"quotationDate",l:t.quotationDate},{k:"quotationNo",l:t.quotationNo},{k:"customer",l:t.customer},{k:"customerAddress",l:t.address},{k:"deliveryDate",l:t.deliveryDate},{k:"projectTitle",l:t.projectTitle},{k:"projectCode",l:t.projectCode},{k:"fromName",l:t.from},{k:"toName",l:t.to},{k:"clientName",l:t.clientName}],
            [{k:"expiryDate",l:t.expiryDate},{k:"pricelist",l:t.pricelist},{k:"paymentTerms",l:t.paymentTerms},{k:"emailAddress",l:t.email},{k:"projectManager",l:t.pm},{k:"presales",l:t.presales},{k:"progressStatus",l:t.progressStatus},{k:"poNumber",l:t.poNumber},{k:"poDate",l:t.poDate},{k:"notes",l:t.notes}]
          ].map((col,cI)=>(<div key={cI} style={{borderRight:cI===0?`1px solid ${S.gl}`:"none"}}>{col.map((f,fI)=>(<div key={f.k} style={{display:"flex",alignItems:"center",borderBottom:fI<col.length-1?`1px solid ${S.gl}`:"none",minHeight:30}}>
            <div style={{width:110,padding:"5px 8px",fontSize:9,fontWeight:700,color:S.dark,fontFamily:S.font,background:"#f0f2f5",borderRight:`1px solid ${S.gl}`,flexShrink:0,minHeight:30,display:"flex",alignItems:"center"}}>{f.l}</div>
            <input value={info[f.k]||""} onChange={e=>upInfo(q.id,f.k,e.target.value)} style={{flex:1,border:"none",padding:"5px 8px",fontSize:10,fontFamily:S.font,color:S.dark,outline:"none",background:"transparent",minHeight:30}}/>
          </div>))}</div>))}
        </div>
        {/* Terms */}
        <div style={{marginTop:10}}><div style={{fontSize:11,fontWeight:700,color:S.dark,fontFamily:S.font,marginBottom:5}}>📝 {t.terms}:</div>
          <textarea value={info.terms||t.defaultTerms} onChange={e=>upInfo(q.id,"terms",e.target.value)} dir={t.dir} style={{width:"100%",minHeight:120,border:`1px solid ${S.gl}`,borderRadius:7,padding:10,fontSize:10,lineHeight:1.7,fontFamily:S.font,color:S.dark,resize:"vertical",outline:"none",boxSizing:"border-box"}}/></div>
      </div>

      {/* Actions */}
      <div style={{padding:"9px 16px",borderBottom:`1px solid ${S.gl}`,display:"flex",gap:5,flexWrap:"wrap"}}>
        <button onClick={()=>setEditId(isEdit?null:q.id)} style={{padding:"5px 12px",background:isEdit?S.gold:`${S.gold}10`,border:`1px solid ${S.gold}40`,borderRadius:5,color:isEdit?"#fff":S.gold,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:S.font}}>{isEdit?`💾 ${t.closeEdit}`:`✏️ ${t.editPrices}`}</button>
        <button onClick={()=>approveAll(q.id)} style={{padding:"5px 12px",background:`${S.green}10`,border:`1px solid ${S.green}40`,borderRadius:5,color:S.green,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:S.font}}>{q.items.every(i=>i.approved)?`↩ ${t.cancelApprove}`:`✅ ${t.approveAll}`}</button>
        <button onClick={()=>{const r=prompt(t.chooseScope);const m={"1":"supply_and_install","2":"install_only","3":"supply_only","4":"service"};if(m[r])setQuotations(p=>p.map(qo=>qo.id===q.id?{...qo,items:qo.items.map(i=>({...i,scope:m[r]}))}:qo))}} style={{padding:"5px 12px",background:"#f5f3ff",border:"1px solid #c4b5fd",borderRadius:5,color:S.purple,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:S.font}}>📋 {t.setScopeAll}</button>
        {/* PRINT */}
        <button onClick={()=>{
          const pi=q.items.filter(i=>i.approved);if(!pi.length){alert(t.approveFirst);return}
          const tot=pi.reduce((s,i)=>s+i.qty*i.finalPrice,0);const vat=tot*0.15;
          const sl=(sc)=>t[scopeKey[sc]]||t.si;
          const infoFields=[
            [t.quotationDate,info.quotationDate],[t.quotationNo,info.quotationNo||q.id],[t.projectTitle,info.projectTitle],
            [t.from,info.fromName],[t.to,info.toName],[t.clientName,info.clientName||info.customer],
            [t.customer,info.customer],[t.email,info.emailAddress],[t.pm,info.projectManager],
            [t.presales,info.presales],[t.poNumber,info.poNumber],[t.deliveryDate,info.deliveryDate],
          ].filter(([_,v])=>v&&v.trim());
          const w=window.open("","_blank");
          w.document.write(`<!DOCTYPE html><html dir="${t.dir}"><head><meta charset="utf-8"><title>${t.pQuotation} - EU</title>
          <style>@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;600;700;800&display=swap');
          *{box-sizing:border-box;margin:0;padding:0}body{font-family:'Tajawal',Arial,sans-serif;padding:25px 35px;color:#222;font-size:12px;line-height:1.5}
          .hdr{text-align:${lang==="ar"?"right":"right"};margin-bottom:10px;padding-bottom:15px;border-bottom:2px solid #333}
          .hdr h1{font-size:22px;font-weight:900}.hdr .sub{font-size:13px;color:#555}.hdr .ar{font-size:16px;font-family:'Tajawal'}.hdr .vat{font-size:11px;color:#666;margin-top:4px}
          .qtitle{text-align:center;font-size:22px;font-style:italic;font-weight:700;margin:16px 0 12px}
          .info{display:grid;grid-template-columns:auto 1fr auto 1fr;gap:0;font-size:11px;margin-bottom:14px}.info .l{font-weight:700;padding:3px 6px}.info .v{padding:3px 6px}
          table{width:100%;border-collapse:collapse;margin:10px 0}th{border:1px solid #999;padding:6px 8px;font-size:10px;font-weight:700;text-align:center;background:#f0f0f0}
          td{border:1px solid #ccc;padding:5px 8px;font-size:11px}.amt{text-align:right;font-weight:700}.dsc{text-align:left}
          .stag{display:inline-block;padding:1px 5px;border-radius:3px;font-size:9px;font-weight:700;background:#eee}
          .tot td{font-weight:800;background:#f8f8f8}.terms{margin:14px 0;font-size:11px;line-height:1.7;white-space:pre-line}
          .ftr{margin-top:18px;font-size:10px;color:#666;text-align:center;border-top:2px solid #333;padding-top:10px}
          @media print{body{padding:15px 25px}}</style></head><body>
          <div class="hdr"><h1>EXCELLENCY UNION CO. LTD.</h1><div class="sub">COMPANY ITTIHAD ALILIMTIYAZ FOR CONTRACTING</div><div class="ar">شركة اتحاد الامتياز للمقاولات</div><div class="vat">Vat 310212200200003 - CR: 1010368398</div></div>
          ${info.customer?`<div style="text-align:right;margin:12px 0;font-size:11px">${info.customer}<br>${info.customerAddress||""}</div>`:""}
          <div class="qtitle">${t.pQuotation}</div>
          <div class="info">${infoFields.map(([l,v])=>`<span class="l">${l}:</span><span class="v">${v}</span>`).join("")}</div>
          <table><thead><tr><th>${t.desc}</th><th>${t.scope}</th><th>${t.qty}</th><th>${t.unitPrice}</th><th>${t.amount}</th></tr></thead><tbody>
          ${pi.map(i=>`<tr><td class="dsc">${i.description}</td><td style="text-align:center"><span class="stag">${sl(i.scope)}</span></td><td style="text-align:center">${i.qty.toFixed(2)} ${i.unit||"Each"}</td><td class="amt">${i.finalPrice.toLocaleString("en",{minimumFractionDigits:2})}</td><td class="amt">${(i.qty*i.finalPrice).toLocaleString("en",{minimumFractionDigits:2})}</td></tr>`).join("")}
          <tr class="tot"><td colspan="3"></td><td style="text-align:center;font-weight:700">${t.totalExVat}</td><td class="amt">${tot.toLocaleString("en",{minimumFractionDigits:2})}</td></tr></tbody></table>
          <div class="terms">${(info.terms||t.defaultTerms).replace(/\n/g,"<br>")}</div>
          ${info.paymentTerms?`<p style="font-size:11px">${t.payTermsLabel}: ${info.paymentTerms}</p>`:""}
          <div class="ftr">Vat 310212200200003 - CR: 1010368398<br><strong>EXCELLENCY UNION CO. LTD.</strong><br>شركة اتحاد الامتياز للمقاولات</div>
          <script>setTimeout(()=>window.print(),500)<\/script></body></html>`);w.document.close()
        }} style={{padding:"5px 12px",background:`linear-gradient(135deg,${S.dark},${S.navy})`,border:"none",borderRadius:5,color:"#fff",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:S.font}}>🖨️ {t.printQuote}</button>
        {q.status!=="sent"&&<button onClick={()=>sendOdoo(q)} style={{padding:"5px 12px",background:`linear-gradient(135deg,${S.green},#34d399)`,border:"none",borderRadius:5,color:"#fff",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:S.font}}>🚀 {t.sendOdoo}</button>}
      </div>

      {/* Items Table */}
      <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontFamily:S.font,minWidth:700}}>
        <thead><tr style={{background:"#f7f8fa"}}>{["✓","#",t.desc,t.scope,t.qty,`💾`,`🤖`,`🌐`,t.finalPrice,t.total].map((h,i)=>(<th key={i} style={{padding:"7px 5px",fontSize:9,fontWeight:700,color:S.gray,textAlign:"center",borderBottom:`2px solid ${S.gl}`,whiteSpace:"nowrap"}}>{h}</th>))}</tr></thead>
        <tbody>{q.items.map((item,iI)=>{const sc=scopeColor[item.scope]||"#059669";return(
          <tr key={iI} style={{borderBottom:"1px solid #f2f4f6",background:item.approved?"#f0faf108":""}}>
            <td style={{padding:"5px",textAlign:"center"}}><input type="checkbox" checked={item.approved} onChange={()=>toggleApprove(q.id,iI)} style={{width:15,height:15,cursor:"pointer",accentColor:S.green}}/></td>
            <td style={{padding:"5px",fontSize:9,color:S.gray,textAlign:"center"}}>{iI+1}</td>
            <td style={{padding:"5px 7px",fontSize:10,fontWeight:600,color:S.dark,textAlign:"right",maxWidth:170}}>{item.description}</td>
            <td style={{padding:"4px",textAlign:"center"}}>{isEdit?<select value={item.scope||"supply_and_install"} onChange={e=>upItem(q.id,iI,"scope",e.target.value)} style={{padding:"3px",border:`1.5px solid ${sc}`,borderRadius:4,fontSize:8,fontWeight:700,fontFamily:S.font,outline:"none",color:sc,background:`${sc}10`,cursor:"pointer"}}>
              <option value="supply_and_install">{t.si}</option><option value="install_only">{t.io}</option><option value="supply_only">{t.so}</option><option value="service">{t.svc}</option></select>
              :<span style={{padding:"2px 5px",borderRadius:4,fontSize:8,fontWeight:700,fontFamily:S.font,background:`${sc}12`,color:sc,whiteSpace:"nowrap"}}>{scopeIcon[item.scope]} {t[scopeKey[item.scope]]}</span>}</td>
            <td style={{padding:"5px",textAlign:"center",fontSize:11,fontWeight:600}}>{item.qty}</td>
            <td style={{padding:"5px",textAlign:"center",fontSize:10,color:S.green,cursor:isEdit?"pointer":"default"}} onClick={()=>isEdit&&upItem(q.id,iI,"finalPrice",item.dbPrice)}>{item.dbPrice>0?item.dbPrice.toLocaleString():"-"}</td>
            <td style={{padding:"5px",textAlign:"center",fontSize:10,color:S.purple,cursor:isEdit?"pointer":"default"}} onClick={()=>isEdit&&upItem(q.id,iI,"finalPrice",item.aiPrice)}>{item.aiPrice>0?item.aiPrice.toLocaleString():"-"}</td>
            <td style={{padding:"5px",textAlign:"center",fontSize:10,color:S.blue,cursor:isEdit?"pointer":"default"}} onClick={()=>isEdit&&upItem(q.id,iI,"finalPrice",item.webPrice)}>{item.webPrice>0?item.webPrice.toLocaleString():"-"}</td>
            <td style={{padding:"5px",textAlign:"center"}}>{isEdit?<input type="number" value={item.finalPrice} onChange={e=>upItem(q.id,iI,"finalPrice",Number(e.target.value))} style={{width:65,padding:"3px",border:`2px solid ${S.gold}`,borderRadius:5,textAlign:"center",fontSize:11,fontFamily:S.font,fontWeight:700,outline:"none",color:S.gold}}/>:<span style={{fontSize:12,fontWeight:800,color:S.gold}}>{item.finalPrice.toLocaleString()}</span>}</td>
            <td style={{padding:"5px",textAlign:"center",fontSize:11,fontWeight:800,color:S.dark}}>{(item.qty*item.finalPrice).toLocaleString()}</td>
          </tr>)})}</tbody></table></div>
      {isEdit&&<div style={{padding:"8px 16px",background:"#fffbeb",borderTop:`1px solid ${S.gl}`,fontSize:10,color:"#92400e",fontFamily:S.font}}>💡 {t.editTip}</div>}
    </div>)})}
  </div>)
}

function DatabaseTab({learnedItems,onAdd,onDelete,onUpdate,lang,t}){
  const[search,setSearch]=useState("");const[showAdd,setShowAdd]=useState(false);const[ni,setNi]=useState({name:"",unit:"Each",price:0,partNo:""});
  const fl=learnedItems.filter(i=>!search||i.name.toLowerCase().includes(search.toLowerCase()));
  return(<div style={{display:"flex",flexDirection:"column",gap:10}}>
    <div style={{background:S.white,borderRadius:9,border:`1px solid ${S.gl}`,padding:"10px 12px",display:"flex",alignItems:"center",gap:7}}>
      <span>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search} dir={t.dir} style={{flex:1,border:"none",outline:"none",fontSize:12,fontFamily:S.font}}/>
      <span style={{fontSize:10,color:S.gray,fontFamily:S.font}}>{Object.values(PRICE_DB).reduce((s,c)=>s+c.items.length,0)+learnedItems.length}</span>
      <button onClick={()=>setShowAdd(!showAdd)} style={{padding:"4px 10px",background:`${S.green}10`,border:`1px solid ${S.green}40`,borderRadius:5,color:S.green,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:S.font}}>+ {t.addManual}</button>
    </div>
    {showAdd&&<div style={{background:S.white,borderRadius:9,border:`1px solid ${S.green}40`,padding:12}}>
      <div style={{fontSize:11,fontWeight:700,color:S.green,fontFamily:S.font,marginBottom:8}}>➕ {t.addProduct}</div>
      <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"}}>
        <input placeholder={t.prodName} value={ni.name} onChange={e=>setNi(p=>({...p,name:e.target.value}))} style={{flex:1,minWidth:150,padding:"5px 8px",border:`1px solid ${S.gl}`,borderRadius:5,fontSize:11,fontFamily:S.font,outline:"none"}}/>
        <select value={ni.unit} onChange={e=>setNi(p=>({...p,unit:e.target.value}))} style={{padding:"5px",border:`1px solid ${S.gl}`,borderRadius:5,fontSize:10,fontFamily:S.font}}>{["Each","Meter","Set","Lot"].map(u=><option key={u}>{u}</option>)}</select>
        <input type="number" placeholder={t.price} value={ni.price||""} onChange={e=>setNi(p=>({...p,price:Number(e.target.value)}))} style={{width:75,padding:"5px",border:`1px solid ${S.gl}`,borderRadius:5,fontSize:11,fontFamily:S.font,outline:"none",textAlign:"center"}}/>
        <button onClick={()=>{if(!ni.name||!ni.price){alert("!");return}onAdd(ni);setNi({name:"",unit:"Each",price:0,partNo:""});setShowAdd(false)}} style={{padding:"5px 12px",background:S.green,border:"none",borderRadius:5,color:"#fff",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:S.font}}>{t.save}</button>
      </div></div>}
    {fl.length>0&&<div style={{background:S.white,borderRadius:9,border:`1px solid ${S.gl}`,overflow:"hidden"}}>
      <div style={{padding:"9px 12px",background:`${S.purple}08`,borderBottom:`1px solid ${S.gl}`,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,fontWeight:700,color:S.purple,fontFamily:S.font}}>🧠 {t.learned} ({fl.length})</span><span style={{fontSize:9,color:S.gray,fontFamily:S.font}}>{t.learnedDesc}</span></div>
      <table style={{width:"100%",borderCollapse:"collapse",fontFamily:S.font}}><tbody>{fl.map(item=>(<tr key={item.id} style={{borderBottom:"1px solid #f2f4f6"}}>
        <td style={{padding:"5px 8px",fontSize:9,color:S.purple,fontWeight:600,width:60}}>{item.id}</td>
        <td style={{padding:"5px 8px",fontSize:10,fontWeight:600,color:S.dark}}>{item.name}</td>
        <td style={{padding:"5px",fontSize:9,color:S.gray,width:45}}>{item.unit}</td>
        <td style={{padding:"5px",textAlign:"center",width:70}}><input type="number" value={item.price} onChange={e=>onUpdate(item.id,"price",Number(e.target.value))} style={{width:60,padding:"2px 4px",border:`1px solid ${S.gl}`,borderRadius:3,textAlign:"center",fontSize:11,fontFamily:S.font,fontWeight:800,color:S.gold,outline:"none"}}/></td>
        <td style={{padding:"5px",fontSize:8,color:S.gray,width:65}}>{item.lastUpdated}</td>
        <td style={{padding:"5px",textAlign:"center",width:50}}><span style={{padding:"1px 5px",borderRadius:3,fontSize:8,fontWeight:700,background:item.source==="learned"?`${S.purple}12`:`${S.blue}12`,color:item.source==="learned"?S.purple:S.blue}}>{item.source==="learned"?`🧠 ${t.auto}`:`✏️ ${t.manual}`}</span></td>
        <td style={{padding:"5px",width:25}}><button onClick={()=>onDelete(item.id)} style={{background:"none",border:"none",color:"#ddd",cursor:"pointer",fontSize:12}} onMouseEnter={e=>e.target.style.color=S.red} onMouseLeave={e=>e.target.style.color="#ddd"}>×</button></td>
      </tr>))}</tbody></table></div>}
    {Object.entries(PRICE_DB).map(([k,cat])=>{const items=cat.items.filter(i=>!search||i.name.toLowerCase().includes(search.toLowerCase()));if(search&&!items.length)return null;return(
      <div key={k} style={{background:S.white,borderRadius:9,border:`1px solid ${S.gl}`,overflow:"hidden"}}>
        <div style={{padding:"8px 12px",background:`${S.dark}05`,borderBottom:`1px solid ${S.gl}`,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,fontWeight:700,color:S.dark,fontFamily:S.font}}>{cat.icon} {cat.name}</span><span style={{fontSize:9,color:S.gray,fontFamily:S.font}}>{items.length} — {t.builtin}</span></div>
        <table style={{width:"100%",borderCollapse:"collapse",fontFamily:S.font}}><tbody>{items.map(i=>(<tr key={i.id} style={{borderBottom:"1px solid #f2f4f6"}}>
          <td style={{padding:"5px 8px",fontSize:9,color:S.blue,fontWeight:600,width:60}}>{i.id}</td><td style={{padding:"5px 8px",fontSize:10,fontWeight:600,color:S.dark}}>{i.name}</td>
          <td style={{padding:"5px",fontSize:9,color:S.gray,width:45}}>{i.unit}</td><td style={{padding:"5px 8px",fontSize:11,fontWeight:800,color:S.gold,width:60,textAlign:"center"}}>{i.price.toLocaleString()}</td>
        </tr>))}</tbody></table></div>)})}
  </div>)
}

// ========== PERSISTENT ==========
function loadLearnedDB(){return window.__learnedDB||[]}
function saveLearnedDB(items){window.__learnedDB=items}

export default function App(){
  const[activeTab,setActiveTab]=useState("pricing");const[saved,setSaved]=useState([]);const[learned,setLearned]=useState(loadLearnedDB());const[lang,setLang]=useState("ar");
  useEffect(()=>{saveLearnedDB(learned)},[learned]);
  const t=TR[lang];
  const saveQ=(q)=>setSaved(p=>[q,...p]);
  const learn=(items)=>{setLearned(p=>{const u=[...p];items.forEach(item=>{if(!item.finalPrice||item.finalPrice<=0)return;const cd=item.description.replace(/\(.*?\)/g,"").trim().toLowerCase();const ei=u.findIndex(l=>l.name.toLowerCase()===cd||l.name.toLowerCase().includes(cd)||cd.includes(l.name.toLowerCase()));if(ei>=0)u[ei]={...u[ei],price:item.finalPrice,unit:item.unit||u[ei].unit,lastUpdated:new Date().toISOString().split("T")[0],usageCount:(u[ei].usageCount||1)+1};else u.push({id:`LRN-${String(u.length+1).padStart(3,"0")}`,name:item.description.replace(/\(.*?\)/g,"").trim(),partNo:item.partNo||"",unit:item.unit||"Each",price:item.finalPrice,source:"learned",lastUpdated:new Date().toISOString().split("T")[0],usageCount:1})});return u})};
  const addM=(item)=>setLearned(p=>[...p,{id:`MAN-${String(p.length+1).padStart(3,"0")}`,  ...item,source:"manual",lastUpdated:new Date().toISOString().split("T")[0],usageCount:0}]);
  const delL=(id)=>setLearned(p=>p.filter(i=>i.id!==id));
  const upL=(id,f,v)=>setLearned(p=>p.map(i=>i.id===id?{...i,[f]:v,lastUpdated:new Date().toISOString().split("T")[0]}:i));
  return(<div dir={t.dir} style={{minHeight:"100vh",background:S.bg,fontFamily:S.font}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;600;700;800;900&display=swap');@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box;margin:0;padding:0}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none}input[type=number]{-moz-appearance:textfield}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:#f0f2f5}::-webkit-scrollbar-thumb{background:#c8973e;border-radius:3px}`}</style>
    <Header activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} setLang={setLang} t={t}/>
    <div style={{maxWidth:1000,margin:"0 auto",padding:"14px 10px 50px"}}>
      {activeTab==="pricing"&&<PricingTab onSave={saveQ} goToQuotations={()=>setActiveTab("quotations")} learnedItems={learned} lang={lang} t={t}/>}
      {activeTab==="quotations"&&<QuotationsTab quotations={saved} setQuotations={setSaved} onLearn={learn} lang={lang} t={t}/>}
      {activeTab==="database"&&<DatabaseTab learnedItems={learned} onAdd={addM} onDelete={delL} onUpdate={upL} lang={lang} t={t}/>}
    </div></div>)
}
