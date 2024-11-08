export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto max-w-5xl h-[calc(100vh-4rem)]">
      {children}
    </div>
  );
} 