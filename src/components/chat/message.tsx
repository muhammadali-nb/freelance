"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { Forward, MoreHorizontal, Reply } from "lucide-react";
import { useTheme } from "next-themes";

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
	reactions?: Array<{ emoji: string; count: number }>;
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
	reactions = [],
}: MessageProps) {
	const { theme } = useTheme();

	// Используем useMemo для мемоизации реакций

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
				{replyTo && (
					<div
						className={cn(
							"text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1 px-2 sm:px-4 max-w-[260px] sm:max-w-full",
							"border-l-2 border-primary/50"
						)}>
						<span className="font-medium block truncate">{replyTo.sender}</span>
						<p className="truncate">{replyTo.content}</p>
					</div>
				)}

				<div
					className={cn(
						"flex items-start gap-1 sm:gap-2 ",
						!isCurrentUser && "flex-row-reverse"
					)}>
					{isCurrentUser ? (
						<Button
							variant="ghost"
							size="icon"
							className="h-5 w-5 sm:h-6 sm:w-6"
							onClick={onReply}>
							<Reply className="h-3 w-3 sm:h-4 sm:w-4" />
						</Button>
					) : (
						<Button
							variant="ghost"
							size="icon"
							className="h-5 w-5 sm:h-6 sm:w-6"
							onClick={onReply}>
							<Forward className="h-3 w-3 sm:h-4 sm:w-4" />
						</Button>
					)}

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
