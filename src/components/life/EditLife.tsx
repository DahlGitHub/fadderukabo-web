import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Edit, Loader2 } from 'lucide-react';
import { Life } from './LifeData'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

interface EditDataProps {
  data: Life;
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
  type: z.string(),
  image: z.any().refine(fileList => fileList && fileList.length > 0, {
    message: 'An image is required.',
  }),
  url: z.string().min(2, {
    message: 'URL must be at least 5 characters.',
  }),
});

export const EditProgram: React.FC<EditDataProps> = ({ docId, data }) => {
  const [currentData, setCurrentData] = React.useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState<File | null>(null);
  const [newImageUploaded, setNewImageUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(currentData.image);

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      title: currentData.title,
      type: currentData.type,
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
        const oldImageRef = ref(storage, currentData.image);
        await deleteObject(oldImageRef);
  
        // Upload the new image
        const uniqueId = doc(collection(db, 'Life')).id;
        const newImageRef = ref(storage, `Life/${uniqueId}`);
        const snapshot = await uploadBytesResumable(newImageRef, fileUrl);
        const newImageUrl = await getDownloadURL(snapshot.ref);
  
        data.image = newImageUrl; // Update the image URL in the data
      }
  
      // Update the Firestore document
      await updateDoc(doc(db, 'lifedata', docId), {
        title: data.title,
        type: data.type,
        image: data.image,
        url: data.url,
        authorName: auth?.currentUser?.displayName,
        authorPhotoURL: auth?.currentUser?.photoURL,
        authorEmail: auth?.currentUser?.email,
      });
      setIsOpen(false); // Close the dialog
    } catch (error) {
      console.error("Error updating document: ", error);
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row justify-between">

              </div>
              <div className="flex flex-row justify-between">

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={currentData.type}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Studentmiljø">Studentmiljø</SelectItem>
                          <SelectItem value="Organisasjon">Organisasjon</SelectItem>
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
                        value={field.value} onChange={field.onChange}
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

          <DialogTrigger onClick={() => setIsOpen(false)}>Cancel</DialogTrigger>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default EditProgram;
