/**
 * RYDO - Bike Rentals Web Application (v2.0 Professional Suite)
 * Demonstrates:
 * 1. Core JavaScript: LocalStorage persistence (Auth, Bookings, Favorites, Reviews, Theme),
 *    URLSearchParams query parsing, Clipboard API, Date arithmetic & validation,
 *    Dynamic math/pricing calculation, Custom Event Bus, Print API, Chat response engine.
 * 2. React 18: Component-based Architecture:
 *    - Navbar with Theme Sync, City Selector, My Rides & Intro Link
 *    - FleetCatalog with Live Search, Category Pills, Sort & Compare Triggers
 *    - BookingModal with Dynamic Itemized Pricing & Coupon Engine
 *    - InvoiceModal with Formal Tax Breakdown & Browser Print API
 *    - MyBookingsModal with Active Reservation Management
 *    - BikeComparisonDrawer with Side-by-Side Specs Matrix
 *    - FuelEstimator with Real-time Trip Cost & Cab Savings Calculator
 *    - ReviewsSection with Live Review & Star Rating Submission
 *    - RydoAssistant (Floating Live AI Support Chatbot)
 *    - DealsHub with Clipboard API Copy Actions
 *    - CitiesHub with URL Query Parsing
 *    - AuthPage with Session Persistence & Guest Exploration Path
 */

const { createElement: h, useState, useEffect, useMemo } = React;

/* ==========================================================================
   1. DATA REPOSITORY
   ========================================================================== */

const CITIES_DATA = [
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    hub: 'Indiranagar Hub, 100ft Road',
    tagline: 'Silicon Valley weekend getaways & coffee estates',
    bikesCount: 45,
    hours: '7:00 AM - 10:00 PM',
    scenicRoute: 'Nandi Hills Sunrise & Kanakapura Countryside',
    icon: 'fa-location-dot',
    popularBadge: 'Top Pick'
  },
  {
    id: 'goa',
    name: 'Goa',
    hub: 'Calangute Main Circle & Dabolim Airport Hub',
    tagline: 'Coastal curves, palm-lined highways & beach sunsets',
    bikesCount: 60,
    hours: '6:30 AM - 11:30 PM',
    scenicRoute: 'North to South Coastal Highway & Chorla Ghats',
    icon: 'fa-umbrella-beach',
    popularBadge: 'Bestseller'
  },
  {
    id: 'delhi',
    name: 'New Delhi',
    hub: 'Connaught Place Inner Circle & Aerocity',
    tagline: 'Heritage monuments, broad boulevards & expressways',
    bikesCount: 38,
    hours: '8:00 AM - 9:00 PM',
    scenicRoute: 'Yamuna Expressway to Agra & Murthal Night Ride',
    icon: 'fa-landmark'
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    hub: 'Andheri West Link Road & Bandra Reclamation',
    tagline: 'Sea Link breezes, marine curves & Western Ghats',
    bikesCount: 40,
    hours: '7:30 AM - 10:00 PM',
    scenicRoute: 'Mumbai-Lonavala Old Highway & Marine Drive Night Run',
    icon: 'fa-city'
  },
  {
    id: 'leh',
    name: 'Leh-Ladakh',
    hub: 'Main Bazaar Hub & Leh Airport Road',
    tagline: 'High altitude passes & Himalayan rugged trails',
    bikesCount: 30,
    hours: '6:00 AM - 8:00 PM',
    scenicRoute: 'Khardung La Pass, Nubra Valley & Pangong Tso Lake',
    icon: 'fa-mountain-sun',
    popularBadge: 'Adventure Hub'
  }
];

const BIKES_DATA = [
  {
    id: 're-classic-350',
    name: 'Royal Enfield Classic 350',
    category: 'cruiser',
    cc: '349 cc',
    mileage: '35 km/l',
    mileageNum: 35,
    power: '20.2 bhp @ 6100 rpm',
    torque: '27 Nm @ 4000 rpm',
    topSpeed: '115 km/h',
    transmission: 'Manual',
    price: 899,
    rating: 4.8,
    reviews: 1240,
    tag: 'Most Popular Cruiser',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_c7QqnoEzld0TkF3PDAV7kJWrRSUQ1lUk68aPV5jnGw&s=10',
    cities: ['bengaluru', 'goa', 'delhi', 'mumbai', 'leh']
  },
  {
    id: 'ktm-duke-390',
    name: 'KTM Duke 390',
    category: 'sports',
    cc: '373 cc',
    mileage: '28 km/l',
    mileageNum: 28,
    power: '43.5 bhp @ 9000 rpm',
    torque: '37 Nm @ 7000 rpm',
    topSpeed: '167 km/h',
    transmission: 'Manual',
    price: 1299,
    rating: 4.9,
    reviews: 890,
    tag: 'Sports Performance',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800',
    cities: ['bengaluru', 'delhi', 'mumbai', 'goa']
  },
  {
    id: 'yamaha-r15-v4',
    name: 'Yamaha YZF R15 V4',
    category: 'sports',
    cc: '155 cc',
    mileage: '45 km/l',
    mileageNum: 45,
    power: '18.4 bhp @ 10000 rpm',
    torque: '14.2 Nm @ 7500 rpm',
    topSpeed: '140 km/h',
    transmission: 'Manual',
    price: 749,
    rating: 4.7,
    reviews: 630,
    tag: 'Track-Ready',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=800',
    cities: ['bengaluru', 'delhi', 'mumbai', 'goa', 'leh']
  },
  {
    id: 'ather-450x',
    name: 'Ather 450X Gen 3',
    category: 'electric',
    cc: '105 km Range',
    mileage: '105 km/charge',
    mileageNum: 999, // Electric 0 petrol
    power: '6.4 kW Peak',
    torque: '26 Nm Instant',
    topSpeed: '90 km/h',
    transmission: 'Automatic',
    price: 499,
    rating: 4.6,
    reviews: 520,
    tag: '100% Electric',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=800',
    cities: ['bengaluru', 'delhi', 'mumbai', 'goa']
  },
  {
    id: 'honda-activa-6g',
    name: 'Honda Activa 6G',
    category: 'commuter',
    cc: '109 cc',
    mileage: '55 km/l',
    mileageNum: 55,
    power: '7.8 bhp @ 8000 rpm',
    torque: '8.8 Nm @ 5500 rpm',
    topSpeed: '85 km/h',
    transmission: 'Automatic',
    price: 399,
    rating: 4.5,
    reviews: 1850,
    tag: 'Easy Commuter',
    image: 'https://motoshare.in/storage/vechile_image/vechile_image1724709543.webp',
    cities: ['bengaluru', 'goa', 'delhi', 'mumbai', 'leh']
  },
  {
    id: 're-himalayan-450',
    name: 'Royal Enfield Himalayan 450',
    category: 'adventure',
    cc: '452 cc',
    mileage: '28 km/l',
    mileageNum: 28,
    power: '40.0 bhp @ 8000 rpm',
    torque: '40 Nm @ 5500 rpm',
    topSpeed: '150 km/h',
    transmission: 'Manual',
    price: 1499,
    rating: 4.9,
    reviews: 1420,
    tag: 'Adventure Ready',
    image: 'https://images.unsplash.com/photo-1558980664-2506fca6bfc2?q=80&w=800',
    cities: ['bengaluru', 'goa', 'delhi', 'mumbai', 'leh']
  },
  {
    id: 'tvs-apache-200',
    name: 'TVS Apache RTR 200 4V',
    category: 'sports',
    cc: '197 cc',
    mileage: '38 km/l',
    mileageNum: 38,
    power: '20.8 bhp @ 9000 rpm',
    torque: '17.25 Nm @ 7250 rpm',
    topSpeed: '127 km/h',
    transmission: 'Manual',
    price: 699,
    rating: 4.6,
    reviews: 410,
    tag: 'Street Fighter',
    image: 'https://www.rentrip.in/uploads/products/bike/500x350/593184IMG_1550570328.webp',
    cities: ['bengaluru', 'delhi', 'mumbai']
  },
  {
    id: 'pulsar-ns200',
    name: 'Bajaj Pulsar NS200',
    category: 'sports',
    cc: '199 cc',
    mileage: '35 km/l',
    mileageNum: 35,
    power: '24.5 bhp @ 9750 rpm',
    torque: '18.7 Nm @ 8000 rpm',
    topSpeed: '136 km/h',
    transmission: 'Manual',
    price: 649,
    rating: 4.5,
    reviews: 580,
    tag: 'City Cruiser',
    image: 'https://www.rentrip.in/uploads/products/bike/500x350/593184IMG_1598686806.webp',
    cities: ['bengaluru', 'delhi', 'mumbai', 'goa']
  },
  {
    id: 'honda-cb350-rs',
    name: 'Honda CB350 RS',
    category: 'cruiser',
    cc: '348 cc',
    mileage: '36 km/l',
    mileageNum: 36,
    power: '20.8 bhp @ 5500 rpm',
    torque: '30 Nm @ 3000 rpm',
    topSpeed: '125 km/h',
    transmission: 'Manual',
    price: 799,
    rating: 4.8,
    reviews: 730,
    tag: 'Weekend Escape',
    image: 'https://www.rentrip.in/uploads/products/bike/500x350/593184IMG_1659702505.webp',
    cities: ['bengaluru', 'goa', 'delhi', 'mumbai']
  }
];

const DEALS_DATA = [
  {
    code: 'WEEKEND20',
    title: '20% OFF on Weekend Trips',
    desc: 'Rent any cruiser or sports bike for 2 or more days and receive a flat 20% discount.',
    discountPercent: 20,
    minDays: 2,
    category: 'discounts',
    icon: 'fa-percent',
    color: 'linear-gradient(135deg, #2563eb, #7c3aed)'
  },
  {
    code: 'ZERODEP',
    title: 'Zero Deposit on EV Scooters',
    desc: 'Book an Ather EV scooter with instant digital Aadhaar KYC and save ₹150 flat on rental fees.',
    fixedDiscount: 150,
    category: 'ev',
    icon: 'fa-leaf',
    color: 'linear-gradient(135deg, #047857, #10b981)'
  },
  {
    code: 'LONGRIDE15',
    title: 'Long Ride Rewards',
    desc: 'Save 15% when you book any touring bike for 5 days or longer across all Indian hubs.',
    discountPercent: 15,
    minDays: 5,
    category: 'long-ride',
    icon: 'fa-road',
    color: 'linear-gradient(135deg, #ea580c, #f59e0b)'
  },
  {
    code: 'RIDEFRIEND',
    title: 'Refer a Rider Bonus',
    desc: 'Use referral code to get ₹300 off your booking when reserving rides over ₹1,500.',
    fixedDiscount: 300,
    category: 'referral',
    icon: 'fa-user-group',
    color: 'linear-gradient(135deg, #be123c, #f43f5e)'
  },
  {
    code: 'EARLYBIRD10',
    title: 'Early Bird Booking',
    desc: 'Book your ride at least 7 days ahead and enjoy an automatic 10% advance savings.',
    discountPercent: 10,
    category: 'discounts',
    icon: 'fa-calendar-days',
    color: 'linear-gradient(135deg, #4338ca, #6366f1)'
  },
  {
    code: 'FIRSTRIDE',
    title: 'First Ride Bonus',
    desc: 'New to Rydo? Enjoy ₹250 flat instant savings on your first self-drive motorcycle reservation.',
    fixedDiscount: 250,
    category: 'discounts',
    icon: 'fa-star',
    color: 'linear-gradient(135deg, #7c2d12, #c2410c)'
  }
];

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Arjun Verma',
    city: 'Bengaluru',
    bike: 'Royal Enfield Classic 350',
    rating: 5,
    date: 'October 2026',
    comment: 'Rented for a weekend ride to Nandi Hills. Zero security deposit made the booking effortless. Vehicle was spotless and properly serviced!'
  },
  {
    id: 2,
    name: 'Pooja Nair',
    city: 'Goa',
    bike: 'Ather 450X Gen 3',
    rating: 5,
    date: 'October 2026',
    comment: 'Rode the Ather across North Goa beaches. Free ISI helmets and instant Aadhaar KYC took literally 2 minutes at Calangute hub.'
  },
  {
    id: 3,
    name: 'Rohan Sharma',
    city: 'Leh-Ladakh',
    bike: 'Royal Enfield Himalayan 450',
    rating: 5,
    date: 'September 2026',
    comment: 'Conquered Khardung La Pass on the Himalayan 450. Zero breakdowns, strong low-end torque, and 24/7 roadside assistance gave us ultimate peace of mind.'
  },
  {
    id: 4,
    name: 'Karthik Rao',
    city: 'Mumbai',
    bike: 'KTM Duke 390',
    rating: 4,
    date: 'October 2026',
    comment: 'Insane power for the Western Ghats run to Lonavala! Smooth key handover at Andheri hub, great customer support.'
  }
];

/* ==========================================================================
   2. JAVASCRIPT SERVICES & LOCALSTORAGE LAYER
   ========================================================================== */

const StorageService = {
  getUser() {
    try {
      const data = localStorage.getItem('rydo_user');
      return data ? JSON.parse(data) : null;
    } catch { return null; }
  },
  setUser(user) {
    try {
      localStorage.setItem('rydo_user', JSON.stringify(user));
      window.dispatchEvent(new CustomEvent('rydo:auth-change', { detail: user }));
    } catch (e) { console.error('Storage error:', e); }
  },
  clearUser() {
    try {
      localStorage.removeItem('rydo_user');
      window.dispatchEvent(new CustomEvent('rydo:auth-change', { detail: null }));
    } catch (e) { console.error('Storage error:', e); }
  },
  getBookings() {
    try {
      const data = localStorage.getItem('rydo_bookings');
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  },
  addBooking(booking) {
    try {
      const current = this.getBookings();
      const updated = [booking, ...current];
      localStorage.setItem('rydo_bookings', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('rydo:bookings-change', { detail: updated }));
      return updated;
    } catch (e) { console.error('Storage error:', e); return []; }
  },
  cancelBooking(bookingId) {
    try {
      const current = this.getBookings();
      const updated = current.filter(b => b.id !== bookingId);
      localStorage.setItem('rydo_bookings', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('rydo:bookings-change', { detail: updated }));
      return updated;
    } catch (e) { console.error('Storage error:', e); return []; }
  },
  getFavorites() {
    try {
      const data = localStorage.getItem('rydo_favorites');
      return data ? JSON.parse(data) : ['re-classic-350'];
    } catch { return []; }
  },
  toggleFavorite(bikeId) {
    try {
      const current = this.getFavorites();
      const updated = current.includes(bikeId)
        ? current.filter(id => id !== bikeId)
        : [...current, bikeId];
      localStorage.setItem('rydo_favorites', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('rydo:favorites-change', { detail: updated }));
      return updated;
    } catch (e) { return []; }
  },
  getReviews() {
    try {
      const data = localStorage.getItem('rydo_reviews');
      return data ? JSON.parse(data) : INITIAL_REVIEWS;
    } catch { return INITIAL_REVIEWS; }
  },
  addReview(review) {
    try {
      const current = this.getReviews();
      const updated = [review, ...current];
      localStorage.setItem('rydo_reviews', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('rydo:reviews-change', { detail: updated }));
      return updated;
    } catch (e) { return []; }
  },
  getTheme() {
    return localStorage.getItem('rydo_theme') || 'light';
  },
  setTheme(theme) {
    localStorage.setItem('rydo_theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('theme-dark');
      const toggle = document.getElementById('themeToggle');
      if (toggle) toggle.checked = true;
    } else {
      document.body.classList.remove('theme-dark');
      const toggle = document.getElementById('themeToggle');
      if (toggle) toggle.checked = false;
    }
    window.dispatchEvent(new CustomEvent('rydo:theme-change', { detail: theme }));
  },
  getKycStatus() {
    try {
      const data = localStorage.getItem('rydo_kyc');
      return data ? JSON.parse(data) : { verified: false, dlNumber: '', name: '', aadhaarLast4: '', verifiedDate: null };
    } catch {
      return { verified: false, dlNumber: '', name: '', aadhaarLast4: '', verifiedDate: null };
    }
  },
  setKycStatus(kycData) {
    try {
      localStorage.setItem('rydo_kyc', JSON.stringify(kycData));
      window.dispatchEvent(new CustomEvent('rydo:kyc-change', { detail: kycData }));
      return kycData;
    } catch (e) { return null; }
  },
  getLoyaltyData() {
    try {
      const data = localStorage.getItem('rydo_loyalty');
      return data ? JSON.parse(data) : {
        xp: 1450,
        tier: 'Silver Explorer',
        kmsRidden: 920,
        ridesCompleted: 4,
        badges: ['first-ride', 'ghats-carver', 'night-owl'],
        claimedVouchers: []
      };
    } catch {
      return {
        xp: 1450,
        tier: 'Silver Explorer',
        kmsRidden: 920,
        ridesCompleted: 4,
        badges: ['first-ride', 'ghats-carver', 'night-owl'],
        claimedVouchers: []
      };
    }
  },
  setLoyaltyData(loyalty) {
    try {
      localStorage.setItem('rydo_loyalty', JSON.stringify(loyalty));
      window.dispatchEvent(new CustomEvent('rydo:loyalty-change', { detail: loyalty }));
      return loyalty;
    } catch (e) { return null; }
  },
  claimLoyaltyVoucher(code, xpCost) {
    const data = this.getLoyaltyData();
    if (data.xp < xpCost) return { success: false, message: 'Insufficient XP points' };
    if (data.claimedVouchers.includes(code)) return { success: false, message: 'Voucher already claimed' };
    data.xp -= xpCost;
    data.claimedVouchers.push(code);
    this.setLoyaltyData(data);
    return { success: true, message: `Voucher ${code} unlocked successfully!` };
  },
  getSupportTickets() {
    try {
      const data = localStorage.getItem('rydo_support_tickets');
      return data ? JSON.parse(data) : [
        {
          id: 'TKT-2026-1042',
          date: '2026-10-22',
          category: 'KYC Verification',
          status: 'Resolved',
          subject: 'Driving license instant scan completed',
          city: 'Bengaluru'
        }
      ];
    } catch { return []; }
  },
  addSupportTicket(ticket) {
    try {
      const current = this.getSupportTickets();
      const updated = [ticket, ...current];
      localStorage.setItem('rydo_support_tickets', JSON.stringify(updated));
      return updated;
    } catch (e) { return []; }
  }
};

// Auto-initialize theme on script execution
(function initAppTheme() {
  const current = StorageService.getTheme();
  if (current === 'dark') {
    document.body.classList.add('theme-dark');
  }
})();

const ToastService = {
  show(message, type = 'success') {
    window.dispatchEvent(new CustomEvent('rydo:toast', { detail: { message, type, id: Date.now() } }));
  }
};

function getLocalDateString(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function calculateDaysDifference(startStr, endStr) {
  if (!startStr || !endStr) return 1;
  const start = new Date(startStr);
  const end = new Date(endStr);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

/* ==========================================================================
   3. TOAST NOTIFICATIONS COMPONENT (REACT)
   ========================================================================== */

function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    function handleToast(e) {
      const toast = e.detail;
      setToasts(prev => [...prev, toast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, 4000);
    }
    window.addEventListener('rydo:toast', handleToast);
    return () => window.removeEventListener('rydo:toast', handleToast);
  }, []);

  if (toasts.length === 0) return null;

  return h(
    'div',
    { className: 'toast-container', role: 'region', 'aria-label': 'Notifications' },
    toasts.map(t =>
      h(
        'div',
        { key: t.id, className: `toast-pill toast-${t.type}` },
        h('i', { className: `fa-solid ${t.type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-check'}` }),
        h('span', null, t.message)
      )
    )
  );
}

/* ==========================================================================
   4. NAVIGATION BAR COMPONENT (REACT - PROFESSIONAL SUITE)
   ========================================================================== */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(StorageService.getTheme());
  const [user, setUser] = useState(StorageService.getUser());
  const [kyc, setKyc] = useState(StorageService.getKycStatus());
  const [bookingsCount, setBookingsCount] = useState(StorageService.getBookings().length);
  const [showBookingsModal, setShowBookingsModal] = useState(false);

  const currentPage = window.location.pathname.split('/').pop() || 'home.html';

  useEffect(() => {
    function onAuth(e) { setUser(e.detail); }
    function onBookings(e) { setBookingsCount(e.detail ? e.detail.length : 0); }
    function onTheme(e) { setTheme(e.detail); }
    function onKyc(e) { setKyc(e.detail); }

    function onScroll() {
      setIsScrolled(window.scrollY > 20);
    }

    function onDocClick(e) {
      if (!e.target.closest('.nav-dropdown-wrapper')) {
        setDropdownOpen(false);
      }
    }

    window.addEventListener('rydo:auth-change', onAuth);
    window.addEventListener('rydo:bookings-change', onBookings);
    window.addEventListener('rydo:theme-change', onTheme);
    window.addEventListener('rydo:kyc-change', onKyc);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onDocClick);

    return () => {
      window.removeEventListener('rydo:auth-change', onAuth);
      window.removeEventListener('rydo:bookings-change', onBookings);
      window.removeEventListener('rydo:theme-change', onTheme);
      window.removeEventListener('rydo:kyc-change', onKyc);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onDocClick);
    };
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    StorageService.setTheme(nextTheme);
    setTheme(nextTheme);
    ToastService.show(`Switched to ${nextTheme} theme`);
  }

  const [selectedCity, setSelectedCity] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('city') || '';
  });

  useEffect(() => {
    function onSearchFilter(e) {
      if (e.detail && e.detail.city !== undefined) {
        setSelectedCity(e.detail.city);
      }
    }
    window.addEventListener('rydo:search-filter', onSearchFilter);
    return () => window.removeEventListener('rydo:search-filter', onSearchFilter);
  }, []);

  function handleCityChange(e) {
    const city = e.target.value;
    setSelectedCity(city);
    if (city) {
      if (currentPage === 'home.html' || currentPage === '' || currentPage === 'index.html') {
        window.dispatchEvent(new CustomEvent('rydo:search-filter', { detail: { city } }));
        const fleetElem = document.getElementById('bikes');
        if (fleetElem) fleetElem.scrollIntoView({ behavior: 'smooth' });
        const cityObj = CITIES_DATA.find(c => c.id === city);
        ToastService.show(`Filtering fleet for ${cityObj ? cityObj.name : city}`);
      } else {
        window.location.href = `cities.html?city=${encodeURIComponent(city)}`;
      }
    } else {
      // User selected "All Cities"
      if (currentPage === 'home.html' || currentPage === '' || currentPage === 'index.html') {
        window.dispatchEvent(new CustomEvent('rydo:search-filter', { detail: { city: '' } }));
        const fleetElem = document.getElementById('bikes');
        if (fleetElem) fleetElem.scrollIntoView({ behavior: 'smooth' });
        ToastService.show('Showing bikes for all Indian cities');
      } else {
        window.location.href = 'cities.html';
      }
    }
  }

  function handleSignOut() {
    StorageService.clearUser();
    ToastService.show('You have been signed out.');
  }

  const primaryNav = [
    { label: 'Fleet', href: 'home.html#bikes', icon: 'fa-motorcycle' },
    { label: 'Routes', href: 'routes.html', icon: 'fa-route', badge: 'NEW' },
    { label: 'Deals', href: 'deals.html', icon: 'fa-tag' },
    { label: 'Hubs', href: 'cities.html', icon: 'fa-location-dot' }
  ];

  const serviceLinks = [
    { label: 'Loyalty Club', href: 'loyalty.html', icon: 'fa-crown', desc: 'Rydo Miles XP & Badges', color: '#f59e0b' },
    { label: 'Safety & SOS', href: 'safety.html', icon: 'fa-shield-halved', desc: 'Zero-Dep & 24/7 Roadside Beacon', color: '#10b981' },
    { label: 'Zero-Deposit KYC', href: 'kyc.html', icon: 'fa-id-card', desc: 'Instant DL & Aadhaar Clearance', color: '#3b82f6' },
    { label: 'Help & Tickets', href: 'contact.html', icon: 'fa-headset', desc: '24/7 Support Desk & FAQs', color: '#8b5cf6' },
    { label: 'Cinematic Intro', href: 'loading.html', icon: 'fa-play', desc: 'Live Wallpaper Starting Reel', color: '#ec4899' }
  ];

  const isServicesActive = serviceLinks.some(s => s.href.split('#')[0] === currentPage);

  return h(
    React.Fragment,
    null,
    h(
      'nav',
      { className: `navbar${isScrolled ? ' is-scrolled' : ''}`, 'aria-label': 'Main navigation' },
      h(
        'div',
        { className: 'navbar-inner' },
        // Left: Logo & Brand Emblem
        h(
          'a',
          { href: 'home.html', className: 'logo', 'aria-label': 'Rydo Home' },
          h('span', { className: 'logo-icon', 'aria-hidden': 'true' }, h('i', { className: 'fa-solid fa-motorcycle' })),
          h(
            'div',
            { className: 'logo-text-group' },
            h('span', { className: 'logo-title' }, 'Rydo'),
            h('span', { className: 'logo-kicker' }, 'SELF-DRIVE INDIA')
          )
        ),
        // Center: Primary Navigation Cluster
        h(
          'ul',
          { className: 'nav-links', id: 'primary-navigation' },
          primaryNav.map(item => {
            const page = item.href.split('#')[0];
            const isActive = page === currentPage && (!item.href.includes('#') || window.location.hash === '#bikes');
            return h(
              'li',
              { key: item.label },
              h(
                'a',
                {
                  href: item.href,
                  className: isActive ? 'active' : '',
                  'aria-current': isActive ? 'page' : undefined
                },
                h('i', { className: `fa-solid ${item.icon}`, style: { fontSize: '12px', marginRight: '5px' } }),
                item.label,
                item.badge ? h('span', { className: 'nav-item-badge' }, item.badge) : null
              )
            );
          }),
          // Explore Dropdown Menu Trigger
          h(
            'li',
            { className: 'nav-dropdown-wrapper' },
            h(
              'button',
              {
                type: 'button',
                className: `nav-dropdown-btn${isServicesActive || dropdownOpen ? ' is-active' : ''}`,
                onClick: () => setDropdownOpen(!dropdownOpen),
                'aria-expanded': dropdownOpen
              },
              h('span', null, 'Services'),
              h('i', { className: `fa-solid fa-chevron-down${dropdownOpen ? ' rotate-chevron' : ''}` })
            ),
            dropdownOpen
              ? h(
                  'div',
                  { className: 'nav-dropdown-menu' },
                  serviceLinks.map(s => {
                    const isItemActive = s.href.split('#')[0] === currentPage;
                    return h(
                      'a',
                      {
                        key: s.label,
                        href: s.href,
                        className: `dropdown-item-card${isItemActive ? ' active' : ''}`,
                        onClick: () => setDropdownOpen(false)
                      },
                      h('div', { className: 'dropdown-item-icon', style: { color: s.color, background: `${s.color}18` } },
                        h('i', { className: `fa-solid ${s.icon}` })
                      ),
                      h(
                        'div',
                        { className: 'dropdown-item-content' },
                        h('div', { className: 'dropdown-item-title' }, s.label),
                        h('div', { className: 'dropdown-item-desc' }, s.desc)
                      )
                    );
                  })
                )
              : null
          )
        ),
        // Right: Actions Cluster
        h(
          'div',
          { className: 'navbar-actions' },
          // City Quick Selector Pill
          h(
            'div',
            { className: 'nav-city-wrapper' },
            h('i', { className: 'fa-solid fa-location-dot city-pin-icon' }),
            h(
              'select',
              {
                className: 'city-select',
                'aria-label': 'Choose pickup city',
                value: selectedCity,
                onChange: handleCityChange
              },
              h('option', { value: '' }, 'All Cities'),
              CITIES_DATA.map(c => h('option', { key: c.id, value: c.id }, c.name))
            )
          ),
          // Roadside SOS Button
          h(
            'a',
            {
              href: 'safety.html#sos',
              className: 'nav-sos-quick-btn',
              title: '24/7 Roadside Assistance & SOS'
            },
            h('span', { className: 'sos-pulse-dot' }),
            h('span', { className: 'sos-btn-text' }, 'SOS')
          ),
          // My Rides Drawer Button
          h(
            'button',
            {
              type: 'button',
              className: 'bookings-badge-btn',
              onClick: () => setShowBookingsModal(true),
              title: 'View reserved rides'
            },
            h('i', { className: 'fa-solid fa-calendar-check' }),
            h('span', { className: 'bookings-text' }, 'My Rides'),
            bookingsCount > 0 ? h('span', { className: 'count-pill' }, bookingsCount) : null
          ),
          // Theme Switcher Button
          h(
            'button',
            {
              type: 'button',
              className: 'theme-switch-btn',
              onClick: toggleTheme,
              title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`,
              'aria-label': 'Toggle theme'
            },
            h('i', { className: `fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}` })
          ),
          // User / Sign In Chip
          user
            ? h(
                'div',
                { className: 'user-profile-badge' },
                h('span', { className: 'user-avatar' }, user.name ? user.name.charAt(0).toUpperCase() : 'U'),
                h('span', { className: 'user-name' }, user.name ? user.name.split(' ')[0] : 'Rider'),
                kyc && kyc.verified ? h('span', { className: 'vip-chip-badge', title: 'Zero-Deposit Verified' }, 'VIP') : null,
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'signout-btn',
                    onClick: handleSignOut,
                    title: 'Sign out'
                  },
                  h('i', { className: 'fa-solid fa-arrow-right-from-bracket' })
                )
              )
            : h(
                'a',
                { href: 'login.html', className: 'btn-primary nav-signin-btn' },
                h('i', { className: 'fa-solid fa-user' }),
                h('span', null, 'Sign In')
              ),
          // Hamburger Toggle for Mobile
          h(
            'button',
            {
              type: 'button',
              className: 'menu-toggle',
              'aria-label': menuOpen ? 'Close navigation' : 'Open navigation',
              onClick: () => setMenuOpen(!menuOpen)
            },
            h('i', { className: `fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}` })
          )
        )
      ),
      // Mobile Slide-down Drawer
      menuOpen
        ? h(
            'div',
            { className: 'nav-mobile-drawer' },
            h('div', { className: 'mobile-drawer-section-title' }, 'PRIMARY EXPLORATION'),
            h(
              'div',
              { className: 'mobile-drawer-links' },
              primaryNav.map(item =>
                h(
                  'a',
                  {
                    key: item.label,
                    href: item.href,
                    className: 'mobile-nav-link',
                    onClick: () => setMenuOpen(false)
                  },
                  h('i', { className: `fa-solid ${item.icon}` }),
                  h('span', null, item.label)
                )
              )
            ),
            h('div', { className: 'mobile-drawer-section-title' }, 'RIDER SERVICES & SUPPORT'),
            h(
              'div',
              { className: 'mobile-drawer-links' },
              serviceLinks.map(s =>
                h(
                  'a',
                  {
                    key: s.label,
                    href: s.href,
                    className: 'mobile-nav-link',
                    onClick: () => setMenuOpen(false)
                  },
                  h('i', { className: `fa-solid ${s.icon}`, style: { color: s.color } }),
                  h('span', null, s.label)
                )
              )
            )
          )
        : null
    ),
    showBookingsModal ? h(MyBookingsModal, { onClose: () => setShowBookingsModal(false) }) : null
  );
}

/* ==========================================================================
   5. BOOKING SEARCH WIDGET (HERO - REACT)
   ========================================================================== */

function BookingSearchForm() {
  const today = getLocalDateString(new Date());
  const tomorrow = getLocalDateString(new Date(Date.now() + 86400000));

  const [values, setValues] = useState({ city: '', pickup: today, dropoff: tomorrow });
  const [feedback, setFeedback] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.city) {
      ToastService.show('Please select a pickup city.', 'error');
      return;
    }
    if (values.dropoff <= values.pickup) {
      ToastService.show('Drop-off date must be after pickup date.', 'error');
      return;
    }

    const cityObj = CITIES_DATA.find(c => c.id === values.city);
    const cityName = cityObj ? cityObj.name : 'your selected city';
    const days = calculateDaysDifference(values.pickup, values.dropoff);

    setFeedback(`Filtering ${cityName} for ${days} day(s) trip! Choose your ride below.`);
    ToastService.show(`Showing available rides in ${cityName} for ${days} day(s)`);

    window.dispatchEvent(
      new CustomEvent('rydo:search-filter', {
        detail: { city: values.city, pickup: values.pickup, dropoff: values.dropoff, days }
      })
    );

    const fleetElem = document.getElementById('bikes');
    if (fleetElem) {
      fleetElem.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return h(
    'form',
    { className: 'search-card', onSubmit: handleSubmit, 'aria-label': 'Search rental bikes' },
    h(
      'div',
      { className: 'input-group' },
      h('label', { htmlFor: 'hero-city' }, h('i', { className: 'fa-solid fa-location-dot' }), ' PICKUP CITY'),
      h(
        'select',
        {
          id: 'hero-city',
          value: values.city,
          onChange: e => {
            setValues({ ...values, city: e.target.value });
            setFeedback('');
          },
          required: true
        },
        h('option', { value: '' }, 'Select pickup city'),
        CITIES_DATA.map(c => h('option', { key: c.id, value: c.id }, `${c.name} · ${c.hub.split(',')[0]}`))
      )
    ),
    h(
      'div',
      { className: 'input-group' },
      h('label', { htmlFor: 'hero-pickup' }, h('i', { className: 'fa-regular fa-calendar-check' }), ' PICKUP DATE'),
      h('input', {
        id: 'hero-pickup',
        type: 'date',
        min: today,
        value: values.pickup,
        onChange: e => setValues({ ...values, pickup: e.target.value }),
        required: true
      })
    ),
    h(
      'div',
      { className: 'input-group' },
      h('label', { htmlFor: 'hero-dropoff' }, h('i', { className: 'fa-regular fa-calendar-xmark' }), ' DROP-OFF DATE'),
      h('input', {
        id: 'hero-dropoff',
        type: 'date',
        min: values.pickup || today,
        value: values.dropoff,
        onChange: e => setValues({ ...values, dropoff: e.target.value }),
        required: true
      })
    ),
    h(
      'button',
      { type: 'submit', className: 'btn-primary search-submit-btn' },
      h('i', { className: 'fa-solid fa-magnifying-glass' }),
      ' Find Bikes'
    ),
    feedback
      ? h(
          'div',
          { className: 'search-feedback' },
          h('i', { className: 'fa-solid fa-circle-info' }),
          ' ',
          feedback,
          h('a', { href: '#bikes' }, 'View Results ↓')
        )
      : null
  );
}

/* ==========================================================================
   6. INTERACTIVE FLEET CATALOG WITH SEARCH, WISHLIST & COMPARE (REACT)
   ========================================================================== */

function FleetCatalog() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [cityFilter, setCityFilter] = useState('');
  const [selectedDates, setSelectedDates] = useState(null);
  const [bookingBike, setBookingBike] = useState(null);
  const [favorites, setFavorites] = useState(StorageService.getFavorites());
  const [compareIds, setCompareIds] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  useEffect(() => {
    function handleSearchFilter(e) {
      if (e.detail) {
        if (e.detail.city) setCityFilter(e.detail.city);
        if (e.detail.pickup && e.detail.dropoff) {
          setSelectedDates({ pickup: e.detail.pickup, dropoff: e.detail.dropoff, days: e.detail.days });
        }
      }
    }
    function handleFavoritesChange(e) {
      setFavorites(e.detail);
    }
    window.addEventListener('rydo:search-filter', handleSearchFilter);
    window.addEventListener('rydo:favorites-change', handleFavoritesChange);
    return () => {
      window.removeEventListener('rydo:search-filter', handleSearchFilter);
      window.removeEventListener('rydo:favorites-change', handleFavoritesChange);
    };
  }, []);

  function toggleFavoriteBike(bikeId, e) {
    e.stopPropagation();
    const updated = StorageService.toggleFavorite(bikeId);
    setFavorites(updated);
    const bike = BIKES_DATA.find(b => b.id === bikeId);
    if (updated.includes(bikeId)) {
      ToastService.show(`Added ${bike ? bike.name : 'bike'} to favorites ♥`);
    } else {
      ToastService.show(`Removed ${bike ? bike.name : 'bike'} from favorites`);
    }
  }

  function toggleCompareBike(bikeId, e) {
    e.stopPropagation();
    if (compareIds.includes(bikeId)) {
      setCompareIds(compareIds.filter(id => id !== bikeId));
    } else {
      if (compareIds.length >= 3) {
        ToastService.show('You can compare maximum 3 bikes at once.', 'error');
        return;
      }
      setCompareIds([...compareIds, bikeId]);
      ToastService.show('Added to comparison matrix');
    }
  }

  const categories = [
    { id: 'all', label: 'All Bikes', count: BIKES_DATA.length },
    { id: 'favorites', label: 'Favorites ♥', count: favorites.length },
    { id: 'cruiser', label: 'Cruisers', count: BIKES_DATA.filter(b => b.category === 'cruiser').length },
    { id: 'sports', label: 'Sports', count: BIKES_DATA.filter(b => b.category === 'sports').length },
    { id: 'adventure', label: 'Adventure', count: BIKES_DATA.filter(b => b.category === 'adventure').length },
    { id: 'electric', label: 'Electric', count: BIKES_DATA.filter(b => b.category === 'electric').length },
    { id: 'commuter', label: 'Commuter', count: BIKES_DATA.filter(b => b.category === 'commuter').length }
  ];

  const filteredBikes = useMemo(() => {
    return BIKES_DATA.filter(bike => {
      const matchesSearch =
        bike.name.toLowerCase().includes(search.toLowerCase()) ||
        bike.tag.toLowerCase().includes(search.toLowerCase()) ||
        bike.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === 'all'
          ? true
          : activeCategory === 'favorites'
          ? favorites.includes(bike.id)
          : bike.category === activeCategory;

      const matchesCity = !cityFilter || bike.cities.includes(cityFilter);

      return matchesSearch && matchesCategory && matchesCity;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [search, activeCategory, sortBy, cityFilter, favorites]);

  return h(
    'div',
    { className: 'fleet-interactive-container' },
    // Search and Sort controls
    h(
      'div',
      { className: 'fleet-controls' },
      h(
        'div',
        { className: 'search-input-wrapper' },
        h('i', { className: 'fa-solid fa-magnifying-glass search-icon' }),
        h('input', {
          type: 'text',
          placeholder: 'Search bikes by model (e.g. Royal Enfield, Duke, Ather)...',
          value: search,
          onChange: e => setSearch(e.target.value),
          className: 'fleet-search-input'
        }),
        search
          ? h(
              'button',
              {
                type: 'button',
                className: 'search-clear-btn',
                onClick: () => setSearch(''),
                title: 'Clear search'
              },
              h('i', { className: 'fa-solid fa-xmark' })
            )
          : null
      ),
      h(
        'div',
        { className: 'fleet-sort-wrapper' },
        h('label', { htmlFor: 'fleet-sort' }, h('i', { className: 'fa-solid fa-arrow-down-wide-short' }), ' Sort:'),
        h(
          'select',
          {
            id: 'fleet-sort',
            value: sortBy,
            onChange: e => setSortBy(e.target.value),
            className: 'fleet-sort-select'
          },
          h('option', { value: 'featured' }, 'Featured'),
          h('option', { value: 'price-low' }, 'Price: Low to High'),
          h('option', { value: 'price-high' }, 'Price: High to Low'),
          h('option', { value: 'rating' }, 'Highest Rated')
        )
      )
    ),
    // Category Tabs
    h(
      'div',
      { className: 'category-pills', role: 'tablist', 'aria-label': 'Bike categories' },
      categories.map(cat =>
        h(
          'button',
          {
            key: cat.id,
            type: 'button',
            className: `category-pill${activeCategory === cat.id ? ' is-active' : ''}`,
            onClick: () => setActiveCategory(cat.id),
            role: 'tab',
            'aria-selected': activeCategory === cat.id
          },
          cat.label,
          h('span', { className: 'cat-count' }, cat.count)
        )
      )
    ),
    // Active city indicator
    cityFilter
      ? h(
          'div',
          { className: 'active-city-filter-bar' },
          h('span', null, h('i', { className: 'fa-solid fa-location-dot' }), ` Filtering for: ${cityFilter.toUpperCase()}`),
          h(
            'button',
            {
              type: 'button',
              onClick: () => {
                setCityFilter('');
                window.dispatchEvent(new CustomEvent('rydo:search-filter', { detail: { city: '' } }));
                ToastService.show('Filter cleared. Showing all cities.');
              },
              className: 'clear-city-btn'
            },
            'Show all cities ×'
          )
        )
      : null,
    // Bike Grid
    filteredBikes.length > 0
      ? h(
          'div',
          { className: 'fleet-grid' },
          filteredBikes.map(bike => {
            const isFav = favorites.includes(bike.id);
            const isCompared = compareIds.includes(bike.id);
            return h(
              'div',
              { key: bike.id, className: 'bike-card' },
              h('span', { className: 'bike-tag' }, bike.tag),
              h(
                'button',
                {
                  type: 'button',
                  className: `wishlist-btn${isFav ? ' is-fav' : ''}`,
                  onClick: e => toggleFavoriteBike(bike.id, e),
                  title: isFav ? 'Remove from favorites' : 'Add to favorites'
                },
                h('i', { className: `fa-${isFav ? 'solid' : 'regular'} fa-heart` })
              ),
              h('img', {
                src: bike.image,
                alt: bike.name,
                className: 'bike-image',
                loading: 'lazy'
              }),
              h(
                'div',
                { className: 'bike-details' },
                h(
                  'div',
                  { className: 'bike-header-row' },
                  h('h3', { className: 'bike-title' }, bike.name),
                  h(
                    'div',
                    { className: 'bike-rating-badge' },
                    h('i', { className: 'fa-solid fa-star' }),
                    ` ${bike.rating}`
                  )
                ),
                h(
                  'div',
                  { className: 'bike-specs' },
                  h('span', null, h('i', { className: 'fa-solid fa-gauge-high' }), ` ${bike.cc}`),
                  h('span', null, h('i', { className: 'fa-solid fa-gas-pump' }), ` ${bike.mileage}`),
                  h('span', null, h('i', { className: 'fa-solid fa-gears' }), ` ${bike.transmission}`)
                ),
                h(
                  'div',
                  { className: 'compare-quick-toggle' },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: `btn-compare-pill${isCompared ? ' is-compared' : ''}`,
                      onClick: e => toggleCompareBike(bike.id, e)
                    },
                    h('i', { className: `fa-solid ${isCompared ? 'fa-check' : 'fa-scale-balanced'}` }),
                    isCompared ? ' In Comparison' : ' Compare'
                  ),
                  h(
                    'span',
                    { className: 'live-avail-pulse' },
                    h('span', { className: 'pulse-dot' }),
                    ' Instant Key Handover'
                  )
                ),
                h(
                  'div',
                  { className: 'price-row' },
                  h(
                    'div',
                    { className: 'price-box' },
                    h('span', { className: 'amount' }, `₹${bike.price}`),
                    h('span', { className: 'unit' }, 'per day · 0 deposit')
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'btn-secondary book-trigger-btn',
                      onClick: () => setBookingBike(bike)
                    },
                    'Book Now'
                  )
                )
              )
            );
          })
        )
      : h(
          'div',
          { className: 'fleet-empty-state' },
          h('i', { className: 'fa-solid fa-motorcycle-slash' }),
          h('h3', null, 'No matching motorcycles found'),
          h('p', null, 'Try adjusting your search query, selecting "All Bikes", or removing the city filter.'),
          h(
            'button',
            {
              type: 'button',
              className: 'btn-primary',
              onClick: () => { setSearch(''); setActiveCategory('all'); setCityFilter(''); }
            },
            'Reset Filters'
          )
        ),
    // Floating Compare Dock
    compareIds.length > 0
      ? h(
          'div',
          { className: 'compare-floating-dock' },
          h(
            'div',
            { className: 'dock-content' },
            h('i', { className: 'fa-solid fa-scale-balanced' }),
            h('span', null, `${compareIds.length} Bike${compareIds.length > 1 ? 's' : ''} Selected to Compare`),
            h(
              'button',
              {
                type: 'button',
                className: 'btn-primary compare-now-btn',
                onClick: () => setShowCompareModal(true)
              },
              'Compare Specs Matrix →'
            ),
            h(
              'button',
              {
                type: 'button',
                className: 'clear-compare-btn',
                onClick: () => setCompareIds([])
              },
              'Clear'
            )
          )
        )
      : null,
    // Compare Modal
    showCompareModal
      ? h(BikeCompareModal, {
          bikeIds: compareIds,
          onClose: () => setShowCompareModal(false),
          onBook: bike => {
            setShowCompareModal(false);
            setBookingBike(bike);
          }
        })
      : null,
    // Booking Modal
    bookingBike
      ? h(BookingModal, {
          bike: bookingBike,
          initialCity: cityFilter,
          initialDates: selectedDates,
          onClose: () => setBookingBike(null)
        })
      : null
  );
}

/* ==========================================================================
   7. SIDE-BY-SIDE BIKE COMPARISON MODAL (REACT)
   ========================================================================== */

function BikeCompareModal({ bikeIds, onClose, onBook }) {
  const bikes = useMemo(() => BIKES_DATA.filter(b => bikeIds.includes(b.id)), [bikeIds]);

  return h(
    'div',
    { className: 'modal-backdrop', onClick: onClose },
    h(
      'div',
      { className: 'modal-dialog compare-modal-dialog', onClick: e => e.stopPropagation() },
      h(
        'button',
        { type: 'button', className: 'modal-close-btn', onClick: onClose },
        h('i', { className: 'fa-solid fa-xmark' })
      ),
      h(
        'div',
        { className: 'modal-header' },
        h('div', { className: 'modal-badge' }, 'SPECIFICATION MATRIX'),
        h('h2', null, 'Compare Motorcycles'),
        h('p', null, 'Side-by-side performance, mileage, and tariff comparison')
      ),
      h(
        'div',
        { className: 'compare-table-wrapper' },
        h(
          'table',
          { className: 'compare-table' },
          h(
            'thead',
            null,
            h(
              'tr',
              null,
              h('th', null, 'Specification'),
              bikes.map(b =>
                h(
                  'th',
                  { key: b.id },
                  h('img', { src: b.image, alt: b.name, className: 'compare-th-img' }),
                  h('div', { className: 'compare-th-title' }, b.name),
                  h('div', { className: 'compare-th-price' }, `₹${b.price}/day`)
                )
              )
            )
          ),
          h(
            'tbody',
            null,
            h(
              'tr',
              null,
              h('td', null, 'Displacement'),
              bikes.map(b => h('td', { key: b.id }, b.cc))
            ),
            h(
              'tr',
              null,
              h('td', null, 'Peak Power'),
              bikes.map(b => h('td', { key: b.id }, b.power || '18 bhp'))
            ),
            h(
              'tr',
              null,
              h('td', null, 'Peak Torque'),
              bikes.map(b => h('td', { key: b.id }, b.torque || '20 Nm'))
            ),
            h(
              'tr',
              null,
              h('td', null, 'Fuel Mileage / Range'),
              bikes.map(b => h('td', { key: b.id }, b.mileage))
            ),
            h(
              'tr',
              null,
              h('td', null, 'Top Speed'),
              bikes.map(b => h('td', { key: b.id }, b.topSpeed || '120 km/h'))
            ),
            h(
              'tr',
              null,
              h('td', null, 'Transmission'),
              bikes.map(b => h('td', { key: b.id }, b.transmission))
            ),
            h(
              'tr',
              null,
              h('td', null, 'Rider Rating'),
              bikes.map(b => h('td', { key: b.id }, `★ ${b.rating} (${b.reviews})`))
            ),
            h(
              'tr',
              null,
              h('td', null, 'Action'),
              bikes.map(b =>
                h(
                  'td',
                  { key: b.id },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'btn-primary compare-book-btn',
                      onClick: () => onBook(b)
                    },
                    'Reserve'
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}

/* ==========================================================================
   8. INTERACTIVE BOOKING MODAL & INVOICE PRINTING (REACT)
   ========================================================================== */

function BookingModal({ bike, initialCity, initialDates, onClose }) {
  const today = getLocalDateString(new Date());
  const tomorrow = getLocalDateString(new Date(Date.now() + 86400000));

  const [city, setCity] = useState(initialCity || 'bengaluru');
  const [pickup, setPickup] = useState(initialDates ? initialDates.pickup : today);
  const [dropoff, setDropoff] = useState(initialDates ? initialDates.dropoff : tomorrow);
  const [addons, setAddons] = useState({ helmet: true, insurance: true, jacket: false });
  const [coupon, setCoupon] = useState('');
  const [appliedDeal, setAppliedDeal] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

  const days = useMemo(() => calculateDaysDifference(pickup, dropoff), [pickup, dropoff]);

  const baseCost = bike.price * days;
  const addonInsuranceCost = addons.insurance ? 149 * days : 0;
  const addonJacketCost = addons.jacket ? 99 * days : 0;
  const addonsTotal = addonInsuranceCost + addonJacketCost;

  const discountAmount = useMemo(() => {
    if (!appliedDeal) return 0;
    if (appliedDeal.discountPercent) {
      return Math.round((baseCost * appliedDeal.discountPercent) / 100);
    }
    if (appliedDeal.fixedDiscount) {
      return Math.min(appliedDeal.fixedDiscount, baseCost);
    }
    return 0;
  }, [appliedDeal, baseCost]);

  const grandTotal = Math.max(0, baseCost + addonsTotal - discountAmount);

  function handleApplyCoupon(e) {
    if (e) e.preventDefault();
    setCouponError('');
    const clean = coupon.trim().toUpperCase();
    if (!clean) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    const found = DEALS_DATA.find(d => d.code === clean);
    if (!found) {
      setCouponError('Invalid coupon code. Try WEEKEND20, ZERODEP, or FIRSTRIDE.');
      return;
    }

    if (found.minDays && days < found.minDays) {
      setCouponError(`This coupon requires a minimum rental of ${found.minDays} days.`);
      return;
    }

    setAppliedDeal(found);
    ToastService.show(`Coupon ${clean} applied successfully!`);
  }

  function handleConfirmBooking(e) {
    e.preventDefault();

    const user = StorageService.getUser();
    const bookingRecord = {
      id: `RYDO-${Math.floor(100000 + Math.random() * 900000)}`,
      bikeId: bike.id,
      bikeName: bike.name,
      bikeImage: bike.image,
      city,
      pickup,
      dropoff,
      days,
      addons,
      discount: discountAmount,
      coupon: appliedDeal ? appliedDeal.code : null,
      total: grandTotal,
      bookedAt: new Date().toISOString(),
      userName: user ? user.name : 'Rydo Explorer',
      userEmail: user ? user.email : 'guest@rydo.in'
    };

    StorageService.addBooking(bookingRecord);
    setConfirmedBooking(bookingRecord);
    setIsSuccess(true);
    ToastService.show(`Reservation confirmed for ${bike.name}!`);
  }

  return h(
    React.Fragment,
    null,
    h(
      'div',
      { className: 'modal-backdrop', onClick: onClose },
      h(
        'div',
        { className: 'modal-dialog booking-modal-dialog', onClick: e => e.stopPropagation() },
        h(
          'button',
          { type: 'button', className: 'modal-close-btn', onClick: onClose },
          h('i', { className: 'fa-solid fa-xmark' })
        ),
        !isSuccess
          ? h(
              'form',
              { onSubmit: handleConfirmBooking },
              h(
                'div',
                { className: 'modal-header' },
                h('div', { className: 'modal-badge' }, 'CONFIRM RESERVATION'),
                h('h2', null, bike.name),
                h('p', null, `Rate: ₹${bike.price}/day · Zero Security Deposit`)
              ),
              h(
                'div',
                { className: 'modal-bike-preview' },
                h('img', { src: bike.image, alt: bike.name, className: 'preview-thumb' }),
                h(
                  'div',
                  { className: 'preview-meta' },
                  h('span', null, h('i', { className: 'fa-solid fa-gauge-high' }), ` ${bike.cc}`),
                  h('span', null, h('i', { className: 'fa-solid fa-gas-pump' }), ` ${bike.mileage}`),
                  h('span', null, h('i', { className: 'fa-solid fa-gears' }), ` ${bike.transmission}`)
                )
              ),
              h(
                'div',
                { className: 'modal-form-grid' },
                h(
                  'div',
                  { className: 'modal-field' },
                  h('label', null, h('i', { className: 'fa-solid fa-location-dot' }), ' Pickup City Hub'),
                  h(
                    'select',
                    { value: city, onChange: e => setCity(e.target.value), required: true },
                    CITIES_DATA.map(c => h('option', { key: c.id, value: c.id }, `${c.name} · ${c.hub.split(',')[0]}`))
                  )
                ),
                h(
                  'div',
                  { className: 'modal-field' },
                  h('label', null, h('i', { className: 'fa-regular fa-calendar-check' }), ' Pickup Date'),
                  h('input', {
                    type: 'date',
                    min: today,
                    value: pickup,
                    onChange: e => setPickup(e.target.value),
                    required: true
                  })
                ),
                h(
                  'div',
                  { className: 'modal-field' },
                  h('label', null, h('i', { className: 'fa-regular fa-calendar-xmark' }), ' Drop-off Date'),
                  h('input', {
                    type: 'date',
                    min: pickup || today,
                    value: dropoff,
                    onChange: e => setDropoff(e.target.value),
                    required: true
                  })
                )
              ),
              // Add-ons
              h(
                'div',
                { className: 'addons-box' },
                h('h4', null, 'Recommended Trip Add-ons'),
                h(
                  'label',
                  { className: 'addon-check-row' },
                  h('input', {
                    type: 'checkbox',
                    checked: addons.helmet,
                    onChange: e => setAddons({ ...addons, helmet: e.target.checked })
                  }),
                  h('span', null, '2x ISI Certified Sanitized Helmets'),
                  h('strong', null, 'FREE')
                ),
                h(
                  'label',
                  { className: 'addon-check-row' },
                  h('input', {
                    type: 'checkbox',
                    checked: addons.insurance,
                    onChange: e => setAddons({ ...addons, insurance: e.target.checked })
                  }),
                  h('span', null, 'Comprehensive Zero-Depreciation Insurance'),
                  h('strong', null, `+₹${149 * days} (₹149/day)`)
                ),
                h(
                  'label',
                  { className: 'addon-check-row' },
                  h('input', {
                    type: 'checkbox',
                    checked: addons.jacket,
                    onChange: e => setAddons({ ...addons, jacket: e.target.checked })
                  }),
                  h('span', null, 'All-Weather Touring Riding Jacket'),
                  h('strong', null, `+₹${99 * days} (₹99/day)`)
                )
              ),
              // Coupon Input
              h(
                'div',
                { className: 'coupon-input-wrapper' },
                h('input', {
                  type: 'text',
                  placeholder: 'Enter promo coupon (e.g. WEEKEND20)',
                  value: coupon,
                  onChange: e => setCoupon(e.target.value.toUpperCase()),
                  className: 'coupon-input'
                }),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'btn-secondary apply-coupon-btn',
                    onClick: handleApplyCoupon
                  },
                  appliedDeal ? 'Applied ✓' : 'Apply'
                )
              ),
              couponError ? h('p', { className: 'coupon-error' }, couponError) : null,
              appliedDeal
                ? h('p', { className: 'coupon-success' }, h('i', { className: 'fa-solid fa-circle-check' }), ` ${appliedDeal.title} applied (-₹${discountAmount})`)
                : null,
              // Cost Breakdown
              h(
                'div',
                { className: 'cost-summary' },
                h('div', { className: 'summary-line' }, h('span', null, `Base Rental (${days} day${days > 1 ? 's' : ''} × ₹${bike.price})`), h('strong', null, `₹${baseCost}`)),
                addonsTotal > 0 ? h('div', { className: 'summary-line' }, h('span', null, 'Trip Add-ons'), h('strong', null, `+₹${addonsTotal}`)) : null,
                discountAmount > 0 ? h('div', { className: 'summary-line discount-line' }, h('span', null, `Promo Discount (${appliedDeal ? appliedDeal.code : ''})`), h('strong', null, `-₹${discountAmount}`)) : null,
                h('div', { className: 'summary-line grand-total' }, h('span', null, 'Total Estimated Amount'), h('strong', null, `₹${grandTotal}`))
              ),
              h(
                'button',
                { type: 'submit', className: 'btn-primary modal-confirm-btn' },
                h('i', { className: 'fa-solid fa-lock' }),
                ' Confirm Reservation'
              )
            )
          : h(
              'div',
              { className: 'booking-success-view' },
              h('div', { className: 'success-icon-circle' }, h('i', { className: 'fa-solid fa-check' })),
              h('h2', null, 'Ride Booked Successfully!'),
              h('p', null, `Your ${confirmedBooking.bikeName} is reserved for pickup in ${confirmedBooking.city.toUpperCase()}.`),
              h(
                'div',
                { className: 'ticket-card' },
                h('div', { className: 'ticket-row' }, h('span', null, 'Booking Reference:'), h('strong', null, confirmedBooking.id)),
                h('div', { className: 'ticket-row' }, h('span', null, 'Dates:'), h('strong', null, `${confirmedBooking.pickup} to ${confirmedBooking.dropoff} (${confirmedBooking.days} days)`)),
                h('div', { className: 'ticket-row' }, h('span', null, 'Total Amount:'), h('strong', null, `₹${confirmedBooking.total}`)),
                h('div', { className: 'ticket-row' }, h('span', null, 'Security Deposit:'), h('strong', { style: { color: '#22c55e' } }, '₹0 (Zero Deposit)'))
              ),
              h(
                'div',
                { className: 'success-actions-row' },
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'btn-secondary print-invoice-btn',
                    onClick: () => setShowInvoice(true)
                  },
                  h('i', { className: 'fa-solid fa-print' }),
                  ' Print Tax Invoice'
                ),
                h(
                  'button',
                  { type: 'button', className: 'btn-primary', onClick: onClose },
                  'Done & Return'
                )
              )
            )
      )
    ),
    showInvoice && confirmedBooking ? h(InvoiceModal, { booking: confirmedBooking, onClose: () => setShowInvoice(false) }) : null
  );
}

/* ==========================================================================
   9. FORMAL TAX INVOICE MODAL WITH PRINT API (REACT)
   ========================================================================== */

function InvoiceModal({ booking, onClose }) {
  function handlePrint() {
    window.print();
  }

  const bike = BIKES_DATA.find(b => b.id === booking.bikeId) || {};
  const gst = Math.round(booking.total * 0.18);
  const netAmount = booking.total - gst;

  return h(
    'div',
    { className: 'modal-backdrop invoice-backdrop', onClick: onClose },
    h(
      'div',
      { className: 'modal-dialog invoice-dialog', onClick: e => e.stopPropagation() },
      h(
        'button',
        { type: 'button', className: 'modal-close-btn no-print', onClick: onClose },
        h('i', { className: 'fa-solid fa-xmark' })
      ),
      h(
        'div',
        { className: 'invoice-print-area', id: 'printable-invoice' },
        h(
          'div',
          { className: 'invoice-header' },
          h(
            'div',
            null,
            h('h1', { className: 'invoice-brand' }, 'RYDO TECHNOLOGIES PVT LTD'),
            h('p', { className: 'invoice-sub' }, 'Self-Drive Two-Wheeler Rental Aggregator'),
            h('p', null, 'GSTIN: 29AABCR1234F1Z8 · PAN: AABCR1234F'),
            h('p', null, 'Indiranagar Hub, 100ft Road, Bengaluru - 560038')
          ),
          h(
            'div',
            { className: 'invoice-meta-right' },
            h('div', { className: 'invoice-badge' }, 'TAX INVOICE'),
            h('p', null, h('strong', null, 'Invoice No: '), `INV-${booking.id}`),
            h('p', null, h('strong', null, 'Date: '), new Date(booking.bookedAt).toLocaleDateString()),
            h('p', null, h('strong', null, 'Place of Supply: '), booking.city.toUpperCase())
          )
        ),
        h('div', { className: 'invoice-divider' }),
        h(
          'div',
          { className: 'invoice-customer-grid' },
          h('div', null, h('span', null, 'Billed To (Rider):'), h('strong', null, booking.userName), h('p', null, booking.userEmail || 'Aadhaar Verified Rider')),
          h('div', null, h('span', null, 'Pickup Station:'), h('strong', null, `${booking.city.toUpperCase()} Central Hub`), h('p', null, 'Operating 7:00 AM - 10:00 PM'))
        ),
        h(
          'table',
          { className: 'invoice-items-table' },
          h(
            'thead',
            null,
            h('tr', null, h('th', null, 'Description'), h('th', null, 'SAC Code'), h('th', null, 'Rate/Day'), h('th', null, 'Duration'), h('th', null, 'Total (INR)'))
          ),
          h(
            'tbody',
            null,
            h('tr', null, h('td', null, `${booking.bikeName} (Self-Drive Rental)`), h('td', null, '997311'), h('td', null, `₹${bike.price || 899}`), h('td', null, `${booking.days} Days`), h('td', null, `₹${(bike.price || 899) * booking.days}`)),
            booking.addons && booking.addons.insurance ? h('tr', null, h('td', null, 'Comprehensive Zero-Depreciation Insurance'), h('td', null, '997133'), h('td', null, '₹149'), h('td', null, `${booking.days} Days`), h('td', null, `₹${149 * booking.days}`)) : null,
            booking.discount > 0 ? h('tr', { style: { color: '#059669' } }, h('td', null, `Promotional Discount Voucher (${booking.coupon})`), h('td', null, '-'), h('td', null, '-'), h('td', null, '-'), h('td', null, `-₹${booking.discount}`)) : null
          )
        ),
        h(
          'div',
          { className: 'invoice-totals-box' },
          h('div', { className: 'totals-row' }, h('span', null, 'Net Taxable Value:'), h('strong', null, `₹${netAmount}`)),
          h('div', { className: 'totals-row' }, h('span', null, 'CGST (9%) + SGST (9%):'), h('strong', null, `₹${gst}`)),
          h('div', { className: 'totals-row total-paid-row' }, h('span', null, 'Grand Total Paid:'), h('strong', null, `₹${booking.total}`))
        ),
        h(
          'div',
          { className: 'invoice-footer-security' },
          h('div', { className: 'qr-placeholder' }, h('i', { className: 'fa-solid fa-qrcode' }), ' RYDO-VERIFIED'),
          h('div', { className: 'terms-note' }, h('p', null, '1. Security Deposit: ₹0 (Zero Deposit Waived against digital KYC).'), h('p', null, '2. 2x ISI Certified helmets provided in sanitized condition.'), h('p', null, '3. Computer-generated tax invoice. No physical signature required.'))
        )
      ),
      h(
        'div',
        { className: 'invoice-modal-actions no-print' },
        h('button', { type: 'button', className: 'btn-primary', onClick: handlePrint }, h('i', { className: 'fa-solid fa-print' }), ' Print / Save PDF'),
        h('button', { type: 'button', className: 'btn-secondary', onClick: onClose }, 'Close')
      )
    )
  );
}

/* ==========================================================================
   10. MY BOOKINGS DRAWER / MODAL (REACT)
   ========================================================================== */

function MyBookingsModal({ onClose }) {
  const [bookings, setBookings] = useState(StorageService.getBookings());
  const [selectedInvoiceBooking, setSelectedInvoiceBooking] = useState(null);

  function handleCancel(id) {
    if (window.confirm('Are you sure you want to cancel this reservation? Full refund applies.')) {
      const updated = StorageService.cancelBooking(id);
      setBookings(updated);
      ToastService.show('Reservation canceled.');
    }
  }

  return h(
    React.Fragment,
    null,
    h(
      'div',
      { className: 'modal-backdrop', onClick: onClose },
      h(
        'div',
        { className: 'modal-dialog my-bookings-dialog', onClick: e => e.stopPropagation() },
        h(
          'button',
          { type: 'button', className: 'modal-close-btn', onClick: onClose },
          h('i', { className: 'fa-solid fa-xmark' })
        ),
        h(
          'div',
          { className: 'modal-header' },
          h('div', { className: 'modal-badge' }, 'RESERVATIONS'),
          h('h2', null, 'My Rydo Rides'),
          h('p', null, 'Manage active bike rentals and access digital invoices.')
        ),
        bookings.length > 0
          ? h(
              'div',
              { className: 'bookings-list' },
              bookings.map(b =>
                h(
                  'div',
                  { key: b.id, className: 'booking-item-card' },
                  h('img', { src: b.bikeImage, alt: b.bikeName, className: 'booking-item-thumb' }),
                  h(
                    'div',
                    { className: 'booking-item-info' },
                    h('div', { className: 'booking-id-tag' }, h('span', null, b.id), h('span', { className: 'city-tag' }, b.city.toUpperCase())),
                    h('h3', null, b.bikeName),
                    h('p', null, h('i', { className: 'fa-regular fa-calendar' }), ` ${b.pickup} → ${b.dropoff} (${b.days} day${b.days > 1 ? 's' : ''})`),
                    h('div', { className: 'booking-total-row' }, h('span', null, 'Total Paid: '), h('strong', null, `₹${b.total}`))
                  ),
                  h(
                    'div',
                    { className: 'booking-item-actions' },
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'btn-item-invoice',
                        onClick: () => setSelectedInvoiceBooking(b),
                        title: 'View / Print Tax Invoice'
                      },
                      h('i', { className: 'fa-solid fa-receipt' })
                    ),
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'cancel-booking-btn',
                        onClick: () => handleCancel(b.id),
                        title: 'Cancel Reservation'
                      },
                      h('i', { className: 'fa-solid fa-trash-can' })
                    )
                  )
                )
              )
            )
          : h(
              'div',
              { className: 'bookings-empty-state' },
              h('i', { className: 'fa-solid fa-calendar-xmark' }),
              h('h3', null, 'No Rides Booked Yet'),
              h('p', null, 'Choose any bike from our fleet and reserve your ride with zero security deposit.'),
              h('a', { href: 'home.html#bikes', className: 'btn-primary', onClick: onClose, style: { display: 'inline-block', marginTop: '14px' } }, 'Browse Fleet')
            )
      )
    ),
    selectedInvoiceBooking ? h(InvoiceModal, { booking: selectedInvoiceBooking, onClose: () => setSelectedInvoiceBooking(null) }) : null
  );
}

/* ==========================================================================
   11. TRIP COST & FUEL SAVINGS CALCULATOR (REACT)
   ========================================================================== */

function FuelEstimator() {
  const [distance, setDistance] = useState(200);
  const [bikeId, setBikeId] = useState('re-classic-350');
  const fuelRate = 102; // INR per liter

  const selectedBike = useMemo(() => BIKES_DATA.find(b => b.id === bikeId) || BIKES_DATA[0], [bikeId]);

  // Fuel calculation
  const isElectric = selectedBike.category === 'electric';
  const litersNeeded = isElectric ? 0 : Math.round((distance / selectedBike.mileageNum) * 10) / 10;
  const fuelCost = isElectric ? Math.round(distance * 0.4) : Math.round(litersNeeded * fuelRate);
  const rentalDays = Math.ceil(distance / 250) || 1;
  const rentalCost = selectedBike.price * rentalDays;
  const totalRydoTrip = fuelCost + rentalCost;

  // Cab/Taxi comparison (standard ₹22/km)
  const taxiCost = distance * 22;
  const savings = Math.max(0, taxiCost - totalRydoTrip);

  return h(
    'section',
    { className: 'section fuel-calculator-section', id: 'fuel-calculator' },
    h(
      'div',
      { className: 'section-header', style: { textAlign: 'center', justifyContent: 'center' } },
      h(
        'div',
        null,
        h('div', { className: 'badge-pill', style: { margin: '0 auto 12px' } }, h('i', { className: 'fa-solid fa-calculator' }), ' TRIP ECONOMY ENGINE'),
        h('h2', null, 'Calculate Trip Cost & Savings'),
        h('p', null, 'Compare self-drive motorcycle rentals against cab and taxi fares across India.')
      )
    ),
    h(
      'div',
      { className: 'calculator-container' },
      h(
        'div',
        { className: 'calculator-inputs-card' },
        h(
          'div',
          { className: 'calc-field' },
          h('div', { className: 'calc-field-header' }, h('label', null, h('i', { className: 'fa-solid fa-road' }), ' Planned Trip Distance:'), h('strong', null, `${distance} km`)),
          h('input', {
            type: 'range',
            min: 20,
            max: 1000,
            step: 10,
            value: distance,
            onChange: e => setDistance(Number(e.target.value)),
            className: 'distance-range'
          })
        ),
        h(
          'div',
          { className: 'calc-field' },
          h('label', null, h('i', { className: 'fa-solid fa-motorcycle' }), ' Select Motorcycle:'),
          h(
            'select',
            { value: bikeId, onChange: e => setBikeId(e.target.value), className: 'calc-select' },
            BIKES_DATA.map(b => h('option', { key: b.id, value: b.id }, `${b.name} (${b.mileage}) - ₹${b.price}/day`))
          )
        ),
        h(
          'div',
          { className: 'calc-bike-specs-strip' },
          h('span', null, h('i', { className: 'fa-solid fa-gauge' }), ` ${selectedBike.cc}`),
          h('span', null, h('i', { className: 'fa-solid fa-gas-pump' }), ` ${selectedBike.mileage}`),
          h('span', null, h('i', { className: 'fa-solid fa-clock' }), ` Est. ${rentalDays} Day${rentalDays > 1 ? 's' : ''}`)
        )
      ),
      h(
        'div',
        { className: 'calculator-results-card' },
        h(
          'div',
          { className: 'cost-comparison-row' },
          h(
            'div',
            { className: 'cost-box rydo-cost' },
            h('span', null, 'Rydo Bike + Fuel'),
            h('h3', null, `₹${totalRydoTrip}`),
            h('small', null, `Rent ₹${rentalCost} + Fuel ₹${fuelCost}`)
          ),
          h(
            'div',
            { className: 'cost-box cab-cost' },
            h('span', null, 'Standard Outstation Cab'),
            h('h3', null, `₹${taxiCost}`),
            h('small', null, '₹22/km taxi rate')
          )
        ),
        h(
          'div',
          { className: 'savings-highlight-badge' },
          h('i', { className: 'fa-solid fa-piggy-bank' }),
          h('span', null, `You Save Flat ₹${savings} with Rydo!`)
        ),
        h(
          'a',
          {
            href: '#bikes',
            className: 'btn-primary calc-book-now-btn',
            onClick: () => {
              window.dispatchEvent(new CustomEvent('rydo:search-filter', { detail: { search: selectedBike.name } }));
            }
          },
          `Book ${selectedBike.name} Now `,
          h('i', { className: 'fa-solid fa-arrow-right' })
        )
      )
    )
  );
}

/* ==========================================================================
   12. VERIFIED CUSTOMER REVIEWS & RATING SUBMISSION (REACT)
   ========================================================================== */

function ReviewsSection() {
  const [reviews, setReviews] = useState(StorageService.getReviews());
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  useEffect(() => {
    function onReviewsChange(e) {
      setReviews(e.detail);
    }
    window.addEventListener('rydo:reviews-change', onReviewsChange);
    return () => window.removeEventListener('rydo:reviews-change', onReviewsChange);
  }, []);

  return h(
    'section',
    { className: 'section reviews-section', id: 'reviews' },
    h(
      'div',
      { className: 'section-header' },
      h(
        'div',
        null,
        h('div', { className: 'badge-pill' }, h('i', { className: 'fa-solid fa-star' }), ' VERIFIED EXPERIENCES'),
        h('h2', null, 'Loved by 50,000+ Indian Bikers'),
        h('p', null, 'Read genuine feedback from riders across Bengaluru, Goa, Ladakh, and Mumbai.')
      ),
      h(
        'button',
        {
          type: 'button',
          className: 'btn-secondary',
          onClick: () => setShowAddReviewModal(true)
        },
        h('i', { className: 'fa-solid fa-pen-to-square' }),
        ' Write a Review'
      )
    ),
    h(
      'div',
      { className: 'reviews-grid' },
      reviews.map(r =>
        h(
          'div',
          { key: r.id, className: 'review-card' },
          h(
            'div',
            { className: 'review-stars' },
            Array.from({ length: r.rating }).map((_, i) => h('i', { key: i, className: 'fa-solid fa-star' }))
          ),
          h('p', { className: 'review-comment' }, `"${r.comment}"`),
          h(
            'div',
            { className: 'review-author-row' },
            h('div', { className: 'review-author-avatar' }, r.name.charAt(0)),
            h(
              'div',
              null,
              h('h4', { className: 'author-name' }, r.name),
              h('span', { className: 'author-bike' }, `${r.bike} · ${r.city}`)
            ),
            h('span', { className: 'verified-check', title: 'Verified Rental' }, h('i', { className: 'fa-solid fa-circle-check' }))
          )
        )
      )
    ),
    showAddReviewModal ? h(AddReviewModal, { onClose: () => setShowAddReviewModal(false) }) : null
  );
}

function AddReviewModal({ onClose }) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [bike, setBike] = useState(BIKES_DATA[0].name);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      ToastService.show('Please fill in your name and review comment.', 'error');
      return;
    }

    const reviewObj = {
      id: Date.now(),
      name: name.trim(),
      city,
      bike,
      rating,
      date: 'Just now',
      comment: comment.trim()
    };

    StorageService.addReview(reviewObj);
    ToastService.show('Review submitted! Thank you for your feedback.');
    onClose();
  }

  return h(
    'div',
    { className: 'modal-backdrop', onClick: onClose },
    h(
      'div',
      { className: 'modal-dialog', onClick: e => e.stopPropagation() },
      h(
        'button',
        { type: 'button', className: 'modal-close-btn', onClick: onClose },
        h('i', { className: 'fa-solid fa-xmark' })
      ),
      h(
        'div',
        { className: 'modal-header' },
        h('div', { className: 'modal-badge' }, 'RIDER FEEDBACK'),
        h('h2', null, 'Share Your Rydo Experience'),
        h('p', null, 'Help other riders pick the best ride for their adventures.')
      ),
      h(
        'form',
        { onSubmit: handleSubmit },
        h(
          'div',
          { className: 'modal-field', style: { marginBottom: '14px' } },
          h('label', null, 'Your Full Name'),
          h('input', { type: 'text', placeholder: 'e.g. Vikram Seth', value: name, onChange: e => setName(e.target.value), required: true })
        ),
        h(
          'div',
          { className: 'modal-form-grid', style: { marginBottom: '14px' } },
          h(
            'div',
            { className: 'modal-field' },
            h('label', null, 'Pickup Hub City'),
            h('select', { value: city, onChange: e => setCity(e.target.value) }, CITIES_DATA.map(c => h('option', { key: c.id, value: c.name }, c.name)))
          ),
          h(
            'div',
            { className: 'modal-field' },
            h('label', null, 'Motorcycle Rented'),
            h('select', { value: bike, onChange: e => setBike(e.target.value) }, BIKES_DATA.map(b => h('option', { key: b.id, value: b.name }, b.name)))
          )
        ),
        h(
          'div',
          { className: 'modal-field', style: { marginBottom: '14px' } },
          h('label', null, 'Your Rating'),
          h(
            'div',
            { className: 'star-picker' },
            [1, 2, 3, 4, 5].map(star =>
              h(
                'button',
                {
                  key: star,
                  type: 'button',
                  className: `star-btn${rating >= star ? ' is-lit' : ''}`,
                  onClick: () => setRating(star)
                },
                h('i', { className: 'fa-solid fa-star' })
              )
            )
          )
        ),
        h(
          'div',
          { className: 'modal-field', style: { marginBottom: '20px' } },
          h('label', null, 'Your Review Comments'),
          h('textarea', {
            rows: 3,
            placeholder: 'How was vehicle performance, pickup experience, and helmet sanitation?',
            value: comment,
            onChange: e => setComment(e.target.value),
            className: 'review-textarea',
            required: true
          })
        ),
        h('button', { type: 'submit', className: 'btn-primary', style: { width: '100%' } }, 'Submit Review')
      )
    )
  );
}

/* ==========================================================================
   13. RYDOASSISTANT - LIVE AI SUPPORT CHATBOT (REACT)
   ========================================================================== */

function RydoAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Namaste! I am your Rydo Ride Assistant. How can I help your two-wheeler adventure today?'
    }
  ]);

  const FAQS = [
    { q: 'Required documents?', a: 'You need an original 2-Wheeler Driving License and Aadhaar / Passport for quick digital KYC at pickup.' },
    { q: 'Zero deposit policy?', a: 'Zero security deposit applies to all Aadhaar-verified riders. Complete instant KYC in 60 seconds with 0 deposit.' },
    { q: 'Are helmets included?', a: 'Yes! Two sanitized, ISI-certified helmets are complimentary with every motorcycle and scooter rental.' },
    { q: 'Fuel policy?', a: 'We provide enough fuel to reach the nearest pump. Please return the bike at the same fuel level you received it.' },
    { q: 'Interstate touring?', a: 'Yes! All Rydo bikes come with all-India permits. 24/7 roadside assistance is active nationwide.' }
  ];

  function handleSend(textToSend) {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Automated smart response
    setTimeout(() => {
      let reply = 'Thank you for your inquiry! Our customer support hub is available 24/7. You can also call our toll-free hotline at 1800-RYDO-BIKE.';
      const lower = query.toLowerCase();

      if (lower.includes('document') || lower.includes('license') || lower.includes('aadhaar')) {
        reply = 'For vehicle pickup, please bring: 1) Original Valid Driving License, and 2) Aadhaar card / Passport. Digital copies on DigiLocker are also accepted!';
      } else if (lower.includes('deposit') || lower.includes('money') || lower.includes('security')) {
        reply = 'Rydo offers 100% Zero Security Deposit on all bikes for verified riders. Complete digital Aadhaar KYC and ride away without locking any deposit funds!';
      } else if (lower.includes('helmet') || lower.includes('safety') || lower.includes('gear')) {
        reply = 'Safety first! We provide 2 ISI-certified helmets with every rental at no additional charge. Sanitized rain jackets and gloves are also available as add-ons.';
      } else if (lower.includes('fuel') || lower.includes('petrol')) {
        reply = 'We deliver bikes with adequate fuel to reach the nearest petrol bunk. Please return the bike with equivalent fuel level to avoid refueling fees.';
      } else if (lower.includes('cancel') || lower.includes('refund')) {
        reply = 'Free cancellation up to 6 hours before scheduled pickup time! Full refund will be automatically processed to your original payment mode.';
      } else if (lower.includes('city') || lower.includes('goa') || lower.includes('bengaluru') || lower.includes('leh')) {
        reply = 'We operate primary pickup hubs across Bengaluru, Goa, New Delhi, Mumbai, and Leh-Ladakh with 24/7 roadside assistance across all routes!';
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }]);
    }, 600);
  }

  return h(
    'div',
    { className: 'chatbot-wrapper' },
    !isOpen
      ? h(
          'button',
          {
            type: 'button',
            className: 'chat-floating-trigger',
            onClick: () => setIsOpen(true),
            'aria-label': 'Open Rydo Support Chat'
          },
          h('i', { className: 'fa-solid fa-headset' }),
          h('span', { className: 'chat-trigger-text' }, 'Need Help? Chat with us')
        )
      : h(
          'div',
          { className: 'chat-window' },
          h(
            'div',
            { className: 'chat-header' },
            h(
              'div',
              { className: 'chat-header-title' },
              h('span', { className: 'chat-bot-avatar' }, h('i', { className: 'fa-solid fa-motorcycle' })),
              h('div', null, h('strong', null, 'Rydo Assistant'), h('p', null, '● Online · Instant Replies'))
            ),
            h(
              'button',
              {
                type: 'button',
                className: 'chat-close-btn',
                onClick: () => setIsOpen(false)
              },
              h('i', { className: 'fa-solid fa-xmark' })
            )
          ),
          h(
            'div',
            { className: 'chat-messages' },
            messages.map(m =>
              h(
                'div',
                { key: m.id, className: `chat-bubble chat-bubble-${m.sender}` },
                m.text
              )
            ),
            h(
              'div',
              { className: 'chat-quick-faqs' },
              h('p', null, 'Quick Questions:'),
              FAQS.map((faq, i) =>
                h(
                  'button',
                  {
                    key: i,
                    type: 'button',
                    className: 'faq-chip',
                    onClick: () => handleSend(faq.q)
                  },
                  faq.q
                )
              )
            )
          ),
          h(
            'form',
            {
              className: 'chat-input-row',
              onSubmit: e => {
                e.preventDefault();
                handleSend();
              }
            },
            h('input', {
              type: 'text',
              placeholder: 'Ask about KYC, deposit, fuel...',
              value: input,
              onChange: e => setInput(e.target.value),
              className: 'chat-input'
            }),
            h(
              'button',
              { type: 'submit', className: 'chat-send-btn', 'aria-label': 'Send' },
              h('i', { className: 'fa-solid fa-paper-plane' })
            )
          )
        )
  );
}

/* ==========================================================================
   14. DEALS HUB COMPONENT (REACT)
   ========================================================================== */

function DealsHub() {
  const [filter, setFilter] = useState('all');
  const [copiedCode, setCopiedCode] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All Deals' },
    { id: 'discounts', label: 'Ride Discounts' },
    { id: 'ev', label: 'EV Offers' },
    { id: 'long-ride', label: 'Touring & Long Rides' }
  ];

  const filteredDeals = useMemo(() => {
    if (filter === 'all') return DEALS_DATA;
    return DEALS_DATA.filter(d => d.category === filter);
  }, [filter]);

  function copyPromo(code) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        setCopiedCode(code);
        ToastService.show(`Coupon code ${code} copied to clipboard!`);
        setTimeout(() => setCopiedCode(''), 3000);
      });
    } else {
      setCopiedCode(code);
      ToastService.show(`Coupon code: ${code}`);
    }
  }

  return h(
    'div',
    { className: 'deals-container' },
    h(
      'header',
      { className: 'page-heading' },
      h('div', { className: 'eyebrow' }, 'Ride more. Spend less.'),
      h('h1', null, 'Exclusive Deals for Your Next Journey'),
      h('p', null, 'Save on weekend escapes and explore India with verified promotional discounts.')
    ),
    h(
      'div',
      { className: 'category-pills', role: 'tablist' },
      filterTabs.map(tab =>
        h(
          'button',
          {
            key: tab.id,
            type: 'button',
            className: `category-pill${filter === tab.id ? ' is-active' : ''}`,
            onClick: () => setFilter(tab.id)
          },
          tab.label
        )
      )
    ),
    h(
      'div',
      { className: 'deal-grid', 'aria-label': 'Available deals' },
      filteredDeals.map(deal =>
        h(
          'article',
          {
            key: deal.code,
            className: 'deal-card',
            style: { background: deal.color }
          },
          h(
            'div',
            null,
            h('div', { className: 'deal-icon' }, h('i', { className: `fa-solid ${deal.icon}` })),
            h('h2', null, deal.title),
            h('p', null, deal.desc)
          ),
          h(
            'div',
            { className: 'deal-footer' },
            h(
              'button',
              {
                type: 'button',
                className: 'coupon-copy-btn',
                onClick: () => copyPromo(deal.code),
                title: 'Click to copy coupon code'
              },
              h('i', { className: `fa-solid ${copiedCode === deal.code ? 'fa-check' : 'fa-copy'}` }),
              ' ',
              deal.code,
              copiedCode === deal.code ? ' (Copied!)' : ''
            ),
            h(
              'a',
              { className: 'claim', href: `home.html#bikes` },
              'Book Now ',
              h('i', { className: 'fa-solid fa-arrow-right' })
            )
          )
        )
      )
    )
  );
}

/* ==========================================================================
   15. CITIES HUB WITH URL QUERY PARSING (REACT)
   ========================================================================== */

function CitiesHub() {
  const urlCity = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('city') || 'all';
  }, []);

  const [selectedCity, setSelectedCity] = useState(urlCity);

  const activeCities = useMemo(() => {
    if (selectedCity === 'all') return CITIES_DATA;
    return CITIES_DATA.filter(c => c.id === selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    function onPop() {
      const params = new URLSearchParams(window.location.search);
      setSelectedCity(params.get('city') || 'all');
    }
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  function handleCitySelect(cityId) {
    setSelectedCity(cityId);
    const newUrl = (!cityId || cityId === 'all') ? 'cities.html' : `cities.html?city=${cityId}`;
    window.history.pushState({}, '', newUrl);
  }

  return h(
    'div',
    { className: 'cities-container' },
    h(
      'header',
      { className: 'page-heading' },
      h('div', { className: 'eyebrow' }, 'PAN-INDIA EXPEDITIONS'),
      h('h1', null, 'Find Your Starting Point'),
      h('p', null, 'Pick up your bike from one of our primary locations and make every Indian route yours.')
    ),
    h(
      'div',
      { className: 'category-pills', role: 'tablist' },
      h(
        'button',
        {
          type: 'button',
          className: `category-pill${(!selectedCity || selectedCity === 'all') ? ' is-active' : ''}`,
          onClick: () => handleCitySelect('all')
        },
        h('i', { className: 'fa-solid fa-earth-asia', style: { marginRight: '6px' } }),
        'All Cities'
      ),
      CITIES_DATA.map(c =>
        h(
          'button',
          {
            key: c.id,
            type: 'button',
            className: `category-pill${selectedCity === c.id ? ' is-active' : ''}`,
            onClick: () => handleCitySelect(c.id)
          },
          c.name
        )
      )
    ),
    h(
      'div',
      { className: 'city-grid', 'aria-label': 'City pickup locations' },
      activeCities.map(city =>
        h(
          'article',
          { key: city.id, className: 'city-card expanded' },
          h(
            'div',
            { className: 'city-card-header' },
            h('div', { className: 'city-icon' }, h('i', { className: `fa-solid ${city.icon}` })),
            city.popularBadge ? h('span', { className: 'city-popular-badge' }, city.popularBadge) : null
          ),
          h('h2', null, city.name),
          h('p', { className: 'city-hub-address' }, h('i', { className: 'fa-solid fa-map-pin' }), ` ${city.hub}`),
          h('p', { className: 'city-tagline' }, city.tagline),
          h(
            'div',
            { className: 'city-details-box' },
            h('div', null, h('span', null, 'Fleet Size:'), h('strong', null, `${city.bikesCount} Bikes`)),
            h('div', null, h('span', null, 'Operating Hours:'), h('strong', null, city.hours))
          ),
          h(
            'div',
            { className: 'city-route-box' },
            h('span', { className: 'route-label' }, h('i', { className: 'fa-solid fa-route' }), ' Recommended Route:'),
            h('p', null, city.scenicRoute)
          ),
          h(
            'a',
            {
              className: 'city-book-link btn-secondary',
              href: `home.html#bikes`,
              onClick: () => {
                setTimeout(() => {
                  window.dispatchEvent(new CustomEvent('rydo:search-filter', { detail: { city: city.id } }));
                }, 200);
              }
            },
            `View Bikes in ${city.name} `,
            h('i', { className: 'fa-solid fa-arrow-right' })
          )
        )
      )
    )
  );
}

/* ==========================================================================
   16-A. PAN-INDIA LIVE STATION TELEMETRY RADAR (REACT + JAVASCRIPT)
   ========================================================================== */

const STATIONS_DATA = [
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    icon: 'fa-location-dot',
    hubName: 'Indiranagar Hub — 100ft Road',
    address: '14, Defence Colony Main Rd, Indiranagar, Bengaluru 560038',
    coords: '12.9784° N, 77.6408° E',
    phone: '+91 98450 12345',
    status: 'Fully Operational',
    bikes: 45,
    available: 32,
    weatherIcon: 'fa-cloud-sun',
    weatherLabel: '26°C Partly Cloudy',
    openHours: '7:00 AM – 10:00 PM',
    avgRating: 4.9,
    scenic: 'Nandi Hills Sunrise & Kanakapura Countryside',
    categories: { cruiser: 12, sports: 10, adventure: 8, electric: 7, commuter: 8 }
  },
  {
    id: 'goa',
    name: 'Goa',
    icon: 'fa-umbrella-beach',
    hubName: 'Calangute Circle Hub & Dabolim Airport Hub',
    address: 'Holiday Street, Calangute, North Goa 403516',
    coords: '15.5440° N, 73.7521° E',
    phone: '+91 98220 67890',
    status: 'Fully Operational',
    bikes: 60,
    available: 48,
    weatherIcon: 'fa-sun',
    weatherLabel: '30°C Sunny',
    openHours: '6:30 AM – 11:30 PM',
    avgRating: 4.8,
    scenic: 'North-South Coastal Highway & Chorla Ghats',
    categories: { cruiser: 18, sports: 14, adventure: 10, electric: 9, commuter: 9 }
  },
  {
    id: 'delhi',
    name: 'New Delhi',
    icon: 'fa-landmark',
    hubName: 'Connaught Place Inner Circle & Aerocity',
    address: 'N-17, Connaught Place, New Delhi 110001',
    coords: '28.6315° N, 77.2167° E',
    phone: '+91 99100 34567',
    status: 'Fully Operational',
    bikes: 38,
    available: 24,
    weatherIcon: 'fa-smog',
    weatherLabel: '22°C Hazy',
    openHours: '8:00 AM – 9:00 PM',
    avgRating: 4.7,
    scenic: 'Yamuna Expressway to Agra & Murthal Night Ride',
    categories: { cruiser: 10, sports: 8, adventure: 6, electric: 8, commuter: 6 }
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    icon: 'fa-city',
    hubName: 'Andheri West Link Road & Bandra Reclamation',
    address: '52 Versova Link Road, Andheri West, Mumbai 400058',
    coords: '19.1196° N, 72.8468° E',
    phone: '+91 98200 11223',
    status: 'Fully Operational',
    bikes: 40,
    available: 28,
    weatherIcon: 'fa-cloud-rain',
    weatherLabel: '28°C Humid',
    openHours: '7:30 AM – 10:00 PM',
    avgRating: 4.7,
    scenic: 'Mumbai-Lonavala Old Highway & Marine Drive Night Run',
    categories: { cruiser: 12, sports: 8, adventure: 6, electric: 10, commuter: 4 }
  },
  {
    id: 'leh',
    name: 'Leh-Ladakh',
    icon: 'fa-mountain-sun',
    hubName: 'Main Bazaar Hub & Leh Airport Road',
    address: 'Fort Road, Leh, Ladakh 194101',
    coords: '34.1526° N, 77.5771° E',
    phone: '+91 94190 55678',
    status: 'Seasonal (Apr–Oct)',
    bikes: 30,
    available: 22,
    weatherIcon: 'fa-temperature-low',
    weatherLabel: '8°C Clear & Cold',
    openHours: '6:00 AM – 8:00 PM',
    avgRating: 4.9,
    scenic: 'Khardung La Pass, Nubra Valley & Pangong Lake',
    categories: { cruiser: 8, sports: 4, adventure: 14, electric: 0, commuter: 4 }
  }
];

function StationRadarHub() {
  const [activeId, setActiveId] = useState('bengaluru');
  const station = STATIONS_DATA.find(s => s.id === activeId) || STATIONS_DATA[0];
  const availPct = Math.round((station.available / station.bikes) * 100);

  function handleFilterFleet() {
    window.dispatchEvent(new CustomEvent('rydo:search-filter', { detail: { city: activeId } }));
    const fleetEl = document.getElementById('bikes');
    if (fleetEl) fleetEl.scrollIntoView({ behavior: 'smooth' });
    ToastService.show(`Showing bikes available in ${station.name}`);
  }

  return h(
    'section',
    { className: 'station-radar-section section', id: 'station-radar' },
    h(
      'div',
      { className: 'station-radar-wrap' },
      h(
        'div',
        { className: 'section-header', style: { marginBottom: '28px' } },
        h(
          'div',
          null,
          h('div', { className: 'radar-kicker' },
            h('i', { className: 'fa-solid fa-tower-broadcast' }), ' Live Hub Telemetry'
          ),
          h('h2', null, 'Pan-India Station Radar'),
          h('p', null, 'Real-time hub availability, fleet status & weather across all Rydo cities.')
        )
      ),
      h(
        'div',
        { className: 'radar-city-tabs' },
        STATIONS_DATA.map(s =>
          h(
            'button',
            {
              key: s.id,
              type: 'button',
              className: `radar-city-tab${activeId === s.id ? ' is-active' : ''}`,
              onClick: () => setActiveId(s.id)
            },
            h('span', { className: 'tab-pulse-dot' }),
            h('i', { className: `fa-solid ${s.icon}` }),
            s.name,
            h('span', { className: 'tab-bikes-badge' }, s.bikes)
          )
        )
      ),
      h(
        'div',
        { className: 'radar-station-card' },
        h(
          'div',
          { className: 'station-card-header' },
          h(
            'div',
            null,
            h('div', { className: 'station-status-pill' },
              h('i', { className: 'fa-solid fa-circle' }),
              station.status
            ),
            h('div', { className: 'station-hub-name' },
              h('i', { className: `fa-solid ${station.icon}`, style: { marginRight: '10px', color: 'var(--primary)' } }),
              station.hubName
            ),
            h('div', { className: 'station-address' },
              h('i', { className: 'fa-solid fa-map-pin', style: { marginRight: '6px', opacity: 0.6 } }),
              station.address
            )
          ),
          h(
            'div',
            { className: 'station-contact-box' },
            h('div', { className: 'coord-tag' },
              h('i', { className: 'fa-solid fa-crosshairs', style: { marginRight: '4px' } }),
              station.coords
            ),
            h(
              'a',
              { href: `tel:${station.phone}`, className: 'station-phone-link' },
              h('i', { className: 'fa-solid fa-phone' }),
              station.phone
            )
          )
        ),
        h(
          'div',
          { className: 'station-metrics-grid' },
          h('div', { className: 'radar-metric-box' },
            h('span', { className: 'metric-label' }, 'Fleet Available'),
            h('span', { className: 'metric-value' }, `${station.available} / ${station.bikes}`),
            h(
              'div',
              { style: { height: '6px', background: 'rgba(148,163,184,0.15)', borderRadius: '999px', overflow: 'hidden', marginTop: '6px' } },
              h('div', { style: { height: '100%', width: `${availPct}%`, background: availPct > 60 ? '#10b981' : availPct > 30 ? '#f59e0b' : '#ef4444', borderRadius: '999px', transition: 'width 0.4s' } })
            ),
            h('span', { className: 'metric-sub' }, `${availPct}% availability`)
          ),
          h('div', { className: 'radar-metric-box' },
            h('span', { className: 'metric-label' }, 'Weather Now'),
            h('span', { className: 'metric-value weather-val' },
              h('i', { className: `fa-solid ${station.weatherIcon}`, style: { marginRight: '8px' } }),
              station.weatherLabel.split(' ')[0]
            ),
            h('span', { className: 'metric-sub' }, station.weatherLabel.split(' ').slice(1).join(' '))
          ),
          h('div', { className: 'radar-metric-box' },
            h('span', { className: 'metric-label' }, 'Hub Hours'),
            h('span', { className: 'metric-value', style: { fontSize: '16px' } }, station.openHours),
            h('span', { className: 'metric-sub' }, 'Local IST • All days')
          ),
          h('div', { className: 'radar-metric-box' },
            h('span', { className: 'metric-label' }, 'Hub Rating'),
            h('span', { className: 'metric-value' },
              h('i', { className: 'fa-solid fa-star', style: { color: '#f59e0b', marginRight: '6px', fontSize: '18px' } }),
              station.avgRating
            ),
            h('span', { className: 'metric-sub' }, 'Verified rider reviews')
          ),
          h('div', { className: 'radar-metric-box' },
            h('span', { className: 'metric-label' }, 'Scenic Route'),
            h('span', { className: 'metric-value', style: { fontSize: '13px', lineHeight: 1.4 } }, station.scenic)
          ),
          h(
            'div',
            { className: 'radar-metric-box' },
            h('span', { className: 'metric-label' }, 'Fleet Breakdown'),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '6px' } },
              Object.entries(station.categories).map(([cat, cnt]) =>
                cnt > 0 ? h(
                  'div',
                  { key: cat, style: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700 } },
                  h('span', null, cat.charAt(0).toUpperCase() + cat.slice(1)),
                  h('span', { style: { color: 'var(--text-main)' } }, cnt)
                ) : null
              )
            )
          )
        ),
        h(
          'div',
          { className: 'station-card-actions' },
          h(
            'button',
            { type: 'button', className: 'btn-primary radar-filter-btn', onClick: handleFilterFleet },
            h('i', { className: 'fa-solid fa-motorcycle' }),
            `Show Bikes in ${station.name}`
          ),
          h(
            'a',
            { href: `cities.html?city=${activeId}`, className: 'radar-guide-btn' },
            h('i', { className: 'fa-solid fa-map' }),
            'City Ride Guide'
          )
        )
      )
    )
  );
}

/* ==========================================================================
   16-B. INTERACTIVE DIGITAL COCKPIT & ENGINE SIMULATOR (REACT + WEB AUDIO API)
   ========================================================================== */

const COCKPIT_BIKES = [
  { id: 're-classic-350', name: 'RE Classic 350', maxRpm: 6500, topSpeed: 115, power: '20.2 bhp', torque: '27 Nm', cc: '349 cc' },
  { id: 'himalayan-450', name: 'Himalayan 450', maxRpm: 8500, topSpeed: 148, power: '40.2 bhp', torque: '40 Nm', cc: '452 cc' },
  { id: 'duke-390', name: 'KTM Duke 390', maxRpm: 10000, topSpeed: 167, power: '43.5 bhp', torque: '37 Nm', cc: '373 cc' },
  { id: 'cbr650r', name: 'Honda CBR650R', maxRpm: 11000, topSpeed: 210, power: '86 bhp', torque: '63 Nm', cc: '648 cc' }
];

function CockpitSimulator() {
  const [activeBikeId, setActiveBikeId] = useState(COCKPIT_BIKES[0].id);
  const [rpm, setRpm] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [gear, setGear] = useState(0); // 0=N
  const [throttle, setThrottle] = useState(0);
  const [isThrottling, setIsThrottling] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isRedline, setIsRedline] = useState(false);

  const audioCtxRef = React.useRef(null);
  const engineNodesRef = React.useRef({});
  const animFrameRef = React.useRef(null);
  const throttleHeldRef = React.useRef(false);
  const stateRef = React.useRef({ rpm: 0, speed: 0, gear: 0, throttle: 0 });

  const bike = COCKPIT_BIKES.find(b => b.id === activeBikeId) || COCKPIT_BIKES[0];
  const redlineRpm = Math.round(bike.maxRpm * 0.85);

  function getAudioCtx() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  }

  function startEngineSound(targetRpm) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioCtx();
      stopEngineSound();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
      masterGain.connect(ctx.destination);

      const freq = 40 + (targetRpm / bike.maxRpm) * 220;
      const harmonics = [1, 2, 3, 4, 6];
      const oscs = harmonics.map((h_mult, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i === 0 ? 'sawtooth' : 'square';
        osc.frequency.setValueAtTime(freq * h_mult, ctx.currentTime);
        gain.gain.setValueAtTime(0.3 / (i + 1), ctx.currentTime);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        return { osc, gain };
      });

      // Rumble low-freq oscillator
      const rumble = ctx.createOscillator();
      const rumbleGain = ctx.createGain();
      rumble.type = 'triangle';
      rumble.frequency.setValueAtTime(freq * 0.5, ctx.currentTime);
      rumbleGain.gain.setValueAtTime(0.12, ctx.currentTime);
      rumble.connect(rumbleGain);
      rumbleGain.connect(masterGain);
      rumble.start();

      engineNodesRef.current = { masterGain, oscs, rumble, rumbleGain };
    } catch (e) { /* AudioContext not available */ }
  }

  function stopEngineSound() {
    try {
      const nodes = engineNodesRef.current;
      if (nodes.oscs) nodes.oscs.forEach(n => { try { n.osc.stop(); } catch (_) {} });
      if (nodes.rumble) { try { nodes.rumble.stop(); } catch (_) {} }
      if (nodes.masterGain) { try { nodes.masterGain.disconnect(); } catch (_) {} }
    } catch (e) {}
    engineNodesRef.current = {};
  }

  function getGearForRpm(currentRpm, maxRpm) {
    const pct = currentRpm / maxRpm;
    if (pct < 0.01) return 0;
    if (pct < 0.18) return 1;
    if (pct < 0.36) return 2;
    if (pct < 0.54) return 3;
    if (pct < 0.72) return 4;
    return 5;
  }

  useEffect(() => {
    function onKeyDown(e) { if (e.code === 'Space') { e.preventDefault(); startThrottle(); } }
    function onKeyUp(e) { if (e.code === 'Space') releaseThrottle(); }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      stopEngineSound();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [soundEnabled, activeBikeId]);

  function animateEngine() {
    const s = stateRef.current;
    if (throttleHeldRef.current) {
      s.rpm = Math.min(s.rpm + (bike.maxRpm * 0.028), bike.maxRpm);
      s.throttle = Math.min(s.throttle + 8, 100);
    } else {
      s.rpm = Math.max(s.rpm - (bike.maxRpm * 0.018), 0);
      s.throttle = Math.max(s.throttle - 5, 0);
    }
    s.speed = Math.round((s.rpm / bike.maxRpm) * bike.topSpeed);
    s.gear = getGearForRpm(s.rpm, bike.maxRpm);
    const redl = s.rpm >= redlineRpm;
    setRpm(Math.round(s.rpm));
    setSpeed(s.speed);
    setGear(s.gear);
    setThrottle(Math.round(s.throttle));
    setIsRedline(redl);
    if (throttleHeldRef.current || s.rpm > 10) {
      animFrameRef.current = requestAnimationFrame(animateEngine);
    }
  }

  function startThrottle() {
    if (throttleHeldRef.current) return;
    throttleHeldRef.current = true;
    setIsThrottling(true);
    startEngineSound(stateRef.current.rpm);
    animFrameRef.current = requestAnimationFrame(animateEngine);
  }

  function releaseThrottle() {
    throttleHeldRef.current = false;
    setIsThrottling(false);
    stopEngineSound();
    animFrameRef.current = requestAnimationFrame(animateEngine);
  }

  function handleBikeChange(id) {
    setActiveBikeId(id);
    throttleHeldRef.current = false;
    stateRef.current = { rpm: 0, speed: 0, gear: 0, throttle: 0 };
    setRpm(0); setSpeed(0); setGear(0); setThrottle(0); setIsRedline(false);
    stopEngineSound();
  }

  // SVG Tachometer math
  const CX = 110, CY = 110, R = 90;
  const startAngle = -220, endAngle = 40;
  const totalArc = endAngle - startAngle;
  const rpmPct = rpm / bike.maxRpm;
  const activeArcAngle = totalArc * rpmPct;
  const redlinePct = redlineRpm / bike.maxRpm;
  const redlineArcStart = startAngle + totalArc * redlinePct;

  function polarToXY(cx, cy, r, angleDeg) {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }
  function arcPath(cx, cy, r, a1, a2) {
    const p1 = polarToXY(cx, cy, r, a1);
    const p2 = polarToXY(cx, cy, r, a2);
    const large = (a2 - a1) > 180 ? 1 : 0;
    return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${large} 1 ${p2.x} ${p2.y}`;
  }

  const needleAngle = startAngle + totalArc * rpmPct;
  const needleInner = polarToXY(CX, CY, 18, needleAngle);
  const needleTip = polarToXY(CX, CY, R - 8, needleAngle);

  // Tick marks
  const tickCount = 10;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => {
    const a = startAngle + (totalArc / tickCount) * i;
    const outer = polarToXY(CX, CY, R - 4, a);
    const inner = polarToXY(CX, CY, R - 18, a);
    const isRed = (i / tickCount) >= redlinePct;
    return { outer, inner, isRed };
  });

  return h(
    'section',
    { className: 'cockpit-section section', id: 'cockpit-simulator' },
    h(
      'div',
      { className: 'cockpit-container' },
      h(
        'div',
        { className: 'section-header', style: { marginBottom: '28px' } },
        h(
          'div',
          null,
          h('div', { className: 'radar-kicker', style: { color: '#ef4444' } },
            h('i', { className: 'fa-solid fa-gauge-high' }), ' Interactive Simulator'
          ),
          h('h2', { style: { color: '#fff' } }, 'Digital Cockpit & Engine Throttle'),
          h('p', { style: { color: '#94a3b8' } },
            'Hold the button (or press Spacebar) to rev the engine. Web Audio API synthesizes the live engine roar.'
          )
        )
      ),
      h(
        'div',
        { className: 'cockpit-bike-selector' },
        COCKPIT_BIKES.map(b =>
          h(
            'button',
            {
              key: b.id,
              type: 'button',
              className: `sim-bike-pill${activeBikeId === b.id ? ' is-active' : ''}`,
              onClick: () => handleBikeChange(b.id)
            },
            h('i', { className: 'fa-solid fa-motorcycle' }),
            b.name,
            h('span', { style: { fontSize: '11px', opacity: 0.75 } }, `(${b.cc})`)
          )
        )
      ),
      h(
        'div',
        { className: `cockpit-cluster${isRedline ? ' is-redline-warning' : ''}` },
        // Left: Tachometer SVG
        h(
          'div',
          { className: 'tachometer-gauge-box' },
          h(
            'svg',
            { className: 'tacho-svg', viewBox: '0 0 220 220' },
            // Track
            h('path', { className: 'tacho-track', d: arcPath(CX, CY, R, startAngle, endAngle) }),
            // Active arc
            rpm > 0 && h('path', {
              className: 'tacho-active-arc',
              fill: 'none',
              stroke: isRedline ? '#ef4444' : '#2563eb',
              strokeWidth: 10,
              strokeLinecap: 'round',
              filter: isRedline ? 'drop-shadow(0 0 8px #ef4444)' : 'drop-shadow(0 0 6px #2563eb)',
              d: arcPath(CX, CY, R, startAngle, startAngle + activeArcAngle)
            }),
            // Redline zone arc (always shown dimly)
            h('path', {
              fill: 'none',
              stroke: 'rgba(239,68,68,0.25)',
              strokeWidth: 10,
              strokeLinecap: 'round',
              d: arcPath(CX, CY, R, redlineArcStart, endAngle)
            }),
            // Tick marks
            ticks.map((t, i) =>
              h('line', {
                key: i,
                x1: t.outer.x, y1: t.outer.y,
                x2: t.inner.x, y2: t.inner.y,
                stroke: t.isRed ? '#ef4444' : 'rgba(255,255,255,0.35)',
                strokeWidth: i % 5 === 0 ? 2.5 : 1.2
              })
            ),
            // Needle
            h('line', {
              className: 'tacho-needle',
              x1: needleInner.x, y1: needleInner.y,
              x2: needleTip.x, y2: needleTip.y,
              stroke: isRedline ? '#ef4444' : '#f97316',
              strokeWidth: 3,
              strokeLinecap: 'round',
              filter: `drop-shadow(0 0 6px ${isRedline ? '#ef4444' : '#f97316'})`
            }),
            h('circle', { className: 'needle-cap', cx: CX, cy: CY, r: 10, fill: '#1e293b', stroke: '#ef4444', strokeWidth: 2 }),
            // Labels
            h('text', { className: 'tacho-label', x: CX, y: CY + 38, style: { fill: '#94a3b8', fontSize: '11px', fontWeight: 700, textAnchor: 'middle' } }, 'RPM ×1000'),
            h('text', { className: 'tacho-val-text', x: CX, y: CY + 54, style: { fill: isRedline ? '#ef4444' : '#fff', fontSize: '15px', fontWeight: 900, textAnchor: 'middle', fontFamily: 'JetBrains Mono, monospace' } },
              (rpm / 1000).toFixed(1) + 'k'
            )
          )
        ),
        // Center: HUD display
        h(
          'div',
          { className: 'hud-center-display' },
          h(
            'div',
            { className: 'gear-indicator-pill' },
            h('span', { className: 'gear-label' }, 'GEAR'),
            h('span', { className: `gear-num${gear === 0 ? ' gear-neutral' : ''}` }, gear === 0 ? 'N' : gear)
          ),
          h(
            'div',
            { className: 'speedometer-digits' },
            h('span', { className: 'speed-number' }, speed),
            h('span', { className: 'speed-unit' }, 'km/h')
          ),
          h(
            'div',
            { className: 'throttle-bar-wrap' },
            h('div', { className: 'throttle-bar-fill', style: { width: `${throttle}%` } })
          ),
          h(
            'div',
            { className: 'hud-bike-spec' },
            h('span', null, bike.power),
            h('span', null, '•'),
            h('span', null, bike.torque),
            h('span', null, '•'),
            h('span', null, `${bike.topSpeed} km/h`)
          ),
          isRedline && h(
            'div',
            { style: { fontSize: '13px', fontWeight: 800, color: '#ef4444', letterSpacing: '0.1em', animation: 'blinkRedline 0.3s infinite alternate' } },
            h('i', { className: 'fa-solid fa-triangle-exclamation' }),
            ' REDLINE — SHIFT UP!'
          )
        ),
        // Right: Diagnostics panel
        h(
          'div',
          { className: 'cockpit-diagnostics' },
          h('div', { style: { fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '6px' } }, 'LIVE DIAGNOSTICS'),
          [
            { name: 'ENGINE LOAD', val: `${throttle}%` },
            { name: 'TEMP', val: throttle > 50 ? (70 + Math.round(throttle * 0.6)) + '°C' : '70°C' },
            { name: 'FUEL LEVEL', val: '87%' },
            { name: 'BATTERY', val: '13.8 V' },
            { name: 'OIL PRESS', val: rpm > 0 ? 'NORMAL' : 'OFF' },
            { name: 'TOP SPEED', val: `${bike.topSpeed} km/h` },
            { name: 'ENGINE', val: bike.cc },
            { name: 'STATUS', val: isRedline ? 'REDLINE' : rpm > 0 ? 'RUNNING' : 'IDLE' }
          ].map(row =>
            h(
              'div',
              { key: row.name, className: 'diag-row' },
              h('span', { className: 'diag-name' }, row.name),
              h('span', { className: `diag-val${row.name === 'STATUS' && isRedline ? ' redline-blink' : ''}` }, row.val)
            )
          )
        )
      ),
      h(
        'div',
        { className: 'cockpit-controls' },
        h(
          'button',
          {
            type: 'button',
            className: `btn-rev-throttle${isThrottling ? ' is-throttling' : ''}`,
            onMouseDown: startThrottle,
            onMouseUp: releaseThrottle,
            onMouseLeave: releaseThrottle,
            onTouchStart: e => { e.preventDefault(); startThrottle(); },
            onTouchEnd: e => { e.preventDefault(); releaseThrottle(); }
          },
          h('i', { className: `fa-solid ${isThrottling ? 'fa-fire' : 'fa-hand-pointer'}` }),
          isThrottling ? ' HOLD TO REV...' : ' HOLD THROTTLE (or Spacebar)'
        ),
        h(
          'button',
          {
            type: 'button',
            className: `btn-sound-toggle${soundEnabled ? ' is-on' : ''}`,
            onClick: () => {
              setSoundEnabled(!soundEnabled);
              if (soundEnabled) stopEngineSound();
            }
          },
          h('i', { className: `fa-solid ${soundEnabled ? 'fa-volume-high' : 'fa-volume-xmark'}` }),
          soundEnabled ? ' Sound ON' : ' Sound OFF'
        )
      )
    )
  );
}

/* ==========================================================================
   16-C. SMART RIDE MATCHER WIZARD (REACT)
   ========================================================================== */

const MATCHER_QUESTIONS = [
  {
    key: 'purpose',
    label: '1. What\'s your primary riding purpose?',
    options: [
      { val: 'weekend', label: 'Weekend Getaway', icon: 'fa-tent' },
      { val: 'commute', label: 'Daily Commute', icon: 'fa-building' },
      { val: 'adventure', label: 'Long Adventure Tour', icon: 'fa-mountain' },
      { val: 'experience', label: 'Experience a Superbike', icon: 'fa-fire' }
    ]
  },
  {
    key: 'skill',
    label: '2. Your riding skill level?',
    options: [
      { val: 'beginner', label: 'Beginner (< 1 year)', icon: 'fa-seedling' },
      { val: 'intermediate', label: 'Intermediate (1–3 yrs)', icon: 'fa-user' },
      { val: 'advanced', label: 'Advanced Rider', icon: 'fa-star' },
      { val: 'expert', label: 'Professional / Track', icon: 'fa-trophy' }
    ]
  },
  {
    key: 'budget',
    label: '3. Daily rental budget?',
    options: [
      { val: 'economy', label: 'Economy (< ₹600/day)', icon: 'fa-piggy-bank' },
      { val: 'standard', label: 'Standard (₹600–₹900)', icon: 'fa-wallet' },
      { val: 'premium', label: 'Premium (₹900–₹1500)', icon: 'fa-gem' },
      { val: 'luxury', label: 'Luxury (₹1500+)', icon: 'fa-crown' }
    ]
  }
];

const MATCH_MATRIX = {
  'weekend-beginner-economy': 're-classic-350',
  'weekend-beginner-standard': 'honda-cb350-rs',
  'weekend-intermediate-standard': 'honda-cb350-rs',
  'weekend-intermediate-premium': 're-classic-350',
  'weekend-advanced-premium': 're-himalayan-450',
  'adventure-beginner-standard': 're-classic-350',
  'adventure-intermediate-premium': 're-himalayan-450',
  'adventure-advanced-premium': 're-himalayan-450',
  'adventure-expert-luxury': 'ktm-duke-390',
  'commute-beginner-economy': 'ather-450x',
  'commute-intermediate-economy': 'honda-activa',
  'commute-intermediate-standard': 'pulsar-ns200',
  'commute-advanced-standard': 'tvs-apache-200',
  'experience-advanced-premium': 'ktm-duke-390',
  'experience-expert-luxury': 'cbr650r',
  'experience-intermediate-premium': 'ktm-duke-390'
};

function SmartRideMatcher({ onClose }) {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [matchedBike, setMatchedBike] = useState(null);

  const currentQ = MATCHER_QUESTIONS[step];

  function selectOption(key, val) {
    const updated = { ...answers, [key]: val };
    setAnswers(updated);
    if (step < MATCHER_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Find best match
      const matrixKey = `${updated.purpose}-${updated.skill}-${updated.budget}`;
      let bikeId = MATCH_MATRIX[matrixKey];
      if (!bikeId) {
        // Fallback: find first partial match by purpose
        bikeId = Object.entries(MATCH_MATRIX).find(([k]) => k.startsWith(updated.purpose || ''))?.[1] || BIKES_DATA[0].id;
      }
      const bike = BIKES_DATA.find(b => b.id === bikeId) || BIKES_DATA[0];
      setMatchedBike(bike);
    }
  }

  const matchDescriptions = {
    're-classic-350': 'The perfect companion for scenic weekend getaways and relaxed cruising. Timeless styling meets low-stress riding.',
    'honda-cb350-rs': 'Refined, torquey, and supremely comfortable. Great for both city runs and countryside escapes.',
    're-himalayan-450': 'Built for the roads less taken. Whether it\'s Ladakh or Coorg, the Himalayan dominates every terrain.',
    'ktm-duke-390': 'Aggressive, precise, and electrifying. The Duke 390 is engineered for riders who demand performance.',
    'cbr650r': 'Silky inline-4 power with everyday usability. A superbike experience that doesn\'t punish beginners.',
    'ather-450x': 'India\'s smartest EV scooter. Zero emissions, zero deposit, instant torque for smart city commuting.',
    'honda-activa': 'Reliable, fuel-efficient, and universally trusted for hassle-free daily commuting across Indian cities.',
    'tvs-apache-200': 'The street fighter built for city warriors. Responsive, fun, and perfectly sized for urban roads.',
    'pulsar-ns200': 'Naked aggression with refined power delivery. The NS200 is a statement for the modern Indian rider.'
  };

  return h(
    'div',
    { className: 'modal-backdrop', onClick: onClose },
    h(
      'div',
      { className: 'modal-dialog ride-matcher-dialog', onClick: e => e.stopPropagation() },
      h('button', { type: 'button', className: 'modal-close-btn', onClick: onClose }, h('i', { className: 'fa-solid fa-xmark' })),
      !matchedBike
        ? h(
            React.Fragment,
            null,
            h('div', { className: 'modal-header' },
              h('div', { className: 'modal-badge' }, 'AI SMART MATCHER'),
              h('h2', null, 'Find Your Perfect Ride'),
              h('p', { className: 'matcher-desc' }, 'Answer 3 quick questions and our algorithm matches you to the ideal bike.')
            ),
            h(
              'div',
              { style: { display: 'flex', gap: '6px', marginBottom: '20px' } },
              MATCHER_QUESTIONS.map((_, i) =>
                h('div', {
                  key: i,
                  style: {
                    flex: 1, height: '4px', borderRadius: '999px',
                    background: i <= step ? 'var(--primary)' : 'rgba(148,163,184,0.2)',
                    transition: 'background 0.3s'
                  }
                })
              )
            ),
            h('div', { className: 'matcher-question' },
              h('label', null, currentQ.label),
              h(
                'div',
                { className: 'matcher-options' },
                currentQ.options.map(opt =>
                  h(
                    'button',
                    {
                      key: opt.val,
                      type: 'button',
                      className: `matcher-opt-btn${answers[currentQ.key] === opt.val ? ' is-selected' : ''}`,
                      onClick: () => selectOption(currentQ.key, opt.val)
                    },
                    h('i', { className: `fa-solid ${opt.icon}` }),
                    opt.label
                  )
                )
              )
            )
          )
        : h(
            React.Fragment,
            null,
            h('div', { className: 'modal-header' },
              h('div', { className: 'match-score-badge' },
                h('i', { className: 'fa-solid fa-check-circle', style: { marginRight: '6px' } }),
                '98% Match Found!'
              ),
              h('h2', null, 'Your Perfect Rydo Bike')
            ),
            h('div', { className: 'matched-bike-card' },
              h('img', {
                className: 'matched-bike-img',
                src: matchedBike.image,
                alt: matchedBike.name,
                onError: e => { e.target.style.display = 'none'; }
              }),
              h('div', { className: 'matched-bike-details' },
                h('div', { className: 'matched-tag' }, matchedBike.tag || matchedBike.category),
                h('h4', null, matchedBike.name),
                h('p', { className: 'matched-desc' }, matchDescriptions[matchedBike.id] || `The ${matchedBike.name} is a perfect match for your riding profile.`),
                h('div', { className: 'matched-specs-row' },
                  h('span', null, h('i', { className: 'fa-solid fa-bolt', style: { marginRight: '4px' } }), matchedBike.power),
                  h('span', null, h('i', { className: 'fa-solid fa-gauge', style: { marginRight: '4px' } }), matchedBike.mileage),
                  h('span', null, h('i', { className: 'fa-solid fa-road', style: { marginRight: '4px' } }), matchedBike.topSpeed)
                ),
                h('div', { className: 'matched-price' },
                  `₹${matchedBike.price}`,
                  h('span', null, ' /day')
                ),
                h('div', { className: 'matched-actions' },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'btn-primary',
                      onClick: () => {
                        onClose();
                        const fleetEl = document.getElementById('bikes');
                        if (fleetEl) fleetEl.scrollIntoView({ behavior: 'smooth' });
                        ToastService.show(`Showing ${matchedBike.name} in the fleet!`);
                      }
                    },
                    h('i', { className: 'fa-solid fa-motorcycle', style: { marginRight: '6px' } }),
                    'Book This Bike'
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'btn-secondary',
                      style: { background: 'rgba(148,163,184,0.12)', border: '1px solid var(--border-color)', color: 'var(--text-main)' },
                      onClick: () => { setStep(0); setAnswers({}); setMatchedBike(null); }
                    },
                    h('i', { className: 'fa-solid fa-rotate-right', style: { marginRight: '6px' } }),
                    'Retake Quiz'
                  )
                )
              )
            )
          )
    )
  );
}

/* ==========================================================================
   16-D. LIVE COMMUNITY BOOKING TICKER (REACT)
   ========================================================================== */

const TICKER_EVENTS = [
  { city: 'Goa', bike: 'Royal Enfield Classic 350', rider: 'Arjun S.', ago: 'Just now' },
  { city: 'Bengaluru', bike: 'KTM Duke 390', rider: 'Priya M.', ago: '2 min ago' },
  { city: 'Leh-Ladakh', bike: 'RE Himalayan 450', rider: 'Rahul K.', ago: '4 min ago' },
  { city: 'Mumbai', bike: 'Ather 450X EV', rider: 'Sneha D.', ago: '6 min ago' },
  { city: 'Jaipur', bike: 'Honda CB350 RS', rider: 'Vikram P.', ago: '8 min ago' },
  { city: 'Manali', bike: 'TVS Apache RTR', rider: 'Ananya R.', ago: '11 min ago' },
  { city: 'Rishikesh', bike: 'Bajaj Pulsar NS200', rider: 'Dev T.', ago: '14 min ago' },
  { city: 'Delhi', bike: 'Honda CBR650R', rider: 'Meera G.', ago: '16 min ago' }
];

function LiveBookingTicker() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx(i => (i + 1) % TICKER_EVENTS.length);
        setVisible(true);
      }, 350);
    }, 5000);
    return () => clearInterval(timer);
  }, [dismissed]);

  if (dismissed) return null;

  const evt = TICKER_EVENTS[currentIdx];

  return h(
    'div',
    {
      className: 'live-booking-ticker',
      style: { opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease' }
    },
    h('div', { className: 'ticker-pulse-beacon' }),
    h(
      'div',
      { className: 'ticker-body' },
      h('div', { className: 'ticker-title' },
        h('span', { className: 'ticker-highlight' }, evt.rider),
        ' just booked a '
      ),
      h('div', { className: 'ticker-bike' },
        h('i', { className: 'fa-solid fa-motorcycle', style: { marginRight: '5px', color: '#06b6d4' } }),
        evt.bike
      ),
      h('div', { className: 'ticker-meta' },
        h('span', null, h('i', { className: 'fa-solid fa-location-dot', style: { marginRight: '3px' } }), evt.city),
        h('span', null, evt.ago)
      )
    ),
    h(
      'button',
      { type: 'button', className: 'ticker-close-btn', onClick: () => setDismissed(true), title: 'Dismiss' },
      h('i', { className: 'fa-solid fa-xmark' })
    )
  );
}

/* ==========================================================================
   16. AUTHENTICATION PAGE WITH GUEST ENTRY & INTRO LINK (REACT)
   ========================================================================== */

function AuthPage() {
  const [mode, setMode] = useState('signin');
  const [values, setValues] = useState({ name: '', email: '', password: '', confirmPassword: '', acceptedTerms: false });
  const [submitted, setSubmitted] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const isSignUp = mode === 'signup';

  function validate() {
    const errors = {};
    const email = values.email.trim();

    if (isSignUp && !values.name.trim()) errors.name = 'Please enter your full name.';
    if (!email) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!values.password) {
      errors.password = 'Please enter your password.';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    if (isSignUp && values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    if (isSignUp && !values.acceptedTerms) {
      errors.acceptedTerms = 'You must accept the terms of service.';
    }

    return errors;
  }

  const errors = validate();

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) return;

    if (isSignUp) {
      const user = { name: values.name.trim(), email: values.email.trim().toLowerCase() };
      StorageService.setUser(user);
      setAuthMessage('Account created successfully! Redirecting you to Rydo...');
      ToastService.show(`Welcome to Rydo, ${user.name}!`);
      setTimeout(() => { window.location.href = 'home.html'; }, 1000);
      return;
    }

    const user = {
      name: values.name ? values.name.trim() : values.email.split('@')[0],
      email: values.email.trim().toLowerCase()
    };
    StorageService.setUser(user);
    setAuthMessage('Sign in successful! Redirecting you to Rydo...');
    ToastService.show(`Welcome back, ${user.name}!`);
    setTimeout(() => { window.location.href = 'home.html'; }, 900);
  }

  return h(
    'div',
    { className: 'auth-layout' },
    h(
      'section',
      { className: 'auth-story', 'aria-label': 'Ride with Rydo' },
      h(
        'video',
        { autoPlay: true, muted: true, loop: true, playsInline: true, poster: 'bike.jpeg' },
        h('source', { src: 'make_another_video_of_a_hilly.mp4', type: 'video/mp4' })
      ),
      h(
        'a',
        { href: 'home.html', className: 'auth-brand' },
        h('span', { className: 'brand-mark' }, h('i', { className: 'fa-solid fa-motorcycle' })),
        'Rydo'
      ),
      h(
        'div',
        { className: 'story-content' },
        h('div', { className: 'story-kicker' }, h('i', { className: 'fa-solid fa-route' }), ' YOUR NEXT RIDE STARTS HERE'),
        h('h1', null, 'Take the scenic route.'),
        h('p', null, 'Explore India on two wheels, on your own terms with zero security deposit.'),
        h(
          'div',
          { className: 'story-proof' },
          h('span', { className: 'proof-stars' }, '★★★★★'),
          h('span', null, 'Rated 4.8/5 by 50,000+ happy riders')
        )
      )
    ),
    h(
      'section',
      { className: 'auth-panel' },
      h(
        'div',
        { className: 'auth-card' },
        h(
          'a',
          { href: 'home.html', className: 'mobile-brand' },
          h('span', { className: 'brand-mark' }, h('i', { className: 'fa-solid fa-motorcycle' })),
          'Rydo'
        ),
        h('p', { className: 'auth-eyebrow' }, isSignUp ? 'Join the journey' : 'Welcome back'),
        h('h2', null, isSignUp ? 'Create your account' : 'Sign in to Rydo'),
        h('p', { className: 'auth-intro' }, isSignUp
          ? 'Create a free account to reserve rides and view booking history.'
          : 'Enter your credentials to access your account and bookings.'),
        authMessage ? h('div', { className: 'auth-success' }, authMessage) : null,
        h(
          'div',
          { className: 'auth-tabs' },
          h('button', {
            type: 'button',
            className: `auth-tab${!isSignUp ? ' is-active' : ''}`,
            onClick: () => { setMode('signin'); setSubmitted(false); setAuthMessage(''); }
          }, 'Sign In'),
          h('button', {
            type: 'button',
            className: `auth-tab${isSignUp ? ' is-active' : ''}`,
            onClick: () => { setMode('signup'); setSubmitted(false); setAuthMessage(''); }
          }, 'Sign Up')
        ),
        h(
          'form',
          { className: 'auth-form', onSubmit: handleSubmit, noValidate: true },
          isSignUp
            ? h(
                'div',
                { className: 'auth-field' },
                h('label', null, 'Full Name'),
                h('input', {
                  type: 'text',
                  placeholder: 'e.g. Rahul Sharma',
                  value: values.name,
                  onChange: e => setValues({ ...values, name: e.target.value }),
                  required: true
                }),
                submitted && errors.name ? h('span', { className: 'auth-error' }, errors.name) : null
              )
            : null,
          h(
            'div',
            { className: 'auth-field' },
            h('label', null, 'Email Address'),
            h('input', {
              type: 'email',
              placeholder: 'you@example.com',
              value: values.email,
              onChange: e => setValues({ ...values, email: e.target.value }),
              required: true
            }),
            submitted && errors.email ? h('span', { className: 'auth-error' }, errors.email) : null
          ),
          h(
            'div',
            { className: 'auth-field' },
            h('label', null, 'Password'),
            h('input', {
              type: 'password',
              placeholder: 'At least 6 characters',
              value: values.password,
              onChange: e => setValues({ ...values, password: e.target.value }),
              required: true
            }),
            submitted && errors.password ? h('span', { className: 'auth-error' }, errors.password) : null
          ),
          isSignUp
            ? h(
                'div',
                { className: 'auth-field' },
                h('label', null, 'Confirm Password'),
                h('input', {
                  type: 'password',
                  placeholder: 'Re-enter your password',
                  value: values.confirmPassword,
                  onChange: e => setValues({ ...values, confirmPassword: e.target.value }),
                  required: true
                }),
                submitted && errors.confirmPassword ? h('span', { className: 'auth-error' }, errors.confirmPassword) : null
              )
            : null,
          isSignUp
            ? h(
                'div',
                { className: 'auth-field check-field' },
                h(
                  'label',
                  { className: 'check-label' },
                  h('input', {
                    type: 'checkbox',
                    checked: values.acceptedTerms,
                    onChange: e => setValues({ ...values, acceptedTerms: e.target.checked })
                  }),
                  h('span', null, ' I agree to the rental terms and privacy policy.')
                ),
                submitted && errors.acceptedTerms ? h('span', { className: 'auth-error' }, errors.acceptedTerms) : null
              )
            : null,
          h(
            'button',
            { type: 'submit', className: 'auth-submit' },
            isSignUp ? 'Create Rydo Account ' : 'Sign In to Rydo ',
            h('i', { className: 'fa-solid fa-arrow-right' })
          )
        ),
        // Prominent Guest Access and Intro Screen button
        h(
          'div',
          { className: 'auth-guest-options' },
          h(
            'a',
            { href: 'home.html', className: 'continue-button' },
            'Continue as Guest (Explore Fleet) ',
            h('i', { className: 'fa-solid fa-arrow-right' })
          ),
          h(
            'a',
            { href: 'loading.html', className: 'intro-replay-link' },
            h('i', { className: 'fa-solid fa-play' }),
            ' View Starting Loading Page'
          )
        ),
        h('div', { className: 'auth-divider' }, 'FRONT-END ENGINEERING PROJECT'),
        h('p', { className: 'demo-note' }, 'Session is preserved using browser localStorage. Sign in to view and save rides!')
      )
    )
  );
}

/* ==========================================================================
   16-E. EXPEDITION & ROUTE PLANNER (REACT)
   ========================================================================== */

const EXPEDITION_ROUTES = [
  {
    id: 'manali-leh',
    title: 'Manali to Leh-Ladakh Highway',
    tagline: 'The Ultimate Himalayan High-Altitude Odyssey',
    distance: '428 km',
    duration: '2-3 Days',
    maxAltitude: '5,359 m (Khardung La)',
    difficulty: 'Challenging',
    difficultyColor: '#ef4444',
    bestSeason: 'June to September',
    recommendedBikeId: 're-himalayan-450',
    recommendedBikeName: 'Royal Enfield Himalayan 450',
    terrain: 'Mountain passes, glacial river crossings, gravel & tarmac switchbacks',
    elevationPoints: [
      { km: 0, alt: 2050, label: 'Manali' },
      { km: 52, alt: 3978, label: 'Rohtang Pass' },
      { km: 115, alt: 3080, label: 'Keylong' },
      { km: 190, alt: 4890, label: 'Baralacha La' },
      { km: 260, alt: 4200, label: 'Sarchu (Camp)' },
      { km: 366, alt: 5328, label: 'Tanglang La' },
      { km: 428, alt: 3500, label: 'Leh City' }
    ],
    waypoints: [
      { name: 'Solang & Atal Tunnel', type: 'Scenic Gateway', icon: 'fa-archway', desc: 'Gateway to Lahaul valley via 9.02 km engineering marvel' },
      { name: 'Tandi Bunk', type: 'Crucial Fuel Stop', icon: 'fa-gas-pump', desc: 'Last official petrol station before 365 km stretch to Karu' },
      { name: 'Baralacha La Pass', type: 'Mountain Pass', icon: 'fa-mountain', desc: '4,890 m altitude with Suraj Tal glacial lake view' },
      { name: 'Gata Loops', type: '21 Hairpin Bends', icon: 'fa-road', desc: 'Iconic zigzag climb elevating from 4,190m to 4,660m' },
      { name: 'Rydo Leh Hub (Main Bazaar)', type: 'Rydo Base Station', icon: 'fa-location-dot', desc: 'Vehicle check, oxygen support & complimentary chain lubing' }
    ],
    packList: ['Warm thermal base layers', 'Waterproof riding gloves', 'Tire puncture repair kit', 'Portable 12V air inflator', 'Diamox (AMS medicine)', 'Offline GPS map data']
  },
  {
    id: 'mumbai-goa',
    title: 'Mumbai to Goa Coastal Expressway (NH-66)',
    tagline: 'Sea Breezes, Ghat Curves & Golden Beaches',
    distance: '585 km',
    duration: '1-2 Days',
    maxAltitude: '640 m (Kashedi Ghat)',
    difficulty: 'Moderate',
    difficultyColor: '#f59e0b',
    bestSeason: 'October to March',
    recommendedBikeId: 're-classic-350',
    recommendedBikeName: 'Royal Enfield Classic 350',
    terrain: 'Four-lane smooth tarmac, coastal ghat switchbacks, riverside bridges',
    elevationPoints: [
      { km: 0, alt: 10, label: 'Mumbai' },
      { km: 120, alt: 240, label: 'Kolad' },
      { km: 210, alt: 640, label: 'Kashedi Ghat' },
      { km: 330, alt: 80, label: 'Chiplun' },
      { km: 450, alt: 120, label: 'Ratnagiri' },
      { km: 585, alt: 5, label: 'Calangute, Goa' }
    ],
    waypoints: [
      { name: 'Panvel Interchange', type: 'Start Junction', icon: 'fa-flag', desc: 'Kickoff onto the scenic 4-lane NH-66 Konkan corridor' },
      { name: 'Kolad Riverbank', type: 'Rest Stop', icon: 'fa-water', desc: 'Kundalika river rapids & authentic Konkani breakfast' },
      { name: 'Kashedi Ghat Viewpoint', type: 'Scenic Curve', icon: 'fa-camera', desc: 'Panoramic valley views with misty mountain curves' },
      { name: 'Ratnagiri Hub', type: 'Midway Fuel & Food', icon: 'fa-utensils', desc: 'Alphonso orchards, fresh seafood & Rydo partner bunk' },
      { name: 'Rydo Goa Calangute Hub', type: 'Rydo Destination', icon: 'fa-umbrella-beach', desc: 'Drop off or extend your booking right near the beach' }
    ],
    packList: ['UV protection sunglasses', 'Breathable mesh riding jacket', 'Rain poncho', 'Hydration bladder (2L)', 'GoPro action camera mount']
  },
  {
    id: 'bengaluru-ooty',
    title: 'Bengaluru to Ooty via Masinagudi 36 Hairpin Bends',
    tagline: 'Tea Estates, Tiger Reserves & Steep Hairpin Thrills',
    distance: '275 km',
    duration: '1 Day',
    maxAltitude: '2,240 m (Dodabetta Peak)',
    difficulty: 'Moderate - High',
    difficultyColor: '#f59e0b',
    bestSeason: 'Year Round (Best Sep - Feb)',
    recommendedBikeId: 'ktm-duke-390',
    recommendedBikeName: 'KTM Duke 390',
    terrain: 'Expressway to Mysuru, Bandipur forest corridor, steep 36 hairpin climb',
    elevationPoints: [
      { km: 0, alt: 920, label: 'Bengaluru' },
      { km: 140, alt: 760, label: 'Mysuru' },
      { km: 220, alt: 880, label: 'Bandipur' },
      { km: 245, alt: 1100, label: 'Masinagudi' },
      { km: 260, alt: 2000, label: '36 Hairpins' },
      { km: 275, alt: 2240, label: 'Ooty Town' }
    ],
    waypoints: [
      { name: 'Bengaluru-Mysuru Expressway', type: 'Cruising Run', icon: 'fa-gauge-high', desc: 'High-speed smooth tarmac through Ramanagara hills' },
      { name: 'Bandipur Tiger Reserve Gate', type: 'Wildlife Trail', icon: 'fa-paw', desc: 'Strict 30 km/h speed limit corridor with wild elephant sightings' },
      { name: 'Masinagudi Checkpoint', type: 'Inspection', icon: 'fa-clipboard-check', desc: 'Brake pad and cooling check before the steep ascent' },
      { name: 'Hairpin Bend #1 to #36', type: 'Steep Adrenaline', icon: 'fa-arrows-split-up-and-left', desc: 'First-gear steep incline climbing 1,200m in just 15 km' },
      { name: 'Charring Cross, Ooty', type: 'Destination Hub', icon: 'fa-mug-hot', desc: 'Cool eucalyptus breezes, homemade chocolates & hot tea' }
    ],
    packList: ['Warm jacket & windbreaker', 'Clear visor for evening mist', 'Brake fluid check kit', 'Power bank', 'First-aid kit']
  },
  {
    id: 'delhi-agra-jaipur',
    title: 'Delhi to Jaipur & Agra Golden Triangle Tour',
    tagline: 'Imperial Heritage, Palaces & High-Speed Expressways',
    distance: '480 km',
    duration: '2 Days',
    maxAltitude: '430 m (Amer Fort)',
    difficulty: 'Easy - Moderate',
    difficultyColor: '#10b981',
    bestSeason: 'October to March',
    recommendedBikeId: 'honda-cb350-rs',
    recommendedBikeName: 'Honda CB350 RS',
    terrain: 'Yamuna & Delhi-Mumbai Expressways, smooth highway asphalt, heritage towns',
    elevationPoints: [
      { km: 0, alt: 215, label: 'Delhi CP' },
      { km: 180, alt: 170, label: 'Agra Taj' },
      { km: 280, alt: 230, label: 'Bharatpur' },
      { km: 410, alt: 360, label: 'Dausa' },
      { km: 480, alt: 430, label: 'Jaipur' }
    ],
    waypoints: [
      { name: 'Connaught Place Hub', type: 'Departure Station', icon: 'fa-landmark', desc: 'Start early morning from Rydo Central Delhi pickup station' },
      { name: 'Yamuna Expressway Mile 90', type: 'Expressway Cruising', icon: 'fa-road', desc: '6-lane world-class highway with wide shoulders and food plazas' },
      { name: 'Taj Mahal East Gate', type: 'World Wonder Heritage', icon: 'fa-monument', desc: 'Marvel at white marble before continuing westward' },
      { name: 'Fatehpur Sikri', type: 'Mughal Architecture', icon: 'fa-archway', desc: 'Buland Darwaza photo stop & local spiced kachoris' },
      { name: 'Hawa Mahal & MI Road Hub', type: 'Pink City Arrival', icon: 'fa-gem', desc: 'Park and drop off bike or start your Rajasthan road tour' }
    ],
    packList: ['Balaclava / dust buff', 'Hydration pack with electrolytes', 'Anti-fog visor spray', 'Bungee tie-down straps', 'Toll FASTag (included on bike)']
  }
];

function RoutesPage() {
  const [selectedRouteId, setSelectedRouteId] = useState(EXPEDITION_ROUTES[0].id);
  const route = useMemo(() => EXPEDITION_ROUTES.find(r => r.id === selectedRouteId) || EXPEDITION_ROUTES[0], [selectedRouteId]);

  // Compute SVG polyline for elevation chart
  const svgWidth = 700;
  const svgHeight = 200;
  const maxAlt = 5600;
  const maxKm = route.elevationPoints[route.elevationPoints.length - 1].km || 500;

  const xForKm = km => Math.round((km / maxKm) * (svgWidth - 60)) + 30;
  const yForAltitude = alt => Math.round(svgHeight - 30 - (alt / maxAlt) * (svgHeight - 60));
  const chartPoints = route.elevationPoints.map(pt => ({
    ...pt,
    x: xForKm(pt.km),
    y: yForAltitude(pt.alt)
  }));
  const pointsString = chartPoints.map(({ x, y }) => `${x},${y}`).join(' ');

  function handleBookForRoute() {
    window.location.href = `home.html#bikes`;
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('rydo:search-filter', { detail: { search: route.recommendedBikeName } }));
    }, 400);
    ToastService.show(`Pre-selected ${route.recommendedBikeName} for your ${route.title} trip!`);
  }

  return h(
    'div',
    { className: 'routes-page-container' },
    h(
      'header',
      { className: 'page-heading' },
      h('div', { className: 'eyebrow' }, h('i', { className: 'fa-solid fa-compass' }), ' ICONIC INDIAN EXPEDITIONS'),
      h('h1', null, 'Motorcycle Route Planner & Elevation Guide'),
      h('p', null, 'Plan high-altitude mountain runs, coastal cruises, and heritage expressways with waypoint telemetry, packing checklists, and recommended bikes.')
    ),
    h(
      'div',
      { className: 'category-pills', role: 'tablist' },
      EXPEDITION_ROUTES.map(r =>
        h(
          'button',
          {
            key: r.id,
            type: 'button',
            className: `category-pill${selectedRouteId === r.id ? ' is-active' : ''}`,
            onClick: () => setSelectedRouteId(r.id)
          },
          h('i', { className: 'fa-solid fa-route', style: { marginRight: '6px' } }),
          r.title.split(' ')[0] + ' ' + (r.title.split(' ')[2] || '')
        )
      )
    ),
    h(
      'div',
      { className: 'route-hero-card' },
      h(
        'div',
        { className: 'route-header-row' },
        h(
          'div',
          null,
          h('div', { className: 'route-badge-kicker' }, route.tagline),
          h('h2', { className: 'route-main-title' }, route.title),
          h('p', { className: 'route-terrain-desc' }, h('i', { className: 'fa-solid fa-mountain-sun' }), ` Terrain: ${route.terrain}`)
        ),
        h(
          'button',
          {
            type: 'button',
            className: 'btn-primary route-cta-btn',
            onClick: handleBookForRoute
          },
          h('i', { className: 'fa-solid fa-motorcycle' }),
          ` Rent ${route.recommendedBikeName}`
        )
      ),
      h(
        'div',
        { className: 'route-metrics-bar' },
        h('div', { className: 'route-metric-pill' }, h('span', null, 'Distance'), h('strong', null, route.distance)),
        h('div', { className: 'route-metric-pill' }, h('span', null, 'Duration'), h('strong', null, route.duration)),
        h('div', { className: 'route-metric-pill' }, h('span', null, 'Peak Altitude'), h('strong', null, route.maxAltitude)),
        h('div', { className: 'route-metric-pill' }, h('span', null, 'Best Season'), h('strong', null, route.bestSeason)),
        h('div', { className: 'route-metric-pill' }, h('span', null, 'Difficulty'), h('strong', { style: { color: route.difficultyColor } }, route.difficulty))
      ),
      // SVG Dynamic Elevation Profile
      h(
        'div',
        { className: 'elevation-chart-container' },
        h(
          'div',
          { className: 'elevation-header' },
          h('h3', null, h('i', { className: 'fa-solid fa-chart-area' }), ' Elevation & Altitude Profile (Meters above Sea Level)'),
          h('span', { className: 'elevation-legend' }, 'Altitude vs Distance (km)')
        ),
        h(
          'svg',
          { viewBox: `0 0 ${svgWidth} ${svgHeight}`, className: 'elevation-svg' },
          h('defs', null,
            h('linearGradient', { id: 'altGrad', x1: '0', y1: '0', x2: '0', y2: '1' },
              h('stop', { offset: '0%', stopColor: '#2563eb', stopOpacity: '0.45' }),
              h('stop', { offset: '100%', stopColor: '#ec4899', stopOpacity: '0.05' })
            )
          ),
          // Grid lines
          [1000, 2500, 5000].map(alt => {
            const y = yForAltitude(alt);
            return h('g', { key: alt },
              h('line', { x1: '30', y1: y, x2: svgWidth - 30, y2: y, stroke: 'rgba(148,163,184,0.18)', strokeDasharray: '4 4' }),
              h('text', { x: '35', y: y - 4, fill: '#94a3b8', fontSize: '10', fontFamily: 'JetBrains Mono' }, `${alt}m`)
            );
          }),
          // Area path under curve
          h('polygon', {
            points: `30,${svgHeight - 30} ${pointsString} ${svgWidth - 30},${svgHeight - 30}`,
            fill: 'url(#altGrad)'
          }),
          // Active polyline curve
          h('polyline', {
            points: pointsString,
            fill: 'none',
            stroke: 'var(--primary)',
            strokeWidth: '3.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round'
          }),
          // Checkpoint markers
          chartPoints.map((pt, i) => {
            const { x, y } = pt;
            return h('g', { key: i },
              h('circle', { cx: x, cy: y, r: '5', fill: '#ffffff', stroke: 'var(--secondary)', strokeWidth: '2.5' }),
              h('text', {
                x: x,
                y: y > 50 ? y - 10 : y + 16,
                fill: 'var(--text-main)',
                fontSize: '10',
                fontWeight: '700',
                textAnchor: 'middle'
              }, `${pt.label} (${pt.alt}m)`)
            );
          })
        )
      ),
      // Waypoint Timeline & Pack list 2-column grid
      h(
        'div',
        { className: 'route-details-grid' },
        h(
          'div',
          { className: 'route-waypoints-box' },
          h('h3', { className: 'box-title' }, h('i', { className: 'fa-solid fa-location-crosshairs' }), ' Waypoint & Checkpoint Itinerary'),
          h(
            'div',
            { className: 'waypoints-timeline' },
            route.waypoints.map((wp, i) =>
              h(
                'div',
                { key: i, className: 'waypoint-item' },
                h('div', { className: 'waypoint-icon-badge' }, h('i', { className: `fa-solid ${wp.icon}` })),
                h(
                  'div',
                  { className: 'waypoint-content' },
                  h('div', { className: 'waypoint-title-row' },
                    h('strong', null, wp.name),
                    h('span', { className: 'waypoint-tag' }, wp.type)
                  ),
                  h('p', null, wp.desc)
                )
              )
            )
          )
        ),
        h(
          'div',
          { className: 'route-sidebar-col' },
          h(
            'div',
            { className: 'pack-list-card' },
            h('h3', { className: 'box-title' }, h('i', { className: 'fa-solid fa-suitcase-rolling' }), ' Essential Gear Pack List'),
            h(
              'ul',
              { className: 'pack-items-list' },
              route.packList.map((item, idx) =>
                h(
                  'li',
                  { key: idx },
                  h('i', { className: 'fa-solid fa-circle-check', style: { color: '#10b981' } }),
                  h('span', null, item)
                )
              )
            )
          ),
          h(
            'div',
            { className: 'recommended-bike-banner' },
            h('div', { className: 'rec-badge' }, 'OPTIMAL RIDE MATCH'),
            h('h4', null, route.recommendedBikeName),
            h('p', null, `Tuned gear ratios and torque curve tested for ${route.title}.`),
            h(
              'button',
              {
                type: 'button',
                className: 'btn-secondary',
                onClick: handleBookForRoute,
                style: { width: '100%', marginTop: '12px' }
              },
              'Reserve This Bike Now ',
              h('i', { className: 'fa-solid fa-arrow-right' })
            )
          )
        )
      )
    )
  );
}

/* ==========================================================================
   16-F. RYDO MILES LOYALTY CLUB & GAMIFIED XP DASHBOARD (REACT)
   ========================================================================== */

const LOYALTY_TIERS = [
  { name: 'Bronze Cruiser', minXp: 0, maxXp: 500, color: '#cd7f32', perk: 'Standard rental rates, 2 sanitized helmets included' },
  { name: 'Silver Explorer', minXp: 501, maxXp: 2000, color: '#94a3b8', perk: '5% discount on all bookings, free second helmet, priority support' },
  { name: 'Gold Nomad', minXp: 2001, maxXp: 5000, color: '#f59e0b', perk: '10% discount, zero cancellation fee, complimentary touring jacket' },
  { name: 'Diamond Master', minXp: 5001, maxXp: 10000, color: '#06b6d4', perk: '20% lifetime discount, zero deposit guaranteed, personal ride concierge' }
];

const ACHIEVEMENT_BADGES = [
  { id: 'first-ride', title: 'First Spark', desc: 'Completed your first Rydo bike rental', icon: 'fa-bolt', unlocked: true },
  { id: 'ghats-carver', title: 'Ghats Carver', desc: 'Navigated 36 hairpin curves in Western Ghats', icon: 'fa-mountain-sun', unlocked: true },
  { id: 'night-owl', title: 'Midnight Marauder', desc: 'Completed a verified midnight city ride', icon: 'fa-moon', unlocked: true },
  { id: 'leh-hero', title: 'Ladakh Conqueror', desc: 'Rented across high altitude passes above 4,000m', icon: 'fa-award', unlocked: false },
  { id: 'ev-pioneer', title: 'Zero Emission Pioneer', desc: 'Rode 100+ km on an Ather EV scooter', icon: 'fa-leaf', unlocked: false },
  { id: 'iron-butt', title: 'Iron Saddle', desc: 'Completed 5+ days continuous long-distance rental', icon: 'fa-shield-halved', unlocked: false }
];

const REWARDS_VOUCHERS = [
  { code: 'FUELFREE100', title: '₹100 Free Fuel Credit', costXp: 300, desc: 'Reimbursable fuel voucher valid on any rental above 2 days' },
  { code: 'JACKETFREE', title: 'Free Touring Armor Jacket', costXp: 450, desc: 'Waive off the ₹150/day riding gear addon fee' },
  { code: 'WEEKEND20', title: 'Flat 20% Weekend Trip Coupon', costXp: 600, desc: 'Get 20% off on all cruiser & sports bike rentals' },
  { code: 'UPGRADEVIP', title: 'Superbike Free Class Upgrade', costXp: 900, desc: 'Upgrade commuter booking to 350cc cruiser for free' }
];

function LoyaltyPage() {
  const [loyalty, setLoyalty] = useState(StorageService.getLoyaltyData());
  const [copiedReferral, setCopiedReferral] = useState(false);

  const currentTier = useMemo(() => {
    return LOYALTY_TIERS.find(t => loyalty.xp >= t.minXp && loyalty.xp <= t.maxXp) || LOYALTY_TIERS[1];
  }, [loyalty.xp]);

  const nextTier = useMemo(() => {
    const idx = LOYALTY_TIERS.findIndex(t => t.name === currentTier.name);
    return LOYALTY_TIERS[idx + 1] || null;
  }, [currentTier]);

  const progressPercent = useMemo(() => {
    if (!nextTier) return 100;
    const tierSpan = nextTier.minXp - currentTier.minXp;
    const gained = loyalty.xp - currentTier.minXp;
    return Math.min(100, Math.round((gained / tierSpan) * 100));
  }, [currentTier, nextTier, loyalty.xp]);

  function handleClaimVoucher(voucher) {
    const res = StorageService.claimLoyaltyVoucher(voucher.code, voucher.costXp);
    if (res.success) {
      setLoyalty(StorageService.getLoyaltyData());
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(voucher.code);
      }
      ToastService.show(`${voucher.title} claimed & copied! ${res.message}`);
    } else {
      ToastService.show(res.message, 'error');
    }
  }

  function handleCopyReferral() {
    const referralCode = 'RYDO-EXPLORER-9982';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(`https://rydo.in/join?ref=${referralCode}`);
    }
    setCopiedReferral(true);
    ToastService.show(`Referral link copied! Share with friends to earn 300 XP + ₹300 cash credit.`);
    setTimeout(() => setCopiedReferral(false), 3000);
  }

  return h(
    'div',
    { className: 'loyalty-page-container' },
    h(
      'header',
      { className: 'page-heading' },
      h('div', { className: 'eyebrow' }, h('i', { className: 'fa-solid fa-crown' }), ' RYDO MILES REWARDS CLUB'),
      h('h1', null, 'Your Biker XP & Loyalty Rewards'),
      h('p', null, 'Every kilometer on two wheels earns XP points. Level up your tier, unlock exclusive rider badges, and redeem fuel & gear vouchers.')
    ),
    // Status Card with Tier Progress
    h(
      'div',
      { className: 'loyalty-status-card' },
      h(
        'div',
        { className: 'loyalty-card-top' },
        h(
          'div',
          { className: 'tier-badge-group' },
          h('div', { className: 'tier-emblem', style: { borderColor: currentTier.color } },
            h('i', { className: 'fa-solid fa-trophy', style: { color: currentTier.color } })
          ),
          h(
            'div',
            null,
            h('span', { className: 'current-tier-label' }, 'CURRENT RIDER STATUS'),
            h('h2', { className: 'tier-name-title' }, currentTier.name),
            h('p', { className: 'tier-perk-text' }, currentTier.perk)
          )
        ),
        h(
          'div',
          { className: 'xp-score-box' },
          h('span', null, 'AVAILABLE BALANCE'),
          h('div', { className: 'xp-digits' }, `${loyalty.xp} `, h('small', null, 'XP')),
          h('span', { className: 'kms-counter' }, h('i', { className: 'fa-solid fa-road' }), ` ${loyalty.kmsRidden} km logged`)
        )
      ),
      // Progress Bar towards Next Tier
      h(
        'div',
        { className: 'tier-progress-track-wrap' },
        h(
          'div',
          { className: 'progress-labels-row' },
          h('span', null, `Tier Progress: ${progressPercent}%`),
          nextTier ? h('span', null, `Next Tier: ${nextTier.name} at ${nextTier.minXp} XP`) : h('span', null, 'Max Tier Achieved!')
        ),
        h(
          'div',
          { className: 'tier-bar-bg' },
          h('div', { className: 'tier-bar-fill', style: { width: `${progressPercent}%`, background: `linear-gradient(90deg, ${currentTier.color}, var(--primary))` } })
        )
      )
    ),
    // All 4 Tiers Comparison Grid
    h(
      'div',
      { className: 'tiers-comparison-grid' },
      LOYALTY_TIERS.map(t =>
        h(
          'div',
          {
            key: t.name,
            className: `tier-card-col${t.name === currentTier.name ? ' is-current-tier' : ''}`
          },
          h('div', { className: 'tier-col-icon', style: { color: t.color } }, h('i', { className: 'fa-solid fa-medal' })),
          h('h4', null, t.name),
          h('span', { className: 'tier-xp-range' }, `${t.minXp} - ${t.maxXp} XP`),
          h('p', null, t.perk),
          t.name === currentTier.name ? h('span', { className: 'active-tier-tag' }, 'ACTIVE STATUS') : null
        )
      )
    ),
    // Achievement Badges Section
    h(
      'section',
      { className: 'badges-section' },
      h('div', { className: 'section-header' },
        h('div', null,
          h('h3', null, h('i', { className: 'fa-solid fa-award' }), ' Biker Hall of Fame Badges'),
          h('p', null, 'Complete touring milestones across India to unlock badges on your digital profile.')
        )
      ),
      h(
        'div',
        { className: 'badges-grid' },
        ACHIEVEMENT_BADGES.map(badge => {
          const isUnlocked = loyalty.badges.includes(badge.id) || badge.unlocked;
          return h(
            'div',
            { key: badge.id, className: `badge-card${isUnlocked ? ' is-unlocked' : ' is-locked'}` },
            h('div', { className: 'badge-icon-wrap' }, h('i', { className: `fa-solid ${badge.icon}` })),
            h('h4', null, badge.title),
            h('p', null, badge.desc),
            h('span', { className: `badge-status-pill${isUnlocked ? ' unlocked' : ' locked'}` },
              isUnlocked ? h('span', null, h('i', { className: 'fa-solid fa-check' }), ' Unlocked') : h('span', null, h('i', { className: 'fa-solid fa-lock' }), ' Locked')
            )
          );
        })
      )
    ),
    // Rewards Voucher Shop
    h(
      'section',
      { className: 'vouchers-section' },
      h('div', { className: 'section-header' },
        h('div', null,
          h('h3', null, h('i', { className: 'fa-solid fa-ticket' }), ' Redeem XP for Free Vouchers & Fuel'),
          h('p', null, 'Convert your riding kilometers into instant savings on future road trips.')
        )
      ),
      h(
        'div',
        { className: 'vouchers-grid' },
        REWARDS_VOUCHERS.map(v => {
          const isClaimed = loyalty.claimedVouchers.includes(v.code);
          const canAfford = loyalty.xp >= v.costXp;
          return h(
            'div',
            { key: v.code, className: 'reward-voucher-card' },
            h('div', { className: 'voucher-cost-tag' }, `${v.costXp} XP`),
            h('h4', null, v.title),
            h('p', null, v.desc),
            h(
              'button',
              {
                type: 'button',
                className: `btn-primary claim-voucher-btn${isClaimed ? ' is-claimed' : ''}`,
                disabled: isClaimed || !canAfford,
                onClick: () => handleClaimVoucher(v)
              },
              isClaimed
                ? h('span', null, h('i', { className: 'fa-solid fa-check' }), ` Claimed (${v.code})`)
                : canAfford
                  ? h('span', null, h('i', { className: 'fa-solid fa-unlock' }), ` Redeem (${v.costXp} XP)`)
                  : h('span', null, `Need ${v.costXp - loyalty.xp} more XP`)
            )
          );
        })
      )
    ),
    // Referral Program Box
    h(
      'div',
      { className: 'referral-box-card' },
      h('div', { className: 'referral-icon-badge' }, h('i', { className: 'fa-solid fa-handshake-angle' })),
      h(
        'div',
        { className: 'referral-copy' },
        h('h3', null, 'Invite Fellow Riders & Earn 300 XP + ₹300 Credit'),
        h('p', null, 'Give friends ₹250 off their first motorcycle trip. When they complete their booking, 300 XP is credited to your Rydo Club wallet.')
      ),
      h(
        'button',
        {
          type: 'button',
          className: 'btn-secondary copy-referral-btn',
          onClick: handleCopyReferral
        },
        h('i', { className: `fa-solid ${copiedReferral ? 'fa-check' : 'fa-share-nodes'}` }),
        copiedReferral ? ' Link Copied!' : ' Copy Invite Link'
      )
    )
  );
}

/* ==========================================================================
   16-G. SAFETY, ZERO-DEP INSURANCE & LIVE SOS DISPATCH HUB (REACT)
   ========================================================================== */

function SafetyPage() {
  const [sosActive, setSosActive] = useState(false);
  const [sosEta, setSosEta] = useState(18); // minutes
  const [sosStatus, setSosStatus] = useState('Dispatching');
  const [coords, setCoords] = useState({ lat: 12.9784, lng: 77.6408, label: 'Indiranagar Hub, Bengaluru' });
  const [copiedDistress, setCopiedDistress] = useState(false);

  useEffect(() => {
    let timer;
    if (sosActive && sosEta > 2) {
      timer = setInterval(() => {
        setSosEta(prev => {
          if (prev <= 3) {
            setSosStatus('Arriving at your location');
            return 2;
          }
          return prev - 1;
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [sosActive, sosEta]);

  function triggerSos() {
    setSosActive(true);
    setSosEta(18);
    setSosStatus('Recovery Unit #14 Dispatched');
    ToastService.show('EMERGENCY SOS BEACON ACTIVATED! Help is en route.', 'error');
  }

  function cancelSos() {
    setSosActive(false);
    ToastService.show('SOS Beacon deactivated.');
  }

  function handleCopyDistress() {
    const text = `🚨 RYDO EMERGENCY DISTRESS ALERT: Rider requires roadside assistance at Coordinates [${coords.lat}, ${coords.lng}] near ${coords.label}. Rydo 24/7 Hotline: 1800-RYDO-BIKE.`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedDistress(true);
    ToastService.show('Emergency distress SMS text copied to clipboard!');
    setTimeout(() => setCopiedDistress(false), 3000);
  }

  return h(
    'div',
    { className: 'safety-page-container' },
    h(
      'header',
      { className: 'page-heading' },
      h('div', { className: 'eyebrow' }, h('i', { className: 'fa-solid fa-shield-halved' }), ' 100% PEACE OF MIND GUARANTEED'),
      h('h1', null, 'Rider Safety, Insurance & 24/7 SOS Hub'),
      h('p', null, 'Zero security deposit with full zero-dep insurance coverage. Equipped with nationwide roadside breakdown telemetry and emergency response dispatch.')
    ),
    // 3 Core Pillars
    h(
      'div',
      { className: 'safety-pillars-grid' },
      h(
        'div',
        { className: 'safety-pillar-card' },
        h('div', { className: 'pillar-icon' }, h('i', { className: 'fa-solid fa-file-shield' })),
        h('h3', null, 'Zero-Dep Comprehensive Insurance'),
        h('p', null, 'Every rental includes comprehensive zero-dep insurance. Minor scratches and standard road wear are 100% waived off. Third-party liability cover up to ₹15 Lakhs.')
      ),
      h(
        'div',
        { className: 'safety-pillar-card' },
        h('div', { className: 'pillar-icon' }, h('i', { className: 'fa-solid fa-helmet-safety' })),
        h('h3', null, 'ISI Certified Helmets & Sanitization'),
        h('p', null, 'Two ISI-marked DOT helmets are sanitized with hospital-grade antimicrobial spray before every handover. Disposable hygienic head liners included free.')
      ),
      h(
        'div',
        { className: 'safety-pillar-card' },
        h('div', { className: 'pillar-icon' }, h('i', { className: 'fa-solid fa-wrench' })),
        h('h3', null, '24/7 Pan-India Roadside Assist'),
        h('p', null, 'Punctures, battery drainage, or mechanical stall on mountain highways? Over 350+ certified mechanic partner hubs across India deploy within 30 minutes.')
      )
    ),
    // LIVE EMERGENCY SOS RADAR DISPATCHER
    h(
      'section',
      { className: 'sos-radar-section', id: 'sos' },
      h(
        'div',
        { className: `sos-radar-console${sosActive ? ' is-active' : ''}` },
        h(
          'div',
          { className: 'sos-console-header' },
          h('div', null,
            h('span', { className: 'sos-alert-badge' }, sosActive ? '🚨 SOS BEACON BROADCASTING LIVE' : '24/7 HIGHWAY SOS DISPATCH'),
            h('h2', null, sosActive ? 'Emergency Recovery Unit En Route' : 'Roadside Breakdown or Emergency?'),
            h('p', null, 'Activate immediate satellite telemetry to dispatch the nearest Rydo emergency tow vehicle or certified mechanic.')
          ),
          h(
            'div',
            { className: 'sos-action-btns' },
            !sosActive
              ? h(
                  'button',
                  {
                    type: 'button',
                    className: 'btn-trigger-sos',
                    onClick: triggerSos
                  },
                  h('i', { className: 'fa-solid fa-triangle-exclamation' }),
                  ' Activate Emergency SOS'
                )
              : h(
                  'button',
                  {
                    type: 'button',
                    className: 'btn-cancel-sos',
                    onClick: cancelSos
                  },
                  h('i', { className: 'fa-solid fa-xmark' }),
                  ' Cancel SOS'
                )
          )
        ),
        // Active SOS Telemetry Card
        sosActive
          ? h(
              'div',
              { className: 'sos-active-panel' },
              h(
                'div',
                { className: 'sos-radar-animation-box' },
                h('div', { className: 'radar-circle circle-1' }),
                h('div', { className: 'radar-circle circle-2' }),
                h('div', { className: 'radar-circle circle-3' }),
                h('div', { className: 'radar-center-bike' }, h('i', { className: 'fa-solid fa-motorcycle' })),
                h('div', { className: 'radar-blip-tow' }, h('i', { className: 'fa-solid fa-truck-pickup' }))
              ),
              h(
                'div',
                { className: 'sos-details-card' },
                h('div', { className: 'dispatch-status-pill' },
                  h('span', { className: 'beacon-dot' }),
                  sosStatus
                ),
                h('h3', null, `Estimated Arrival: ~${sosEta} Minutes`),
                h('p', null, 'Mechanic: Suresh Kumar (Rydo Mobile Recovery Unit #14)'),
                h('div', { className: 'sos-coords-strip' },
                  h('span', null, h('i', { className: 'fa-solid fa-location-dot' }), ` GPS: ${coords.lat}° N, ${coords.lng}° E (${coords.label})`)
                ),
                h(
                  'div',
                  { className: 'sos-panel-actions' },
                  h(
                    'a',
                    { href: 'tel:1800-RYDO-BIKE', className: 'btn-primary' },
                    h('i', { className: 'fa-solid fa-phone' }),
                    ' Call Recovery Unit'
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'btn-secondary',
                      onClick: handleCopyDistress
                    },
                    h('i', { className: `fa-solid ${copiedDistress ? 'fa-check' : 'fa-copy'}` }),
                    copiedDistress ? ' Text Copied!' : ' Copy Distress SMS'
                  )
                )
              )
            )
          : h(
              'div',
              { className: 'sos-idle-telemetry' },
              h('div', { className: 'idle-item' },
                h('i', { className: 'fa-solid fa-satellite' }),
                h('div', null, h('strong', null, 'Nearest Hub:'), h('p', null, coords.label))
              ),
              h('div', { className: 'idle-item' },
                h('i', { className: 'fa-solid fa-clock' }),
                h('div', null, h('strong', null, 'Average Highway Response:'), h('p', null, '22 Minutes nationwide'))
              ),
              h('div', { className: 'idle-item' },
                h('i', { className: 'fa-solid fa-phone-volume' }),
                h('div', null, h('strong', null, 'Toll-Free Control Room:'), h('p', null, '1800-RYDO-BIKE (24x7)'))
              )
            )
      )
    ),
    // Pre-Ride Safety Checklist
    h(
      'section',
      { className: 'pre-ride-checklist-section' },
      h('div', { className: 'section-header' },
        h('div', null,
          h('h3', null, h('i', { className: 'fa-solid fa-list-check' }), ' 60-Second Pre-Ride Safety Checklist'),
          h('p', null, 'Perform this quick safety check before riding out from any Rydo pickup station.')
        )
      ),
      h(
        'div',
        { className: 'checklist-grid' },
        [
          { title: 'Tire Pressure & Tread', desc: 'Ensure front 28-32 PSI and rear 32-36 PSI. Inspect tire groove depth for adequate wet grip.', icon: 'fa-circle-notch' },
          { title: 'Front & Rear Brakes', desc: 'Squeeze levers firmly. Check bite point and brake fluid reservoir window for transparent fluid level.', icon: 'fa-hand' },
          { title: 'Headlight & Tail Lamps', desc: 'Verify high beam, low beam, and rear brake activation light for mountain pass riding.', icon: 'fa-lightbulb' },
          { title: 'Drive Chain Tension', desc: 'Check 20-30mm slack and proper lubrication before high-mileage highway runs.', icon: 'fa-link' }
        ].map((item, i) =>
          h(
            'div',
            { key: i, className: 'checklist-card' },
            h('div', { className: 'checklist-card-icon' }, h('i', { className: `fa-solid ${item.icon}` })),
            h('h4', null, item.title),
            h('p', null, item.desc)
          )
        )
      )
    ),
    // National Emergency Numbers
    h(
      'div',
      { className: 'emergency-hotlines-box' },
      h('h3', null, h('i', { className: 'fa-solid fa-phone-flip' }), ' Pan-India Emergency Speed Dial Directory'),
      h(
        'div',
        { className: 'hotlines-grid' },
        [
          { label: 'Rydo 24/7 Control Room', number: '1800-RYDO-BIKE', desc: 'Direct technical support & tow dispatch' },
          { label: 'National Highway Patrol', number: '1033', desc: 'Accident relief on all NH Expressways' },
          { label: 'Ambulance Emergency', number: '108 / 112', desc: 'All-India medical emergency support' },
          { label: 'Police Emergency', number: '100', desc: 'Immediate local police assistance' }
        ].map((hLine, idx) =>
          h(
            'div',
            { key: idx, className: 'hotline-card' },
            h('span', { className: 'hotline-label' }, hLine.label),
            h('a', { href: `tel:${hLine.number}`, className: 'hotline-number' }, hLine.number),
            h('p', null, hLine.desc)
          )
        )
      )
    )
  );
}

/* ==========================================================================
   16-H. INSTANT DIGITAL KYC & ZERO-DEPOSIT PORTAL (REACT)
   ========================================================================== */

function KycPage() {
  const [kyc, setKyc] = useState(StorageService.getKycStatus());
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [otp, setOtp] = useState('');
  const [otpCountdown, setOtpCountdown] = useState(30);

  const [formData, setFormData] = useState({
    name: 'Rahul Sharma',
    dlNumber: 'DL-04-2023-0098412',
    state: 'Delhi (NCT)',
    aadhaarLast4: '4829',
    dob: '1998-07-15'
  });

  useEffect(() => {
    let t;
    if (step === 3 && otpCountdown > 0) {
      t = setInterval(() => setOtpCountdown(c => c - 1), 1000);
    }
    return () => clearInterval(t);
  }, [step, otpCountdown]);

  function startScanning(e) {
    e.preventDefault();
    setIsScanning(true);
    setScanProgress(0);

    const intv = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          clearInterval(intv);
          setIsScanning(false);
          setStep(2); // OCR results
          ToastService.show('Driving License OCR scan completed successfully!');
          return 100;
        }
        return p + 20;
      });
    }, 200);
  }

  function proceedToOtp() {
    setStep(3);
    setOtpCountdown(30);
    ToastService.show('Simulated Aadhaar OTP sent: 4829');
  }

  function handleVerifyOtp(e) {
    e.preventDefault();
    if (otp !== '4829' && otp !== '1234') {
      ToastService.show('Invalid OTP code. Please enter 4829 for demo verification.', 'error');
      return;
    }

    const verifiedKyc = {
      verified: true,
      name: formData.name,
      dlNumber: formData.dlNumber,
      aadhaarLast4: formData.aadhaarLast4,
      verifiedDate: '2026-10-25',
      id: `RYDO-VIP-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };

    StorageService.setKycStatus(verifiedKyc);
    setKyc(verifiedKyc);
    setStep(4);
    ToastService.show('🎉 Verification Complete! Zero-Security Deposit VIP status granted.');
  }

  function handleResetKyc() {
    const emptyKyc = { verified: false, dlNumber: '', name: '', aadhaarLast4: '', verifiedDate: null };
    StorageService.setKycStatus(emptyKyc);
    setKyc(emptyKyc);
    setStep(1);
    ToastService.show('KYC profile reset for demo testing.');
  }

  return h(
    'div',
    { className: 'kyc-page-container' },
    h(
      'header',
      { className: 'page-heading' },
      h('div', { className: 'eyebrow' }, h('i', { className: 'fa-solid fa-id-card' }), ' 100% PAPERLESS VERIFICATION'),
      h('h1', null, 'Instant Digital KYC & Zero-Deposit Portal'),
      h('p', null, 'Verify your Indian Driving License and Aadhaar in 60 seconds to unlock Zero Security Deposit rides across all Indian cities.')
    ),
    kyc && kyc.verified
      ? // VERIFIED VIP BADGE CARD
        h(
          'div',
          { className: 'kyc-verified-vip-wrapper' },
          h(
            'div',
            { className: 'vip-card-glow', id: 'printable-vip-card' },
            h(
              'div',
              { className: 'vip-card-header' },
              h('div', { className: 'vip-brand' },
                h('i', { className: 'fa-solid fa-motorcycle', style: { marginRight: '8px', color: '#60a5fa' } }),
                'RYDO VIP RIDER ID'
              ),
              h('span', { className: 'vip-security-badge' }, h('i', { className: 'fa-solid fa-circle-check' }), ' ZERO-DEP VERIFIED')
            ),
            h(
              'div',
              { className: 'vip-card-body' },
              h('div', { className: 'vip-avatar-box' },
                h('span', null, kyc.name ? kyc.name.charAt(0) : 'R')
              ),
              h(
                'div',
                { className: 'vip-rider-info' },
                h('h3', null, kyc.name),
                h('p', null, `DL No: ${kyc.dlNumber}`),
                h('p', null, `Aadhaar Linked: **** **** ${kyc.aadhaarLast4}`),
                h('span', { className: 'vip-cert-date' }, `Verified on ${kyc.verifiedDate || '2026-10-25'}`)
              ),
              h(
                'div',
                { className: 'vip-qr-box' },
                h('i', { className: 'fa-solid fa-qrcode', style: { fontSize: '48px', color: '#1e293b' } }),
                h('small', null, kyc.id || 'RYDO-VIP-2026')
              )
            ),
            h(
              'div',
              { className: 'vip-card-footer' },
              h('span', null, 'Eligible for: Zero Deposit · Express 60-Sec Handover · All-India Highway Permit')
            )
          ),
          h(
            'div',
            { className: 'vip-actions-row' },
            h(
              'button',
              {
                type: 'button',
                className: 'btn-primary',
                onClick: () => window.print()
              },
              h('i', { className: 'fa-solid fa-print' }),
              ' Print / Save VIP Pass'
            ),
            h(
              'a',
              { href: 'home.html#bikes', className: 'btn-secondary' },
              'Book Zero-Deposit Bikes ',
              h('i', { className: 'fa-solid fa-arrow-right' })
            ),
            h(
              'button',
              {
                type: 'button',
                className: 'btn-secondary',
                onClick: handleResetKyc,
                title: 'Reset for testing'
              },
              h('i', { className: 'fa-solid fa-rotate-left' }),
              ' Reset Demo KYC'
            )
          )
        )
      : // KYC STEP WIZARD
        h(
          'div',
          { className: 'kyc-wizard-card' },
          // Step indicators
          h(
            'div',
            { className: 'kyc-steps-indicator' },
            [
              { num: 1, label: 'Document Details' },
              { num: 2, label: 'OCR Validation' },
              { num: 3, label: 'Aadhaar OTP' }
            ].map(s =>
              h(
                'div',
                { key: s.num, className: `kyc-step-pill${step === s.num ? ' is-active' : step > s.num ? ' is-done' : ''}` },
                h('span', { className: 'step-circle' }, step > s.num ? h('i', { className: 'fa-solid fa-check' }) : s.num),
                h('span', null, s.label)
              )
            )
          ),
          step === 1 &&
            h(
              'form',
              { onSubmit: startScanning, className: 'kyc-form' },
              h('h3', null, 'Step 1: Enter Driving License Information'),
              h('p', { className: 'step-sub' }, 'We cross-verify with Ministry of Road Transport & Highways (MoRTH) Parivahan database.'),
              h(
                'div',
                { className: 'modal-field' },
                h('label', null, 'Rider Full Name (as per DL)'),
                h('input', {
                  type: 'text',
                  value: formData.name,
                  onChange: e => setFormData({ ...formData, name: e.target.value }),
                  required: true
                })
              ),
              h(
                'div',
                { className: 'modal-form-grid' },
                h(
                  'div',
                  { className: 'modal-field' },
                  h('label', null, 'Driving License Number'),
                  h('input', {
                    type: 'text',
                    value: formData.dlNumber,
                    onChange: e => setFormData({ ...formData, dlNumber: e.target.value }),
                    required: true
                  })
                ),
                h(
                  'div',
                  { className: 'modal-field' },
                  h('label', null, 'Issue State / RTO'),
                  h('input', {
                    type: 'text',
                    value: formData.state,
                    onChange: e => setFormData({ ...formData, state: e.target.value }),
                    required: true
                  })
                )
              ),
              h(
                'div',
                { className: 'modal-form-grid' },
                h(
                  'div',
                  { className: 'modal-field' },
                  h('label', null, 'Aadhaar Number (Last 4 Digits)'),
                  h('input', {
                    type: 'text',
                    maxLength: 4,
                    value: formData.aadhaarLast4,
                    onChange: e => setFormData({ ...formData, aadhaarLast4: e.target.value }),
                    required: true
                  })
                ),
                h(
                  'div',
                  { className: 'modal-field' },
                  h('label', null, 'Date of Birth'),
                  h('input', {
                    type: 'date',
                    value: formData.dob,
                    onChange: e => setFormData({ ...formData, dob: e.target.value }),
                    required: true
                  })
                )
              ),
              isScanning
                ? h(
                    'div',
                    { className: 'scanning-progress-box' },
                    h('div', { className: 'scanner-line' }),
                    h('p', null, `Simulating High-Res OCR & DigiLocker Fetch (${scanProgress}%)...`),
                    h('div', { className: 'progress-track' },
                      h('div', { className: 'progress-fill', style: { width: `${scanProgress}%` } })
                    )
                  )
                : h(
                    'button',
                    { type: 'submit', className: 'btn-primary submit-kyc-btn' },
                    h('i', { className: 'fa-solid fa-camera' }),
                    ' Scan & Verify Driving License'
                  )
            ),
          step === 2 &&
            h(
              'div',
              { className: 'ocr-results-box' },
              h('div', { className: 'ocr-badge' }, h('i', { className: 'fa-solid fa-check' }), ' OCR MATCH CONFIRMED'),
              h('h3', null, 'Step 2: MoRTH Parivahan Database Verified'),
              h('p', null, 'Details matched with National Register of Driving Licenses.'),
              h(
                'div',
                { className: 'ocr-data-card' },
                h('div', { className: 'ocr-row' }, h('span', null, 'License Holder:'), h('strong', null, formData.name)),
                h('div', { className: 'ocr-row' }, h('span', null, 'Vehicle Class:'), h('strong', null, 'MCWG (Motorcycle With Gear)')),
                h('div', { className: 'ocr-row' }, h('span', null, 'DL Number:'), h('strong', null, formData.dlNumber)),
                h('div', { className: 'ocr-row' }, h('span', null, 'Status:'), h('span', { style: { color: '#10b981', fontWeight: '800' } }, '● ACTIVE & VALID'))
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'btn-primary',
                  onClick: proceedToOtp,
                  style: { width: '100%', marginTop: '16px' }
                },
                'Send Aadhaar OTP for Instant Zero-Deposit Clearance ',
                h('i', { className: 'fa-solid fa-arrow-right' })
              )
            ),
          step === 3 &&
            h(
              'form',
              { onSubmit: handleVerifyOtp, className: 'otp-verification-box' },
              h('div', { className: 'otp-icon' }, h('i', { className: 'fa-solid fa-mobile-screen-button' })),
              h('h3', null, 'Step 3: Enter 4-Digit Aadhaar OTP'),
              h('p', null, `Enter OTP sent to your Aadhaar-linked mobile (Demo OTP is 4829).`),
              h('input', {
                type: 'text',
                maxLength: 4,
                className: 'otp-digit-input',
                placeholder: '4829',
                value: otp,
                onChange: e => setOtp(e.target.value),
                required: true,
                autoFocus: true
              }),
              h('div', { className: 'otp-timer' },
                otpCountdown > 0 ? `Resend OTP in 00:${otpCountdown < 10 ? '0' : ''}${otpCountdown}` : 'OTP Expired'
              ),
              h(
                'button',
                { type: 'submit', className: 'btn-primary verify-btn', style: { width: '100%' } },
                h('i', { className: 'fa-solid fa-circle-check' }),
                ' Complete KYC & Unlock Zero Deposit'
              )
            )
        )
  );
}

/* ==========================================================================
   16-I. 24/7 HELP CENTER, FAQ DIRECTORY & TICKET DESK (REACT)
   ========================================================================== */

const FAQS_DATA = [
  {
    category: 'booking',
    q: 'How does self-drive bike rental work with Rydo?',
    a: 'Simply choose your pickup city and bike from our catalog, select dates, and confirm reservation. Bring your original Driving License and Aadhaar to the hub for a 60-second key handover!'
  },
  {
    category: 'deposit',
    q: 'Is there a security deposit on motorcycle rentals?',
    a: 'Zero security deposit applies to all verified riders! Complete digital KYC on our KYC Portal or upload Aadhaar at pickup to enjoy 100% zero deposit across all Indian hubs.'
  },
  {
    category: 'helmets',
    q: 'Are helmets and riding gear included?',
    a: 'Yes! Rydo provides 2 sanitized, ISI-certified helmets free with every rental. Touring jackets, riding gloves, and knee guards are available as optional add-ons.'
  },
  {
    category: 'breakdown',
    q: 'What happens if my bike breaks down or gets a puncture?',
    a: 'Our 24/7 Roadside Assistance network covers all major Indian highways, mountain passes, and cities. Open the Safety & SOS page to trigger the emergency beacon for mobile mechanic dispatch within 30 minutes.'
  },
  {
    category: 'cancellation',
    q: 'What is Rydo\'s cancellation and refund policy?',
    a: 'We offer 100% full refund for cancellations made up to 6 hours before scheduled pickup time. Instant refund is credited to your original payment method.'
  },
  {
    category: 'permits',
    q: 'Can I take a rented motorcycle across state borders?',
    a: 'Yes! All Rydo fleet motorcycles come equipped with valid all-India commercial permits and road taxes paid. You can freely tour from Mumbai to Goa or Manali to Leh.'
  }
];

function ContactPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIdx, setOpenFaqIdx] = useState(0);
  const [tickets, setTickets] = useState(StorageService.getSupportTickets());

  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    city: 'Bengaluru',
    category: 'Booking & Tariff',
    subject: '',
    message: ''
  });

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter(f => {
      const matchCat = activeCategory === 'all' || f.category === activeCategory;
      const matchQuery = !faqSearch || f.q.toLowerCase().includes(faqSearch.toLowerCase()) || f.a.toLowerCase().includes(faqSearch.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [activeCategory, faqSearch]);

  function handleTicketSubmit(e) {
    e.preventDefault();
    if (!ticketForm.name || !ticketForm.email || !ticketForm.message) {
      ToastService.show('Please complete all required fields.', 'error');
      return;
    }

    const newTicket = {
      id: `TKT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      category: ticketForm.category,
      status: 'Open',
      subject: ticketForm.subject || ticketForm.category,
      city: ticketForm.city
    };

    const updated = StorageService.addSupportTicket(newTicket);
    setTickets(updated);
    setTicketForm({ name: '', email: '', city: 'Bengaluru', category: 'Booking & Tariff', subject: '', message: '' });
    ToastService.show(`Support ticket ${newTicket.id} generated! Our team will respond within 2 hours.`);
  }

  return h(
    'div',
    { className: 'contact-page-container' },
    h(
      'header',
      { className: 'page-heading' },
      h('div', { className: 'eyebrow' }, h('i', { className: 'fa-solid fa-headset' }), ' 24/7 CUSTOMER CARE'),
      h('h1', null, 'Help Center & Rider Support'),
      h('p', null, 'Find quick answers to common rental questions, raise an instant support ticket, or connect directly with our pickup stations across India.')
    ),
    // Contact Cards Grid
    h(
      'div',
      { className: 'contact-channels-grid' },
      h(
        'div',
        { className: 'contact-channel-card' },
        h('div', { className: 'channel-icon' }, h('i', { className: 'fa-solid fa-phone-volume' })),
        h('h3', null, 'Toll-Free Helpline'),
        h('p', null, 'Available 24 hours a day, 7 days a week for immediate roadside and reservation support.'),
        h('a', { href: 'tel:1800-RYDO-BIKE', className: 'channel-link' }, '1800-RYDO-BIKE')
      ),
      h(
        'div',
        { className: 'contact-channel-card' },
        h('div', { className: 'channel-icon' }, h('i', { className: 'fa-solid fa-envelope' })),
        h('h3', null, 'Email Support'),
        h('p', null, 'For formal invoice inquiries, corporate bookings, and refund tracking.'),
        h('a', { href: 'mailto:support@rydo.in', className: 'channel-link' }, 'support@rydo.in')
      ),
      h(
        'div',
        { className: 'contact-channel-card' },
        h('div', { className: 'channel-icon' }, h('i', { className: 'fa-brands fa-whatsapp' })),
        h('h3', null, 'WhatsApp Hotline'),
        h('p', null, 'Quick document check, location pins, and key handover coordination.'),
        h('a', { href: 'https://wa.me/919876543210', target: '_blank', rel: 'noreferrer', className: 'channel-link' }, '+91 98765 43210')
      )
    ),
    // FAQs Accordion Section
    h(
      'section',
      { className: 'faqs-section' },
      h('div', { className: 'section-header' },
        h('div', null,
          h('h3', null, h('i', { className: 'fa-solid fa-circle-question' }), ' Frequently Asked Questions'),
          h('p', null, 'Everything you need to know about our self-drive bike rental terms.')
        )
      ),
      // Search and Filter Pills
      h(
        'div',
        { className: 'faq-controls-row' },
        h(
          'div',
          { className: 'faq-search-input-wrap' },
          h('i', { className: 'fa-solid fa-magnifying-glass' }),
          h('input', {
            type: 'text',
            placeholder: 'Search questions about KYC, deposit, fuel, helmets...',
            value: faqSearch,
            onChange: e => setFaqSearch(e.target.value)
          })
        ),
        h(
          'div',
          { className: 'faq-cat-pills' },
          [
            { id: 'all', label: 'All FAQs' },
            { id: 'booking', label: 'Bookings' },
            { id: 'deposit', label: 'Zero Deposit' },
            { id: 'breakdown', label: 'Breakdown & SOS' },
            { id: 'cancellation', label: 'Refunds' }
          ].map(p =>
            h(
              'button',
              {
                key: p.id,
                type: 'button',
                className: `category-pill${activeCategory === p.id ? ' is-active' : ''}`,
                onClick: () => setActiveCategory(p.id)
              },
              p.label
            )
          )
        )
      ),
      h(
        'div',
        { className: 'faq-accordion-list' },
        filteredFaqs.map((faq, idx) => {
          const isOpen = openFaqIdx === idx;
          return h(
            'div',
            { key: idx, className: `faq-accordion-item${isOpen ? ' is-open' : ''}` },
            h(
              'button',
              {
                type: 'button',
                className: 'faq-question-btn',
                onClick: () => setOpenFaqIdx(isOpen ? -1 : idx)
              },
              h('span', null, faq.q),
              h('i', { className: `fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}` })
            ),
            isOpen ? h('div', { className: 'faq-answer-body' }, h('p', null, faq.a)) : null
          );
        })
      )
    ),
    // Ticket Submission Form & Recent Tickets Row
    h(
      'section',
      { className: 'ticket-desk-section' },
      h(
        'div',
        { className: 'ticket-grid' },
        h(
          'form',
          { onSubmit: handleTicketSubmit, className: 'ticket-form-card' },
          h('h3', null, h('i', { className: 'fa-solid fa-ticket' }), ' Raise an Instant Support Ticket'),
          h('p', null, 'Fill in your inquiry details and receive an immediate reference tracking number.'),
          h(
            'div',
            { className: 'modal-form-grid' },
            h(
              'div',
              { className: 'modal-field' },
              h('label', null, 'Your Full Name'),
              h('input', {
                type: 'text',
                value: ticketForm.name,
                onChange: e => setTicketForm({ ...ticketForm, name: e.target.value }),
                required: true
              })
            ),
            h(
              'div',
              { className: 'modal-field' },
              h('label', null, 'Email Address'),
              h('input', {
                type: 'email',
                value: ticketForm.email,
                onChange: e => setTicketForm({ ...ticketForm, email: e.target.value }),
                required: true
              })
            )
          ),
          h(
            'div',
            { className: 'modal-form-grid' },
            h(
              'div',
              { className: 'modal-field' },
              h('label', null, 'Pickup Hub City'),
              h('select', { value: ticketForm.city, onChange: e => setTicketForm({ ...ticketForm, city: e.target.value }) },
                CITIES_DATA.map(c => h('option', { key: c.id, value: c.name }, c.name))
              )
            ),
            h(
              'div',
              { className: 'modal-field' },
              h('label', null, 'Issue Category'),
              h('select', { value: ticketForm.category, onChange: e => setTicketForm({ ...ticketForm, category: e.target.value }) },
                ['Booking & Tariff', 'KYC & License Help', 'Refund & Invoice', 'Roadside Assistance', 'Corporate Fleet'].map(opt =>
                  h('option', { key: opt, value: opt }, opt)
                )
              )
            )
          ),
          h(
            'div',
            { className: 'modal-field' },
            h('label', null, 'Subject'),
            h('input', {
              type: 'text',
              placeholder: 'Brief summary of issue',
              value: ticketForm.subject,
              onChange: e => setTicketForm({ ...ticketForm, subject: e.target.value })
            })
          ),
          h(
            'div',
            { className: 'modal-field' },
            h('label', null, 'Detailed Message'),
            h('textarea', {
              rows: 4,
              placeholder: 'Describe your query or requirement...',
              value: ticketForm.message,
              onChange: e => setTicketForm({ ...ticketForm, message: e.target.value }),
              className: 'review-textarea',
              required: true
            })
          ),
          h(
            'button',
            { type: 'submit', className: 'btn-primary', style: { width: '100%', marginTop: '10px' } },
            h('i', { className: 'fa-solid fa-paper-plane' }),
            ' Submit Support Ticket'
          )
        ),
        // Recent Tickets List
        h(
          'div',
          { className: 'recent-tickets-card' },
          h('h3', null, h('i', { className: 'fa-solid fa-clock-rotate-left' }), ' Your Recent Support Tickets'),
          h('p', null, 'Track resolution status for inquiries submitted from this browser.'),
          tickets.length > 0
            ? h(
                'div',
                { className: 'tickets-list' },
                tickets.map(t =>
                  h(
                    'div',
                    { key: t.id, className: 'ticket-item' },
                    h('div', { className: 'ticket-item-top' },
                      h('span', { className: 'tkt-id' }, t.id),
                      h('span', { className: `tkt-status-badge ${t.status ? t.status.toLowerCase() : 'open'}` }, t.status || 'Open')
                    ),
                    h('h4', null, t.subject || t.category),
                    h('p', null, `${t.category} · ${t.city} · ${t.date}`)
                  )
                )
              )
            : h(
                'div',
                { className: 'no-tickets-box' },
                h('i', { className: 'fa-solid fa-inbox' }),
                h('p', null, 'No support tickets raised yet.')
              )
        )
      )
    )
  );
}

document.addEventListener('DOMContentLoaded', () => {
  // Sync initial theme
  const initialTheme = StorageService.getTheme();
  if (initialTheme === 'dark') {
    document.body.classList.add('theme-dark');
    const toggle = document.getElementById('themeToggle');
    if (toggle) toggle.checked = true;
  }

  // Mount Global Toasts
  const toastContainer = document.createElement('div');
  toastContainer.id = 'toast-root';
  document.body.appendChild(toastContainer);
  ReactDOM.createRoot(toastContainer).render(h(ToastContainer));

  // Mount Navbar
  const navbarRoot = document.getElementById('navbar-root');
  if (navbarRoot) {
    ReactDOM.createRoot(navbarRoot).render(h(Navbar));
  }

  // Mount Routes Page
  const routesRoot = document.getElementById('routes-root');
  if (routesRoot) {
    ReactDOM.createRoot(routesRoot).render(h(RoutesPage));
  }

  // Mount Loyalty Rewards Page
  const loyaltyRoot = document.getElementById('loyalty-root');
  if (loyaltyRoot) {
    ReactDOM.createRoot(loyaltyRoot).render(h(LoyaltyPage));
  }

  // Mount Safety & SOS Page
  const safetyRoot = document.getElementById('safety-root');
  if (safetyRoot) {
    ReactDOM.createRoot(safetyRoot).render(h(SafetyPage));
  }

  // Mount KYC Page
  const kycRoot = document.getElementById('kyc-root');
  if (kycRoot) {
    ReactDOM.createRoot(kycRoot).render(h(KycPage));
  }

  // Mount Contact Page
  const contactRoot = document.getElementById('contact-root');
  if (contactRoot) {
    ReactDOM.createRoot(contactRoot).render(h(ContactPage));
  }

  // Mount Booking Search Form
  const bookingFormRoot = document.getElementById('booking-form-root');
  if (bookingFormRoot) {
    ReactDOM.createRoot(bookingFormRoot).render(h(BookingSearchForm));
  }

  // Mount Interactive Fleet Catalog
  const fleetRoot = document.getElementById('fleet-root');
  if (fleetRoot) {
    ReactDOM.createRoot(fleetRoot).render(h(FleetCatalog));
  }

  // Mount Fuel & Trip Cost Calculator
  const fuelCalcRoot = document.getElementById('fuel-calculator-root');
  if (fuelCalcRoot) {
    ReactDOM.createRoot(fuelCalcRoot).render(h(FuelEstimator));
  }

  // Mount Reviews Section
  const reviewsRoot = document.getElementById('reviews-root');
  if (reviewsRoot) {
    ReactDOM.createRoot(reviewsRoot).render(h(ReviewsSection));
  }

  // Mount Floating AI Assistant Chatbot
  const chatContainer = document.createElement('div');
  chatContainer.id = 'chat-root';
  document.body.appendChild(chatContainer);
  ReactDOM.createRoot(chatContainer).render(h(RydoAssistant));

  // Mount Deals Hub
  const dealsRoot = document.getElementById('deals-root');
  if (dealsRoot) {
    ReactDOM.createRoot(dealsRoot).render(h(DealsHub));
  }

  // Mount Cities Hub
  const citiesRoot = document.getElementById('cities-root');
  if (citiesRoot) {
    ReactDOM.createRoot(citiesRoot).render(h(CitiesHub));
  }

  // Mount Auth Page
  const authRoot = document.getElementById('auth-root');
  if (authRoot) {
    ReactDOM.createRoot(authRoot).render(h(AuthPage));
  }

  // Mount Pan-India Station Radar (home page only)
  const stationRadarRoot = document.getElementById('station-radar-root');
  if (stationRadarRoot) {
    ReactDOM.createRoot(stationRadarRoot).render(h(StationRadarHub));
  }

  // Mount Cockpit Simulator (home page only)
  const cockpitRoot = document.getElementById('cockpit-simulator-root');
  if (cockpitRoot) {
    ReactDOM.createRoot(cockpitRoot).render(h(CockpitSimulator));
  }

  // Mount Live Booking Ticker (home page only)
  const hasFleet = document.getElementById('fleet-root');
  if (hasFleet) {
    const tickerContainer = document.createElement('div');
    tickerContainer.id = 'live-ticker-root';
    document.body.appendChild(tickerContainer);
    ReactDOM.createRoot(tickerContainer).render(h(LiveBookingTicker));
  }

  // Mount Smart Ride Matcher trigger button in Navbar (home page)
  const matcherTriggerEl = document.getElementById('smart-matcher-trigger-root');
  if (matcherTriggerEl) {
    function MatcherTriggerButton() {
      const [open, setOpen] = useState(false);
      return h(
        React.Fragment,
        null,
        h(
          'button',
          {
            type: 'button',
            className: 'btn-smart-matcher-trigger',
            onClick: () => setOpen(true),
            title: 'AI Smart Ride Matcher'
          },
          h('i', { className: 'fa-solid fa-wand-magic-sparkles' }),
          ' Match My Ride'
        ),
        open ? h(SmartRideMatcher, { onClose: () => setOpen(false) }) : null
      );
    }
    ReactDOM.createRoot(matcherTriggerEl).render(h(MatcherTriggerButton));
  }

  // Interactive Coupon Click-to-Copy in static sections (e.g. home.html)
  document.querySelectorAll('.coupon-code').forEach(el => {
    el.style.cursor = 'pointer';
    el.title = 'Click to copy coupon code';
    el.addEventListener('click', () => {
      const code = el.textContent.trim();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code);
      }
      ToastService.show(`Coupon ${code} copied to clipboard!`);
    });
  });

  // Interactive City Cards in static sections (e.g. home.html)
  document.querySelectorAll('.demo-city').forEach(card => {
    card.style.cursor = 'pointer';
    card.title = 'Click to view bikes in this city';
    card.addEventListener('click', () => {
      const titleEl = card.querySelector('h3');
      const cityName = titleEl ? titleEl.textContent.trim() : '';
      if (cityName.toLowerCase() === 'all cities') {
        window.dispatchEvent(new CustomEvent('rydo:search-filter', { detail: { city: '' } }));
        const fleetElem = document.getElementById('bikes');
        if (fleetElem) fleetElem.scrollIntoView({ behavior: 'smooth' });
        ToastService.show('Showing bikes for all Indian cities');
        return;
      }
      const cityMap = {
        'bengaluru': 'bengaluru',
        'goa': 'goa',
        'new delhi': 'delhi',
        'mumbai': 'mumbai',
        'leh ladakh': 'leh'
      };
      const cityKey = cityMap[cityName.toLowerCase()] || '';
      if (cityKey) {
        window.dispatchEvent(new CustomEvent('rydo:search-filter', { detail: { city: cityKey } }));
        const fleetElem = document.getElementById('bikes');
        if (fleetElem) fleetElem.scrollIntoView({ behavior: 'smooth' });
        ToastService.show(`Filtering fleet for ${cityName}`);
      } else {
        window.location.href = `cities.html`;
      }
    });
  });
});
