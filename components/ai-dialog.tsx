import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDialogStore } from "@/store/useDialogStore";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export function AiDialog() {
  const open = useDialogStore((state) => state.open);
  const setOpen = useDialogStore((state) => state.setOpen);
  const noteContent = useDialogStore((state) => state.noteContent);

  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchSummary() {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/chat`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: noteContent }),
      }
    );

    if (response.ok) {
      const result = await response.json();

      setSummary(result);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (!open) {
      setSummary("");
      return;
    }

    console.log("Fetching summary");
    fetchSummary();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-orange-700 dark:text-orange-500"
        >
          <Sparkles />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Here is your summarized note</DialogTitle>
        </DialogHeader>
        <div className="self-center">
          {isLoading ? <ClipLoader /> : <div>{summary}</div>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
