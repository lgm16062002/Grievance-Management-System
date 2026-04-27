import { FaCheckCircle, FaStar } from 'react-icons/fa'

const Success = ({ primaryButtonClasses, outlineButtonClasses, onDone }) => {
  return (
    <div className="text-center">
      <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
        <div className="absolute -left-3 -top-1 text-[#F59E0B]">
          <FaStar className="h-3 w-3" />
        </div>
        <div className="absolute -right-2 -top-2 text-[#F59E0B]">
          <FaStar className="h-3 w-3" />
        </div>
        <div className="absolute -left-1 top-10 text-[#3B82F6]">
          <FaStar className="h-2 w-2" />
        </div>
        <div className="absolute -right-3 top-8 text-[#3B82F6]">
          <FaStar className="h-2 w-2" />
        </div>
        <div className="absolute left-14 -top-2 text-[#10B981]">
          <FaStar className="h-2 w-2" />
        </div>
        <div className="absolute left-16 top-10 text-[#F59E0B]">
          <FaStar className="h-2 w-2" />
        </div>
        <div className="absolute -left-4 top-4 text-[#3B82F6]">
          <FaStar className="h-2.5 w-2.5" />
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#22C55E]">
          <FaCheckCircle className="h-8 w-8 text-white" />
        </div>
      </div>

      <h2 className="text-xl font-bold tracking-[-0.02em] text-[#0F172A]">Password Reset Successful!</h2>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#64748B]">
        Your password has been reset successfully.
        <br />
        You can now sign in with your new password.
      </p>

      <div className="mt-8 space-y-3">
        <button type="button" className={primaryButtonClasses} onClick={onDone}>
          Go to Sign In
        </button>
        <button
          type="button"
          className={`${outlineButtonClasses} border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#2563EB]`}
          onClick={() => console.log('Back to Home clicked')}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default Success
