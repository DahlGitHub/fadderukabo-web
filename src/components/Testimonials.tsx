import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { Quote } from 'lucide-react';

interface Testimonial {
  docId: string;
  name: string;
  major: string;
  color: string;
  message: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [visibleCount, setVisibleCount] = useState(9);
  const [showMore, setShowMore] = useState(false);

  const showMoreTestimonials = () => {
    if (showMore) {
      setVisibleCount(
        prevCount => prevCount - (window.innerWidth <= 768 ? 1 : 3),
      );
    } else {
      setVisibleCount(
        prevCount => prevCount + (window.innerWidth <= 768 ? 1 : 3),
      );
    }
    setShowMore(prevState => !prevState);
  };

  // split testimonials into chunks of 3 for column view
  const chunks = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    chunks.push(testimonials.slice(i, i + 3));
  }

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
        <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
          <div className="mb-12 space-y-5 md:mb-16 md:text-center">
            <h1 className="mb-5 text-3xl font-semibold md:text-center font-poppins md:text-5xl">
              En "studiestart" for alle.
            </h1>
            <blockquote>
              <p className="mt-6 max-w-3xl mx-auto text-lg font-poppins text-slate-700">
                Å ha{' '}
                <span className="text-purple-600 font-semibold">
                  et sosialt nettverk
                </span>{' '}
                er viktig under studietiden. Undersøkelser viser at nye
                studenter som blir med på det som skjer i studiestarten øker
                sjansen for å knytte gode sosiale nettverk, som igjen gir bedre
                psykisk helse, høyere studiemestring og bedre trivsel. En fadder
                har som oppgave å bidra til at du som ny student skal få en god
                start på det kommende studentlivet.
              </p>
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-center space-x-4 text-left">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/usnpp.jpg?alt=media&token=978d9830-a9c8-43da-b035-e37a238a46f4"
                alt=""
                className="w-14 h-14 rounded-full"
                loading="lazy"
                decoding="async"
              />
              <div>
                <div className="text-slate-900 font-semibold dark:text-white">
                  Universitetet i Sørøst-Norge
                </div>
                <div className="mt-0.5 text-sm leading-6">Campus Bø</div>
              </div>
            </figcaption>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 relative">
          {chunks.slice(0, visibleCount / 3).map((chunk, i) => (
            <ul className="space-y-8" key={i}>
              {chunk.map((testimonial, index) => (
                <li key={index} className="text-sm leading-6">
                  <div className="relative group">
                    <div className="relative p-4 space-y-3 leading-none rounded-lg bg-slate-50">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarFallback>
                            <span className="font-poppins">
                              {testimonial.name.charAt(0)}
                            </span>
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-poppins">
                          <h3 className="text-sm font-semibold">
                            {testimonial.name}
                          </h3>
                          <p
                            className="text-sm font-medium"
                            style={{ color: testimonial.color }}
                          >
                            {testimonial.major}
                          </p>
                        </div>
                      </div>

                      <Separator />
                      <p className="leading-normal font-poppins flex flex-col">
                        <span
                          className="h-5"
                          style={{ color: testimonial.color }}
                        >
                          <Quote
                            fill="currentColor"
                            size={16}
                            strokeWidth={0.25}
                            className="rotate-180"
                          />
                        </span>
                        <span className="px-2">
                          {testimonial.message}
                        </span>

                        <span
                          className="h-5 flex justify-end"
                          style={{ color: testimonial.color }}
                        >
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ))}
          <div className="absolute inset-x-0 bottom-0 h-96 pointer-events-none bg-gradient-to-t from-white to-transparent rounded-lg"></div>
          {testimonials.length > visibleCount && ( // Add this condition to render the div only when there are more testimonials to show
            <div className="inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-32 pb-8 pointer-events-none dark:from-slate-900 absolute">
              <button
                type="button"
                onClick={showMoreTestimonials}
                className="relative bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-sm text-white font-semibold h-12 px-6 rounded-lg flex items-center dark:bg-slate-700 dark:hover:bg-slate-600 pointer-events-auto"
              >
                {showMore ? 'Show less...' : 'Show more...'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
