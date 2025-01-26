import {
  Tooltip as TooltipPrimitive,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type TooltipProps = {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  asChild?: boolean;
};

const Tooltip = ({ title, children, asChild = true }: TooltipProps) => {
  return (
    <TooltipProvider delayDuration={900}>
      <TooltipPrimitive defaultOpen={false}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent>
          <span>{title}</span>
        </TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  );
};

export { Tooltip };
