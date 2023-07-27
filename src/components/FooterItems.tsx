import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FooterItems = () => {
  const sections = [
    {
      title: 'Fadderuka',
      links: [
        { text: 'Program', url: '/program' },
        { text: 'Fadderliste', url: '/fadderliste' },
        { text: 'Faddergrupper', url: '/' },
      ],
    },
    {
      title: 'Ny student?',
      links: [
        { text: 'Studentlivet', url: 'https://github.com/themesberg/flowbite' },
        { text: 'Ofte stilte spørsmål', url: '/info' },
        { text: 'Studentorganisasjoner', url: '/' },
      ],
    },
    {
      title: 'Kontakt oss',
      links: [
        { text: 'Gullbringvegen 36, 3800 Bø, Norge', url: '#' },
        { text: 'fadderstyretbo@gmail.com', url: '#' },
        { text: 'facebook.com/fadderstyretbo', url: '#' },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-4 my-3 font-poppins pb-5">
      <div className='my-2'>
        <Image
          src={
            'https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/USN-logo_sort.png?alt=media&token=05196be1-a4aa-47dc-b815-6040648056f7'
          }
          alt={'USN'}
          width={150}
          height={75}
        />
      </div>
      {sections.map(section => (
        <div key={section.title}>
          <h2 className="mb-6 text- font-light text-gray-900">
            {section.title}
          </h2>
          <ul className="text-gray-800 text-xs font-medium">
            {section.links.map(link => (
              <li key={link.text} className="mb-4 flex items-center">
                <Link href={link.url} className="hover:underline">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterItems;
