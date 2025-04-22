import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  UserPlus,
  FilterX,
  ChevronRight,
  Download,
  Phone,
  Mail,
  MapPin,
  FileText,
  Calendar,
  AlertCircle,
  User,
  ArrowUpDown,
} from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";

interface Person {
  id: string;
  name: string;
  nepaliName?: string;
  type: "complainant" | "defendant" | "witness" | "lawyer";
  gender: "male" | "female" | "other";
  age?: number;
  address: string;
  district: string;
  contact?: string;
  email?: string;
  idNumber?: string;
  idType?: string;
  relatedCases: number;
  occupation?: string;
  photo?: string;
  lastActivity: string;
}

export default function People() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNewPersonDialogOpen, setIsNewPersonDialogOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const itemsPerPage = 10;

  // Sample people data
  const people: Person[] = [
    {
      id: "1",
      name: "Ramesh Sharma",
      nepaliName: "रमेश शर्मा",
      type: "complainant",
      gender: "male",
      age: 42,
      address: "Babarmahal, Kathmandu",
      district: "Kathmandu",
      contact: "+977 9812345678",
      email: "ramesh.sharma@example.com",
      idNumber: "123-456-7890",
      idType: "Citizenship",
      relatedCases: 2,
      occupation: "Business Owner",
      photo: "",
      lastActivity: "2081-01-15"
    },
    {
      id: "2",
      name: "Sita Tamang",
      nepaliName: "सीता तामाङ",
      type: "complainant",
      gender: "female",
      age: 35,
      address: "Baneshwor, Kathmandu",
      district: "Kathmandu",
      contact: "+977 9854321098",
      email: "sita.tamang@example.com",
      idNumber: "234-567-8901",
      idType: "Citizenship",
      relatedCases: 1,
      occupation: "Teacher",
      photo: "",
      lastActivity: "2081-01-12"
    },
    {
      id: "3",
      name: "Hari Bahadur",
      nepaliName: "हरि बहादुर",
      type: "defendant",
      gender: "male",
      age: 45,
      address: "Lalitpur-03, Patan",
      district: "Lalitpur",
      contact: "+977 9876543210",
      idNumber: "345-678-9012",
      idType: "Citizenship",
      relatedCases: 1,
      occupation: "Land Owner",
      photo: "",
      lastActivity: "2081-01-15"
    },
    {
      id: "4",
      name: "Krishna Prasad",
      nepaliName: "कृष्ण प्रसाद",
      type: "defendant",
      gender: "male",
      age: 38,
      address: "Chabahil, Kathmandu",
      district: "Kathmandu",
      contact: "+977 9807654321",
      email: "krishna.prasad@example.com",
      idNumber: "456-789-0123",
      idType: "Citizenship",
      relatedCases: 2,
      occupation: "Shopkeeper",
      photo: "",
      lastActivity: "2081-01-12"
    },
    {
      id: "5",
      name: "Sarita Gurung",
      nepaliName: "सरिता गुरुङ",
      type: "witness",
      gender: "female",
      age: 29,
      address: "Pulchowk, Lalitpur",
      district: "Lalitpur",
      contact: "+977 9812398765",
      email: "sarita.gurung@example.com",
      idNumber: "567-890-1234",
      idType: "Citizenship",
      relatedCases: 1,
      occupation: "Teacher",
      photo: "",
      lastActivity: "2081-01-10"
    },
    {
      id: "6",
      name: "Rajendra Malla",
      nepaliName: "राजेन्द्र मल्ल",
      type: "complainant",
      gender: "male",
      age: 52,
      address: "Patan, Lalitpur",
      district: "Lalitpur",
      contact: "+977 9834567890",
      email: "rajendra.malla@example.com",
      idNumber: "678-901-2345",
      idType: "Citizenship",
      relatedCases: 1,
      occupation: "Government Employee",
      photo: "",
      lastActivity: "2080-12-29"
    },
    {
      id: "7",
      name: "Binita Shrestha",
      nepaliName: "बिनिता श्रेष्ठ",
      type: "lawyer",
      gender: "female",
      age: 36,
      address: "Thamel, Kathmandu",
      district: "Kathmandu",
      contact: "+977 9845678901",
      email: "binita.shrestha@legalfirm.com",
      idNumber: "789-012-3456",
      idType: "Bar Association",
      relatedCases: 5,
      occupation: "Advocate",
      photo: "",
      lastActivity: "2081-01-18"
    },
    {
      id: "8",
      name: "Gopal Shrestha",
      nepaliName: "गोपाल श्रेष्ठ",
      type: "defendant",
      gender: "male",
      age: 40,
      address: "Jawalakhel, Lalitpur",
      district: "Lalitpur",
      contact: "+977 9876123450",
      email: "gopal.shrestha@example.com",
      idNumber: "890-123-4567",
      idType: "Citizenship",
      relatedCases: 1,
      occupation: "Business Owner",
      photo: "",
      lastActivity: "2081-01-10"
    },
    {
      id: "9",
      name: "Anita Rai",
      nepaliName: "अनिता राई",
      type: "complainant",
      gender: "female",
      age: 33,
      address: "Bhaktapur",
      district: "Bhaktapur",
      contact: "+977 9867012345",
      email: "anita.rai@example.com",
      idNumber: "901-234-5678",
      idType: "Citizenship",
      relatedCases: 1,
      occupation: "Housewife",
      photo: "",
      lastActivity: "2081-01-03"
    },
    {
      id: "10",
      name: "Sunil Maharjan",
      nepaliName: "सुनील महर्जन",
      type: "witness",
      gender: "male",
      age: 27,
      address: "Kirtipur, Kathmandu",
      district: "Kathmandu",
      contact: "+977 9890123456",
      email: "sunil.maharjan@example.com",
      idNumber: "012-345-6789",
      idType: "Citizenship",
      relatedCases: 2,
      occupation: "Driver",
      photo: "",
      lastActivity: "2080-12-25"
    },
    {
      id: "11",
      name: "Prakash Thapa",
      nepaliName: "प्रकाश थापा",
      type: "lawyer",
      gender: "male",
      age: 45,
      address: "Baluwatar, Kathmandu",
      district: "Kathmandu",
      contact: "+977 9812340987",
      email: "prakash.thapa@legalfirm.com",
      idNumber: "L-12345",
      idType: "Bar Association",
      relatedCases: 7,
      occupation: "Senior Advocate",
      photo: "",
      lastActivity: "2081-01-20"
    },
    {
      id: "12",
      name: "Nirmala Giri",
      nepaliName: "निर्मला गिरी",
      type: "defendant",
      gender: "female",
      age: 31,
      address: "Jorpati, Kathmandu",
      district: "Kathmandu",
      contact: "+977 9823456789",
      email: "nirmala.giri@example.com",
      idNumber: "123-234-3456",
      idType: "Citizenship",
      relatedCases: 1,
      occupation: "Housewife",
      photo: "",
      lastActivity: "2081-01-05"
    },
  ];

  // Filter people based on search text and selected tab
  const filteredPeople = people.filter(person => {
    const matchesSearch = 
      searchText === "" || 
      person.name.toLowerCase().includes(searchText.toLowerCase()) ||
      (person.nepaliName && person.nepaliName.includes(searchText)) ||
      person.address.toLowerCase().includes(searchText.toLowerCase()) ||
      person.idNumber?.toLowerCase().includes(searchText.toLowerCase()) ||
      person.contact?.toLowerCase().includes(searchText.toLowerCase());
      
    if (selectedTab === "all") return matchesSearch;
    return matchesSearch && person.type === selectedTab;
  });

  // Sort the filtered people based on the selected column
  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sortColumn) return 0;
    
    let valueA: any;
    let valueB: any;
    
    switch(sortColumn) {
      case "name":
        valueA = a.name;
        valueB = b.name;
        break;
      case "type":
        valueA = a.type;
        valueB = b.type;
        break;
      case "district":
        valueA = a.district;
        valueB = b.district;
        break;
      case "cases":
        valueA = a.relatedCases;
        valueB = b.relatedCases;
        break;
      case "lastActivity":
        valueA = a.lastActivity;
        valueB = b.lastActivity;
        break;
      default:
        return 0;
    }
    
    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
  
  // Pagination
  const totalPages = Math.ceil(sortedPeople.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPeople = sortedPeople.slice(startIndex, startIndex + itemsPerPage);
  
  // Handle sort column click
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle sort direction if same column clicked
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new sort column and default to ascending
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Get the related cases for a person
  const getRelatedCases = (personId: string) => {
    // This would normally fetch from API - using mock data here
    return [
      {
        id: "1",
        caseNumber: "2081-CR-001",
        title: "Property Dispute",
        role: personId === "1" ? "Complainant" : "Defendant",
        date: "2081-01-15",
        status: "investigation"
      },
      {
        id: "2", 
        caseNumber: "2081-CR-002",
        title: "Theft",
        role: "Complainant",
        date: "2081-01-12",
        status: "pending"
      }
    ].slice(0, people.find(p => p.id === personId)?.relatedCases || 0);
  };

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-nepal-charcoal">
            People
          </h1>
          <p className="text-sm text-nepal-mediumgray mt-1">
            Manage complainants, defendants, witnesses, and legal representatives
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Dialog open={isNewPersonDialogOpen} onOpenChange={setIsNewPersonDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Add Person
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Person</DialogTitle>
                <DialogDescription>
                  Add a new person to the system. Fill out the details below.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name (English)</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nepaliName" className="nepali-text">पूरा नाम</Label>
                  <Input id="nepaliName" placeholder="पूरा नाम लेख्नुहोस्" className="nepali-text" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Person Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="complainant">Complainant</SelectItem>
                      <SelectItem value="defendant">Defendant</SelectItem>
                      <SelectItem value="witness">Witness</SelectItem>
                      <SelectItem value="lawyer">Lawyer/Advocate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idType">ID Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="citizenship">Citizenship</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="license">Driver's License</SelectItem>
                      <SelectItem value="bar">Bar Association</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input id="idNumber" placeholder="Enter ID number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input id="occupation" placeholder="Enter occupation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" placeholder="Enter contact number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter full address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kathmandu">Kathmandu</SelectItem>
                      <SelectItem value="lalitpur">Lalitpur</SelectItem>
                      <SelectItem value="bhaktapur">Bhaktapur</SelectItem>
                      <SelectItem value="kavre">Kavre</SelectItem>
                      <SelectItem value="makwanpur">Makwanpur</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo">Photo</Label>
                  <Input id="photo" type="file" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Any additional information..." />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewPersonDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsNewPersonDialogOpen(false)}>Save Person</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <div className="bg-white shadow rounded-xl overflow-hidden mb-6">
          <div className="p-5 border-b border-nepal-lightgray flex flex-col sm:flex-row items-center justify-between gap-4">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all" className="flex-1 sm:flex-initial">All</TabsTrigger>
              <TabsTrigger value="complainant" className="flex-1 sm:flex-initial">Complainants</TabsTrigger>
              <TabsTrigger value="defendant" className="flex-1 sm:flex-initial">Defendants</TabsTrigger>
              <TabsTrigger value="witness" className="flex-1 sm:flex-initial">Witnesses</TabsTrigger>
              <TabsTrigger value="lawyer" className="flex-1 sm:flex-initial">Lawyers</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-nepal-mediumgray" />
                <Input
                  placeholder="Search people..."
                  className="pl-8 w-full"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setSearchText("")}
              >
                <FilterX className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                    <div className="flex items-center">
                      Name
                      {sortColumn === "name" && 
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      }
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort("type")} className="cursor-pointer">
                    <div className="flex items-center">
                      Type
                      {sortColumn === "type" && 
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      }
                    </div>
                  </TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead onClick={() => handleSort("district")} className="cursor-pointer">
                    <div className="flex items-center">
                      District
                      {sortColumn === "district" && 
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      }
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort("cases")} className="cursor-pointer">
                    <div className="flex items-center">
                      Cases
                      {sortColumn === "cases" && 
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      }
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort("lastActivity")} className="cursor-pointer">
                    <div className="flex items-center">
                      Last Activity
                      {sortColumn === "lastActivity" && 
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      }
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPeople.length > 0 ? (
                  paginatedPeople.map((person) => (
                    <TableRow key={person.id} onClick={() => {
                      setSelectedPerson(person);
                      setIsProfileOpen(true);
                    }} className="cursor-pointer hover:bg-nepal-lightbg">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={person.photo} />
                            <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{person.name}</div>
                            {person.nepaliName && (
                              <div className="text-xs text-nepal-mediumgray nepali-text">{person.nepaliName}</div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          person.type === "complainant" ? "bg-status-pending/20 text-status-pending" :
                          person.type === "defendant" ? "bg-status-investigation/20 text-status-investigation" :
                          person.type === "witness" ? "bg-status-resolved/20 text-status-resolved" :
                          "bg-status-action/20 text-status-action"
                        }`}>
                          {person.type.charAt(0).toUpperCase() + person.type.slice(1)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3.5 w-3.5 mr-1.5 text-nepal-mediumgray" />
                          <span>{person.contact || 'N/A'}</span>
                        </div>
                      </TableCell>
                      <TableCell>{person.district}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <FileText className="h-3.5 w-3.5 mr-1.5 text-nepal-mediumgray" />
                          <span>{person.relatedCases}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1.5 text-nepal-mediumgray" />
                          <span>{person.lastActivity}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-nepal-mediumgray">
                      <User className="h-12 w-12 mx-auto mb-2 opacity-30" />
                      <p>No people found matching your criteria</p>
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
      </Tabs>

      {/* Person Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedPerson && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPerson.name}</DialogTitle>
                <DialogDescription>
                  {selectedPerson.nepaliName && (
                    <span className="nepali-text mr-2">{selectedPerson.nepaliName}</span>
                  )}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedPerson.type === "complainant" ? "bg-status-pending/20 text-status-pending" :
                    selectedPerson.type === "defendant" ? "bg-status-investigation/20 text-status-investigation" :
                    selectedPerson.type === "witness" ? "bg-status-resolved/20 text-status-resolved" :
                    "bg-status-action/20 text-status-action"
                  }`}>
                    {selectedPerson.type.charAt(0).toUpperCase() + selectedPerson.type.slice(1)}
                  </span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="h-32 w-32 mb-4">
                      <AvatarImage src={selectedPerson.photo} />
                      <AvatarFallback className="text-4xl">{selectedPerson.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Download className="h-4 w-4" /> Export Profile
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-nepal-mediumgray mb-1">Personal Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-nepal-mediumgray" />
                          <span className="font-medium">{selectedPerson.gender.charAt(0).toUpperCase() + selectedPerson.gender.slice(1)}, {selectedPerson.age} years</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-nepal-mediumgray" />
                          <span>{selectedPerson.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-nepal-mediumgray" />
                          <span>{selectedPerson.contact || 'Not Available'}</span>
                        </div>
                        {selectedPerson.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-nepal-mediumgray" />
                            <span>{selectedPerson.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-nepal-mediumgray mb-1">Identification</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">ID Type:</span> {selectedPerson.idType}</p>
                        <p><span className="font-medium">ID Number:</span> {selectedPerson.idNumber}</p>
                        <p><span className="font-medium">Occupation:</span> {selectedPerson.occupation}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Card className="mb-6">
                    <div className="p-4 border-b border-nepal-lightgray">
                      <h3 className="font-medium">Related Cases</h3>
                    </div>
                    <div className="p-2">
                      {getRelatedCases(selectedPerson.id).length > 0 ? (
                        getRelatedCases(selectedPerson.id).map((caseItem, index) => (
                          <div key={index} className="p-2 hover:bg-nepal-lightbg rounded-md transition-colors">
                            <div className="flex items-center justify-between">
                              <div>
                                <Link to={`/case/${caseItem.id}`} className="font-medium text-primary hover:underline">
                                  {caseItem.caseNumber}
                                </Link>
                                <div className="text-sm text-nepal-mediumgray">
                                  {caseItem.title} • {caseItem.date}
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className={`status-badge ${caseItem.status}`}>
                                  {caseItem.status === "pending" ? "Pending" :
                                   caseItem.status === "investigation" ? "Under Investigation" :
                                   caseItem.status === "resolved" ? "Resolved" : "Legal Action"}
                                </div>
                                <div className="text-sm font-medium">{caseItem.role}</div>
                                <ChevronRight className="h-4 w-4 text-nepal-mediumgray" />
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-4 text-center text-nepal-mediumgray">
                          <AlertCircle className="h-5 w-5 mx-auto mb-1" />
                          <p>No related cases found</p>
                        </div>
                      )}
                    </div>
                  </Card>

                  <Card>
                    <div className="p-4 border-b border-nepal-lightgray">
                      <h3 className="font-medium">Activity Timeline</h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        {selectedPerson.type === "complainant" && (
                          <>
                            <div className="relative pl-6 pb-4 border-l-2 border-nepal-lightgray">
                              <div className="absolute left-[-5px] top-0 h-3 w-3 rounded-full bg-status-pending"></div>
                              <div className="text-sm">
                                <p className="font-medium">Petition Filed</p>
                                <p className="text-nepal-mediumgray">Filed a new petition regarding property dispute</p>
                                <p className="text-xs text-nepal-mediumgray mt-1">{selectedPerson.lastActivity}</p>
                              </div>
                            </div>
                            
                            <div className="relative pl-6 pb-4 border-l-2 border-nepal-lightgray">
                              <div className="absolute left-[-5px] top-0 h-3 w-3 rounded-full bg-status-investigation"></div>
                              <div className="text-sm">
                                <p className="font-medium">Evidence Submitted</p>
                                <p className="text-nepal-mediumgray">Submitted land ownership documents</p>
                                <p className="text-xs text-nepal-mediumgray mt-1">2081-01-17</p>
                              </div>
                            </div>
                            
                            <div className="relative pl-6">
                              <div className="absolute left-[-5px] top-0 h-3 w-3 rounded-full bg-status-pending"></div>
                              <div className="text-sm">
                                <p className="font-medium">Hearing Scheduled</p>
                                <p className="text-nepal-mediumgray">Initial hearing scheduled for case #2081-CR-001</p>
                                <p className="text-xs text-nepal-mediumgray mt-1">2081-01-20</p>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {selectedPerson.type === "defendant" && (
                          <>
                            <div className="relative pl-6 pb-4 border-l-2 border-nepal-lightgray">
                              <div className="absolute left-[-5px] top-0 h-3 w-3 rounded-full bg-status-pending"></div>
                              <div className="text-sm">
                                <p className="font-medium">Case Registered Against</p>
                                <p className="text-nepal-mediumgray">Named as defendant in case #2081-CR-001</p>
                                <p className="text-xs text-nepal-mediumgray mt-1">{selectedPerson.lastActivity}</p>
                              </div>
                            </div>
                            
                            <div className="relative pl-6">
                              <div className="absolute left-[-5px] top-0 h-3 w-3 rounded-full bg-status-investigation"></div>
                              <div className="text-sm">
                                <p className="font-medium">Notice Delivered</p>
                                <p className="text-nepal-mediumgray">Official notice delivered for appearance</p>
                                <p className="text-xs text-nepal-mediumgray mt-1">2081-01-18</p>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {selectedPerson.type === "witness" && (
                          <>
                            <div className="relative pl-6 pb-4 border-l-2 border-nepal-lightgray">
                              <div className="absolute left-[-5px] top-0 h-3 w-3 rounded-full bg-status-pending"></div>
                              <div className="text-sm">
                                <p className="font-medium">Added as Witness</p>
                                <p className="text-nepal-mediumgray">Added as witness for case #2081-CR-003</p>
                                <p className="text-xs text-nepal-mediumgray mt-1">{selectedPerson.lastActivity}</p>
                              </div>
                            </div>
                            
                            <div className="relative pl-6">
                              <div className="absolute left-[-5px] top-0 h-3 w-3 rounded-full bg-status-investigation"></div>
                              <div className="text-sm">
                                <p className="font-medium">Interview Scheduled</p>
                                <p className="text-nepal-mediumgray">Witness interview scheduled</p>
                                <p className="text-xs text-nepal-mediumgray mt-1">2081-01-24</p>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {selectedPerson.type === "lawyer" && (
                          <>
                            <div className="relative pl-6 pb-4 border-l-2 border-nepal-lightgray">
                              <div className="absolute left-[-5px] top-0 h-3 w-3 rounded-full bg-status-pending"></div>
                              <div className="text-sm">
                                <p className="font-medium">Case Assignment</p>
                                <p className="text-nepal-mediumgray">Assigned to case #2081-CR-001 as legal representative</p>
                                <p className="text-xs text-nepal-mediumgray mt-1">{selectedPerson.lastActivity}</p>
                              </div>
                            </div>
                            
                            <div className="relative pl-6">
                              <div className="absolute left-[-5px] top-0 h-3 w-3 rounded-full bg-status-investigation"></div>
                              <div className="text-sm">
                                <p className="font-medium">Document Submission</p>
                                <p className="text-nepal-mediumgray">Submitted legal brief for the case</p>
                                <p className="text-xs text-nepal-mediumgray mt-1">2081-01-22</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}