import { forwardToProxy } from "@/lib/proxy";

// POST /api/text  { prompt: string, stil?: string }  →  { text: string }
export async function POST(req: Request) {
  const body = await req.json();
  return forwardToProxy("text", body);
}
