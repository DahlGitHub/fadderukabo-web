import React from "react";
import { AtSign, Boxes, ExternalLink, Facebook, List, PinIcon } from "lucide-react";

const FooterItems = () => {
  const sections = [
    {
      title: "Fadderuka",
      links: [
        { text: "Program", url: "https://flowbite.com/", icon: <ExternalLink /> },
        { text: "Fadderliste", url: "https://tailwindcss.com/", icon: <List size={16} /> },
        { text: "Faddergrupper", url: "https://vitejs.dev/", icon: <Boxes size={16} /> },
      ],
    },
    {
      title: "Ny student?",
      links: [
        { text: "Ofte stilte spørsmål", url: "https://github.com/themesberg/flowbite", icon: <ExternalLink /> },
        { text: "Student-Sørøst", url: "https://discord.gg/4eeurUVvTy", icon: <ExternalLink /> },
      ],
    },
    {
      title: "Kontakt oss",
      links: [
        { text: "Gullbringvegen 36, 3800 Bø, Norge", url: "#", icon: <PinIcon size={16} /> },
        { text: "fadderstyretbo@gmail.com", url: "#", icon: <AtSign size={16} /> },
        { text: "facebook.com/fadderstyretbo", url: "#", icon: <Facebook size={16} /> },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 my-3 font-poppins">
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="mb-6 text- font-light text-gray-900">{section.title}</h2>
          <ul className="text-gray-800 text-xs font-medium">
            {section.links.map((link) => (
              <li key={link.text} className="mb-4 flex items-center">
                {link.icon}
                <a href={link.url} className="hover:underline ml-2">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterItems;
