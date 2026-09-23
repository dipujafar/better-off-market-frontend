import ProfileEditForm from "./_components/ProfileForm";

export const metadata = {
  title: "Profile",
  description: "Manage your own profile and update your information.",
};

export default function EditProfilePage() {
  return (
    <>
      <ProfileEditForm />
    </>
  );
}
