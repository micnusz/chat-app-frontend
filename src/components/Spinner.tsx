import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type SpinnerProps = React.HTMLAttributes<SVGElement>;

export default function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Loader2 className={cn("animate-spin h-5 w-5", className)} {...props} />
  );
}
