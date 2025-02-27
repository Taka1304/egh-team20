"use client";

import { useCallback, useState } from "react";
import { ProfileDialogView } from "./ProfileDialogView";

export type Profile = {
  name: string;
  age: number;
  gender: string;
  avatar: string;
  skills: string[];
  learningGoals: string[];
  bio: string;
  isPublic: boolean;
  followers: number;
  following: number;
};

type ProfileDialogProps = {
  profile: Profile;
  onClose: () => void;
};

export function ProfileDialog({ profile, onClose }: ProfileDialogProps) {
  const [editedProfile, setEditedProfile] = useState<Profile>(profile);

  // フィールド1つを更新する共通関数
  const setField = useCallback(<K extends keyof Profile>(key: K, value: Profile[K]) => {
    setEditedProfile((prev) => ({ ...prev, [key]: value }));
  }, []);

  const skillsAsString = editedProfile.skills.join(", ");
  const setSkillsFromString = (text: string) => {
    // カンマ区切り文字列 → string[] へ
    const array = text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setField("skills", array);
  };

  const goalsAsString = editedProfile.learningGoals.join(", ");
  const setGoalsFromString = (text: string) => {
    const array = text
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);
    setField("learningGoals", array);
  };

  // 保存処理
  const handleSave = () => {
    // 保存処理
    console.log(editedProfile);
    onClose();
  };

  return (
    <ProfileDialogView
      avatar={editedProfile.avatar}
      following={editedProfile.following}
      followers={editedProfile.followers}
      name={editedProfile.name}
      setName={(val) => setField("name", val)}
      age={editedProfile.age}
      setAge={(val) => setField("age", val)}
      gender={editedProfile.gender}
      setGender={(val) => setField("gender", val)}
      skills={skillsAsString}
      setSkills={setSkillsFromString}
      learningGoals={goalsAsString}
      setLearningGoals={setGoalsFromString}
      bio={editedProfile.bio}
      setBio={(val) => setField("bio", val)}
      isPublic={editedProfile.isPublic}
      setIsPublic={(val) => setField("isPublic", val)}
      onClose={onClose}
      onSave={handleSave}
    />
  );
}
