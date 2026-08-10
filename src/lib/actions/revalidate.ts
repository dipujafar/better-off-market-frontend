"use server";
import { tagTypes } from "@/redux/tagTypes";
import { revalidateTag } from "next/cache";

export async function revalidateProperties() {
  revalidateTag(tagTypes.property, "max");
}
