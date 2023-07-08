import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { addDoc, collection } from 'firebase/firestore';
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
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),

  color: z.string(),
  url: z.string().url({
    message: 'Please enter a valid URL.',
  }),
});

export const AddGroup: React.FC = () => {
  const sessionData = useSession();
  const {
    name: authorName,
    image: authorPhotoURL,
    email: authorEmail,
  } = sessionData?.data?.user || {};
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState('#ffffff');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addDoc(collection(db, 'groupdata'), {
      title: data.title,
      hexValue: color,
      url: data.url,
      authorName,
      authorPhotoURL,
      authorEmail,
      updatedAt: Date.now(),
    });
    setIsOpen(false);
  }

  function handleColorChange(newColor: string) {
    setColor(newColor);
    form.setValue('color', newColor);
  }

  return (
    <Dialog>
      <Button asChild variant="outline" className="h-8 px-2">
        <DialogTrigger
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Plus size={16} />
        </DialogTrigger>
      </Button>
      {isOpen && (
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Title of the group.</FormDescription>
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
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>URL of the group.</FormDescription>
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
              <Button type="submit">Add</Button>
            </form>
          </Form>
          <DialogTrigger onClick={() => setIsOpen(false)}>Cancel</DialogTrigger>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AddGroup;
