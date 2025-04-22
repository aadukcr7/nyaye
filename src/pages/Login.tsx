
import { LoginForm } from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <div className="h-screen flex items-center justify-center bg-nepal-lightbg">
      <div className="flex flex-col md:flex-row min-h-[500px] overflow-hidden bg-white rounded-xl shadow-lg w-full max-w-4xl">
        <div className="md:w-1/2 bg-nepal-blue p-12 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10"></div>
          <div className="relative z-10">
            <img 
              src="/placeholder.svg" 
              alt="Government Logo"
              className="h-16 w-16 mb-8"
            />
            <h1 className="text-2xl font-bold mb-2 text-nepal-charcoal">
              नेपाल सरकार
            </h1>
            <h2 className="text-xl font-semibold mb-6 text-nepal-charcoal">
              Nepal Government
            </h2>
            <p className="text-nepal-charcoal mb-4">
              ठाडो उजुरी व्यवस्थापन प्रणाली
            </p>
            <p className="text-nepal-charcoal mb-8">
              Petition Management System
            </p>
            <div className="bg-white/80 p-4 rounded-lg text-sm text-nepal-charcoal">
              <p className="font-medium mb-2">Secure Access Portal</p>
              <p>This system is only accessible to authorized personnel. All activities are logged and monitored.</p>
            </div>
          </div>
        </div>
        <div className="p-8 md:p-12 md:w-1/2 flex items-center">
          <LoginForm className="w-full" />
        </div>
      </div>
    </div>
  );
}
