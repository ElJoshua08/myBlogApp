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
}

export interface FavoriteButtonProps {
  postID: string;
  isFavorite: boolean;
  userID: string;
  setIsfavorite: (isFavorite: boolean) => void;
}

export interface PostsGridProps {
  userID: string;
  isFavorites?: boolean;
}

export interface NavItemProps {
  item: {
    name: string;
    href: string;
    icon: React.ReactNode;
  };
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

export interface CreatePostProps {
  title: string;
  content: string;
  userID: string;
}

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
