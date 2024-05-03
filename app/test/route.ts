import { fetchTransactions } from "@/lib/chain";

export const dynamic = "force-dynamic";

export async function GET(request) {
  let result = await fetchTransactions();
  console.log("fresh");
  return Response.json({ result });
}
