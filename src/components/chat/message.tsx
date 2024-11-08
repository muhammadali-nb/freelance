"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { MoreHorizontal, Reply, Smile, Forward } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const EmojiPicker = dynamic(() => import('@emoji-mart/react'), {
	ssr: false,
	loading: () => <div className="p-4">Загрузка...</div>
});

interface MessageProps {
	content: string;
	sender: {
		id: string;
		name: string;
		avatar?: string;
	};
	createdAt: Date;
	isCurrentUser: boolean;
	attachments?: Array<{
		type: "image" | "file" | "audio";
		url: string;
		name?: string;
		size?: number;
	}>;
	replyTo?: {
		id: string;
		content: string;
		sender: string;
	};
	onReply?: () => void;
	onForward?: () => void;
	onDelete?: () => void;
	onReact?: (emoji: string) => void;
	reactions?: Array<{emoji: string, count: number}>;
}

export function Message({
	content,
	sender,
	createdAt,
	isCurrentUser,
	attachments,
	replyTo,
	onReply,
	onForward,
	onDelete,
	onReact,
	reactions = []
}: MessageProps) {
	// Используем useMemo для мемоизации реакций
	const messageReactions = useMemo(() => reactions, [reactions]);

	const handleEmojiSelect = (emoji: any) => {
		if (onReact && emoji?.native) {
			onReact(emoji.native);
		}
	};

	return (
		<div
			className={cn(
				"group flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%] md:max-w-[75%]",
				isCurrentUser ? "ml-auto flex-row-reverse" : "mr-auto"
			)}>
			<Avatar className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10">
				<AvatarImage src={sender.avatar} alt={sender.name} />
				<AvatarFallback>{sender.name[0]}</AvatarFallback>
			</Avatar>
			<div
				className={cn("flex flex-col relative", isCurrentUser && "items-end")}>
				{/* Reply to message */}
				{replyTo && (
					<div
						className={cn(
							"text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1 px-2 sm:px-4",
							"border-l-2 border-primary/50"
						)}>
						<span className="font-medium">{replyTo.sender}</span>
						<p className="truncate">{replyTo.content}</p>
					</div>
				)}

				<div className="flex items-start gap-1 sm:gap-2">
					<div className="flex flex-col justify-between items-center">
						<Button
							variant="ghost"
							size="icon"
							className="h-5 w-5 sm:h-6 sm:w-6"
							onClick={onReply}>
							<Reply className="h-3 w-3 sm:h-4 sm:w-4" />
						</Button>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="h-5 w-5 sm:h-6 sm:w-6">
									<Smile className="h-3 w-3 sm:h-4 sm:w-4" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-full p-0" align="start">
								<EmojiPicker
									onEmojiSelect={handleEmojiSelect}
									theme="light"
									locale="ru"
									data={async () => {
										const response = await fetch(
											'https://cdn.jsdelivr.net/npm/@emoji-mart/data'
										);
										return response.json();
									}}
								/>
							</PopoverContent>
						</Popover>
					</div>

					{/* Message content */}
					<div
						className={cn(
							"rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4",
							isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
						)}>
						<div className="flex items-center justify-between gap-1 sm:gap-2 mb-0.5 sm:mb-1">
							{!isCurrentUser && (
								<span className="text-[10px] sm:text-xs font-medium">
									{sender.name}
								</span>
							)}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="h-5 w-5 sm:h-6 sm:w-6 -mr-1 sm:-mr-2">
										<MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align={isCurrentUser ? "end" : "start"}>
									<DropdownMenuItem onClick={onReply}>
										Ответить
									</DropdownMenuItem>
									<DropdownMenuItem onClick={onForward}>
										Переслать
									</DropdownMenuItem>
									{isCurrentUser && (
										<DropdownMenuItem
											onClick={onDelete}
											className="text-destructive">
											Удалить
										</DropdownMenuItem>
									)}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<p className="text-xs sm:text-sm md:text-base whitespace-pre-wrap">
							{content}
						</p>

						{attachments && attachments.length > 0 && (
							<div className="mt-1.5 sm:mt-2 space-y-1.5 sm:space-y-2">
								{attachments.map((attachment, index) => (
									<div key={index} className="rounded-lg overflow-hidden">
										{attachment.type === "image" && (
											<img
												src={attachment.url}
												alt="attachment"
												className="max-w-full h-auto"
											/>
										)}
										{attachment.type === "file" && (
											<div className="bg-background/10 p-1.5 sm:p-2 rounded flex items-center gap-1 sm:gap-2">
												<span className="text-xs sm:text-sm truncate">
													{attachment.name}
												</span>
												<span className="text-[10px] sm:text-xs opacity-70">
													{Math.round(attachment.size! / 1024)}KB
												</span>
											</div>
										)}
									</div>
								))}
							</div>
						)}

						{/* Reactions */}
						{messageReactions.length > 0 && (
							<div className="flex flex-wrap gap-1 mt-1">
								{messageReactions.map((reaction, index) => (
									<button
										key={index}
										onClick={() => onReact?.(reaction.emoji)}
										className="bg-background/20 rounded-full px-2 py-0.5 text-xs hover:bg-background/30 transition-colors"
									>
										{reaction.emoji} {reaction.count}
									</button>
								))}
							</div>
						)}
					</div>
				</div>

				<div className="flex items-center gap-2">
					<span className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
						{formatDistanceToNow(createdAt, { locale: ru, addSuffix: true })}
					</span>
				</div>
			</div>
		</div>
	);
}
