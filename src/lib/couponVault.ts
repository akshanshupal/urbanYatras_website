// Server-only coupon store: emails + codes live in data/diwali-coupons.json,
// encrypted with AES-256-GCM. Import only from API routes (uses node:crypto/fs).

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

export type CouponEntry = {
  email: string;
  code: string;
  createdAt: string;
};

type EncryptedStore = {
  format: "diwali-coupons-v1";
  iv: string;
  tag: string;
  ciphertext: string;
};

const STORE_PATH = path.join(process.cwd(), "data", "diwali-coupons.json");

// Unambiguous alphabet: no 0/O, 1/I/L.
const CODE_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

function getKey(): Buffer {
  const secret = process.env.DIWALI_COUPON_SECRET || "urban-yatras-diwali-2026";
  return crypto.createHash("sha256").update(secret).digest();
}

export function createCouponCode(): string {
  const bytes = crypto.randomBytes(6);
  let suffix = "";
  for (const byte of bytes) suffix += CODE_ALPHABET[byte % CODE_ALPHABET.length];
  return `DIWALI-${suffix}`;
}

function encrypt(entries: CouponEntry[]): EncryptedStore {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(), iv);
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(entries), "utf8"),
    cipher.final(),
  ]);
  return {
    format: "diwali-coupons-v1",
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    ciphertext: ciphertext.toString("base64"),
  };
}

function decrypt(store: EncryptedStore): CouponEntry[] {
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    getKey(),
    Buffer.from(store.iv, "base64"),
  );
  decipher.setAuthTag(Buffer.from(store.tag, "base64"));
  const plain = Buffer.concat([
    decipher.update(Buffer.from(store.ciphertext, "base64")),
    decipher.final(),
  ]);
  return JSON.parse(plain.toString("utf8")) as CouponEntry[];
}

export async function readEntries(): Promise<CouponEntry[]> {
  let raw: string;
  try {
    raw = await fs.readFile(STORE_PATH, "utf8");
  } catch (error: any) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
  return decrypt(JSON.parse(raw));
}

export async function writeEntries(entries: CouponEntry[]): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(
    STORE_PATH,
    `${JSON.stringify(encrypt(entries), null, 2)}\n`,
    "utf8",
  );
}

// Serialise read-modify-write so parallel requests can't clobber the store.
let queue: Promise<unknown> = Promise.resolve();
export function withCouponStore<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task);
  queue = run.catch(() => undefined);
  return run;
}
