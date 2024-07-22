import { Skeleton } from "./ui/skeleton";

export const PostsLoading = () => {
  return (
    <div className="flex-1 p-6 overflow-scroll">
      <Skeleton className="h-24 w-full mb-2 lg:mb-4" />
      <Skeleton className="h-24 w-full mb-2 lg:mb-4" />
      <Skeleton className="h-24 w-full mb-2 lg:mb-4" />
      <Skeleton className="h-24 w-full mb-2 lg:mb-4" />
      <Skeleton className="h-24 w-full mb-2 lg:mb-4" />
    </div>
  );
};
