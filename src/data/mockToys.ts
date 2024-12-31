import { Toy } from '../types/toy';

export const mockToys: Toy[] = [
  {
    id: '1',
    name: 'Wooden Montessori Learning Tower',
    description: 'Handcrafted learning tower/kitchen helper made from sustainable bamboo. Adjustable height, foldable design. Perfect for toddlers to safely participate in kitchen activities.',
    ageRange: '18 months - 5 years',
    condition: 'Like New',
    images: [
      {
        id: 'img_1',
        url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800',
        isPrimary: true
      },
      {
        id: 'img_1b',
        url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800',
        isPrimary: false
      }
    ],
    owner: {
      id: 'user_1',
      name: 'Michael Chen',
      location: 'Tampines, Singapore',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    },
    location: {
      latitude: 1.3521,
      longitude: 103.9198,
      address: 'Tampines Street 45',
      city: 'Singapore',
      state: 'Singapore',
      country: 'Singapore'
    },
    postedAt: new Date().toISOString(),
    likes: []
  },
  {
    id: '2',
    name: 'Grimm\'s Large Rainbow Stacker',
    description: 'Authentic Grimm\'s 12-piece wooden rainbow stacker. Made from natural wood with non-toxic water-based dyes. Perfect for open-ended play and learning about colors and shapes.',
    ageRange: '12 months+',
    condition: 'Good',
    images: [
      {
        id: 'img_2',
        url: 'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80&w=800',
        isPrimary: true
      },
      {
        id: 'img_2b',
        url: 'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80&w=800',
        isPrimary: false
      }
    ],
    owner: {
      id: 'user_2',
      name: 'Sarah Tan',
      location: 'Jurong East, Singapore',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    },
    location: {
      latitude: 1.3329,
      longitude: 103.7436,
      address: 'Jurong East Street 31',
      city: 'Singapore',
      state: 'Singapore',
      country: 'Singapore'
    },
    postedAt: new Date().toISOString(),
    likes: []
  },
  {
    id: '3',
    name: 'Plan Toys Wooden Kitchen Set',
    description: 'Complete Plan Toys sustainable wooden kitchen set including pots, pans, utensils, and play food. Made from rubberwood with non-toxic finishes.',
    ageRange: '3-8 years',
    condition: 'Good',
    images: [
      {
        id: 'img_3',
        url: 'https://images.unsplash.com/photo-1567293437761-d65f97db6a75?auto=format&fit=crop&q=80&w=800',
        isPrimary: true
      },
      {
        id: 'img_3b',
        url: 'https://images.unsplash.com/photo-1567293437761-d65f97db6a75?auto=format&fit=crop&q=80&w=800',
        isPrimary: false
      }
    ],
    owner: {
      id: 'user_3',
      name: 'Raj Kumar',
      location: 'Ang Mo Kio, Singapore',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    location: {
      latitude: 1.3691,
      longitude: 103.8454,
      address: 'Ang Mo Kio Avenue 3',
      city: 'Singapore',
      state: 'Singapore',
      country: 'Singapore'
    },
    postedAt: new Date().toISOString(),
    likes: []
  },
  {
    id: '4',
    name: 'Melissa & Doug Wooden Train Set',
    description: 'Large wooden train set with tracks, bridges, and multiple trains. Compatible with major wooden train brands. Includes storage box and track layout guide.',
    ageRange: '3+ years',
    condition: 'Like New',
    images: [
      {
        id: 'img_4',
        url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
        isPrimary: true
      },
      {
        id: 'img_4b',
        url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
        isPrimary: false
      }
    ],
    owner: {
      id: 'user_4',
      name: 'Emily Wong',
      location: 'Sengkang, Singapore',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=200'
    },
    location: {
      latitude: 1.3868,
      longitude: 103.8914,
      address: 'Sengkang Square',
      city: 'Singapore',
      state: 'Singapore',
      country: 'Singapore'
    },
    postedAt: new Date().toISOString(),
    likes: []
  },
  {
    id: '5',
    name: 'Waldorf Wooden Balance Board',
    description: 'Handcrafted wooden balance board/rocker. Multiple uses - balance board, bridge, slide, or pretend boat. Made from solid beech wood with non-toxic finish.',
    ageRange: '18 months+',
    condition: 'Good',
    images: [
      {
        id: 'img_5',
        url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
        isPrimary: true
      },
      {
        id: 'img_5b',
        url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
        isPrimary: false
      }
    ],
    owner: {
      id: 'user_5',
      name: 'David Lee',
      location: 'Woodlands, Singapore',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200'
    },
    location: {
      latitude: 1.4382,
      longitude: 103.7891,
      address: 'Woodlands Drive 50',
      city: 'Singapore',
      state: 'Singapore',
      country: 'Singapore'
    },
    postedAt: new Date().toISOString(),
    likes: []
  },
  {
    id: '6',
    name: 'Montessori Wooden Number Set',
    description: 'Complete Montessori mathematics set with number rods, sandpaper numbers, and counting beads. Perfect for early mathematics learning.',
    ageRange: '3-6 years',
    condition: 'Like New',
    images: [
      {
        id: 'img_6',
        url: 'https://images.unsplash.com/photo-1602619075660-c6bb1134dda0?auto=format&fit=crop&q=80&w=800',
        isPrimary: true
      },
      {
        id: 'img_6b',
        url: 'https://images.unsplash.com/photo-1602619075660-c6bb1134dda0?auto=format&fit=crop&q=80&w=800',
        isPrimary: false
      }
    ],
    owner: {
      id: 'user_6',
      name: 'Aisha Rahman',
      location: 'Bedok, Singapore',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&q=80&w=200'
    },
    location: {
      latitude: 1.3236,
      longitude: 103.9273,
      address: 'Bedok North Street 3',
      city: 'Singapore',
      state: 'Singapore',
      country: 'Singapore'
    },
    postedAt: new Date().toISOString(),
    likes: []
  },
  {
    id: '7',
    name: 'Wooden Musical Instrument Set',
    description: 'High-quality wooden musical instruments including xylophone, tambourine, maracas, and bells. Perfect for early music education and sensory play.',
    ageRange: '2+ years',
    condition: 'Good',
    images: [
      {
        id: 'img_7',
        url: 'https://images.unsplash.com/photo-1621112904887-419379ce6824?auto=format&fit=crop&q=80&w=800',
        isPrimary: true
      },
      {
        id: 'img_7b',
        url: 'https://images.unsplash.com/photo-1621112904887-419379ce6824?auto=format&fit=crop&q=80&w=800',
        isPrimary: false
      }
    ],
    owner: {
      id: 'user_7',
      name: 'Lisa Teo',
      location: 'Yishun, Singapore',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
    },
    location: {
      latitude: 1.4304,
      longitude: 103.8354,
      address: 'Yishun Ring Road',
      city: 'Singapore',
      state: 'Singapore',
      country: 'Singapore'
    },
    postedAt: new Date().toISOString(),
    likes: []
  },
  {
    id: '8',
    name: 'Wooden Building Blocks Set',
    description: '100-piece natural wooden block set in various shapes and sizes. Includes storage bag and block pattern cards. Perfect for STEM learning and creative play.',
    ageRange: '2+ years',
    condition: 'Like New',
    images: [
      {
        id: 'img_8',
        url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800',
        isPrimary: true
      },
      {
        id: 'img_8b',
        url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800',
        isPrimary: false
      }
    ],
    owner: {
      id: 'user_8',
      name: 'James Lim',
      location: 'Pasir Ris, Singapore',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200'
    },
    location: {
      latitude: 1.3721,
      longitude: 103.9474,
      address: 'Pasir Ris Drive 3',
      city: 'Singapore',
      state: 'Singapore',
      country: 'Singapore'
    },
    postedAt: new Date().toISOString(),
    likes: []
  },
  {
    id: '9',
    name: 'Wooden Play Kitchen',
    description: 'Beautiful wooden play kitchen with working knobs, sink, and oven door. Includes wooden pots, pans, and utensils. Perfect for imaginative play.',
    ageRange: '3-8 years',
    condition: 'Good',
    images: [
      {
        id: 'img_9',
        url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=800',
        isPrimary: true
      },
      {
        id: 'img_9b',
        url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=800',
        isPrimary: false
      }
    ],
    owner: {
      id: 'user_9',
      name: 'Priya Sharma',
      location: 'Punggol, Singapore',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    },
    location: {
      latitude: 1.4041,
      longitude: 103.9025,
      address: 'Punggol Central',
      city: 'Singapore',
      state: 'Singapore',
      country: 'Singapore'
    },
    postedAt: new Date().toISOString(),
    likes: []
  },
  {
    id: '10',
    name: 'Wooden Puzzle Collection',
    description: 'Set of 5 high-quality wooden puzzles including alphabet, numbers, shapes, animals, and vehicles. Each puzzle has knobs for easy handling.',
    ageRange: '2-5 years',
    condition: 'Like New',
    images: [
      {
        id: 'img_10',
        url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
        isPrimary: true
      },
      {
        id: 'img_10b',
        url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
        isPrimary: false
      }
    ],
    owner: {
      id: 'user_10',
      name: 'Thomas Tan',
      location: 'Serangoon, Singapore',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    },
    location: {
      latitude: 1.3554,
      longitude: 103.8679,
      address: 'Serangoon Central',
      city: 'Singapore',
      state: 'Singapore',
      country: 'Singapore'
    },
    postedAt: new Date().toISOString(),
    likes: []
  }
];