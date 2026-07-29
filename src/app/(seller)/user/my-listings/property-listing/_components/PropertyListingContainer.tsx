"use client";
import { PropertyListingForm } from './PropertyListingForm';

export default function PropertyListingContainer() {
  return (
    <div>
       <PropertyListingForm
        onSubmit={async (values) => {
          console.log(values);
          // call your API here
        }}
      />
    </div>
  )
}
