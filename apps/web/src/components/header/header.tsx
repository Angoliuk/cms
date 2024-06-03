import Link from "next/link";
import { FC, memo } from "react";

export const Header: FC = memo(() => {
  return (
    <div className="flex items-center justify-center gap-4 border-b border-slate-300 py-3">
      <Link className="text-white-1000 px-4 py-2" href="/news">
        Main
      </Link>
      <Link className="text-white-1000 px-4 py-2" href="/news/tag-search">
        Tags
      </Link>
      <Link className="text-white-1000 px-4 py-2" href="/news/text-search">
        Text
      </Link>
    </div>
  );
});
