"use client";
import { useIncreaseViewCountMutation } from "@/redux/api/propertiesApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useRef } from "react";

export default function IncreaseViewsCount({
  id,
  seller,
}: {
  id: string;
  seller: { _id: string };
}) {
  const user: any = useAppSelector((state) => state.auth.user);
  const [increaseViewsCount] = useIncreaseViewCountMutation();
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    if (user?.userId === seller?._id) return; // don't count the seller viewing their own listing

    hasFired.current = true;
    increaseViewsCount(id);
  }, [id, seller?._id, user?.userId, increaseViewsCount]);

  return null;
}