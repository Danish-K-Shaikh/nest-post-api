export interface Comment {
  id: string;
  postId: string;
  user: string;
  comment: string;
}
export interface Post {
  id: string;
  heading: string;
  content: string;
  user: string;
}

export const POSTS: Post[] = [
  {
    id: '1',
    heading: 'Trending JS frameworks/librarier',
    content: '1)React 2)Express 3)Next',
    user: 'Danish',
  },
  {
    id: '2',
    heading: 'React concepts',
    content: '1)State 2)Props 3)Hooks',
    user: 'Naveen',
  },
];

export const COMMENTS: Comment[] = [];
