"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
	Image as ImageIcon,
	Mic,
	MoreHorizontal,
	Paperclip,
	SendHorizontal,
	X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { KeyboardEvent, useRef, useState } from "react";

interface MessageInputProps {
	onSend: (message: string, attachments?: File[]) => void;
	replyTo?: {
		id: string;
		content: string;
		sender: string;
	};
	onCancelReply?: () => void;
}

export function MessageInput({
	onSend,
	replyTo,
	onCancelReply,
}: MessageInputProps) {
	const [message, setMessage] = useState("");
	const [attachments, setAttachments] = useState<File[]>([]);
	const [isRecording, setIsRecording] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const imageInputRef = useRef<HTMLInputElement>(null);
	const { theme } = useTheme();

	const handleSend = () => {
		if (message.trim() || attachments.length > 0) {
			onSend(message.trim(), attachments);
			setMessage("");
			setAttachments([]);
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		setAttachments([...attachments, ...files]);
	};

	const removeAttachment = (index: number) => {
		setAttachments(attachments.filter((_, i) => i !== index));
	};

	const handleEmojiSelect = (emoji: any) => {
		setMessage((prev) => prev + emoji.native);
	};

	const toggleRecording = () => {
		setIsRecording(!isRecording);
		// Здесь добавить логику записи голосового сообщения
	};

	return (
		<div className="p-2 sm:p-3 md:p-4 border-t bg-background">
			{/* Reply indicator */}
			{replyTo && (
				<div className="flex items-center justify-between mb-1.5 sm:mb-2 p-1.5 sm:p-2 bg-muted rounded max-w-full">
					<div className="flex-1 min-w-0">
						<p className="text-[10px] sm:text-xs font-medium truncate">
							Ответ для {replyTo.sender}
						</p>
						<p className="text-[10px] sm:text-xs text-muted-foreground truncate">
							{replyTo.content}
						</p>
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 ml-2"
						onClick={onCancelReply}>
						<X className="h-3 w-3 sm:h-4 sm:w-4" />
					</Button>
				</div>
			)}

			{/* Attachments preview */}
			{attachments.length > 0 && (
				<div className="flex flex-wrap gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
					{attachments.map((file, index) => (
						<div
							key={index}
							className="relative group bg-muted rounded p-1.5 sm:p-2 text-[10px] sm:text-xs">
							<span className="truncate max-w-[80px] sm:max-w-[100px] block">
								{file.name}
							</span>
							<Button
								variant="ghost"
								size="icon"
								className="h-3 w-3 sm:h-4 sm:w-4 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100"
								onClick={() => removeAttachment(index)}>
								<X className="h-2 w-2 sm:h-3 sm:w-3" />
							</Button>
						</div>
					))}
				</div>
			)}

			<div className="flex items-end gap-1.5 sm:gap-2">
				<div className="flex-1">
					<Textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Введите сообщение..."
						className="min-h-[36px] sm:min-h-[40px] md:min-h-[44px] max-h-[100px] sm:max-h-[120px] resize-none"
					/>
				</div>

				<div className="flex gap-0.5 sm:gap-1">
					<input
						type="file"
						ref={fileInputRef}
						className="hidden"
						onChange={handleFileSelect}
						multiple
					/>
					<input
						type="file"
						ref={imageInputRef}
						className="hidden"
						accept="image/*"
						onChange={handleFileSelect}
						multiple
					/>

					{/* Desktop buttons */}
					<div className="hidden lg:flex gap-0.5">
						<Button
							variant="ghost"
							size="icon"
							className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11"
							onClick={() => fileInputRef.current?.click()}>
							<Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11"
							onClick={() => imageInputRef.current?.click()}>
							<ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className={`h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 ${
								isRecording ? "text-destructive" : ""
							}`}
							onClick={toggleRecording}>
							<Mic className="h-4 w-4 sm:h-5 sm:w-5" />
						</Button>
					</div>

					{/* Mobile/Tablet dropdown */}
					<div className="lg:hidden">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11">
									<MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
									<Paperclip className="h-4 w-4 mr-2" />
									Прикрепить файл
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => imageInputRef.current?.click()}>
									<ImageIcon className="h-4 w-4 mr-2" />
									Прикрепить изображение
								</DropdownMenuItem>

								<DropdownMenuItem onClick={toggleRecording}>
									<Mic className="h-4 w-4 mr-2" />
									Голосовое сообщение
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					<Button
						onClick={handleSend}
						size="icon"
						className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11">
						<SendHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
					</Button>
				</div>
			</div>
		</div>
	);
}
