export interface Language {
  post: {
    username: string;
    sponsored: string;
    caption: string;
    timeAgo: string;
    likes: string;
    commentPlaceholder: string;
    postButton: string;
  };
  prizeWheel: {
    spinButton: string;
    tryAgainButton: string;
    spinningText: string;
    prizes: Array<{
      prize: string;
      description: string;
    }>;
  };
  modal: {
    congratsTitle: string;
    stepCloser: string;
    notThisTime: string;
    claimNowButton: string;
    tryAgainButton: string;
    claimUrl: string;
    oneMoreTry: string;
  };
  reviews: {
    title: string;
    items: Array<{
      username: string;
      content: string;
      likes: string;
      timeAgo: string;
      verified: boolean;
    }>;
  };
}