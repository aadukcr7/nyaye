
import { AppLayout } from "@/components/layout/AppLayout";
import { CaseViewer } from "@/components/petitions/CaseViewer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function CaseDetail() {
  // Sample case data for demonstration
  const caseData = {
    caseNumber: "2081-CR-001",
    petitionerName: "Ramesh Sharma",
    defendantName: "Hari Bahadur",
    filingDate: "2081-01-15",
    caseType: "Property Dispute",
    status: "investigation" as const,
    description: "The complainant alleges that the defendant has illegally occupied part of their land by moving the boundary wall approximately 2 meters into the complainant's property. The disputed area is located in the eastern section of the property at Babarmahal, Kathmandu. The complainant has provided land ownership documents and recent survey records as evidence.",
    location: "Babarmahal, Kathmandu",
    officer: "Inspector Rajesh Khatri"
  };

  return (
    <AppLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-1 mb-2">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-nepal-charcoal">
            Case Details
          </h1>
          <p className="text-sm text-nepal-mediumgray mt-1">
            View and manage case information
          </p>
        </div>
      </div>

      <CaseViewer caseData={caseData} />
    </AppLayout>
  );
}
