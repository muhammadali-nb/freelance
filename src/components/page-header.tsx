import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function PageHeader({ icon: Icon, title, description }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
          {description}
        </p>
      </div>
    </div>
  );
} 