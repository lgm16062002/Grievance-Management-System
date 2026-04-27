import { useState } from 'react'
import Step1Details from './Step1Details'
import Step2VerifyEmail from './Step2VerifyEmail'
import Step3Complete from './Step3Complete'

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

  if (step === 1) {
    return (
      <Step1Details onSubmit={handleDetailsSubmit} onBack={onBack} />
    )
  }

  if (step === 2) {
    return (
      <Step2VerifyEmail
        email={formData.email}
        onBack={() => setStep(1)}
        onVerify={() => setStep(3)}
      />
    )
  }

  return (
    <Step3Complete fullName={formData.fullName} onBackToLogin={onComplete} />
  )
}

export default Register

