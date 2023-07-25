interface CarouselCardProps {
    title: string;
    image?: string;
    link?: string;
}

export const CarouselCard = ({ title, image, link }: CarouselCardProps) => {
    return (
        <a href={link} className="group">
            <div className="relative h-full w-full rounded-lg overflow-hidden shadow-md">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition duration-300 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/0"></div>
                <div className="absolute bottom-0 mb-2 ml-4 text-white">
                    <p className="text-lg font-semibold font-poppins">{title}</p>
                </div>
            </div>
        </a>
    );
}
