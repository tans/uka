import prisma from "@/lib/prisma";

export async function GET(request, ctx) {
  let { hash } = ctx.params;
  if (hash.startsWith("m-")) {
    hash = hash.replace("m-", "");
    let manual = await prisma.manual.findFirst({
      where: {
        hash: hash,
      },
    });

    if (!manual) {
      return Response.json({ status: true, result: "nokey" });
    }
    if (manual.used) {
      return Response.json({ status: true, result: "used" });
    }

    await prisma.manual.update({
      where: { id: manual.id },
      data: {
        used: true,
        usedAt: new Date(),
      },
    });
  }
  let order = await prisma.order.findFirst({
    where: { hash },
    include: { ka: true },
  });
  if (!order) {
    return Response.json({ status: true, result: "nokey" });
  }
  if (!order.payed) {
    return Response.json({ status: true, result: "nopay" });
  }
  if (order.used) {
    return Response.json({ status: true, result: "used" });
  }
  await prisma.order.update({
    where: { id: order.id },
    data: {
      used: true,
      usedAt: new Date(),
    },
  });
  return Response.json({
    status: true,
    quota: order.ka.quota,
    result: "success",
  });
}
