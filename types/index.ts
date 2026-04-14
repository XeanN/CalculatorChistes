export interface Joke {
  id: string
  text: string
  category_id: number
  category?: { name: string }
}

export interface Reaction {
  joke_id: string
  reaction: 'up' | 'down'
}

export type CalcOperation = {
  expression: string
  result: number
}