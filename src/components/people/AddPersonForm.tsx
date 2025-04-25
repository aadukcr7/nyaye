import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, ChevronLeft, User, Phone, FileText } from "lucide-react";

interface AddPersonFormProps {
  onCancel: () => void;
  onSave: () => void;
}

// Form value type definition
interface PersonFormValues {
  name: string;
  nepaliName: string;
  type: string;
  gender: string;
  age: string;
  idType: string;
  idNumber: string;
  occupation: string;
  contact: string;
  email: string;
  address: string;
  district: string;
  photo: File | null;
  notes: string;
}

const AddPersonForm = ({ onCancel, onSave }: AddPersonFormProps) => {
  // Step management
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 3;

  // Form state
  const [formValues, setFormValues] = useState<PersonFormValues>({
    name: '',
    nepaliName: '',
    type: '',
    gender: '',
    age: '',
    idType: '',
    idNumber: '',
    occupation: '',
    contact: '',
    email: '',
    address: '',
    district: '',
    photo: null,
    notes: ''
  });

  // Handle form input changes
  const handleInputChange = (field: keyof PersonFormValues, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange('photo', e.target.files[0]);
    }
  };

  // Navigation between steps
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Here you would typically validate and send data to server
    console.log('Form submitted with values:', formValues);
    onSave();
  };

  return (
    <>
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
              ${currentStep === 1 ? 'bg-primary text-primary-foreground border-primary' : 
                'bg-muted border-muted-foreground/20'}`}
          >
            <User size={16} />
          </div>
          <div className={`h-1 w-10 ${currentStep > 1 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
              ${currentStep === 2 ? 'bg-primary text-primary-foreground border-primary' : 
                currentStep > 2 ? 'bg-primary text-primary-foreground border-primary' : 
                'bg-muted border-muted-foreground/20'}`}
          >
            <Phone size={16} />
          </div>
          <div className={`h-1 w-10 ${currentStep > 2 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
              ${currentStep === 3 ? 'bg-primary text-primary-foreground border-primary' : 
                'bg-muted border-muted-foreground/20'}`}
          >
            <FileText size={16} />
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name (English)*</Label>
              <Input 
                id="name" 
                placeholder="Enter full name" 
                value={formValues.name} 
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nepaliName" className="nepali-text">पूरा नाम</Label>
              <Input 
                id="nepaliName" 
                placeholder="पूरा नाम लेख्नुहोस्" 
                className="nepali-text"
                value={formValues.nepaliName}
                onChange={(e) => handleInputChange('nepaliName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Person Type*</Label>
              <Select 
                value={formValues.type} 
                onValueChange={(value) => handleInputChange('type', value)}
              >
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
              <Label htmlFor="gender">Gender*</Label>
              <Select 
                value={formValues.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
              >
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
              <Input 
                id="age" 
                type="number" 
                value={formValues.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Contact Information */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input 
                id="contact" 
                placeholder="Enter contact number" 
                value={formValues.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter email address" 
                value={formValues.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="address">Address*</Label>
              <Input 
                id="address" 
                placeholder="Enter full address" 
                value={formValues.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District*</Label>
              <Select 
                value={formValues.district}
                onValueChange={(value) => handleInputChange('district', value)}
              >
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
          </div>
        </div>
      )}

      {/* Step 3: Additional Information */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="idType">ID Type</Label>
              <Select 
                value={formValues.idType}
                onValueChange={(value) => handleInputChange('idType', value)}
              >
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
              <Input 
                id="idNumber" 
                placeholder="Enter ID number" 
                value={formValues.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input 
                id="occupation" 
                placeholder="Enter occupation" 
                value={formValues.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <Input 
                id="photo" 
                type="file" 
                onChange={handleFileChange}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Any additional information..." 
                value={formValues.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      <DialogFooter className="pt-4 mt-4 border-t">
        <div className="flex justify-between w-full">
          <Button 
            variant="outline" 
            onClick={currentStep === 1 ? onCancel : prevStep}
            className="gap-1"
          >
            {currentStep === 1 ? 'Cancel' : (
              <>
                <ChevronLeft className="h-4 w-4" />
                Back
              </>
            )}
          </Button>
          <Button 
            onClick={currentStep === totalSteps ? handleSubmit : nextStep}
            className="gap-1"
          >
            {currentStep === totalSteps ? 'Save Person' : (
              <>
                Next
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};

export default AddPersonForm;