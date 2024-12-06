import {
  Tooltip as TooltipPrimitive,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type TooltipProps = {
  title: string;
  disable?: boolean;
  children: React.ReactNode | React.ReactNode[];
};

const Tooltip = ({ title, disable = false, children }: TooltipProps) => {
  if (disable) return <>{children}</>;

  return (
    <TooltipProvider delayDuration={900}>
      <TooltipPrimitive defaultOpen={false}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  );
};

export { Tooltip };
