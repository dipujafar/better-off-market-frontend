import { Heart } from "lucide-react";

export default function FavoriteIcon() {
  return (
    <button
      // onClick={handleFavoriteClick}
      className="group/favorite absolute top-3 right-3 rounded-full bg-black/10 backdrop-blur-[2px] p-2 hover:bg-red-500 transition-colors shadow-sm cursor-pointer duration-300 ease-in-out"
      aria-label="Add to favorites"
    >
      <Heart
        size={20}
        className={
          // favorited ? 'fill-red-500 text-red-500' :
          "text-white group-hover/favorite:fill-white group-hover/favorite:text-white transition-colors duration-500 ease-in-out"
        }
      />
    </button>
  );
}