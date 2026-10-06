"use client";
import Container from "@/components/shared/container/Container";
import ContentWrapper from "@/components/shared/content/ContentWrapper";
import TermsContentSkeleton from "@/components/skeleton/TermsContentSkeleton";
import { useGetContentQuery } from "@/redux/api/contentApi";

export default function TermContainer() {
  const { data, isLoading } = useGetContentQuery(undefined);

  if (isLoading)
    return (
      <Container>
        <TermsContentSkeleton />
      </Container>
    );
  return (
    <Container>
      <ContentWrapper content={data?.data?.data?.[0]?.termsAndConditions} />
    </Container>
  );
}
