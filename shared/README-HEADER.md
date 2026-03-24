# Jak dodać pasek PromoTraffic do innego narzędzia

## Krok 1: Skopiuj komponent

Skopiuj plik `PromoTrafficAppHeader.tsx` do swojego projektu (np. do `components/`).

## Krok 2: Zmienne środowiskowe

W `.env` lub w Coolify dodaj:

```
NEXT_PUBLIC_TOOLS_JSON=[{"id":"mediapulse","name":"MediaPulse","description":"...","url":""},{"id":"product-gen","name":"PROduct GEN","description":"...","url":"https://product-gen.example.com"},...]
NEXT_PUBLIC_LANDING_URL=https://agent.promotraffic.pl
```

- **NEXT_PUBLIC_TOOLS_JSON** — ten sam JSON co na stronie agenta (lista narzędzi)
- **NEXT_PUBLIC_LANDING_URL** — adres strony agenta (landing + admin)

## Krok 3: Kolory Tailwind (jeśli ich nie masz)

Dodaj do `globals.css` lub `tailwind.config`:

```css
:root {
  --pt-black: #0f0f0f;
  --pt-yellow: #ffd500;
  --pt-muted: #8f9599;
  --pt-light: #c1cacf;
  --pt-surface: #1c1c1c;
  --pt-border: #5d6062;
}
```

Komponent używa `var(--pt-*)`, więc działa też bez tych zmiennych (są fallbacki).

## Krok 4: Użycie w layoucie

```tsx
import { PromoTrafficAppHeader } from "@/components/PromoTrafficAppHeader";

export default function Layout({ children }) {
  return (
    <>
      <PromoTrafficAppHeader
        user={{ email: "user@example.com" }}
        onLogout={() => { /* twoja logika wylogowania */ }}
      />
      <main>{children}</main>
    </>
  );
}
```

Bez logowania:

```tsx
<PromoTrafficAppHeader />
```

## Opcjonalnie: inny URL landingu

```tsx
<PromoTrafficAppHeader
  landingUrl="https://moja-strona-agenta.pl"
  user={user}
  onLogout={handleLogout}
/>
```
