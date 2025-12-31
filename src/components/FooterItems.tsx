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
        { text: 'Faddergrupper', url: '/fadder/#faddergrupper' },
      ],
    },
    {
      title: 'Ny student?',
      links: [
        { text: 'Studentorg.', url: '/student/#organisasjoner' },
        { text: 'Ofte stilte spørsmål', url: '/student#faq' },
        { text: 'Studentlivet', url: '/student#studentlivet' },
      ],
    },
    {
      title: 'Kontakt oss',
      links: [
        { text: 'Gullbringvegen 36, 3800 Bø, Norge', url: 'https://www.google.no/maps/@59.408748,9.0586712,17.28z'},
        { text: 'fadderstyretbo@gmail.com', url: 'mailto:fadderstyret@gmail.com' },
        { text: 'facebook.com/fadderstyretbo', url: 'https://www.facebook.com/fadderukabo' },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-4 my-3 font-poppins pb-5">
      <div className='my-2'>
        <Image
          src={
            'https://firebasestorage.googleapis.com/v0/b/usnfadderuka.firebasestorage.app/o/Images%2FUSN-logo_sort.png?alt=media&token=51284377-0536-4e64-9c17-f0ad59fed270'
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
                <Link href={link?.url} className="hover:underline">
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
