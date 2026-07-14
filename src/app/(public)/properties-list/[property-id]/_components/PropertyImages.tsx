import Image from "next/image";


export default function PropertyImages() {
  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-4">
      <div className="col-span-2 row-span-2">
        <Image src="/properties/property_details_image_1.png" alt="Property 1" width={1200} height={1200} />
      </div>
      <div className="col-start-3">
        <Image src="/properties/property_details_image_2.png" alt="Property 1" width={1200} height={1200} />
      </div>
      <div className="col-start-4">
         <Image src="/properties/property_details_image_3.png" alt="Property 1" width={1200} height={1200} />
      </div>
      <div className="col-start-3 row-start-2">
         <Image src="/properties/property_details_image_4.png" alt="Property 1" width={1200} height={1200} />
      </div>
      <div className="col-start-4 row-start-2">
         <Image src="/properties/property_details_image_5.png" alt="Property 1" width={1200} height={1200} />
      </div>
    </div>
  );
}
