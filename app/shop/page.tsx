import prisma from "@/lib/prisma";

export default async function Shop(props) {
  let ka = await prisma.ka.findMany({ where: { show: true } });
}
