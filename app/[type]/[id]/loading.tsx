import { Skeleton } from "@/components/ui/skeleton";

export default function PostLoading() {
  return (
    <div className="flex-1 p-4 overflow-scroll">
      <Skeleton className="h-10 w-full mb-2" />
      <Skeleton className="h-10 w-1/2 mb-4" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-5 w-3/4 mb-2" />
    </div>
  );
}
