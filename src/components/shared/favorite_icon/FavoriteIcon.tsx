import { Heart } from "lucide-react";

export default function FavoriteIcon() {
  return (
    <button
      // onClick={handleFavoriteClick}
      className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-sm cursor-pointer group"
      aria-label="Add to favorites"
    >
      <Heart
        size={20}
        className={
          // favorited ? 'fill-red-500 text-red-500' :
          " text-primary-black hover:fill-red-500 hover:text-red-500 transition-colors  duration-500 ease-in-out"
        }
      />
    </button>
  );
}
