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
    <section className="w-full bg-primary-color py-20 px-4 sm:px-6 lg:px-8">
      <Container className="">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-[32px] font-semibold tracking-tight text-white sm:text-5xl">
            How it works
          </h2>
          <p className="mt-6 text-lg text-[#E0E3E5B2]/70 max-w-2xl mx-auto leading-relaxed">
            A streamlined three-step process designed for the modern investor and property owner.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Container for steps and connecting lines */}
          <div className="flex items-start justify-between gap-4 sm:gap-8">
            {/* Connecting lines container */}
            <div className="absolute top-24 left-0 right-0 flex items-center justify-between pointer-events-none">
              {/* Left connecting line */}
              <div className="absolute left-[16.67%] right-[50%] h-px bg-linear-to-r from-slate-700 to-slate-600 top-1/2 transform -translate-y-1/2"></div>
              {/* Right connecting line */}
              <div className="absolute left-[50%] right-[16.67%] h-px bg-linear-to-r from-slate-600 to-slate-700 top-1/2 transform -translate-y-1/2"></div>
            </div>

            {/* Step items */}
            {steps.map((step, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                {/* Circle with number */}
                <div className="relative z-10 mb-12 flex items-center justify-center">
                  <div className="size-24 rounded-full border-2 border-slate-700 bg-[#F7F9FB1A] backdrop-blur-sm flex items-center justify-center shrink-0">
                    <span className="text-4xl font-bold text-cyan-400">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Step content */}
                <div className="text-center mt-2">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
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
