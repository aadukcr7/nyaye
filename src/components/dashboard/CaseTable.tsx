
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface Case {
  id: string;
  caseNumber: string;
  petitionerName: string;
  date: string;
  type: string;
  status: "pending" | "investigation" | "resolved" | "action";
}

interface CaseTableProps {
  cases: Case[];
  className?: string;
}

export function CaseTable({ cases, className }: CaseTableProps) {
  const getStatusText = (status: Case["status"]) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "investigation":
        return "Under Investigation";
      case "resolved":
        return "Resolved";
      case "action":
        return "Legal Action Taken";
    }
  };

  return (
    <div className={cn("bg-white shadow rounded-xl overflow-hidden", className)}>
      <div className="p-5 border-b border-nepal-lightgray">
        <h3 className="text-lg font-semibold text-nepal-charcoal">Recent Cases</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case #</TableHead>
              <TableHead>Petitioner</TableHead>
              <TableHead>Date Filed</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseItem) => (
              <TableRow key={caseItem.id}>
                <TableCell className="font-medium">{caseItem.caseNumber}</TableCell>
                <TableCell>{caseItem.petitionerName}</TableCell>
                <TableCell>{caseItem.date}</TableCell>
                <TableCell>{caseItem.type}</TableCell>
                <TableCell>
                  <div className={`status-badge ${caseItem.status}`}>
                    {getStatusText(caseItem.status)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/case/${caseItem.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
