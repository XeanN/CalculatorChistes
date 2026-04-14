'use client'

interface DisplayProps {
  expression: string
  result: number | null
  error: string
}

export default function Display({ expression, result, error }: DisplayProps) {
  return (
    <div className="bg-[#111114] rounded-2xl border border-[#2C2C2E] p-4 mb-3 min-h-[80px] flex flex-col justify-end">
      <p className="text-white/40 text-sm text-right min-h-[20px] truncate">
        {expression || '0'}
      </p>
      {result !== null && (
        <p className="text-white text-3xl font-light text-right">
          = {result}
        </p>
      )}
      {error && (
        <p className="text-[#06B6D4] text-sm text-right">{error}</p>
      )}
    </div>
  )
}