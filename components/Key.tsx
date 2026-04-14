'use client'

interface KeyProps {
  label: string
  onClick: () => void
  variant?: 'default' | 'operator' | 'equals' | 'clear'
  wide?: boolean
}

const variants = {
  default: 'bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white border border-[#2C2C2E]',
  operator: 'bg-[#1A1040] hover:bg-[#2A1A60] text-[#A78BFA] border border-[#7C3AED]/40',
  equals:   'bg-[#7C3AED] hover:bg-[#6D28D9] text-white border border-[#7C3AED]',
  clear:    'bg-[#1A2A2A] hover:bg-[#1A3A3A] text-[#06B6D4] border border-[#06B6D4]/40',
}

export default function Key({ label, onClick, variant = 'default', wide = false }: KeyProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${variants[variant]}
        ${wide ? 'col-span-2' : ''}
        rounded-xl text-lg font-medium
        h-14 w-full
        transition-all duration-100
        active:scale-95
        select-none cursor-pointer
      `}
    >
      {label}
    </button>
  )
}