import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, isSameDay, parseISO, addDays } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  MapPin,
  ClipboardList,
  AlertCircle,
  Check,
  Filter
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "hearing" | "meeting" | "deadline" | "other";
  location: string;
  caseId?: string;
  caseNumber?: string;
  description: string;
  participants: string[];
  completed: boolean;
}

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<"month" | "day" | "list">("month");
  const [filterType, setFilterType] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample calendar events for demonstration
  const events: Event[] = [
    {
      id: "1",
      title: "Initial Hearing",
      date: "2025-04-23",
      time: "10:30 AM",
      type: "hearing",
      location: "Courtroom 3, District Court",
      caseId: "1",
      caseNumber: "2081-CR-001",
      description: "Initial hearing for Property Dispute case between Ramesh Sharma and Hari Bahadur.",
      participants: ["Judge Binod Sharma", "Ramesh Sharma", "Hari Bahadur", "Advocate Prakash Thapa"],
      completed: false
    },
    {
      id: "2",
      title: "Evidence Submission Deadline",
      date: "2025-04-25",
      time: "05:00 PM",
      type: "deadline",
      location: "Registry Office",
      caseId: "2",
      caseNumber: "2081-CR-002",
      description: "Last date to submit additional evidence for theft case.",
      participants: ["Court Registrar", "Sita Tamang"],
      completed: false
    },
    {
      id: "3",
      title: "Case Review Meeting",
      date: "2025-04-22",
      time: "02:00 PM",
      type: "meeting",
      location: "Conference Room B",
      caseId: "5",
      caseNumber: "2081-CR-005",
      description: "Internal meeting to review the domestic violence case progress.",
      participants: ["Inspector Rajesh Khatri", "Officer Sunita Rai", "Social Worker Mina Gurung"],
      completed: true
    },
    {
      id: "4",
      title: "Witness Interview",
      date: "2025-04-24",
      time: "11:45 AM",
      type: "meeting",
      location: "Interview Room 1",
      caseId: "3",
      caseNumber: "2081-CR-003",
      description: "Interview with the primary witness in assault case.",
      participants: ["Officer Rajesh Khatri", "Witness: Sunil Maharjan"],
      completed: false
    },
    {
      id: "5",
      title: "Case Filing Review",
      date: "2025-04-22",
      time: "09:30 AM",
      type: "other",
      location: "Records Department",
      description: "Review new petition submissions and assign case numbers.",
      participants: ["Records Officer", "Admin Staff"],
      completed: true
    },
    {
      id: "6",
      title: "Follow-up Hearing",
      date: "2025-04-30",
      time: "02:30 PM",
      type: "hearing",
      location: "Courtroom 2, District Court",
      caseId: "4",
      caseNumber: "2081-CR-004",
      description: "Follow-up hearing for the fraud case with new evidence presentation.",
      participants: ["Judge Meena Shrestha", "Gita Khadka", "Samir Karki", "Prosecutor Rajan Thapa"],
      completed: false
    },
  ];

  // Filter events based on selected date and type
  const getFilteredEvents = () => {
    return events.filter(event => {
      const matchesFilter = filterType === "all" || event.type === filterType;
      
      if (view === "day") {
        return isSameDay(parseISO(event.date), selectedDate) && matchesFilter;
      } else if (view === "list") {
        return parseISO(event.date) >= new Date() && matchesFilter;
      }
      
      return matchesFilter;
    });
  };

  const filteredEvents = getFilteredEvents();
  
  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(parseISO(event.date), date));
  };
  
  // Check if a date has any events
  const hasEvents = (date: Date) => {
    return events.some(event => isSameDay(parseISO(event.date), date));
  };

  // Get the appropriate color class for an event type
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "hearing": return "bg-status-investigation/20 text-status-investigation border-status-investigation";
      case "meeting": return "bg-status-resolved/20 text-status-resolved border-status-resolved";
      case "deadline": return "bg-status-pending/20 text-status-pending border-status-pending";
      case "other": return "bg-status-action/20 text-status-action border-status-action";
      default: return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  const eventTypeLabels = {
    hearing: "Hearing",
    meeting: "Meeting",
    deadline: "Deadline",
    other: "Other"
  };

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-nepal-charcoal">
            Calendar
          </h1>
          <p className="text-sm text-nepal-mediumgray mt-1">
            Manage hearing schedules and important dates
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Calendar Event</DialogTitle>
                <DialogDescription>
                  Create a new event, hearing, or deadline in the system calendar.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" placeholder="Event title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <div className="col-span-3 flex gap-2">
                    <Input id="date" type="date" />
                    <Input id="time" type="time" />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hearing">Hearing</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="deadline">Deadline</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" placeholder="Event location" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="case" className="text-right">
                    Related Case
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select related case (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2081-CR-001">2081-CR-001 (Property Dispute)</SelectItem>
                      <SelectItem value="2081-CR-002">2081-CR-002 (Theft)</SelectItem>
                      <SelectItem value="2081-CR-003">2081-CR-003 (Assault)</SelectItem>
                      <SelectItem value="2081-CR-004">2081-CR-004 (Fraud)</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="participants" className="text-right">
                    Participants
                  </Label>
                  <Input id="participants" placeholder="Add participants" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea id="description" placeholder="Event details..." className="col-span-3" />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsDialogOpen(false)}>Save Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mb-6">
        <Tabs value={view} onValueChange={(v) => setView(v as any)}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" onClick={() => setSelectedDate(prev => addDays(prev, -1))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => setSelectedDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={() => setSelectedDate(prev => addDays(prev, 1))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[160px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter events" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="hearing">Hearings</SelectItem>
                  <SelectItem value="meeting">Meetings</SelectItem>
                  <SelectItem value="deadline">Deadlines</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="month" className="mt-0">
            <div className="bg-white shadow rounded-xl p-4">
              <div className="text-center mb-4">
                <h2 className="text-xl font-medium">
                  {format(selectedDate, "MMMM yyyy")}
                </h2>
              </div>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={date => date && setSelectedDate(date)}
                className="rounded-md"
                modifiers={{
                  hasEvents: (date) => hasEvents(date),
                  today: (date) => isSameDay(date, new Date()),
                }}
                modifiersClassNames={{
                  hasEvents: "bg-nepal-blue/10 font-bold",
                  today: "border border-primary",
                }}
              />
              
              {getEventsForDate(selectedDate).length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">
                    Events for {format(selectedDate, "MMMM d, yyyy")}
                  </h3>
                  <div className="space-y-3">
                    {getEventsForDate(selectedDate).map(event => (
                      <div 
                        key={event.id}
                        className={`border-l-4 ${getEventTypeColor(event.type)} rounded-r-lg p-3 bg-nepal-lightbg`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <div className="text-sm text-nepal-mediumgray mt-1 space-y-1">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{event.location}</span>
                              </div>
                              {event.caseNumber && (
                                <div className="flex items-center gap-1">
                                  <ClipboardList className="h-3.5 w-3.5" />
                                  <span>Case #{event.caseNumber}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${event.type === "hearing" ? "bg-status-investigation/20 text-status-investigation" : event.type === "meeting" ? "bg-status-resolved/20 text-status-resolved" : event.type === "deadline" ? "bg-status-pending/20 text-status-pending" : "bg-status-action/20 text-status-action"}`}>
                            {eventTypeLabels[event.type as keyof typeof eventTypeLabels]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="day" className="mt-0">
            <div className="bg-white shadow rounded-xl p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-medium">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </h2>
              </div>

              {filteredEvents.length > 0 ? (
                <div className="space-y-4">
                  {filteredEvents
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map(event => (
                      <div 
                        key={event.id}
                        className={`border ${getEventTypeColor(event.type)} rounded-lg p-4 ${event.completed ? "opacity-60" : ""}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-lg">{event.title}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full ${event.type === "hearing" ? "bg-status-investigation/20 text-status-investigation" : event.type === "meeting" ? "bg-status-resolved/20 text-status-resolved" : event.type === "deadline" ? "bg-status-pending/20 text-status-pending" : "bg-status-action/20 text-status-action"}`}>
                                {eventTypeLabels[event.type as keyof typeof eventTypeLabels]}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                              <div className="flex items-center gap-2 text-nepal-mediumgray">
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-nepal-mediumgray">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                              {event.caseNumber && (
                                <div className="flex items-center gap-2 text-nepal-mediumgray">
                                  <ClipboardList className="h-4 w-4" />
                                  <span>Case #{event.caseNumber}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-nepal-mediumgray">
                                <UserPlus className="h-4 w-4" />
                                <span>{event.participants.length} Participants</span>
                              </div>
                            </div>
                            
                            <p className="mt-3 text-sm text-nepal-charcoal">
                              {event.description}
                            </p>

                            {event.participants.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-sm font-medium mb-2">Participants:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {event.participants.map((participant, i) => (
                                    <span key={i} className="text-xs bg-nepal-lightbg px-2 py-1 rounded-md">
                                      {participant}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${event.completed ? "bg-status-resolved text-white" : "border border-nepal-lightgray"}`}>
                              {event.completed ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4 text-nepal-mediumgray" />}
                            </div>
                            <span className="text-xs text-nepal-mediumgray">
                              {event.completed ? "Completed" : "Pending"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className="text-center py-12 text-nepal-mediumgray">
                  <CalendarIcon className="h-12 w-12 mx-auto opacity-30 mb-3" />
                  <p>No events scheduled for this day.</p>
                  <Button variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Add Event
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="bg-white shadow rounded-xl p-6">
              <div className="mb-6">
                <h2 className="text-xl font-medium">
                  Upcoming Events
                </h2>
              </div>

              {filteredEvents.length > 0 ? (
                <div className="space-y-2">
                  {filteredEvents
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map(event => (
                      <div 
                        key={event.id}
                        className="border border-nepal-lightgray rounded-lg p-4 hover:bg-nepal-lightbg transition-colors"
                      >
                        <div className="flex flex-col md:flex-row justify-between">
                          <div className="mb-2 md:mb-0">
                            <div className="flex items-center gap-2">
                              <span className={`h-3 w-3 rounded-full ${event.type === "hearing" ? "bg-status-investigation" : event.type === "meeting" ? "bg-status-resolved" : event.type === "deadline" ? "bg-status-pending" : "bg-status-action"}`}></span>
                              <h3 className="font-medium">{event.title}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${event.type === "hearing" ? "bg-status-investigation/20 text-status-investigation" : event.type === "meeting" ? "bg-status-resolved/20 text-status-resolved" : event.type === "deadline" ? "bg-status-pending/20 text-status-pending" : "bg-status-action/20 text-status-action"}`}>
                                {eventTypeLabels[event.type as keyof typeof eventTypeLabels]}
                              </span>
                            </div>
                            <div className="ml-5 text-sm text-nepal-mediumgray mt-1">
                              {event.caseNumber && (
                                <span className="mr-3">Case #{event.caseNumber}</span>
                              )}
                              <span className="mr-3">{event.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="flex items-center mr-4">
                              <CalendarIcon className="h-4 w-4 mr-1 text-nepal-mediumgray" />
                              <span className="text-sm">{format(parseISO(event.date), "MMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-nepal-mediumgray" />
                              <span className="text-sm">{event.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className="text-center py-12 text-nepal-mediumgray">
                  <CalendarIcon className="h-12 w-12 mx-auto opacity-30 mb-3" />
                  <p>No upcoming events found.</p>
                  <Button variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Add Event
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}