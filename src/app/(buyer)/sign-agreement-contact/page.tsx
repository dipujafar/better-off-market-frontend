import React from "react";
import { AuthorizedSignersForm } from "./_components/AuthorizedSignersForm";
import Navbar from "@/components/shared/navbar/Navbar";
import Container from "@/components/shared/container/Container";

export const metadata = {
  title: "Sign Agreement",
  description: "Sign the agreement for the accepted offer.",
};

export default function SignAgreementPage() {
  return (
    <div>
      <Navbar className="pt-10" />
      <Container>
        <div className="flex flex-col justify-center items-center mt-10 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M17.2 29.2L31.3 15.1L28.5 12.3L17.2 23.6L11.5 17.9L8.7 20.7L17.2 29.2ZM20 40C17.2333 40 14.6333 39.475 12.2 38.425C9.76667 37.375 7.65 35.95 5.85 34.15C4.05 32.35 2.625 30.2333 1.575 27.8C0.525 25.3667 0 22.7667 0 20C0 17.2333 0.525 14.6333 1.575 12.2C2.625 9.76667 4.05 7.65 5.85 5.85C7.65 4.05 9.76667 2.625 12.2 1.575C14.6333 0.525 17.2333 0 20 0C22.7667 0 25.3667 0.525 27.8 1.575C30.2333 2.625 32.35 4.05 34.15 5.85C35.95 7.65 37.375 9.76667 38.425 12.2C39.475 14.6333 40 17.2333 40 20C40 22.7667 39.475 25.3667 38.425 27.8C37.375 30.2333 35.95 32.35 34.15 34.15C32.35 35.95 30.2333 37.375 27.8 38.425C25.3667 39.475 22.7667 40 20 40Z"
              fill="#00214C"
            />
          </svg>

          <div className="text-center space-y-1">
            <h3 className="text-3xl font-bold text-primary-black">
              Congratulations!
            </h3>
            <p className="text-[#505F76] text-lg">
              The offer has been accepted.
            </p>
          </div>
        </div>

        <AuthorizedSignersForm />
      </Container>
    </div>
  );
}
