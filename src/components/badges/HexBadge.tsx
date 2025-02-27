type HexBadgeProps = {
  number: number;
  title: string;
  color?: string;
  gradient?: string;
};

export function HexBadge({
  number,
  title,
  color = "#2C3E50", // 落ち着いた青系カラー
  gradient = "#34495E", // 立体感のあるグラデーション
}: HexBadgeProps) {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      {/* 六角形のSVG（ゴールドの縁 + 立体感） */}
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
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
          stroke="rgba(255, 215, 0, 0.8)" /* ゴールドの枠 */
          strokeWidth="3"
        />
      </svg>

      {/* バッジのテキスト（中央配置） */}
      <div className="absolute flex flex-col items-center text-white w-full h-full justify-center p-1 overflow-hidden">
        <p className="text-[11px] font-semibold text-center leading-tight max-w-[85%] truncate">{title}</p>
        <p className="text-base font-bold mt-1 text-yellow-500">{number}</p>
      </div>
    </div>
  );
}
