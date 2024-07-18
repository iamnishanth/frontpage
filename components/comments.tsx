import { cn, getTimeAgo } from "@/lib/utils";

type CommentProps = {
  id: number;
  author: string;
  text: string;
  created_at_i: number;
  children: CommentProps[];
};

export const Comments = ({ comments, depth = 0 }: { comments: CommentProps[]; depth?: number }) => {
  return (
    <>
      {comments.map((comment) => (
        <details
          key={comment.id}
          className={cn(
            "p-2 w-full",
            "comment",
            depth > 0 && "pl-6 border-l-2",
            depth === 0 && "pl-0",
          )}
          open={depth < 3}
        >
          <summary>
            <span className="text-xs text-muted-foreground mr-1">{comment.author}</span>
            <span className="text-xs text-muted-foreground mr-1">•</span>
            <span className="text-xs text-muted-foreground">
              {getTimeAgo(comment.created_at_i)}
            </span>
          </summary>
          {/* TODO: Sanitize HTML and modify anchor tags to open in new tab */}
          <div
            className="whitespace-pre-wrap break-words text-sm pb-2"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          ></div>
          <Comments comments={comment.children} depth={depth + 1} />
        </details>
      ))}
    </>
  );
};
