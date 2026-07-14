'use client';
import { Button } from '@/components/ui/button';
import { MapPin, MessageSquare } from 'lucide-react';
import Image from 'next/image';

export interface PropertyCardProps {
  id: string;
  image: string;
  agent: string;
  property: string;
  location: string;
  status: 'PENDING' | 'SOLD' | 'REJECTED';
  price: number;
  originalPrice?: number;
  actionType: 'review' | 'message' | 'details';
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'text-blue-700 bg-blue-100';
    case 'SOLD':
      return 'bg-[#565E741A] text-[#565E74]';
    case 'REJECTED':
      return 'bg-[#BA1A1A1A] text-[#BA1A1A]';
    default:
      return 'bg-gray-400 text-white';
  }
};

const getButtonStyle = (status: string, actionType: string) => {
  if (status === 'PENDING' && actionType === 'review') {
    return 'bg-primary-color text-white hover:bg-slate-800';
  }
  return 'bg-white text-[#594139] border border-primary-border-color hover:bg-slate-50';
};

const getButtonText = (actionType: string) => {
  switch (actionType) {
    case 'review':
      return 'Review Offer';
    case 'message':
      return 'Message';
    case 'details':
      return 'Details';
    default:
      return 'Action';
  }
};

export default function OfferedCard({
  image,
  agent,
  property,
  location,
  status,
  price,
  originalPrice,
  actionType,
}: PropertyCardProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border border-primary-border-color rounded-lg bg-white hover:shadow-md transition-shadow">
      {/* Property Image */}
      <div className="shrink-0 w-full sm:w-36 h-20">
        <Image
          width={1200}
          height={1200}
          src={image}
          alt={property}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Property Information */}
      <div className="grow min-w-0">
        <h3 className="text-sm font-semibold text-primary-black">
          {agent} on {property}
        </h3>

        <div className="flex items-center gap-1 mt-1 mb-3 text-primary-gray text-xs font-semibold">
          <MapPin className="w-4 h-4" />
          <span className="text-sm ">{location}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>

          <span className="text-sm font-bold text-primary-color">
            ${price.toLocaleString()}
          </span>

          {originalPrice && originalPrice > price && (
            <span className="text-xs text-primary-gray font-semibold">
              vs ${originalPrice.toLocaleString()} listed
            </span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center shrink-0 w-full sm:w-auto">
        <Button
          className={`w-full sm:w-auto px-6 rounded-lg font-semibold text-sm transition-colors cursor-pointer py-4.5 ${getButtonStyle(
            status,
            actionType
          )}`}
          variant={
            status === 'PENDING' && actionType === 'review'
              ? 'default'
              : 'outline'
          }
        >
          {actionType === 'message' && (
            <MessageSquare color='#594139' className="w-4 h-4 mr-2" />
          )}
          {getButtonText(actionType)}
        </Button>
      </div>
    </div>
  );
}
