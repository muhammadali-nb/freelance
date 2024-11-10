export type OrderStatus =
  | "active"
  | "paused"
  | "completed"
  | "deleted"
  | "in_progress"
  | "in_review"
  | "revision"
  | "disputed"
  | "cancelled"
  | "pending";

export interface BaseOrder {
  id: string;
  title: string;
  description: string;
  budget: number;
  createdAt: Date;
}

export interface ClientOrder extends BaseOrder {
  status: OrderStatus;
  responses: number;
  views: number;
}

export interface FreelancerOrder extends BaseOrder {
  status: OrderStatus;
  client: {
    id: string;
    name: string;
    avatar?: string;
  };
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    size: number;
  }>;
}

export interface OrderFormData {
  title: string;
  description: string;
  budget: string;
  category: string;
  completionDate: string;
  attachments: File[] | null;
  orderCategory: string;
  deadline: string;
  status: 'open' | 'paused' | 'completed' | 'deleted';
  views: number;
  proposals: number;
  client: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    completedProjects: number;
    totalSpent: number;
    location: string;
    registeredAt: string;
    description: string;
    successRate: number;
  };
}