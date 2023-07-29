import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface AccordionItemProps {
  question: string;
  answer: string;
}

interface AccordionListProps {
  accordionData: {
    category: string;
    items: AccordionItemProps[];
  }[];
}

export const AccordionList = ({ accordionData }: AccordionListProps) => {{}

  // This function parses markdown links and returns an array of strings and Link components
const parseAnswerLinks = (answer: string) => {
  const parts = answer.split(/\[(.*?)\]\((.*?)\)/g);

  return parts.map((part, index) => {
    if (index % 3 === 0) {
      return part;
    } else if (index % 3 === 1) {
      return (
        <Link key={index} href={parts[index + 1]} target="_blank" rel="noopener noreferrer" className='underline text-blue-600' >
          <span>
            {part}
          </span>
        </Link>
      );
    }
    return null;
  }).filter(Boolean);
};

  return (
    <div className='bg-gray-50 my-10 py-10'>
    <div className="container max-w-2xl font-poppins">
      <div className="pb-5 flex flex-col font-poppins text-center">
        <span className="font-semibold text-2xl text-blue-400">02.</span>
        <span className="text-4xl font-bold text-gray-900">Noe du lurer på?</span>
      </div>
      {accordionData.map(({ category, items }) => (
        <div key={category} className="mb-10">
          <h2 className="text-sm font-medium text-blue-400">{category}</h2>
          <Accordion type="multiple">
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                {parseAnswerLinks(item.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
    </div>
  );
};
