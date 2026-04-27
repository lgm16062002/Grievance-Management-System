import { FaUser, FaEnvelope, FaCheck, FaHeadset, FaChevronRight, FaThLarge } from 'react-icons/fa'

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
        {isCompleted || step === 3 ? <FaCheck className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
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

const Step3Complete = ({ fullName, onBackToLogin }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Header Icon */}
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F5F9] text-[#2563EB]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V18C2 19.1 2.9 20 4 20H18L22 24V4C22 2.9 21.1 2 20 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M7 9H17M7 13H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      <h2 className="text-base font-bold text-[#0F172A]">Registration Complete</h2>
      <p className="mt-0.5 text-center text-[10px] text-[#64748B]">
        Account created successfully!
      </p>

      {/* Stepper */}
      <div className="my-3 flex items-center justify-center gap-2.5">
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#94A3B8]">
            <FaUser className="h-2.5 w-2.5" />
          </div>
          <span className="text-[9px] font-medium text-[#94A3B8]">Details</span>
        </div>
        <div className="mb-3 h-px w-6 border-t border-dashed border-[#E2E8F0]" />
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#94A3B8]">
            <FaEnvelope className="h-2.5 w-2.5" />
          </div>
          <span className="text-[9px] font-medium text-[#94A3B8]">Verify</span>
        </div>
        <div className="mb-3 h-px w-6 border-t border-dashed border-[#E2E8F0]" />
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#2563EB] bg-[#2563EB] text-white">
            <FaCheck className="h-2.5 w-2.5" />
          </div>
          <span className="text-[9px] font-medium text-[#2563EB]">Done</span>
        </div>
      </div>

      {/* Success Illustration */}
      <div className="relative mb-4 flex items-center justify-center">
        <div className="absolute h-20 w-20 animate-ping rounded-full bg-green-100 opacity-20"></div>
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-md shadow-green-100">
          <FaCheck className="h-7 w-7" />
        </div>
      </div>

      <div className="mb-4 text-center">
        <h3 className="text-sm font-bold text-[#0F172A]">Welcome to the System!</h3>
        <p className="mt-1 text-[10px] leading-relaxed text-[#64748B]">
          You can now start submitting and tracking grievances.
        </p>
      </div>

      <div className="w-full space-y-2">
        <button
          onClick={() => window.location.href = '/student/dashboard'}
          className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] text-[11px] font-semibold text-white shadow-sm transition hover:bg-[#1E40AF]"
        >
          <FaThLarge className="h-3 w-3" />
          Go to Dashboard
        </button>
        <button
          onClick={onBackToLogin}
          className="h-9 w-full rounded-lg border border-[#E2E8F0] bg-white text-[11px] font-semibold text-[#475569] transition hover:bg-gray-50"
        >
          Sign In Again
        </button>
      </div>

      {/* Help Note */}
      <button className="mt-5 flex w-full items-center justify-between rounded-lg bg-[#F8FAFC] p-2.5 text-left transition hover:bg-[#F1F5F9]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-sm">
            <FaHeadset className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-[9px] font-medium text-[#64748B]">Need help?</p>
            <p className="text-[10px] font-bold text-[#2563EB]">Contact Helpdesk</p>
          </div>
        </div>
        <FaChevronRight className="h-3 w-3 text-[#94A3B8]" />
      </button>
    </div>

  )
}

export default Step3Complete

