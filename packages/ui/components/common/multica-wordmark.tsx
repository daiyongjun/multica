import { cn } from "../../lib/utils";
interface MulticaWordmarkProps extends React.ComponentProps<"svg"> {
  writeDelayMs?: number;
  title?: string;
}
export function MulticaWordmark({ writeDelayMs, title = "个人工作栈", className, ...props }: MulticaWordmarkProps) {
  return <svg viewBox="0 0 250 50" role="img" aria-label={title}
    className={cn("inline-block h-[1em] w-auto shrink-0 overflow-visible", writeDelayMs != null && "multica-pop", className)} {...props}>
    <text x="0" y="40" fontSize="45" fontFamily="system-ui, sans-serif" fontWeight="600" fill="currentColor">个人工作栈</text>
  </svg>;
}
