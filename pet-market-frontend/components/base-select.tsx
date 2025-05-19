import React, { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface BaseSelectProps {
  selectTitle: string;
  items: {
    label: string;
    value: string;
  }[];
  value?: string;
  placeholder: string;
  disabled?: boolean;
  className?: string;
  setValue: (value: string | undefined) => void;
}

export const BaseSelect: React.FC<BaseSelectProps> = ({
  items,
  className,
  placeholder,
  selectTitle,
  value,
  setValue,
  disabled = false,
}) => {
  const [key, setKey] = React.useState(+new Date());

  useEffect(() => {
    setKey(+new Date());
  }, [value]);

  return (
    <Select key={key} value={value ?? ''} onValueChange={setValue}>
      <SelectTrigger className={className} disabled={disabled}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectTitle}</SelectLabel>
          {items.map((item) => (
            <SelectItem value={item.value} key={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
