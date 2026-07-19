import { Star } from "lucide-react";

interface ReviewBadgeProps {
  rating?: string;
  count?: string;
  source?: string;
  className?: string;
}

const ReviewBadge = ({
  rating = "4.9",
  count = "120+",
  source = "Google Reviews",
  className = "",
}: ReviewBadgeProps) => (
  <div
    className={`inline-flex items-center gap-3 rounded-full border border-line bg-card px-4 py-2 ${className}`}
  >
    <div className="flex -space-x-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="fill-accent text-accent" />
      ))}
    </div>
    <span className="h-4 w-px bg-line" />
    <span className="text-sm">
      <span className="font-heading font-semibold">{rating}</span>
      <span className="text-muted-foreground"> · {count} reviews on {source}</span>
    </span>
  </div>
);

export default ReviewBadge;
