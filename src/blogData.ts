/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Blog content for Urban Yatras. Posts are cross-linked to real packages in
 * data.ts via `relatedDestinationIds` (destination `id`s), so the blog drives
 * traffic straight into bookable itineraries.
 */

import type { BlogBlock, BlogCategory, BlogPost } from "./types";

// Unsplash host is whitelisted in next.config.ts. All photo IDs below were
// verified to return HTTP 200 before use.
const hero = (id: string) => `https://images.unsplash.com/${id}?q=80&w=1600&auto=format&fit=crop`;
const inline = (id: string) => `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

const AUTHOR = "Urban Yatras Travel Desk";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Destinations",
  "Travel Tips",
  "Spiritual",
  "Adventure",
  "Family",
  "Honeymoon",
  "Wildlife",
  "Seasonal",
];

// Shared closing CTA block reused across posts.
const cta = (destination: string): BlogBlock => ({
  type: "tip",
  title: "Plan it with Urban Yatras",
  text: `Ready to travel? Our team builds fully customised ${destination} packages with verified stays, registered transport and transparent pricing. Share your dates using the enquiry form below and we will send a tailored itinerary within 24 hours.`,
});

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "kashmir-tour-guide",
    title: "Kashmir Tour Guide: Best Time, Places to Visit & 6-Day Itinerary",
    metaTitle: "Kashmir Tour Guide 2026: Best Time, Places & Itinerary",
    metaDescription:
      "Planning a Kashmir trip? Discover the best time to visit, top places in Srinagar, Gulmarg, Pahalgam & Sonmarg, budget tips and a ready 6-day Kashmir itinerary.",
    excerpt:
      "From Dal Lake shikaras to the Gulmarg Gondola, here is everything an Indian traveller needs to plan the perfect Kashmir holiday.",
    category: "Destinations",
    tags: ["Kashmir", "Srinagar", "Gulmarg", "Honeymoon", "Mountains"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg/3840px-Dal_Lake_Hazratbal_Srinagar.jpg",
    heroAlt: "Snow-capped mountains reflected in a calm Kashmir lake",
    author: AUTHOR,
    publishDate: "2025-11-04",
    readMinutes: 8,
    relatedDestinationIds: ["srinagar-kashmir", "gulmarg-snow"],
    featured: true,
    content: [
      { type: "paragraph", text: "Often called 'Paradise on Earth', Kashmir is the destination most Indian families dream of at least once. Alpine meadows, houseboats on mirror-still lakes, saffron fields and Mughal gardens make it a year-round favourite for honeymooners, families and photographers alike. This guide covers the best time to go, the places you should not miss, and a practical 6-day itinerary you can book directly." },
      { type: "heading", text: "Best time to visit Kashmir" },
      { type: "paragraph", text: "Kashmir is beautiful in every season, but what you experience changes completely. March to May brings blooming tulips and pleasant days. June to August is ideal for families escaping the plains' heat. September to November paints the Chinar trees gold. December to February is peak snow season — perfect for first-time snow experiences in Gulmarg and Pahalgam." },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Ancient_Temple%2C_Gulmarg.jpg", alt: "Alpine meadow and pine forest in the Kashmir valley", caption: "The meadows around Pahalgam and Gulmarg stay lush from June to September." },
      { type: "heading", text: "Top places to visit" },
      { type: "list", items: [
        "Srinagar — Dal Lake shikara ride, floating markets, Mughal gardens (Nishat & Shalimar) and the old city.",
        "Gulmarg — Asia's highest cable car (Gondola) to Apharwat Peak, snow sports and grassy golf meadows.",
        "Pahalgam — the Betaab and Aru valleys, riverside walks and pony rides to Baisaran.",
        "Sonmarg — the 'meadow of gold' and gateway to the Thajiwas Glacier.",
      ] },
      { type: "heading", text: "Suggested 6-day Kashmir itinerary" },
      { type: "list", ordered: true, items: [
        "Day 1: Arrive Srinagar, Mughal gardens, evening shikara ride on Dal Lake.",
        "Day 2: Day trip to Gulmarg, Gondola ride to Apharwat.",
        "Day 3: Pahalgam via saffron fields and Awantipora ruins.",
        "Day 4: Aru & Betaab valleys, leisure by the Lidder river.",
        "Day 5: Sonmarg day trip, Thajiwas Glacier.",
        "Day 6: Local shopping (Pashmina, walnut wood, dry fruits), departure.",
      ] },
      { type: "tip", title: "Local tips", text: "Carry layered clothing even in summer, keep a valid photo ID for permits near glaciers, and pre-book houseboats in peak season. Pure-vegetarian and Jain meal options are widely available in Srinagar." },
      { type: "heading", text: "How to reach & budget" },
      { type: "paragraph", text: "Srinagar has direct flights from Delhi, Mumbai and other metros. A comfortable 6-day family trip typically starts around ₹18,000–₹25,000 per person on a twin-sharing basis, depending on season and hotel category. Winter and tulip season command a premium, so book early." },
      cta("Kashmir"),
    ],
  },
  {
    slug: "rajasthan-road-trip-itinerary",
    title: "Rajasthan Road Trip: Jaipur, Jodhpur, Udaipur & Jaisalmer in 10 Days",
    metaTitle: "Rajasthan Road Trip Itinerary: 10 Days Across the Royal Cities",
    metaDescription:
      "A complete Rajasthan road trip itinerary covering Jaipur, Jodhpur, Udaipur and Jaisalmer — forts, palaces, desert camps, best time to visit and budget tips.",
    excerpt:
      "Pink City palaces, the blue lanes of Jodhpur, lake-side Udaipur and golden desert nights — plan the ultimate royal Rajasthan circuit.",
    category: "Destinations",
    tags: ["Rajasthan", "Jaipur", "Udaipur", "Jaisalmer", "Heritage"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
    heroAlt: "Grand Rajasthan fort rising above a desert city",
    author: AUTHOR,
    publishDate: "2025-11-12",
    readMinutes: 9,
    relatedDestinationIds: ["jaipur-heritage", "jodhpur-blue", "udaipur-lake", "jaisalmer-golden"],
    featured: true,
    content: [
      { type: "paragraph", text: "No Indian state delivers royalty quite like Rajasthan. Towering forts, mirror-worked palaces, folk music under desert skies and some of the country's best street food make it a bucket-list circuit for domestic travellers. Here is a proven 10-day road trip linking the four most iconic cities." },
      { type: "heading", text: "Best time to visit Rajasthan" },
      { type: "paragraph", text: "October to March is ideal, with pleasant days perfect for fort-hopping and cool desert nights. Avoid April to June when temperatures soar. If you enjoy festivals, time your trip with the Pushkar Fair or the Jaisalmer Desert Festival." },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/9/99/Mehrangarh_Fort_sanhita.jpg", alt: "Camel silhouettes on golden sand dunes at sunset in Rajasthan", caption: "Sunset camel safaris in the Thar Desert near Jaisalmer are a trip highlight." },
      { type: "heading", text: "The 10-day royal circuit" },
      { type: "list", ordered: true, items: [
        "Days 1–3: Jaipur — Amber Fort, Hawa Mahal, City Palace and bazaars.",
        "Day 4: Drive to Jodhpur via Ajmer/Pushkar.",
        "Days 5–6: Jodhpur — Mehrangarh Fort and the blue old city.",
        "Day 7: Jaisalmer — Sonar Quila and havelis.",
        "Day 8: Sam Sand Dunes desert camp with folk performances.",
        "Days 9–10: Udaipur — Lake Pichola, City Palace, sunset boat ride.",
      ] },
      { type: "tip", title: "Road trip tip", text: "Roads between the cities are excellent, but distances are long (250–300 km stretches). Start early, pre-book a reliable driver-cum-guide, and keep buffer time for photo stops at stepwells and forts." },
      { type: "heading", text: "Budget & bookings" },
      { type: "paragraph", text: "A well-planned 10-day Rajasthan trip generally starts around ₹22,000–₹35,000 per person, depending on heritage-hotel choices. Book desert camps and palace hotels well in advance during peak season." },
      cta("Rajasthan"),
    ],
  },
  {
    slug: "kerala-backwaters-houseboat-guide",
    title: "Kerala Backwaters & Houseboat Guide: Alleppey, Munnar & Varkala",
    metaTitle: "Kerala Backwaters Guide: Houseboats, Munnar & Best Itinerary",
    metaDescription:
      "Everything about a Kerala trip — Alleppey houseboats, Munnar tea gardens, Varkala cliffs, best time to visit, houseboat costs and a relaxed 6-day itinerary.",
    excerpt:
      "Glide through palm-fringed backwaters, wake up in a houseboat and sip fresh tea in the Munnar hills — Kerala is India's most soothing escape.",
    category: "Destinations",
    tags: ["Kerala", "Alleppey", "Munnar", "Backwaters", "Honeymoon"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Alappuzha_Boat_Beauty_W.jpg",
    heroAlt: "Traditional houseboat cruising through Kerala backwaters",
    author: AUTHOR,
    publishDate: "2025-11-18",
    readMinutes: 7,
    relatedDestinationIds: ["alleppey-boat", "munnar-hills", "varkala-cliff"],
    featured: false,
    content: [
      { type: "paragraph", text: "'God's Own Country' lives up to its name. Kerala pairs serene backwaters with misty tea hills, Ayurvedic wellness and a coastline dotted with cliffs and beaches. It is ideal for honeymooners, families and anyone craving slow travel." },
      { type: "heading", text: "Best time to visit Kerala" },
      { type: "paragraph", text: "September to March offers the most comfortable weather. The monsoon (June–August) turns the hills emerald and is the traditional season for Ayurveda treatments — just expect rain." },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/3840px-Munnar_Overview.jpg", alt: "Rolling green tea plantations in the Munnar hills", caption: "The tea gardens of Munnar are at their greenest right after the monsoon." },
      { type: "heading", text: "What not to miss" },
      { type: "list", items: [
        "An overnight houseboat stay on the Alleppey/Kumarakom backwaters.",
        "Tea plantation walks and the Eravikulam National Park in Munnar.",
        "Varkala's cliff-top cafes and Papanasam beach.",
        "A Kathakali performance and an authentic Kerala sadya meal on a banana leaf.",
      ] },
      { type: "heading", text: "Houseboat costs & tips" },
      { type: "paragraph", text: "A private 1-bedroom houseboat with full-board meals usually starts around ₹8,000–₹12,000 per night. Deluxe and premium boats cost more. Book air-conditioned boats in summer, and confirm the cruising route in advance." },
      { type: "tip", title: "Family tip", text: "Kerala is very family-friendly with excellent vegetarian food. Keep mosquito repellent handy for backwater stays and pack light cottons even in winter." },
      cta("Kerala"),
    ],
  },
  {
    slug: "leh-ladakh-road-trip-guide",
    title: "Leh Ladakh Road Trip: Routes, Permits & Acclimatization Tips",
    metaTitle: "Leh Ladakh Road Trip Guide: Routes, Permits & Itinerary",
    metaDescription:
      "Plan your Leh Ladakh road trip — Manali vs Srinagar route, inner-line permits, altitude acclimatization, Pangong & Nubra itinerary and the best time to go.",
    excerpt:
      "High passes, turquoise lakes and moon-like valleys — Ladakh is the ultimate Indian adventure. Here is how to plan it safely.",
    category: "Adventure",
    tags: ["Ladakh", "Leh", "Road Trip", "Adventure", "Mountains"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/ISS054-E-7809_-_View_of_Earth_%28cropped%29.jpg/3840px-ISS054-E-7809_-_View_of_Earth_%28cropped%29.jpg",
    heroAlt: "Winding mountain road leading through the Ladakh highlands",
    author: AUTHOR,
    publishDate: "2025-11-24",
    readMinutes: 9,
    relatedDestinationIds: ["leh-ladakh", "spiti-valley"],
    featured: false,
    content: [
      { type: "paragraph", text: "Ladakh is a rite of passage for Indian travellers who love the mountains. Between Khardung La, Pangong Tso and the sand dunes of Nubra, it delivers landscapes unlike anywhere else in the country. But high altitude demands smart planning." },
      { type: "heading", text: "Best time to visit" },
      { type: "paragraph", text: "June to September is the window when roads and passes are open and the weather is stable. July and August are busiest; September brings clearer skies and thinner crowds." },
      { type: "heading", text: "Which route to take" },
      { type: "list", items: [
        "Srinagar–Leh (via Kargil): gentler altitude gain, better for acclimatization.",
        "Manali–Leh: dramatic high passes but a steeper climb — ideal on the way back.",
        "Fly into Leh: fastest option, but rest for 24–48 hours before any excursion.",
      ] },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/5_Nubra_valley.jpg/3840px-5_Nubra_valley.jpg", alt: "Barren high-altitude Ladakh landscape under a blue sky", caption: "Give your body time to adjust before heading to Pangong or Nubra." },
      { type: "heading", text: "Permits you will need" },
      { type: "paragraph", text: "Indian nationals need Inner Line Permits for Nubra Valley, Pangong Tso, Tso Moriri and the Dah-Hanu villages. These are arranged online or through your operator — carry multiple photocopies and ID." },
      { type: "tip", title: "Altitude safety", text: "Hydrate constantly, avoid alcohol on arrival, climb gradually, and keep a day of rest in Leh. Consult your doctor about Diamox if you are prone to altitude sickness." },
      cta("Leh Ladakh"),
    ],
  },
  {
    slug: "goa-beyond-beaches",
    title: "Goa Beyond Beaches: Churches, Spice Farms & Hidden Coves",
    metaTitle: "Goa Beyond Beaches: Offbeat Things to Do in Goa",
    metaDescription:
      "Discover a different side of Goa — Old Goa churches, spice plantations, Fontainhas heritage walks, waterfalls and quiet south Goa beaches, plus the best time to visit.",
    excerpt:
      "There is far more to Goa than shacks and sunsets. Explore heritage lanes, spice farms and serene south-coast hideaways.",
    category: "Destinations",
    tags: ["Goa", "Beaches", "Heritage", "Weekend"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Front_Elevation_of_Basilica_of_Bom_Jesus.jpg/3840px-Front_Elevation_of_Basilica_of_Bom_Jesus.jpg",
    heroAlt: "Palm-lined golden beach with fishing boats in Goa",
    author: AUTHOR,
    publishDate: "2025-12-02",
    readMinutes: 6,
    relatedDestinationIds: ["goa-beaches", "gokarna-beaches"],
    featured: false,
    content: [
      { type: "paragraph", text: "Goa is India's favourite beach getaway, but the state rewards travellers who look past the sand. Portuguese heritage, lush spice farms and near-empty southern beaches make it a surprisingly layered destination." },
      { type: "heading", text: "Best time to visit Goa" },
      { type: "paragraph", text: "November to February is peak season with perfect beach weather and buzzing nightlife. The monsoon (June–September) is lush, green and budget-friendly, with dramatic waterfalls like Dudhsagar in full flow." },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Panaji_City.JPG", alt: "Colourful Portuguese-era street in Goa", caption: "The Latin Quarter of Fontainhas in Panjim is a photographer's delight." },
      { type: "heading", text: "Offbeat experiences" },
      { type: "list", items: [
        "Old Goa's UNESCO churches, including the Basilica of Bom Jesus.",
        "A guided spice plantation tour with a traditional Goan lunch.",
        "Heritage walks through the colourful lanes of Fontainhas.",
        "Quiet south Goa beaches — Palolem, Agonda and Butterfly Beach.",
      ] },
      { type: "tip", title: "Good to know", text: "Rent a scooter for flexibility, but always wear a helmet and carry your licence. South Goa suits families and couples; north Goa is livelier." },
      cta("Goa"),
    ],
  },
  {
    slug: "golden-triangle-tour-guide",
    title: "Golden Triangle Tour: Delhi, Agra & Jaipur in 5 Days",
    metaTitle: "Golden Triangle Tour Itinerary: Delhi Agra Jaipur (5 Days)",
    metaDescription:
      "The classic Golden Triangle itinerary — Delhi, Agra's Taj Mahal and Jaipur's forts in 5 days. Best time to visit, travel tips and how to book the perfect first India trip.",
    excerpt:
      "India's most iconic circuit packs the Taj Mahal, Mughal history and Rajput grandeur into one unforgettable five-day loop.",
    category: "Destinations",
    tags: ["Golden Triangle", "Agra", "Jaipur", "Delhi", "Heritage"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg",
    heroAlt: "The white marble Taj Mahal at sunrise in Agra",
    author: AUTHOR,
    publishDate: "2025-12-08",
    readMinutes: 7,
    relatedDestinationIds: ["agra-taj", "jaipur-heritage"],
    featured: false,
    content: [
      { type: "paragraph", text: "The Golden Triangle — Delhi, Agra and Jaipur — is the perfect introduction to India's history and colour. It is compact, well-connected and ideal for first-timers, families and short holidays." },
      { type: "heading", text: "Best time to visit" },
      { type: "paragraph", text: "October to March offers cool, comfortable sightseeing weather. Visit the Taj Mahal at sunrise for the best light and smallest crowds." },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg", alt: "Ornate pink sandstone facade of Hawa Mahal in Jaipur", caption: "Jaipur's Hawa Mahal is one of the most photographed facades in India." },
      { type: "heading", text: "5-day itinerary" },
      { type: "list", ordered: true, items: [
        "Day 1: Delhi — Qutub Minar, India Gate, Humayun's Tomb, Chandni Chowk.",
        "Day 2: Drive to Agra, Taj Mahal and Agra Fort.",
        "Day 3: Fatehpur Sikri en route to Jaipur.",
        "Day 4: Jaipur — Amber Fort, City Palace, Hawa Mahal, bazaars.",
        "Day 5: Jantar Mantar and return to Delhi.",
      ] },
      { type: "tip", title: "Tip", text: "The Taj Mahal is closed on Fridays. Book skip-the-line tickets online and hire a certified guide to bring the history alive." },
      cta("the Golden Triangle"),
    ],
  },
  {
    slug: "spiritual-north-india-circuit",
    title: "Spiritual North India: Varanasi, Rishikesh & Haridwar",
    metaTitle: "Spiritual North India Tour: Varanasi, Rishikesh & Haridwar",
    metaDescription:
      "A soulful journey through Varanasi's ghats, Rishikesh's yoga capital and Haridwar's Ganga Aarti. Best time to visit, itinerary and travel tips for a spiritual India tour.",
    excerpt:
      "Witness the eternal Ganga Aarti, meditate by the river and find stillness on India's most spiritual circuit.",
    category: "Spiritual",
    tags: ["Varanasi", "Rishikesh", "Haridwar", "Spiritual", "Ganga"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Dasaswamedh_ghat-varanasi_india-andres_larin.jpg/3840px-Dasaswamedh_ghat-varanasi_india-andres_larin.jpg",
    heroAlt: "Evening Ganga Aarti with lamps on the ghats of Varanasi",
    author: AUTHOR,
    publishDate: "2025-12-14",
    readMinutes: 8,
    relatedDestinationIds: ["varanasi-spirit", "rishikesh-yoga", "haridwar-spiritual"],
    featured: false,
    content: [
      { type: "paragraph", text: "For millions of Indians, a journey along the Ganga is deeply personal. This circuit links Varanasi's timeless ghats, Rishikesh's riverside ashrams and Haridwar's grand aarti into one moving spiritual experience." },
      { type: "heading", text: "Best time to visit" },
      { type: "paragraph", text: "October to March is most comfortable. If you seek the spectacle, plan around major festivals like Dev Deepawali in Varanasi or the Ganga Dussehra." },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Rishikesh-Lakshman_Jhula_by_Kaustubh_Nayyar.jpg/3840px-Rishikesh-Lakshman_Jhula_by_Kaustubh_Nayyar.jpg", alt: "Boats on the Ganga at dawn in Varanasi", caption: "A sunrise boat ride past the ghats of Varanasi is unforgettable." },
      { type: "heading", text: "Highlights of the trip" },
      { type: "list", items: [
        "Sunrise boat ride and evening Ganga Aarti at Dashashwamedh Ghat, Varanasi.",
        "Sarnath, where the Buddha gave his first sermon.",
        "Yoga and meditation sessions in Rishikesh, plus the Laxman Jhula and Beatles Ashram.",
        "The famous Ganga Aarti at Har Ki Pauri in Haridwar.",
      ] },
      { type: "tip", title: "Respectful travel", text: "Dress modestly at temples and ghats, ask before photographing rituals, and remove footwear where required. Pure-vegetarian food is the norm across this circuit." },
      cta("a spiritual North India"),
    ],
  },
  {
    slug: "char-dham-yatra-guide",
    title: "Char Dham Yatra Guide: Kedarnath & Badrinath Made Simple",
    metaTitle: "Char Dham Yatra Guide: Kedarnath, Badrinath & Tips",
    metaDescription:
      "A practical Char Dham Yatra guide covering Kedarnath and Badrinath — registration, best time, trek details, helicopter options and health tips for a smooth pilgrimage.",
    excerpt:
      "The sacred Himalayan shrines of Kedarnath and Badrinath draw lakhs of pilgrims each year. Here is how to plan the yatra with ease.",
    category: "Spiritual",
    tags: ["Char Dham", "Kedarnath", "Badrinath", "Pilgrimage", "Uttarakhand"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kedarnath_Temple_in_Rainy_season.jpg/3840px-Kedarnath_Temple_in_Rainy_season.jpg",
    heroAlt: "Himalayan peaks towering over a mountain pilgrimage trail",
    author: AUTHOR,
    publishDate: "2026-01-06",
    readMinutes: 8,
    relatedDestinationIds: ["kedarnath-temple", "badrinath-temple"],
    featured: false,
    content: [
      { type: "paragraph", text: "The Char Dham of Uttarakhand — Yamunotri, Gangotri, Kedarnath and Badrinath — form one of Hinduism's holiest pilgrimages. This guide focuses on Kedarnath and Badrinath, the two most visited shrines." },
      { type: "heading", text: "Best time for the yatra" },
      { type: "paragraph", text: "The shrines open around late April/May (Akshaya Tritiya) and close near Diwali. May–June and September–October offer the most stable weather. The monsoon months carry landslide risk." },
      { type: "heading", text: "Registration & how to reach" },
      { type: "list", items: [
        "Compulsory pilgrim registration is done online before travel — carry the printout.",
        "Kedarnath involves a ~16 km trek from Gaurikund; ponies, palkis and helicopter services are available.",
        "Badrinath is motorable right up to the temple town.",
      ] },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Badrinath_Temple_%2C_Uttarakhand.jpg/3840px-Badrinath_Temple_%2C_Uttarakhand.jpg", alt: "Snow-dusted Himalayan mountains near a pilgrimage site", caption: "Weather changes fast at these altitudes — pack warm layers even in summer." },
      { type: "tip", title: "Health first", text: "Both shrines are at high altitude. Build in acclimatization days, carry essential medicines, keep warm clothing, and consult a doctor if you have heart or breathing conditions." },
      cta("Char Dham"),
    ],
  },
  {
    slug: "himachal-hill-stations-guide",
    title: "Best Himachal Hill Stations: Shimla, Manali & Dharamshala",
    metaTitle: "Best Himachal Hill Stations: Shimla, Manali, Dharamshala",
    metaDescription:
      "Compare the best Himachal hill stations — Shimla's colonial charm, Manali's adventure and Dharamshala's Tibetan calm. Best time to visit, itineraries and travel tips.",
    excerpt:
      "Toy trains, snow valleys and Tibetan monasteries — Himachal is India's favourite mountain escape. Here is how to choose your base.",
    category: "Destinations",
    tags: ["Himachal", "Shimla", "Manali", "Dharamshala", "Mountains"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg/3840px-Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg",
    heroAlt: "Pine-covered hills and valleys in Himachal Pradesh",
    author: AUTHOR,
    publishDate: "2026-01-12",
    readMinutes: 7,
    relatedDestinationIds: ["shimla-queen", "manali-escapade", "dharamshala-hills"],
    featured: false,
    content: [
      { type: "paragraph", text: "Himachal Pradesh is a hill-lover's paradise with a resort for every mood — colonial nostalgia, alpine adventure or spiritual calm. Here is how the three headline hill stations compare." },
      { type: "heading", text: "Shimla — colonial charm" },
      { type: "paragraph", text: "The 'Queen of Hills' offers the UNESCO toy train, the traffic-free Mall Road and heritage architecture. It is easy to reach and great for first-time and elderly travellers." },
      { type: "heading", text: "Manali — adventure hub" },
      { type: "paragraph", text: "Manali is the base for Solang Valley paragliding, the Atal Tunnel drive to Lahaul, and snow at Rohtang. It suits couples, friends and thrill-seekers." },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Dharamshala_03_%28Cropped%29.jpg/3840px-Dharamshala_03_%28Cropped%29.jpg", alt: "River flowing through a green Himalayan valley", caption: "Himachal's valleys are lush and cool through the summer months." },
      { type: "heading", text: "Dharamshala — Tibetan calm" },
      { type: "paragraph", text: "Home to the Dalai Lama, McLeodganj blends monasteries, cedar forests and cafe culture. Watch a cricket match at the world's highest international stadium." },
      { type: "tip", title: "Best time", text: "March–June for pleasant weather, December–February for snow. Book early during summer holidays and long weekends." },
      cta("Himachal"),
    ],
  },
  {
    slug: "northeast-india-guide",
    title: "Northeast India Guide: Meghalaya, Sikkim & Assam",
    metaTitle: "Northeast India Travel Guide: Meghalaya, Sikkim, Assam",
    metaDescription:
      "Explore India's Northeast — Meghalaya's living root bridges, Sikkim's Himalayan views and Assam's Kaziranga rhinos. Best time to visit, permits and a sample itinerary.",
    excerpt:
      "Living root bridges, crystal rivers and one-horned rhinos — the Northeast is India's most underrated frontier.",
    category: "Destinations",
    tags: ["Northeast", "Meghalaya", "Sikkim", "Assam", "Offbeat"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/NohKaLikai_Falls_V2_Wiki.jpg/3840px-NohKaLikai_Falls_V2_Wiki.jpg",
    heroAlt: "Lush green hills and waterfalls in Northeast India",
    author: AUTHOR,
    publishDate: "2026-01-18",
    readMinutes: 8,
    relatedDestinationIds: ["shillong-meghalaya", "gangtok-hills", "kaziranga-rhino"],
    featured: false,
    content: [
      { type: "paragraph", text: "India's Northeast is a green, clean and culturally rich frontier still off most tourist radars. From Meghalaya's rain-fed wonders to Sikkim's Himalayan grandeur, it rewards the curious traveller." },
      { type: "heading", text: "Best time to visit" },
      { type: "paragraph", text: "October to May is ideal across most of the region. Meghalaya is spectacular right after the monsoon when waterfalls roar and the root bridges are lush." },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Beauty_of_Kaziranga_National_Park.jpg", alt: "One-horned rhino grazing in tall grassland", caption: "Kaziranga in Assam is home to two-thirds of the world's one-horned rhinos." },
      { type: "heading", text: "Regional highlights" },
      { type: "list", items: [
        "Meghalaya — Cherrapunji's living root bridges, Dawki's glass-clear river and Mawlynnong, 'Asia's cleanest village'.",
        "Sikkim — Gangtok, Tsomgo Lake and Himalayan viewpoints of Kanchenjunga.",
        "Assam — Kaziranga rhino safaris, tea estates and the Kamakhya temple.",
      ] },
      { type: "tip", title: "Permits", text: "Some areas (like parts of Sikkim and Arunachal) require inner-line or protected-area permits for Indian tourists. We arrange these as part of your package." },
      cta("Northeast India"),
    ],
  },
  {
    slug: "wildlife-safaris-india",
    title: "Top Wildlife Safaris in India: Tigers, Rhinos & Jungles",
    metaTitle: "Best Wildlife Safaris in India: Corbett, Ranthambore & More",
    metaDescription:
      "Discover the best wildlife safaris in India — Jim Corbett, Ranthambore and Kaziranga. Safari timings, booking tips, best season and what animals to expect.",
    excerpt:
      "Spot the Royal Bengal Tiger, one-horned rhinos and hundreds of bird species across India's greatest national parks.",
    category: "Wildlife",
    tags: ["Wildlife", "Safari", "Tiger", "Ranthambore", "Corbett"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Bengal_tiger_in_Sanjay_Dubri_Tiger_Reserve_December_2024_by_Tisha_Mukherjee_11.jpg/3840px-Bengal_tiger_in_Sanjay_Dubri_Tiger_Reserve_December_2024_by_Tisha_Mukherjee_11.jpg",
    heroAlt: "A tiger walking through a dry Indian forest",
    author: AUTHOR,
    publishDate: "2026-01-24",
    readMinutes: 7,
    relatedDestinationIds: ["jim-corbett", "ranthambore-safari", "kaziranga-rhino"],
    featured: false,
    content: [
      { type: "paragraph", text: "India protects some of the planet's most charismatic wildlife. A jungle safari is a thrilling change of pace for families and photographers alike — here are three parks worth planning a trip around." },
      { type: "heading", text: "Best time for safaris" },
      { type: "paragraph", text: "October to June is prime safari season; tiger sightings improve in the hotter months (April–June) when animals gather near waterholes. Many parks close during the core monsoon." },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Beauty_of_Kaziranga_National_Park.jpg", alt: "Rhino in grassland during a wildlife safari", caption: "Jeep and elephant safaris both offer unique vantage points." },
      { type: "heading", text: "Three parks to consider" },
      { type: "list", items: [
        "Jim Corbett (Uttarakhand) — India's oldest national park, rich in tigers and elephants.",
        "Ranthambore (Rajasthan) — historic fort ruins amid excellent tiger territory.",
        "Kaziranga (Assam) — the stronghold of the one-horned rhino.",
      ] },
      { type: "tip", title: "Booking tip", text: "Safari permits are limited and sell out fast — book zones in advance. Wear neutral colours, carry binoculars, and follow your guide's instructions at all times." },
      cta("a wildlife safari"),
    ],
  },
  {
    slug: "honeymoon-destinations-india",
    title: "Best Honeymoon Destinations in India for Every Couple",
    metaTitle: "Best Honeymoon Destinations in India (2026 Guide)",
    metaDescription:
      "From romantic Udaipur to the Andaman islands and Munnar's tea hills — discover the best honeymoon destinations in India by season, budget and vibe.",
    excerpt:
      "Lake palaces, private beaches and misty hills — plan a honeymoon as unique as your love story, right here in India.",
    category: "Honeymoon",
    tags: ["Honeymoon", "Couples", "Udaipur", "Andaman", "Romantic"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Udaipur_Lake_India.JPG",
    heroAlt: "Romantic couple watching a scenic sunset",
    author: AUTHOR,
    publishDate: "2026-02-02",
    readMinutes: 7,
    relatedDestinationIds: ["udaipur-lake", "andaman-islands", "munnar-hills"],
    featured: true,
    content: [
      { type: "paragraph", text: "India offers world-class honeymoons without the long-haul flights. Whether you dream of royal palaces, turquoise waters or cool hill retreats, there is a perfect match for every couple and budget." },
      { type: "heading", text: "Romantic ideas by vibe" },
      { type: "list", items: [
        "Regal romance — Udaipur's lake palaces and candlelit boat rides.",
        "Beach bliss — the Andaman Islands' white sands and coral reefs.",
        "Hill retreat — Munnar's tea gardens and misty resorts.",
        "Snow escape — Kashmir or Gulmarg for a winter wonderland.",
      ] },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/3840px-Munnar_Overview.jpg", alt: "Palace beside a calm lake at dusk in Udaipur", caption: "Udaipur regularly ranks among the world's most romantic cities." },
      { type: "heading", text: "When to go" },
      { type: "paragraph", text: "Match the destination to the season: Andaman and Kerala shine October–March, Kashmir dazzles in winter and spring, and Rajasthan is best in the cooler months." },
      { type: "tip", title: "Honeymoon perks", text: "Tell us it's your honeymoon and we will arrange thoughtful extras — room upgrades where possible, a candlelight dinner or a private cruise." },
      cta("a honeymoon"),
    ],
  },
  {
    slug: "family-vacation-ideas-india",
    title: "Family Vacation Ideas in India: Fun for All Ages",
    metaTitle: "Best Family Vacation Destinations in India",
    metaDescription:
      "The best family vacation destinations in India — Nainital lakes, Mysore palaces and Jaipur forts. Kid-friendly activities, safety tips and easy itineraries.",
    excerpt:
      "Boat rides, palaces and safaris the whole family will love — plan a stress-free Indian holiday with kids and grandparents.",
    category: "Family",
    tags: ["Family", "Kids", "Nainital", "Mysore", "Jaipur"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mysore_Palace_Morning.jpg/3840px-Mysore_Palace_Morning.jpg",
    heroAlt: "Happy family enjoying a holiday together outdoors",
    author: AUTHOR,
    publishDate: "2026-02-08",
    readMinutes: 6,
    relatedDestinationIds: ["nainital-lakes", "mysore-palace", "jaipur-heritage"],
    featured: false,
    content: [
      { type: "paragraph", text: "Travelling with kids and elders needs the right mix of activity, comfort and easy logistics. These family-friendly destinations tick every box, from gentle sightseeing to hands-on fun." },
      { type: "heading", text: "Family-friendly picks" },
      { type: "list", items: [
        "Nainital — boating on Naini Lake, cable-car rides and easy walks.",
        "Mysore — the dazzling palace, zoo and nearby Chamundi Hill.",
        "Jaipur — elephant-friendly forts, puppet shows and colourful bazaars.",
      ] },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/3840px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg", alt: "Grand palace facade popular with families", caption: "Palaces and forts spark every child's imagination." },
      { type: "heading", text: "Tips for travelling with family" },
      { type: "paragraph", text: "Keep daily plans relaxed with rest breaks, pick central hotels to cut travel time, and pre-book cabs with child seats where needed. Vegetarian and Jain food is easy to find at all three destinations." },
      { type: "tip", title: "Smooth trips", text: "Carry basic medicines, snacks and a small first-aid kit. We can plan slower-paced itineraries designed around senior citizens and young children." },
      cta("a family"),
    ],
  },
  {
    slug: "best-beaches-in-india",
    title: "Best Beaches in India Beyond Goa",
    metaTitle: "Best Beaches in India Beyond Goa (Andaman, Gokarna & More)",
    metaDescription:
      "Looking beyond Goa? Discover India's best beaches — Andaman, Gokarna, Varkala and Kovalam. Water sports, quiet coves, best time to visit and travel tips.",
    excerpt:
      "Swap the crowds for coral reefs and cliff-top sunsets at India's most beautiful lesser-known beaches.",
    category: "Destinations",
    tags: ["Beaches", "Andaman", "Gokarna", "Varkala", "Kovalam"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Radha_Nagar_beach%2C_Havelock_Island%2C_Andamn%2C_India-_Sun_set_view.jpg/3840px-Radha_Nagar_beach%2C_Havelock_Island%2C_Andamn%2C_India-_Sun_set_view.jpg",
    heroAlt: "Turquoise sea meeting a quiet palm-fringed beach",
    author: AUTHOR,
    publishDate: "2026-02-14",
    readMinutes: 6,
    relatedDestinationIds: ["andaman-islands", "gokarna-beaches", "varkala-cliff", "kovalam-beach"],
    featured: false,
    content: [
      { type: "paragraph", text: "Goa is wonderful, but India's coastline hides many quieter gems. If you crave clear water and calm, these beaches deliver postcard views without the crowds." },
      { type: "heading", text: "Four beaches to bookmark" },
      { type: "list", items: [
        "Radhanagar, Havelock (Andaman) — regularly rated among Asia's best beaches.",
        "Gokarna (Karnataka) — a laid-back, spiritual alternative to Goa.",
        "Varkala (Kerala) — dramatic red cliffs above the Arabian Sea.",
        "Kovalam (Kerala) — golden crescents and the iconic lighthouse.",
      ] },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Delight_india.jpg", alt: "Rocky coastline and clear water on the Indian coast", caption: "India's southern and island beaches rival any tropical destination." },
      { type: "heading", text: "Best time to visit" },
      { type: "paragraph", text: "October to March is ideal for all four, with calm seas and pleasant weather. Snorkelling and diving in the Andamans are best in this window too." },
      { type: "tip", title: "Beach safety", text: "Always swim in flagged zones, respect local advisories, and book water sports only with licensed operators." },
      cta("a beach"),
    ],
  },
  {
    slug: "andaman-islands-travel-guide",
    title: "Andaman Islands Travel Guide: Beaches, Diving & Itinerary",
    metaTitle: "Andaman Islands Travel Guide: Best Time, Diving & Itinerary",
    metaDescription:
      "Plan your Andaman trip — Havelock and Neil islands, scuba diving, Radhanagar beach, ferries, best time to visit and a relaxed 5-day Andaman itinerary.",
    excerpt:
      "White-sand beaches, coral reefs and world-class diving make the Andaman Islands India's tropical crown jewel.",
    category: "Destinations",
    tags: ["Andaman", "Islands", "Scuba", "Beaches", "Honeymoon"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Havelock%2C_Andaman_%26_Nicobar_Islands.JPG/3840px-Havelock%2C_Andaman_%26_Nicobar_Islands.JPG",
    heroAlt: "Clear turquoise water around a tropical Andaman island",
    author: AUTHOR,
    publishDate: "2026-02-20",
    readMinutes: 7,
    relatedDestinationIds: ["andaman-islands", "lakshadweep-atoll"],
    featured: false,
    content: [
      { type: "paragraph", text: "The Andaman Islands feel worlds away from mainland India, yet need no passport. Think powder-soft beaches, coral gardens and some of the country's best scuba diving." },
      { type: "heading", text: "Best time to visit" },
      { type: "paragraph", text: "October to May offers calm seas and clear skies — perfect for water activities. The monsoon can disrupt ferries between islands." },
      { type: "heading", text: "5-day island itinerary" },
      { type: "list", ordered: true, items: [
        "Day 1: Arrive Port Blair, Cellular Jail light-and-sound show.",
        "Day 2: Ferry to Havelock, relax at Radhanagar Beach.",
        "Day 3: Scuba diving or snorkelling at Elephant Beach.",
        "Day 4: Neil Island — Natural Bridge and Bharatpur Beach.",
        "Day 5: Return to Port Blair, local shopping, departure.",
      ] },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Front_View_of_Cellular_Jail%2C_Port_Blair.JPG/3840px-Front_View_of_Cellular_Jail%2C_Port_Blair.JPG", alt: "Coral coastline and clear shallow water in the Andamans", caption: "Even first-timers can try a beginner scuba dive with certified instructors." },
      { type: "tip", title: "Plan ahead", text: "Book inter-island ferries and diving slots in advance, especially in peak season. Mobile networks can be patchy — download maps offline." },
      cta("an Andaman"),
    ],
  },
  {
    slug: "south-india-temple-trail",
    title: "South India Temple Trail: Madurai, Tirupati & Mysore",
    metaTitle: "South India Temple Trail: Madurai, Tirupati & Mysore",
    metaDescription:
      "A soulful South India temple tour — Madurai's Meenakshi temple, Tirupati Balaji darshan and Mysore's royal heritage. Best time, darshan tips and itinerary.",
    excerpt:
      "Towering gopurams, timeless rituals and royal palaces await on South India's most rewarding temple circuit.",
    category: "Spiritual",
    tags: ["South India", "Temples", "Madurai", "Tirupati", "Mysore"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/3840px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg",
    heroAlt: "Ancient South Indian temple architecture with carved stone",
    author: AUTHOR,
    publishDate: "2026-02-26",
    readMinutes: 7,
    relatedDestinationIds: ["madurai-meenakshi", "tirupati-temple", "mysore-palace"],
    featured: false,
    content: [
      { type: "paragraph", text: "South India's temples are living centres of art, devotion and history. This trail links three unmissable stops — from Madurai's soaring gopurams to the hilltop shrine of Tirupati and the royal city of Mysore." },
      { type: "heading", text: "The three highlights" },
      { type: "list", items: [
        "Madurai — the vast Meenakshi Amman temple with thousands of carved figures.",
        "Tirupati — the revered Sri Venkateswara (Balaji) temple, one of the world's busiest.",
        "Mysore — the illuminated palace, Chamundi Hill and rich Wodeyar heritage.",
      ] },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mysore_Palace_Morning.jpg/3840px-Mysore_Palace_Morning.jpg", alt: "Intricately carved stone temple pillars in South India", caption: "The craftsmanship of South Indian temples is centuries in the making." },
      { type: "heading", text: "Darshan tips" },
      { type: "paragraph", text: "For Tirupati, book special-entry or time-slot darshan online to save hours. Dress traditionally, follow queue rules, and plan visits early to beat both heat and crowds." },
      { type: "tip", title: "Good to know", text: "Photography is restricted inside many sanctums. Cloakrooms are available for footwear and bags. Pure-vegetarian prasadam and meals are widely available." },
      cta("a South India temple"),
    ],
  },
  {
    slug: "monsoon-destinations-india",
    title: "Best Places to Visit in India During the Monsoon",
    metaTitle: "Best Monsoon Destinations in India: Where to Go in the Rains",
    metaDescription:
      "The best monsoon destinations in India — Munnar's tea hills, Coorg's coffee estates and Kerala's backwaters. Why the rains are magical and how to travel smart.",
    excerpt:
      "Waterfalls in full flow, emerald hills and cosy resorts — the monsoon is a magical, budget-friendly time to explore India.",
    category: "Seasonal",
    tags: ["Monsoon", "Munnar", "Coorg", "Kerala", "Offbeat"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/3840px-Munnar_Overview.jpg",
    heroAlt: "Mist rolling over lush green tea-covered hills in the rain",
    author: AUTHOR,
    publishDate: "2026-03-04",
    readMinutes: 6,
    relatedDestinationIds: ["munnar-hills", "coorg-coffee", "alleppey-boat"],
    featured: false,
    content: [
      { type: "paragraph", text: "Many travellers avoid the monsoon, but June to September is when parts of India look their most beautiful — and quiet, and affordable. Here is where the rains work in your favour." },
      { type: "heading", text: "Where to go in the rains" },
      { type: "list", items: [
        "Munnar — tea gardens glow emerald and waterfalls come alive.",
        "Coorg — misty coffee estates and the roaring Abbey Falls.",
        "Kerala backwaters — the traditional season for Ayurveda and slow cruises.",
      ] },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/The_View_of_the_Athirapally_Falls_during_the_onset_of_Monsoon.jpg/3840px-The_View_of_the_Athirapally_Falls_during_the_onset_of_Monsoon.jpg", alt: "Green hills and palm trees during the Indian monsoon", caption: "Post-shower light makes the Western Ghats spectacular." },
      { type: "heading", text: "Smart monsoon travel" },
      { type: "paragraph", text: "Choose destinations in the Western Ghats and south rather than flood-prone plains. Pack quick-dry clothing, waterproof footwear and a light rain jacket." },
      { type: "tip", title: "Bonus", text: "Monsoon is off-season, so expect lower hotel rates and fewer crowds — great value for couples and remote workers." },
      cta("a monsoon"),
    ],
  },
  {
    slug: "snow-destinations-india",
    title: "Where to See Snow in India: Best Winter Destinations",
    metaTitle: "Best Places to See Snow in India This Winter",
    metaDescription:
      "Dreaming of snow? Discover the best places to see snowfall in India — Gulmarg, Auli and Manali. Snow-sports, best months and tips for a first snow experience.",
    excerpt:
      "Ski slopes, snow-clad meadows and frozen wonderlands — here is where to chase your first snowfall in India.",
    category: "Seasonal",
    tags: ["Snow", "Winter", "Gulmarg", "Auli", "Manali"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Ancient_Temple%2C_Gulmarg.jpg",
    heroAlt: "Snow-covered mountains and slopes on a bright winter day",
    author: AUTHOR,
    publishDate: "2026-03-10",
    readMinutes: 6,
    relatedDestinationIds: ["gulmarg-snow", "auli-ski", "manali-escapade"],
    featured: false,
    content: [
      { type: "paragraph", text: "For many Indian families, the first sight of snow is pure magic. From December to March, these mountain destinations transform into white wonderlands perfect for snow play and skiing." },
      { type: "heading", text: "Top snow destinations" },
      { type: "list", items: [
        "Gulmarg (Kashmir) — Asia's highest cable car and superb ski slopes.",
        "Auli (Uttarakhand) — India's premier skiing meadow with Nanda Devi views.",
        "Manali (Himachal) — Solang Valley snow sports and the Atal Tunnel drive.",
      ] },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Solang_Valley_%2CManali%2C_Himachal_Pardes%2C_India.JPG/3840px-Solang_Valley_%2CManali%2C_Himachal_Pardes%2C_India.JPG", alt: "Skiers and snow slopes in the Indian Himalayas", caption: "Beginners can take ski lessons at Gulmarg and Auli." },
      { type: "heading", text: "When to go & what to pack" },
      { type: "paragraph", text: "Peak snowfall runs late December to February. Pack thermals, waterproof gloves and boots, sunscreen and sunglasses — snow glare is intense." },
      { type: "tip", title: "First-timer tip", text: "Rent heavy snow gear locally instead of buying, and hire certified instructors for any ski or snowboard session." },
      cta("a snow"),
    ],
  },
  {
    slug: "jaisalmer-desert-camping-guide",
    title: "Jaisalmer Desert Camping Guide: Dunes, Camps & Culture",
    metaTitle: "Jaisalmer Desert Camping Guide: Sam Dunes & Camps",
    metaDescription:
      "Experience the Thar like royalty — Jaisalmer desert camping, Sam Sand Dunes, camel safaris, folk nights and the Golden Fort. Best time to visit and booking tips.",
    excerpt:
      "Camel safaris, folk music under the stars and a glowing golden fort — Jaisalmer is Rajasthan at its most romantic.",
    category: "Adventure",
    tags: ["Jaisalmer", "Desert", "Camping", "Rajasthan", "Camel Safari"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/4/46/Jaisalmer_Fort.jpg",
    heroAlt: "Camel caravan crossing golden sand dunes at sunset",
    author: AUTHOR,
    publishDate: "2026-03-16",
    readMinutes: 6,
    relatedDestinationIds: ["jaisalmer-golden", "jodhpur-blue"],
    featured: false,
    content: [
      { type: "paragraph", text: "Rising from the Thar Desert, Jaisalmer is India's 'Golden City' — a living fort, honey-hued havelis and endless dunes that come alive at sunset. A desert camp night here is unforgettable." },
      { type: "heading", text: "What to experience" },
      { type: "list", items: [
        "The living Sonar Quila (Golden Fort) with shops and homes inside.",
        "Camel and jeep safaris across the Sam Sand Dunes.",
        "Luxury desert camps with folk music, Kalbeliya dance and Rajasthani thali.",
        "Ornate havelis like Patwon Ki Haveli and the reflective Gadisar Lake.",
      ] },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/4/47/Jaisalmer_forteresse.jpg", alt: "Golden sandstone fort glowing at sunset in Jaisalmer", caption: "Jaisalmer's fort glows amber as the sun sets over the Thar." },
      { type: "heading", text: "Best time to visit" },
      { type: "paragraph", text: "October to March is ideal, with warm days and cool desert nights. The Jaisalmer Desert Festival (Jan–Feb) adds colour, camel races and music." },
      { type: "tip", title: "Camp tip", text: "Choose a Swiss-tent camp with attached washrooms for comfort. Carry a light jacket — desert nights get cold even in season." },
      cta("a Jaisalmer desert"),
    ],
  },
  {
    slug: "amritsar-golden-temple-guide",
    title: "Amritsar Guide: Golden Temple, Wagah Border & Food",
    metaTitle: "Amritsar Travel Guide: Golden Temple, Wagah & Food",
    metaDescription:
      "Plan your Amritsar trip — the Golden Temple, Jallianwala Bagh, the Wagah Border ceremony and legendary Punjabi food. Best time to visit and a 2-day itinerary.",
    excerpt:
      "Serene golden reflections, a stirring border ceremony and India's most soulful food — Amritsar is a short trip with a big heart.",
    category: "Spiritual",
    tags: ["Amritsar", "Golden Temple", "Punjab", "Wagah", "Food"],
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/3840px-The_Golden_Temple_of_Amrithsar_7.jpg",
    heroAlt: "The Golden Temple glowing over its sacred pool in Amritsar",
    author: AUTHOR,
    publishDate: "2026-03-22",
    readMinutes: 6,
    relatedDestinationIds: ["amritsar-golden"],
    featured: false,
    content: [
      { type: "paragraph", text: "Amritsar packs deep spirituality, moving history and unbeatable food into a compact, easy-to-reach city. It makes a perfect long-weekend trip for families and friends." },
      { type: "heading", text: "Must-do experiences" },
      { type: "list", items: [
        "The Golden Temple (Harmandir Sahib) — visit at dawn and again after dark.",
        "The langar, the world's largest free community kitchen.",
        "Jallianwala Bagh, a solemn memorial to the 1919 tragedy.",
        "The high-energy Wagah–Attari border retreat ceremony at sunset.",
      ] },
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/3840px-The_Golden_Temple_of_Amrithsar_7.jpg", alt: "Pilgrims beside the sacred pool at the Golden Temple", caption: "The Golden Temple welcomes visitors of every faith around the clock." },
      { type: "heading", text: "Where to eat" },
      { type: "paragraph", text: "Amritsar is a food pilgrimage in itself — Amritsari kulcha, chole, lassi and fish tikka. Explore the old-city dhabas near the temple for the most authentic flavours." },
      { type: "tip", title: "Temple etiquette", text: "Cover your head, remove footwear and dress modestly at the Golden Temple. Free head-scarves and cloakrooms are available at the entrance." },
      cta("an Amritsar"),
    ],
  },
];

// ---- Helpers ----

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((post) => post.slug === slug);

export const getFeaturedPosts = (): BlogPost[] => BLOG_POSTS.filter((p) => p.featured);

export const getPostsByCategory = (category: BlogCategory): BlogPost[] =>
  BLOG_POSTS.filter((p) => p.category === category);

// Related posts: same category first, then fill with most recent others.
export const getRelatedPosts = (slug: string, limit = 3): BlogPost[] => {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const sameCategory = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category === current.category
  );
  const others = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
};

export const getSortedPosts = (): BlogPost[] =>
  [...BLOG_POSTS].sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
