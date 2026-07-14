"use client";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  buyer: string;
  location: string;
  amount: string;
  time: string;
  status: "NEW" | "ACCEPTED";
  action: string;
  actionType: "review" | "message";
}

const transactions: Transaction[] = [
  {
    id: "1",
    buyer: "James B.",
    location: "Memphis house",
    amount: "$46,000",
    time: "2 hours ago",
    status: "NEW",
    action: "Review",
    actionType: "review",
  },
  {
    id: "2",
    buyer: "Sarah L.",
    location: "Nashville duplex",
    amount: "$298,000",
    time: "1 day ago",
    status: "NEW",
    action: "Review",
    actionType: "review",
  },
  {
    id: "3",
    buyer: "Robert K.",
    location: "Tulsa land",
    amount: "$19,500",
    time: "3 days ago",
    status: "ACCEPTED",
    action: "Message",
    actionType: "message",
  },
];

export default function RecentOffers() {
  const getStatusColor = (status: "NEW" | "ACCEPTED") => {
    return status === "NEW"
      ? "bg-[#AC3400]/10 text-[#AC3400]"
      : "bg-[#DCFCE7] text-[#166534]";
  };

  const getActionColor = (actionType: "review" | "message") => {
    return actionType === "review"
      ? "text-[#AC3400]"
      : "text-[#565E74]";
  };

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block  rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F2F4F6] border-b">
            <tr>
              <th className="px-6 py-3 text-left font-bold text-primary-gray">
                Buyer
              </th>
              <th className="px-6 py-3 text-left font-bold text-primary-gray">
                Amount
              </th>
              <th className="px-6 py-3 text-left font-bold text-primary-gray">
                Time
              </th>
              <th className="px-6 py-3 text-left font-bold text-primary-gray">
                Status
              </th>
              <th className="px-6 py-3 text-left font-bold text-primary-gray">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-primary-black">
                    {transaction.buyer}
                  </div>
                  <div className="text-sm text-primary-gray">
                    {transaction.location}
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-primary-black">
                  {transaction.amount}
                </td>
                <td className="px-6 py-4 text-primary-gray">
                  {transaction.time}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(transaction.status)}`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Button
                    variant="ghost"
                    className={`text-orange-600 hover:text-orange-700 hover:bg-orange-50 p-0 h-auto font-bold cursor-pointer ${getActionColor(transaction.actionType)}`}
                  >
                    {transaction.action}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-primary-black">
                  {transaction.buyer}
                </h3>
                <p className="text-sm text-primary-gray">
                  {transaction.location}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(transaction.status)}`}
              >
                {transaction.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary-gray">Amount</span>
                <span className="font-semibold text-primary-black">
                  {transaction.amount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary-gray">Time</span>
                <span className="text-sm text-primary-black">
                  {transaction.time}
                </span>
              </div>
            </div>

            <Button
              variant="ghost"
              className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-bold cursor-pointer"
            >
              {transaction.action}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
