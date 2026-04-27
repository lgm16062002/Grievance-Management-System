import { useState } from 'react'
import { FaLock, FaEnvelope, FaCheckCircle } from 'react-icons/fa'
import EnterOTP from './EnterOTP'
import ResetPassword from './ResetPassword'
import Success from './Success'

const ForgotPassword = ({
  inputClasses,
  labelClasses,
  primaryButtonClasses,
  outlineButtonClasses,
  textButtonClasses,
  onBack,
  onComplete,
}) => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleEmailSubmit = (event) => {
    event.preventDefault()

    if (!email) {
      setError('Please enter the email address linked to your account.')
      return
    }

    setError('')
    setStep(2)
  }

  const StepIndicator = () => (
    <div className="mb-6 flex items-start justify-center gap-1 sm:gap-2">
      {['Email', 'OTP', 'New Password', 'Complete'].map((label, index) => {
        const stepNum = index + 1
        const isActive = stepNum === step
        const isCompleted = stepNum < step

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

  if (step === 2) {
    return (
      <EnterOTP
        email={email}
        primaryButtonClasses={primaryButtonClasses}
        outlineButtonClasses={outlineButtonClasses}
        textButtonClasses={textButtonClasses}
        onBack={() => setStep(1)}
        onContinue={() => setStep(3)}
      />
    )
  }

  if (step === 3) {
    return (
      <ResetPassword
        inputClasses={inputClasses}
        labelClasses={labelClasses}
        primaryButtonClasses={primaryButtonClasses}
        outlineButtonClasses={outlineButtonClasses}
        onBack={() => setStep(2)}
        onContinue={() => setStep(4)}
      />
    )
  }

  if (step === 4) {
    return (
      <Success
        primaryButtonClasses={primaryButtonClasses}
        outlineButtonClasses={outlineButtonClasses}
        onDone={onComplete}
      />
    )
  }

  return (
    <>
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
        <FaLock className="h-6 w-6" />
      </div>

      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold tracking-tight text-[#0F172A]">Forgot Password</h2>
        <p className="mt-0.5 text-xs text-[#64748B]">Reset your account password</p>
      </div>

      <StepIndicator />

      {error ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-[#EF4444]">
          {error}
        </div>
      ) : null}

      <form className="space-y-4" onSubmit={handleEmailSubmit}>
        <div>
          <label htmlFor="forgot-email" className="mb-1 block text-xs font-medium text-[#0F172A]">
            Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#94A3B8]">
              <FaEnvelope className="h-4 w-4" />
            </div>
            <input
              id="forgot-email"
              type="email"
              placeholder="Enter your registered email"
              className="h-10 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 pl-10 text-xs text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-1 focus:ring-blue-100"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="h-10 w-full rounded-lg bg-[#2563EB] text-xs font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]">
          Send OTP
        </button>

        <p className="pt-1 text-center text-[11px] text-[#64748B]">
          Remember your password?{' '}
          <button type="button" className="font-semibold text-[#2563EB] transition hover:text-[#1D4ED8]" onClick={onBack}>
            Sign In
          </button>
        </p>
      </form>
    </>
  )
}

export default ForgotPassword
