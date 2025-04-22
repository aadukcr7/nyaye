
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 1500);
  };

  return (
    <div className={cn("grid gap-6", className)}>
      <div className="flex flex-col space-y-2 text-center">
        <div className="flex justify-center mb-2">
          <div className="h-12 w-12 rounded-full bg-nepal-blue flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          Sign in to Nyaya Portal
        </h1>
        <p className="text-sm text-nepal-mediumgray">
          Enter your credentials below to continue
        </p>
      </div>
      <form onSubmit={handleLogin}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email / Username</Label>
            <Input
              id="email"
              placeholder="officer@example.gov.np"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || otpSent}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              disabled={isLoading || otpSent}
            />
          </div>
          
          {otpSent ? (
            <div className="grid gap-2">
              <Label htmlFor="otp">Two-Factor Authentication Code</Label>
              <Input
                id="otp"
                placeholder="Enter 6-digit code"
                className="text-center tracking-widest"
                maxLength={6}
              />
              <p className="text-xs text-nepal-mediumgray mt-1">
                A verification code has been sent to your registered mobile number
              </p>
            </div>
          ) : null}
          
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox id="remember" />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          
          <Button
            type="submit"
            disabled={isLoading}
            className={cn(otpSent ? "bg-status-resolved hover:bg-status-resolved/90" : "")}
          >
            {isLoading ? "Signing in..." : otpSent ? "Verify & Continue" : "Sign In"}
          </Button>
        </div>
      </form>
      
      <div className="mt-4 text-center text-sm">
        <div className="flex justify-center items-center my-4">
          <hr className="w-full border-nepal-lightgray" />
          <span className="px-3 text-nepal-mediumgray">System Access</span>
          <hr className="w-full border-nepal-lightgray" />
        </div>
        <p className="text-nepal-mediumgray">
          This is a secure government portal. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
