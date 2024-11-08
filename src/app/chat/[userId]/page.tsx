"use client";

import { Message } from "@/components/chat/message";
import { MessageInput } from "@/components/chat/message-input";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";

interface MessageType {
	id: string;
	content: string;
	sender: {
		id: string;
		name: string;
		avatar?: string;
	};
	createdAt: Date;
	replyTo?: {
		id: string;
		content: string;
		sender: string;
	};
}

// Моковые данные для примера
const mockMessages = [
	{
		id: "1",
		content: "Здравствуйте! Я заинтересован в вашем проекте.",
		sender: {
			id: "f1",
			name: "Иван Петров",
			avatar: "/avatars/ivan.jpg",
		},
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 часа назад
	},
	{
		id: "2",
		content:
			"Добрый день! Расскажите подробнее о вашем опыте работы с подобными проектами.",
		sender: {
			id: "c1",
			name: "Анна Смирнова",
			avatar: "/avatars/anna.jpg",
		},
		createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 час назад
	},
];

export default function ChatPage() {
	const params = useParams<{ userId: string }>();
	const [messages, setMessages] = useState<MessageType[]>(mockMessages);
	const [replyingTo, setReplyingTo] = useState<MessageType | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const currentUserId = "c1";

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	// Обработчики сообщений
	const handleSendMessage = (content: string, attachments?: File[]) => {
		const newMessage: MessageType = {
			id: Date.now().toString(),
			content,
			sender: {
				id: currentUserId,
				name: "Анна Смирнова",
				avatar: "/avatars/anna.jpg",
			},
			createdAt: new Date(),
			...(replyingTo && {
				replyTo: {
					id: replyingTo.id,
					content: replyingTo.content,
					sender: replyingTo.sender.name,
				},
			}),
		};
		setMessages([...messages, newMessage]);
		setReplyingTo(null);
	};

	const handleReply = (message: MessageType) => {
		setReplyingTo(message);
	};

	const handleCancelReply = () => {
		setReplyingTo(null);
	};

	const handleDelete = (messageId: string) => {
		setMessages(messages.filter((msg) => msg.id !== messageId));
	};

	return (
		<div className="flex flex-col h-[100dvh] bg-background">
			{/* Фиксированный заголовок */}
			<div className="flex items-center gap-3 p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-20">
				<Avatar className="h-8 w-8 sm:h-10 sm:w-10">
					<AvatarImage src="/avatars/ivan.jpg" alt="Иван Петров" />
					<AvatarFallback>ИП</AvatarFallback>
				</Avatar>
				<div>
					<h2 className="font-medium text-sm sm:text-base">Иван Петров</h2>
					<p className="text-xs sm:text-sm text-muted-foreground">
						Full-Stack Developer
					</p>
				</div>
			</div>

			{/* Контейнер для сообщений с минимальной высотой */}
			<div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4 min-h-[50dvh]">
				{messages.length === 0 ? (
					<div className="flex items-center justify-center h-full text-muted-foreground">
						Нет сообщений
					</div>
				) : (
					messages.map((message) => (
						<Message
							key={message.id}
							content={message.content}
							sender={message.sender}
							createdAt={message.createdAt}
							isCurrentUser={message.sender.id === currentUserId}
							replyTo={message.replyTo}
							onReply={() => handleReply(message)}
							onDelete={() => handleDelete(message.id)}
							onForward={() => {
								/* Добавить функционал пересылки */
							}}
						/>
					))
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Фиксированный ввод сообщения */}
			<div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t z-20">
				<MessageInput
					onSend={handleSendMessage}
					replyTo={
						replyingTo
							? {
									id: replyingTo.id,
									content: replyingTo.content,
									sender: replyingTo.sender.name,
							  }
							: undefined
					}
					onCancelReply={handleCancelReply}
				/>
			</div>
		</div>
	);
}
