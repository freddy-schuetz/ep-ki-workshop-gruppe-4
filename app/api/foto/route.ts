import { forwardToProxy } from "@/lib/proxy";

// POST /api/foto  { bild: string (Data-URL), prompt: string }  →  { bildUrl: string }
export async function POST(req: Request) {
  const body = await req.json();
  return forwardToProxy("foto", body);
}
