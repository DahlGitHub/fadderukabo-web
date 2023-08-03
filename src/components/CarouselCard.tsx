import Image from "next/image";
import Link from "next/link";

interface CarouselCardProps {
    title: string;
    image: string;
    link: string;
}

export const CarouselCard = ({ title, image, link }: CarouselCardProps) => {
    return (
        <Link href={link} target="_blank" className="group flex flex-col items-center space-y-2 group-hover:border-blue-500 transition-all duration-300">
            <div className="relative w-36 h-36 rounded-full border-2 border-slate-500 flex items-center justify-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
            <p className="text-xs text-center font-poppins">{title}</p>
        </Link>
    );
}
