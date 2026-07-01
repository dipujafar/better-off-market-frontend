import { TCategory } from "@/types";
import Image from "next/image";

export default function CategoryCard({Category}: {Category: TCategory}) {
  return (
    <div>
      <Image src={Category.image} alt={`${Category.title} category image`} />
    </div>
  )
}
