import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import heroimg from "./Heroimage.png";
import Navbar from '../../Pages/NewNavbar/Navbar';
import NewFooter from '../../Pages/Footer/footer';

/* ════════════════════   DATA   ═══════════════════════ */

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria',
  'Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan',
  'Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia',
  'Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo (Brazzaville)','Congo (DRC)',
  'Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador',
  'Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France',
  'Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau',
  'Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland',
  'Israel','Italy','Ivory Coast','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kosovo',
  'Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania',
  'Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius',
  'Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia',
  'Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway',
  'Oman','Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland',
  'Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino',
  'Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands',
  'Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland',
  'Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia',
  'Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan',
  'Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'
];

const DIAL_CODES = [
  { code: '+93', country: 'Afghanistan' }, { code: '+355', country: 'Albania' }, { code: '+213', country: 'Algeria' },
  { code: '+376', country: 'Andorra' }, { code: '+244', country: 'Angola' }, { code: '+1268', country: 'Antigua and Barbuda' },
  { code: '+54', country: 'Argentina' }, { code: '+374', country: 'Armenia' }, { code: '+61', country: 'Australia' },
  { code: '+43', country: 'Austria' }, { code: '+994', country: 'Azerbaijan' }, { code: '+1242', country: 'Bahamas' },
  { code: '+973', country: 'Bahrain' }, { code: '+880', country: 'Bangladesh' }, { code: '+1246', country: 'Barbados' },
  { code: '+375', country: 'Belarus' }, { code: '+32', country: 'Belgium' }, { code: '+501', country: 'Belize' },
  { code: '+229', country: 'Benin' }, { code: '+975', country: 'Bhutan' }, { code: '+591', country: 'Bolivia' },
  { code: '+387', country: 'Bosnia and Herzegovina' }, { code: '+267', country: 'Botswana' }, { code: '+55', country: 'Brazil' },
  { code: '+673', country: 'Brunei' }, { code: '+359', country: 'Bulgaria' }, { code: '+226', country: 'Burkina Faso' },
  { code: '+257', country: 'Burundi' }, { code: '+238', country: 'Cabo Verde' }, { code: '+855', country: 'Cambodia' },
  { code: '+237', country: 'Cameroon' }, { code: '+1', country: 'Canada' }, { code: '+236', country: 'Central African Republic' },
  { code: '+235', country: 'Chad' }, { code: '+56', country: 'Chile' }, { code: '+86', country: 'China' },
  { code: '+57', country: 'Colombia' }, { code: '+269', country: 'Comoros' }, { code: '+242', country: 'Congo (Brazzaville)' },
  { code: '+243', country: 'Congo (DRC)' }, { code: '+506', country: 'Costa Rica' }, { code: '+385', country: 'Croatia' },
  { code: '+53', country: 'Cuba' }, { code: '+357', country: 'Cyprus' }, { code: '+420', country: 'Czech Republic' },
  { code: '+45', country: 'Denmark' }, { code: '+253', country: 'Djibouti' }, { code: '+1767', country: 'Dominica' },
  { code: '+1809', country: 'Dominican Republic' }, { code: '+593', country: 'Ecuador' }, { code: '+20', country: 'Egypt' },
  { code: '+503', country: 'El Salvador' }, { code: '+240', country: 'Equatorial Guinea' }, { code: '+291', country: 'Eritrea' },
  { code: '+372', country: 'Estonia' }, { code: '+268', country: 'Eswatini' }, { code: '+251', country: 'Ethiopia' },
  { code: '+679', country: 'Fiji' }, { code: '+358', country: 'Finland' }, { code: '+33', country: 'France' },
  { code: '+241', country: 'Gabon' }, { code: '+220', country: 'Gambia' }, { code: '+995', country: 'Georgia' },
  { code: '+49', country: 'Germany' }, { code: '+233', country: 'Ghana' }, { code: '+30', country: 'Greece' },
  { code: '+1473', country: 'Grenada' }, { code: '+502', country: 'Guatemala' }, { code: '+224', country: 'Guinea' },
  { code: '+245', country: 'Guinea-Bissau' }, { code: '+592', country: 'Guyana' }, { code: '+509', country: 'Haiti' },
  { code: '+504', country: 'Honduras' }, { code: '+36', country: 'Hungary' }, { code: '+354', country: 'Iceland' },
  { code: '+91', country: 'India' }, { code: '+62', country: 'Indonesia' }, { code: '+98', country: 'Iran' },
  { code: '+964', country: 'Iraq' }, { code: '+353', country: 'Ireland' }, { code: '+972', country: 'Israel' },
  { code: '+39', country: 'Italy' }, { code: '+225', country: 'Ivory Coast' }, { code: '+1876', country: 'Jamaica' },
  { code: '+81', country: 'Japan' }, { code: '+962', country: 'Jordan' }, { code: '+7', country: 'Kazakhstan' },
  { code: '+254', country: 'Kenya' }, { code: '+686', country: 'Kiribati' }, { code: '+383', country: 'Kosovo' },
  { code: '+965', country: 'Kuwait' }, { code: '+996', country: 'Kyrgyzstan' }, { code: '+856', country: 'Laos' },
  { code: '+371', country: 'Latvia' }, { code: '+961', country: 'Lebanon' }, { code: '+266', country: 'Lesotho' },
  { code: '+231', country: 'Liberia' }, { code: '+218', country: 'Libya' }, { code: '+423', country: 'Liechtenstein' },
  { code: '+370', country: 'Lithuania' }, { code: '+352', country: 'Luxembourg' }, { code: '+261', country: 'Madagascar' },
  { code: '+265', country: 'Malawi' }, { code: '+60', country: 'Malaysia' }, { code: '+960', country: 'Maldives' },
  { code: '+223', country: 'Mali' }, { code: '+356', country: 'Malta' }, { code: '+692', country: 'Marshall Islands' },
  { code: '+222', country: 'Mauritania' }, { code: '+230', country: 'Mauritius' }, { code: '+52', country: 'Mexico' },
  { code: '+691', country: 'Micronesia' }, { code: '+373', country: 'Moldova' }, { code: '+377', country: 'Monaco' },
  { code: '+976', country: 'Mongolia' }, { code: '+382', country: 'Montenegro' }, { code: '+212', country: 'Morocco' },
  { code: '+258', country: 'Mozambique' }, { code: '+95', country: 'Myanmar' }, { code: '+264', country: 'Namibia' },
  { code: '+674', country: 'Nauru' }, { code: '+977', country: 'Nepal' }, { code: '+31', country: 'Netherlands' },
  { code: '+64', country: 'New Zealand' }, { code: '+505', country: 'Nicaragua' }, { code: '+227', country: 'Niger' },
  { code: '+234', country: 'Nigeria' }, { code: '+850', country: 'North Korea' }, { code: '+389', country: 'North Macedonia' },
  { code: '+47', country: 'Norway' }, { code: '+968', country: 'Oman' }, { code: '+92', country: 'Pakistan' },
  { code: '+680', country: 'Palau' }, { code: '+970', country: 'Palestine' }, { code: '+507', country: 'Panama' },
  { code: '+675', country: 'Papua New Guinea' }, { code: '+595', country: 'Paraguay' }, { code: '+51', country: 'Peru' },
  { code: '+63', country: 'Philippines' }, { code: '+48', country: 'Poland' }, { code: '+351', country: 'Portugal' },
  { code: '+974', country: 'Qatar' }, { code: '+40', country: 'Romania' }, { code: '+7', country: 'Russia' },
  { code: '+250', country: 'Rwanda' }, { code: '+1869', country: 'Saint Kitts and Nevis' }, { code: '+1758', country: 'Saint Lucia' },
  { code: '+1784', country: 'Saint Vincent and the Grenadines' }, { code: '+685', country: 'Samoa' }, { code: '+378', country: 'San Marino' },
  { code: '+239', country: 'Sao Tome and Principe' }, { code: '+966', country: 'Saudi Arabia' }, { code: '+221', country: 'Senegal' },
  { code: '+381', country: 'Serbia' }, { code: '+248', country: 'Seychelles' }, { code: '+232', country: 'Sierra Leone' },
  { code: '+65', country: 'Singapore' }, { code: '+421', country: 'Slovakia' }, { code: '+386', country: 'Slovenia' },
  { code: '+677', country: 'Solomon Islands' }, { code: '+252', country: 'Somalia' }, { code: '+27', country: 'South Africa' },
  { code: '+82', country: 'South Korea' }, { code: '+211', country: 'South Sudan' }, { code: '+34', country: 'Spain' },
  { code: '+94', country: 'Sri Lanka' }, { code: '+249', country: 'Sudan' }, { code: '+597', country: 'Suriname' },
  { code: '+46', country: 'Sweden' }, { code: '+41', country: 'Switzerland' }, { code: '+963', country: 'Syria' },
  { code: '+886', country: 'Taiwan' }, { code: '+992', country: 'Tajikistan' }, { code: '+255', country: 'Tanzania' },
  { code: '+66', country: 'Thailand' }, { code: '+670', country: 'Timor-Leste' }, { code: '+228', country: 'Togo' },
  { code: '+676', country: 'Tonga' }, { code: '+1868', country: 'Trinidad and Tobago' }, { code: '+216', country: 'Tunisia' },
  { code: '+90', country: 'Turkey' }, { code: '+993', country: 'Turkmenistan' }, { code: '+688', country: 'Tuvalu' },
  { code: '+256', country: 'Uganda' }, { code: '+380', country: 'Ukraine' }, { code: '+971', country: 'United Arab Emirates' },
  { code: '+44', country: 'United Kingdom' }, { code: '+1', country: 'United States' }, { code: '+598', country: 'Uruguay' },
  { code: '+998', country: 'Uzbekistan' }, { code: '+678', country: 'Vanuatu' }, { code: '+379', country: 'Vatican City' },
  { code: '+58', country: 'Venezuela' }, { code: '+84', country: 'Vietnam' }, { code: '+967', country: 'Yemen' },
  { code: '+260', country: 'Zambia' }, { code: '+263', country: 'Zimbabwe' }
];

const CONFERENCES = [
  'QUANTUM Next Gen Women Leadership & Mental Health Conclave 2026 - July 20-26, 2026 | New York, USA',
  'ASCEND 2026: Rise of Next-Gen Women Leaders in Power, Purpose & Wellbeing - November 09-15, 2026 | Toronto, Canada',
  'ARAB WOMEN Hi-RISE CONCLAVE - November 23-29, 2026 | Dubai, UAE',
  "International Women's Day Conclave: A Global Movement for Women's Empowerment & Mental Wellbeing - March 08–14, 2027 | Paris, France",
  'QUANTUM Next Gen Women Leadership & Mental Health Conclave 2027 - March 08-14, 2027 | New York, USA',
  'Quantum Tech Women Leadership, AI Health Conclave - May 09-15, 2027 | Tokyo, Japan',
  'Gen-Xer Women Empowerment & Mental Health Conclave - September 05-11, 2027 | Miami/Florida, USA',
  'ARAB WOMEN Hi-RISE CONCLAVE - November 07-13, 2027 | Dubai, UAE',
].map(item => ({
  value: item,
  label: item,
}));


const PHYSICAL_PACKAGES = [
  {
    id: 'standard-speaker',
    badge: '',
    name: 'WYNx Physical Speaker Registration',
    price: 899,
    features: [
      'Physical Speaker Registration',
      'Abstract Talk Publication in Peercite International Journal of Women Leadership & Mental Health',
      'On-site networking access',
      'Certificate of presentation',
    ],
  },
  {
    id: 'deal-a-1night',
    badge: 'POPULAR',
    name: 'WYNx Award-Winning Talk + 1 Night accommodation',
    price: 999,
    features: [
      'WYNx Award-Winning Talk',
      'Media Coverage Live Interview',
      '1 Night Hotel accommodation at venue',
      'Abstract Talk Publication in Peercite International Journal of Women Leadership & Mental Health',
      'Certificate of keynote presentation',
    ],
  },
  {
    id: 'deal-b-3nights',
    badge: 'BEST VALUE',
    name: 'Physical Keynote Speaker Registration + 3 Nights accommodation',
    price: 1099,
    features: [
      'Physical Keynote Speaker Registration',
      ' Media Coverage Live Interview',
      '2 Nights Hotel Accommodation at venue',
      'Abstract Talk Publication in Peercite International Journal of Women Leadership & Mental Health',
      'Conference materials and full certification',
    ],
  },
  {
    id: 'delegate-pass',
    badge: '',
    name: 'Tour Trip (Photography Shoot)',
    price: 499,
    features: [
      'WYNx Tour Trip access',
      'On-site event photographer',
      'Professional photo shoot',
      'Digital photo delivery',
    ],
  },
];

const VIRTUAL_PACKAGES = [
  {
    id: 'virtual-speaker',
    badge: '',
    name: 'Virtual Speaker Registration',
    price: 399,
    features: [
      'WYNx Virtual Online Speaker Registration',
      'Abstract Talk Publication in Peercite International Journal of Women Leadership & Mental Health',
      // 'Opportunity to open or close sessions',
      // 'Full-page feature in the conference booklet',
      // 'Speaker certification',
      // 'Eligibility for Best Speaker Award',
      // 'Access to limited networking sessions',
      // 'Pre-event technical dry run included',
    ],
  },
  {
    id: 'virtual-keynote',
    badge: '',
    name: 'Keynote Virtual Award Winning Talk Registration',
    price: 499,
    features: [
      'Award-Winning Keynote Virtual Talk',
      'Magazine Cover Story',
      'Abstract Talk Publication in Peercite International Journal of Women Leadership & Mental Health',
      // 'Ambassador or judge appointment',
      // 'Eligibility for speaker awards',
      // 'Full-page feature in conference booklet',
      // 'Logo promotion across all platforms',
      // 'Exclusive keynote certification',
      // 'Lead handover networking sessions',
      // 'Hosted on Airmeet with custom presentation suite',
    ],
  },
];

const ACCOMPANYING_PERSON_PRICE = 399;
const EXTRA_NIGHT_PRICE = 199;

/* ── Coupon codes — flat-amount discounts ── */
const COUPON_CODES = {
  WYNXSAVE100: 100,
  WYNXSAVE200: 200,
  WYNXSAVE898: 898,
};

/* ═════════════════   THEME — matches the WYNx landing page   ═══════════════════════════ */

const DARKBG   = '#0a1a14';   // deep forest green (hero bg + form card theme)
const PANEL    = '#0f2019';   // slightly lighter panel green (form card)
const CREAM    = '#fdf6ee';   // warm cream (outer page bg below hero, above footer)
const GOLD     = '#c8922a';
const GOLD_HOV = '#dba338';
const GOLD_SOFT = 'rgba(200,146,42,0.35)';
const GOLD_FAINT = 'rgba(200,146,42,0.12)';
const TEXT_DIM  = 'rgba(255,255,255,0.55)';
const TEXT_FAINT = 'rgba(255,255,255,0.4)';
const BORDER_FAINT = 'rgba(255,255,255,0.08)';
const SUCCESS_GREEN = '#4caf78';
const ERROR_RED = '#e0664a';

/* ═════════════════════════  Reusable searchable dropdown (dark themed)  ═══════════════════════════ */

const SearchableSelect = ({ options, value, onChange, placeholder, displayValue }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <div style={selectStyles.trigger} onClick={() => setOpen((o) => !o)}>
        <span style={{ color: value ? '#fff' : TEXT_FAINT }}>
          {value ? displayValue : placeholder}
        </span>
        <span style={selectStyles.chevron}>{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div style={selectStyles.dropdown}>
          <input
            autoFocus
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={selectStyles.searchInput}
          />
          <div style={selectStyles.optionList}>
            {filtered.length === 0 && (
              <div style={selectStyles.noResult}>No matches found</div>
            )}
            {filtered.map((opt) => (
              <div
                key={opt.value}
                style={{
                  ...selectStyles.option,
                  ...(opt.value === value ? selectStyles.optionActive : {})
                }}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                  setSearch('');
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const selectStyles = {
  trigger: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: `1.5px solid ${GOLD_SOFT}`,
    backgroundColor: PANEL,
    fontSize: '15px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chevron: { fontSize: '10px', color: GOLD, marginLeft: '8px' },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    left: 0,
    right: 0,
    background: '#102219',
    border: `1.5px solid ${GOLD_SOFT}`,
    borderRadius: '8px',
    boxShadow: '0 16px 40px rgba(0,0,0,0.55)',
    zIndex: 50,
    overflow: 'hidden',
  },
  searchInput: {
    width: '100%',
    padding: '10px 12px',
    border: 'none',
    borderBottom: `1px solid ${GOLD_SOFT}`,
    outline: 'none',
    fontSize: '14px',
    boxSizing: 'border-box',
    backgroundColor: PANEL,
    color: '#fff',
  },
  optionList: { maxHeight: '220px', overflowY: 'auto' },
  option: { padding: '10px 14px', fontSize: '14px', color: 'rgba(255,255,255,0.85)', cursor: 'pointer' },
  optionActive: { backgroundColor: GOLD_FAINT, fontWeight: '600', color: GOLD },
  noResult: { padding: '12px 14px', fontSize: '13px', color: TEXT_FAINT },
};

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════ */

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* If we arrived here via "Go Back" from the Preview page, resume
     exactly where the user left off instead of starting over at step 1. */
  const resumeSubmission = location.state?.resumeSubmissionData || null;
  const resumePackage = location.state?.resumePackageData || null;
  const resumeStep = location.state?.resumeStep || 1;

  /* which step is showing: 1 = Personal & Conference, 2 = Package */
  const [step, setStep] = useState(resumeStep);

  /* ── Step 1 state ── */
  const [formData, setFormData] = useState({
    firstName: resumeSubmission?.firstName || '',
    lastName: resumeSubmission?.lastName || '',
    email: resumeSubmission?.email || '',
    dialCode: resumeSubmission?.dialCode || '+1',
    dialCountry: resumeSubmission?.dialCountry || 'United States',
    /* resumeSubmission.phone already has the dial code prefixed back in
       Step 1 → Step 2 — strip it back off so the plain input shows correctly */
    phone: resumeSubmission?.phone
      ? resumeSubmission.phone.replace(`${resumeSubmission.dialCode} `, '')
      : '',
    country: resumeSubmission?.country || '',
    designation: resumeSubmission?.designation || '',
    conference: resumeSubmission?.conference || '',
    company: resumeSubmission?.company || '',
    linkedin: resumeSubmission?.linkedin || '',
    facebook: resumeSubmission?.facebook || ''
  });

  /* ── Step 2 state ── */
  const [mode, setMode] = useState(resumePackage?.mode || null);          // 'physical' | 'virtual'
  const [packageId, setPackageId] = useState(resumePackage?.packageId || null);
  const [accompanying, setAccompanying] = useState(resumePackage?.accompanying || 0);
  const [extraNights, setExtraNights] = useState(resumePackage?.extraNights || 0);

  /* ── Coupon state ── */
  const [couponInput, setCouponInput] = useState(resumePackage?.couponCode || '');
  const [appliedCoupon, setAppliedCoupon] = useState(resumePackage?.couponCode || null);
  const [couponMessage, setCouponMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* ── Step 1 → Step 2 ── */
  const handleContinueToPackage = (e) => {
    e.preventDefault();

    if (!formData.firstName.trim()) { alert('Please enter your first name.'); return; }
    if (!formData.lastName.trim()) { alert('Please enter your last name.'); return; }
    if (!formData.email.trim()) { alert('Please enter your email address.'); return; }
    if (!formData.phone.trim()) { alert('Please enter your phone number.'); return; }
    if (!formData.country) { alert('Please select your country.'); return; }
    if (!formData.designation.trim()) { alert('Please enter your designation / role.'); return; }
    if (!formData.conference) { alert('Please choose a conference.'); return; }
    if (!formData.company.trim()) { alert('Please enter your company / organization.'); return; }

    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── Step 2 → Step 1 (back) ── */
  const handleBackToPersonal = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── Package data derived from mode ── */
  const packages = mode === 'physical' ? PHYSICAL_PACKAGES : mode === 'virtual' ? VIRTUAL_PACKAGES : [];
  const selectedPackage = packages.find((p) => p.id === packageId) || null;

  /* ── Coupon discount derived from applied code ── */
  const discount = appliedCoupon ? COUPON_CODES[appliedCoupon] : 0;

  const total = useMemo(() => {
    let t = selectedPackage ? selectedPackage.price : 0;
    if (mode === 'physical') {
      t += accompanying * ACCOMPANYING_PERSON_PRICE;
      t += extraNights * EXTRA_NIGHT_PRICE;
    }
    t -= discount;
    return Math.max(0, t);
  }, [selectedPackage, mode, accompanying, extraNights, discount]);

  const handleModeSelect = (newMode) => {
    setMode(newMode);
    setPackageId(null);
    setAccompanying(0);
    setExtraNights(0);
    setCouponInput('');
    setAppliedCoupon(null);
    setCouponMessage('');
  };

  /* ── Coupon handlers ── */
  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setAppliedCoupon(null);
      setCouponMessage('Please enter a coupon code.');
      return;
    }
    if (COUPON_CODES[code]) {
      setAppliedCoupon(code);
      setCouponInput(code);
      setCouponMessage(`Coupon applied! $${COUPON_CODES[code]} off.`);
    } else {
      setAppliedCoupon(null);
      setCouponMessage('Invalid coupon code.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponMessage('');
  };

  /* ── Step 2 → Preview ── */
  const handleContinueToPreview = () => {
    if (!mode) { alert('Please choose Physical or Virtual.'); return; }
    if (!packageId) { alert('Please select a package.'); return; }

    const submissionData = { ...formData, phone: `${formData.dialCode} ${formData.phone}`.trim() };

    const packageData = {
      mode,
      packageId,
      packageName: selectedPackage.name,
      packagePrice: selectedPackage.price,
      accompanying: mode === 'physical' ? accompanying : 0,
      extraNights: mode === 'physical' ? extraNights : 0,
      couponCode: appliedCoupon,
      discount,
      total,
    };

    navigate('/preview', { state: { submissionData, packageData } });
  };

  return (
    <>
      <Navbar />
      <div style={{ height: 68 }} />

      <div style={styles.pageRoot}>

        {/* ════ HERO SECTION ════ */}
        <section style={styles.hero}>
          <div style={styles.heroGlow1} />
          <div style={styles.heroGlow2} />
          <div style={styles.heroCornerTL} />
          <div style={styles.heroCornerBR} />

          <div style={styles.heroInner}>
            <div style={styles.heroLeft}>
              <div style={styles.heroEyebrow}>
                <span style={styles.heroEyebrowDot} />
                REGISTRATION NOW OPEN
              </div>
              <h1 style={styles.heroTitle}>
                WYNx <span style={styles.heroAccent}>Award Winning</span> Talks
              </h1>
              <div style={styles.heroDivider} />
              <p style={styles.heroSub}>
                WYNx Talks brings together thought leaders, innovators, and award-winning professionals to inspire change and drive progress.
              </p>
              <p style={styles.heroSub2}>
                Secure your spot today and gain access to world-class networking, knowledge-sharing, and recognition opportunities.
              </p>
            </div>

            <div style={styles.heroRight}>
              <div style={styles.heroImgWrap}>
                <div style={styles.heroImgRing1} />
                <div style={styles.heroImgRing2} />
                <img src={heroimg} alt="WYNx Award Trophy" style={styles.heroImg} />
              </div>
            </div>
          </div>
        </section>

        {/* ════ FORM SECTION ════ */}
        <div style={styles.container}>
          <div style={styles.formContainer}>

            <h1 style={styles.title}>
              {step === 1 ? 'Register for the Conference' : 'Choose Your Package'}
            </h1>

            {/* ── Step indicator (shared) ── */}
            <div style={styles.stepBar}>
              <div style={styles.stepItem}>
                <span style={{
                  ...styles.stepDot,
                  ...(step > 1 ? styles.stepDotDone : styles.stepDotActive)
                }}>
                  {step > 1 ? '✓' : '1'}
                </span>
                <span style={step >= 1 ? styles.stepLabelActive : styles.stepLabel}>
                  Personal &amp; Conference
                </span>
              </div>
              <div style={styles.stepConnector} />
              <div style={styles.stepItem}>
                <span style={{ ...styles.stepDot, ...(step === 2 ? styles.stepDotActive : {}) }}>2</span>
                <span style={step === 2 ? styles.stepLabelActive : styles.stepLabel}>Package</span>
              </div>
              <div style={styles.stepConnector} />
              <div style={styles.stepItem}>
                <span style={styles.stepDot}>3</span>
                <span style={styles.stepLabel}>Confirm</span>
              </div>
            </div>

            <div style={styles.eyebrow}>STEP {step} OF 3</div>

            {/* ══════════════════════ STEP 1 ══════════════════════ */}
            {step === 1 && (
              <>
                <div style={styles.introContent}>
                  <div style={styles.liveInterviewBox}>
                    <h2 style={styles.liveTitle}>🎙️ Don't Miss the Live Interview!</h2>
                    <p style={styles.liveText}>
                      We're bringing this feature to life with a live interview featuring incredible women.
                      They'll share their journeys, challenges, and insights on breaking barriers in their industries.
                      Stay tuned for details!
                    </p>
                  </div>

                  <div style={styles.magazineBox}>
                    <h3 style={styles.magazineTitle}>Explore the WINSPIRE Magazine Online</h3>
                    <p style={styles.magazineText}>
                      This is just one of the many powerful stories featured in <strong>WINSPIRE Magazine Volumes</strong>.
                    </p>
                    <a href="https://www.winspire.live/" target="_blank" rel="noopener noreferrer" style={styles.exploreButton}>Explore</a>
                  </div>
                </div>

                {/* Name */}
                <div style={styles.fieldRow}>
                  <div style={styles.fieldColumn}>
                    <div style={styles.fieldLabel}>First Name *</div>
                    <input
                      type="text" name="firstName" placeholder="First Name"
                      value={formData.firstName} onChange={handleInputChange}
                      style={styles.inputField}
                    />
                  </div>
                  <div style={styles.fieldColumn}>
                    <div style={styles.fieldLabel}>Last Name *</div>
                    <input
                      type="text" name="lastName" placeholder="Last Name"
                      value={formData.lastName} onChange={handleInputChange}
                      style={styles.inputField}
                    />
                  </div>
                </div>

                {/* Email */}
                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Email Address *</div>
                  <input
                    type="email" name="email" placeholder="you@example.com"
                    value={formData.email} onChange={handleInputChange}
                    style={styles.inputField}
                  />
                </div>

                {/* Phone */}
                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Phone Number *</div>
                  <div style={styles.phoneRow}>
                    <div style={{ flex: '0 0 190px' }}>
                      <SearchableSelect
                        options={DIAL_CODES.map((d) => ({ value: d.code + '|' + d.country, label: `${d.code}  ${d.country}` }))}
                        value={formData.dialCode ? formData.dialCode + '|' + formData.dialCountry : ''}
                        displayValue={formData.dialCode}
                        placeholder="Code"
                        onChange={(val) => {
                          const [code, country] = val.split('|');
                          setFormData(prev => ({ ...prev, dialCode: code, dialCountry: country }));
                        }}
                      />
                    </div>
                    <input
                      type="tel" name="phone" placeholder="Phone number"
                      value={formData.phone} onChange={handleInputChange}
                      style={styles.phoneNumberInput}
                    />
                  </div>
                </div>

                {/* Country & Designation */}
                <div style={styles.fieldRow}>
                  <div style={styles.fieldColumn}>
                    <div style={styles.fieldLabel}>Country *</div>
                    <SearchableSelect
                      options={COUNTRIES.map((c) => ({ value: c, label: c }))}
                      value={formData.country}
                      displayValue={formData.country}
                      placeholder="Select your country"
                      onChange={(val) => handleSelectChange('country', val)}
                    />
                  </div>
                  <div style={styles.fieldColumn}>
                    <div style={styles.fieldLabel}>Designation / Role *</div>
                    <input
                      type="text" name="designation" placeholder="e.g. CEO, Founder, Director"
                      value={formData.designation} onChange={handleInputChange}
                      style={styles.inputField}
                    />
                  </div>
                </div>

                {/* Choose Conference */}
                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Choose Conference *</div>
                  <select
                    name="conference" value={formData.conference}
                    onChange={handleInputChange} style={styles.selectField}
                  >
                    <option value="">Select a conference</option>
                    {CONFERENCES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                {/* Company */}
                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Company / Organization *</div>
                  <input
                    type="text" name="company" placeholder="Your company or organization"
                    value={formData.company} onChange={handleInputChange}
                    style={styles.inputField}
                  />
                </div>

                {/* LinkedIn & Facebook */}
                <div style={styles.fieldRow}>
                  <div style={styles.fieldColumn}>
                    <div style={styles.fieldLabel}>LinkedIn Profile</div>
                    <input
                      type="url" name="linkedin" placeholder="https://linkedin.com/in/yourname"
                      value={formData.linkedin} onChange={handleInputChange}
                      style={styles.inputField}
                    />
                  </div>
                  <div style={styles.fieldColumn}>
                    <div style={styles.fieldLabel}>Facebook Profile</div>
                    <input
                      type="url" name="facebook" placeholder="https://facebook.com/yourname"
                      value={formData.facebook} onChange={handleInputChange}
                      style={styles.inputField}
                    />
                  </div>
                </div>

                <button type="button" onClick={handleContinueToPackage} style={styles.applyButton}>
                  Continue to Nextpage →
                </button>
              </>
            )}

            {/* ══════════════════════ STEP 2 ══════════════════════ */}
            {step === 2 && (
              <>
                {/* Participation type */}
                <div style={styles.sectionDivider}><span>PARTICIPATION TYPE</span></div>

                <div style={styles.modeGrid}>
                  <div
                    style={{ ...styles.modeCard, ...(mode === 'physical' ? styles.modeCardActive : {}) }}
                    onClick={() => handleModeSelect('physical')}
                  >
                    <div style={styles.modeIcon}>🎙️</div>
                    <div style={styles.modeName}>Physical Speaker</div>
                    <div style={styles.modeHint}>In-person at venue</div>
                  </div>
                  <div
                    style={{ ...styles.modeCard, ...(mode === 'virtual' ? styles.modeCardActive : {}) }}
                    onClick={() => handleModeSelect('virtual')}
                  >
                    <div style={styles.modeIcon}>💻</div>
                    <div style={styles.modeName}>Virtual Speaker</div>
                    <div style={styles.modeHint}>Present via Zoom / Airmeet</div>
                  </div>
                </div>

                {/* Packages */}
                {mode && (
                  <>
                    <div style={styles.sectionDivider}><span>CHOOSE YOUR PACKAGE</span></div>

                    <div style={styles.pkgGrid}>
                      {packages.map((p) => (
                        <div
                          key={p.id}
                          style={{ ...styles.pkgCard, ...(packageId === p.id ? styles.pkgCardActive : {}) }}
                          onClick={() => setPackageId(p.id)}
                        >
                          {p.badge && <div style={styles.pkgBadge}>{p.badge}</div>}
                          <div style={styles.pkgHeader}>
                            <div style={styles.pkgName}>{p.name}</div>
                            <div style={styles.pkgPrice}>${p.price}</div>
                          </div>
                          <ul style={styles.pkgFeatureList}>
                            {p.features.map((f, i) => (
                              <li key={i} style={styles.pkgFeature}>
                                <span style={styles.pkgCheck}>✓</span>{f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Add-ons (physical only) */}
                {mode === 'physical' && (
                  <>
                    <div style={styles.sectionDivider}><span>ADDITIONAL ATTENDEES &amp; NIGHTS</span></div>

                    <div style={styles.addonRow}>
                      <div style={styles.addonInfo}>
                        <span style={styles.addonIcon}>👥</span>
                        <div>
                          <div style={styles.addonName}>Accompanying Person(s)</div>
                          <div style={styles.addonSub}>Each additional attendee — ${ACCOMPANYING_PERSON_PRICE}</div>
                        </div>
                      </div>
                      <div style={styles.counter}>
                        <button
                          style={styles.counterBtn}
                          onClick={() => setAccompanying((v) => Math.max(0, v - 1))}
                          disabled={accompanying <= 0}
                        >−</button>
                        <span style={styles.counterVal}>{accompanying}</span>
                        <button style={styles.counterBtn} onClick={() => setAccompanying((v) => v + 1)}>+</button>
                      </div>
                    </div>

                    <div style={styles.addonRow}>
                      <div style={styles.addonInfo}>
                        <span style={styles.addonIcon}>🌙</span>
                        <div>
                          <div style={styles.addonName}>Extra Night(s)</div>
                          <div style={styles.addonSub}>Each additional night — ${EXTRA_NIGHT_PRICE}</div>
                        </div>
                      </div>
                      <div style={styles.counter}>
                        <button
                          style={styles.counterBtn}
                          onClick={() => setExtraNights((v) => Math.max(0, v - 1))}
                          disabled={extraNights <= 0}
                        >−</button>
                        <span style={styles.counterVal}>{extraNights}</span>
                        <button style={styles.counterBtn} onClick={() => setExtraNights((v) => v + 1)}>+</button>
                      </div>
                    </div>
                  </>
                )}

                {/* Coupon code */}
                {mode && (
                  <>
                    <div style={styles.sectionDivider}><span>HAVE A COUPON CODE?</span></div>

                    <div style={styles.couponRow}>
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleApplyCoupon(); } }}
                        style={styles.couponInput}
                        disabled={!!appliedCoupon}
                      />
                      {appliedCoupon ? (
                        <button type="button" style={styles.couponRemoveBtn} onClick={handleRemoveCoupon}>
                          Remove
                        </button>
                      ) : (
                        <button type="button" style={styles.couponApplyBtn} onClick={handleApplyCoupon}>
                          Apply
                        </button>
                      )}
                    </div>

                    {couponMessage && (
                      <div style={{
                        ...styles.couponMessage,
                        color: appliedCoupon ? SUCCESS_GREEN : ERROR_RED,
                      }}>
                        {appliedCoupon ? '✓ ' : '✕ '}{couponMessage}
                      </div>
                    )}
                  </>
                )}

                {/* Estimated total */}
                <div style={styles.totalBar}>
                  <div>
                    <div style={styles.totalLabel}>ESTIMATED TOTAL</div>
                    {!selectedPackage && <div style={styles.totalHint}>Select a package to see pricing</div>}
                    {appliedCoupon && (
                      <div style={styles.totalDiscountHint}>
                        Coupon {appliedCoupon} applied: −${discount}
                      </div>
                    )}
                  </div>
                  <div style={styles.totalAmount}>${total}</div>
                </div>

                {/* Nav buttons */}
                <div style={styles.navRow}>
                  <button style={styles.backBtn} onClick={handleBackToPersonal}>← Back</button>
                  <button style={styles.continueBtn} onClick={handleContinueToPreview}>CONTINUE →</button>
                </div>

                <div style={styles.legalNote}>
                  By proceeding you agree to the conference's Terms &amp; Conditions. Your data will only be used for conference coordination purposes.
                </div>
              </>
            )}

          </div>
        </div>

      </div>

      <NewFooter />
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════ */

const styles = {

  pageRoot: {
    minHeight: '100vh',
    fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    background: CREAM,
  },

  /* ─── Hero ─────────────────────────────────────────── */
  hero: {
    background: DARKBG,
    position: 'relative',
    padding: '80px 40px 72px',
    overflow: 'hidden',
    borderBottom: `1px solid ${GOLD_FAINT}`,
  },

  heroGlow1: {
    position: 'absolute',
    width: '520px', height: '520px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(200,146,42,0.13) 0%, transparent 70%)',
    top: '-160px', left: '-100px',
    pointerEvents: 'none',
  },
  heroGlow2: {
    position: 'absolute',
    width: '420px', height: '420px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(200,146,42,0.09) 0%, transparent 70%)',
    bottom: '-140px', right: '8%',
    pointerEvents: 'none',
  },

  heroCornerTL: {
    position: 'absolute',
    top: 0, left: 0,
    width: '180px', height: '180px',
    borderTop: `1.5px solid ${GOLD_FAINT}`,
    borderLeft: `1.5px solid ${GOLD_FAINT}`,
    borderRadius: '0 0 100% 0',
    pointerEvents: 'none',
  },

  heroCornerBR: {
    position: 'absolute',
    bottom: 0, right: 0,
    width: '180px', height: '180px',
    borderBottom: `1.5px solid ${GOLD_FAINT}`,
    borderRight: `1.5px solid ${GOLD_FAINT}`,
    borderRadius: '100% 0 0 0',
    pointerEvents: 'none',
  },

  heroInner: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
    position: 'relative',
    zIndex: 2,
  },

  heroLeft: { flex: '1', minWidth: 0 },

  heroEyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '3px',
    color: GOLD,
    textTransform: 'uppercase',
    marginBottom: '20px',
    padding: '6px 14px',
    border: `1px solid ${GOLD_SOFT}`,
    borderRadius: '20px',
    background: GOLD_FAINT,
  },

  heroEyebrowDot: {
    width: '6px', height: '6px',
    borderRadius: '50%',
    background: GOLD,
    display: 'inline-block',
  },

  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(32px, 4vw, 52px)',
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: '1.2',
    marginBottom: '20px',
    letterSpacing: '-0.5px',
  },

  heroAccent: { color: GOLD },

  heroDivider: {
    width: '48px', height: '2px',
    background: GOLD,
    borderRadius: '2px',
    marginBottom: '24px',
    opacity: 0.7,
  },

  heroSub: {
    fontSize: '15px',
    color: TEXT_DIM,
    lineHeight: '1.8',
    marginBottom: '12px',
    maxWidth: '480px',
  },

  heroSub2: {
    fontSize: '14px',
    color: 'rgba(200,146,42,0.75)',
    lineHeight: '1.8',
    marginBottom: '36px',
    maxWidth: '480px',
    fontStyle: 'italic',
    paddingLeft: '14px',
    borderLeft: `2px solid ${GOLD_SOFT}`,
  },

  heroRight: {
    flex: '0 0 360px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroImgWrap: {
    position: 'relative',
    width: '300px', height: '340px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroImgRing1: {
    position: 'absolute',
    width: '300px', height: '300px',
    borderRadius: '50%',
    border: `1px solid ${GOLD_FAINT}`,
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  heroImgRing2: {
    position: 'absolute',
    width: '220px', height: '220px',
    borderRadius: '50%',
    border: '1px solid rgba(200,146,42,0.1)',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  heroImg: {
    width: '260px',
    height: 'auto',
    objectFit: 'contain',
    position: 'relative',
    zIndex: 1,
    filter: 'drop-shadow(0 0 40px rgba(200,146,42,0.45)) drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
  },

  /* ─── Form section ──────────────────────────────────── */
  container: {
    background: CREAM,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '48px 20px 64px',
    boxSizing: 'border-box',
  },

  formContainer: {
    background: PANEL,
    borderRadius: '16px',
    padding: '36px',
    width: '100%',
    maxWidth: '880px',
    boxShadow: '0 8px 40px rgba(200,146,42,0.18), 0 20px 60px rgba(0,0,0,0.25)',
    border: `1px solid ${GOLD_SOFT}`,
  },

  title: {
    fontFamily: "'Playfair Display', serif",
    color: '#ffffff',
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '16px',
    fontWeight: '800',
  },

  eyebrow: {
    color: GOLD, fontSize: '11px', fontWeight: '700', letterSpacing: '2px', marginBottom: '16px',
  },

  introContent: {
    marginBottom: '30px',
    padding: '20px',
    borderRadius: '12px',
    background: GOLD_FAINT,
    border: `1px solid ${GOLD_SOFT}`,
    textAlign: 'center',
  },

  liveInterviewBox: { marginBottom: '20px' },

  liveTitle: {
    color: GOLD,
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '12px',
    lineHeight: 1.3,
  },

  liveText: {
    fontSize: '16px',
    lineHeight: 1.6,
    color: TEXT_DIM,
  },

  magazineBox: {},

  magazineTitle: {
    color: GOLD,
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
  },

  magazineText: {
    fontSize: '16px',
    lineHeight: 1.6,
    color: TEXT_DIM,
  },

  exploreButton: {
    display: 'inline-block',
    padding: '12px 32px',
    backgroundColor: GOLD,
    color: '#0a1a14',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },

  fieldGroup: { marginBottom: '22px' },
  fieldLabel: { color: GOLD, fontSize: '15px', marginBottom: '10px', fontWeight: '600' },
  fieldRow: { display: 'flex', gap: '15px', marginBottom: '22px', flexWrap: 'wrap' },
  fieldColumn: { flex: '1 1 280px', minWidth: '0' },

  /* step bar */
  stepBar: { display: 'flex', alignItems: 'center', marginBottom: '28px' },
  stepItem: { display: 'flex', alignItems: 'center', gap: '8px' },
  stepDot: {
    width: '26px', height: '26px', borderRadius: '50%',
    border: `1.5px solid ${GOLD_SOFT}`, color: TEXT_FAINT,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '12px', fontWeight: '700', flex: 'none',
    background: 'transparent',
  },
  stepDotActive: { background: DARKBG, color: GOLD, borderColor: GOLD },
  stepDotDone: { background: GOLD, color: DARKBG, borderColor: GOLD },
  stepLabel: { fontSize: '12px', color: TEXT_FAINT, fontWeight: '600' },
  stepLabelActive: { fontSize: '12px', color: '#fff', fontWeight: '700' },
  stepConnector: { flex: 1, height: '1px', background: GOLD_SOFT, margin: '0 14px' },

  inputField: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: `1.5px solid ${GOLD_SOFT}`,
    backgroundColor: '#102219',
    color: '#ffffff',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },

  selectField: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: `1.5px solid ${GOLD_SOFT}`,
    backgroundColor: '#102219',
    color: '#ffffff',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },

  phoneRow: {
    display: 'flex',
    gap: '10px',
  },

  phoneNumberInput: {
    flex: '1',
    padding: '12px 15px',
    borderRadius: '8px',
    border: `1.5px solid ${GOLD_SOFT}`,
    backgroundColor: '#102219',
    color: '#ffffff',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },

  applyButton: {
    width: '100%',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: GOLD,
    color: '#0a1a14',
    fontSize: '18px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px',
    letterSpacing: '0.3px',
    transition: 'background-color 0.2s, transform 0.15s',
  },

  /* ─── Step 2 — package selection ───────────────────── */

  sectionDivider: {
    display: 'flex', alignItems: 'center', textAlign: 'center',
    margin: '28px 0 18px', color: GOLD, fontSize: '11px', fontWeight: '700',
    letterSpacing: '2px',
  },

  modeGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  modeCard: {
    background: '#102219', borderRadius: '10px', padding: '28px 16px',
    textAlign: 'center', cursor: 'pointer', border: `1.5px solid ${GOLD_SOFT}`,
    transition: '.15s',
  },
  modeCardActive: { border: `2px solid ${GOLD}`, background: GOLD_FAINT },
  modeIcon: { fontSize: '26px', marginBottom: '10px' },
  modeName: { color: '#fff', fontWeight: '700', fontSize: '15px', marginBottom: '4px' },
  modeHint: { color: TEXT_DIM, fontSize: '12px' },

  pkgGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  pkgCard: {
    position: 'relative', background: '#102219', borderRadius: '10px',
    padding: '20px 18px', cursor: 'pointer', border: `1.5px solid ${GOLD_SOFT}`,
  },
  pkgCardActive: { border: `2px solid ${GOLD}`, background: GOLD_FAINT },
  pkgBadge: {
    position: 'absolute', top: '-10px', left: '16px',
    background: GOLD, color: DARKBG, fontSize: '10px', fontWeight: '800',
    letterSpacing: '1px', padding: '3px 10px', borderRadius: '20px',
  },
  pkgHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px', marginTop: '4px' },
  pkgName: { color: '#fff', fontWeight: '700', fontSize: '14.5px', paddingRight: '10px' },
  pkgPrice: { color: GOLD, fontWeight: '800', fontSize: '17px', whiteSpace: 'nowrap' },
  pkgFeatureList: { listStyle: 'none', margin: 0, padding: 0 },
  pkgFeature: {
    display: 'flex', alignItems: 'flex-start', gap: '8px',
    color: TEXT_DIM, fontSize: '12.5px', lineHeight: 1.5, marginBottom: '7px',
  },
  pkgCheck: { color: GOLD, fontWeight: '700', flex: 'none' },

  addonRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: '#102219', borderRadius: '10px', padding: '16px 18px', marginBottom: '12px',
    border: `1.5px solid ${GOLD_SOFT}`,
  },
  addonInfo: { display: 'flex', alignItems: 'center', gap: '12px' },
  addonIcon: { fontSize: '20px' },
  addonName: { color: '#fff', fontWeight: '700', fontSize: '14px' },
  addonSub: { color: TEXT_DIM, fontSize: '12px', marginTop: '2px' },
  counter: { display: 'flex', alignItems: 'center', gap: '14px' },
  counterBtn: {
    width: '30px', height: '30px', borderRadius: '6px',
    border: `1.5px solid ${GOLD}`, background: 'transparent', color: GOLD,
    fontSize: '16px', cursor: 'pointer',
  },
  counterVal: { color: '#fff', fontWeight: '700', minWidth: '14px', textAlign: 'center' },

  /* ─── Coupon code ───────────────────────────────────── */
  couponRow: { display: 'flex', gap: '10px' },
  couponInput: {
    flex: 1,
    padding: '12px 15px',
    borderRadius: '8px',
    border: `1.5px solid ${GOLD_SOFT}`,
    backgroundColor: '#102219',
    color: '#ffffff',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
    textTransform: 'uppercase',
  },
  couponApplyBtn: {
    padding: '12px 22px',
    borderRadius: '8px',
    border: 'none',
    background: GOLD,
    color: DARKBG,
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  couponRemoveBtn: {
    padding: '12px 22px',
    borderRadius: '8px',
    border: `1.5px solid ${GOLD_SOFT}`,
    background: 'transparent',
    color: '#fff',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  couponMessage: { fontSize: '13px', marginTop: '8px', fontWeight: '600' },

  totalBar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: '#102219', borderRadius: '10px', padding: '18px 20px', marginTop: '20px',
    border: `1.5px solid ${GOLD_SOFT}`,
  },
  totalLabel: { color: TEXT_DIM, fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px' },
  totalHint: { color: TEXT_FAINT, fontSize: '12px', marginTop: '4px' },
  totalDiscountHint: { color: SUCCESS_GREEN, fontSize: '12px', marginTop: '4px', fontWeight: '600' },
  totalAmount: { color: GOLD, fontSize: '24px', fontWeight: '800' },

  navRow: { display: 'flex', gap: '12px', marginTop: '22px' },
  backBtn: {
    padding: '14px 22px', borderRadius: '8px', border: `1.5px solid ${GOLD_SOFT}`,
    background: 'transparent', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer',
  },
  continueBtn: {
    flex: 1, padding: '14px 22px', borderRadius: '8px', border: 'none',
    background: GOLD, color: DARKBG, fontWeight: '800', fontSize: '15px',
    letterSpacing: '0.5px', cursor: 'pointer',
  },

  legalNote: { textAlign: 'center', color: TEXT_FAINT, fontSize: '11px', marginTop: '16px' },
};

export default RegisterPage;