import { cn } from "@/lib/utils";
export default function ({ children, ...props }) {
  let { className } = props;
  return (
    <div className={cn("mx-auto max-w-screen-md p-2", className)}>
      {children}
    </div>
  );
}
