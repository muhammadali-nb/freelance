export interface Order {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  category: string;
  skills: string[];
  createdAt: string;
  client: {
    id: string;
    name: string;
    avatar?: string;
  };
} 