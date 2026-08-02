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
  MessageSquareText,
} from "lucide-react";
import { CounterOfferBanner } from "./CounterOfferBanner";
import { ChangedSummaryCard } from "./ChangedSummaryCard";
import { DiffField } from "./DiffField";
import { CounterOfferActionBar } from "./CounterOfferActionBar";
import { SummaryCard } from "../../review-offer/_components/SummaryCard";
import { SummaryField } from "../../review-offer/_components/SummaryField";
import { Pill } from "../../review-offer/_components/Pill";
import { ContingencyItem } from "../../review-offer/_components/ContingencyItem";
import { OfferSummaryData } from "../../review-offer/_components/OfferSummary";
import {
  CalendarIcon,
  DollarIcon,
  PDFIcon,
  PersonalPropertyIcon,
} from "@/icons";
import SellerProfileCard from "@/components/shared/card/seller-profile-card";

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

export interface CounterOfferBannerData {
  title: string;
  sellerName: string;
  changedSectionCount: number;
  propertyAddress: string;
  onViewHistory?: () => void;
}

export interface CounterOfferChangeData {
  /** Which section this change replaces in the layout — currently only "sellerConcessions" is wired up. */
  section: "sellerConcessions";
  changedBy: string;
  modifiedAt: string;
  description: string;
  field: { label: string; oldValue: string; newValue: string };
}

export interface CounterOfferActionsData {
  onAcceptCounter?: () => void;
  onCounterOffer?: () => void;
  onMessageBuyer?: () => void;
  onReject?: () => void;
  isSubmitting?: boolean;
}

interface CounterOfferSummaryProps {
  data: OfferSummaryData;
  banner: CounterOfferBannerData;
  change: CounterOfferChangeData;
  actions?: CounterOfferActionsData;
  sidebarFooter?: ReactNode;
}

/**
 * Same layout as <OfferSummary>, plus:
 * - a top banner announcing the counter offer
 * - the changed section rendered as a highlighted before/after card
 * - a bottom action bar (Accept counter / Counter offer / Message buyer / Reject)
 */
export function CounterOfferSummary({
  data,
  banner,
  change,
  actions,
  sidebarFooter,
}: CounterOfferSummaryProps) {
  return (
    <div className="mx-auto flex w-full  flex-col gap-6 px-4 pb-6 lg:pt-10 pt-6 sm:px-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] border border-[#E0E3E580] md:mt-8 mt-6 rounded-lg">
      <CounterOfferBanner
        title={banner.title}
        sellerName={banner.sellerName}
        changedSectionCount={banner.changedSectionCount}
        propertyAddress={banner.propertyAddress}
        onViewHistory={banner.onViewHistory}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
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

          {change.section === "sellerConcessions" ? (
            <ChangedSummaryCard
              title="Seller Concessions"
              //   icon={<AlertCircle size={18} />}
              changedBy={change.changedBy}
              modifiedAt={change.modifiedAt}
              description={change.description}
            >
              <DiffField
                label={change.field.label}
                oldValue={change.field.oldValue}
                newValue={change.field.newValue}
              />
            </ChangedSummaryCard>
          ) : (
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
          )}

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
                <SummaryField
                  label="Commission"
                  value={data.agent.commission}
                />
              </div>
            </SummaryCard>
          ) : null}

          <SummaryCard
            title="Personal Property"
            icon={<PersonalPropertyIcon />}
          >
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

          <SummaryCard title="Closing Terms" icon={<CalendarIcon />}>
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

          <div className="hidden lg:block">
            {actions ? (
              <CounterOfferActionBar
                onAcceptCounter={actions.onAcceptCounter}
                onCounterOffer={actions.onCounterOffer}
                onMessageBuyer={actions.onMessageBuyer}
                onReject={actions.onReject}
                isSubmitting={actions.isSubmitting}
              />
            ) : null}
          </div>
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
                      className="flex items-center justify-between gap-3 rounded-lg border border-primary-border-color bg-[#F7F9FB] px-3 py-3 text-sm text-foreground hover:border-primary/50"
                    >
                      <div className="flex gap-2">
                        <PDFIcon className="size-5" />
                        <span className="truncate font-medium text-primary-black">
                          {doc.name}
                        </span>
                      </div>
                      <Download
                        size={16}
                        color="#594139"
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
              icon={<MessageSquareText size={18} />}
            >
              <p className="rounded-lg bg-[#F2F4F6] p-3 text-sm italic leading-relaxed text-[#594139]">
                &ldquo;{data.notesToSeller}&rdquo;
              </p>
            </SummaryCard>
          ) : null}

          <SellerProfileCard />

           <div className="lg:hidden">
            {actions ? (
              <CounterOfferActionBar
                onAcceptCounter={actions.onAcceptCounter}
                onCounterOffer={actions.onCounterOffer}
                onMessageBuyer={actions.onMessageBuyer}
                onReject={actions.onReject}
                isSubmitting={actions.isSubmitting}
              />
            ) : null}
          </div>

          {sidebarFooter}
        </div>
      </div>
    </div>
  );
}
