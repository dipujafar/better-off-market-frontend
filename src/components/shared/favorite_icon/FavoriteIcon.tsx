import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

export default function FavoriteIcon({
  savedProperty,
}: {
  savedProperty?: boolean;
}) {
  return (
    <button
      // onClick={handleFavoriteClick}
      className={cn(
        "group/favorite absolute top-3 right-3 rounded-full bg-black/10 backdrop-blur-[2px] p-2 hover:bg-red-500 transition-colors shadow-sm cursor-pointer duration-300 ease-in-out",
        savedProperty && "bg-red-500 hover:bg-black/10 hover:backdrop-blur-[2px]",
      )}
      aria-label="Add to favorites"
    >
      <Heart
        size={20}
        className={
          // favorited ? 'fill-red-500 text-red-500' :
          cn("text-white group-hover/favorite:fill-white group-hover/favorite:text-white transition-colors duration-500 ease-in-out",
            savedProperty && "fill-white text-white group-hover/favorite:fill-transparent group-hover/favorite:text-white")
        }
      />
    </button>
  );
}
