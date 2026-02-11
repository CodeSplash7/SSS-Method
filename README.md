# SSS-method (Soviet Strength Secrets)

SSS-method este o aplicație web de fitness construită cu **Next.js + TypeScript**, inspirată din ideea unei metode sovietice de antrenament pentru forță.

Proiectul a pornit ca un generator de antrenamente personalizate în funcție de obiective și nivel, iar în stadiul actual include în principal:

- UI modern + animații complexe (GSAP + tranziții între ecrane)
- autentificare cu Clerk
- flow de questionnaire (power-level form)
- validări de input/flow la nivel de UI
- persistare date utilizator în MongoDB (Mongoose)
- utilitare pentru calcule de volum și metrici de performanță

> **Status actual:** partea de afișare efectivă a antrenamentelor/exercițiilor nu este finalizată încă.

---

## Stack tehnologic

- **Framework:** Next.js 15 (App Router)
- **Limbaj:** TypeScript
- **UI:** React 18 + Tailwind CSS
- **Animații:** GSAP
- **Auth:** Clerk
- **DB:** MongoDB Atlas + Mongoose
- **Charts:** Chart.js + react-chartjs-2

---

## Funcționalități implementate

### 1) Landing + onboarding vizual
- homepage cu efect de parallax și tranziții animate;
- navigare către zona de autentificare/dashboard.

### 2) Autentificare
- integrare Clerk (`SignedIn`, `SignedOut`, `SignUpButton`, `currentUser`);
- middleware pentru protecția rutelor și integrare cu App Router.

### 3) Dashboard bootstrap
- la primul login se creează automat un user în MongoDB;
- userul primește profil de bază (ex: Pullups / Dips) și date inițiale.

### 4) Questionnaire / Power Level Form
- flow pe întrebări cu opțiuni și animații;
- progres vizual pe pași;
- stocare răspunsuri în query params și continuare către „plan-ready”.

### 5) Metrici de forță
- utilitare pentru calcul de:
  - power level,
  - reps estimate,
  - fatigue.

---

## Cerințe locale

Pentru rulare locală ai nevoie de:

- **Node.js** (recomandat 18+)
- **npm**

---

## Configurare mediu (`.env.local`)

1. Copiază fișierul de exemplu:

```bash
cp .env.example .env.local
```

2. Verifică/editează valorile în `.env.local`.

3. Variabile necesare:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
MONGODB_URI=...
```

---

## Instalare și rulare

```bash
npm install
npm run dev
```

Aplicația pornește pe:

- `http://localhost:3000`

---

## Scripturi disponibile

- `npm run dev` – pornește serverul Next.js în development
- `npm run build` – build de producție
- `npm run start` – rulează build-ul de producție
- `npm run lint` – linting cu configurația Next.js

---

## Rute principale

- `/` – homepage
- `/assessment` – secțiunea de prezentare (training context)
- `/power-level-form` – questionnaire pentru nivelul de forță
- `/plan-ready` – ecran intermediar după completarea formularului
- `/dashboard` – dashboard utilizator autentificat

---

## Structură proiect (pe scurt)

```text
src/
  app/                # rute App Router
  components/         # componente UI
  page-components/    # compoziție pe pagini
  animations/         # animații GSAP
  general-utils/      # utilitare (routing helper, metrici etc.)
  hooks/              # hook-uri custom
  layouts/            # layout-uri reutilizabile
  lib/                # conexiune DB
  models/             # modele mongoose
  types/              # tipuri TS
  middleware.ts       # clerk middleware
```

---

## Observații importante

- Proiectul este orientat puternic pe experiența vizuală și flow-ul de onboarding.
- Logica completă de generare/afișare a programului final de exerciții este încă în lucru.
- Pentru funcționare corectă local, trebuie configurat **`.env.local`** pe baza **`.env.example`**.

---

## Posibile îmbunătățiri (next steps)

- implementare motor complet de generare program antrenament;
- persistare completă răspunsuri questionnaire în DB;
- validări suplimentare + testare automată;
- dashboard cu progres real pe utilizator;
- secțiune de exerciții cu prescriere de volum și progresii.

---

## Nume proiect

**SSS-method = Soviet Strength Secrets**

O aplicație fitness orientată către dezvoltarea forței, inspirată din abordări sovietice de progresie.
