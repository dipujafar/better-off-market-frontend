"use client";
import { cn } from "@/lib/utils";
import { useCreateFavoriteMutation } from "@/redux/api/favoriteApi";
import { useAppSelector } from "@/redux/hooks";
import { Heart, Loader } from "lucide-react";
import { AppDialog } from "../dialog/AppDialog";
import { useState } from "react";

export default function FavoriteIcon({
  savedProperty,
  id,
}: {
  savedProperty?: boolean;
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const [createFavorite, { isLoading }] = useCreateFavoriteMutation();
  console.log(user);

  const handleFavoriteClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setOpen(true);
      return; // also add this - you were falling through to createFavorite even when no user
    }

    try {
      await createFavorite({ property: id }).unwrap();
    } catch (error) {
      console.error("Error creating favorite:", error);
    }
  };
  return (
    <>
      <button
        onClick={handleFavoriteClick}
        className={cn(
          "group/favorite absolute top-3 right-3 rounded-full bg-black/10 backdrop-blur-[2px] p-2 hover:bg-red-500 transition-colors shadow-sm cursor-pointer duration-300 ease-in-out",
          savedProperty &&
            "bg-red-500 hover:bg-black/10 hover:backdrop-blur-[2px]",
        )}
        aria-label="Add to favorites"
      >
        {isLoading ? (
          <Loader size={20} className="animate-spin text-white" />
        ) : (
          <Heart
            size={20}
            className={
              // favorited ? 'fill-red-500 text-red-500' :
              cn(
                "text-white group-hover/favorite:fill-white group-hover/favorite:text-white transition-colors duration-500 ease-in-out",
                savedProperty &&
                  "fill-white text-white group-hover/favorite:fill-transparent group-hover/favorite:text-white",
              )
            }
          />
        )}
      </button>

      <AppDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete property"
        description="This action cannot be undone. This will permanently delete the listing."
        actions={[
          {
            label: "Cancel",
            variant: "outline",
            onClick: () => setOpen(false),
          },
          // { label: "Delete", variant: "destructive", onClick: handleDelete },
        ]}
      />
    </>
  );
}
