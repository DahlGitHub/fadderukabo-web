import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { doc, updateDoc } from 'firebase/firestore';
import {  db } from '../../../firebase';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Edit} from 'lucide-react';

import { Textarea } from '../ui/textarea';
import { Faq } from './FaqData';
import { useSession } from 'next-auth/react';

interface EditDataProps {
  data: Faq;
  docId: string;
}

const FormSchema = z.object({
  question: z
    .string()
    .min(10, {
      message: 'Question must be at least 10 characters.',
    })
    .max(100, {
      message: 'Question must be no longer than 100 characters.',
    }),
  answer: z
    .string()
    .min(50, {
      message: 'Answer must be at least 50 characters.',
    })
    .max(500, {
      message: 'Answer must be no longer than 500 characters.',
    }),
});

export const EditFaq = React.forwardRef<HTMLDivElement, EditDataProps>(
  ({ docId, data }, ref) => {
    EditFaq.displayName = 'EditFaq';
    const sessionData = useSession();
    const {
      name: authorName,
      image: authorPhotoURL,
      email: authorEmail,
    } = sessionData?.data?.user || {};
    const [currentData, setCurrentData] = useState(data);
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        question: currentData.question,
        answer: currentData.answer,
      },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
      updateDoc(doc(db, 'faqdata', docId), {
        question: data.question,
        answer: data.answer,
        authorName,
        authorPhotoURL,
        authorEmail,
        updatedAt: Date.now(),
      });
      setIsOpen(false);

      form.reset();
    }

    return (
      <Dialog>
        <Button asChild variant="ghost" className="h-8 w-full px-2">
          <DialogTrigger onClick={() => setIsOpen(true)}>
            <Edit size={16} className="mr-2" />
            <div className="text-start w-full">Edit</div>
          </DialogTrigger>
        </Button>

        {isOpen && (
          <DialogContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Update</Button>
              </form>
            </Form>
          </DialogContent>
        )}
      </Dialog>
    );
  },
);

export default EditFaq;
