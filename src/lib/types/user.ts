import { UserRole } from "@/context/role-context";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  company?: string;
  specialization?: string;
  bio?: string;
  phone?: string;
}

export interface UserProfile extends User {
  portfolio?: Portfolio;
  reviews?: Review[];
}

export interface Portfolio {
  items: PortfolioItem[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
} 