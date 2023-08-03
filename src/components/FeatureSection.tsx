import React from 'react';

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
              <span className={`relative ml-5 font-poppins ${titleColor}`}>
                {title}
              </span>
            </h2>
          </div>
          <div className="space-y-8 md:grid my-5 md:grid-cols-2 lg:grid-cols-3 gap-5 md:space-y-0 font-poppins">
            {features.map(feature => (
              <div className="p-4" key={feature.title}>
                <div className="flex mb-4 justify-center">
                  <span className={`p-4 rounded-full ${iconBgColor}`}>
                    {feature.icon}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className={`mb-2 text-lg font-semibold ${titleColor}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-gray-500 ${textColor} md:mx-20`}>
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
