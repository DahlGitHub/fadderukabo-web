import React from "react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeatureSectionProps {
  title: string;
  sectionNumber: string;
  color: string;
  textColor: string;
  titleColor: string;
  bgColor: string;
  iconBgColor: string;
  features: Feature[];
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  sectionNumber,
  features,
  color,
  bgColor,
  textColor,
  titleColor,
  iconBgColor,
}) => {
  return (
    <div className={`py-5 pb-5 ${bgColor}`}>
      <section className="container">
        <div className="py-8 sm:py-16 lg:px-6">
          <div className="pb-5 container flex flex-col font-poppins text-center">
            <span className={`font-semibold text-2xl ${color}`}>
              {sectionNumber}
            </span>
            <h2 className="max-w-lg mb-6 font-sans text-4xl font-bold text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="white"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="ea469ae8-e6ec-4aca-8875-fc402da4d16e"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)"
                width="52"
                height="24"
              />
            </svg>
            <span className={`relative ml-5 font-poppins ${titleColor}`}>{title}</span>
          </span>{' '}
        </h2>
          </div>
          <div className="space-y-8 md:grid my-5 md:grid-cols-2 lg:grid-cols-3 gap-5 md:space-y-0 font-poppins">
            {features.map((feature) => (
              <div className="p-4" key={feature.title}>
                <div className="flex mb-4 justify-center">
                  <span className={`p-4 rounded-full ${iconBgColor}`}>{feature.icon}</span>
                </div>
                <div className="text-center">
                <h3 className={`mb-2 text-lg font-semibold text-gray-800 ${titleColor}`}>
                  {feature.title}
                </h3>
                <p className={`text-gray-500 ${textColor} mx-20`}>
                  {feature.description}
                </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureSection;
