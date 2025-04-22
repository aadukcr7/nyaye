
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Printer, Download, FileText } from "lucide-react";

interface CaseViewerProps {
  caseData: {
    caseNumber: string;
    petitionerName: string;
    defendantName: string;
    filingDate: string;
    caseType: string;
    status: "pending" | "investigation" | "resolved" | "action";
    description: string;
    location: string;
    officer: string;
  };
  className?: string;
}

export function CaseViewer({ caseData, className }: CaseViewerProps) {
  const [activeTab, setActiveTab] = useState("details");

  const getStatusText = (status: string) => {
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
    return status;
  };

  return (
    <div className={`bg-white shadow rounded-xl overflow-hidden ${className}`}>
      <div className="border-b border-nepal-lightgray p-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-nepal-charcoal">
            Case #{caseData.caseNumber}
          </h2>
          <div className="mt-1 text-sm text-nepal-mediumgray">
            Filed on {caseData.filingDate} | {caseData.caseType}
          </div>
        </div>
        <div className={`status-badge ${caseData.status}`}>
          {getStatusText(caseData.status)}
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="details">Case Details</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-nepal-charcoal mb-4">Petitioner Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-nepal-lightgray pb-2">
                    <span className="text-nepal-mediumgray">Name</span>
                    <span className="font-medium">{caseData.petitionerName}</span>
                  </div>
                  <div className="flex justify-between border-b border-nepal-lightgray pb-2">
                    <span className="text-nepal-mediumgray">Contact</span>
                    <span className="font-medium">+977 9812345678</span>
                  </div>
                  <div className="flex justify-between border-b border-nepal-lightgray pb-2">
                    <span className="text-nepal-mediumgray">Address</span>
                    <span className="font-medium">Kathmandu-05, Babarmahal</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-nepal-mediumgray">ID Number</span>
                    <span className="font-medium">123-456-7890</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-nepal-charcoal mb-4">Defendant Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-nepal-lightgray pb-2">
                    <span className="text-nepal-mediumgray">Name</span>
                    <span className="font-medium">{caseData.defendantName}</span>
                  </div>
                  <div className="flex justify-between border-b border-nepal-lightgray pb-2">
                    <span className="text-nepal-mediumgray">Contact</span>
                    <span className="font-medium">Unknown</span>
                  </div>
                  <div className="flex justify-between border-b border-nepal-lightgray pb-2">
                    <span className="text-nepal-mediumgray">Address</span>
                    <span className="font-medium">Lalitpur-03, Patan</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-nepal-mediumgray">Relationship</span>
                    <span className="font-medium">Neighbor</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-nepal-charcoal mb-2">Case Description</h3>
              <p className="text-sm bg-nepal-lightbg p-4 rounded-lg">
                {caseData.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-sm">
              <div>
                <span className="block text-nepal-mediumgray mb-1">Incident Location</span>
                <span className="font-medium">{caseData.location}</span>
              </div>
              <div>
                <span className="block text-nepal-mediumgray mb-1">Handling Officer</span>
                <span className="font-medium">{caseData.officer}</span>
              </div>
              <div>
                <span className="block text-nepal-mediumgray mb-1">Priority Level</span>
                <span className="bg-status-pending/20 text-status-pending px-2 py-1 rounded-full text-xs">Medium</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeline">
            <div className="space-y-6">
              <div className="relative pl-8 pb-6 border-l-2 border-nepal-lightgray">
                <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-status-resolved"></div>
                <div className="font-medium mb-1">Case Registered</div>
                <div className="text-sm text-nepal-mediumgray mb-2">April 15, 2023 - 09:30 AM</div>
                <p className="text-sm">Initial petition received and registered in the system.</p>
              </div>
              
              <div className="relative pl-8 pb-6 border-l-2 border-nepal-lightgray">
                <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-status-investigation"></div>
                <div className="font-medium mb-1">Investigation Started</div>
                <div className="text-sm text-nepal-mediumgray mb-2">April 17, 2023 - 11:15 AM</div>
                <p className="text-sm">Officer Ramesh Kumar assigned to investigate the case.</p>
              </div>
              
              <div className="relative pl-8 pb-6 border-l-2 border-nepal-lightgray">
                <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-status-investigation"></div>
                <div className="font-medium mb-1">Witness Statement</div>
                <div className="text-sm text-nepal-mediumgray mb-2">April 20, 2023 - 02:45 PM</div>
                <p className="text-sm">Witness statements collected from 3 individuals present at the scene.</p>
              </div>
              
              <div className="relative pl-8">
                <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-status-pending"></div>
                <div className="font-medium mb-1">Awaiting Additional Evidence</div>
                <div className="text-sm text-nepal-mediumgray mb-2">April 25, 2023 - 04:10 PM</div>
                <p className="text-sm">Additional documentation requested from the complainant.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 flex items-center">
                <div className="bg-nepal-lightgray p-2 rounded-lg mr-4">
                  <FileText className="h-6 w-6 text-nepal-charcoal" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">Initial_Complaint.pdf</div>
                  <div className="text-xs text-nepal-mediumgray">Added Apr 15, 2023</div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="border rounded-lg p-4 flex items-center">
                <div className="bg-nepal-lightgray p-2 rounded-lg mr-4">
                  <FileText className="h-6 w-6 text-nepal-charcoal" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">Witness_Statement_1.pdf</div>
                  <div className="text-xs text-nepal-mediumgray">Added Apr 20, 2023</div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="border rounded-lg p-4 flex items-center">
                <div className="bg-nepal-lightgray p-2 rounded-lg mr-4">
                  <FileText className="h-6 w-6 text-nepal-charcoal" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">Evidence_Photos.zip</div>
                  <div className="text-xs text-nepal-mediumgray">Added Apr 18, 2023</div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="border rounded-lg p-4 flex items-center">
                <div className="bg-nepal-lightgray p-2 rounded-lg mr-4">
                  <FileText className="h-6 w-6 text-nepal-charcoal" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">Investigation_Report.pdf</div>
                  <div className="text-xs text-nepal-mediumgray">Added Apr 22, 2023</div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Button variant="outline" className="mt-6 gap-2">
              <Download className="h-4 w-4" />
              Download All Documents
            </Button>
          </TabsContent>
          
          <TabsContent value="actions">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-5">
                <h3 className="font-medium mb-4">Update Case Status</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">Change to Under Investigation</Button>
                  <Button variant="outline" className="w-full justify-start">Mark as Resolved</Button>
                  <Button variant="outline" className="w-full justify-start">Escalate for Legal Action</Button>
                  <Button variant="outline" className="w-full justify-start">Close Case</Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-5">
                <h3 className="font-medium mb-4">Case Reports</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Printer className="h-4 w-4" />
                    Print Case Summary
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Printer className="h-4 w-4" />
                    Print Full Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Printer className="h-4 w-4" />
                    Print Receipt
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
