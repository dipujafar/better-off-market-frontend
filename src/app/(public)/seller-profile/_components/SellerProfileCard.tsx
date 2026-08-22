"use client";
import ReportSellerDialog from "@/components/shared/dialog/ReportSellerDialog";
import ImageWithFallback from "@/components/shared/image/ImageWithFallback";
import ReadMoreText from "@/components/shared/utils/ReadMoreText";
import SellerProfileSkeleton from "@/components/skeleton/seller-profile-skeleton";
import { Button } from "@/components/ui/button";
import { useGetSellerProfileQuery } from "@/redux/api/profileApi";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface SellerProfileProps {
  name?: string;
  avatarUrl?: string;
  title?: string;
  location?: string;
  bio?: string;
  activeListings?: number;
  totalListed?: number;
  avgRating?: number;
}

export function SellerProfileCard({
  name = "James R.",
  avatarUrl = "/seller_profile.png",
}: SellerProfileProps) {
  const sellerId = useSearchParams().get("seller");
  const { data, isLoading } = useGetSellerProfileQuery(sellerId);
  const user = data?.data;

  if (isLoading) return <SellerProfileSkeleton />;

  return (
    <>
      <div className="rounded-lg bg-white p-5 shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] sm:p-6 lg:p-8">
        <div className="flex flex-col gap-5 sm:flex-row lg:gap-8">
          {/* Avatar */}
          <ImageWithFallback
            src={user?.profile || "/default_user_profile.png"}
            alt={name}
            width={1200}
            height={1200}
            className="size-20 shrink-0 rounded-lg object-cover sm:size-28 lg:size-40"
          />

          {/* Info */}
          <div className="min-w-0 flex-1 flex flex-col justify-between">
            <div>
              <h2 className=" font-semibold text-primary-black text-2xl">
                {user?.name}
              </h2>
              {user?.company && (
                <h5 className="text-xl font-medium text-gray-900 mt-0.5">
                  {user?.company}
                </h5>
              )}
              {user?.bio && (
                <p className="mt-0.5 text-lg text-[#594139]">
                  <ReadMoreText text={user?.bio} wordLimit={50} />
                </p>
              )}
            </div>

            <div>
              {/* Divider */}
              <div className="mb-3 border-t border-gray-200 sm:my-5" />

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4 sm:gap-x-16">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-[#594139]">
                    ACTIVE LISTINGS
                  </p>
                  <p className="mt-1 text-xl font-semibold text-primary-blue">
                    {user?.activeListing}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-wide text-[#594139]">
                    TOTAL LISTED
                  </p>
                  <p className="mt-1 text-xl font-semibold text-primary-blue">
                    {user?.totalListing}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-wide text-[#594139]">
                    AVG RATING
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xl font-semibold text-primary-blue text-primary-black sm:text-xl">
                    {user?.avgRating?.toFixed(1)}{" "}
                    <span className="text-primary-blue">★</span>
                  </p>
                </div>
                <div>
                  <Link href="/message">
                    <Button className="lg:px-10 px-5 py-5 cursor-pointer">
                      Message Seller
                    </Button>
                  </Link>
                </div>
                {/* <div className="flex items-center text-[#BA1A1A] gap-1 text-xl cursor-pointer">
                <OctagonAlert size="20" /> Report this seller
              </div> */}
                <ReportSellerDialog sellerName={name} sellerId="123" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
