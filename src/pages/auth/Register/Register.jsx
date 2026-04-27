import { useState } from 'react'
import { FaUser, FaEnvelope, FaCheck } from 'react-icons/fa'
import Step1Details from './Step1Details'
import Step2VerifyEmail from './Step2VerifyEmail'
import Step3Complete from './Step3Complete'

const StepIndicator = ({ step, currentStep, icon: Icon, label }) => {
  const isActive = step === currentStep
  const isCompleted = step < currentStep

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
          isCompleted
            ? 'border-[#2563EB] bg-[#2563EB] text-white'
            : isActive
            ? 'border-[#2563EB] bg-[#2563EB] text-white'
            : 'border-[#E2E8F0] bg-white text-[#94A3B8]'
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span
        className={`text-xs font-medium ${
          isActive || isCompleted ? 'text-[#2563EB]' : 'text-[#94A3B8]'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

const Register = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    registrationNumber: '',
    fullName: '',
    email: '',
    password: '',
  })

  const handleDetailsSubmit = (values) => {
    setFormData(values)
    setStep(2)
  }

  const stepper = (
    <div className="mb-8 flex items-center justify-center gap-6">
      <StepIndicator step={1} currentStep={step} icon={FaUser} label="Account Details" />
      <div className={`h-0.5 w-12 ${step >= 2 ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'}`} />
      <StepIndicator step={2} currentStep={step} icon={FaEnvelope} label="Verify Email" />
      <div className={`h-0.5 w-12 ${step >= 3 ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'}`} />
      <StepIndicator step={3} currentStep={step} icon={FaCheck} label="Complete" />
    </div>
  )

  if (step === 1) {
    return (
      <div>
        {stepper}
        <Step1Details onSubmit={handleDetailsSubmit} onBack={onBack} />
      </div>
    )
  }

  if (step === 2) {
    return (
      <div>
        {stepper}
        <Step2VerifyEmail
          email={formData.email}
          onBack={() => setStep(1)}
          onVerify={() => setStep(3)}
        />
      </div>
    )
  }

  return (
    <div>
      {stepper}
      <Step3Complete fullName={formData.fullName} onBackToLogin={onComplete} />
    </div>
  )
}

export default Register
