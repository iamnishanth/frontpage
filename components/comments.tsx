import type { Item } from "@/lib/api";
import { cn, getTimeAgo } from "@/lib/utils";

export const Comments = ({ comments, depth = 0 }: { comments: Item[]; depth?: number }) => {
  return (
    <>
      {comments.map((comment) => {
        if (comment.deleted || comment.dead) return null;

        return (
          <details
            key={comment.id}
            className={cn(
              "p-2 w-full",
              "comment",
              depth > 0 && "pl-6 border-l-2",
              depth === 0 && "pl-0",
            )}
            open={depth < 3}
            data-id={comment.id}
          >
            <summary>
              <span className="text-xs text-muted-foreground mr-1">{comment.by}</span>
              <span className="text-xs text-muted-foreground mr-1">•</span>
              <span className="text-xs text-muted-foreground">{getTimeAgo(comment.time)}</span>
            </summary>
            {/* TODO: Sanitize HTML and modify anchor tags to open in new tab */}
            {comment.text && (
              <div
                className="whitespace-pre-wrap break-words text-sm pb-2"
                dangerouslySetInnerHTML={{ __html: comment.text }}
              ></div>
            )}
            {comment.comments && <Comments comments={comment.comments} depth={depth + 1} />}
          </details>
        );
      })}
    </>
  );
};
