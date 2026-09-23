import SavePropertyContainer from "@/app/(private)/save-properties/_components/SavePropertyContainer";

export const metadata = {
  title: "Saved Properties",
  description: "Manage your properties and track their performance.",
};

export default function SavedProperties() {
  return (
    <>
      <SavePropertyContainer />
    </>
  );
}
