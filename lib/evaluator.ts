export function evaluate(expression: string): number | null {
  try {
    // Limpiamos caracteres peligrosos, solo permitimos números y operadores
    const clean = expression.replace(/[^0-9+\-*/.()%\s]/g, '')
    if (!clean) return null
    const result = Function('"use strict"; return (' + clean + ')')()
    if (!isFinite(result)) return null
    return result
  } catch {
    return null
  }
}