import { useState } from 'react'

const otpClasses =
  'h-14 w-full rounded-xl border border-[#E2E8F0] bg-white text-center text-lg font-semibold tracking-[0.2em] text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100'

const Step2VerifyEmail = ({ email, onBack, onVerify }) => {
  const [otp, setOtp] = useState(['', '', '', ''])
  const [error, setError] = useState('')

  const otpClasses =
    'h-14 w-full rounded-xl border border-[#E2E8F0] bg-white text-center text-lg font-semibold tracking-[0.2em] text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100'

  const handleChange = (index, value) => {
    const nextValue = value.replace(/\D/g, '').slice(-1)
    setOtp((current) => current.map((digit, digitIndex) => (digitIndex === index ? nextValue : digit)))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (otp.some((digit) => !digit)) {
      setError('Enter the full 4-digit OTP sent to your email.')
      return
    }

    setError('')
    onVerify()
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Verify Email</h2>
        <p className="mt-2 text-sm text-[#64748B]">We sent a 4-digit OTP to {email || 'your email'}.</p>
      </div>

      {error ? (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-[#EF4444]">
          {error}
        </div>
      ) : null}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              aria-label={`OTP digit ${index + 1}`}
              className={otpClasses}
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <button 
            type="button" 
            className="text-sm font-semibold text-[#2563EB] transition hover:text-[#1D4ED8]"
            onClick={onBack}
          >
            Edit details
          </button>
          <button 
            type="button" 
            className="text-sm font-semibold text-[#2563EB] transition hover:text-[#1D4ED8]"
          >
            Resend OTP
          </button>
        </div>

        <button 
          type="submit" 
          className="h-12 w-full rounded-xl bg-[#2563EB] text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.6)] transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          Verify Email
        </button>
      </form>
    </>
  )
}

export default Step2VerifyEmail
