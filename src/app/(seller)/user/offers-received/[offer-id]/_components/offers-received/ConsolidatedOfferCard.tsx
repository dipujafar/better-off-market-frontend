import {
  FileText,
  Archive,
  AlertCircle,
  Search,
  BadgeCheck,
  Calendar,
  File,
  Download,
  MessageSquare,
  MessageSquareText,
} from "lucide-react";
import { OfferSubSection } from "./OfferSubSection";
import {
  formatCurrency,
  contingencyValue,
  type ConsolidatedOfferData,
} from "./utils.offer-received";
import { SummaryField } from "@/app/(buyer)/review-offer/_components/SummaryField";
import { ContingencyItem } from "@/app/(buyer)/review-offer/_components/ContingencyItem";
import { Pill } from "@/app/(buyer)/review-offer/_components/Pill";
import { DocIcon, DollarIcon, PersonalPropertyIcon } from "@/icons";

interface ConsolidatedOfferCardProps {
  name: string;
  data: ConsolidatedOfferData;
  onEditOfferDetails?: () => void;
}

export function ConsolidatedOfferCard({
  name: buyerName,
  data,
  onEditOfferDetails,
}: ConsolidatedOfferCardProps) {
  return (
    <div className="border border-[#E6E8EA] bg-card p-5 shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] sm:p-6 rounded-lg">
      <h4 className="text-2xl font-semibold">Offer from {buyerName}</h4>
      <section className=" space-y-4 rounded-xl mt-5">
        <OfferSubSection
          title="Offer Details"
          icon={<DollarIcon />}
          onEdit={onEditOfferDetails}
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
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
            {data.commission ? (
              <SummaryField label="Commission" value={data.commission} />
            ) : null}
          </div>
        </OfferSubSection>

        <OfferSubSection
          title="Personal Property"
          icon={<PersonalPropertyIcon />}
        >
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#594139]">
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
                <p className="text-xs font-semibold uppercase tracking-wide text-[#594139]">
                  Items to be removed
                </p>
                <p className="mt-1 text-sm italic text-foreground">
                  &ldquo;{data.personalProperty.itemsToRemove}&rdquo;
                </p>
              </div>
            ) : null}
          </div>
        </OfferSubSection>

        <OfferSubSection title="Contingencies" icon={<AlertCircle size={20} />}>
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
        </OfferSubSection>

        <OfferSubSection title="Closing Terms" icon={<Calendar size={18} />}>
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
        </OfferSubSection>

        {data.documents && data.documents.length > 0 ? (
          <OfferSubSection title="Documents" icon={<DocIcon />}>
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
          </OfferSubSection>
        ) : null}

        {data.notesToSeller ? (
          <OfferSubSection
            title="Notes to Seller"
            icon={<MessageSquareText color="#00214C" size={18} />}
          >
            <p className="rounded-lg bg-[#F2F4F6] text-[#594139] p-3  italic leading-relaxed">
              &ldquo;{data.notesToSeller}&rdquo;
            </p>
          </OfferSubSection>
        ) : null}
      </section>
    </div>
  );
}
