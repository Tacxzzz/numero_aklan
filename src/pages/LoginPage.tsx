import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useUser } from "./UserContext";
import { loginAccount, sendOTPForReset, verifyOTPForgot, verifyOTPLogin } from '@/lib/apiCalls';
import { useClient } from "./ClientContext";
import PisoPlayLogo from "@/files/LogoWithName.svg";
import { PhoneIcon, LockIcon } from "lucide-react"; 

export function LoginPage() {
  const navigate = useNavigate();
  const { setUserID } = useUser();
  const { setClientId } = useClient();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // New state hooks
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [openOTPforgot, setOpenOTPforgot] = useState(false);




  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");

    if (rememberedEmail && rememberedPassword) {
      setMobile(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken'); // Replace 'authToken' with your actual storage key
    if (token) {
      
      navigate('/dashboard'); // Redirect to dashboard if token exists
    }
  }, [navigate]);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("mobile", mobile);
    formData.append('password', password);
    const data = await loginAccount(formData);
    if(!data.authenticated){
      setError("Invalid mobile number or password.");
      setIsLoading(false);
      return;
    }

    setError("");
    setShowOtpInput(true);
    
  };


  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setError("");
    const data = await verifyOTPLogin(mobile, otp);
  
    if (!data.authenticated) {
      setError(data.message);
      return;
    }
  
    setUserID(data.userID);
    setClientId(null);
    localStorage.setItem('authToken', 'user_authenticated');
  
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", mobile);
      localStorage.setItem("rememberedPassword", password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  
    navigate('/dashboard');
  };

  const handleMobile = async (e: React.FormEvent) => {
    e.preventDefault();


    setError("");
    setIsLoading(true);


    const data = await sendOTPForReset(mobile);
    if(!data.authenticated){
      setError(data.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setForgotPass(false);
    setOpenOTPforgot(true);
    
  };

  const handleOtpReset = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setError("");
    setIsLoading(true);
    const data = await verifyOTPForgot(mobile, otp);
  
    if (!data.authenticated) {
      setError(data.message);
      return;
    }
  
    setUserID(data.userID);
    setClientId(null);
    localStorage.setItem('authToken', 'user_authenticated');
  
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", mobile);
      localStorage.setItem("rememberedPassword", password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  
    navigate('/dashboard');
  };
  

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Top promotional banner - only shown when not in OTP input mode */}
        {!showOtpInput && !forgotPass && !openOTPforgot && (
          <div className="w-full bg-blue-500 text-white text-center py-4 px-6 rounded-xl mb-5">
            <h2 className="text-xl font-bold">Sign Up and Get your free ₱15 credits</h2>
          </div>
        )}


        {/* Logo */}
        {/* <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 flex items-center justify-center shadow-lg">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
        </div> */}


<div className="flex justify-center">
        <img src={PisoPlayLogo} alt="PisoPlay Logo" width="100" height="100" />
          {/* <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center shadow-lg"> */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg> */}
              {/* <img src={PisoPlayLogo} alt="PisoPlay Logo" width="65" height="65" />
            </div>
          </div> */}
        </div>

        
        
        {/* Login Form */}
        <div className="overflow-hidden">
          <div className="p-8">
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            {!showOtpInput && !forgotPass && !openOTPforgot ? (
            <>
            <h2 className="text-2xl font-bold text-center mb-4 text-blue-600 uppercase">Welcome Back!</h2>
            <form onSubmit={handleLogin} className="space-y-4">
            {/* <div className="space-y-2">
                <Label htmlFor="mobile" className="text-gray-700">Mobile Number</Label>
                <div className="flex items-center space-x-2 border rounded-xl p-2 bg-gray-100"> */}
                  {/* Fixed +63 country code */}
                  {/* <span className="text-gray-700 font-semibold">+63</span> */}

                  {/* Mobile Input */}
                  {/* <Input 
                    id="mobile" 
                    type="tel" 
                    placeholder="9XXXXXXXXX" 
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                    pattern="[0-9]{10}" 
                    className="flex-1 bg-transparent border-none focus:ring-0 outline-none"
                    required
                  />
                </div>
              </div> */}

              <div className="flex">
                <div className="bg-gray-400 w-16 h-14 flex items-center justify-center">
                  <PhoneIcon className="h-6 w-6 text-white" />
                </div>
                <Input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9*********"
                  className="flex-1 h-14 bg-gray-200 border-0 rounded-none text-lg"
                />
              </div>
              
              {/* <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <a 
                  href="#" 
                  className="text-sm text-blue-500 hover:underline"
                  onClick={(e) => {
                    e.preventDefault(); // prevents the page from jumping to the top
                    setForgotPass(true); // sets your state
                  }}>Forgot Password?</a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div> */}

              <div className="mb-6">
                <div className="flex">
                  <div className="bg-gray-400 w-16 h-14 flex items-center justify-center">
                    <LockIcon className="h-6 w-6 text-white" />
                  </div>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="flex-1 h-14 bg-gray-200 border-0 rounded-none text-lg"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full custom-signup-button"
              >
                {isLoading ? "Logging in..." : "Sign in"}
              </Button>

             
            </form>
            </>
            ) :
            forgotPass ? (
              <form onSubmit={handleMobile} className="space-y-4">
              <h2 className="text-2xl font-bold text-center mb-4 text-blue-600 uppercase">Forgot Password</h2>
              <Label htmlFor="otp" className="text-gray-700">Enter Mobile number</Label>
              
              <div className="flex items-center space-x-2 border rounded-xl p-2 bg-gray-100">
                  {/* Fixed +63 country code */}
                  <span className="text-gray-700 font-semibold">+63</span>

                  {/* Mobile Input */}
                  <Input 
                    id="mobile" 
                    type="tel" 
                    placeholder="9XXXXXXXXX" 
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                    pattern="[0-9]{10}" 
                    className="flex-1 bg-transparent border-none focus:ring-0 outline-none"
                    required
                  />
                </div>
              <Button disabled={isLoading} type="submit" className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl">
              {isLoading ? "Sending OTP..." : "Verify First to reset password"} 
              </Button>
            </form>
            )
            :
            openOTPforgot ? (
              <form onSubmit={handleOtpReset} className="space-y-4">
              <h2 className="text-2xl font-bold text-center mb-4 text-blue-600 uppercase">Reset Password</h2>
              <Label htmlFor="otp" className="text-gray-700">Enter OTP to reset password</Label>
              <p style={{ color: 'red' }}>Your temporary password will be sent to you via sms. You can then change your password once logged in.</p>
              <Input 
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={8}
                pattern="[0-9]{8}"
                placeholder="Enter 8-digit OTP"
                required
              />
              <Button  disabled={isLoading} type="submit" className="w-full custom-signup-button">
              {isLoading ? "Resetting Password..." : "Verify OTP"} 
              </Button>
            </form>
            )
            :
            (
            // 👇 OTP input form
            <form onSubmit={handleOtpVerify} className="space-y-4">
              <h2 className="text-2xl font-bold text-center mb-4 text-blue-600 uppercase">OTP Code</h2>
              <Label htmlFor="otp" className="text-gray-700 text-center block w-full">Please type the OTP Verification code sent to <b>(+63){mobile}</b> </Label>
              {/* <Input 
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={8}
                pattern="[0-9]{8}"
                placeholder="Enter 8-digit OTP"
                required
              /> */}

              <Input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={8}
                pattern="[0-9]{8}"
                placeholder="Enter 8-digit OTP"
                className="flex-1 h-14 bg-gray-200 border-0 rounded-none text-lg"
                required
              />

              <Button type="submit" className="w-full custom-signup-button">
                Verify Code
              </Button>
            </form>
          )}
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">Don't have an account? <a href="/create-account" className="text-blue-500 hover:underline">Sign Up</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
