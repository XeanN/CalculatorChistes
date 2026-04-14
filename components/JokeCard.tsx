'use client'
import { useState } from 'react'
import { Joke } from '@/types'

interface JokeCardProps {
  joke: Joke
  onReaction: (reaction: 'up' | 'down') => void
}

export default function JokeCard({ joke, onReaction }: JokeCardProps) {
  const [reacted, setReacted] = useState<'up' | 'down' | null>(null)

  const handleReaction = (r: 'up' | 'down') => {
    if (reacted) return
    setReacted(r)
    onReaction(r)
  }

  return (
    <div className="mt-4 rounded-2xl border border-[#7C3AED]/50 bg-[#0D0D1A] p-4 animate-fade-in">
      <div className="flex items-start gap-2 mb-3">
        <span className="text-[#7C3AED] text-xl">🎭</span>
        <p className="text-white/90 text-sm leading-relaxed">{joke.text}</p>
      </div>
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => handleReaction('up')}
          className={`px-3 py-1 rounded-lg text-sm transition-all ${
            reacted === 'up'
              ? 'bg-[#7C3AED] text-white'
              : 'bg-[#1C1C2E] text-white/50 hover:text-white'
          }`}
        >
          👍
        </button>
        <button
          onClick={() => handleReaction('down')}
          className={`px-3 py-1 rounded-lg text-sm transition-all ${
            reacted === 'down'
              ? 'bg-[#1A3A3A] text-[#06B6D4]'
              : 'bg-[#1C1C2E] text-white/50 hover:text-white'
          }`}
        >
          👎
        </button>
      </div>
    </div>
  )
}