"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import CreateBotForm from "../../create/client/create-bot-form";

export default function CreateModalPage() {
  const router = useRouter();
  const submitRef = useRef<HTMLButtonElement | null>(null);

  function handleOpenChange(open: boolean) {
    if (!open) {
      router.back();
    }
  }

  return (
    <Dialog
      defaultOpen
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a new bot</DialogTitle>
          <DialogDescription>
            Create a new bot to start using FakeBot.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <CreateBotForm
            submitRef={submitRef}
            shouldShowSubmitButton={false}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={() => submitRef.current?.click()}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
