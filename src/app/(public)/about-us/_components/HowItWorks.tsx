import Container from "@/components/shared/container/Container";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "List Property",
      description:
        "Sellers list their property with professional photos, detailed documentation, and direct pricing expectations.",
    },
    {
      number: 2,
      title: "Submit Offers",
      description:
        "Buyers browse, search with precision filters, and submit binding offers directly to sellers on our secure platform.",
    },
    {
      number: 3,
      title: "Close Externally",
      description:
        "Deals close externally via a trusted title company — we maintain neutrality and never touch the transaction funds.",
    },
  ];

  return (
    <section className="w-full bg-primary-color py-12 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8">
      <Container className="">
        {/* Header */}
        <div className="mb-10 text-center sm:mb-12 lg:mb-16">
          <h2 className="text-[28px] font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How it works
          </h2>
          <p className="mt-4 text-base text-[#E0E3E5B2]/70 max-w-2xl mx-auto leading-relaxed sm:mt-6 sm:text-lg">
            A streamlined three-step process designed for the modern investor
            and property owner.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Container for steps and connecting lines */}
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            {/* Connecting lines container — only shown at lg+ where the layout is horizontal */}
            <div className="hidden lg:flex absolute top-12 left-0 right-0 items-center justify-between pointer-events-none">
              {/* Left connecting line */}
              <div className="absolute left-[16.67%] right-[50%] h-px bg-linear-to-r from-slate-700 to-slate-600 top-1/2 transform -translate-y-1/2"></div>
              {/* Right connecting line */}
              <div className="absolute left-[50%] right-[16.67%] h-px bg-linear-to-r from-slate-600 to-slate-700 top-1/2 transform -translate-y-1/2"></div>
            </div>

            {/* Step items */}
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center w-full max-w-xs lg:max-w-none"
              >
                {/* Circle with number */}
                <div className="relative z-10 mb-4 flex items-center justify-center sm:mb-8 lg:mb-12">
                  <div className="size-16 rounded-full border-2 border-slate-700 bg-[#F7F9FB1A] backdrop-blur-sm flex items-center justify-center shrink-0 sm:size-20 lg:size-24">
                    <span className="text-2xl font-bold text-cyan-400 sm:text-3xl lg:text-4xl">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Step content */}
                <div className="text-center mt-2">
                  <h3 className="text-xl font-semibold text-white mb-3 sm:text-2xl sm:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
