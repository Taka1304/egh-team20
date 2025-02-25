export type Report = {
  id: number;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  image?: string;
  link?: string;
};
