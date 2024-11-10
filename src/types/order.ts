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