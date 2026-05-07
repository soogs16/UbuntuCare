import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import logo from './assets/logo.png'
import ubuntu_login from './assets/ubuntu_login.png'
import Dashboard from './Dashboard'
import './index.css'
import { useNavigate } from 'react-router-dom'


export default function AuthPage() {
  const [step, setStep] = useState("email"); // email | otp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/dashboard')
  }
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    console.log("Send OTP to:", email);
    setStep("otp");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    console.log("OTP entered:", otp.join(""));
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 w-screen bg-gray-900">
      
      {/* CARD */}
      <div className="flex w-full bg-white shadow-lg">

        {/* LEFT SIDE (IMAGE) */}
        <div className="hidden md:block h-screen md:w-1/2 h-full">
          <img
            src={ubuntu_login}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">

          <div className="w-full max-w-md">
            <img
            src={logo}
            alt="Logo"
            className="w-full h-full object-cover"
            />

            <h2 className="text-2xl mb-6">
              {step === "email" ? "Sign in to access your Admin dashboard" : "Enter OTP"}
            </h2>

            {step === "email" ? (
              <form onSubmit={handleSubmitEmail} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
                >
                  Continue
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">

                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) =>
                        handleOtpChange(e.target.value, index)
                      }
                      className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>

                <button
                  onClick={handleLogin}
                  type="submit"
                  className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-700 transition"
                >
                  Verify OTP
                </button>

                <p
                  className="text-sm text-center text-blue-500 cursor-pointer"
                  onClick={() => setStep("email")}
                >
                  Change email
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
    


  );
}