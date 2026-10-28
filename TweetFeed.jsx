import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { getTweets, updateTweet } from "../services/api";

function TweetFeed() {
  const queryClient = useQueryClient();

  const {
    data: tweets = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["tweets"],
    queryFn: getTweets,
  });

  const likeMutation = useMutation({
    mutationFn: updateTweet,

    onMutate: async (tweet) => {
      await queryClient.cancelQueries({
        queryKey: ["tweets"],
      });

      const previousTweets = queryClient.getQueryData(["tweets"]);

      queryClient.setQueryData(["tweets"], (oldTweets = []) =>
        oldTweets.map((item) =>
          item._id === tweet._id
            ? { ...item, likes: (item.likes || 0) + 1 }
            : item
        )
      );

      return { previousTweets };
    },

    onError: (_error, _tweet, context) => {
      if (context?.previousTweets) {
        queryClient.setQueryData(
          ["tweets"],
          context.previousTweets
        );
      }

      alert("Like failed. Please try again.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tweets"],
      });
    },
  });

  if (isPending) {
    return <p>Loading tweets...</p>;
  }

  if (isError) {
    return <p>Unable to load tweets. Please check your API URL.</p>;
  }

  return (
    <div>
      <h2>Tweet Feed</h2>

      {tweets.length === 0 && (
        <p>No tweets yet. Post one!</p>
      )}

      {tweets.map((tweet) => (
        <div className="card" key={tweet._id}>
          <p>{tweet.text}</p>

          <button
            onClick={() => likeMutation.mutate(tweet)}
            disabled={likeMutation.isPending}
          >
             Like ({tweet.likes || 0})
          </button>
        </div>
      ))}
    </div>
  );
}

export default TweetFeed;