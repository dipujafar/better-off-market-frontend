import Link from "next/link";

export default function AuthenticationRequired() {
  return (
    <div className="border-l-4 border-primary-color bg-[#F2F4F6] rounded-md p-4 space-y-1 w-full">
      <p className="text-sm font-medium text-primary-gray">
        You need a free account to submit offers or message sellers.{" "}
        <Link
          href="/sign-up"
          className="text-[#1F4E8B] hover:underline font-semibold"
        >
          Sign up free
        </Link>{" "}
        or{" "}
        <Link
          href="/login"
          className="text-[#1F4E8B] hover:underline font-semibold"
        >
          log in
        </Link>
      </p>
    </div>
  );
}
