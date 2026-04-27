import { useState } from 'react'
import { FaIdCard, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

const Step1Details = ({ onSubmit, onBack }) => {
  const [values, setValues] = useState({
    registrationNumber: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  })
  const [error, setError] = useState('')
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

    if (!values.registrationNumber || !values.fullName || !values.email || !values.password || !values.confirmPassword) {
      setError('Please fill in all registration details.')
      return
    }

    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!values.agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy.')
      return
    }

    setError('')
    onSubmit(values)
  }

  const inputClasses = 'h-12 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 pl-12 text-sm text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100'
  const labelClasses = 'mb-2 block text-sm font-semibold text-[#0F172A]'

  return (
    <>
      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2563EB]/10">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V18C2 19.1 2.9 20 4 20H18L22 24V4C22 2.9 21.1 2 20 2Z" stroke="#2563EB" strokeWidth="2" fill="none"/>
            <circle cx="9" cy="12" r="2" fill="#2563EB"/>
            <circle cx="15" cy="12" r="2" fill="#2563EB"/>
          </svg>
        </div>
      </div>

      {/* Title */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Create Your Student Account</h2>
        <p className="mt-2 text-sm text-[#64748B]">
          Register to get started with the Grievance Management System
        </p>
      </div>

      {/* Error */}
      {error ? (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-[#EF4444]">
          {error}
        </div>
      ) : null}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Registration Number */}
        <div>
          <label htmlFor="registration-number" className={labelClasses}>
            Registration Number
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#94A3B8]">
              <FaIdCard className="h-4 w-4" />
            </div>
            <input
              id="registration-number"
              name="registrationNumber"
              type="text"
              placeholder="Enter your registration number"
              className={inputClasses}
              value={values.registrationNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="full-name" className={labelClasses}>
            Full Name
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#94A3B8]">
              <FaUser className="h-4 w-4" />
            </div>
            <input
              id="full-name"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              className={inputClasses}
              value={values.fullName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="register-email" className={labelClasses}>
            Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#94A3B8]">
              <FaEnvelope className="h-4 w-4" />
            </div>
            <input
              id="register-email"
              name="email"
              type="email"
              placeholder="Enter your college email"
              className={inputClasses}
              value={values.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="register-password" className={labelClasses}>
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#94A3B8]">
              <FaLock className="h-4 w-4" />
            </div>
            <input
              id="register-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              className={`${inputClasses} pr-12`}
              value={values.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-4 text-[#94A3B8] transition hover:text-[#2563EB]"
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? (
                <FaEye className="h-4 w-4" />
              ) : (
                <FaEyeSlash className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirm-password" className={labelClasses}>
            Confirm Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#94A3B8]">
              <FaLock className="h-4 w-4" />
            </div>
            <input
              id="confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              className={`${inputClasses} pr-12`}
              value={values.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-4 text-[#94A3B8] transition hover:text-[#2563EB]"
              onClick={() => setShowConfirmPassword((current) => !current)}
            >
              {showConfirmPassword ? (
                <FaEye className="h-4 w-4" />
              ) : (
                <FaEyeSlash className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 py-1">
          <input
            id="agree-terms"
            name="agreeToTerms"
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB] focus:ring-[#2563EB]"
            checked={values.agreeToTerms}
            onChange={handleChange}
          />
          <label htmlFor="agree-terms" className="text-sm text-[#64748B]">
            I agree to the{' '}
            <a href="#" className="font-semibold text-[#2563EB] hover:text-[#1D4ED8]">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="font-semibold text-[#2563EB] hover:text-[#1D4ED8]">Privacy Policy</a>
          </label>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-[#2563EB] text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.6)] transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          Register Now
        </button>

        {/* Sign In Link */}
        <p className="pt-2 text-center text-sm text-[#64748B]">
          Already have an account?{' '}
          <button
            type="button"
            className="font-semibold text-[#2563EB] transition hover:text-[#1D4ED8]"
            onClick={onBack}
          >
            Sign In
          </button>
        </p>
      </form>
    </>
  )
}

export default Step1Details
