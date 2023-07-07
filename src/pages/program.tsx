import React, { useEffect, useState } from 'react';
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

type DataType = {
  date: Timestamp;
  time: string;
  title: string;
  description: string;
};

const App = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [selectedDate, setSelectedDate] = useState('All');
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
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
    const formattedDate = format(item.date.toDate(), 'do MMM', { locale: nb });

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
            format(new Date(selectedDate), 'do MMM', { locale: nb }),
            map.get(format(new Date(selectedDate), 'do MMM', { locale: nb })) ||
              new Map(),
          ],
        ]);

  return (
    <div className="p-6">
      <div className="flex justify-center pb-5">
        <label className="max-w-3xl">
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Program
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Dato</p>
          <select
            className="mt-1 block w-[150px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
          >
            <option value="All">Alle</option>
            {dates.map(date => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </label>
      </div>

      {Array.from(filteredMap.entries())
        .sort(
          ([dateA], [dateB]) =>
            new Date(dateA).getTime() - new Date(dateB).getTime(),
        )
        .map(([date, dateMap]) => (
          <div key={date} className="mb-8">
            <div className="max-w-3xl mx-auto">
              <span className='text-muted-foreground'>NB! Mini oversikt, mer info kommer!</span>
              <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                {date}
              </h2>
              <div className="-my-4 divide-y divide-gray-200 dark:divide-gray-700">
                {Array.from(dateMap).map(([time, dataItems]) =>
                  dataItems.map((item: DataType, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center"
                    >
                      <p className="w-32 text-lg font-normal text-gray-500 sm:text-right dark:text-gray-400 shrink-0">
                        {item.time}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        <a href="#" className="hover:underline">
                          {item.title}
                        </a>
                      </h3>
                    </div>
                  )),
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;
