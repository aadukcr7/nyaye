
import { FileText, Users, Clock, AlertCircle } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { CaseTable } from "@/components/dashboard/CaseTable";
import { CaseChart } from "@/components/dashboard/CaseChart";

export default function Dashboard() {
  // Sample data for demonstration
  const chartData = [
    { name: "Jan", pending: 12, investigation: 18, resolved: 5 },
    { name: "Feb", pending: 19, investigation: 14, resolved: 10 },
    { name: "Mar", pending: 15, investigation: 20, resolved: 8 },
    { name: "Apr", pending: 11, investigation: 15, resolved: 12 },
    { name: "May", pending: 18, investigation: 19, resolved: 15 },
    { name: "Jun", pending: 14, investigation: 22, resolved: 17 },
  ];

  const recentCases = [
    {
      id: "1",
      caseNumber: "2081-CR-001",
      petitionerName: "Ramesh Sharma",
      date: "2081-01-15",
      type: "Property Dispute",
      status: "pending" as const,
    },
    {
      id: "2",
      caseNumber: "2081-CR-002",
      petitionerName: "Sita Tamang",
      date: "2081-01-12",
      type: "Theft",
      status: "investigation" as const,
    },
    {
      id: "3",
      caseNumber: "2081-CR-003",
      petitionerName: "Mohan Thapa",
      date: "2081-01-10",
      type: "Assault",
      status: "resolved" as const,
    },
    {
      id: "4",
      caseNumber: "2081-CR-004",
      petitionerName: "Gita Khadka",
      date: "2081-01-08",
      type: "Fraud",
      status: "action" as const,
    },
    {
      id: "5",
      caseNumber: "2081-CR-005",
      petitionerName: "Prakash Giri",
      date: "2081-01-05",
      type: "Domestic Violence",
      status: "investigation" as const,
    },
  ];

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-nepal-charcoal">
          Dashboard
        </h1>
        <p className="text-sm text-nepal-mediumgray mt-1">
          Overview of petition management system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Cases"
          value={358}
          icon={<FileText className="h-6 w-6" />}
          change={{ value: 12, positive: true }}
        />
        <StatCard
          title="New Cases (Today)"
          value={24}
          icon={<AlertCircle className="h-6 w-6" />}
          change={{ value: 8, positive: true }}
        />
        <StatCard
          title="Resolved Cases"
          value={142}
          icon={<Users className="h-6 w-6" />}
          change={{ value: 5, positive: true }}
        />
        <StatCard
          title="Pending Review"
          value={83}
          icon={<Clock className="h-6 w-6" />}
          change={{ value: 3, positive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <CaseChart data={chartData} className="lg:col-span-2" />
        
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-lg font-semibold mb-4 text-nepal-charcoal">Case Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-nepal-charcoal">Property Disputes</span>
                <span className="text-sm font-medium text-nepal-charcoal">35%</span>
              </div>
              <div className="w-full bg-nepal-lightgray rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "35%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-nepal-charcoal">Theft</span>
                <span className="text-sm font-medium text-nepal-charcoal">25%</span>
              </div>
              <div className="w-full bg-nepal-lightgray rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-nepal-charcoal">Assault</span>
                <span className="text-sm font-medium text-nepal-charcoal">20%</span>
              </div>
              <div className="w-full bg-nepal-lightgray rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "20%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-nepal-charcoal">Fraud</span>
                <span className="text-sm font-medium text-nepal-charcoal">12%</span>
              </div>
              <div className="w-full bg-nepal-lightgray rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "12%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-nepal-charcoal">Others</span>
                <span className="text-sm font-medium text-nepal-charcoal">8%</span>
              </div>
              <div className="w-full bg-nepal-lightgray rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "8%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CaseTable cases={recentCases} />
    </AppLayout>
  );
}
