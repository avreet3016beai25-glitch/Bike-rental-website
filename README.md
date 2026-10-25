# Rydo Bike Rental Website

Rydo is a responsive front-end demo for exploring bike rentals, pickup cities, offers, and road-trip features across India. The site is built with HTML, CSS, and React 18 loaded from CDNs; it does not require a build step or package installation.

## Pages

| File | Description |
| --- | --- |
| `index.html` | Branded video loading page and entry point |
| `home.html` | Main page with bike search, fleet, booking, and interactive ride tools |
| `deals.html` | Rental offers and coupon codes |
| `cities.html` | Pickup cities and location details |
| `routes.html` | Featured motorcycle routes and elevation profiles |
| `loyalty.html` | Rider points, tiers, badges, and rewards |
| `safety.html` | Safety information and SOS demo |
| `kyc.html` | Identity verification flow demo |
| `contact.html` | FAQs and support-ticket demo |
| `login.html` | Sign-in and registration demo |
| `loading.html` | Alternate branded loading page |

## Features

- Responsive layouts with light and dark theme support.
- Search and filter the bike fleet by city, category, and favorites; compare bikes.
- Interactive booking flow with date validation, add-ons, promo codes, booking history, and printable invoices.
- Fuel-cost estimator, customer reviews, and a ride-help assistant.
- City and station information, deal listings, and route planning.
- Cockpit simulator, ride matcher, loyalty rewards, KYC, safety, and contact-page demos.
- Browser local storage for demo preferences and data such as bookings, reviews, and account state.

This is a front-end demonstration. Authentication, reservations, payments, KYC, and support tickets are not connected to a production backend.

## Run locally

No dependencies need to be installed. Serve the project directory with Python:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000/> to load `index.html`, or visit <http://localhost:8000/home.html> directly. VS Code Live Server can also be used.

## Media files

Keep the video files and `bike.jpeg` beside the HTML files so local media references continue to work. The `.mp4` assets are stored with Git LFS. When cloning the repository, install Git LFS before cloning or run:

```powershell
git lfs install
git lfs pull
```

## External resources

Google Fonts, Font Awesome, React 18, and ReactDOM are loaded from CDNs. An internet connection is needed for these resources.
