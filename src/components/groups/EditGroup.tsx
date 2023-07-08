import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

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
import { Edit} from 'lucide-react';
import { Group } from './GroupData';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { useSession } from 'next-auth/react';

interface EditGroupProps {
  data: Group;
  docId: string;
}

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),

  color: z.string(),
  url: z.string().url({
    message: 'Please enter a valid URL.',
  }),
});

export const EditFaq = React.forwardRef<HTMLDivElement, EditGroupProps>(
  ({ docId, data }, ref) => {
    const sessionData = useSession();
    const {
      name: authorName,
      image: authorPhotoURL,
      email: authorEmail,
    } = sessionData?.data?.user || {};
    const [currentData, setCurrentData] = useState(data);
    const [color, setColor] = useState(currentData.hexValue);
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        title: currentData.title,
        color: currentData.hexValue,
        url: currentData.url,
      },
    });

    function handleColorChange(newColor: string) {
      setColor(newColor);
      form.setValue('color', newColor);
    }

    function onSubmit(data: z.infer<typeof FormSchema>) {
      updateDoc(doc(db, 'groupdata', docId), {
        title: data.title,
        hexValue: data.color,
        url: data.url,
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
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
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
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
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <HexColorPicker
                          color={color}
                          onChange={handleColorChange}
                        />
                      </FormControl>
                      <FormControl>
                        <HexColorInput
                          color={color}
                          onChange={handleColorChange}
                          prefixed
                        />
                      </FormControl>
                      <FormDescription>Color of the group.</FormDescription>
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
