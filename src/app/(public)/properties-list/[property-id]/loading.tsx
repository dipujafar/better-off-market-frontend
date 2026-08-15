import Container from '@/components/shared/container/Container'

export default function loading() {
  return (
     <Container className="animate-pulse">
      {/* Navbar */}
      <div className="h-16 w-full bg-gray-200 rounded-md  mt-8 mb-10" />
      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 rounded-xl overflow-hidden">
        {/* Main large image */}
        <div className="md:col-span-2 relative">
          <div className="w-full h-70 md:h-130 bg-gray-200 rounded-xl md:rounded-r-none" />
          <div className="absolute top-4 left-4 h-6 w-14 bg-gray-300 rounded-full" />
        </div>
        {/* Right 2x2 grid */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-2">
          <div className="relative h-33.75 md:h-63.75 bg-gray-200">
            <div className="absolute top-3 right-3 h-8 w-8 bg-gray-300 rounded-md" />
          </div>
          <div className="h-33.75 md:h-63.75 bg-gray-200" />
          <div className="h-33.75 md:h-63.75 bg-gray-200" />
          <div className="h-33.75 md:h-63.75 bg-gray-200" />
        </div>
      </div>

      {/* Main content + sidebar */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Address + status */}
          <div className="border border-gray-100 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="h-5 w-64 bg-gray-200 rounded" />
              <div className="h-6 w-24 bg-gray-200 rounded-full" />
            </div>

            {/* Price box */}
            <div className="border border-gray-100 rounded-lg p-4 mb-4">
              <div className="h-7 w-48 bg-gray-200 rounded mb-2" />
              <div className="h-6 w-40 bg-gray-200 rounded-full" />
            </div>

            {/* Beds/Baths/Sqft/Year row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-6 w-6 bg-gray-200 rounded" />
                  <div className="space-y-1.5">
                    <div className="h-4 w-14 bg-gray-200 rounded" />
                    <div className="h-3 w-16 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About this property */}
          <div className="border border-gray-100 rounded-xl p-5">
            <div className="h-5 w-44 bg-gray-200 rounded mb-4" />
            <div className="space-y-2.5">
              <div className="h-3.5 w-full bg-gray-100 rounded" />
              <div className="h-3.5 w-full bg-gray-100 rounded" />
              <div className="h-3.5 w-11/12 bg-gray-100 rounded" />
              <div className="h-3.5 w-4/5 bg-gray-100 rounded" />
            </div>
          </div>

          {/* Property Specifications + Major Components */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[0, 1].map((i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 space-y-4">
                <div className="h-4 w-40 bg-gray-200 rounded" />
                {Array.from({ length: 3 }).map((__, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <div className="h-3.5 w-20 bg-gray-200 rounded" />
                    <div className="h-3.5 w-16 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* HOA Details + Closing Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[0, 1].map((i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 space-y-4">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                {Array.from({ length: 2 }).map((__, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <div className="h-3.5 w-24 bg-gray-200 rounded" />
                    <div className="h-3.5 w-20 bg-gray-200 rounded" />
                  </div>
                ))}
                <div className="h-3 w-full bg-gray-100 rounded" />
              </div>
            ))}
          </div>

          {/* Documents */}
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="h-4 w-28 bg-gray-200 rounded mb-4" />
            <div className="h-10 w-full bg-gray-100 rounded" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Interested in this property */}
          <div className="border border-gray-100 rounded-xl p-5 space-y-3">
            <div className="h-5 w-52 bg-gray-200 rounded mb-2" />
            <div className="h-11 w-full bg-gray-300 rounded-md" />
            <div className="h-11 w-full bg-gray-200 rounded-md" />
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="h-10 bg-gray-100 rounded-md" />
              <div className="h-10 bg-gray-100 rounded-md" />
            </div>
            <div className="h-3 w-40 bg-gray-100 rounded mx-auto" />
          </div>

          {/* Free account notice */}
          <div className="h-14 w-full bg-gray-100 rounded-md" />

          {/* Open House */}
          <div className="border border-gray-100 rounded-xl p-5 space-y-4">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="bg-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <div className="h-3.5 w-10 bg-gray-300 rounded" />
                <div className="h-3.5 w-16 bg-gray-300 rounded" />
              </div>
              <div className="flex justify-between">
                <div className="h-3.5 w-10 bg-gray-300 rounded" />
                <div className="h-3.5 w-20 bg-gray-300 rounded" />
              </div>
              <div className="h-10 w-full bg-gray-300 rounded-md mt-2" />
            </div>
          </div>

          {/* Agent card */}
          <div className="border border-gray-100 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-11 w-11 rounded-full bg-gray-200 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-28 bg-gray-200 rounded" />
                <div className="h-3 w-36 bg-gray-100 rounded" />
                <div className="h-3 w-16 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="h-3 w-24 bg-gray-100 rounded" />
              <div className="h-3 w-16 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
