import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  href: string;
  color?: string;
}

export default function StatCard({
  title,
  count,
  icon: Icon,
  href,
  color = "bg-[#8B1A1A]",
}: StatCardProps) {
  return (
    <div
      className={`${color} rounded-lg text-white p-6 relative overflow-hidden group hover:shadow-lg transition-shadow`}
    >
      {/* Background Icon */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
        <Icon className="w-24 h-24" strokeWidth={1} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-4xl font-bold mb-2">{count}</div>
        <div className="text-sm font-medium mb-4 opacity-90">{title}</div>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
        >
          More info →
        </Link>
      </div>
    </div>
  );
}
