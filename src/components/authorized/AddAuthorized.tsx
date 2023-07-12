import React, { useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import {
  FormField,
  FormItem,
  FormDescription,
  FormMessage,
  Form,
  FormLabel,
  FormControl,
} from '../ui/form';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { toast } from '../ui/use-toast';
import { useSession } from 'next-auth/react';

const FormSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Please enter a valid email address.',
    })
    .refine(email => email.endsWith('@gmail.com'), {
      message: 'Please enter a valid Gmail address.',
    }),
});

export const AddAuthorized = () => {
  const sessionData = useSession();
  const { name: authorName, image: authorPhotoURL, email: authorEmail } = sessionData?.data?.user || {};
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {

    const emailQuery = query(
      collection(db, "allowedEmails"),
      where("email", "==", data.email)
    );
  
    const querySnapshot = await getDocs(emailQuery);

    if (querySnapshot.empty) {
    await addDoc(collection(db, 'allowedEmails'), {
      email: data.email,
      authorName,
      authorPhotoURL,
      authorEmail,
    });
    setIsOpen(false);
    toast({
      title: 'Success',
      description: 'Email added.',
    })
    form.reset();
  } else {
    toast({
      title: 'Error',
      description: 'Email already exists.',
      variant: "destructive"
    });
  }
};

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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
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
};

export default AddAuthorized;
