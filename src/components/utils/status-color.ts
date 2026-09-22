export const STATUS = {
  pending: "Pending",
  active: "Active",
  under_contact: "Under Contract",
  sold: "Sold",
  rejected: "Rejected",
} as const;

export const statusColor = {
  Active: "bg-[#DCFCE7] text-[#166534]",
  Pending: "bg-[#FEF3C7] text-[#92400E]",
  "Under Contract": "bg-[#ECE6F8] text-[#321ABA]",
  Sold: "bg-[#E5E7EB] text-[#374151]",
  Rejected: "bg-[#FFDAD6] text-[#93000A]",
};

export const getStatus = (status: string) => {
  switch (status) {
    case STATUS.pending:
      return "Pending Review";
    case STATUS.active:
      return "Active";
    case STATUS.under_contact:
      return "Under Contract";
    case STATUS.sold:
      return "Sold";
    case STATUS.rejected:
      return "Rejected";
  }
};
