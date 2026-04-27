import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import backgroundImage from '../../assets/images/bg-2.png'
import logoImage from '../../assets/images/grievance-logo.png'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import Register from './Register/Register'
import {
  FaHeadset,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaClock,
  FaUsers,
  FaBuilding,
  FaChevronRight,
} from 'react-icons/fa'

const inputClasses =
  'h-12 w-full rounded-lg border border-[#E2E8F0] bg-white px-4 pl-11 text-sm text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100'
const labelClasses = 'mb-2 block text-sm font-medium text-[#0F172A]'
const primaryButtonClasses =
  'h-12 w-full rounded-lg bg-[#2563EB] text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.6)] transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-4 focus:ring-blue-100'
const outlineButtonClasses =
  'flex h-12 w-full items-center justify-center rounded-lg border border-[#CBD5E1] bg-white text-sm font-semibold text-[#0F172A] transition hover:border-[#2563EB] hover:text-[#2563EB] focus:outline-none focus:ring-4 focus:ring-blue-100'
const textButtonClasses =
  'text-sm font-medium text-[#2563EB] transition hover:text-[#1D4ED8] focus:outline-none'

const FeatureIcon = ({ icon: Icon }) => (
  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-[#2563EB] ring-1 ring-[#E2E8F0]/80 shadow-[0_10px_22px_-18px_rgba(15,23,42,0.35)] backdrop-blur-sm">
    <Icon className="h-7 w-7" />
  </div>
)

const BrandLogo = () => (
  <div className="flex items-center gap-3">
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/75 text-[#2563EB] shadow-[0_14px_36px_-20px_rgba(15,23,42,0.35)] ring-1 ring-white/50 backdrop-blur-sm">
      <img src={logoImage} alt="Grievance Management System logo" className="h-9 w-9 object-contain" />
    </div>
    <div>
      <h1 className="text-base font-bold text-[#0F172A] sm:text-lg">Grievance</h1>
      <p className="text-xs font-medium text-[#0F172A]/70 sm:text-sm">Management System</p>
    </div>
  </div>
)

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [view, setView] = useState('login')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((current) => ({ ...current, [name]: value }))
  }

  const handleLogin = (event) => {
    event.preventDefault()
    
    try {
      const user = login(credentials.email, credentials.password)
      
      // Navigate based on role
      const redirects = {
        student: '/student/dashboard',
        hod: '/hod/dashboard',
        admin: '/admin/dashboard',
        faculty: '/student/dashboard'
      }
      navigate(redirects[user.role] || '/')
    } catch (error) {
      alert(error.message);
      console.error('Login failed:', error)
    }
  }

  const renderPanel = () => {
    if (view === 'forgot-password') {
      return (
        <ForgotPassword
          inputClasses={inputClasses}
          labelClasses={labelClasses}
          primaryButtonClasses={primaryButtonClasses}
          outlineButtonClasses={outlineButtonClasses}
          textButtonClasses={textButtonClasses}
          onBack={() => setView('login')}
          onComplete={() => setView('login')}
        />
      )
    }

    if (view === 'register') {
      return (
        <Register
          inputClasses={inputClasses}
          labelClasses={labelClasses}
          primaryButtonClasses={primaryButtonClasses}
          outlineButtonClasses={outlineButtonClasses}
          textButtonClasses={textButtonClasses}
          onBack={() => setView('login')}
          onComplete={() => setView('login')}
        />
      )
    }

    return (
      <>
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
          <img src={logoImage} alt="Grievance Management System logo" className="h-11 w-11 object-contain" />
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-[28px] font-bold tracking-[-0.02em] text-[#0F172A]">Welcome Back</h2>
          <p className="mt-1 text-sm text-[#64748B]">Sign in to your account to continue</p>
          <div className="mx-auto mt-3 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-[#E2E8F0]" />
            <div className="h-1 w-8 rounded-full bg-[#2563EB]" />
            <div className="h-px w-8 bg-[#E2E8F0]" />
          </div>
        </div>


        <form className="mt-6 space-y-5" onSubmit={handleLogin}>
          <div>
            <label htmlFor="login-email" className={labelClasses}>
              Email
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#94A3B8]">
                <FaEnvelope className="h-5 w-5" />
              </div>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className={inputClasses}
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className={labelClasses}>
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#94A3B8]">
                <FaLock className="h-5 w-5" />
              </div>
              <input
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className={`${inputClasses} pr-12`}
                value={credentials.password}
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
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <label className="flex cursor-pointer items-center gap-2.5 text-[#64748B]">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB] focus:ring-[#2563EB]"
                checked={rememberMe}
                onChange={() => setRememberMe((current) => !current)}
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="text-sm font-medium text-[#2563EB] transition hover:text-[#1D4ED8]"
              onClick={() => setView('forgot-password')}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className={primaryButtonClasses}>
            Sign In
          </button>

          <div className="flex items-center gap-4 py-1">
            <div className="h-px flex-1 bg-[#E2E8F0]" />
            <span className="text-sm text-[#94A3B8]">or</span>
            <div className="h-px flex-1 bg-[#E2E8F0]" />
          </div>

          <button
            type="button"
            className="flex h-14 w-full items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-5 text-left transition hover:border-[#BFDBFE] hover:bg-[#EFF6FF]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                <FaHeadset className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#0F172A]">Need help or having trouble?</p>
                <p className="text-sm font-medium text-[#2563EB]">Contact Helpdesk</p>
              </div>
            </div>
            <FaChevronRight className="h-5 w-5 text-[#94A3B8]" />
          </button>

          <p className="pt-2 text-center text-sm text-[#64748B]">
            Don't have an account?{' '}
            <button
              type="button"
              className="font-semibold text-[#2563EB] transition hover:text-[#1D4ED8]"
              onClick={() => setView('register')}
            >
              Register Now
            </button>
          </p>
        </form>
      </>
    )
  }

  return (
    <main className="relative h-screen overflow-hidden bg-[#F8FAFC]">
      <img
        src={backgroundImage}
        alt="University campus walkway with students and greenery"
        className="absolute  h-full w-full object-cover"
      />

      <div className="relative grid h-screen grid-cols-1 lg:grid-cols-[50%_50%] xl:grid-cols-[55%_45%]">
        <section className="relative hidden h-full lg:block">
          <div className="relative flex h-full flex-col px-6 pb-6 pt-5 md:px-10 md:pb-8 md:pt-6 lg:px-12 lg:pb-8 lg:pt-6 xl:px-20 xl:pb-10 xl:pt-8">
            <div className="pt-2">
              <BrandLogo />
            </div>

            <div className="flex flex-1 items-center">
              <div className="max-w-lg text-left">
                <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-[#0F172A] lg:text-4xl xl:text-5xl">
                  <span className="block">Your Voice.</span>
                  <span className="block text-[#2563EB]">Our Commitment.</span>
                </h2>

                <div className="mt-3 h-1 w-10 rounded-full bg-[#2563EB]" />

                <p className="mt-3 max-w-md text-sm leading-5 text-[#0F172A]/70 lg:leading-6">
                  A smart and transparent platform to submit, track, and resolve grievances efficiently. Together, let's build a better campus experience.
                </p>

                <div className="mt-4 grid gap-3 lg:mt-6 lg:gap-4">
                  <div className="flex items-start gap-3 text-[#0F172A] lg:gap-4">
                    <FeatureIcon icon={FaShieldAlt} />
                    <div className="pt-0.5">
                      <p className="text-xs font-semibold lg:text-sm">Secure &amp; Confidential</p>
                      <p className="mt-0.5 text-xs leading-4 text-[#0F172A]/60 lg:mt-1 lg:text-sm lg:leading-5">
                        Your information is safe and protected with us.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-[#0F172A] lg:gap-4">
                    <FeatureIcon icon={FaClock} />
                    <div className="pt-0.5">
                      <p className="text-xs font-semibold lg:text-sm">Track in Real-Time</p>
                      <p className="mt-0.5 text-xs leading-4 text-[#0F172A]/60 lg:mt-1 lg:text-sm lg:leading-5">
                        Stay updated on the status of your grievance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-[#0F172A] lg:gap-4">
                    <FeatureIcon icon={FaUsers} />
                    <div className="pt-0.5">
                      <p className="text-xs font-semibold lg:text-sm">Better Together</p>
                      <p className="mt-0.5 text-xs leading-4 text-[#0F172A]/60 lg:mt-1 lg:text-sm lg:leading-5">
                        Let's work together to build a better and safer environment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex max-w-sm items-start gap-3 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] px-4 py-4 text-white shadow-[0_22px_60px_-34px_rgba(15,23,42,0.55)] lg:gap-4 lg:rounded-3xl lg:px-6 lg:py-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/25 lg:h-12 lg:w-12 lg:rounded-2xl">
                <FaBuilding className="h-6 w-6 text-white lg:h-7 lg:w-7" />
              </div>
              <div>
                <p className="text-xs font-semibold lg:text-sm">Every voice matters.</p>
                <p className="mt-0.5 text-xs leading-4 text-white/85 lg:mt-1 lg:text-sm lg:leading-5">
                  Together we create a respectful and inclusive campus.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex h-full items-center justify-center px-4 py-6 sm:px-6 md:px-8 lg:px-12 lg:py-0">
          <div className="w-full max-w-[420px] rounded-2xl border border-white/60 bg-white p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.25)] sm:max-w-[440px] sm:rounded-3xl sm:p-8 lg:p-10 overflow-y-auto max-h-full">
            {renderPanel()}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login
