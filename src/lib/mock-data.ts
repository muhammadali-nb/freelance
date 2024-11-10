import { ClientOrder, FreelancerOrder } from "@/types/order";

export const mockClientOrders: ClientOrder[] = [
  {
    id: "1",
    title: "Разработка веб-приложения",
    description: "Требуется разработать веб-приложение для управления задачами с возможностью создания проектов, назначения исполнителей и отслеживания прогресса.",
    budget: 100000,
    status: "in_review",
    responses: 5,
    views: 120,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: "2",
    title: "Мобильное приложение для доставки",
    description: "Нужно разработать мобильное приложение для службы доставки еды с функциями отслеживания заказа в реальном времени.",
    budget: 150000,
    status: "paused",
    responses: 3,
    views: 85,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "3",
    title: "Редизайн корпоративного сайта",
    description: "Требуется обновить дизайн существующего корпоративного сайта, сделать его современным и адаптивным.",
    budget: 80000,
    status: "completed",
    responses: 7,
    views: 200,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  }
];

export const mockFreelancerOrders: FreelancerOrder[] = [
  {
    id: "1",
    title: "Разработка CRM системы",
    description: "Разработка системы управления взаимоотношениями с клиентами с интеграцией почтовых сервисов и API платежных систем.",
    budget: 200000,
    status: "in_progress",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    client: {
      id: "c1",
      name: "Иван Петров",
      avatar: "/avatars/client1.jpg"
    },
    attachments: [
      {
        id: "1",
        name: "Техническое задание.pdf",
        url: "/files/tz.pdf",
        size: 2.5
      },
      {
        id: "2",
        name: "Макеты.fig",
        url: "/files/design.fig",
        size: 15.8
      }
    ]
  },
  {
    id: "2",
    title: "Интеграция платежной системы",
    description: "Интеграция платежного шлюза в существующий интернет-магазин с поддержкой различных способов оплаты.",
    budget: 120000,
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    client: {
      id: "c2",
      name: "Мария Иванова",
      avatar: "/avatars/client2.jpg"
    },
    attachments: [
      {
        id: "3",
        name: "Документация API.pdf",
        url: "/files/api-docs.pdf",
        size: 1.8
      }
    ]
  }
]; 