import React, { useEffect, useRef, useState } from 'react';
import { Tooltip } from '../Tooltip';
import { Calendar } from '../ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type CalendarButtonProps = {
  date: string | undefined;
  setDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  disabled: boolean;
  className?: string;
};

export const CalendarButton = ({
  date,
  setDate,
  disabled,
  className,
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
      <Tooltip title='Pick date'>
        <button
          ref={buttonRef}
          onClick={() => setIsCalendarVisible(!isCalendarVisible)}
          disabled={disabled}
          className={
            `bg-white dark:bg-neutral-800 w-8 h-8 right-2 top-3 flex justify-center items-center 
              text-sm font-medium flex-grow-1 rounded-lg select-none aspect-square mr-1 group-focus-within:opacity-100
    transition-opacity duration-200 ` + className
          }
        >
          <CalendarIcon className='w-4 select-none pointer-events-none text-neutral-500 dark:text-neutral-300' />
        </button>
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
