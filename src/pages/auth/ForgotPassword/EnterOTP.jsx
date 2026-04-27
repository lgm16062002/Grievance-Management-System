import { useEffect, useMemo, useRef, useState } from 'react'
import { FaCheckCircle, FaLock } from 'react-icons/fa'

const otpClasses =
  'h-10 w-10 rounded-lg border border-[#E2E8F0] bg-white text-center text-base font-semibold text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 sm:h-12 sm:w-12 sm:rounded-xl sm:text-lg'

const EnterOTP = ({
  email,
  primaryButtonClasses,
  outlineButtonClasses,
  textButtonClasses,
  onBack,
  onContinue,
}) => {
  const otpLength = 6
  const [otp, setOtp] = useState(Array.from({ length: otpLength }, () => ''))
  const [error, setError] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(45)
  const inputRefs = useRef([])

  const safeEmail = email || 'your email'

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = setInterval(() => setSecondsLeft((current) => current - 1), 1000)
    return () => clearInterval(timer)
  }, [secondsLeft])

  const timeLabel = useMemo(() => {
    const mins = Math.floor(secondsLeft / 60)
    const secs = secondsLeft % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }, [secondsLeft])

  const handleChange = (index, value) => {
    const nextValue = value.replace(/\D/g, '').slice(-1)
    setOtp((current) => current.map((digit, digitIndex) => (digitIndex === index ? nextValue : digit)))

    if (nextValue && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (otp.some((digit) => !digit)) {
      setError('Please enter the 6-digit OTP before continuing.')
      return
    }

    setError('')
    onContinue()
  }

  const StepIndicator = () => (
    <div className="mb-6 flex items-start justify-center gap-1 sm:gap-2">
      {['Email', 'OTP', 'New Password', 'Complete'].map((label, index) => {
        const stepNum = index + 1
        const isActive = stepNum === 2
        const isCompleted = stepNum < 2

        return (
          <div key={label} className="flex items-start gap-1 sm:gap-2">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold sm:h-8 sm:w-8 sm:text-sm ${
                  isActive
                    ? 'bg-[#2563EB] text-white'
                    : isCompleted
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-white text-[#64748B] ring-1 ring-[#E2E8F0]'
                }`}
              >
                {isCompleted ? <FaCheckCircle className="h-3 w-3 sm:h-4 sm:w-4" /> : stepNum}
              </div>
              <p
                className={`mt-1.5 text-[10px] font-medium sm:mt-2 sm:text-[11px] ${
                  isActive || isCompleted ? 'text-[#0F172A]' : 'text-[#94A3B8]'
                }`}
              >
                {label}
              </p>
            </div>
            {index < 3 && <div className="mt-3 h-px w-5 bg-[#E2E8F0] sm:mt-4 sm:w-8" />}
          </div>
        )
      })}
    </div>
  )

  return (
    <>
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
        <FaLock className="h-10 w-10" />
      </div>

      <div className="mb-6 text-center">
        <h2 className="text-base font-semibold text-[#0F172A]">Forgot Password</h2>
      </div>

      <StepIndicator />

      <div className="mb-6 text-center">
        <h3 className="text-lg font-bold text-[#0F172A]">Verify OTP</h3>
        <p className="mt-2 text-sm text-[#64748B]">We've sent a 6-digit OTP to</p>
        <p className="mt-1 break-all text-sm font-semibold text-[#2563EB]">{safeEmail}</p>
      </div>

      {error ? (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-[#EF4444]">
          {error}
        </div>
      ) : null}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <p className="mb-3 text-sm font-medium text-[#0F172A]">Enter the 6-digit code</p>
          <div className="flex items-center justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              aria-label={`Reset OTP digit ${index + 1}`}
              className={otpClasses}
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(node) => {
                inputRefs.current[index] = node
              }}
            />
          ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="text-[#64748B]">Didn't receive the code?</span>
          <button
            type="button"
            className={textButtonClasses}
            disabled={secondsLeft > 0}
            onClick={() => {
              if (secondsLeft > 0) return
              setSecondsLeft(45)
            }}
          >
            Resend OTP {secondsLeft > 0 ? `(${timeLabel})` : ''}
          </button>
        </div>

        <button type="button" className={outlineButtonClasses} onClick={onBack}>
          Go Back
        </button>

        <button type="submit" className={primaryButtonClasses}>
          Verify OTP
        </button>
      </form>
    </>
  )
}

export default EnterOTP
