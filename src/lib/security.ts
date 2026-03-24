/**
 * Walidacja i pomocnicze funkcje bezpieczeństwa.
 */

const MIN_PASSWORD_LENGTH = 8;
const MAX_EMAIL_LENGTH = 254;
const MAX_CONTENT_BYTES = 500_000; // 500 KB
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): { ok: true } | { ok: false; error: string } {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return { ok: false, error: "Email jest wymagany." };
  if (trimmed.length > MAX_EMAIL_LENGTH) return { ok: false, error: "Email jest za długi." };
  if (!EMAIL_REGEX.test(trimmed)) return { ok: false, error: "Nieprawidłowy format email." };
  return { ok: true };
}

export function validatePassword(password: string): { ok: true } | { ok: false; error: string } {
  if (!password) return { ok: false, error: "Hasło jest wymagane." };
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { ok: false, error: `Hasło musi mieć co najmniej ${MIN_PASSWORD_LENGTH} znaków.` };
  }
  return { ok: true };
}

/** Blokuje javascript:, data: i inne niebezpieczne schematy URL. */
export function isSafeUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return true;
  const lower = trimmed.toLowerCase();
  if (lower.startsWith("javascript:")) return false;
  if (lower.startsWith("data:")) return false;
  if (lower.startsWith("vbscript:")) return false;
  if (lower.startsWith("file:")) return false;
  return true;
}

export function validateContentSize(body: string): { ok: true } | { ok: false; error: string } {
  const bytes = new TextEncoder().encode(body).length;
  if (bytes > MAX_CONTENT_BYTES) {
    return { ok: false, error: `Przekroczono limit rozmiaru (max ${MAX_CONTENT_BYTES / 1000} KB).` };
  }
  return { ok: true };
}

export function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET?.trim();
  if (process.env.NODE_ENV === "production") {
    if (!secret || secret.length < 32) {
      throw new Error(
        "SESSION_SECRET musi być ustawiony w produkcji (min. 32 znaki). Użyj: openssl rand -base64 32",
      );
    }
  }
  return secret || "dev-secret-min-32-characters-long!!";
}
