
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Upload, Printer, ArrowRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function PetitionForm() {
  const [date, setDate] = useState<Date>();
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const steps = [
    {
      id: "complainant",
      label: "Complainant Details",
      nepaliLabel: "उजुरीकर्ता विवरण",
    },
    {
      id: "defendant",
      label: "Defendant Details",
      nepaliLabel: "प्रतिवादी विवरण",
    },
    {
      id: "case",
      label: "Case Details",
      nepaliLabel: "मुद्दा विवरण",
    },
    {
      id: "evidence",
      label: "Evidence & Witnesses",
      nepaliLabel: "प्रमाण र साक्षीहरू",
    },
  ];

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">
        <span className="text-primary nepali-text">नयाँ उजुरी दर्ता</span> | New Petition Registration
      </h2>

      <div className="mb-8">
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 flex rounded bg-nepal-lightgray">
            <div
              className="bg-primary transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={cn(
                  "flex flex-col items-center text-xs",
                  i <= currentStep ? "text-primary" : "text-nepal-mediumgray"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full mb-2",
                    i < currentStep
                      ? "bg-primary text-white"
                      : i === currentStep
                      ? "bg-nepal-blue text-primary border border-primary"
                      : "bg-nepal-lightgray text-nepal-mediumgray"
                  )}
                >
                  {i < currentStep ? (
                    "✓"
                  ) : (
                    i + 1
                  )}
                </div>
                <span className="hidden md:block">{step.label}</span>
                <span className="hidden md:block nepali-text">{step.nepaliLabel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Tabs value={steps[currentStep].id} className="mt-6">
        <TabsContent value="complainant">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="complainant-name-en">Full Name (English)</Label>
              <Input id="complainant-name-en" placeholder="Enter full name" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="complainant-name-np" className="nepali-text">पूरा नाम</Label>
              <Input id="complainant-name-np" placeholder="पूरा नाम लेख्नुहोस्" className="mt-1 nepali-text" />
            </div>
            <div>
              <Label htmlFor="complainant-age">Age</Label>
              <Input id="complainant-age" type="number" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="complainant-gender">Gender</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male / पुरुष</SelectItem>
                  <SelectItem value="female">Female / महिला</SelectItem>
                  <SelectItem value="other">Other / अन्य</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="complainant-address">Address</Label>
              <Input id="complainant-address" placeholder="Enter address" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="complainant-phone">Contact Number</Label>
              <Input id="complainant-phone" placeholder="Enter phone number" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="complainant-id-type">ID Type</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="citizenship">Citizenship / नागरिकता</SelectItem>
                  <SelectItem value="passport">Passport / राहदानी</SelectItem>
                  <SelectItem value="license">Driving License / सवारी चालक अनुमतिपत्र</SelectItem>
                  <SelectItem value="voter">Voter ID / मतदाता परिचयपत्र</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="complainant-id-number">ID Number</Label>
              <Input id="complainant-id-number" placeholder="Enter ID number" className="mt-1" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="defendant">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="defendant-name-en">Full Name (English)</Label>
              <Input id="defendant-name-en" placeholder="Enter full name" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="defendant-name-np" className="nepali-text">पूरा नाम</Label>
              <Input id="defendant-name-np" placeholder="पूरा नाम लेख्नुहोस्" className="mt-1 nepali-text" />
            </div>
            <div>
              <Label htmlFor="defendant-age">Age</Label>
              <Input id="defendant-age" type="number" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="defendant-gender">Gender</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male / पुरुष</SelectItem>
                  <SelectItem value="female">Female / महिला</SelectItem>
                  <SelectItem value="other">Other / अन्य</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="defendant-address">Address</Label>
              <Input id="defendant-address" placeholder="Enter address" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="defendant-phone">Contact Number (if known)</Label>
              <Input id="defendant-phone" placeholder="Enter phone number" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="relationship">Relationship to Complainant</Label>
              <Input id="relationship" placeholder="e.g., Neighbor, Family member" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="defendant-description">Physical Description</Label>
              <Input id="defendant-description" placeholder="Any identifying features" className="mt-1" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="case">
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="incident-date">Date of Incident</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="case-type">Case Type</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select case type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theft">Theft / चोरी</SelectItem>
                    <SelectItem value="assault">Assault / हमला</SelectItem>
                    <SelectItem value="fraud">Fraud / जालसाजी</SelectItem>
                    <SelectItem value="property">Property Dispute / सम्पत्ति विवाद</SelectItem>
                    <SelectItem value="domestic">Domestic Violence / घरेलु हिंसा</SelectItem>
                    <SelectItem value="other">Other / अन्य</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="incident-location">Incident Location</Label>
              <Input id="incident-location" placeholder="Where did the incident occur?" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="case-description">Case Description</Label>
              <Textarea 
                id="case-description" 
                placeholder="Please provide details about what happened..."
                className="mt-1"
                rows={5}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="evidence">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label className="mb-2 block">Evidence Files</Label>
              <div className="border-2 border-dashed border-nepal-lightgray rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto text-nepal-mediumgray mb-2" />
                <p className="text-sm text-nepal-mediumgray mb-2">
                  Drag and drop files here or click to browse
                </p>
                <p className="text-xs text-nepal-mediumgray">
                  Supported formats: JPEG, PNG, PDF, DOC (Max 10MB)
                </p>
                <Button variant="outline" className="mt-4">
                  Upload Files
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="witnesses">Witness Information (if any)</Label>
              <Textarea 
                id="witnesses" 
                placeholder="Names and contact details of witnesses..."
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="police-station">Reporting Police Station</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select police station" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="central">Central Police Station</SelectItem>
                    <SelectItem value="north">North District Station</SelectItem>
                    <SelectItem value="south">South District Station</SelectItem>
                    <SelectItem value="east">East District Station</SelectItem>
                    <SelectItem value="west">West District Station</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="officer">Receiving Officer</Label>
                <Input id="officer" placeholder="Officer name" className="mt-1" />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep} 
          disabled={currentStep === 0}
        >
          Back
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Save Draft
          </Button>
          
          {currentStep === steps.length - 1 ? (
            <Button className="gap-2">
              Submit Petition
            </Button>
          ) : (
            <Button onClick={nextStep} className="gap-2">
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
