import type { ReactNode } from "react";
import {
  FileText,
  AlertCircle,
  Search,
  BadgeCheck,
  Archive,
  Calendar,
  File,
  Download,
  MessageSquare,
} from "lucide-react";
import { SummaryCard } from "./SummaryCard";
import { SummaryField } from "./SummaryField";
import { ContingencyItem } from "./ContingencyItem";
import { Pill } from "./Pill";
import { DollarIcon } from "@/icons";

export interface OfferSummaryDocument {
  name: string;
  url: string;
}

export interface OfferSummaryData {
  offerAmount: number;
  earnestMoney: number;
  financingType: string;
  closingCosts: string;

  sellerContribution: number;

  inspection: { required: boolean; days?: number };
  appraisal: { required: boolean; days?: number };

  agent?: { name: string; commission: string };

  personalProperty: {
    included: string[];
    itemsToRemove?: string;
  };

  closingTerms: {
    titleCompany: string;
    closingDate: string;
    possession: string;
  };

  documents?: OfferSummaryDocument[];
  notesToSeller?: string;
}

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  });
}

function contingencyValue(item: { required: boolean; days?: number }) {
  if (!item.required) return "Waived";
  return item.days ? `Yes, ${item.days} days` : "Yes";
}

interface OfferSummaryProps {
  data: OfferSummaryData;
  /** Extra content rendered at the bottom of the sidebar column (e.g. action buttons). */
  sidebarFooter?: ReactNode;
}

/**
 * Read-only review of a submitted offer. Two-column on large screens
 * (main details left, Documents/Notes sidebar right), single stacked
 * column below `lg`.
 */
export function OfferSummary({ data, sidebarFooter }: OfferSummaryProps) {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-6 p-4  sm:p-6 lg:grid-cols-3 lg:items-start border border-[#E6E8EA] md:mt-8 mt-6 rounded-md shadow-[0_10px_30px_0_rgba(15,23,42,0.05)]">
      {/* Main column */}
      <div className="flex flex-col gap-6 lg:col-span-2">
        <SummaryCard title="Offer Details" icon={<DollarIcon />}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <SummaryField
              label="Offer amount"
              value={formatCurrency(data.offerAmount)}
            />
            <SummaryField
              label="Earnest money"
              value={formatCurrency(data.earnestMoney)}
            />
            <SummaryField label="Financing type" value={data.financingType} />
            <SummaryField label="Closing costs" value={data.closingCosts} />
          </div>
        </SummaryCard>

        <SummaryCard
          title="Seller Concessions"
          icon={<AlertCircle size={18} />}
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <SummaryField label="Closing costs" value={data.closingCosts} />
            <SummaryField
              label="Seller contribution ($)"
              value={formatCurrency(data.sellerContribution)}
            />
          </div>
        </SummaryCard>

        <SummaryCard title="Contingencies" icon={<AlertCircle size={18} />}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ContingencyItem
              icon={<Search size={16} />}
              label="Inspection"
              value={contingencyValue(data.inspection)}
            />
            <ContingencyItem
              icon={<BadgeCheck size={16} />}
              label="Appraisal"
              value={contingencyValue(data.appraisal)}
            />
          </div>
        </SummaryCard>

        {data.agent ? (
          <SummaryCard title="Real Estate Agent">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <SummaryField label="Agent name" value={data.agent.name} />
              <SummaryField label="Commission" value={data.agent.commission} />
            </div>
          </SummaryCard>
        ) : null}

        <SummaryCard title="Personal Property" icon={<Archive size={18} />}>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Included items
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.personalProperty.included.length > 0 ? (
                  data.personalProperty.included.map((item) => (
                    <Pill key={item}>{item}</Pill>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    None specified
                  </span>
                )}
              </div>
            </div>
            {data.personalProperty.itemsToRemove ? (
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Items to be removed
                </p>
                <p className="mt-1 text-sm italic text-foreground">
                  &ldquo;{data.personalProperty.itemsToRemove}&rdquo;
                </p>
              </div>
            ) : null}
          </div>
        </SummaryCard>

        <SummaryCard title="Closing Terms" icon={<Calendar size={18} />}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            <SummaryField
              label="Title company"
              value={data.closingTerms.titleCompany}
            />
            <SummaryField
              label="Closing date"
              value={data.closingTerms.closingDate}
            />
            <SummaryField
              label="Possession"
              value={data.closingTerms.possession}
            />
          </div>
        </SummaryCard>
      </div>

      {/* Sidebar column */}
      <div className="flex flex-col gap-6">
        {data.documents && data.documents.length > 0 ? (
          <SummaryCard title="Documents" icon={<File size={18} />}>
            <ul className="flex flex-col gap-2">
              {data.documents.map((doc) => (
                <li key={doc.url}>
                  <a
                    href={doc.url}
                    download
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm text-foreground hover:border-primary/50"
                  >
                    <span className="truncate">{doc.name}</span>
                    <Download
                      size={16}
                      className="shrink-0 text-muted-foreground"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </SummaryCard>
        ) : null}

        {data.notesToSeller ? (
          <SummaryCard
            title="Notes to Seller"
            icon={<MessageSquare size={18} />}
          >
            <p className="rounded-xl bg-muted/40 p-3 text-sm italic leading-relaxed text-foreground">
              &ldquo;{data.notesToSeller}&rdquo;
            </p>
          </SummaryCard>
        ) : null}

        {sidebarFooter}
      </div>
    </div>
  );
}
