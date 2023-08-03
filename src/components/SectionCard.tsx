interface SectionCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  color?: string;
  reverse?: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  id,
  title,
  description,
  image,
  color,
  reverse,
}) => {
  return (
    <div className="container my-10 py-5 pb-5">
      <div className="flex flex-col md:flex-row">
        {reverse ? (
          <>
            <div className="md:w-1/2 container">
              <img src={image} className="w-full rounded" />
            </div>
            <div className="md:w-1/2">
              <div className="pb-5 my-2 container flex flex-col font-poppins">
                <span className={`font-semibold text-2xl ${color}`}>
                  {id}
                </span>
                <span className="text-4xl font-bold text-gray-900">
                  {title}
                </span>
                <p className="py-5 text-gray-800 tracking-wide leading-6.5 break-normal whitespace-pre-line">
                  {description}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="md:w-1/2">
              <div className="pb-5 container flex flex-col font-poppins">
                <span className={`font-semibold text-2xl ${color}`}>
                  {id}
                </span>
                <span className="text-4xl font-bold text-gray-900">
                  {title}
                </span>
                <p className="py-5 text-gray-800 tracking-wide leading-6.5 break-normal whitespace-pre-line">
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
