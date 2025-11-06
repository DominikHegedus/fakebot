import { Skeleton } from "@/components/ui/skeleton";

export default function ResetPasswordFormSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-[50px] w-full" />
      <Skeleton className="h-[50px] w-full" />
      <Skeleton className="h-[36px] w-full" />
    </div>
  );
}
