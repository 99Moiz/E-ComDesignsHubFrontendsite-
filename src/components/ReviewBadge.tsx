import { Star } from "lucide-react";

interface ReviewBadgeProps {
  rating?: string;
  count?: string;
  source?: string;
  className?: string;
}

const ReviewBadge = ({ rating = "4.9", count = "120+", source = "Google", className = "" }: ReviewBadgeProps) => (
  <div className={`inline-flex items-center gap-3 rounded-md border border-line bg-white px-4 py-2.5 ${className}`}>
    <span className="font-heading text-2xl font-semibold leading-none">{rating}</span>
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="fill-primary text-primary" />
      ))}
    </span>
    <span className="text-sm text-muted-foreground">
      {count} reviews on {source}
    </span>
  </div>
);

export default ReviewBadge;
