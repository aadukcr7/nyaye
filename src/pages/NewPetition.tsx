
import { AppLayout } from "@/components/layout/AppLayout";
import { PetitionForm } from "@/components/petitions/PetitionForm";

export default function NewPetition() {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-nepal-charcoal">
          New Petition
        </h1>
        <p className="text-sm text-nepal-mediumgray mt-1">
          Register a new petition or complaint case
        </p>
      </div>

      <PetitionForm />
    </AppLayout>
  );
}
