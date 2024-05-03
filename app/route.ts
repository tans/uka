import { redirect } from "next/navigation";

export function GET(request) {
  return redirect("/shop");
}
