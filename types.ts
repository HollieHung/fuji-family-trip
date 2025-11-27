export enum ActivityType {
  Transport = '交通',
  Food = '美食',
  Sightseeing = '景點',
  Hotel = '住宿',
  Shopping = '購物',
  Mission = '任務',
  Marathon = '賽事',
}

export interface WeatherInfo {
  temp: string; // Display string like "6°C - 13°C"
  condition: string;
  icon: string; // emoji
  avgTemp: number; // Numeric average for logic
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  type: ActivityType;
  description?: string; // Short description for the card
  detailedDescription?: string; // Long description for the modal
  locationName: string; // Used for Google Maps query
  tips?: string[]; // Highlights displayed on card
  photoSpots?: string[]; // Specific photography advice
  menuRecommendations?: string[]; // Specific food advice
  imageUrl?: string; // Cover image for the activity
  tabelogUrl?: string; // Specific link for restaurants
  links?: { label: string; url: string }[];
  navLink?: string; // Optional override for navigation query
}

export interface DayPlan {
  date: string; // e.g., "12/12"
  dayOfWeek: string; // e.g., "(五)"
  title: string;
  weather: WeatherInfo;
  activities: Activity[];
}

export interface FlightInfo {
  code: string;
  airline: string;
  depTime: string;
  arrTime: string;
  from: string;
  to: string;
  terminal: string;
}

export interface Accommodation {
  name: string;
  address: string;
  checkIn: string;
  notes: string;
  link?: string;
}

// 穿搭建議資料庫類型
export interface OutfitAdvice {
  minTemp: number;
  maxTemp: number;
  title: string;
  description: string;
  items: string[];
}