import { useState } from 'react'
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaCircle } from 'react-icons/fa'

const ResetPassword = ({
  inputClasses,
  labelClasses,
  primaryButtonClasses,
  outlineButtonClasses,
  onBack,
  onContinue,
}) => {
  const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setPasswords((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!passwords.password || !passwords.confirmPassword) {
      setError('Enter and confirm your new password.')
      return
    }

    if (passwords.password !== passwords.confirmPassword) {
      setError('Passwords do not match. Please try again.')
      return
    }

    setError('')
    onContinue()
  }

  const pwd = passwords.password
  const requirements = [
    { label: 'At least 8 characters long', met: pwd.length >= 8 },
    { label: 'Includes uppercase and lowercase letters', met: /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) },
    { label: 'Includes a number or special character', met: /[0-9!@#$%^&*]/.test(pwd) },
  ]

  const StepIndicator = () => (
    <div className="mb-6 flex items-start justify-center gap-1 sm:gap-2">
      {['Email', 'OTP', 'New Password', 'Complete'].map((label, index) => {
        const stepNum = index + 1
        const isActive = stepNum === 3
        const isCompleted = stepNum < 3

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
        <h3 className="text-lg font-bold text-[#0F172A]">Create New Password</h3>
        <p className="mt-1 text-sm text-[#64748B]">Enter your new password below.</p>
      </div>

      {error ? (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-[#EF4444]">
          {error}
        </div>
      ) : null}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="new-password" className={labelClasses}>
            New Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#94A3B8]">
              <FaLock className="h-5 w-5" />
            </div>
            <input
              id="new-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              className={`${inputClasses} pr-12`}
              value={passwords.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-4 text-[#94A3B8] transition hover:text-[#2563EB]"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <FaEye className="h-5 w-5" />
              ) : (
                <FaEyeSlash className="h-5 w-5" />
              )}
            </button>
          </div>

          <ul className="mt-3 space-y-1.5">
            {requirements.map((req) => (
              <li key={req.label} className="flex items-center gap-2 text-sm text-[#64748B]">
                {req.met ? (
                  <FaCheckCircle className="h-4 w-4 shrink-0 text-[#10B981]" />
                ) : (
                  <FaCircle className="h-2 w-2 shrink-0 text-[#CBD5E1]" />
                )}
                <span className={req.met ? 'text-[#0F172A]' : ''}>{req.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label htmlFor="confirm-password" className={labelClasses}>
            Re-enter New Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#94A3B8]">
              <FaLock className="h-5 w-5" />
            </div>
            <input
              id="confirm-password"
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Re-enter new password"
              className={`${inputClasses} pr-12`}
              value={passwords.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-4 text-[#94A3B8] transition hover:text-[#2563EB]"
              onClick={() => setShowConfirm((current) => !current)}
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? (
                <FaEye className="h-5 w-5" />
              ) : (
                <FaEyeSlash className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <button type="submit" className={primaryButtonClasses}>
          Continue
        </button>

        <button type="button" className={outlineButtonClasses} onClick={onBack}>
          Go Back
        </button>
      </form>
    </>
  )
}

export default ResetPassword
