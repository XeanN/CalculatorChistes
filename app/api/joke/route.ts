import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { evaluate } from '@/lib/evaluator'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  const { expression } = await req.json()

  const result = evaluate(expression)
  if (result === null) {
    return NextResponse.json({ error: 'Expresión inválida' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('jokes')
    .select('id, text, joke_categories(name)')
    .order('random()')  // <- el random mágico
    .limit(1)
    .single()

  if (error || !data) {
    // Fallback si la DB falla
    return NextResponse.json({
      result,
      joke: { id: 'fallback', text: '¿Por qué los matemáticos no pueden manejar? Porque siempre se pasan de la raya.' }
    })
  }

  return NextResponse.json({ result, joke: data })
}