import { forwardToProxy } from "@/lib/proxy";

// POST /api/bild  { prompt: string }  →  { bildUrl: string }
export async function POST(req: Request) {
  const body = await req.json();
  return forwardToProxy("bild", body);
}
