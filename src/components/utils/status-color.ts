export const STATUS = {
  pending: "Pending",
  active: "Active",
  under_contact: "Under Contract",
  sold: "Sold",
  rejected: "Rejected",
} as const;

export const statusColor = {
  Active: "bg-[#DCFCE7] text-[#166534]",
  Pending: "bg-[#FDE9D9] text-[#A62E2E]",
  "Under Contract": "bg-[#FDE9D9] text-[#A62E2E]",
  Sold: "bg-[#DCFCE7] text-[#166534]",
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
