import React from "react";

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { CarouselCard } from "./CarouselCard";


const CarouselList = () => {
  // Example cards data
  const cards = [
    { title: 'Card 1', image: 'https://cdn.discordapp.com/attachments/1075240291226890384/1133414546544001106/302052603_750585703025021_7099768953134705114_n.jpg' },
    { title: 'Card 2', image: 'https://cdn.discordapp.com/attachments/1075240291226890384/1133414546544001106/302052603_750585703025021_7099768953134705114_n.jpg' },
    { title: 'Card 3', image: 'https://cdn.discordapp.com/attachments/1075240291226890384/1133414546544001106/302052603_750585703025021_7099768953134705114_n.jpg' },
    { title: 'Card 4', image: 'https://cdn.discordapp.com/attachments/1075240291226890384/1133414546544001106/302052603_750585703025021_7099768953134705114_n.jpg' },
    { title: 'Card 5', image: 'https://cdn.discordapp.com/attachments/1075240291226890384/1133414546544001106/302052603_750585703025021_7099768953134705114_n.jpg' },
    { title: 'Card 6', image: 'https://cdn.discordapp.com/attachments/1075240291226890384/1133414546544001106/302052603_750585703025021_7099768953134705114_n.jpg' },
    { title: 'Card 7', image: 'https://cdn.discordapp.com/attachments/1075240291226890384/1133414546544001106/302052603_750585703025021_7099768953134705114_n.jpg' },
    { title: 'Card 8', image: 'https://cdn.discordapp.com/attachments/1075240291226890384/1133414546544001106/302052603_750585703025021_7099768953134705114_n.jpg' },
    { title: 'Card 9', image: 'https://cdn.discordapp.com/attachments/1075240291226890384/1133414546544001106/302052603_750585703025021_7099768953134705114_n.jpg' },
    { title: 'Card 10', image: 'https://cdn.discordapp.com/attachments/1075240291226890384/1133414546544001106/302052603_750585703025021_7099768953134705114_n.jpg' },
    { title: 'Card 11', image: 'https://cdn.discordapp.com/attachments/1075240291226890384/1133414546544001106/302052603_750585703025021_7099768953134705114_n.jpg' },
  ];

  return (
    <div className="container font-poppins">
    <Swiper
    modules={[ A11y, Autoplay]}
    spaceBetween={50}
    slidesPerView={4}
    loop={true}
    autoplay={ {delay: 1500}}
    speed={2000}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
    >
      {cards.map((card, index) => (
        <SwiperSlide key={index}>
          <div className="h-40 bg-gray-200">
            <CarouselCard title={card.title} image={card.image} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
};

export default CarouselList;
