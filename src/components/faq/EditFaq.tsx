import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Edit, Plus } from 'lucide-react';

import { Textarea } from '../ui/textarea';
import { Faq } from './FaqData';

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

export const EditFaq: React.FC<EditDataProps> = ({docId, data}) => {
    const [currentData, setCurrentData] = useState(data)
    const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        question: currentData.question,
        answer: currentData.answer,
    }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    updateDoc(doc(db, 'faqdata', docId), {
      question: data.question,
      answer: data.answer,
      authorName: auth?.currentUser?.displayName,
      authorPhotoURL: auth?.currentUser?.photoURL,
      authorEmail: auth?.currentUser?.email,
    });
    setIsOpen(false);

    form.reset();
  };

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={field.value} onChange={field.onChange} />
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
                      <Textarea {...field} value={field.value} onChange={field.onChange} />
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
};

export default EditFaq;
