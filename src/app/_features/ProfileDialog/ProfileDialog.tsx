"use client";

import { useState } from "react";
import { ProfileDialogView } from "./ProfileDialogView";

type Profile = {
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
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [gender, setGender] = useState(profile.gender);
  const [skills, setSkills] = useState(profile.skills.join(", "));
  const [learningGoals, setLearningGoals] = useState(profile.learningGoals.join(", "));
  const [bio, setBio] = useState(profile.bio);
  const [isPublic, setIsPublic] = useState(profile.isPublic);

  // 保存処理
  const handleSave = () => {
    const updatedProfile: Profile = {
      ...profile,
      name,
      age,
      gender,
      skills: skills.split(", ").map((s) => s.trim()),
      learningGoals: learningGoals.split(", ").map((g) => g.trim()),
      bio,
      isPublic,
    };
    console.log("保存されたデータ:", updatedProfile);
    onClose();
  };

  return (
    <ProfileDialogView
      avatar={profile.avatar}
      following={profile.following}
      followers={profile.followers}
      name={name}
      setName={setName}
      age={age}
      setAge={setAge}
      gender={gender}
      setGender={setGender}
      skills={skills}
      setSkills={setSkills}
      learningGoals={learningGoals}
      setLearningGoals={setLearningGoals}
      bio={bio}
      setBio={setBio}
      isPublic={isPublic}
      setIsPublic={setIsPublic}
      onClose={onClose}
      onSave={handleSave}
    />
  );
}
