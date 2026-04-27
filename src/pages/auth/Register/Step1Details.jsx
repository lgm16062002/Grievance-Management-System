import { useState } from 'react'
import { FaIdCard, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa'

const StepIndicator = ({ step, currentStep, icon: Icon, label }) => {
  const isActive = step === currentStep
  const isCompleted = step < currentStep

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
          isCompleted
            ? 'border-[#2563EB] bg-[#2563EB] text-white'
            : isActive
            ? 'border-[#2563EB] bg-[#2563EB] text-white'
            : 'border-[#E2E8F0] bg-white text-[#94A3B8]'
        }`}
      >
        {isCompleted ? <FaCheck className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
      </div>
      <span
        className={`text-[10px] font-medium ${
          isActive || isCompleted ? 'text-[#2563EB]' : 'text-[#94A3B8]'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

const Step1Details = ({ onSubmit, onBack }) => {
  const [values, setValues] = useState({
    registrationNumber: '',
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setValues((current) => ({ 
      ...current, 
      [name]: type === 'checkbox' ? checked : value 
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(values)
  }

  const inputClasses = 'h-9 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 pl-10 text-[11px] text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-1 focus:ring-blue-100'
  const labelClasses = 'mb-1 block text-[10px] font-semibold text-[#0F172A]'

  return (
    <div className="flex flex-col items-center">
      {/* Header Icon */}
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F5F9] text-[#2563EB]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V18C2 19.1 2.9 20 4 20H18L22 24V4C22 2.9 21.1 2 20 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M7 9H17M7 13H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      <h2 className="text-base font-bold text-[#0F172A]">Create Your Account</h2>
      <p className="mt-0.5 text-center text-[10px] text-[#64748B]">
        Register for the Grievance Management System
      </p>

      {/* Stepper */}
      <div className="my-3 flex items-center justify-center gap-2.5">
        <StepIndicator step={1} currentStep={1} icon={FaUser} label="Details" />
        <div className="mb-3.5 h-px w-6 border-t border-dashed border-[#E2E8F0]" />
        <StepIndicator step={2} currentStep={1} icon={FaEnvelope} label="Verify" />
        <div className="mb-3.5 h-px w-6 border-t border-dashed border-[#E2E8F0]" />
        <StepIndicator step={3} currentStep={1} icon={FaCheck} label="Done" />
      </div>

      <form className="w-full space-y-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label htmlFor="registration-number" className={labelClasses}>Reg No</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#94A3B8]">
                <FaIdCard className="h-3 w-3" />
              </div>
              <input
                id="registration-number"
                name="registrationNumber"
                placeholder="REG-2024"
                className={inputClasses}
                value={values.registrationNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="full-name" className={labelClasses}>Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#94A3B8]">
                <FaUser className="h-3 w-3" />
              </div>
              <input
                id="full-name"
                name="fullName"
                placeholder="John Doe"
                className={inputClasses}
                value={values.fullName}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label htmlFor="register-email" className={labelClasses}>Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#94A3B8]">
                <FaEnvelope className="h-3 w-3" />
              </div>
              <input
                id="register-email"
                name="email"
                type="email"
                placeholder="name@college.edu"
                className={inputClasses}
                value={values.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="mobile-number" className={labelClasses}>Mobile No</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#94A3B8]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <input
                id="mobile-number"
                name="mobileNumber"
                type="tel"
                placeholder="+91 00000 00000"
                className={inputClasses}
                value={values.mobileNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label htmlFor="register-password" className={labelClasses}>Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#94A3B8]">
                <FaLock className="h-3 w-3" />
              </div>
              <input
                id="register-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••"
                className={inputClasses}
                value={values.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-[#94A3B8]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye className="h-3 w-3" /> : <FaEyeSlash className="h-3 w-3" />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirm-password" className={labelClasses}>Confirm</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#94A3B8]">
                <FaLock className="h-3 w-3" />
              </div>
              <input
                id="confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••"
                className={inputClasses}
                value={values.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-[#94A3B8]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye className="h-3 w-3" /> : <FaEyeSlash className="h-3 w-3" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 py-0.5">
          <input
            id="agree-terms"
            name="agreeToTerms"
            type="checkbox"
            className="h-3 w-3 rounded border-[#CBD5E1] accent-[#2563EB]"
            checked={values.agreeToTerms}
            onChange={handleChange}
          />
          <label htmlFor="agree-terms" className="text-[9px] text-[#64748B]">
            I agree to the <a href="#" className="font-semibold text-[#2563EB]">Terms & Privacy</a>
          </label>
        </div>

        <button
          type="submit"
          className="h-9 w-full rounded-lg bg-[#1D4ED8] text-[11px] font-semibold text-white shadow-sm transition hover:bg-[#1E40AF]"
        >
          Register Now
        </button>

        <p className="text-center text-[9px] text-[#64748B]">
          Already have an account?{' '}
          <button type="button" className="font-semibold text-[#2563EB] hover:underline" onClick={onBack}>
            Sign In
          </button>
        </p>
      </form>
    </div>
  )
}

export default Step1Details

