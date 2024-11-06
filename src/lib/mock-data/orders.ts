import { Order } from "@/lib/types/order";

export const mockOrders: Order[] = [
  {
    id: "1",
    title: "Разработка веб-приложения",
    description: "Требуется разработать веб-приложение для управления задачами...",
    budget: 100000,
    deadline: "2024-04-01", 
    status: "open",
    category: "Web Development",
    skills: ["React", "Node.js", "TypeScript"],
    createdAt: "2024-03-01",
    client: {
      id: "c1",
      name: "Иван Петров",
      avatar: "/avatars/client1.jpg"
    }
  },
  {
    id: "2", 
    title: "Мобильное приложение для доставки еды",
    description: "Нужно разработать мобильное приложение для сервиса доставки еды...",
    budget: 150000,
    deadline: "2024-05-01",
    status: "open",
    category: "Mobile Development", 
    skills: ["React Native", "Firebase", "Redux"],
    createdAt: "2024-03-02",
    client: {
      id: "c2", 
      name: "Мария Иванова",
      avatar: "/avatars/client2.jpg"
    }
  },
  {
    id: "3",
    title: "Редизайн корпоративного сайта",
    description: "Требуется обновить дизайн и улучшить юзабилити корпоративного сайта...",
    budget: 80000,
    deadline: "2024-04-15",
    status: "open", 
    category: "Design",
    skills: ["UI/UX", "Figma", "Web Design"],
    createdAt: "2024-03-03",
    client: {
      id: "c3",
      name: "Алексей Смирнов", 
      avatar: "/avatars/client3.jpg"
    }
  },
  {
    id: "4",
    title: "Разработка CRM системы",
    description: "Необходимо разработать CRM систему для управления клиентами...",
    budget: 200000,
    deadline: "2024-06-01",
    status: "open",
    category: "Web Development",
    skills: ["Angular", "MongoDB", "Express"],
    createdAt: "2024-03-04",
    client: {
      id: "c4",
      name: "Елена Козлова",
      avatar: "/avatars/client4.jpg"
    }
  },
  {
    id: "5",
    title: "Создание игрового приложения",
    description: "Требуется разработать 2D игру для мобильных устройств...",
    budget: 120000,
    deadline: "2024-05-15",
    status: "open",
    category: "Game Development",
    skills: ["Unity", "C#", "2D Animation"],
    createdAt: "2024-03-05",
    client: {
      id: "c5",
      name: "Дмитрий Волков",
      avatar: "/avatars/client5.jpg"
    }
  },
  {
    id: "6",
    title: "SEO оптимизация интернет-магазина",
    description: "Требуется провести полную SEO оптимизацию крупного интернет-магазина...",
    budget: 90000,
    deadline: "2024-04-30",
    status: "open",
    category: "Marketing",
    skills: ["SEO", "Google Analytics", "Content Marketing"],
    createdAt: "2024-03-06",
    client: {
      id: "c6",
      name: "Ольга Соколова",
      avatar: "/avatars/client6.jpg"
    }
  },
  {
    id: "7",
    title: "Разработка чат-бота",
    description: "Необходимо разработать чат-бота для автоматизации поддержки клиентов...",
    budget: 130000,
    deadline: "2024-05-20",
    status: "open",
    category: "AI Development",
    skills: ["Python", "Machine Learning", "NLP"],
    createdAt: "2024-03-07",
    client: {
      id: "c7",
      name: "Сергей Морозов",
      avatar: "/avatars/client7.jpg"
    }
  },
  {
    id: "8",
    title: "Создание корпоративного видеоролика",
    description: "Требуется создать презентационный видеоролик для компании...",
    budget: 170000,
    deadline: "2024-05-10",
    status: "open",
    category: "Video Production",
    skills: ["Video Editing", "Motion Graphics", "After Effects"],
    createdAt: "2024-03-08",
    client: {
      id: "c8",
      name: "Анна Белова",
      avatar: "/avatars/client8.jpg"
    }
  }
];