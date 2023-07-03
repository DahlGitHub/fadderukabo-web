import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { addDoc, collection } from 'firebase/firestore';
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
import { HexColorInput, HexColorPicker } from 'react-colorful';

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),

  color: z.string(),
});

export const AddGroup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState('#ffffff');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addDoc(collection(db, 'groupdata'), {
      title: data.title,
      hexValue: color,
      authorName: auth?.currentUser?.displayName,
      authorPhotoURL: auth?.currentUser?.photoURL,
      authorEmail: auth?.currentUser?.email,
    });
    setIsOpen(false);
  }

  function handleColorChange(newColor: string) {
    setColor(newColor);
    form.setValue('color', newColor);
  }

  return (
    <Dialog>
      <DialogTrigger onClick={() => setIsOpen(true)}>Add Group</DialogTrigger>
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
