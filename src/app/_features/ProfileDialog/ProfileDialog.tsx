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
  const [editedProfile, setEditedProfile] = useState(profile);

  return (
    <ProfileDialogView
      profile={editedProfile}
      onChange={(updatedProfile) => setEditedProfile(updatedProfile)}
      onClose={onClose}
    />
  );
}
