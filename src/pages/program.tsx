import React, { useEffect, useState } from 'react';
import { Timestamp, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import ProgramCard from '@/components/ProgramCard';
import { GraduationCap, Heart, PartyPopper, Trophy } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import { TableSkeleton } from '@/components/TableSkeleton';
import CardSkeleton from '@/components/CardSkeleton';

type DataType = {
  title: string;
  date: Timestamp;
  day: Timestamp;
  time: string;
  category: string;
  location: string;
  image: string;
  url: string;
};

const categoryIcon = {
  Fest: { icon: <PartyPopper size={16} />, color: '#f87171' },
  Sport: { icon: <Trophy size={16} />, color: '#facc15' },
  Sosialt: { icon: <Heart size={16} />, color: '#a3e635' },
  Universitetet: { icon: <GraduationCap size={16} />, color: '#a78bfa' },
};

const App = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [selectedDate, setSelectedDate] = useState('All');
  const [dates, setDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const dataCollection = collection(db, 'programdata');
      const dataSnapshot = await getDocs(dataCollection);
      const docs = dataSnapshot.docs.map(doc => doc.data() as DataType);

      // Sort the data by date in ascending order
      docs.sort((a, b) => a.date.toMillis() - b.date.toMillis());

      // Sort the data by time within each date in ascending order
      docs.sort((a, b) => {
        if (a.date.toMillis() === b.date.toMillis()) {
          return a.time.localeCompare(b.time);
        }
        return 0;
      });

      setData(docs);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const uniqueDates = Array.from(
      new Set(data.map(item => format(item.date.toDate(), 'yyyy-MM-dd'))),
    );
    setDates(uniqueDates); // Removed sort call
  }, [data]);

  const map = new Map<string, Map<string, DataType[]>>();

  data.forEach(item => {
    const formattedDate = format(item.date.toDate(), 'EEEE, do MMM', {
      locale: nb,
    });

    if (!map.has(formattedDate)) {
      map.set(formattedDate, new Map<string, DataType[]>());
    }

    let dateMap = map.get(formattedDate)!;

    if (!dateMap.has(item.time)) {
      dateMap.set(item.time, []);
    }

    dateMap.get(item.time)!.push(item);
  });

  const filteredMap =
    selectedDate === 'All'
      ? map
      : new Map([
          [
            format(new Date(selectedDate), 'EEEE, do MMM', { locale: nb }),
            map.get(
              format(new Date(selectedDate), 'EEEE, do MMM', { locale: nb }),
            ) || new Map(),
          ],
        ]);

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-center pb-5">
          <label className="max-w-3xl">
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Program
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Dato</p>
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger>
                <SelectValue defaultValue="All">All</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="All">All</SelectItem>
                  {dates.map(date => (
                    <SelectItem key={date} value={date}>
                      {date}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </label>
        </div>
        {Array.from(filteredMap.entries())
  .sort(
    ([dateA], [dateB]) =>
      new Date(dateA).getTime() - new Date(dateB).getTime(),
  )
  .map(([date, dateMap]) => (
    <div key={date} className="mb-8">
      <div className="mx-auto">
        <div className="py-4">
          <h2 className="text-xl capitalize font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            {date}
          </h2>
        </div>
        <div className="flex md:flex-row">
          {Array.from(dateMap).map(([time, dataItems]) =>
            dataItems.map((item: DataType, index: number) => {
              if (isLoading) {
                return <CardSkeleton key={index} />;
              } else {
                const { icon, color } =
                  categoryIcon[
                    item.category as keyof typeof categoryIcon
                  ];
                return (
                  <ProgramCard
                    category={item.category}
                    location={item.location}
                    image={item.image}
                    url={item.url}
                    key={index}
                    time={time}
                    title={item.title}
                    date={item.date}
                    day={item.date}
                    icon={icon}
                    color={color}
                  />
                );
              }
            }),
          )}
        </div>
      </div>
    </div>
  ))}
      </div>
      <p id="alert-dialog"></p>
    </Layout>
  );
};

export default App;
