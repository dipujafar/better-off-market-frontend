import { Badge } from "../ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export function getOfferStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return (
        <Badge className="bg-[#FFF3E0] text-[#E65100] flex items-center gap-1 rounded-xs ">
          <Clock className="w-3 h-3" />
          Pending Review
        </Badge>
      );
    case "countered":
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
    case "withdrawn":
      return (
        <Badge className="bg-[#deded4] text-[#5c5e1b] flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          Withdrawn
        </Badge>
      );
  }
}
