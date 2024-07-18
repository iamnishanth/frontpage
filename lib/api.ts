export const getPosts = async (type: string) => {
  if (type === "news") {
    const response = await fetch("https://hn.algolia.com/api/v1/search?tags=front_page");
    const data = await response.json();
    return data;
  } else if (type === "newest") {
    const response = await fetch(
      "https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=50",
    );
    const data = await response.json();
    return data;
  } else if (type === "ask") {
    const oneDayInSeconds = 24 * 60 * 60;
    const timestamp24HoursAgo = Math.floor(Date.now() / 1000) - oneDayInSeconds;

    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?tags=ask_hn&numericFilters=created_at_i>${timestamp24HoursAgo}&hitsPerPage=50`,
    );
    const data = await response.json();
    return data;
  } else if (type === "show") {
    const oneDayInSeconds = 24 * 60 * 60;
    const timestamp24HoursAgo = Math.floor(Date.now() / 1000) - oneDayInSeconds;

    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?tags=show_hn&numericFilters=created_at_i>${timestamp24HoursAgo}&hitsPerPage=50`,
    );
    const data = await response.json();
    return data;
  }
};

export const getPost = async (id: string) => {
  const response = await fetch(`https://hn.algolia.com/api/v1/items/${id}`);
  const data = await response.json();

  return data;
};
