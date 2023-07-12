import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { collection, doc, updateDoc } from 'firebase/firestore';
import {  db } from '../../../firebase';

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
import { Calendar } from '../ui/calendar';
import { CalendarIcon, Edit, Loader2 } from 'lucide-react';
import { Program } from './ProgramData';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref as r,
  uploadBytesResumable,
} from 'firebase/storage';
import { useSession } from 'next-auth/react';

interface EditDataProps {
  data: Program;
  docId: string;
}

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

export const EditProgram = React.forwardRef<HTMLDivElement, EditDataProps>(
  ({ docId, data }, ref) => {
    EditProgram.displayName = 'EditProgram';
    const sessionData = useSession();
    const {
      name: authorName,
      image: authorPhotoURL,
      email: authorEmail,
    } = sessionData?.data?.user || {};
    const [currentData, setCurrentData] = React.useState(data);
    const [isOpen, setIsOpen] = useState(false);
    const [fileUrl, setFileUrl] = useState<File | null>(null);
    const [newImageUploaded, setNewImageUploaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(
      currentData.image,
    );

    const form = useForm<z.infer<typeof FormSchema>>({
      defaultValues: {
        title: currentData.title,
        date: currentData.date.toDate(),
        time: currentData.time.toString(),
        category: currentData.category,
        location: currentData.location,
        image: currentData.image,
        url: currentData.url,
      },
      resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
      setIsSubmitting(true);
      const storage = getStorage(); // get a reference to the storage service

      try {
        // If a new image was uploaded, delete the old one and upload the new one
        if (newImageUploaded && fileUrl) {
          // Create a reference to the old image and delete it
          const oldImageRef = r(storage, currentData.image);
          await deleteObject(oldImageRef);

          // Upload the new image
          const uniqueId = doc(collection(db, 'Images')).id;
          const newImageRef = r(storage, `Images/${uniqueId}`);
          const snapshot = await uploadBytesResumable(newImageRef, fileUrl);
          const newImageUrl = await getDownloadURL(snapshot.ref);

          data.image = newImageUrl; // Update the image URL in the data
        }

        // Update the Firestore document
        await updateDoc(doc(db, 'programdata', docId), {
          title: data.title,
          date: data.date,
          time: data.time,
          category: data.category,
          location: data.location,
          image: data.image,
          url: data.url,
          authorName,
          authorPhotoURL,
          authorEmail,
          updatedAt: Date.now(),
        });
        setIsOpen(false); // Close the dialog
      } catch (error) {
        console.error('Error updating document: ', error);
      }
      setIsSubmitting(false); // End submission
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
                <div className="flex flex-row justify-between">
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className="w-50 px-2"
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={currentData.category}
                        >
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
                          value={field.value}
                          onChange={field.onChange}
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
                                setNewImageUploaded(true);
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
                      Updating...
                    </span>
                  ) : (
                    'Update'
                  )}
                </Button>
              </form>
            </Form>

            <DialogTrigger onClick={() => setIsOpen(false)}>
              Cancel
            </DialogTrigger>
          </DialogContent>
        )}
      </Dialog>
    );
  },
);

export default EditProgram;
