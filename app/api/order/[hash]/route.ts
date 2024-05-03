import prisma from "@/lib/prisma";

export async function POST(request) {
  let { hash } = await request.json();
  let order = await prisma.order.findUnique({
    where: {
      hash,
    },
  });

  return Response.json({
    payed: order?.payed,
  });
}
