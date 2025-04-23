import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Plus, Search, FilterX, Download, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface Case {
  id: string;
  caseNumber: string;
  petitionerName: string;
  defendantName: string;
  date: string;
  type: string;
  status: "pending" | "investigation" | "resolved" | "action";
  location: string;
}

export default function Petitions() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample data for demonstration
  const allCases: Case[] = [
    {
      id: "1",
      caseNumber: "2081-CR-001",
      petitionerName: "Ramesh Sharma",
      defendantName: "Hari Bahadur",
      date: "2081-01-15",
      type: "Property Dispute",
      status: "pending",
      location: "Babarmahal, Kathmandu"
    },
    {
      id: "2",
      caseNumber: "2081-CR-002",
      petitionerName: "Sita Tamang",
      defendantName: "Krishna Prasad",
      date: "2081-01-12",
      type: "Theft",
      status: "investigation",
      location: "Baneshwor, Kathmandu"
    },
    {
      id: "3",
      caseNumber: "2081-CR-003",
      petitionerName: "Mohan Thapa",
      defendantName: "Gopal Shrestha",
      date: "2081-01-10",
      type: "Assault",
      status: "resolved",
      location: "Pulchowk, Lalitpur"
    },
    {
      id: "4",
      caseNumber: "2081-CR-004",
      petitionerName: "Gita Khadka",
      defendantName: "Samir Karki",
      date: "2081-01-08",
      type: "Fraud",
      status: "action",
      location: "Thamel, Kathmandu"
    },
    {
      id: "5",
      caseNumber: "2081-CR-005",
      petitionerName: "Prakash Giri",
      defendantName: "Nirmala Giri",
      date: "2081-01-05",
      type: "Domestic Violence",
      status: "investigation",
      location: "Jorpati, Kathmandu"
    },
    {
      id: "6",
      caseNumber: "2081-CR-006",
      petitionerName: "Anita Rai",
      defendantName: "Suresh Rai",
      date: "2081-01-03",
      type: "Property Dispute",
      status: "pending",
      location: "Bhaktapur"
    },
    {
      id: "7",
      caseNumber: "2081-CR-007",
      petitionerName: "Rajendra Malla",
      defendantName: "Bijay Karki",
      date: "2080-12-29",
      type: "Theft",
      status: "pending",
      location: "Patan, Lalitpur"
    },
    {
      id: "8",
      caseNumber: "2081-CR-008",
      petitionerName: "Sunita Gurung",
      defendantName: "Anil Thapa",
      date: "2080-12-25",
      type: "Assault",
      status: "resolved",
      location: "Dillibazar, Kathmandu"
    },
    {
      id: "9",
      caseNumber: "2081-CR-009",
      petitionerName: "Binod Mahato",
      defendantName: "Dipak Mahato",
      date: "2080-12-20",
      type: "Property Dispute",
      status: "investigation",
      location: "Kalanki, Kathmandu"
    },
    {
      id: "10",
      caseNumber: "2081-CR-010",
      petitionerName: "Kamala Shrestha",
      defendantName: "Raju Maharjan",
      date: "2080-12-18",
      type: "Fraud",
      status: "action",
      location: "Tokha, Kathmandu"
    },
    {
      id: "11",
      caseNumber: "2081-CR-011",
      petitionerName: "Deepak Tamang",
      defendantName: "Santosh Lama",
      date: "2080-12-15",
      type: "Theft",
      status: "pending",
      location: "Chabahil, Kathmandu"
    },
    {
      id: "12",
      caseNumber: "2081-CR-012",
      petitionerName: "Sabina Khatri",
      defendantName: "Nabin Singh",
      date: "2080-12-10",
      type: "Domestic Violence",
      status: "investigation",
      location: "Kalimati, Kathmandu"
    },
  ];

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

  // Apply filters
  const filteredCases = allCases.filter(caseItem => {
    const matchesSearch = searchText === "" || 
      caseItem.caseNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      caseItem.petitionerName.toLowerCase().includes(searchText.toLowerCase()) ||
      caseItem.defendantName.toLowerCase().includes(searchText.toLowerCase()) ||
      caseItem.location.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === "" || caseItem.status === statusFilter;
    const matchesType = typeFilter === "" || caseItem.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCases = filteredCases.slice(startIndex, startIndex + itemsPerPage);

  // Get unique case types for the filter
  const caseTypes = Array.from(new Set(allCases.map(caseItem => caseItem.type)));

  const clearFilters = () => {
    setSearchText("");
    setStatusFilter("");
    setTypeFilter("");
    setCurrentPage(1);
  };

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-nepal-charcoal">
            Petitions
          </h1>
          <p className="text-sm text-nepal-mediumgray mt-1">
            View and manage all registered petitions
          </p>
        </div>
        
        <Button asChild className="sm:self-end">
          <Link to="/new-petition">
            <Plus className="mr-2 h-4 w-4" /> New Petition
          </Link>
        </Button>
      </div>

      <div className="bg-white shadow rounded-xl overflow-hidden mb-6">
        <div className="p-5 border-b border-nepal-lightgray">
          <h3 className="text-lg font-semibold text-nepal-charcoal">Filters</h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-nepal-mediumgray" />
              <Input
                placeholder="Search by case #, name, or location"
                className="pl-8"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigation">Under Investigation</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="action">Legal Action Taken</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by case type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {caseTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              className="gap-2" 
              onClick={clearFilters}
            >
              <FilterX className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl overflow-hidden mb-6">
        <div className="p-5 border-b border-nepal-lightgray flex justify-between items-center">
          <h3 className="text-lg font-semibold text-nepal-charcoal">All Petitions</h3>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case #</TableHead>
                <TableHead>Petitioner</TableHead>
                <TableHead>Defendant</TableHead>
                <TableHead>Date Filed</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCases.length > 0 ? (
                paginatedCases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-medium">{caseItem.caseNumber}</TableCell>
                    <TableCell>{caseItem.petitionerName}</TableCell>
                    <TableCell>{caseItem.defendantName}</TableCell>
                    <TableCell>{caseItem.date}</TableCell>
                    <TableCell>{caseItem.type}</TableCell>
                    <TableCell>{caseItem.location}</TableCell>
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-nepal-mediumgray">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>No petitions found matching your filters</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="p-5 border-t border-nepal-lightgray">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </AppLayout>
  );
}