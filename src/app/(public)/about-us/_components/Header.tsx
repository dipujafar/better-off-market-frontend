import Container from "@/components/shared/container/Container";

export default function Header() {
  return (
    <Container className="flex flex-col lg:flex-row items-center justify-between gap-6">
      {/* content */}
      <div className="flex-1 md:space-y-4 space-y-3">
        <h6 className="text-sm text-primary-color font-semibold bg-[#D1E5FF] max-w-max px-4 py-1.5 rounded-full">DIRECT REAL ESTATE</h6>
        <h3>About PropMarket</h3>
      </div>
      {/* image */}
      <div className="flex-1"></div>
    </Container>
  );
}
