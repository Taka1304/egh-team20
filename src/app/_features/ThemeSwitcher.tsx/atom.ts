import { atom } from "jotai";

// 選択されているテーマを保存するatom
export const selectedThemeAtom = atom<string>("purple");

// テーマのモダールの表示状態を管理するatom
export const isThemeModalOpenAtom = atom<boolean>(false);

// テーマの定義
export const themes = [
  {
    name: "purple",
    label: "アメジスト",
    colors: ["#1e202c", "#60519b", "#31323e", "#bfc0d1"],
  },
  {
    name: "red",
    label: "ルビー",
    colors: ["#19171b", "#75020f", "#51080d", "#2b0307"],
  },
  {
    name: "green",
    label: "エメラルド",
    colors: ["#b3cfad", "#e3e6db", "#9f9579", "#d9ca77"],
  },
  {
    name: "blue",
    label: "サファイア",
    colors: ["#0f1e3f", "#213a56", "#cdaa80", "#997953"],
  },
  {
    name: "pink",
    label: "ローズクォーツ",
    colors: ["#ef76a7", "#afe065", "#f396c3", "#6bcacc"],
  },
  {
    name: "brown",
    label: "ココア",
    colors: ["#ded8d2", "#948585", "#3d312e", "#564a4d"],
  },
];
