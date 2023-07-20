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
  features: Feature[];
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  sectionNumber,
  features,
  color
}) => {
  return (
    <div className="container py-5 pb-5 bg-gray-800">
      <section className="dark:bg-gray-900">
        <div className="py-8 sm:py-16 lg:px-6">
          <div className="pb-5 container flex flex-col font-poppins text-center">
            <span className={`font-semibold text-2xl ${color}`}>
              {sectionNumber}
            </span>
            <span className="text-4xl font-bold text-gray-900">{title}</span>
          </div>
          <div className="space-y-8 md:grid my-5 md:grid-cols-2 lg:grid-cols-3 gap-5 md:space-y-0 font-poppins">
            {features.map((feature) => (
              <div className="bg-gray-100 p-4 rounded-lg" key={feature.title}>
                <div className="flex mb-4">
                  <span className="bg-white p-2 rounded-lg">{feature.icon}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureSection;
