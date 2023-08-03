import React, { useEffect, useState } from 'react';
import { Timestamp, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import ProgramCard from '@/components/ProgramCard';
import { GraduationCap, Heart, PartyPopper, Trophy } from 'lucide-react';

import Layout from '@/components/layout/Layout';

import { Card } from '@/components/ui/card';
import { DatePicker } from '@/components/DateProgram';
import { CategoryButtons } from '@/components/CategoryButtons';
import { cn } from '@/lib/utils';

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dates, setDates] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState(
    new Set<string>(),
  );

  const toggleCategory = (category: string) => {
    if (selectedCategories.has(category)) {
      setSelectedCategories(prev => {
        const newSet = new Set(prev);
        newSet.delete(category);
        return newSet;
      });
    } else {
      setSelectedCategories(prev => new Set(prev.add(category)));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataCollection = collection(db, 'programdata');
      const dataSnapshot = await getDocs(dataCollection);
      const docs = dataSnapshot.docs.map(doc => doc.data() as DataType);

      docs.sort((a, b) => a.date.toMillis() - b.date.toMillis());

      docs.sort((a, b) => {
        if (a.date.toMillis() === b.date.toMillis()) {
          return a.time.localeCompare(b.time);
        }
        return 0;
      });

      setData(docs);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const uniqueDates = Array.from(
      new Set(data.map(item => format(item.date.toDate(), 'yyyy-MM-dd'))),
    );
    setDates(uniqueDates);
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
    selectedDate === undefined
      ? map
      : new Map([
          [
            format(selectedDate, 'EEEE, do MMM', { locale: nb }),
            map.get(format(selectedDate, 'EEEE, do MMM', { locale: nb })) ||
              new Map(),
          ],
        ]);

  return (
    <Layout>
      <div className="p-6">
        <div className="flex flex-col mx-auto max-w-xl pb-5 z-10 font-poppins">
          <span className="font-semibold text-2xl text-purple-600">
            Campus Bø
          </span>
          <span className="text-4xl md:text-5xl pb-3 font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Fadderprogram
          </span>
        </div>
        <CategoryButtons
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
        />
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          dates={dates}
        />
        {Array.from(filteredMap.entries())
          .sort(
            ([dateA], [dateB]) =>
              new Date(dateA).getTime() - new Date(dateB).getTime(),
          )
          .map(([date, dateMap]) => {
            // Get all items in current dateMap
            const allItemsInCurrentDate = Array.from(dateMap).reduce(
              (acc, [time, dataItems]) => [...acc, ...dataItems],
              [] as DataType[],
            );

            // Check if there's any item in the selected categories
            const hasItemInSelectedCategories = allItemsInCurrentDate.some(
              (item: DataType) => selectedCategories.has(item.category),
            );

            // If there's no item in the selected categories, don't render the date section
            if (!hasItemInSelectedCategories && selectedCategories.size > 0)
              return null;

            return (
              <div key={date} className="mb-8 z-10">
                <div className="mx-auto md:max-w-xl">
                  <div className="py-4">
                    <h2 className="text-2xl capitalize font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                      {date}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {Array.from(dateMap).map(([time, dataItems]) =>
                      dataItems.map((item: DataType, index: number) => {
                        // Added filtering here
                        if (
                          selectedCategories.size === 0 ||
                          selectedCategories.has(item.category)
                        ) {
                          const { icon, color } =
                            categoryIcon[
                              item.category as keyof typeof categoryIcon
                            ];
                          return (
                            <Card key={index}>
                              <ProgramCard
                                category={item.category}
                                location={item.location}
                                image={item.image}
                                url={item.url}
                                key={index}
                                time={time}
                                title={item.title}
                                day={item.date}
                                icon={icon}
                                color={color}
                              />
                            </Card>
                          );
                        }
                      }),
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default App;
