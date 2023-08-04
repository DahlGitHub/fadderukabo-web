import React, { useEffect, useState } from 'react';
import { Authorized } from './StudentData';
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
import { Edit } from 'lucide-react';

interface EditDataProps {
  data: Authorized;
  docId: string;
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  group: z.string().min(2, {
    message: 'Status must be at least 2 characters.',
  }),
  status: z.string().min(2, {
    message: 'Status must be at least 2 characters.',
  }),
});

export const EditStudent = React.forwardRef<HTMLDivElement, EditDataProps>(
  ({ docId, data }) => {
    EditStudent.displayName = 'EditStudent';
    const [currentData, setCurrentData] = React.useState(data);
    const [groupOptions, setGroupOptions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, 'groupdata'), snapshot => {
        const titles = snapshot.docs.map(doc => doc.data().title);
        setGroupOptions(titles);
      });

      return () => unsubscribe();
    }, []);

    const form = useForm<z.infer<typeof FormSchema>>({
      defaultValues: {
        name: currentData.name,
        group: currentData.group,
        status: currentData.status,
      },
      resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
      console.log(data);
      updateDoc(doc(db, 'studentdata', docId), {
        name: data.name,
        group: data.group,
        status: data.status,
        authorName: auth?.currentUser?.displayName,
        authorPhotoURL: auth?.currentUser?.photoURL,
        authorEmail: auth?.currentUser?.email,
        updatedAt: Date.now(),
      });
      setIsOpen(false);
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>Fullname of the person.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="group"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={currentData.group}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <div className="overflow-y-auto">
                            {groupOptions.map(group => (
                              <SelectItem key={group} value={group}>
                                {group}
                              </SelectItem>
                            ))}
                          </div>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Group section for the person.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={currentData.status}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fadder">Fadder</SelectItem>
                          <SelectItem value="faddersjef">Faddersjef</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Fadderstatus for the person.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Update</Button>
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

export default EditStudent;
