"use client";

import { Form } from "@/components/ui/form";
import {
  createBotFormSchema,
  type CreateBotFormSchema,
} from "../create-bot-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CreateBotFields from "./create-bot-fields";
import { cn } from "@/lib/utils";

export default function CreateBotForm({
  shouldShowSubmitButton = true,
  submitRef,
}: {
  shouldShowSubmitButton?: boolean;
  submitRef?: React.RefObject<HTMLButtonElement | null>;
}) {
  const form = useForm<CreateBotFormSchema>({
    resolver: zodResolver(createBotFormSchema),
    defaultValues: {
      name: "",
      description: "",
      isPublic: false,
    },
    mode: "onSubmit",
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
        <CreateBotFields form={form} />

        <div
          className={cn(
            "flex justify-end",
            !shouldShowSubmitButton ? "hidden" : ""
          )}
        >
          <Button
            ref={submitRef}
            className="w-full cursor-pointer md:w-auto"
            type="submit"
          >
            Create Bot
          </Button>
        </div>
      </form>
    </Form>
  );
}
