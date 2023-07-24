// DatePicker.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

type DatePickerProps = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  dates: string[];
};

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  setSelectedDate,
  dates,
}) => (
  <div className="flex justify-center pb-5 z-10 font-poppins">
    <label className="max-w-3xl">
      <p className="text-gray-600 dark:text-gray-400">Dato</p>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={'w-[240px] pl-3 text-left font-normal'}
          >
            {selectedDate !== null ? (
              <span className='capitalize'>{format(selectedDate || new Date(), 'EEE, do MMM', { locale: nb })}</span>
            ) : (
              <span>Pick a date</span>
            )}

            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={date => setSelectedDate(date)}
            disabled={date => !dates.includes(format(date, 'yyyy-MM-dd'))}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </label>
  </div>
);
