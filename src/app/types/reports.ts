export type Report = {
  id: string;
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
  tags?: string[];
  likes?: number;
  comments?: number;
  flames?: number;
  checks?: number;
  hasLiked?: boolean; // 追加: 自分がLIKEをつけたか
  hasFlamed?: boolean; // 追加: 自分がFLAMEをつけたか
  hasChecked?: boolean; // 追加: 自分がCHECKをつけたか
};
