# Sri Lanka Heritage - Website Project

A single-page website showcasing Sri Lanka's rich traditions, culture, tourist destinations, festivals, and cuisine. Built with vanilla HTML, CSS, and JavaScript.

## Project Structure

```
Sri-Lanka-Heritage/
├── index.html          # Main HTML file (single page)
├── css/
│   └── style.css       # All styles (991 lines)
├── js/
│   └── script.js       # All JavaScript functionality (118 lines)
├── Image/              # Hero slideshow images (user must add)
│   ├── Sigiriya.jfif
│   ├── The Ancient Rock Fortress of Sigiriya.jfif
│   ├── Anuradhapura.jfif
│   ├── Siripadaya, Sri Lanka.jfif
│   ├── Mirissa Srilanka.jfif
│   └── sri lanka.jfif
├── README.md
└── AGENTS.md           # This file
```

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties (CSS variables), Grid, Flexbox, animations
- **JavaScript** - Vanilla ES6+, no frameworks
- **Font Awesome 6.5** - Icons (via CDN)
- **Google Fonts** - Poppins + Noto Sans Sinhala (via CDN)

## Color Theme (Blue)

| Variable | Value | Usage |
|----------|-------|-------|
| `--primary` | `#1565C0` | Main blue, buttons, badges |
| `--primary-dark` | `#0D47A1` | Hover states, darker accents |
| `--primary-light` | `#42A5F5` | Subtitles, hover highlights |
| `--secondary` | `#0d1b2a` | Dark navy, headings |
| `--accent` | `#00bcd4` | Teal accent (reserved) |
| `--dark` | `#0a1929` | Footer bg, hero overlay |
| `--light` | `#f0f4f8` | Section backgrounds |

## Website Sections

### 1. Header / Navigation
- Fixed top navbar with logo (Sri Lanka Coat of Arms from Wikipedia)
- Nav links: Home, Traditions, Tourist Places, Festivals, Food, Contact
- Mobile hamburger menu with slide-in nav panel
- Active link highlighting on scroll

### 2. Hero Section (Slideshow)
- Full viewport height (`100vh`)
- 6-image background slideshow (auto-rotates every 4 seconds)
- Glassmorphism content card with backdrop blur
- Gradient overlay on images
- **Requires local images in `Image/` folder**

### 3. About Sri Lanka (Intro)
- Light blue gradient background (`#e3f2fd` to `#bbdefb`)
- 3 paragraphs of introductory text
- 4 stat boxes in a 2x2 grid:
  - 3000+ Years of History
  - 8 UNESCO World Heritage Sites
  - 2 Official Languages (Sinhala & Tamil)
  - 22M Population

### 4. Traditions & Culture
- 6 tradition cards in a 3-column grid
- Each card has: icon, title, description, highlights list
- Traditions covered:
  1. Sinhala & Tamil New Year
  2. Vesak Festival
  3. Esala Perahera (Kandy)
  4. Sri Lankan Dance Forms (Kandyan, Pahatharata, Sabaragamuwa)
  5. Sri Lankan Painting & Art
  6. Hospitality & Greeting Customs
- Fade-in scroll animation on cards
- Top border animation on hover

### 5. Major Festivals
- Dark background section with glassmorphism cards
- 9 festival cards in a 3-column grid
- Monthly festivals listed:
  - Jan: Duruthu Poya
  - Feb: Navam Poya
  - Mar: Maha Shivaratri
  - Apr: Sinhala / Tamil New Year
  - May: Vesak Poya
  - Jun: Poson Poya
  - Jul/Aug: Esala Perahera
  - Oct: Deepavali
  - Dec: National Day

### 6. Tourist Places
- Light gray background section
- 25 place cards in a 3-column grid
- Each card has: image (Wikipedia), badge, title, province, description, tags
- Places covered:
  - Sigiriya (Lion Rock) - UNESCO Heritage
  - Sri Dalada Maligawa (Temple of the Tooth) - UNESCO Heritage
  - Galle Fort - UNESCO Heritage
  - Yala National Park - Wildlife
  - Ella - Hill Country
  - Anuradhapura Ancient City - UNESCO Heritage
  - Polonnaruwa Ancient City - UNESCO Heritage
  - Pinnawala Elephant Orphanage - Wildlife
  - Dambulla Cave Temple - UNESCO Heritage
  - Nuwara Eliya - Hill Country
  - Mirissa Beach - Beach
  - Kandy - UNESCO Heritage
  - Trincomalee - Beach
  - Adam's Peak (Sri Pada) - Sacred
  - Bentota - Beach
  - Udawalawe National Park - Wildlife
  - Colombo - City
  - Arugam Bay - Beach
  - Jaffna - Culture
  - Kitulgala - Adventure
  - Horton Plains National Park - Nature
  - Mihintale - Sacred
  - Kataragama - Sacred
  - Unawatuna Beach - Beach
  - Batticaloa - Beach
- Images loaded from Wikimedia Commons (external URLs)
- Badge types: UNESCO Heritage, Wildlife, Hill Country, Beach, Sacred, City, Culture, Adventure, Nature

### 7. Sri Lankan Cuisine
- 6 food cards in a 3-column grid
- Foods covered:
  1. Rice & Curry
  2. Hoppers (Appa)
  3. Kottu Roti
  4. Kavum (Oil Cakes)
  5. Ceylon Tea
  6. Sambol

### 8. Contact Section
- Dark background with glassmorphism
- Left side: Contact info (email, phone, address) + social media icons
  - Email: info@srilankaheritage.lk
  - Phone: +94 11 234 5678
  - Address: Sri Lanka Tourism Promotion Bureau, Colombo
  - Social: Facebook, Instagram, YouTube, Twitter, WhatsApp
- Right side: Contact form (Name, Email, Subject, Message + Send button)

### 9. Footer
- Dark background (#0a0a15)
- 3-column layout:
  - About section with tagline
  - Quick links (same as nav)
  - Newsletter subscription form
- Copyright: 2026 Sri Lanka Heritage

### 10. Back to Top Button
- Fixed bottom-right circular button
- Appears after scrolling 400px
- Smooth scroll to top on click

## JavaScript Features

| Feature | Description |
|---------|-------------|
| Hero Slideshow | Auto-rotates every 4s with fade transitions |
| Mobile Nav Toggle | Hamburger menu open/close with X animation |
| Active Nav Scroll | Highlights current section in nav on scroll |
| Header Scroll Effect | Enhanced shadow on scroll |
| Back to Top | Shows/hides button based on scroll position |
| Fade-in Animation | Elements fade in when entering viewport |
| Contact Form | Prevents default submit, shows alert, resets form |
| Newsletter Form | Prevents default submit, shows alert, resets form |

## CSS Features

- CSS Custom Properties (variables) for theming
- CSS Grid for section layouts (3-column, 2-column, 1-column)
- Flexbox for component alignment
- Glassmorphism effects (backdrop-filter, rgba backgrounds)
- Smooth transitions and hover effects
- Responsive design with 3 breakpoints: 1024px, 768px, 480px
- Fade-in scroll animation (opacity + transform)
- Top border animation on tradition cards
- Image zoom on hover (place cards)

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|---------------|
| > 1024px | 3-column grids |
| 768px - 1024px | 2-column grids |
| < 768px | Single column, hamburger menu, stacked footer |
| < 480px | Further reduced hero title size |

## How to Run

1. Open `index.html` in a browser (or use Live Server in VS Code)
2. Add hero slideshow images to the `Image/` folder with exact filenames matching the HTML references
3. Place images load from Wikipedia/Wikimedia Commons (requires internet)

## Notes

- No build tools required - pure vanilla HTML/CSS/JS
- No backend - forms show alert messages only
- Social media links are placeholder (`#`)
- Hero images must be added locally by the user
- Place card images use external Wikipedia URLs (require internet connection)
- Copyright year is set to 2026
