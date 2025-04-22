import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
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
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Search as SearchIcon, FileText, Calendar, User, MapPin, Filter, Home } from "lucide-react";

interface SearchResult {
  id: string;
  type: "case" | "person" | "document";
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
  link: string;
  relevance: number;
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "cases" | "people" | "documents">("all");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Sample search results for demonstration
  const sampleResults: SearchResult[] = [
    {
      id: "1",
      type: "case",
      title: "Case #2081-CR-001",
      description: "Property dispute between Ramesh Sharma and Hari Bahadur at Babarmahal, Kathmandu",
      date: "2081-01-15",
      icon: <FileText className="h-5 w-5" />,
      link: "/case/1",
      relevance: 95
    },
    {
      id: "2",
      type: "person",
      title: "Ramesh Sharma",
      description: "Petitioner - ID: 12-34-56789, Contact: +977 9812345678",
      date: "2081-01-15",
      icon: <User className="h-5 w-5" />,
      link: "/people?id=1",
      relevance: 90
    },
    {
      id: "3",
      type: "case",
      title: "Case #2081-CR-007",
      description: "Theft case filed by Rajendra Malla against Bijay Karki at Patan, Lalitpur",
      date: "2080-12-29",
      icon: <FileText className="h-5 w-5" />,
      link: "/case/7",
      relevance: 85
    },
    {
      id: "4",
      type: "document",
      title: "Initial_Complaint.pdf",
      description: "Related to Case #2081-CR-001 - Filed on 2081-01-15",
      date: "2081-01-15",
      icon: <FileText className="h-5 w-5" />,
      link: "/case/1?tab=documents",
      relevance: 80
    },
    {
      id: "5",
      type: "person",
      title: "Hari Bahadur",
      description: "Defendant - Address: Lalitpur-03, Patan",
      date: "2081-01-15",
      icon: <User className="h-5 w-5" />,
      link: "/people?id=3",
      relevance: 75
    },
    {
      id: "6",
      type: "case",
      title: "Case #2080-CR-112",
      description: "Property measurement dispute in Babarmahal area filed by Krishna Shrestha",
      date: "2080-11-05",
      icon: <FileText className="h-5 w-5" />,
      link: "/case/20",
      relevance: 70
    },
    {
      id: "7",
      type: "document",
      title: "Land_Survey_Report_Babarmahal.pdf",
      description: "Survey report for the Babarmahal area land dispute",
      date: "2080-11-10",
      icon: <FileText className="h-5 w-5" />,
      link: "/case/20?tab=documents",
      relevance: 65
    },
    {
      id: "8",
      type: "case",
      title: "Case #2081-CR-005",
      description: "Domestic Violence case involving Prakash Giri and Nirmala Giri",
      date: "2081-01-05",
      icon: <FileText className="h-5 w-5" />,
      link: "/case/5",
      relevance: 60
    },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate an API call with timeout
    setTimeout(() => {
      // Filter results based on search query and active tab
      let results = sampleResults.filter(result => {
        const matchesQuery = 
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase());
          
        if (!matchesQuery) return false;
        
        if (activeTab === "all") return true;
        if (activeTab === "cases" && result.type === "case") return true;
        if (activeTab === "people" && result.type === "person") return true;
        if (activeTab === "documents" && result.type === "document") return true;
        
        return false;
      });
      
      setSearchResults(results);
      setIsLoading(false);
    }, 800);
  };

  // Get the badge style based on result type
  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "case": return "bg-status-investigation/20 text-status-investigation";
      case "person": return "bg-status-resolved/20 text-status-resolved";
      case "document": return "bg-status-pending/20 text-status-pending";
      default: return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <AppLayout>
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/"><Home className="h-4 w-4" /></Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/search">Search</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-nepal-charcoal">
          Advanced Search
        </h1>
        <p className="text-sm text-nepal-mediumgray mt-1">
          Search across cases, people, and documents
        </p>
      </div>

      <div className="bg-white shadow rounded-xl overflow-hidden mb-8">
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="cases">Cases</TabsTrigger>
              <TabsTrigger value="people">People</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-nepal-mediumgray" />
                <Input
                  placeholder="Search by case number, name, location or keyword..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Time Period</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="last-week">Last Week</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>Location</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="kathmandu">Kathmandu</SelectItem>
                    <SelectItem value="lalitpur">Lalitpur</SelectItem>
                    <SelectItem value="bhaktapur">Bhaktapur</SelectItem>
                  </SelectContent>
                </Select>

                <Button onClick={handleSearch}>
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  More Filters
                </Button>
              </div>

              {hasSearched && !isLoading && (
                <p className="text-sm text-nepal-mediumgray">
                  {searchResults.length} results found for "{searchQuery}"
                </p>
              )}
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-nepal-lightgray border-t-primary rounded-full animate-spin"></div>
                <p className="mt-4 text-nepal-mediumgray">Searching...</p>
              </div>
            ) : hasSearched ? (
              searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((result) => (
                    <div key={result.id} className="border rounded-lg p-4 hover:bg-nepal-lightbg transition-colors">
                      <div className="flex items-start">
                        <div className="bg-nepal-lightgray p-2 rounded-lg mr-4">
                          {result.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <Link to={result.link} className="font-medium text-primary hover:underline">
                              {result.title}
                            </Link>
                            <span className={`ml-3 px-2 py-1 rounded-full text-xs ${getTypeBadgeClass(result.type)}`}>
                              {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-nepal-charcoal mt-1">{result.description}</p>
                          <div className="flex items-center mt-2 text-xs text-nepal-mediumgray">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>{result.date}</span>
                            <span className="mx-2">•</span>
                            <span>Relevance: {result.relevance}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <FileText className="h-16 w-16 text-nepal-lightgray" />
                  <h3 className="mt-4 text-lg font-medium text-nepal-charcoal">No results found</h3>
                  <p className="mt-2 text-nepal-mediumgray text-center">
                    We couldn't find any matches for "{searchQuery}".<br />
                    Try using different keywords or broadening your search.
                  </p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <SearchIcon className="h-16 w-16 text-nepal-lightgray" />
                <h3 className="mt-4 text-lg font-medium text-nepal-charcoal">Start searching</h3>
                <p className="mt-2 text-nepal-mediumgray max-w-md">
                  Enter keywords to search across all cases, people, and documents in the system
                </p>
              </div>
            )}
          </Tabs>
        </div>
      </div>

      {hasSearched && searchResults.length > 0 && (
        <div className="bg-white shadow rounded-xl overflow-hidden mb-8">
          <div className="p-5 border-b border-nepal-lightgray">
            <h3 className="text-lg font-semibold text-nepal-charcoal">Related Cases</h3>
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
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults
                  .filter(result => result.type === "case")
                  .map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">{result.title.replace("Case #", "")}</TableCell>
                      <TableCell>
                        {result.title.includes("Ramesh") ? "Ramesh Sharma" : 
                         result.title.includes("Krishna") ? "Krishna Shrestha" : 
                         result.title.includes("Rajendra") ? "Rajendra Malla" : 
                         "Prakash Giri"}
                      </TableCell>
                      <TableCell>
                        {result.description.includes("Hari") ? "Hari Bahadur" : 
                         result.description.includes("Bijay") ? "Bijay Karki" : 
                         result.title.includes("2081-CR-005") ? "Nirmala Giri" : 
                         "Unknown Defendant"}
                      </TableCell>
                      <TableCell>{result.date}</TableCell>
                      <TableCell>
                        {result.description.includes("Property") ? "Property Dispute" :
                         result.description.includes("Theft") ? "Theft" :
                         result.description.includes("Domestic") ? "Domestic Violence" :
                         "Other"}
                      </TableCell>
                      <TableCell>
                        <div className="status-badge investigation">Under Investigation</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={result.link}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </AppLayout>
  );
}