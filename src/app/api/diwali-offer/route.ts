import { NextResponse } from "next/server";
import {
  createCouponCode,
  readEntries,
  withCouponStore,
  writeEntries,
} from "@/lib/couponVault";
import { EMAIL_PATTERN, isDiwaliOfferActive } from "@/lib/diwaliOffer";

export async function POST(request: Request) {
  try {
    if (!isDiwaliOfferActive()) {
      return NextResponse.json(
        { ok: false, offerEnded: true, error: "This offer has ended." },
        { status: 410 },
      );
    }

    const body = await request.json().catch(() => null);
    const email = String((body as { email?: unknown })?.email ?? "")
      .trim()
      .toLowerCase();

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Enter a valid email address." },
        { status: 400 },
      );
    }

    const result = await withCouponStore(async () => {
      const entries = await readEntries();
      const existing = entries.find((entry) => entry.email === email);
      if (existing) {
        return { alreadyClaimed: true as const, code: existing.code };
      }
      const code = createCouponCode();
      entries.push({ email, code, createdAt: new Date().toISOString() });
      await writeEntries(entries);
      return { alreadyClaimed: false as const, code };
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("diwali-offer error:", error);
    return NextResponse.json(
      { ok: false, error: "Couldn't generate your coupon. Try again." },
      { status: 500 },
    );
  }
}
