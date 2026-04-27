import { useState, useEffect } from 'react'
import { FaUser, FaEnvelope, FaCheck, FaShieldAlt, FaChevronRight } from 'react-icons/fa'

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

const Step2VerifyEmail = ({ email, onBack, onVerify }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(45)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleChange = (index, value) => {
    const nextValue = value.replace(/\D/g, '').slice(-1)
    const newOtp = [...otp]
    newOtp[index] = nextValue
    setOtp(newOtp)
    
    // Auto focus next
    if (nextValue && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `(${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')})`
  }

  return (
    <div className="flex flex-col items-center">
      {/* Header Icon */}
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F5F9] text-[#2563EB]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V18C2 19.1 2.9 20 4 20H18L22 24V4C22 2.9 21.1 2 20 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M7 9H17M7 13H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      <h2 className="text-base font-bold text-[#0F172A]">Verify Your Identity</h2>
      <p className="mt-0.5 text-center text-[10px] text-[#64748B]">
        We've sent a 6-digit code to your mobile number
      </p>
      <p className="text-[10px] font-semibold text-[#2563EB]">OTP sent to your registered mobile</p>

      {/* Stepper */}
      <div className="my-3 flex items-center justify-center gap-2.5">
        <StepIndicator step={1} currentStep={2} icon={FaUser} label="Details" />
        <div className="mb-3.5 h-px w-6 border-t border-dashed border-[#E2E8F0]" />
        <StepIndicator step={2} currentStep={2} icon={FaEnvelope} label="Verify" />
        <div className="mb-3.5 h-px w-6 border-t border-dashed border-[#E2E8F0]" />
        <StepIndicator step={3} currentStep={2} icon={FaCheck} label="Done" />
      </div>

      {/* Illustration */}
      <div className="relative mb-3">
        <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-blue-50/50">
          <div className="relative">
            <svg width="40" height="30" viewBox="0 0 60 45" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 0H55C57.7614 0 60 2.23858 60 5V40C60 42.7614 57.7614 45 55 45H5C2.23858 45 0 42.7614 0 40V5C0 2.23858 2.23858 0 5 0Z" fill="#60A5FA"/>
              <path d="M0 5L30 25L60 5" stroke="white" strokeWidth="2"/>
            </svg>
            <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-green-500 text-white">
                <FaCheck className="h-2 w-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mb-2 text-[10px] font-medium text-[#475569]">Enter the 6-digit code sent to your phone</p>

      {/* OTP Inputs */}
      <div className="grid grid-cols-6 gap-1.5 w-full max-w-[280px] mb-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            maxLength="1"
            className="h-9 w-full rounded-lg border border-[#E2E8F0] bg-white text-center text-sm font-semibold text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-1 focus:ring-blue-100"
            value={digit}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onChange={(event) => handleChange(index, event.target.value)}
          />
        ))}
      </div>

      <div className="mb-3 text-[10px] text-[#64748B]">
        Didn't receive code?{' '}
        <button className="font-semibold text-[#2563EB] hover:underline">Resend</button>
        {' '}<span className="tabular-nums">{formatTime(timer)}</span>
      </div>

      <div className="w-full space-y-2">
        <button
          onClick={onVerify}
          className="h-9 w-full rounded-lg bg-[#1D4ED8] text-[11px] font-semibold text-white shadow-sm transition hover:bg-[#1E40AF]"
        >
          Verify Number
        </button>
        <button
          onClick={onBack}
          className="h-9 w-full rounded-lg border border-[#E2E8F0] bg-white text-[11px] font-semibold text-[#475569] transition hover:bg-gray-50"
        >
          Go Back
        </button>
      </div>

      {/* Help Note */}
      <div className="mt-4 w-full rounded-lg bg-[#F8FAFC] p-2.5 flex gap-2">
        <FaShieldAlt className="h-3 w-3 text-[#2563EB] mt-0.5" />
        <div className="flex-1 text-[9px] leading-relaxed">
          <p className="font-bold text-[#0F172A]">Problems receiving OTP?</p>
          <p className="text-[#64748B]">
            Ensure your mobile number is correct. If issues persist, contact support.
          </p>
        </div>
      </div>
    </div>

  )
}

export default Step2VerifyEmail

