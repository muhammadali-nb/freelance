"use client";

import { Message } from "@/components/chat/message";
import { MessageInput } from "@/components/chat/message-input";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";

// Моковые данные для примера
const mockMessages = [
  {
    id: "1",
    content: "Здравствуйте! Я заинтересован в вашем проекте.",
    sender: {
      id: "f1",
      name: "Иван Петров",
      avatar: "/avatars/ivan.jpg"
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 часа назад
  },
  {
    id: "2",
    content: "Добрый день! Расскажите подробнее о вашем опыте работы с подобными проектами.",
    sender: {
      id: "c1",
      name: "Анна Смирнова",
      avatar: "/avatars/anna.jpg"
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60) // 1 час назад
  },
  // Добавьте больше сообщений по необходимости
];

export default function ChatPage() {
  const params = useParams<{ userId: string;}>()
  const [messages, setMessages] = useState(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = "c1"; // В реальном приложении получайте из контекста аутентификации

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      sender: {
        id: currentUserId,
        name: "Анна Смирнова",
        avatar: "/avatars/anna.jpg"
      },
      createdAt: new Date()
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      {/* Заголовок чата */}
      <div className="flex items-center gap-3 p-2 sm:p-4 border-b">
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
          <AvatarImage src="/avatars/ivan.jpg" alt="Иван Петров" />
          <AvatarFallback>ИП</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium text-sm sm:text-base">Иван Петров</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Full-Stack Developer</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4">
        {messages.map((message) => (
          <Message
            key={message.id}
            content={message.content}
            sender={message.sender}
            createdAt={message.createdAt}
            isCurrentUser={message.sender.id === currentUserId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-2 sm:p-4">
        <MessageInput onSend={handleSendMessage} />
      </div>
    </div>
  );
} 