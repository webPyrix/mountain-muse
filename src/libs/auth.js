const encoder = new TextEncoder();
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

function getSecret() {
  return process.env.SESSION_SECRET || "dev-secret-change-me";
}

async function getKey() {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBuffer(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

export async function createSessionToken(username) {
  const expiry = Date.now() + MAX_AGE * 1000;
  const payload = `${username}.${expiry}`;
  const key = await getKey();
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const signature = bufferToHex(signatureBuffer);
  return `${payload}.${signature}`;
}

export async function verifySessionToken(token) {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [username, expiry, signature] = parts;
  const payload = `${username}.${expiry}`;

  try {
    const key = await getKey();
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      hexToBuffer(signature),
      encoder.encode(payload)
    );
    if (!valid) return false;
  } catch (err) {
    return false;
  }

  return Date.now() <= Number(expiry);
}

export const SESSION_COOKIE_NAME = "mm_admin_session";
export const SESSION_MAX_AGE = MAX_AGE;