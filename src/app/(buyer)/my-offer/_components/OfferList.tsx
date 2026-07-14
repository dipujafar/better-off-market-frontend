import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import Image from "next/image";

interface Offer {
  id: string;
  propertyType: string;
  location: string;
  image: string;
  submittedDate: string;
  offerAmount: number;
  status: "pending" | "counter-offer" | "accepted" | "rejected";
  actions: string[];
}

const offers: Offer[] = [
  {
    id: "1",
    propertyType: "Duplex",
    location: "Nashville, TN",
    image: "/properties/property_offer_image_1.jpg",
    submittedDate: "Jun 9, 2026",
    offerAmount: 168000,
    status: "pending",
    actions: ["Edit", "Withdraw"],
  },
  {
    id: "2",
    propertyType: "Duplex",
    location: "Nashville, TN",
    image: "/properties/property_offer_image_2.jpg",
    submittedDate: "Jun 9, 2026",
    offerAmount: 168000,
    status: "counter-offer",
    actions: ["Review Counter"],
  },
  {
    id: "3",
    propertyType: "Condo",
    location: "Phoenix, AZ",
    image: "/properties/property_offer_image_3.png",
    submittedDate: "Jun 9, 2026",
    offerAmount: 168000,
    status: "accepted",
    actions: ["Sign Agreement"],
  },
  {
    id: "4",
    propertyType: "Land",
    location: "Tulsa, OK",
    image: "/properties/property_offer_image_2.jpg",
    submittedDate: "Jun 5, 2026",
    offerAmount: 19500,
    status: "rejected",
    actions: ["View Details"],
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return (
        <Badge className="bg-[#FFF3E0] text-[#E65100] flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Pending
        </Badge>
      );
    case "counter-offer":
      return (
        <Badge className="bg-[#FFF8E1] text-[#F57F17]">⚡ Counter offer</Badge>
      );
    case "accepted":
      return (
        <Badge className="bg-[#E8F5E9] text-[#1B5E20] flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          Accepted
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-700 flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          Rejected
        </Badge>
      );
  }
}

export default function OfferList() {
  return (
    <div className="w-full    space-y-4 mt-8">
      {offers.map((offer) => (
        <div
          key={offer.id}
          className="border  rounded-lg p-6 bg-white hover:shadow-md transition-shadow border-primary-border-color"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 flex md:items-center gap-6">
              {/* Property Image */}
              <div className="shrink-0">
                <Image
                  width={96}
                  height={96}
                  src={offer.image}
                  alt={offer.propertyType}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              </div>

              {/* Property Info */}
              <div className="flex-1 min-w-0">
                <div className="mt-4 grid md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <h3 className="lg:text-2xl text-xl font-semibold">
                      {offer.propertyType}
                    </h3>
                    <p className="text-sm font-medium text-primary-gray">
                      {offer.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-primary-gray font-medium text-sm">
                      Submitted
                    </p>
                    <p className="text-gray-700 text-[16px]">
                      {offer.submittedDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-primary-gray font-medium text-sm">
                      Offer Amount
                    </p>
                    <p className="text-primary-color lg:text-2xl text-xl font-semibold">
                      ${offer.offerAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>{getStatusBadge(offer.status)}</div>
                </div>
              </div>
            </div>

            {/* Status and Actions */}
            <div className="flex flex-col items-end gap-3">
              <div className="flex gap-2">
                {offer.actions.map((action) => (
                  <Button
                    key={action}
                    variant={
                      action === "Review Counter" || action === "Sign Agreement"
                        ? "default"
                        : "outline"
                    }
                    className={
                      action === "Review Counter" || action === "Sign Agreement"
                        ? "bg-primary-color hover:bg-blue-900 text-white"
                        : ""
                    }
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
