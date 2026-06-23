import { forwardToProxy } from "@/lib/proxy";

// POST /api/stimme  { text: string, stimme?: string }  →  { audioUrl: string }
export async function POST(req: Request) {
  const body = await req.json();
  return forwardToProxy("stimme", body);
}
