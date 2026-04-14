import { supabase } from '@/lib/supabase'

export default async function TestDB() {
  const { data: jokes, error } = await supabase
    .from('jokes')
    .select('id, text, joke_categories(name)')
    .limit(5)

  if (error) {
    return (
      <div style={{ padding: 20, color: 'red', fontFamily: 'monospace' }}>
        <p>Error: {error.message}</p>
        <p>Hint: {error.hint}</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 20, fontFamily: 'monospace', background: '#0D0D0D', color: 'white', minHeight: '100vh' }}>
      <h2 style={{ color: '#7C3AED' }}>Conexión exitosa ✓</h2>
      <p style={{ color: '#06B6D4' }}>{jokes?.length} chistes encontrados:</p>
      {jokes?.map((j: any) => (
        <div key={j.id} style={{ marginBottom: 12, padding: 12, border: '1px solid #2C2C2E', borderRadius: 8 }}>
          <p style={{ margin: 0 }}>{j.text}</p>
          <small style={{ color: '#7C3AED' }}>{j.joke_categories?.name}</small>
        </div>
      ))}
    </div>
  )
}