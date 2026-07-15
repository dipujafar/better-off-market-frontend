import { Building2, Wrench } from 'lucide-react';

interface SpecItem {
  label: string;
  value: string | number;
}

interface PropertyInfoProps {
  specifications?: SpecItem[];
  components?: SpecItem[];
}

export function PropertyInfo({
  specifications = [
    { label: 'Lot Size', value: '0.25 Acres' },
    { label: 'Year Built', value: '1995' },
    { label: 'Garage Spaces', value: '2' },
    { label: 'Parking', value: 'Driveway' },
  ],
  components = [
    { label: 'Roof', value: 'Shingle / 5 years' },
    { label: 'Heating', value: 'Gas / 8 years' },
    { label: 'Cooling', value: 'Central AC / 4 years' },
    { label: 'Sewer', value: 'Public Sewer' },
  ],
}: PropertyInfoProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Specifications Card */}
      <div className="rounded-lg bg-gray-100 p-6">
        <div className="mb-6 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Specifications</h2>
        </div>
        <div className="space-y-4">
          {specifications.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Major Components Card */}
      <div className="rounded-lg bg-gray-100 p-6">
        <div className="mb-6 flex items-center gap-2">
          <Wrench className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Major Components</h2>
        </div>
        <div className="space-y-4">
          {components.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
