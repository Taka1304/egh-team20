type HexBadgeProps = {
  number: number;
  title: string;
  color?: string;
  gradient?: string;
};

export function HexBadge({
  number,
  title,
  color = "rgba(108, 187, 156, 0.7)",
  gradient = "rgba(108, 187, 156, 0.7)",
}: HexBadgeProps) {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      {/* 六角形のSVG（落ち着いた色合い + ゴールド縁を控えめに） */}
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
        role="img"
        aria-label={`Badge: ${title}`}
      >
        <title>{title}</title>
        {/* 背景のグラデーション */}
        <defs>
          <linearGradient id={`badgeGradient-${number}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradient} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>

        {/* 六角形の本体 */}
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          fill={`url(#badgeGradient-${number})`}
          stroke="rgba(175, 136, 125, 1)"
          strokeWidth="2.5"
        />
      </svg>

      {/* バッジのテキスト（六角形内に収める） */}
      <div className="absolute flex flex-col items-center text-white w-full h-full justify-center p-1 overflow-hidden">
        <p className="text-xs font-semibold text-center leading-tight max-w-[90%] truncate">{title}</p>{" "}
        {/* タイトルを小さくし、はみ出し防止 */}
        <p className="text-sm font-semibold mt-1 text-yellow-600">{number}</p> {/* 数字をバランスよく調整 */}
      </div>
    </div>
  );
}
