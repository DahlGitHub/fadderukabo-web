
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';


interface AddDataProps {
  groupOptions: string[];
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  group: z.string().min(2, {
    message: "Group must be at least 2 characters.",
  }),
  status: z.string().min(2, {
    message: "Status must be at least 2 characters.",
  }),
});

export const AddStudent: React.FC<AddDataProps> = ({ groupOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addDoc(collection(db, "studentdata"), {
      name: data.name,
      group: data.group,
      status: data.status,
      authorName: auth?.currentUser?.displayName,
      authorPhotoURL: auth?.currentUser?.photoURL,
      authorEmail: auth?.currentUser?.email,
    });
    setIsOpen(false);
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
                name="group"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {groupOptions.map((group) => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Group section for the person.</FormDescription>
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
                    <Select onValueChange={field.onChange}>
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
                    <FormDescription>Fadder status for the person.</FormDescription>
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

export default AddStudent;