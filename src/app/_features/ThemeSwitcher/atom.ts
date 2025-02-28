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
    reactionChartColors: ["#6c5ce7", "#a29bfe", "#81ecec", "#74b9ff"],
  },
  {
    name: "red",
    label: "ルビー",
    colors: ["#19171b", "#75020f", "#51080d", "#2b0307"],
    reactionChartColors: ["#e74c3c", "#f1948a", "#f5b7b1", "#fadbd8"],
  },
  {
    name: "green",
    label: "エメラルド",
    colors: ["#b3cfad", "#e3e6db", "#9f9579", "#d9ca77"],
    reactionChartColors: ["#2ecc71", "#58d68d", "#a3e4d7", "#d5f5e3"],
  },
  {
    name: "blue",
    label: "サファイア",
    colors: ["#0f1e3f", "#213a56", "#cdaa80", "#997953"],
    reactionChartColors: ["#3498db", "#5dade2", "#aed6f1", "#eaf2f8"],
  },
  {
    name: "brown",
    label: "ココア",
    colors: ["#ded8d2", "#948585", "#3d312e", "#564a4d"],
    reactionChartColors: ["#a04000", "#d35400", "#eb984e", "#f5d76e"],
  },
];
