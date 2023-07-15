interface SectionCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  id,
  title,
  description,
  image,
  reverse,
}) => {
  return (
    <div className="container py-5 pb-5">
      <div className="flex flex-col md:flex-row">
        {reverse ? (
          <>
            <div className="md:w-1/2 container">
              <img src={image} className="w-full rounded" />
            </div>
            <div className="md:w-1/2">
              <div className="pb-5 container flex flex-col font-poppins">
                <span className="font-bold text-xl text-purple-600">
                  {id}
                </span>
                <span className="text-4xl font-bold text-gray-900">
                  {title}
                </span>
                <p className="py-5 text-gray-800 tracking-wide leading-6.5 break-normal">
                  {description}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="md:w-1/2">
              <div className="pb-5 container flex flex-col font-poppins">
                <span className="font-semibold text-2xl text-purple-600">
                  {id}
                </span>
                <span className="text-4xl font-bold text-gray-900">
                  {title}
                </span>
                <p className="py-5 text-gray-800 tracking-wide leading-6.5 break-normal">
                  {description}
                </p>
              </div>
            </div>
            <div className="md:w-1/2 container">
              <img src={image} className="w-full rounded" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
