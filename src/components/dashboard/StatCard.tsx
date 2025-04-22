
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon, change, className }: StatCardProps) {
  return (
    <div className={cn("bg-white shadow rounded-xl p-5", className)}>
      <div className="flex justify-between">
        <div>
          <p className="text-nepal-mediumgray text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && (
            <div className="flex items-center mt-1">
              <div
                className={cn(
                  "text-xs font-medium flex items-center",
                  change.positive ? "text-status-resolved" : "text-status-action"
                )}
              >
                {change.positive ? "↑" : "↓"} {change.value}%
              </div>
              <div className="text-xs text-nepal-mediumgray ml-1">from last month</div>
            </div>
          )}
        </div>
        <div className="h-12 w-12 rounded-lg bg-nepal-blue flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
}
