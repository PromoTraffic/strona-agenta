# Jak dodać pasek PromoTraffic do innego narzędzia

## Automatyczna aktualizacja listy narzędzi

Lista narzędzi jest **pobierana automatycznie** z API strony agenta przy każdym załadowaniu. Wystarczy dodać/edytować narzędzia w panelu admina strony agenta — inne narzędzia zobaczą zmiany bez redeployu.

---

## Opcja A: Instalacja z GitHub (bez kopiowania)

```bash
npm install github:PromoTraffic/strona-agenta
```

Import:

```tsx
import { PromoTrafficAppHeader } from "promotraffic-ai-landing/header";
```

## Opcja B: Ręczne kopiowanie

Skopiuj plik `shared/PromoTrafficAppHeader.tsx` do swojego projektu (np. do `components/`).

---

## Krok 2: Zmienna środowiskowa

W `.env` lub w Coolify dodaj:

```
NEXT_PUBLIC_LANDING_URL=https://agent.promotraffic.pl
```

- **NEXT_PUBLIC_LANDING_URL** — adres strony agenta (landing). Nagłówek pobiera listę narzędzi z `{URL}/api/content?key=tools`.

Opcjonalnie **NEXT_PUBLIC_TOOLS_JSON** — fallback, gdy API niedostępne (np. podczas budowania).

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
