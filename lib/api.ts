export type Item = {
  id: number;
  deleted?: boolean;
  type: "story" | "comment" | "job" | "poll" | "pollopt";
  by?: string;
  time: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
  comments?: Item[];
};

export type AlgoliaItem = {
  id: number;
  created_at: string;
  created_at_i: number;
  type: string;
  author: string;
  title?: string;
  url?: string;
  text?: string;
  points: number;
  parent_id: number | null;
  story_id: number | null;
  children: AlgoliaItem[];
};

// Function to fetch item details by ID
const fetchItem = async (id: number): Promise<Item> => {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
    cache: "no-store",
  });
  return await response.json();
};

// Recursive function to fetch comments and their sub-comments
const fetchComments = (commentIds: number[]): Promise<Item[]> => {
  if (!commentIds || commentIds.length === 0) {
    return Promise.resolve([]);
  }

  // Fetch all comments concurrently
  const commentPromises = commentIds.map((id: number) =>
    fetchItem(id).then((comment) => {
      if (comment.kids) {
        // Fetch sub-comments recursively
        return fetchComments(comment.kids).then((subComments) => {
          comment.comments = subComments;
          delete comment.kids; // Remove the kids field
          return comment;
        });
      } else {
        comment.comments = [];
        return comment;
      }
    }),
  );

  return Promise.all(commentPromises);
};

// Function to get the story and populate all comments and sub-comments
export const getStoryWithComments = async (storyId: number) => {
  const story = await fetchItem(storyId);
  if (story.kids) {
    return fetchComments(story.kids).then((comments) => {
      story.comments = comments;
      delete story.kids; // Remove the kids field
      return story;
    });
  } else {
    story.comments = [];
    return story;
  }
};

// Function to get the New, Top, Best, Ask, and Show
export const getStories = async (type: "new" | "top" | "best" | "ask" | "show" | "job") => {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/${type}stories.json`, {
    cache: "no-store",
  });
  let data: number[] = await response.json();
  data = data.slice(0, 30); // fetch first 30 stories

  const storyPromises = data.map((storyId) => fetchItem(storyId));
  return Promise.all(storyPromises);
};

export const getItem = async (id: number): Promise<AlgoliaItem> => {
  const response = await fetch(`https://hn.algolia.com/api/v1/items/${id}`, { cache: "no-store" });
  const data = await response.json();
  return data;
};
