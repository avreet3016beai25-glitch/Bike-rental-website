# Rydo Bike Rental Web

Rydo is a responsive static website concept for discovering and renting bikes across India.

## Pages

- `loading.html` - Branded loading screen that redirects to the home page after three seconds.
- `home.html` - Main landing page with the bike catalogue, booking-focused sections, theme controls, and navigation.
- `deals.html` - Promotional offers, including weekend discounts and zero-deposit EV scooter rentals.
- `cities.html` - Available pickup locations across India.

## Features

- Responsive layouts for desktop and mobile screens.
- Light and dark theme support on the home page.
- Bike rental catalogue with location and booking controls.
- Promotional deals and city pickup hubs.
- Video-backed visual sections with local fallback poster imagery.
- Google Fonts and Font Awesome icons loaded through CDN links.

## Project Structure

```text
.
├── home.html
├── loading.html
├── deals.html
├── cities.html
├── bike.jpeg
├── realistic_motorbike_in_mountai.mp4
└── make_another_video_of_a_hilly.mp4
```

## Run Locally

No installation or build step is required.

### Option 1: Open directly

Open `loading.html` in a browser. It will redirect to `home.html` automatically.

### Option 2: Use a local server

From the project directory, run one of these commands:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000/loading.html](http://localhost:8000/loading.html).

If Python is not installed, the VS Code Live Server extension can also serve the files.

## Notes

- Internet access is needed for the Google Fonts and Font Awesome CDN resources.
- The login, signup, and booking links are currently presentation links and do not connect to a backend.
- Keep the media filenames beside the HTML files so the video backgrounds and poster image continue to load.

