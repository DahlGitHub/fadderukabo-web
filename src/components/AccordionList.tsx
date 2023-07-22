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

const parseAnswerLinks = (answer: string) => {
  const linkRegex = /\[(.*?)\]\((.*?)\)/g;
  return answer.replace(linkRegex, '<Link href="$2" target="_blank">$1</Link>');
};

export const AccordionList = ({ accordionData }: AccordionListProps) => {
  return (
    <div className="container font-poppins">
      <div className="pb-5 flex flex-col font-poppins">
        <span className="font-semibold text-2xl text-red-400">02.</span>
        <span className="text-4xl font-bold text-gray-900">Noe du lurer på?</span>
      </div>
      {accordionData.map(({ category, items }) => (
        <div key={category} className="mb-10">
          <h2 className="text-sm font-medium text-red-400">{category}</h2>
          <Accordion type="multiple">
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: parseAnswerLinks(item.answer),
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
};
