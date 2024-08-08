// User-related props
export interface CredentialsPageProps {
  userId: string;
  secret: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

export interface RecoverPasswordProps {
  userId: string;
  secret: string;
  password: string;
}

// Post-related props
export interface PostProps {
  $id: string;
  $createdAt: string;
  userID: string;
  title: string;
  content: string;
  favoriteTo: Array<object>;
  className?: string;
  createdBy: any;
  delay?: number;
  showComments?: boolean;
  comments?: any;
}

export interface CreatePostProps {
  title: string;
  content: string;
  userID: string;
}

export interface CreatePostCommentProps {
  userID: string;
  postID: string;
  content: string;
}

export interface GetPostProps {
  postID: string;
}

// Favorite posts-related props
export interface AddFavoritePostProps {
  userID: string;
  postID: string;
}

export interface GetUserFavoritePostsProps {
  userID: string;
}

export interface DeleteFavoritePostProps {
  userID: string;
  postID: string;
}

export interface FavoriteButtonProps {
  postID: string;
  isFavorite: boolean;
  userID: string;
  setIsFavorite: (isFavorite: boolean) => void;
}

// Post grid-related props
export interface GetUserPostsProps {
  userID: string;
  limit?: number;
}

export interface GetPostsByTypeProps {
  type: "default" | "favorites" | "account";
  userID: string;
  limit?: number;
}

export interface PostsGridProps {
  userID: string;
  type?: "default" | "favorites" | "account";
  limit?: number;
  className?: string;
}

// UI components-related props
export interface PostSkeletonProps {
  delay?: number;
}

export interface NavItemProps {
  item: {
    name: string;
    href: string;
    icon: React.ReactNode;
  };
}

export interface SettingsItemProps {
  label: string;
  value: string;
  onUpdate: (value: string) => Promise<void>;
  isPassword?: boolean;
}
