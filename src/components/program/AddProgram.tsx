
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { collection, addDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from '../../../firebase';

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { format, set } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const FormSchema = z.object({
    title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
    }),
    date: z.date({
        required_error: "A date is required.",
      }),
    time: z.string().min(4, {
    message: "A time is required.",
    }),
    category: z.string().min(2, {
    message: "Status must be at least 2 characters.",
    }),
    location: z.string().min(2, {
    message: "Status must be at least 2 characters.",
    }),
    image: z.any(),
    url: z.string().min(2, {
    message: "Status must be at least 2 characters.",
    }),
});

export const AddProgram = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState<File | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });


  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (fileUrl) {
        const uniqueId = doc(collection(db, 'Images')).id;
        const storageRef = ref(storage, `/Images/${uniqueId}`);
        const uploadTask = uploadBytesResumable(storageRef, fileUrl);

        uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
                console.log(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                
                await addDoc(collection(db, "programdata"), {
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
                });
                setIsOpen(false);
                setFileUrl(null);
                form.reset();

            }
        );
    }
}

  return (
    <Dialog>
        <Button asChild variant="outline" className="h-8 px-2">
        <DialogTrigger onClick={() => setIsOpen(true)}><Plus size={16}/></DialogTrigger>
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
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>Full name of the person.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-row justify-between'>
                <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                        <Input type="time" {...field} />
                    </FormControl>
                    <FormDescription>Full name of the person.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
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
                          disabled={(date) =>
                            date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Pick a date.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
                />
                </div>
                <div className='flex flex-row justify-between'>
                <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormDescription>Full name of the person.</FormDescription>
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
                        <SelectItem value="Aktivitet">Aktivitet</SelectItem>
                        <SelectItem value="Universitetet">Universitetet</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Full name of the person.</FormDescription>
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
                        <Input type="url" {...field} />
                    </FormControl>
                    <FormDescription>Full name of the person.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                        <Input 
                            type="file" 
                            accept='image/*'
                            onChange={(e) => {
                                if(e.target.files && e.target.files.length > 0) {
                                    setFileUrl(e.target.files[0])
                                }
                            }}
                            />
                    </FormControl>
                    <FormDescription>Full name of the person.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <Button type="submit">Add</Button>
            </form>
          </Form>

        </DialogContent>
      )}
    </Dialog>
  );
}

export default AddProgram;