const API_URL = "https://crudcrud.com/api/252c95327ae245a491a7bad51c940180/tweets";

export async function getTweets() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch tweets");
  }

  return response.json();
}

export async function addTweet(tweet) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tweet),
  });

  if (!response.ok) {
    throw new Error("Failed to add tweet");
  }

  return response.json();
}

export async function updateTweet(tweet) {
  const response = await fetch(`${API_URL}/${tweet._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: tweet.text,
      likes: tweet.likes,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to like tweet");
  }

  return true;
}