# 🎭 JokeCalc

> La calculadora que te hace reír — cada operación viene con un chiste random.

![JokeCalc Preview](https://calculator-chistes-jkim.vercel.app/og.png)

## 🌐 Demo en vivo

**[calculator-chistes-jkim.vercel.app](https://calculator-chistes-jkim.vercel.app)**

---

## ✨ ¿Qué hace?

JokeCalc es una calculadora web que, cada vez que presionas `=`, además del resultado matemático te muestra un chiste random de la base de datos. Puedes reaccionar con 👍 o 👎 a cada chiste.

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| Base de datos | PostgreSQL via Supabase |
| Deploy | Vercel |
| Repositorio | GitHub |

---

## 🗂️ Estructura del proyecto

```
CalculatorChistes/
├── app/
│   ├── page.tsx              ← página principal
│   ├── layout.tsx
│   ├── globals.css
│   └── api/
│       ├── joke/route.ts     ← POST: evalúa operación y devuelve chiste random
│       ├── jokes/route.ts    ← GET: historial de chistes
│       └── reaction/route.ts ← POST: registra 👍/👎
├── components/
│   ├── Calculator.tsx        ← layout principal y estado
│   ├── Display.tsx           ← pantalla con resultado
│   ├── Key.tsx               ← botón reutilizable
│   └── JokeCard.tsx          ← card animada del chiste
├── lib/
│   ├── supabase.ts           ← cliente Supabase
│   └── evaluator.ts          ← evalúa expresiones matemáticas
└── types/
    └── index.ts              ← tipos: Joke, Reaction, CalcOperation
```

---

## 🗄️ Base de datos — Supabase

**Proyecto:** `CalculatorChistes`  
**URL:** `https://omedmhllfqjyrbjkogbg.supabase.co`  
**Region:** South America

### Schema

```sql
-- Categorías de chistes
create table joke_categories (
  id serial primary key,
  name text not null  -- "matemáticas", "programación", "general"
);

-- Chistes
create table jokes (
  id uuid default gen_random_uuid() primary key,
  text text not null,
  category_id int references joke_categories(id),
  created_at timestamptz default now()
);

-- Reacciones (tracking de popularidad)
create table reactions (
  id uuid default gen_random_uuid() primary key,
  joke_id uuid references jokes(id),
  reaction text check (reaction in ('up', 'down')),
  created_at timestamptz default now()
);
```

---

## 🚀 Deploy — Vercel

**URL de producción:** `calculator-chistes-jkim.vercel.app`  
**Branch de producción:** `main`  
**CI/CD:** Automático — cada `git push` a `main` genera un nuevo deploy

### Variables de entorno en Vercel

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable key de Supabase |

---

## ⚙️ Correr localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/XeanN/CalculatorChistes.git
cd CalculatorChistes
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz:

```env
NEXT_PUBLIC_SUPABASE_URL=https://omedmhllfqjyrbjkogbg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_publishable_key_aqui
```

### 4. Correr el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📡 API Endpoints

### `POST /api/joke`
Evalúa una expresión matemática y devuelve un chiste random.

**Body:**
```json
{ "expression": "5 * 5" }
```

**Response:**
```json
{
  "result": 25,
  "joke": {
    "id": "uuid",
    "text": "¿Por qué los matemáticos no pueden manejar?...",
    "joke_categories": { "name": "matemáticas" }
  }
}
```

### `GET /api/jokes`
Devuelve el historial de chistes ordenado por fecha.

### `POST /api/reaction`
Registra una reacción a un chiste.

**Body:**
```json
{ "joke_id": "uuid", "reaction": "up" }
```

---

## 🔄 Flujo de la aplicación

```
Usuario escribe operación
        ↓
Presiona "="
        ↓
POST /api/joke
        ↓
Evalúa expresión → selecciona chiste random de Supabase
        ↓
Muestra resultado + chiste con animación
        ↓
Usuario reacciona 👍/👎 → POST /api/reaction → guarda en Supabase
```

---

## 🎨 Paleta de colores

| Uso | Color |
|-----|-------|
| Fondo principal | `#0D0D0D` |
| Teclas numéricas | `#1C1C1E` |
| Acento violeta | `#7C3AED` |
| Acento cyan | `#06B6D4` |
| Card de chiste | `#0D0D1A` |

---

## 👤 Autor

**Angel (XeanN)**  
GitHub: [@XeanN](https://github.com/XeanN)

---

## 📝 Licencia

MIT — úsalo como quieras.