
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTweet } from "../services/api";

function TweetForm() {
  const [tweet, setTweet] = useState("");
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addTweet,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tweets"],
      }),
  });

  function handleSubmit(e) {
    e.preventDefault();

    const text = tweet.trim();
    if (!text || addMutation.isPending) return;

    addMutation.mutate(
      { text, likes: 0 },
      {
        onSuccess: () => setTweet(""),
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="What's happening?"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        disabled={addMutation.isPending}
      />

      <button type="submit" disabled={addMutation.isPending || !tweet.trim()}>
        {addMutation.isPending ? "Posting..." : "Post Tweet"}
      </button>
      {addMutation.isError && (
        <p role="alert">Tweet post nahi hua: {addMutation.error.message}</p>
      )}
    </form>
  );
}

export default TweetForm;