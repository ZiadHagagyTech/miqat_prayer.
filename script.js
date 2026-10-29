
const citySelect = document.getElementById("citySelect");
const prayerGrid = document.getElementById("prayerGrid");
const nextPrayerName = document.getElementById("nextPrayerName");
const nextPrayerTime = document.getElementById("nextPrayerTime");
const countdown = document.getElementById("countdown");
const countdownHint = document.getElementById("countdownHint");
const gregorianDate = document.getElementById("gregorianDate");
const hijriDate = document.getElementById("hijriDate");
const statusMessage = document.getElementById("statusMessage");
const prayerSubtitle = document.getElementById("prayerSubtitle");
const refreshButton = document.getElementById("refreshButton");
const themeButton = document.getElementById("themeButton");
const themeIcon = document.getElementById("themeIcon");

// المدن المصرية مجمعة حسب المحافظة، وتستخدم إحداثيات كل مدينة لجلب مواقيت أدق.
const governorates = [
  { name: "القاهرة", cities: [
    ["Cairo", "القاهرة", 30.0444, 31.2357], ["NewCairo", "القاهرة الجديدة", 30.0074, 31.4913], ["Helwan", "حلوان", 29.8414, 31.3008]
  ]},
  { name: "الجيزة", cities: [
    ["Giza", "الجيزة", 30.0131, 31.2089], ["SixthOctober", "مدينة 6 أكتوبر", 29.9553, 30.9176], ["SheikhZayed", "الشيخ زايد", 30.0444, 30.9864], ["Hawamdia", "الحوامدية", 29.9, 31.25], ["Badrashin", "البدرشين", 29.85, 31.28], ["Atfih", "أطفيح", 29.408, 31.001]
  ]},
  { name: "الإسكندرية", cities: [
    ["Alexandria", "الإسكندرية", 31.2001, 29.9187], ["BorgElArab", "برج العرب", 30.9, 29.55], ["NewBorgElArab", "برج العرب الجديدة", 30.87, 29.59], ["NewAlexandria", "مدينة الإسكندرية الجديدة", 31.0, 29.7]
  ]},
  { name: "الدقهلية", cities: [
    ["Mansoura", "المنصورة", 31.0409, 31.3785], ["Talkha", "طلخا", 31.0539, 31.3779], ["MitGhamr", "ميت غمر", 30.7167, 31.25], ["Aga", "أجا", 30.941, 31.291], ["Sherbin", "شربين", 31.196, 31.524]
  ]},
  { name: "البحر الأحمر", cities: [
    ["Hurghada", "الغردقة", 27.2579, 33.8116], ["RasGharib", "رأس غارب", 28.3583, 33.0783], ["Safaga", "سفاجا", 26.749, 33.938], ["Quseir", "القصير", 26.1043, 34.277], ["MarsaAlam", "مرسى علم", 25.0676, 34.878], ["Shalateen", "شلاتين", 23.129, 35.59], ["Halaib", "حلايب", 22.2, 36.65], ["AbuRamad", "أبو رماد", 22.35, 36.4]
  ]},
  { name: "البحيرة", cities: [
    ["Damanhur", "دمنهور", 31.0341, 30.4682], ["KafrElDawwar", "كفر الدوار", 31.1338, 30.1297], ["Rashid", "رشيد", 31.4044, 30.4164], ["Edko", "إدكو", 31.307, 30.298], ["AbuHummus", "أبو حمص", 31.093, 30.313]
  ]},
  { name: "الفيوم", cities: [
    ["Faiyum", "الفيوم", 29.3084, 30.8428], ["Sanhur", "سنورس", 29.407, 30.867], ["Ibsheway", "إبشواي", 29.358, 30.681], ["Tamiya", "طامية", 29.476, 30.961]
  ]},
  { name: "الغربية", cities: [
    ["Tanta", "طنطا", 30.7865, 31.0004], ["MahallaKubra", "المحلة الكبرى", 30.9706, 31.1669], ["Zefta", "زفتى", 30.714, 31.244], ["KafrElZayat", "كفر الزيات", 30.824, 30.818], ["Samanoud", "سمنود", 30.961, 31.242]
  ]},
  { name: "الإسماعيلية", cities: [
    ["Ismailia", "الإسماعيلية", 30.5965, 32.2715], ["Fayed", "فايد", 30.328, 32.304], ["TellElKebir", "التل الكبير", 30.544, 31.785], ["QantaraEast", "القنطرة شرق", 30.856, 32.313], ["QantaraWest", "القنطرة غرب", 30.858, 32.313]
  ]},
  { name: "المنوفية", cities: [
    ["ShibinElKom", "شبين الكوم", 30.5526, 31.009], ["Menouf", "منوف", 30.465, 30.931], ["Ashmoun", "أشمون", 30.296, 30.976], ["Quesna", "قويسنا", 30.566, 31.157], ["Tala", "تلا", 30.68, 30.94], ["BerketElSab", "بركة السبع", 30.627, 31.078]
  ]},
  { name: "المنيا", cities: [
    ["Minya", "المنيا", 28.1099, 30.7503], ["NewMinya", "المنيا الجديدة", 28.05, 30.85], ["Mallawi", "ملوي", 27.7314, 30.8417], ["BeniMazar", "بني مزار", 28.503, 30.8], ["Maghagha", "مغاغة", 28.647, 30.84], ["Samalut", "سمالوط", 28.312, 30.711], ["AbuQurqas", "أبو قرقاص", 27.931, 30.838]
  ]},
  { name: "القليوبية", cities: [
    ["Banha", "بنها", 30.466, 31.1848], ["ShubraElKheima", "شبرا الخيمة", 30.1286, 31.2422], ["Qalyub", "قليوب", 30.179, 31.205], ["Qaha", "قها", 30.28, 31.2], ["Khanka", "الخانكة", 30.210, 31.368], ["Obour", "العبور", 30.228, 31.481]
  ]},
  { name: "الوادي الجديد", cities: [
    ["Kharga", "الخارجة", 25.439, 30.5586], ["Dakhla", "الداخلة", 25.489, 29.001], ["Farafra", "الفرافرة", 27.056, 27.969], ["Baris", "باريس", 24.69, 30.60]
  ]},
  { name: "السويس", cities: [
    ["Suez", "السويس", 29.9668, 32.5498], ["AinSokhna", "العين السخنة", 29.6, 32.33]
  ]},
  { name: "أسوان", cities: [
    ["Aswan", "أسوان", 24.0889, 32.8998], ["KomOmbo", "كوم أمبو", 24.476, 32.946], ["Edfu", "إدفو", 24.979, 32.874], ["Daraw", "دراو", 24.416, 32.931], ["AbuSimbel", "أبو سمبل", 22.3457, 31.6162]
  ]},
  { name: "أسيوط", cities: [
    ["Assiut", "أسيوط", 27.1809, 31.1837], ["Abnub", "أبنوب", 27.269, 31.151], ["Manfalut", "منفلوط", 27.312, 30.97], ["AbuTig", "أبو تيج", 27.044, 31.319], ["Dayrut", "ديروط", 27.557, 30.807]
  ]},
  { name: "بني سويف", cities: [
    ["BeniSuef", "بني سويف", 29.0661, 31.0994], ["Wasta", "الواسطى", 29.337, 31.205], ["Nasser", "ناصر", 29.148, 31.127], ["Ihnasia", "إهناسيا", 28.929, 30.936], ["Beba", "ببا", 28.922, 30.982], ["Fashn", "الفشن", 28.824, 30.899]
  ]},
  { name: "بورسعيد", cities: [
    ["PortSaid", "بورسعيد", 31.2653, 32.3019], ["PortFuad", "بورفؤاد", 31.244, 32.325]
  ]},
  { name: "دمياط", cities: [
    ["Damietta", "دمياط", 31.4175, 31.8144], ["NewDamietta", "دمياط الجديدة", 31.43, 31.68], ["Faraskur", "فارسكور", 31.329, 31.716], ["Zarqa", "الزرقا", 31.208, 31.635], ["RasElBar", "رأس البر", 31.516, 31.817]
  ]},
  { name: "الشرقية", cities: [
    ["Zagazig", "الزقازيق", 30.5877, 31.502], ["10thRamadan", "العاشر من رمضان", 30.296, 31.746], ["Belbeis", "بلبيس", 30.420, 31.562], ["MinyaElQamh", "منيا القمح", 30.506, 31.359], ["AbuHammad", "أبو حماد", 30.546, 31.675], ["Faqous", "فاقوس", 30.729, 31.797], ["Hihya", "ههيا", 30.671, 31.588]
  ]},
  { name: "جنوب سيناء", cities: [
    ["ElTor", "الطور", 28.2417, 33.6222], ["SharmElSheikh", "شرم الشيخ", 27.9158, 34.3299], ["Dahab", "دهب", 28.5091, 34.5136], ["Nuweiba", "نويبع", 29.0468, 34.6634], ["SaintCatherine", "سانت كاترين", 28.5619, 33.9497], ["Taba", "طابا", 29.491, 34.896]
  ]},
  { name: "كفر الشيخ", cities: [
    ["KafrElSheikh", "كفر الشيخ", 31.1107, 30.9388], ["Desouk", "دسوق", 31.1326, 30.6465], ["Fuwwah", "فوه", 31.202, 30.548], ["Baltim", "بلطيم", 31.55, 31.09], ["Metoubes", "مطوبس", 31.286, 30.523], ["Biyala", "بيلا", 31.177, 31.0]
  ]},
  { name: "مطروح", cities: [
    ["MarsaMatruh", "مرسى مطروح", 31.3543, 27.2373], ["Siwa", "سيوة", 29.2032, 25.5195], ["Dabaa", "الضبعة", 31.034, 28.433], ["Sallum", "السلوم", 31.566, 25.157], ["ElAlamein", "العلمين", 30.830, 28.955]
  ]},
  { name: "الأقصر", cities: [
    ["Luxor", "الأقصر", 25.6872, 32.6396], ["Esna", "إسنا", 25.293, 32.554], ["Armant", "أرمنت", 25.619, 32.523], ["Tiba", "طيبة الجديدة", 25.75, 32.7]
  ]},
  { name: "قنا", cities: [
    ["Qena", "قنا", 26.1551, 32.716], ["NagHammadi", "نجع حمادي", 26.049, 32.241], ["Qus", "قوص", 25.915, 32.763], ["Deshna", "دشنا", 26.124, 32.475], ["Farshut", "فرشوط", 26.055, 32.164]
  ]},
  { name: "شمال سيناء", cities: [
    ["Arish", "العريش", 31.131, 33.7984], ["BirElAbd", "بئر العبد", 31.018, 33.009], ["SheikhZuweid", "الشيخ زويد", 31.216, 34.111], ["Rafah", "رفح", 31.287, 34.24]
  ]},
  { name: "سوهاج", cities: [
    ["Sohag", "سوهاج", 26.5591, 31.6957], ["Akhmim", "أخميم", 26.562, 31.745], ["Girga", "جرجا", 26.337, 31.892], ["Tahta", "طهطا", 26.769, 31.502], ["Balyana", "البلينا", 26.236, 31.996], ["Maragha", "المراغة", 26.7, 31.6]
  ]},
];

const cities = Object.fromEntries(
  governorates.flatMap(governorate => governorate.cities.map(([code, name, lat, lon]) => [
    code, { name, governorate: governorate.name, lat, lon }
  ]))
);

function populateCitySelect() {
  citySelect.innerHTML = "";
  governorates.forEach(governorate => {
    const group = document.createElement("optgroup");
    group.label = governorate.name;
    governorate.cities.forEach(([code, name]) => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = name;
      group.appendChild(option);
    });
    citySelect.appendChild(group);
  });
  citySelect.value = "Luxor";
}
populateCitySelect();

// آية اليوم: 31 آية موثقة المرجع، تتغير حسب يوم الشهر وتبدأ من جديد كل شهر.
const dailyVerses = [
  { text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", surah: "الشرح", number: 6 },
  { text: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", surah: "الرعد", number: 28 },
  { text: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنْتُمْ", surah: "الحديد", number: 4 },
  { text: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا", surah: "التوبة", number: 40 },
  { text: "وَقُلْ رَبِّ زِدْنِي عِلْمًا", surah: "طه", number: 114 },
  { text: "فَإِنِّي قَرِيبٌ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ", surah: "البقرة", number: 186 },
  { text: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", surah: "البقرة", number: 153 },
  { text: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", surah: "الطلاق", number: 3 },
  { text: "إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ", surah: "البقرة", number: 195 },
  { text: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ", surah: "يوسف", number: 87 },
  { text: "إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِنَ الْمُحْسِنِينَ", surah: "الأعراف", number: 56 },
  { text: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ", surah: "هود", number: 88 },
  { text: "إِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ", surah: "البقرة", number: 173 },
  { text: "وَبَشِّرِ الصَّابِرِينَ", surah: "البقرة", number: 155 },
  { text: "إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ", surah: "التوبة", number: 120 },
  { text: "فَاذْكُرُونِي أَذْكُرْكُمْ", surah: "البقرة", number: 152 },
  { text: "وَقُلِ الْحَمْدُ لِلَّهِ", surah: "النمل", number: 93 },
  { text: "إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ", surah: "البقرة", number: 222 },
  { text: "وَلَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ", surah: "الزمر", number: 53 },
  { text: "وَهُوَ خَيْرُ الرَّازِقِينَ", surah: "الجمعة", number: 11 },
  { text: "إِنَّ اللَّهَ بِكُلِّ شَيْءٍ عَلِيمٌ", surah: "البقرة", number: 282 },
  { text: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ", surah: "البقرة", number: 45 },
  { text: "إِنَّ اللَّهَ يُدَافِعُ عَنِ الَّذِينَ آمَنُوا", surah: "الحج", number: 38 },
  { text: "وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ", surah: "الأعراف", number: 156 },
  { text: "إِنَّ رَبِّي قَرِيبٌ مُّجِيبٌ", surah: "هود", number: 61 },
  { text: "وَاللَّهُ خَيْرٌ حَافِظًا", surah: "يوسف", number: 64 },
  { text: "إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ", surah: "آل عمران", number: 159 },
  { text: "وَقُولُوا لِلنَّاسِ حُسْنًا", surah: "البقرة", number: 83 },
  { text: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ", surah: "النحل", number: 90 },
  { text: "وَهُوَ أَرْحَمُ الرَّاحِمِينَ", surah: "يوسف", number: 64 },
  { text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً", surah: "البقرة", number: 201 }
];

function updateDailyVerse() {
  const textElement = document.getElementById("dailyVerseText");
  const referenceElement = document.getElementById("dailyVerseReference");
  if (!textElement || !referenceElement) return;
  // اليوم حسب توقيت مصر، مع ضمان ثبات الآية خلال اليوم وإعادة الدورة كل شهر.
  const egyptDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" }));
  const verse = dailyVerses[Math.min(egyptDate.getDate() - 1, dailyVerses.length - 1)];
  textElement.textContent = `﴿ ${verse.text} ﴾`;
  referenceElement.textContent = `سورة ${verse.surah} - الآية ${verse.number}`;
}
updateDailyVerse();

const prayers = [
    { key: "Fajr", name: "الفجر" },
    { key: "Sunrise", name: "الشروق" },
    { key: "Dhuhr", name: "الظهر" },
    { key: "Asr", name: "العصر" },
    { key: "Maghrib", name: "المغرب" },
    { key: "Isha", name: "العشاء" }
];

const mainPrayers = prayers.filter(
    prayer => prayer.key !== "Sunrise"
);

let prayerTimes = null;
let hijriDateText = "";
let countdownInterval = null;
let requestNumber = 0;

// عرض التاريخ الميلادي
function showGregorianDate() {
    const now = new Date();

    gregorianDate.textContent = now.toLocaleDateString("ar-EG", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

// تحويل الوقت القادم من الخدمة إلى صيغة HH:MM
function cleanTime(time) {
    return String(time).trim().split(" ")[0].slice(0, 5);
}


function formatPrayerTime12(time) {
    const cleanedTime = cleanTime(time);
    const match = cleanedTime.match(/^(\d{1,2}):(\d{2})$/);

    if (!match) return cleanedTime;

    let hours = Number(match[1]);
    const minutes = match[2];

    const period = hours >= 12 ? "م" : "ص";

    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
}


// تحويل وقت الصلاة إلى تاريخ ووقت على جهاز المستخدم
function makePrayerDate(time, dayOffset = 0) {
    const [hours, minutes] = cleanTime(time)
        .split(":")
        .map(Number);

    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    date.setHours(hours, minutes, 0, 0);

    return date;
}

// تنسيق الوقت للعرض
function formatTime(time) {
    const [hours, minutes] = cleanTime(time)
        .split(":")
        .map(Number);

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString("ar-EG", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

// عرض بطاقات مواقيت الصلاة
function renderPrayerCards() {
    prayerGrid.innerHTML = "";

    prayers.forEach(prayer => {
        const card = document.createElement("article");
        card.className = "prayer-card";
        card.dataset.prayer = prayer.key;

        const name = document.createElement("span");
        name.textContent = prayer.name;

        const time = document.createElement("strong");
        time.textContent = formatTime(prayerTimes[prayer.key]);

        card.append(name, time);
        prayerGrid.appendChild(card);
    });
}

// تحديد الصلاة القادمة والوقت المتبقي
function updateNextPrayer() {
    if (!prayerTimes) return;

    const now = new Date();

    let nextPrayer = null;
    let targetDate = null;

    for (const prayer of mainPrayers) {
        const candidate = makePrayerDate(prayerTimes[prayer.key]);

        if (candidate > now) {
            nextPrayer = prayer;
            targetDate = candidate;
            break;
        }
    }

    // إذا انتهت صلوات اليوم، تكون الصلاة القادمة فجر الغد.
    if (!nextPrayer) {
        nextPrayer = mainPrayers[0];
        targetDate = makePrayerDate(
            prayerTimes[nextPrayer.key],
            1
        );
    }

    nextPrayerName.textContent = nextPrayer.name;
    nextPrayerTime.textContent = formatTime(
        prayerTimes[nextPrayer.key]
    );

    // تمييز بطاقة الصلاة القادمة
    document.querySelectorAll(".prayer-card").forEach(card => {
        card.classList.toggle(
            "next",
            card.dataset.prayer === nextPrayer.key
        );
    });

    // حساب الوقت المتبقي بالثواني
    const remainingSeconds = Math.max(
        0,
        Math.floor((targetDate.getTime() - now.getTime()) / 1000)
    );

    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    countdown.textContent = [hours, minutes, seconds]
        .map(number => String(number).padStart(2, "0"))
        .join(":");

    countdownHint.textContent =
        nextPrayer.key === "Fajr" &&
        mainPrayers.every(prayer =>
            makePrayerDate(prayerTimes[prayer.key]) <= now
        )
            ? "فجر اليوم التالي"
            : "يتبقى على موعد الصلاة";

    // تحديث التاريخ عند منتصف الليل
    showGregorianDate();
}

// جلب المواقيت من الإنترنت
async function loadPrayerTimes() {
    const currentRequest = ++requestNumber;
    const cityCode = citySelect.value;
    const city = cities[cityCode];

    if (!city) return;

    prayerTimes = null;
    clearInterval(countdownInterval);

    statusMessage.textContent = "جارٍ تحميل مواقيت الصلاة...";
    refreshButton.disabled = true;
    refreshButton.textContent = "جارٍ التحديث...";

    prayerGrid.querySelectorAll("strong").forEach(element => {
        element.textContent = "--:--";
    });

    nextPrayerName.textContent = "جارٍ تحديد الصلاة القادمة...";
    nextPrayerTime.textContent = "--:--";
    countdown.textContent = "--:--:--";

    prayerSubtitle.textContent =
        `مواقيت اليوم في ${city.name}`;

    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    const dateString = `${day}-${month}-${year}`;

    const url =
        `https://api.aladhan.com/v1/timings/${dateString}` +
        `?latitude=${city.lat}&longitude=${city.lon}` +
        `&method=5`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("تعذر الاتصال بخدمة المواقيت.");
        }

        const result = await response.json();

        if (result.code !== 200 || !result.data?.timings) {
            throw new Error("لم تصل بيانات مواقيت الصلاة بشكل صحيح.");
        }

        // تجاهل النتائج القديمة إذا اختار المستخدم مدينة أخرى
        if (currentRequest !== requestNumber) return;

        prayerTimes = result.data.timings;

        const requiredKeys = [
            "Fajr", "Sunrise", "Dhuhr",
            "Asr", "Maghrib", "Isha"
        ];

        for (const key of requiredKeys) {
            if (!prayerTimes[key]) {
                throw new Error("بعض مواقيت الصلاة غير متوفرة.");
            }
        }

        const hijri = result.data.date?.hijri;

        if (hijri) {
            hijriDateText =
                `${hijri.day} ${hijri.month.ar} ${hijri.year} هـ`;
        } else {
            hijriDateText = "غير متاح حاليًا";
        }

        hijriDate.textContent = hijriDateText;

        renderPrayerCards();
        updateNextPrayer();

        statusMessage.textContent =
            `تم تحميل المواقيت بنجاح لمدينة ${city.name}. ` +
            "طريقة الحساب: الهيئة المصرية العامة للمساحة.";

        countdownInterval = setInterval(updateNextPrayer, 1000);

    } catch (error) {
        if (currentRequest !== requestNumber) return;

        console.error("Prayer times error:", error);

        statusMessage.textContent =
            "تعذر تحميل المواقيت. تأكد من اتصال الإنترنت ثم اضغط تحديث المواقيت.";

        nextPrayerName.textContent = "المواقيت غير متاحة";
        nextPrayerTime.textContent = "--:--";
        countdown.textContent = "--:--:--";

    } finally {
        if (currentRequest === requestNumber) {
            refreshButton.disabled = false;
            refreshButton.textContent = "↻ تحديث المواقيت";
        }
    }
}

// تغيير المدينة
citySelect.addEventListener("change", () => {
    try {
        localStorage.setItem("miqatCity", citySelect.value);
    } catch (error) {
        console.warn("تعذر حفظ المدينة على هذا الجهاز.");
    }

    loadPrayerTimes();
});

// زر تحديث المواقيت
refreshButton.addEventListener("click", loadPrayerTimes);

// الوضع الفاتح والداكن
function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeIcon.textContent = theme === "dark" ? "☀" : "☾";
    themeButton.setAttribute(
        "aria-label",
        theme === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"
    );

    try {
        localStorage.setItem("miqatTheme", theme);
    } catch (error) {
        console.warn("تعذر حفظ المظهر.");
    }
}

themeButton.addEventListener("click", () => {
    const currentTheme =
        document.documentElement.dataset.theme || "light";

    setTheme(currentTheme === "dark" ? "light" : "dark");
});

// تهيئة الموقع عند فتح الصفحة
function initializeMiqat() {
    showGregorianDate();

    try {
        const savedCity = localStorage.getItem("miqatCity");

        if (savedCity && cities[savedCity]) {
            citySelect.value = savedCity;
        }

        const savedTheme = localStorage.getItem("miqatTheme");

        if (savedTheme === "dark" || savedTheme === "light") {
            setTheme(savedTheme);
        } else {
            setTheme("light");
        }
    } catch (error) {
        setTheme("light");
    }

    loadPrayerTimes();
}

initializeMiqat();



/* ==============================
   اتجاه القبلة - Miqat Qibla
================================ */

const locateButton = document.getElementById("locateButton");
const qiblaAngle = document.getElementById("qiblaAngle");
const qiblaDirection = document.getElementById("qiblaDirection");
const qiblaLocation = document.getElementById("qiblaLocation");
const qiblaNeedle = document.getElementById("qiblaNeedle");
const qiblaCompass = document.getElementById("qiblaCompass");
const compassHelp = document.getElementById("compassHelp");
const deviceCompassStatus = document.getElementById("deviceCompassStatus");

// إحداثيات الكعبة المشرفة
const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

let qiblaBearing = null;
let deviceHeading = null;
let orientationListening = false;
let compassReadTimeout = null;

// حساب الفرق بين إحداثيات موقع المستخدم والكعبة
function calculateQiblaBearing(latitude, longitude) {
    const toRadians = degrees => degrees * Math.PI / 180;
    const toDegrees = radians => radians * 180 / Math.PI;

    const lat1 = toRadians(latitude);
    const lat2 = toRadians(KAABA_LAT);
    const deltaLon = toRadians(KAABA_LON - longitude);

    const y = Math.sin(deltaLon) * Math.cos(lat2);

    const x =
        Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);

    const bearing = (toDegrees(Math.atan2(y, x)) + 360) % 360;

    return bearing;
}

// وصف تقريبي لاتجاه القبلة بالنسبة إلى الشمال
function getDirectionName(degrees) {
    const directions = [
        "الشمال",
        "الشمال الشرقي",
        "الشرق",
        "الجنوب الشرقي",
        "الجنوب",
        "الجنوب الغربي",
        "الغرب",
        "الشمال الغربي"
    ];

    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

// تحديث شكل البوصلة
function updateQiblaCompass() {
    if (qiblaBearing === null) return;

    // لو مستشعر الاتجاه شغال، ندوّر الإبرة نسبة لاتجاه الهاتف.
    // لو مش شغال، نعرض الاتجاه بالنسبة للشمال الحقيقي.
    const rotation = deviceHeading === null
        ? qiblaBearing
        : qiblaBearing - deviceHeading;

    qiblaNeedle.style.transform = `rotate(${rotation}deg)`;

    if (deviceHeading === null) {
        compassHelp.textContent =
            "الاتجاه محسوب من الشمال الحقيقي. البوصلة الحية غير متاحة حاليًا.";
    } else {
        compassHelp.textContent =
            "حرّك الهاتف ببطء؛ إبرة القبلة تتغير حسب اتجاه الجهاز.";
    }
}

// معالجة حركة الهاتف
function handleDeviceOrientation(event) {
    let heading = null;

    // بعض أجهزة iPhone توفر اتجاه البوصلة مباشرة.
    if (typeof event.webkitCompassHeading === "number") {
        heading = event.webkitCompassHeading;
    } else if (
        event.absolute === true &&
        typeof event.alpha === "number"
    ) {
        // نستخدم alpha فقط عندما يكون اتجاه المستشعر مطلقًا.
        heading = (360 - event.alpha) % 360;
    }

    if (heading === null || !Number.isFinite(heading)) {
        return;
    }

    deviceHeading = (heading + 360) % 360;

    if (compassReadTimeout !== null) {
        clearTimeout(compassReadTimeout);
        compassReadTimeout = null;
    }

    deviceCompassStatus.textContent =
        "البوصلة الحية تعمل. حرّك الهاتف ببطء، وقد تتأثر الدقة بمعايرة المستشعر.";

    updateQiblaCompass();
}

// تشغيل مستشعر الاتجاه إذا كان مدعومًا ومسموحًا
async function startDeviceCompass() {
    if (!("DeviceOrientationEvent" in window)) {
        deviceCompassStatus.textContent =
            "جهازك أو متصفحك لا يدعم مستشعر اتجاه الهاتف. " +
            "يمكنك الاعتماد على زاوية القبلة المحسوبة.";
        return;
    }

    // لا نطلب الإذن ولا نضيف مستمعين أكثر من مرة.
    if (orientationListening) {
        deviceCompassStatus.textContent = deviceHeading !== null
            ? "البوصلة الحية تعمل بالفعل."
            : "جارٍ انتظار قراءة مستشعر الاتجاه...";
        return;
    }

    try {
        // بعض إصدارات iOS تطلب الإذن من خلال ضغطة المستخدم.
        if (
            typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
            const permission =
                await DeviceOrientationEvent.requestPermission();

            if (permission !== "granted") {
                deviceCompassStatus.textContent =
                    "لم يتم السماح بمستشعر الاتجاه. " +
                    "ستظل زاوية القبلة المحسوبة متاحة.";
                return;
            }
        }

        window.addEventListener(
            "deviceorientationabsolute",
            handleDeviceOrientation
        );

        window.addEventListener(
            "deviceorientation",
            handleDeviceOrientation
        );

        orientationListening = true;

        deviceCompassStatus.textContent =
            "تم تشغيل مستمع البوصلة. جارٍ انتظار قراءة من مستشعر الهاتف...";

        // لو لم تصل قراءة خلال فترة قصيرة، نوضح أن البوصلة الحية
        // غير متاحة بدلًا من ترك رسالة الانتظار بلا نهاية.
        compassReadTimeout = window.setTimeout(function () {
            if (deviceHeading === null) {
                deviceCompassStatus.textContent =
                    "لم تصل قراءة من مستشعر البوصلة. قد لا يدعم الجهاز أو المتصفح هذه الميزة، " +
                    "أو قد تحتاج إلى فتح الموقع عبر HTTPS.";
            }
            compassReadTimeout = null;
        }, 8000);

    } catch (error) {
        console.warn("Compass permission error:", error);

        deviceCompassStatus.textContent =
            "تعذر تشغيل مستشعر الاتجاه أو لم يُمنح الإذن. " +
            "يمكنك الاعتماد على زاوية القبلة المحسوبة.";
    }
}

// تحديد موقع المستخدم وحساب القبلة
function locateAndCalculateQibla() {
    if (!navigator.geolocation) {
        deviceCompassStatus.textContent =
            "المتصفح لا يدعم تحديد الموقع الجغرافي.";
        return;
    }

    locateButton.disabled = true;
    locateButton.textContent = "جارٍ تحديد الموقع...";

    deviceCompassStatus.textContent =
        "بانتظار إذن تحديد الموقع من المتصفح...";

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            qiblaBearing = calculateQiblaBearing(
                latitude,
                longitude
            );

            qiblaAngle.textContent =
                `${qiblaBearing.toFixed(1)}°`;

            qiblaDirection.textContent =
                `تقريبًا ناحية ${getDirectionName(qiblaBearing)}`;

            qiblaLocation.textContent =
                `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

            qiblaCompass.setAttribute(
                "aria-label",
                `اتجاه القبلة ${qiblaBearing.toFixed(1)} درجة من الشمال الحقيقي`
            );

            // لا نصفر deviceHeading هنا؛ فقد تكون البوصلة قد أرسلت
            // قراءة بالفعل أثناء انتظار تحديد الموقع.
            updateQiblaCompass();

            locateButton.disabled = false;
            locateButton.innerHTML =
                "<span>⌖</span> تحديث موقعي واتجاه القبلة";

            if (deviceHeading !== null) {
                deviceCompassStatus.textContent =
                    "تم حساب القبلة والبوصلة الحية تعمل.";
            } else if (orientationListening) {
                deviceCompassStatus.textContent =
                    "تم حساب اتجاه القبلة. جارٍ انتظار قراءة مستشعر البوصلة...";
            } else {
                deviceCompassStatus.textContent =
                    "تم حساب اتجاه القبلة. زاوية القبلة متاحة، لكن البوصلة الحية لم تبدأ.";
            }
        },

        function (error) {
            locateButton.disabled = false;
            locateButton.innerHTML =
                "<span>⌖</span> تحديد موقعي وحساب القبلة";

            if (error.code === error.PERMISSION_DENIED) {
                deviceCompassStatus.textContent =
                    "لم تسمح للمتصفح باستخدام موقعك. " +
                    "اسمح بالموقع من إعدادات المتصفح ثم حاول مجددًا.";
            } else if (error.code === error.POSITION_UNAVAILABLE) {
                deviceCompassStatus.textContent =
                    "تعذر تحديد الموقع الحالي. تحقق من إعدادات الموقع في جهازك.";
            } else if (error.code === error.TIMEOUT) {
                deviceCompassStatus.textContent =
                    "استغرق تحديد الموقع وقتًا طويلًا. حاول مرة أخرى.";
            } else {
                deviceCompassStatus.textContent =
                    "حدث خطأ أثناء تحديد الموقع. حاول مرة أخرى.";
            }

            console.error("Geolocation error:", error);
        },

        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 60000
        }
    );
}

/* تشغيل البوصلة وتحديد الموقع عند ضغط المستخدم */
locateButton.addEventListener("click", function () {
    startDeviceCompass();
    locateAndCalculateQibla();
});


/* =========================
   الأذكار اليومية - Miqat
========================= */

const adhkarData = {
    morning: [
        {
            text: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.",
            count: 1
        },
        {
            text: "اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور.",
            count: 1
        },
        {
            text: "رضيت بالله ربًا، وبالإسلام دينًا، وبمحمد صلى الله عليه وسلم نبيًا.",
            count: 3
        },
        {
            text: "سبحان الله وبحمده.",
            count: 100
        }
    ],

    evening: [
        {
            text: "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.",
            count: 1
        },
        {
            text: "اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير.",
            count: 1
        },
        {
            text: "رضيت بالله ربًا، وبالإسلام دينًا، وبمحمد صلى الله عليه وسلم نبيًا.",
            count: 3
        },
        {
            text: "سبحان الله وبحمده.",
            count: 100
        }
    ],

    prayer: [
        {
            text: "أستغفر الله.",
            count: 3
        },
        {
            text: "اللهم أنت السلام ومنك السلام، تباركت يا ذا الجلال والإكرام.",
            count: 1
        },
        {
            text: "سبحان الله.",
            count: 33
        },
        {
            text: "الحمد لله.",
            count: 33
        },
        {
            text: "الله أكبر.",
            count: 33
        }
    ]
};

const adhkarList = document.getElementById("adhkarList");
const adhkarTabs = document.querySelectorAll(".adhkar-tab");
const adhkarProgressCount =
    document.getElementById("adhkarProgressCount");
const adhkarProgressFill =
    document.getElementById("adhkarProgressFill");
const adhkarProgressText =
    document.getElementById("adhkarProgressText");
const adhkarCompleteMessage =
    document.getElementById("adhkarCompleteMessage");
const resetAdhkarButton =
    document.getElementById("resetAdhkarButton");

let currentAdhkarCategory = "morning";
let adhkarProgress = {};

const ADHKAR_STORAGE_KEY = "miqat_adhkar_progress_v1";

function loadAdhkarProgress() {
    try {
        const saved = localStorage.getItem(ADHKAR_STORAGE_KEY);
        adhkarProgress = saved ? JSON.parse(saved) : {};
    } catch (error) {
        adhkarProgress = {};
        console.warn("تعذر قراءة تقدم الأذكار المحفوظ.", error);
    }
}

function saveAdhkarProgress() {
    try {
        localStorage.setItem(
            ADHKAR_STORAGE_KEY,
            JSON.stringify(adhkarProgress)
        );
    } catch (error) {
        console.warn("تعذر حفظ تقدم الأذكار.", error);
    }
}

function getAdhkarKey(category, index) {
    return `${category}_${index}`;
}

function getAdhkarCount(category, index) {
    const key = getAdhkarKey(category, index);
    const savedCount = Number(adhkarProgress[key]) || 0;
    const target = adhkarData[category][index].count;

    return Math.min(Math.max(savedCount, 0), target);
}

function renderAdhkar() {
    if (!adhkarList) return;

    const items = adhkarData[currentAdhkarCategory];

    adhkarTabs.forEach(function (tab) {
        const isActive =
            tab.dataset.category === currentAdhkarCategory;

        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-pressed", String(isActive));
    });

    adhkarProgressText.textContent =
        currentAdhkarCategory === "morning"
            ? "تقدم أذكار الصباح"
            : currentAdhkarCategory === "evening"
                ? "تقدم أذكار المساء"
                : "تقدم أذكار ما بعد الصلاة";

    adhkarList.replaceChildren();

    let completedTotal = 0;
    let targetTotal = 0;

    items.forEach(function (item, index) {
        const completed = getAdhkarCount(
            currentAdhkarCategory,
            index
        );

        completedTotal += completed;
        targetTotal += item.count;

        const card = document.createElement("article");
        card.className = "adhkar-card";

        if (completed >= item.count) {
            card.classList.add("completed");
        }

        const top = document.createElement("div");
        top.className = "adhkar-card-top";

        const number = document.createElement("span");
        number.className = "adhkar-number";
        number.textContent = index + 1;

        const repeat = document.createElement("span");
        repeat.className = "adhkar-repeat";
        repeat.textContent = `عدد التكرار: ${item.count}`;

        top.append(number, repeat);

        const text = document.createElement("p");
        text.className = "adhkar-text";
        text.textContent = item.text;

        const bottom = document.createElement("div");
        bottom.className = "adhkar-card-bottom";

        const remaining = document.createElement("span");
        remaining.className = "adhkar-remaining";
        remaining.textContent =
            `تم ${completed} من ${item.count}`;

        const button = document.createElement("button");
        button.className = "adhkar-done-button";
        button.type = "button";

        const isCompleted = completed >= item.count;

        button.textContent = isCompleted ? "اكتمل ✓" : "تم الذكر ✓";
        button.disabled = isCompleted;

        button.addEventListener("click", function () {
            const key = getAdhkarKey(
                currentAdhkarCategory,
                index
            );

            adhkarProgress[key] = getAdhkarCount(
                currentAdhkarCategory,
                index
            ) + 1;

            saveAdhkarProgress();
            renderAdhkar();
        });

        bottom.append(remaining, button);
        card.append(top, text, bottom);
        adhkarList.appendChild(card);
    });

    const percentage = targetTotal > 0
        ? (completedTotal / targetTotal) * 100
        : 0;

    adhkarProgressCount.textContent =
        `${completedTotal} / ${targetTotal}`;

    adhkarProgressFill.style.width = `${percentage}%`;

    adhkarCompleteMessage.hidden =
        completedTotal < targetTotal;
}

adhkarTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
        const category = tab.dataset.category;

        if (!adhkarData[category]) return;

        currentAdhkarCategory = category;
        renderAdhkar();
    });
});

resetAdhkarButton.addEventListener("click", function () {
    const confirmed = window.confirm(
        "هل تريد إعادة تعيين تقدم الأذكار في الأقسام الثلاثة؟"
    );

    if (!confirmed) return;

    Object.keys(adhkarProgress).forEach(function (key) {
        if (/^(morning|evening|prayer)_\d+$/.test(key)) {
            delete adhkarProgress[key];
        }
    });

    saveAdhkarProgress();
    renderAdhkar();
});

loadAdhkarProgress();
renderAdhkar();



/* =========================
   وظائف المسبحة الإلكترونية
========================= */

const tasbeehCountElement =
    document.getElementById("tasbeehCount");

const tasbeehGoalText =
    document.getElementById("tasbeehGoalText");

const tasbeehProgress =
    document.getElementById("tasbeehProgress");

const tasbeehStatus =
    document.getElementById("tasbeehStatus");

const tasbeehButton =
    document.getElementById("tasbeehButton");

const tasbeehReset =
    document.getElementById("tasbeehReset");

const tasbeehType =
    document.getElementById("tasbeehType");

const tasbeehGoal =
    document.getElementById("tasbeehGoal");

const tasbeehCurrentType =
    document.getElementById("tasbeehCurrentType");

const TASBEEH_STORAGE_KEY = "miqat_tasbeeh_v1";

let tasbeehState = {
    count: 0,
    goal: 33,
    type: "سبحان الله"
};

function loadTasbeehState() {
    try {
        const saved = localStorage.getItem(TASBEEH_STORAGE_KEY);

        if (saved) {
            const parsed = JSON.parse(saved);

            const validTypes = Array.from(tasbeehType.options)
                .map(function (option) {
                    return option.value;
                });

            const validGoals = Array.from(tasbeehGoal.options)
                .map(function (option) {
                    return Number(option.value);
                });

            if (
                parsed &&
                Number.isSafeInteger(parsed.count) &&
                parsed.count >= 0
            ) {
                tasbeehState.count = parsed.count;
            }

            if (validGoals.includes(Number(parsed?.goal))) {
                tasbeehState.goal = Number(parsed.goal);
            }

            if (validTypes.includes(parsed?.type)) {
                tasbeehState.type = parsed.type;
            }
        }
    } catch (error) {
        console.warn("تعذر تحميل بيانات المسبحة.", error);
    }

    tasbeehType.value = tasbeehState.type;
    tasbeehGoal.value = String(tasbeehState.goal);
}

function saveTasbeehState() {
    try {
        localStorage.setItem(
            TASBEEH_STORAGE_KEY,
            JSON.stringify(tasbeehState)
        );
    } catch (error) {
        console.warn("تعذر حفظ بيانات المسبحة.", error);
    }
}

function renderTasbeeh() {
    const count = tasbeehState.count;
    const goal = tasbeehState.goal;
    const percentage = Math.min((count / goal) * 100, 100);

    tasbeehCountElement.textContent = count.toLocaleString("ar-EG");
    tasbeehGoalText.textContent = goal.toLocaleString("ar-EG");
    tasbeehProgress.style.width = `${percentage}%`;

    tasbeehCurrentType.textContent = tasbeehState.type;

    if (count >= goal) {
        tasbeehStatus.textContent =
            "أحسنت! وصلت لهدفك. يمكنك الاستمرار أو إعادة العداد.";
    } else {
        tasbeehStatus.textContent =
            `متبقي ${ (goal - count).toLocaleString("ar-EG") } للوصول لهدفك.`;
    }
}

tasbeehButton.addEventListener("click", function () {
    if (tasbeehState.count < Number.MAX_SAFE_INTEGER) {
        tasbeehState.count += 1;
    }

    saveTasbeehState();
    renderTasbeeh();

    tasbeehCountElement.classList.remove("pulse");

    requestAnimationFrame(function () {
        tasbeehCountElement.classList.add("pulse");
    });
});

tasbeehType.addEventListener("change", function () {
    tasbeehState.type = tasbeehType.value;
    saveTasbeehState();
    renderTasbeeh();
});

tasbeehGoal.addEventListener("change", function () {
    tasbeehState.goal = Number(tasbeehGoal.value);
    saveTasbeehState();
    renderTasbeeh();
});

tasbeehReset.addEventListener("click", function () {
    const confirmed = window.confirm(
        "هل تريد تصفير عداد المسبحة؟"
    );

    if (!confirmed) return;

    tasbeehState.count = 0;

    saveTasbeehState();
    renderTasbeeh();
});

loadTasbeehState();
renderTasbeeh();



/* =========================
   التنقل بين أقسام Miqat
========================= */

const navigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);

const navigationSections = Array.from(navigationLinks)
    .map(function (link) {
        const sectionId = link.getAttribute("href").slice(1);
        return document.getElementById(sectionId);
    })
    .filter(Boolean);

function updateActiveNavigation() {
    if (!navigationSections.length) return;

    const marker = window.scrollY + 140;
    let activeSection = navigationSections[0];

    navigationSections.forEach(function (section) {
        if (section.offsetTop <= marker) {
            activeSection = section;
        }
    });

    navigationLinks.forEach(function (link) {
        const isActive =
            link.getAttribute("href") === `#${activeSection.id}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
});

window.addEventListener("resize", updateActiveNavigation);

window.addEventListener("load", updateActiveNavigation);

updateActiveNavigation();



/* =====================================
   جدول مواقيت الصلاة الشهري - Miqat
===================================== */

const monthlyPrayersMonth = document.getElementById("monthlyPrayersMonth");
const monthlyPrayersBody = document.getElementById("monthlyPrayersBody");
const monthlyPrayersStatus = document.getElementById("monthlyPrayersStatus");
const previousMonthButton = document.getElementById("previousMonthButton");
const nextMonthButton = document.getElementById("nextMonthButton");

let monthlyDate = new Date();
let monthlyRequestNumber = 0;

const monthlyPrayerNames = [
    { key: "Fajr", name: "الفجر" },
    { key: "Sunrise", name: "الشروق" },
    { key: "Dhuhr", name: "الظهر" },
    { key: "Asr", name: "العصر" },
    { key: "Maghrib", name: "المغرب" },
    { key: "Isha", name: "العشاء" }
];

// أسماء الشهور باللغة العربية
const arabicMonths = [
    "يناير", "فبراير", "مارس", "أبريل",
    "مايو", "يونيو", "يوليو", "أغسطس",
    "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

// جلب مواقيت الشهر بالكامل
async function loadMonthlyPrayerTimes() {
    const currentRequest = ++monthlyRequestNumber;
    const cityCode = citySelect.value;
    const city = cities[cityCode];

    if (!city) return;

    const year = monthlyDate.getFullYear();
    const month = monthlyDate.getMonth() + 1;

    monthlyPrayersMonth.textContent =
        `${arabicMonths[month - 1]} ${year}`;

    monthlyPrayersStatus.textContent =
        `جارٍ تحميل مواقيت الصلاة لمدينة ${city.name}...`;

    monthlyPrayersBody.innerHTML = `
        <tr>
            <td colspan="8">جارٍ تحميل البيانات...</td>
        </tr>
    `;

    previousMonthButton.disabled = true;
    nextMonthButton.disabled = true;

    const url =
        `https://api.aladhan.com/v1/calendar/${year}/${month}` +
        `?latitude=${city.lat}&longitude=${city.lon}` +
        `&method=5`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("تعذر الاتصال بخدمة المواقيت الشهرية.");
        }

        const result = await response.json();

        if (result.code !== 200 || !Array.isArray(result.data)) {
            throw new Error("بيانات الجدول الشهري غير متاحة.");
        }

        // تجاهل الردود القديمة لو المدينة أو الشهر اتغيروا
        if (currentRequest !== monthlyRequestNumber) return;

        
const fragment = document.createDocumentFragment();

const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1;
const todayDay = today.getDate();

result.data.forEach(function (dayData) {
    const row = document.createElement("tr");

    const gregorian = dayData.date?.gregorian;
    const hijri = dayData.date?.hijri;
    const timings = dayData.timings;

    // التحقق من تاريخ اليوم
    
const isToday =
    Number(gregorian?.year) === todayYear &&
    Number(gregorian?.month?.number) === todayMonth &&
    Number(gregorian?.day) === todayDay;

// التحقق من يوم الجمعة
const isFriday = gregorian?.weekday?.en === "Friday";

// تمييز تاريخ اليوم
if (isToday) {
    row.classList.add("today-row");
}

// تمييز يوم الجمعة
if (isFriday) {
    row.classList.add("friday-row");
}


    // التاريخ الميلادي
    const dateCell = document.createElement("td");

    dateCell.textContent = gregorian?.weekday?.ar
        ? `${gregorian.weekday.ar} ${gregorian.day}`
        : gregorian?.day || "--";

    // علامة اليوم
    if (isToday) {
        const todayBadge = document.createElement("span");
        todayBadge.className = "today-badge";
        todayBadge.textContent = "اليوم";

        dateCell.appendChild(document.createTextNode(" "));
        dateCell.appendChild(todayBadge);
    }

    // التاريخ الهجري
    const hijriCell = document.createElement("td");

    hijriCell.textContent = hijri
        ? `${hijri.day} ${hijri.month.ar} ${hijri.year} هـ`
        : "--";

    row.append(dateCell, hijriCell);

    // مواقيت الصلاة
    monthlyPrayerNames.forEach(function (prayer) {
        const cell = document.createElement("td");

        cell.textContent = timings?.[prayer.key]
            ? formatPrayerTime12(timings[prayer.key])
            : "--";

        row.appendChild(cell);
    });

    fragment.appendChild(row);
});

monthlyPrayersBody.replaceChildren(fragment);

        monthlyPrayersStatus.textContent =
            `تم تحميل ${result.data.length} يومًا بنجاح لمدينة ${city.name}. ` +
            "طريقة الحساب: الهيئة المصرية العامة للمساحة.";

    } catch (error) {
        if (currentRequest !== monthlyRequestNumber) return;

        console.error("Monthly prayer times error:", error);

        monthlyPrayersStatus.textContent =
            "تعذر تحميل الجدول الشهري. تأكد من اتصال الإنترنت وحاول مرة أخرى.";

        monthlyPrayersBody.innerHTML = `
            <tr>
                <td colspan="8">
                    تعذر تحميل البيانات. حاول مرة أخرى.
                </td>
            </tr>
        `;
    } finally {
        if (currentRequest === monthlyRequestNumber) {
            previousMonthButton.disabled = false;
            nextMonthButton.disabled = false;
        }
    }
}

// الانتقال للشهر السابق
previousMonthButton.addEventListener("click", function () {
    monthlyDate.setDate(1);
    monthlyDate.setMonth(monthlyDate.getMonth() - 1);
    loadMonthlyPrayerTimes();
});

// الانتقال للشهر التالي
nextMonthButton.addEventListener("click", function () {
    monthlyDate.setDate(1);
    monthlyDate.setMonth(monthlyDate.getMonth() + 1);
    loadMonthlyPrayerTimes();
});

// تحديث الجدول عند تغيير المدينة
citySelect.addEventListener("change", loadMonthlyPrayerTimes);

// تحميل الجدول عند فتح الموقع
loadMonthlyPrayerTimes();



/* ==========================================
   Miqat - Annual Prayer Times PDF Export
========================================== */

const annualPrayerYear = document.getElementById("annualPrayerYear");
const downloadAnnualPrayerPdfButton =
    document.getElementById("downloadAnnualPrayerPdf");
const annualPrayerExportStatus =
    document.getElementById("annualPrayerExportStatus");

const annualArabicMonths = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر"
];

const annualPrayerColumns = [
    { key: "Fajr", name: "الفجر" },
    { key: "Sunrise", name: "الشروق" },
    { key: "Dhuhr", name: "الظهر" },
    { key: "Asr", name: "العصر" },
    { key: "Maghrib", name: "المغرب" },
    { key: "Isha", name: "العشاء" }
];

// تجهيز قائمة السنوات: السنة الحالية والسنتان السابقة والتالية.
function initializeAnnualPrayerYears() {
    if (!annualPrayerYear) return;

    const currentYear = new Date().getFullYear();

    annualPrayerYear.replaceChildren();

    for (let year = currentYear - 1; year <= currentYear + 1; year++) {
        const option = document.createElement("option");
        option.value = String(year);
        option.textContent = year;
        annualPrayerYear.appendChild(option);
    }

    annualPrayerYear.value = String(currentYear);
}

// جلب مواقيت شهر محدد من خدمة AlAdhan.
async function fetchAnnualPrayerMonth(year, month, cityCode, city) {
    const url =
        `https://api.aladhan.com/v1/calendar/${year}/${month}` +
        `?latitude=${city.lat}&longitude=${city.lon}` +
        `&method=5`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`تعذر تحميل بيانات شهر ${month}.`);
    }

    const result = await response.json();

    if (
        result.code !== 200 ||
        !Array.isArray(result.data) ||
        result.data.length === 0
    ) {
        throw new Error(`بيانات شهر ${month} غير متاحة.`);
    }

    return result.data;
}

// تحويل بيانات شهر إلى جدول HTML.
function buildAnnualPrayerMonthTable(monthData, month, year) {
    
const rows = monthData.map(dayData => {
    const gregorian = dayData.date?.gregorian;
    const hijri = dayData.date?.hijri;
    const timings = dayData.timings || {};

    const gregorianDay = gregorian?.day || "--";
    const weekday = gregorian?.weekday?.ar || "";
    const weekdayEnglish = gregorian?.weekday?.en || "";

    const isFriday = weekdayEnglish === "Friday";

    const today = new Date();

    const isToday =
        Number(gregorian?.day) === today.getDate() &&
        Number(gregorian?.month?.number) === today.getMonth() + 1 &&
        Number(gregorian?.year) === today.getFullYear();

    const hijriDate = hijri
        ? `${hijri.day} ${hijri.month.ar} ${hijri.year} هـ`
        : "--";

    const cells = annualPrayerColumns.map(prayer => {
        const time = timings[prayer.key]
            ? formatPrayerTime12(timings[prayer.key])
            : "--";

        return `<td>${time}</td>`;
    }).join("");

    let rowClass = "";

    if (isFriday && isToday) {
        rowClass = ' class="friday-row today-row"';
    } else if (isToday) {
        rowClass = ' class="today-row"';
    } else if (isFriday) {
        rowClass = ' class="friday-row"';
    }

    const todayLabel = isToday
        ? ' <span class="today-badge">اليوم</span>'
        : "";

    return `
        <tr${rowClass}>
            <td>${weekday} ${gregorianDay}${todayLabel}</td>
            <td>${hijriDate}</td>
            ${cells}
        </tr>
    `;
}).join("");


    return `
        <section class="month-section">
            <h2>${annualArabicMonths[month - 1]} ${year}</h2>

            <table>
                <thead>
                    <tr>
                        <th>التاريخ الميلادي</th>
                        <th>التاريخ الهجري</th>
                        ${annualPrayerColumns.map(prayer =>
                            `<th>${prayer.name}</th>`
                        ).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </section>
    `;
}

// إنشاء نافذة تقرير قابلة للطباعة والحفظ بصيغة PDF.
function openAnnualPrayerPrintWindow(content, cityName, year) {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
        throw new Error(
            "المتصفح منع نافذة التقرير. اسمح بالنوافذ المنبثقة للموقع ثم حاول مرة أخرى."
        );
    }

    
const documentContent = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Miqat - مواقيت الصلاة السنوية ${year}</title>

        <style>
            @page {
                size: A4 landscape;
                margin: 17mm 9mm 17mm;

                @bottom-center {
                    content: "Miqat – مِيقات | جميع الحقوق محفوظة © ${year}";
                    font-family: Tahoma, Arial, sans-serif;
                    font-size: 8pt;
                    color: #527064;
                }

                @bottom-left {
                    content: "صفحة " counter(page);
                    font-family: Tahoma, Arial, sans-serif;
                    font-size: 8pt;
                    color: #527064;
                }
            }

            * {
                box-sizing: border-box;
            }

            html {
                direction: rtl;
            }

            body {
                margin: 0;
                padding: 0;
                background: #ffffff;
                color: #24372f;
                font-family: Tahoma, Arial, sans-serif;
                font-size: 10px;
                line-height: 1.7;
                direction: rtl;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }

            /* ترويسة التقرير */
            .report-header {
                position: relative;
                text-align: center;
                padding: 15px 12px 18px;
                margin-bottom: 22px;
                border: 1px solid #d7e9df;
                border-top: 5px solid #176b50;
                border-radius: 10px;
                background: linear-gradient(
                    180deg,
                    #f0f8f3 0%,
                    #ffffff 100%
                );
                break-inside: avoid;
                page-break-inside: avoid;
            }

            .brand {
                margin: 0;
                color: #176b50;
                font-size: 29px;
                font-weight: 800;
                letter-spacing: 0.3px;
                line-height: 1.5;
            }

            .brand-subtitle {
                margin: 2px 0 12px;
                color: #527064;
                font-size: 11px;
            }

            .report-title {
                margin: 0 0 12px;
                color: #203e30;
                font-size: 20px;
                font-weight: 800;
            }

            .report-meta {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 12px;
            }

            .meta-item {
                display: inline-block;
                padding: 6px 12px;
                border: 1px solid #d7e9df;
                border-radius: 6px;
                background: #ffffff;
                color: #294b3b;
                font-size: 10px;
            }

            .meta-label {
                color: #176b50;
                font-weight: 700;
            }

            /* كل شهر يبدأ في صفحة جديدة */
            .month-section {
                margin: 0 0 20px;
                break-before: page;
                page-break-before: always;
            }

            .month-section:first-child {
                break-before: auto;
                page-break-before: auto;
            }

            .month-section h2 {
                margin: 0 0 10px;
                padding: 8px 12px;
                border-right: 5px solid #176b50;
                border-radius: 4px;
                background: #eaf5ee;
                color: #176b50;
                font-size: 16px;
                font-weight: 800;
                break-after: avoid;
                page-break-after: avoid;
            }

            /* جدول المواقيت */
            table {
                width: 100%;
                border-collapse: collapse;
                table-layout: fixed;
                direction: rtl;
            }

            thead {
                display: table-header-group;
            }

            tfoot {
                display: table-footer-group;
            }

            th,
            td {
                padding: 6px 4px;
                border: 1px solid #d5e2da;
                text-align: center;
                vertical-align: middle;
                overflow-wrap: anywhere;
                line-height: 1.6;
            }

            th {
                background: #176b50;
                color: #ffffff;
                font-size: 9px;
                font-weight: 800;
            }

            td {
                background: #ffffff;
                color: #24372f;
                font-size: 9px;
            }

            tbody tr:nth-child(even) td {
                background: #f0f7f2;
            }

            tbody tr {
                break-inside: avoid;
                page-break-inside: avoid;
            }

            /* التاريخ الميلادي والهجري */
            th:first-child,
            td:first-child {
                width: 15%;
            }

            th:nth-child(2),
            td:nth-child(2) {
                width: 19%;
            }

            /* تذييل التقرير داخل محتواه */
            .report-footer {
                margin-top: 24px;
                padding: 12px 8px;
                border-top: 2px solid #d7e9df;
                text-align: center;
                color: #527064;
                font-size: 9px;
                line-height: 1.9;
                break-inside: avoid;
                page-break-inside: avoid;
            }

            .footer-brand {
                color: #176b50;
                font-weight: 800;
            }

            @media screen {
                body {
                    max-width: 1100px;
                    margin: 20px auto;
                    padding: 18px;
                    background: #f5f8f6;
                }

                .report-header,
                .month-section,
                .report-footer {
                    background-color: #ffffff;
                }
            }

            @media print {
                body {
                    background: #ffffff;
                }

                .report-header {
                    margin-bottom: 18px;
                }

                .month-section {
                    break-before: page;
                    page-break-before: always;
                }

                .month-section:first-child {
                    break-before: auto;
                    page-break-before: auto;
                }

                .month-section h2 {
                    break-after: avoid;
                    page-break-after: avoid;
                }

                table {
                    break-inside: auto;
                    page-break-inside: auto;
                }

                thead {
                    display: table-header-group;
                }

                tr {
                    break-inside: avoid;
                    page-break-inside: avoid;
                }

                .report-footer {
                    break-inside: avoid;
                    page-break-inside: avoid;
                }
            }

            
/* تمييز يوم الجمعة */
tbody tr.friday-row td {
    background: #eaf5ee !important;
    color: #245b3d;
    font-weight: 700;
}

/* تمييز تاريخ اليوم */
tbody tr.today-row td {
    background: #d3eddd !important;
    color: #14532d;
    font-weight: 800;
    border-top: 2px solid #176b50;
    border-bottom: 2px solid #176b50;
}

/* علامة اليوم في التقرير */
.today-badge {
    display: inline-block;
    margin-inline-start: 4px;
    padding: 2px 5px;
    border-radius: 4px;
    background: #176b50;
    color: #ffffff;
    font-size: 8px;
    white-space: nowrap;
}

        </style>
    </head>

    <body>

        <header class="report-header">
            <h1 class="brand">Miqat – مِيقات</h1>

            <p class="brand-subtitle">
                مواقيت الصلاة بين يديك
            </p>

            <h2 class="report-title">
                التقويم السنوي لمواقيت الصلاة
            </h2>

            <div class="report-meta">
                <span class="meta-item">
                    <span class="meta-label">المدينة:</span>
                    ${cityName}
                </span>

                <span class="meta-item">
                    <span class="meta-label">السنة الميلادية:</span>
                    ${year}
                </span>

                <span class="meta-item">
                    <span class="meta-label">طريقة الحساب:</span>
                    الهيئة المصرية العامة للمساحة
                </span>
            </div>

            <p style="margin: 12px 0 0; color: #527064; font-size: 9px;">
                مصدر بيانات المواقيت: خدمة AlAdhan
            </p>
        </header>

        <main>
            ${content}
        </main>

        <footer class="report-footer">
            <div class="footer-brand">Miqat – مِيقات</div>

            <div>
                جميع الحقوق محفوظة © ${year}
            </div>

            <div>
                تم إنشاء هذا التقرير من موقع Miqat لمواقيت الصلاة.
            </div>
        </footer>

        <script>
            window.addEventListener("load", function () {
                setTimeout(function () {
                    window.focus();
                    window.print();
                }, 500);
            });
        <\/script>

    </body>
    </html>
`;


    printWindow.document.open();
    printWindow.document.write(documentContent);
    printWindow.document.close();
}

// تحميل الشهور الاثني عشر وتجهيز التقرير.
async function downloadAnnualPrayerPdf() {
    if (
        !annualPrayerYear ||
        !downloadAnnualPrayerPdfButton ||
        !annualPrayerExportStatus
    ) {
        return;
    }

    const cityCode = citySelect.value;
    const city = cities[cityCode];
    const year = Number(annualPrayerYear.value);

    if (!city) {
        annualPrayerExportStatus.textContent =
            "من فضلك اختر مدينة صحيحة أولًا.";
        return;
    }

    if (!Number.isInteger(year) || year < 1900 || year > 2100) {
        annualPrayerExportStatus.textContent =
            "السنة المختارة غير صحيحة.";
        return;
    }

    downloadAnnualPrayerPdfButton.disabled = true;
    annualPrayerExportStatus.textContent =
        `جارٍ تحميل مواقيت الصلاة لعام ${year} لمدينة ${city.name}...`;

    try {
        const monthlySections = [];

        for (let month = 1; month <= 12; month++) {
            annualPrayerExportStatus.textContent =
                `جارٍ تحميل ${annualArabicMonths[month - 1]} (${month}/12)...`;

            const monthData = await fetchAnnualPrayerMonth(
                year,
                month,
                cityCode,
                city
            );

            monthlySections.push(
                buildAnnualPrayerMonthTable(monthData, month, year)
            );
        }

        const reportContent = monthlySections.join("");

        openAnnualPrayerPrintWindow(
            reportContent,
            city.name,
            year
        );

        annualPrayerExportStatus.textContent =
            "تم تجهيز التقرير. اختر «حفظ كملف PDF» من نافذة الطباعة.";
    } catch (error) {
        console.error("Annual prayer PDF error:", error);

        annualPrayerExportStatus.textContent =
            error.message ||
            "تعذر إنشاء التقرير. تأكد من اتصال الإنترنت وحاول مرة أخرى.";
    } finally {
        downloadAnnualPrayerPdfButton.disabled = false;
    }
}

// تشغيل الميزة عند تحميل الصفحة.
initializeAnnualPrayerYears();

if (downloadAnnualPrayerPdfButton) {
    downloadAnnualPrayerPdfButton.addEventListener(
        "click",
        downloadAnnualPrayerPdf
    );
}

/* قسم القرآن الكريم: يعتمد على خدمة AlQuran Cloud، ويتطلب اتصالًا بالإنترنت. */
(() => {
  const $ = (id) => document.getElementById(id);
  const surahSelect = $('quranSurahSelect');
  if (!surahSelect) return;
  const status = $('quranStatus');
  const ayahList = $('quranAyahList');
  const title = $('quranSurahTitle');
  const meta = $('quranSurahMeta');
  const reciter = $('quranReciter');
  const audio = $('quranAudioPlayer');
  const tafsirText = $('quranTafsirText');
  const searchInput = $('quranSearchInput');
  const resumeCard = $('quranResumeCard');
  const resumeText = $('quranResumeText');
  const resumeButton = $('quranResumeButton');
  const API = 'https://api.alquran.cloud/v1';
  let currentSurah = 1;
  let currentAyahs = [];
  let lastRead = null;
  let surahsLoaded = false;
  let surahAudioQueue = [];
  let queueIndex = 0;
  const safeGet = (key) => { try { return localStorage.getItem(key); } catch (_) { return null; } };
  const safeSet = (key, value) => { try { localStorage.setItem(key, value); } catch (_) {} };
  const showStatus = (message) => { status.textContent = message; };
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function restoreLastRead() {
    try { lastRead = JSON.parse(safeGet('miqatQuranLastRead') || 'null'); } catch (_) { lastRead = null; }
    if (lastRead && Number.isInteger(lastRead.surah) && Number.isInteger(lastRead.ayah)) {
      resumeText.textContent = `آخر قراءة: سورة ${lastRead.surahName || lastRead.surah}، الآية ${lastRead.ayah}`;
      resumeCard.hidden = false;
    }
  }

  async function fetchJSON(url) {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`تعذر الاتصال بخدمة القرآن (HTTP ${response.status}).`);
    const json = await response.json();
    if (json.code && json.code !== 200) throw new Error(json.status || 'تعذر تحميل البيانات.');
    return json.data;
  }

  async function loadSurahList() {
    try {
      const surahs = await fetchJSON(`${API}/surah`);
      surahSelect.innerHTML = surahs.map(s => `<option value="${s.number}">${s.number}. ${escapeHTML(s.name)} — ${escapeHTML(s.englishName)}</option>`).join('');
      surahsLoaded = true;
      const saved = Number(safeGet('miqatQuranSurah') || 1);
      currentSurah = lastRead?.surah || (Number.isInteger(saved) && saved >= 1 && saved <= 114 ? saved : 1);
      surahSelect.value = String(currentSurah);
      await loadSurah(currentSurah, lastRead?.ayah || 1);
    } catch (error) {
      surahSelect.innerHTML = '<option value="1">تعذر تحميل قائمة السور</option>';
      ayahList.innerHTML = '<p class="quran-placeholder">تعذر تحميل القرآن الآن. تحقق من الإنترنت ثم اضغط «عرض السورة» لإعادة المحاولة.</p>';
      showStatus(error.message || 'تعذر الاتصال بمصدر القرآن.');
    }
  }

  async function loadSurah(number, scrollToAyah = null) {
    number = Number(number);
    if (!Number.isInteger(number) || number < 1 || number > 114) return;
    currentSurah = number;
    surahSelect.value = String(number);
    $('quranLoadButton').disabled = true;
    showStatus('جارٍ تحميل السورة والنصوص المتاحة...');
    ayahList.innerHTML = '<p class="quran-placeholder">جارٍ تحميل الآيات...</p>';
    try {
      const data = await fetchJSON(`${API}/surah/${number}/quran-uthmani`);
      currentAyahs = data.ayahs || [];
      title.textContent = data.name || 'القرآن الكريم';
      meta.textContent = `${data.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} • ${data.numberOfAyahs} آية • ترتيب السورة ${data.number}`;
      $('quranAudioTitle').textContent = `تلاوة ${data.name}`;
      safeSet('miqatQuranSurah', String(number));
      renderAyahs(currentAyahs);
      showStatus(`تم تحميل سورة ${data.name}. اختر آية لعرض تفسيرها أو تشغيل التلاوة.`);
      if (scrollToAyah) setTimeout(() => focusAyah(scrollToAyah), 100);
    } catch (error) {
      currentAyahs = [];
      ayahList.innerHTML = '<p class="quran-placeholder">لم نتمكن من تحميل السورة. تحقق من اتصال الإنترنت ثم أعد المحاولة.</p>';
      showStatus(error.message || 'تعذر تحميل السورة.');
    } finally { $('quranLoadButton').disabled = false; }
  }

  function renderAyahs(ayahs) {
    if (!ayahs.length) { ayahList.innerHTML = '<p class="quran-placeholder">لا توجد آيات للعرض.</p>'; return; }
    ayahList.innerHTML = ayahs.map(a => `<span class="quran-ayah" id="quran-ayah-${a.numberInSurah}" data-ayah="${a.numberInSurah}">${escapeHTML(a.text)} <span class="quran-ayah-number">${a.numberInSurah}</span></span><span class="quran-ayah-tools"><button type="button" data-action="tafsir" data-ayah="${a.numberInSurah}">التفسير</button><button type="button" data-action="play" data-ayah="${a.numberInSurah}">استمع</button><button type="button" data-action="bookmark" data-ayah="${a.numberInSurah}">حفظ</button></span> `).join('');
  }


  function savePosition(ayahNumber) {
    const info = { surah: currentSurah, ayah: Number(ayahNumber), surahName: title.textContent };
    lastRead = info;
    safeSet('miqatQuranLastRead', JSON.stringify(info));
    resumeText.textContent = `آخر قراءة: ${info.surahName}، الآية ${info.ayah}`;
    resumeCard.hidden = false;
  }
  function focusAyah(number) {
    const el = $(`quran-ayah-${number}`);
    if (el) { el.classList.add('highlighted'); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  }

  async function loadTafsir(ayahNumber) {
    const ayah = currentAyahs.find(a => a.numberInSurah === Number(ayahNumber));
    if (!ayah) return;
    tafsirText.textContent = `جارٍ تحميل تفسير الآية ${ayahNumber}...`;
    $('quranTafsirPanel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    try {
      const tafsir = await fetchJSON(`${API}/ayah/${ayah.number}/ar.muyassar`);
      tafsirText.textContent = tafsir.text || 'التفسير غير متاح لهذه الآية حاليًا.';
    } catch (error) {
      tafsirText.textContent = 'تعذر تحميل التفسير من المصدر الخارجي الآن. يمكنك إعادة المحاولة عند توفر الاتصال.';
    }
  }

  async function playAyah(ayahNumber) {
    const ayah = currentAyahs.find(a => a.numberInSurah === Number(ayahNumber));
    if (!ayah) return;
    savePosition(ayahNumber);
    try {
      const audioData = await fetchJSON(`${API}/ayah/${ayah.number}/${encodeURIComponent(reciter.value)}`);
      if (!audioData.audio) throw new Error('لا يتوفر تسجيل لهذه الآية حاليًا.');
      audio.src = audioData.audio;
      audio.play().catch(() => showStatus('اضغط زر التشغيل داخل مشغل الصوت لبدء التلاوة.'));
      showStatus(`جارٍ تشغيل الآية ${ayahNumber} بصوت القارئ المختار.`);
    } catch (error) { showStatus(error.message || 'تعذر تشغيل التلاوة.'); }
  }

  async function playSurah() {
    showStatus('جارٍ تحميل تلاوة السورة كاملة...');
    try {
      const data = await fetchJSON(`${API}/surah/${currentSurah}/${encodeURIComponent(reciter.value)}`);
      if (!data.ayahs?.length) throw new Error('التلاوة غير متاحة حاليًا.');
      // بعض الإصدارات تعيد رابطًا لكل آية؛ تشغيل أول آية مع التنبيه لتوفر المشغل.
      const firstAudio = data.ayahs.find(a => a.audio)?.audio;
      if (!firstAudio) throw new Error('لم يتوفر ملف صوتي لهذه السورة مع القارئ المختار.');
      surahAudioQueue = data.ayahs.filter(a => a.audio).map(a => ({ audio: a.audio, number: a.numberInSurah }));
      queueIndex = 0;
      audio.src = surahAudioQueue[0].audio;
      audio.play().catch(() => showStatus('تم تجهيز التلاوة. اضغط تشغيل في مشغل الصوت.'));
      showStatus(`تم تجهيز تلاوة السورة كاملة (${surahAudioQueue.length} مقطعًا).`);
    } catch (error) { showStatus(error.message || 'تعذر تحميل التلاوة.'); }
  }

  $('quranPlaySurahButton').addEventListener('click', playSurah);
  audio.addEventListener('ended', () => {
    if (surahAudioQueue.length && queueIndex < surahAudioQueue.length - 1) {
      queueIndex += 1;
      audio.src = surahAudioQueue[queueIndex].audio;
      audio.play().catch(() => showStatus('اضغط تشغيل لمتابعة التلاوة.'));
    } else { surahAudioQueue = []; }
  });
  $('quranLoadButton').addEventListener('click', () => loadSurah(surahSelect.value));
  surahSelect.addEventListener('change', () => loadSurah(surahSelect.value));
  $('quranSearchButton').addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (!query) { showStatus('اكتب كلمة أو عبارة للبحث في السورة الحالية.'); return; }
    const matches = currentAyahs.filter(a => a.text.includes(query));
    if (!matches.length) { showStatus('لم يتم العثور على تطابق في السورة الحالية.'); return; }
    renderAyahs(matches);
    showStatus(`نتائج البحث: ${matches.length} آية مطابقة في السورة الحالية.`);
    focusAyah(matches[0].numberInSurah);
  });
  $('quranClearSearch').addEventListener('click', () => { searchInput.value = ''; renderAyahs(currentAyahs); showStatus('تم عرض جميع آيات السورة.'); });
  ayahList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const ayahNumber = Number(button.dataset.ayah);
    if (button.dataset.action === 'tafsir') { savePosition(ayahNumber); loadTafsir(ayahNumber); }
    if (button.dataset.action === 'play') playAyah(ayahNumber);
    if (button.dataset.action === 'bookmark') { savePosition(ayahNumber); showStatus(`تم حفظ موضع القراءة: سورة ${title.textContent}، الآية ${ayahNumber}.`); }
  });
  resumeButton.addEventListener('click', () => {
    if (!lastRead) return;
    loadSurah(lastRead.surah, lastRead.ayah);
  });
  reciter.addEventListener('change', () => { showStatus(`تم اختيار القارئ: ${reciter.options[reciter.selectedIndex].text}. اضغط «استمع» بجانب الآية أو زر الاستماع للسورة.`); });
  restoreLastRead();
  loadSurahList();
})();
