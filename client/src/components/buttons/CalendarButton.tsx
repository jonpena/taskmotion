import React, { useEffect, useRef, useState } from 'react';
import { Tooltip } from '../ui/tooltip';
import { Calendar } from '../ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconButton } from '../ui/icon-button';

type CalendarButtonProps = {
  date: string | undefined;
  setDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  disabled?: boolean;
  className?: string;
};

export const CalendarButton = ({
  date,
  setDate,
  disabled,
}: CalendarButtonProps) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsCalendarVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex flex-col items-start relative'>
      <Tooltip title='Pick date' asChild={false}>
        <IconButton
          ref={buttonRef}
          onClick={() => setIsCalendarVisible(!isCalendarVisible)}
          disabled={disabled}
          className='w-7 h-7 mr-1 opacity-0 group-focus-within:opacity-100'
          icon={
            <CalendarIcon
              className='w-4 select-none pointer-events-none
             text-neutral-500 dark:text-neutral-300'
            />
          }
        />
      </Tooltip>
      <AnimatePresence>
        {isCalendarVisible && (
          <motion.div
            ref={calendarRef}
            className='z-50'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.13 }}
          >
            <Calendar
              mode='single'
              selected={date ? new Date(date) : new Date()}
              onSelect={(date) => {
                setDate(date ? date.toISOString() : new Date().toISOString());
                setIsCalendarVisible(false);
              }}
              className='rounded-md border shadow absolute -translate-x-[calc(100%-2rem)] translate-y-1 bg-background'
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
