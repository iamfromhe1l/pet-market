import React, { PropsWithChildren } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

interface BaseTooltipProps extends PropsWithChildren {
  text: string;
}

export const BaseTooltip: React.FC<BaseTooltipProps> = ({ text, children }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};
