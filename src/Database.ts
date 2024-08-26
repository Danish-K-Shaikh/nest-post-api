export interface Post {
  id: string;
  heading: string;
  content: string;
  user: string;
  likes: string[];
  comments: { user: string; comment: string }[];
}

export const POSTS: Post[] = [
  {
    id: '1',
    heading: 'Trending JS frameworks/librarier',
    content: '1)React 2)Express 3)Next',
    user: 'Danish',
    likes: [],
    comments: [],
  },
  {
    id: '2',
    heading: 'React concepts',
    content: '1)State 2)Props 3)Hooks',
    user: 'Naveen',
    likes: [],
    comments: [],
  },
];
