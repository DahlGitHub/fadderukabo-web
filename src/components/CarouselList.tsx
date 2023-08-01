import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { CarouselCard } from './CarouselCard';

interface CarouselListProps {
    cards: {
        title: string;
        image: string;
        url: string;
    }[];
}

const CarouselList: React.FC<CarouselListProps> = ({ cards }) => {
    return (
        <div className="container font-poppins">
            <div className="font-poppins flex flex-col">
                <span className="font-semibold text-2xl text-blue-400">03.</span>
                <span className="text-4xl font-bold">Studentlivet</span>
            </div>
            <Swiper
                modules={[A11y, Autoplay]}
                spaceBetween={25}
                slidesPerView={2}
                loop={true}
                autoplay={{ delay: 2000 }}
                speed={700}
      
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 25
                    },
                    800: {
                        slidesPerView: 4,
                        spaceBetween: 25
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 25
                    }
                }}
                onSwiper={swiper => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {cards.map((card, index) => (
                    <SwiperSlide key={index}>
                        <CarouselCard title={card.title} image={card.image} link={card.url} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CarouselList;
