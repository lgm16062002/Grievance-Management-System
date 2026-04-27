const Step3Complete = ({ primaryButtonClasses, fullName, onBackToLogin }) => {
  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-2xl font-bold text-[#22C55E] ring-1 ring-emerald-100">
        OK
      </div>

      <h2 className="text-3xl font-bold tracking-[-0.03em] text-[#0F172A]">Registration Complete</h2>
      <p className="mt-3 text-sm leading-6 text-[#64748B]">
        {fullName
          ? `${fullName}, your account has been created successfully.`
          : 'Your account has been created successfully.'}
      </p>

      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-[#15803D]">
        Email verification is complete. You can now log in and start filing grievances.
      </div>

      <button type="button" className={`${primaryButtonClasses} mt-6`} onClick={onBackToLogin}>
        Go to Login
      </button>
    </div>
  )
}

export default Step3Complete
