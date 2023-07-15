import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { collection, addDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from '../../../firebase';

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
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarIcon, Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { Loader2 } from 'lucide-react';

const FormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.',
    })
    .max(100, {
      message: 'Title must be no longer than 100 characters.',
    }),
  date: z.date({
    required_error: 'A date is required.',
  }),
  time: z.string(),
  category: z.string(),
  location: z
    .string()
    .min(2, {
      message: 'Location must be at least 2 characters.',
    })
    .max(25, {
      message: 'Location must be no longer than 100 characters.',
    }),
  image: z.any().refine(fileList => fileList && fileList.length > 0, {
    message: 'An image is required.',
  }),
  url: z.string().min(2, {
    message: 'URL must be at least 5 characters.',
  }),
});

export const AddProgram = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (fileUrl) {
      const uniqueId = doc(collection(db, 'Images')).id;
      const storageRef = ref(storage, `/Images/${uniqueId}`);
      const uploadTask = uploadBytesResumable(storageRef, fileUrl);
      setIsSubmitting(true);

      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {
          console.log(error);
          setIsSubmitting(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          await addDoc(collection(db, 'programdata'), {
            title: data.title,
            date: data.date,
            time: data.time,
            category: data.category,
            location: data.location,
            image: downloadURL,
            url: data.url,
            authorName: auth?.currentUser?.displayName,
            authorPhotoURL: auth?.currentUser?.photoURL,
            authorEmail: auth?.currentUser?.email,
            updatedAt: Date.now(),
          });
          setIsOpen(false);
          setFileUrl(null);
          setImagePreview(null); // Add this
          form.reset();
          setIsSubmitting(false);
        },
      );
    }
  };

  return (
    <Dialog>
      <Button asChild variant="outline" className="h-8 px-2">
        <DialogTrigger
          onClick={() => {
            setIsOpen(true);
            setImagePreview(null);
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
                      <Input placeholder="Grillparty" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row justify-between">
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" className="w-50 px-2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-3">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date => date < new Date('1900-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row justify-between">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="USN Campus"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Fest">Fest</SelectItem>
                          <SelectItem value="Sport">Sport</SelectItem>
                          <SelectItem value="Sosialt">Sosialt</SelectItem>
                          <SelectItem value="Universitetet">
                            Universitetet
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://www.usn.no"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row justify-between">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            field.onChange(e);
                            if (e.target.files && e.target.files.length > 0) {
                              setFileUrl(e.target.files[0]);

                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setImagePreview(reader.result as string);
                              };
                              reader.readAsDataURL(e.target.files[0]);
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        16:9 aspect ratio recommended
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-2 h-20 w-auto"
                    />
                  )}
                </FormItem>
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex flex-row">
                    <Loader2 className="mr-2 animate-spin my-0.5" size={16} />
                    Adding...
                  </span>
                ) : (
                  'Add'
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AddProgram;
