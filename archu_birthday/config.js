/**
 * ARCHU'S BIRTHDAY WEBSITE CONFIGURATION
 * ----------------------------------------------------
 * You can easily customize photos, captions, memories, audio,
 * and text here without touching the core HTML/CSS code!
 */

const ARCHU_CONFIG = {
  // Personal Details
  recipientName: "Archu",
  fullName: "Archana",
  birthDate: "2026", // Update if needed
  
  // Audio Settings
  audio: {
    enabled: true,
    src: "assets/audio/oorum_blood_reprise.mp3", 
    title: "Oorum Blood – Reprise",
    artist: "Sai Abhyankkar • Tamil Lofi Flip",
    defaultVolume: 0.6
  },

  // Hero Section
  hero: {
    tagline: "A Birthday Memory Book",
    title: "For Archu",
    subtitle: "Some of the most beautiful memories are made in the smallest moments.",
    scrollPrompt: "Scroll to begin our story"
  },

  // Section 1: Timeline of Memories
  timeline: [
    {
      id: "memory-1",
      number: "01",
      tag: "The Beginning",
      title: "The Little Rides",
      subtitle: "Behind the campus, where time slowed down",
      description: "Our relationship grew through small bike rides after college. There is a road behind our college that she really loved. Those simple rides became some of our most special moments.",
      quote: "The quiet hum of the engine and the cool breeze after a long day.",
      image: "assets/images/our_first_photo_bike_ride.jpg?v=2",
      secondaryImage: "assets/images/college_road.jpg",
      imageAlt: "Our very first photo on the bike",
      badge: "Our First Photo"
    },
    {
      id: "memory-2",
      number: "02",
      tag: "Sweet Beginnings",
      title: "Our First Burger Date",
      subtitle: "The tissue I still keep safely inside my diary",
      description: "Sharing our very first burger together more than two years ago. Sitting across from each other, smiling uncontrollably, leaning across the table and snapping playful selfies together. Before leaving, I took the tissue from our table and kept it safely tucked inside my diary. Even today, that tissue is still there — a quiet reminder of how a simple first burger date became an eternal keepsake.",
      quote: "I still remember our first burger together... and I still keep that tissue paper safely in my diary to this day.",
      image: "assets/images/first_burger_memory.jpg",
      imageAlt: "Our first burger date together - playful selfie",
      badge: "First Burger Date"
    },
    {
      id: "memory-3",
      number: "03",
      tag: "Sweet Surprises",
      title: "Dairy Milk Silk",
      subtitle: "A sweet little surprise & that priceless smile",
      description: "Some of the most beautiful memories in our three years together were the smallest ones. Surprising you with Dairy Milk Silk chocolate, capturing your candid reaction, and watching your face light up with that pure, playful smile. It was never about the chocolate — it was about the sweet warmth of seeing you so genuinely happy.",
      quote: "Proof that the sweetest memories are always tucked away in the smallest, unscripted moments.",
      image: "assets/videos/silk_chocolate_memory.mp4",
      poster: "assets/images/silk_chocolate_thumb.jpg",
      imageAlt: "Dairy Milk Silk sweet surprise video",
      badge: "Dairy Milk Silk"
    },
    {
      id: "memory-4",
      number: "04",
      tag: "An Unforgettable Date",
      title: "17 May — Our First Kiss in the Rain",
      subtitle: "4:45 PM • The road behind college in heavy rain",
      description: "Our first kiss was on that road behind college around 4:45 PM during heavy rain. While riding the scooty through the pouring monsoon, you asked me to stop. You stepped off, ran straight out into the open rain, spinning your hands with pure joy. Then you turned, walked slowly back towards me soaked in raindrops, and kissed me. A moment pure as rain that made the entire world vanish.",
      quote: "You ran into the heavy rain, hands spread wide, then walked back toward me. That 4:45 PM kiss stopped time completely.",
      image: "assets/videos/first_kiss_rain_video.mp4",
      poster: "assets/images/first_kiss_rain_thumb.jpg",
      secondaryImage: "assets/images/college_road.jpg",
      imageAlt: "17 May first kiss in the rain",
      badge: "17 May • 4:45 PM"
    },
    {
      id: "memory-5",
      number: "05",
      tag: "A Quiet Embrace",
      title: "The First Hug",
      subtitle: "Before the journey to Karaikudi",
      description: "A memory held close to the heart — that warm, unprompted first hug right before she left for a wedding in Karaikudi. A moment of pure affection and closeness that made time stand completely still.",
      quote: "A silent pause, a gentle embrace, and a warmth that stayed long after.",
      image: "assets/images/first_hug_real.jpg?v=2",
      imageAlt: "Our first hug before Karaikudi wedding trip",
      badge: "Our First Hug"
    },
    {
      id: "memory-6",
      number: "06",
      tag: "Daily Journeys",
      title: "The Internship Days & Bus Rides",
      subtitle: "Backpacks, goofy smiles, moving buses & sleeping on your shoulder",
      description: "During our internship, the journeys to and from work became the sweetest part of our routine. From walking with heavy backpacks and goofy salutes, to sitting side-by-side on the swaying evening bus. Laughing at silly jokes, and after exhausting hours, drifting off to sleep with my head leaning against your shoulder — feeling completely safe while you stayed still just so I could rest in peace.",
      quote: "No matter how exhausting the day was, laughing together and resting my head on your shoulder on that swaying bus made the entire world feel peaceful.",
      video: "assets/videos/intern_bus_video.mp4",
      videoThumb: "assets/images/intern_bus_video_thumb.jpg",
      secondaryVideo: "assets/videos/intern_commute_video.mp4",
      secondaryVideoThumb: "assets/images/intern_commute_video_thumb.jpg",
      image: "assets/images/intern_bus_memory.jpg",
      imageAlt: "Internship memories - bus ride together, daily commute walk, and asleep on your shoulder",
      badge: "Internship Days"
    },
    {
      id: "memory-7",
      number: "07",
      tag: "Our First Trip",
      title: "A Night That Became a Morning",
      subtitle: "Snehatheeram — Spinning together in the dawn waves, a dream life once upon a time",
      description: "Our first trip was that midnight ride to Snehatheeram. Riding late into the night through empty, open roads and waiting together on the quiet shore for the first light. Stepping barefoot into the cool rushing waves, holding hands, laughing, and spinning in the twilight. A lovable moment everyone dreams of — a dream life once upon a time, made real in that quiet ocean breeze.",
      quote: "Holding hands and spinning in the rushing dawn waves — living that lovable fairy-tale moment everyone dreams of, right here beside you.",
      video: "assets/videos/snehatheeram_dream_moment.mp4",
      videoThumb: "assets/images/snehatheeram_dream_thumb.jpg",
      image: "assets/images/snehatheeram_dawn.jpg",
      secondaryImage: "assets/images/night_ride_highway.jpg",
      imageAlt: "Snehatheeram beach - dancing in dawn waves and sunrise",
      badge: "Snehatheeram Beach",
      hasSunriseInteractive: true
    },
    {
      id: "memory-8",
      number: "08",
      tag: "Special Celebrations",
      title: "Your First Birthday We Celebrated",
      subtitle: "Varkala — Sitting on the cliff in between the sea",
      description: "We celebrated your first birthday together in Varkala. Sitting on that small cliff right in between the sea, with the ocean waves rushing and splashing against the rocks beneath our feet, listening to your pure excitement and seeing you smile so radiantly from the bottom of my heart.",
      quote: "Sitting on that small cliff in between the sea, watching the waves crash and seeing you smile with pure excitement from the bottom of my heart.",
      image: "assets/images/varkala_waves_cliff.jpg",
      secondaryImage: "assets/images/varkala_real_beach.jpg",
      imageAlt: "Sitting on the cliff in between the sea with waves splashing in Varkala",
      badge: "Cliff in the Sea"
    },
    {
      id: "memory-9",
      number: "09",
      tag: "Scenic Escapes",
      title: "The Kava Trip & Wilde Café",
      subtitle: "Wilde Café selfie point & the quiet mountain trails",
      description: "Our ride to Kava surrounded by the mist-covered Western Ghats hills and the tranquil reservoir. Sitting together inside the wooden heart at Wilde Café overlooking the valley, enjoying the cool mountain breeze, and sharing the quiet beauty of the landscape together.",
      quote: "Sitting together in the heart bench at Wilde Café, surrounded by green hills, cool mountain breeze, and endless smiles.",
      image: "assets/images/kava_cafe.jpg",
      secondaryImage: "assets/images/balcony_hills_real.jpg?v=2",
      imageAlt: "Rohith and Archu at Kava — Wilde Café & scenic balcony view",
      badge: "Wilde Café"
    },
    {
      id: "memory-10",
      number: "10",
      tag: "Pure Affection",
      title: "Consoling Each Other — The Sweet 'Sorry' Videos",
      subtitle: "Puppy filters, funny feet namaste & promises to never stay upset",
      description: "In between all our journeys and busy days, there were moments of small disagreements, quiet pouts, and the most heartwarming efforts to console each other. You sending your adorable puppy-filter video from class saying 'Sorry da vavuzzzzz 🥺🦋🦋🦋', and me sending back a goofy namaste apology with my feet just to make you burst into laughter. No matter what happened, we could never stay upset for long — because love and laughter always won.",
      quote: "Sorry da vavuzzzzz 🥺🦋 — because no anger in the world could ever survive those puppy eyes and that goofy smile.",
      video: "assets/videos/sorry_archu_vavuzz.mp4",
      videoThumb: "assets/images/sorry_archu_vavuzz_thumb.jpg",
      secondaryVideo: "assets/videos/sorry_rohith_namaste.mp4",
      secondaryVideoThumb: "assets/images/sorry_rohith_namaste_thumb.jpg",
      imageAlt: "Cute sorry apology videos - Archu puppy filter and Rohith feet namaste",
      badge: "Consoling You"
    },
    {
      id: "memory-11",
      number: "11",
      tag: "Late-Night Thoughts",
      title: "Manifesting You — Those Eyes on My Laptop",
      subtitle: "Quiet study nights, glowing screens & whispering 'Mine' to the universe",
      description: "During those late nights studying and working late into the hours, you were always right there with me. Zooming in on your expressive, beautiful eyes on my laptop screen — with that sweet little bindi — keeping your gaze open while I worked. Looking into your eyes, feeling that quiet warmth settle deep in my heart, and softly typing 'Mine 🫠🫠'. Manifesting you, our bond, and our future together into every second of my life.",
      quote: "Zoomed in on your eyes glowing on my laptop screen, whispering 'Mine 🫠🫠' — manifesting our forever in every quiet hour.",
      video: "assets/videos/manifest_eyes_laptop.mp4",
      videoThumb: "assets/images/manifest_eyes_laptop_thumb.jpg",
      imageAlt: "Manifesting her eyes on laptop screen - Mine",
      badge: "Manifesting You"
    },
    {
      id: "memory-12",
      number: "12",
      tag: "Unbreakable Bond",
      title: "Sick Day in the Hospital — 'He's My Boyfriend'",
      subtitle: "Holding hands by your bedside & the first time you claimed me",
      description: "A memory etched deeply into my soul. Sitting right beside you in the hospital room while you were unwell, holding your hand tight with the IV drip bandage on your wrist. When the nurse walked in, you first told her I was your cousin — but she questioned how she could allow a cousin to stay inside. Seeing you look at her and, for the very first time, proudly and softly tell her that I was your boyfriend so I could stay right by your side. Sitting there next to you, refusing to let go of your hand, knowing I would stay through every sickness, every storm, and every chapter of our lives.",
      quote: "You told the nurse I was your cousin, and when she asked how she could allow me, you looked up and said I was your boyfriend. That first time you claimed me meant the world.",
      video: "assets/videos/hospital_sick_day.mp4",
      videoThumb: "assets/images/hospital_sick_day_thumb.jpg",
      imageAlt: "Sick day in hospital holding hands by the bedside - He's my boyfriend",
      badge: "Hospital Care"
    },
    {
      id: "memory-13",
      number: "13",
      tag: "Unconditional Devotion",
      title: "Pure Affection & Devotion — Touching Your Feet",
      subtitle: "No ego, only love — holding your feet with utmost care & reverence",
      description: "You captured this quiet moment and captioned it: 'This is how shows his affection 🤌🫠'. Holding your feet gently in my hands, massaging the tiredness away, and resting my touch there in complete devotion. I still remember the painful day in the past when foolish ego made me hesitate to touch your feet — a momentary lapse that I have regretted every single minute of my life. But true love has no room for pride. Touching your feet is my silent promise of respect, surrender, and lifelong devotion to you. You are my queen, my home, and my world.",
      quote: "Touching your feet isn't just affection — it's leaving all pride behind, choosing you with my whole heart, and promising to cherish you forever.",
      video: "assets/videos/pure_affection_feet.mp4",
      videoThumb: "assets/images/pure_affection_feet_thumb.jpg",
      imageAlt: "Pure affection and devotion - touching your feet with love",
      badge: "Pure Affection"
    }
  ],

  // Section 2: Things I Remember (Sensory Memory Cards)
  rememberCards: [
    {
      icon: "bike",
      title: "Our Bike Rides",
      subtitle: "The hum of the engine",
      details: "The cool evening wind after classes, navigating through familiar turns, and the effortless silence we shared along the way."
    },
    {
      icon: "heart",
      title: "Our First Burger Date",
      subtitle: "The tissue in my diary",
      details: "Sitting across from each other sharing our very first burger, laughing together over the table, and keeping that simple tissue paper tucked safely inside my diary as a keepsake I still cherish."
    },
    {
      icon: "sparkles",
      title: "Dairy Milk Silk Surprises",
      subtitle: "The sweetest small pauses",
      details: "Surprising you with Dairy Milk Silk chocolate and watching your eyes sparkle with that pure, joyful smile — a sweet little memory held forever close to my heart."
    },
    {
      icon: "bus",
      title: "Internship Days & Bus Rides",
      subtitle: "Commutes, laughter & sleeping on your shoulder",
      details: "Long internship hours, carrying heavy backpacks, sharing goofy salutes, and the quiet comfort of resting my head against your shoulder on the swaying evening bus."
    },
    {
      icon: "chat",
      title: "Late-Night Conversations",
      subtitle: "Hours that felt like minutes",
      details: "Talking about everything and nothing. The world was quiet, but our conversations were full of life and honest laughter."
    },
    {
      icon: "road",
      title: "The Road Behind College",
      subtitle: "4:45 PM in the rain & our first kiss",
      details: "Stopping the scooty in the heavy monsoon downpour, watching you run into the rain with open arms, and that unforgettable 4:45 PM kiss on 17 May."
    },
    {
      icon: "sunrise",
      title: "Snehatheeram Dawn & The Waves",
      subtitle: "A dream life once upon a time",
      details: "Holding hands and spinning together in the cool rushing waves at Snehatheeram after our midnight ride — that lovable fairy-tale moment everyone dreams of living."
    },
    {
      icon: "mountain",
      title: "The Kava Trails & Café",
      subtitle: "Wilde Café, mist & mountain air",
      details: "The winding green roads leading to Kava, sitting in the heart bench at Wilde Café overlooking the lush valley, and standing by the reservoir water surrounded by quiet hills."
    },
    {
      icon: "waves",
      title: "Holding Your Hand on the Cliff",
      subtitle: "The warm hand, beach sound & fresh ocean air",
      details: "Holding your warm hand along the cliff path, the fresh salty ocean air, and the sound of crashing beach waves below. Still today, if I close my eyes, I can feel your warm hand in mine."
    },
    {
      icon: "sparkles",
      title: "Moments After College",
      subtitle: "The unscripted pauses",
      details: "Waiting by the gates, sharing a quick tea, the spontaneous decisions, and the simple comfort of having you there."
    },
    {
      icon: "heart",
      title: "Our Sweet 'Sorry' Videos",
      subtitle: "Consoling you & making up",
      details: "Whenever we had silly misunderstandings, you sending 'Sorry da vavuzzzzz 🥺🦋' with puppy filters and me sending goofy namaste videos — proof that our love always chooses laughter and warmth over pride."
    },
    {
      icon: "sparkles",
      title: "Manifesting You",
      subtitle: "Those eyes on my screen • 'Mine 🫠🫠'",
      details: "Keeping your expressive eyes with that sweet little bindi zoomed in on my laptop screen during late study nights — feeling your presence beside me and manifesting our future together."
    },
    {
      icon: "heart",
      title: "Sick Day in the Hospital",
      subtitle: "The first time you called me your boyfriend",
      details: "Sitting by your hospital bed holding your hand with the IV drip, and the unforgettable moment you told the hesitant nurse that I was your boyfriend so I could stay right beside you."
    },
    {
      icon: "heart",
      title: "Touching Your Feet With Devotion",
      subtitle: "Leaving all ego behind • 'Pure Affection 🤌'",
      details: "Holding your feet gently in my hands — a quiet act of complete devotion, leaving all pride behind, and promising to honor, respect, and cherish you through every single minute of my life."
    },
    {
      icon: "heart",
      title: "Tying Your Hair & Caring Like a Baby",
      subtitle: "Looking into your eyes & carrying you on my hip",
      details: "Gently tying and styling your hair while looking into your eyes, and carrying you on my hip in front of my cousin like a baby — loving you with pure tenderness and zero hesitation."
    }
  ],

  // Section 3: Photo Gallery
  gallery: [
    {
      id: 0.9,
      type: "cinematic",
      src: "assets/images/couple_watercolor_art.png",
      caption: "“I didn’t realize how precious the little moments were while I was living them. The smiles, the rides, the silly conversations, and simply having you beside me. Looking back, I understand their value now. You made ordinary days feel special, Archu. ❤️”",
      date: "Sacred Keepsake",
      tag: "You & Me Always"
    },
    {
      id: 1,
      type: "polaroid",
      src: "assets/images/our_first_photo_bike_ride.jpg?v=2",
      caption: "The day you came with me on the bike — Our first photo",
      date: "The First Ride",
      tag: "First Photo"
    },
    {
      id: 1.5,
      type: "polaroid",
      src: "assets/images/first_burger_memory.jpg",
      caption: "Our First Burger Date — Laughing across the table & the tissue I still keep in my diary",
      date: "2+ Years Ago",
      tag: "First Burger"
    },
    {
      id: 2,
      type: "cinematic",
      src: "assets/videos/evening_bike_ride.mp4",
      poster: "assets/images/evening_bike_ride_thumb.jpg",
      caption: "Evening Bike Ride — Riding together along the quiet roads",
      date: "Evening Rides",
      tag: "Video Memory"
    },
    {
      id: 2.5,
      type: "cinematic",
      src: "assets/videos/first_kiss_rain_video.mp4",
      poster: "assets/images/first_kiss_rain_thumb.jpg",
      caption: "17 May in the Rain — Us soaked and smiling after our first kiss",
      date: "17 May • 4:45 PM",
      tag: "Rain Video"
    },
    {
      id: 2.8,
      type: "cinematic",
      src: "assets/videos/silk_chocolate_memory.mp4",
      poster: "assets/images/silk_chocolate_thumb.jpg",
      caption: "Dairy Milk Silk — A sweet surprise & the little moments that mean everything",
      date: "Sweet Moments",
      tag: "Video Memory"
    },
    {
      id: 3,
      type: "polaroid",
      src: "assets/images/kava_cafe.jpg",
      caption: "Wilde Café — Sitting together at the selfie point overlooking the green hills",
      date: "Kava Ride",
      tag: "Wilde Café"
    },
    {
      id: 3.5,
      type: "cinematic",
      src: "assets/images/kava_reservoir.jpg",
      caption: "Kava — Where the mountains meet the quiet lake",
      date: "Kava Ride",
      tag: "Kava Trip"
    },
    {
      id: 3.7,
      type: "cinematic",
      src: "assets/videos/snehatheeram_dream_moment.mp4",
      poster: "assets/images/snehatheeram_dream_thumb.jpg",
      caption: "Snehatheeram Dawn — Spinning in the waves, a lovable dream life moment once upon a time",
      date: "First Trip • Snehatheeram",
      tag: "Dream Moment"
    },
    {
      id: 3.8,
      type: "cinematic",
      src: "assets/images/snehatheeram_dawn.jpg",
      caption: "Snehatheeram — Watching the sunrise together",
      date: "First Trip",
      tag: "Snehatheeram"
    },
    {
      id: 4,
      type: "polaroid",
      src: "assets/images/first_hug_real.jpg?v=2",
      caption: "Our First Hug — That sweet, quiet embrace before Karaikudi",
      date: "The First Hug",
      tag: "Milestone"
    },
    {
      id: 4.8,
      type: "polaroid",
      src: "assets/images/intern_bus_memory.jpg",
      caption: "Internship Bus Rides — Asleep on your shoulder after long days",
      date: "Internship",
      tag: "Bus Journey"
    },
    {
      id: 4.81,
      type: "cinematic",
      src: "assets/videos/intern_bus_video.mp4",
      poster: "assets/images/intern_bus_video_thumb.jpg",
      caption: "Internship Bus Ride — Smiling and laughing together on the evening bus",
      date: "Internship",
      tag: "Video Memory"
    },
    {
      id: 4.82,
      type: "cinematic",
      src: "assets/videos/intern_commute_video.mp4",
      poster: "assets/images/intern_commute_video_thumb.jpg",
      caption: "Internship Commute — Walking with the backpack and that playful goofy salute",
      date: "Internship",
      tag: "Video Memory"
    },
    {
      id: 5,
      type: "cinematic",
      src: "assets/images/balcony_hills_real.jpg?v=2",
      caption: "Kava Balcony — Forehead to forehead overlooking the reservoir & quiet hills",
      date: "Kava Ride",
      tag: "Kava Trip"
    },
    {
      id: 5.1,
      type: "cinematic",
      src: "assets/videos/sorry_archu_vavuzz.mp4",
      poster: "assets/images/sorry_archu_vavuzz_thumb.jpg",
      caption: "Sorry da vavuzzzzz 🥺🦋 — The cutest apology video to console each other",
      date: "Sorry Videos",
      tag: "Consoling You"
    },
    {
      id: 5.2,
      type: "cinematic",
      src: "assets/videos/sorry_rohith_namaste.mp4",
      poster: "assets/images/sorry_rohith_namaste_thumb.jpg",
      caption: "Sorry 😭🥺 — The goofy feet namaste apology to make you laugh",
      date: "Sorry Videos",
      tag: "Consoling You"
    },
    {
      id: 5.3,
      type: "cinematic",
      src: "assets/videos/manifest_eyes_laptop.mp4",
      poster: "assets/images/manifest_eyes_laptop_thumb.jpg",
      caption: "Manifesting Her Eyes on Laptop — Late nights & whispering 'Mine 🫠🫠'",
      date: "Late Nights",
      tag: "Manifesting You"
    },
    {
      id: 5.4,
      type: "cinematic",
      src: "assets/videos/hospital_sick_day.mp4",
      poster: "assets/images/hospital_sick_day_thumb.jpg",
      caption: "Sick Day in the Hospital — Holding hands by your bedside & 'He's my boyfriend'",
      date: "Hospital Care",
      tag: "Unbreakable Bond"
    },
    {
      id: 5.5,
      type: "cinematic",
      src: "assets/videos/pure_affection_feet.mp4",
      poster: "assets/images/pure_affection_feet_thumb.jpg",
      caption: "Pure Affection & Devotion — Touching your feet & leaving all ego behind",
      date: "Devotion",
      tag: "Pure Affection"
    },
    {
      id: 5.6,
      type: "cinematic",
      src: "assets/videos/tying_hair_baby_care.mp4",
      poster: "assets/images/tying_hair_baby_care_thumb.jpg",
      caption: "Tying Your Hair & Carrying You Like a Baby — Looking into your eyes & pampering you like my baby girl",
      date: "Pure Care",
      tag: "Baby Care"
    },
    {
      id: 6,
      type: "cinematic",
      src: "assets/images/sunset_beach_bg.jpg",
      caption: "Sunset Shoreline — Wrapped in golden twilight & ocean waves",
      date: "Forever Memories",
      tag: "Sunset"
    },
    {
      id: 7,
      type: "cinematic",
      src: "assets/images/guruvayur_dream.jpg",
      caption: "A Morning in Guruvayur — Someday, a sacred new beginning together",
      date: "Our Dream",
      tag: "Guruvayur"
    },
    {
      id: 8,
      type: "polaroid",
      src: "assets/images/kava_lakeside.jpg",
      caption: "Kava Lakeside — Mist rising over the mountains",
      date: "Kava Ride",
      tag: "Kava Trip"
    },
    {
      id: 6,
      type: "polaroid",
      src: "assets/images/college_road.jpg",
      caption: "That road behind college you loved",
      date: "Quiet evenings",
      tag: "Campus"
    },
    {
      id: 7.5,
      type: "polaroid",
      src: "assets/images/varkala_waves_cliff.jpg",
      caption: "Sitting on the cliff in the sea — Splashing waves & listening to your excitement",
      date: "Varkala",
      tag: "Varkala Cliff"
    },
    {
      id: 7.6,
      type: "cinematic",
      src: "assets/videos/holding_hands_cliff.mp4",
      poster: "assets/images/holding_hands_cliff_thumb.jpg",
      caption: "Holding Your Hand on the Cliff — The warm hand, the beach sound & fresh air. Still if I close my eyes, I can feel it.",
      date: "Varkala Cliff",
      tag: "Video Memory"
    },
    {
      id: 7,
      type: "cinematic",
      src: "assets/images/varkala_real_beach.jpg",
      caption: "Varkala Beach — Sitting by the waves together",
      date: "Birthday Trip",
      tag: "Varkala"
    },
    {
      id: 6,
      type: "polaroid",
      src: "assets/images/late_night_tea.jpg",
      caption: "Late night tea & endless conversations",
      date: "Night talks",
      tag: "Memories"
    },
    {
      id: 7,
      type: "polaroid",
      src: "assets/images/varkala_birthday.jpg",
      caption: "The seaside cake & candle flame",
      date: "Varkala",
      tag: "Birthday"
    },
    {
      id: 8,
      type: "polaroid",
      src: "assets/images/helmets_twilight.jpg",
      caption: "Two helmets by the coast",
      date: "Road trips",
      tag: "Rides"
    },
    {
      id: 9,
      type: "cinematic",
      src: "assets/images/night_ride_highway.jpg",
      caption: "Midnight highway under the stars",
      date: "Night Ride",
      tag: "Journeys"
    },
    {
      id: 10,
      type: "polaroid",
      src: "assets/images/waves_shoreline.jpg",
      caption: "Gentle morning waves on the shore",
      date: "Ocean breeze",
      tag: "Nature"
    },
    {
      id: 11,
      type: "polaroid",
      src: "assets/images/vintage_letter.jpg",
      caption: "Memories preserved in ink",
      date: "Three Years",
      tag: "Special"
    }
  ],

  // Section 4: The Letter (Exact text as requested)
  letter: {
    salutation: "Archu,",
    paragraphs: [
      "I know saying sorry can't change what happened, but I still want to say it honestly. I realize now that there were times when you needed my attention, care, and presence, and I didn't give you what you deserved. I understand why that hurt you, and I'm genuinely sorry.",
      "I don't want to convince you with promises or ask you to forget everything overnight. I know trust and feelings don't come back just because I say the right words. I want to show you through my actions that I have understood my mistakes and that I can become a better person.",
      "I also understand that you are scared of relationships right now, and I respect the time you've asked for. I won't pressure you or force you to make a decision. You deserve the space to understand what you truly want.",
      "The three years we shared mean a lot to me. I will always be grateful for the little things — the rides after college, that road behind college, our late-night trip, watching the sunrise, Varkala, 17 May, and all those ordinary moments that became special because they were ours.",
      "I'm not asking you to come back today. I just want you to know that I'm sorry for the ways I hurt you, I understand my mistakes better now, and I'm going to work on myself — not just to get you back, but because I should have done that earlier.",
      "Whatever you decide in the future, I'll respect your choice. I genuinely want you to be happy."
    ],
    closing: "Happy Birthday, Archu. ❤️"
  },

  // Secret Surprise Easter Egg
  secretSurprise: {
    triggerHint: "A subtle silver star holds a quiet thought",
    title: "A Quiet Note Just For You",
    message: "Thank you for the laughs, the journeys, the honesty, and for being who you are. These three years gave me memories I will always hold with respect and fondness. May your year ahead be gentle, fulfilling, and filled with joy.",
    dateLabel: "With sincere wishes"
  },

  // Final Section
  closing: {
    heading: "Happy Birthday, Archu ❤️",
    subtext: "Thank you for being part of so many beautiful memories.",
    replayBtnText: "Replay our story"
  }
};
