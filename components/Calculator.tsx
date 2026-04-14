'use client'
import { useState } from 'react'
import Key from './Key'
import JokeCard from './JokeCard'
import { Joke } from '@/types'

export default function Calculator() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [joke, setJoke] = useState<Joke | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const press = (value: string) => {
    setError('')
    setExpression(prev => prev + value)
  }

  const clear = () => {
    setExpression('')
    setResult(null)
    setJoke(null)
    setError('')
  }

  const backspace = () => {
    setExpression(prev => prev.slice(0, -1))
  }

  const calculate = async () => {
    if (!expression) return
    setLoading(true)
    setJoke(null)

    try {
      const res = await fetch('/api/joke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression })
      })
      const data = await res.json()

      if (!res.ok) {
        setError('Expresión inválida')
        setLoading(false)
        return
      }

      setResult(data.result)
      setJoke(data.joke)
      setExpression(String(data.result))
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  const handleReaction = async (reaction: 'up' | 'down') => {
    if (!joke) return
    await fetch('/api/reaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ joke_id: joke.id, reaction })
    })
  }

  const keys = [
    { label: 'C',  action: clear,              variant: 'clear'    as const },
    { label: '⌫',  action: backspace,           variant: 'clear'    as const },
    { label: '%',  action: () => press('%'),    variant: 'operator' as const },
    { label: '÷',  action: () => press('/'),    variant: 'operator' as const },
    { label: '7',  action: () => press('7') },
    { label: '8',  action: () => press('8') },
    { label: '9',  action: () => press('9') },
    { label: '×',  action: () => press('*'),    variant: 'operator' as const },
    { label: '4',  action: () => press('4') },
    { label: '5',  action: () => press('5') },
    { label: '6',  action: () => press('6') },
    { label: '-',  action: () => press('-'),    variant: 'operator' as const },
    { label: '1',  action: () => press('1') },
    { label: '2',  action: () => press('2') },
    { label: '3',  action: () => press('3') },
    { label: '+',  action: () => press('+'),    variant: 'operator' as const },
    { label: '.',  action: () => press('.') },
    { label: '0',  action: () => press('0') },
    { label: '=',  action: calculate,           variant: 'equals'   as const, wide: true },
  ]

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Joke<span className="text-[#7C3AED]">Calc</span>
          </h1>
          <p className="text-white/30 text-xs mt-1">La calculadora que te hace reír</p>
        </div>

        {/* Display */}
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

        {/* Loading indicator */}
        {loading && (
          <div className="text-center text-[#7C3AED] text-xs mb-2 animate-pulse">
            buscando el chiste perfecto...
          </div>
        )}

        {/* Joke */}
        {joke && <JokeCard joke={joke} onReaction={handleReaction} />}

        {/* Keys */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {keys.map((key, i) => (
            <Key
              key={i}
              label={key.label}
              onClick={key.action}
              variant={key.variant ?? 'default'}
              wide={key.wide}
            />
          ))}
        </div>
      </div>
    </div>
  )
}