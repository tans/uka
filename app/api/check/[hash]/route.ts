import prisma from "@/lib/prisma";

export async function GET(request, ctx) {
  let { hash } = ctx.params;
  let order = await prisma.order.findFirst({ where: { hash } });
  if (!order?.payed) {
    return Response.json({ status: true, result: "nopay" });
  }
  if (order?.used) {
    return Response.json({ status: true, result: "used" });
  }

  return Response.json({ status: true, result: "success" });
}
