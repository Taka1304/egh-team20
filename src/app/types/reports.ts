export type Report = {
  id: number;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  title: string;
  text: string;
  createdAt: string;
  image?: string;
  link?: string;
};
