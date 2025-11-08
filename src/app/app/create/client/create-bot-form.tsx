"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  createBotFormSchema,
  type CreateBotFormSchema,
} from "../create-bot-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CreateBotForm() {
  const form = useForm<CreateBotFormSchema>({
    resolver: zodResolver(createBotFormSchema),
    defaultValues: {
      name: "",
      description: "",
      isPublic: false,
    },
  });

  function onSubmit({ name, description, isPublic }: CreateBotFormSchema) {
    console.log(name, description, isPublic);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  type="text"
                  placeholder="My Bot"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Describe your bot in a few words..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-primary has-aria-checked:bg-primary/5 dark:has-aria-checked:border-primary dark:has-aria-checked:bg-primary">
                  <Checkbox
                    id="is-public"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:border-primary data-[state=checked]:bg-primary dark:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">Public</p>
                    <p className="text-muted-foreground text-sm">
                      If you make your bot public, it will be visible to
                      everyone. If you want to share it only with your friends,
                      leave it private.
                    </p>
                  </div>
                </Label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
