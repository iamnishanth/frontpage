import sanitizeHtml from "sanitize-html";

import type { AlgoliaItem } from "@/lib/api";
import { cn, getTimeAgo } from "@/lib/utils";

// Function to sanitize HTML and modify anchor tags to open in new tab
const sanitizeAndModifyHtml = (html: string): string => {
  const cleanHtml = sanitizeHtml(html, {
    allowedAttributes: {
      a: ["href", "title", "target", "rel", "style"],
    },
    // Transform all anchor tags to open in new tab
    transformTags: {
      a: (_tagName, attribs) => {
        return {
          tagName: "a",
          attribs: {
            ...attribs,
            target: "_blank",
            rel: "noopener noreferrer",
            style: "text-decoration: underline;",
          },
        };
      },
    },
    allowedStyles: {
      "*": {
        "text-decoration": [/^underline$/],
      },
    },
  });

  return cleanHtml;
};

export const Comments = ({ comments, depth = 0 }: { comments: AlgoliaItem[]; depth?: number }) => {
  return (
    <>
      {comments.map((comment) => {
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
              <span className="text-xs text-muted-foreground mr-1">{comment.author}</span>
              <span className="text-xs text-muted-foreground mr-1">•</span>
              <span className="text-xs text-muted-foreground">
                {getTimeAgo(comment.created_at_i)}
              </span>
            </summary>
            {comment.text && (
              <div
                className="whitespace-pre-wrap break-words text-sm pb-2"
                dangerouslySetInnerHTML={{ __html: sanitizeAndModifyHtml(comment.text) }}
              ></div>
            )}
            {comment.children && <Comments comments={comment.children} depth={depth + 1} />}
          </details>
        );
      })}
    </>
  );
};
