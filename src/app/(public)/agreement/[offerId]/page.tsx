import Navbar from "@/components/shared/navbar/Navbar";
import AgreementContainer from "./_components/AgreementContainer";
import Container from "@/components/shared/container/Container";

export default function AgreementPage() {
  return (
    <>
      <Navbar className="pt-10" />
      <Container className="mt-10">
        <AgreementContainer />
      </Container>
    </>
  );
}
