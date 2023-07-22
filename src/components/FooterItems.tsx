import React from "react";
import Link from "next/link";

const FooterItems = () => {
  const sections = [
    {
      title: "Fadderuka",
      links: [
        { text: "Program", url: "/program"},
        { text: "Fadderliste", url: "/fadderliste" },
        { text: "Faddergrupper", url: "/" },
      ],
    },
    {
      title: "Ny student?",
      links: [
        { text: "Studentlivet", url: "https://github.com/themesberg/flowbite" },
        { text: "Student-Sørøst", url: "https://discord.gg/4eeurUVvTy" },
        { text: "Ofte stilte spørsmål", url: "/info", id:"faq"},
      ],
    },
    {
      title: "Kontakt oss",
      links: [
        { text: "Gullbringvegen 36, 3800 Bø, Norge", url: "#"},
        { text: "fadderstyretbo@gmail.com", url: "#" },
        { text: "facebook.com/fadderstyretbo", url: "#" },
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
