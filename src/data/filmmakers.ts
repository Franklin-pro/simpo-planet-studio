export interface Filmmaker {
  _id: string;
  name: string;
  bio: string;
  image: string;
  specialization: 'Director' | 'Producer' | 'Cinematographer' | 'Editor' | 'Writer';
  experience: number;
  portfolio: {
    title: string;
    year: number;
    role: string;
  }[];
  contact: {
    email: string;
    phone: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const filmmakers: Filmmaker[] = [
  {
    _id: "1",
    name: "Sarah Johnson",
    bio: "Award-winning director with over 15 years of experience in independent cinema. Known for her compelling storytelling and unique visual style.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
    specialization: "Director",
    experience: 15,
    portfolio: [
      { title: "Midnight Dreams", year: 2023, role: "Director" },
      { title: "City Lights", year: 2022, role: "Director" },
      { title: "The Journey", year: 2021, role: "Director/Writer" }
    ],
    contact: {
      email: "sarah.johnson@email.com",
      phone: "+1-555-0123"
    },
    isActive: true,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    _id: "2",
    name: "Michael Chen",
    bio: "Cinematographer specializing in documentary and narrative films. Expert in natural lighting and handheld camera work.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    specialization: "Cinematographer",
    experience: 12,
    portfolio: [
      { title: "Ocean's Call", year: 2023, role: "Director of Photography" },
      { title: "Urban Stories", year: 2022, role: "Cinematographer" },
      { title: "Silent Voices", year: 2021, role: "Camera Operator" }
    ],
    contact: {
      email: "m.chen@filmstudio.com",
      phone: "+1-555-0456"
    },
    isActive: true,
    createdAt: "2023-02-20T14:30:00Z",
    updatedAt: "2024-02-20T14:30:00Z"
  },
  {
    _id: "3",
    name: "Emma Rodriguez",
    bio: "Creative producer with a passion for bringing innovative stories to life. Experienced in budget management and team coordination.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    specialization: "Producer",
    experience: 10,
    portfolio: [
      { title: "Breaking Boundaries", year: 2023, role: "Executive Producer" },
      { title: "New Horizons", year: 2022, role: "Producer" },
      { title: "First Light", year: 2020, role: "Associate Producer" }
    ],
    contact: {
      email: "emma.rodriguez@productions.com",
      phone: "+1-555-0789"
    },
    isActive: true,
    createdAt: "2023-03-10T09:15:00Z",
    updatedAt: "2024-03-10T09:15:00Z"
  },
  {
    _id: "4",
    name: "David Thompson",
    bio: "Film editor with expertise in both narrative and commercial work. Known for creating seamless transitions and emotional pacing.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    specialization: "Editor",
    experience: 8,
    portfolio: [
      { title: "Time Fragments", year: 2023, role: "Lead Editor" },
      { title: "Echoes", year: 2022, role: "Editor" },
      { title: "Reflections", year: 2021, role: "Assistant Editor" }
    ],
    contact: {
      email: "david.thompson@editpro.com",
      phone: "+1-555-0321"
    },
    isActive: true,
    createdAt: "2023-04-05T16:45:00Z",
    updatedAt: "2024-04-05T16:45:00Z"
  },
  {
    _id: "5",
    name: "Lisa Park",
    bio: "Screenwriter and script doctor with a talent for character development and dialogue. Specializes in drama and thriller genres.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    specialization: "Writer",
    experience: 6,
    portfolio: [
      { title: "Shadows of Tomorrow", year: 2023, role: "Screenwriter" },
      { title: "The Last Chapter", year: 2022, role: "Writer/Story Editor" },
      { title: "Crossroads", year: 2021, role: "Script Consultant" }
    ],
    contact: {
      email: "lisa.park@writers.com",
      phone: "+1-555-0654"
    },
    isActive: true,
    createdAt: "2023-05-12T11:20:00Z",
    updatedAt: "2024-05-12T11:20:00Z"
  }
];