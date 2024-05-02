import prisma from "@/lib/prisma";
let alphabet = "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz";

import { customAlphabet } from "nanoid";
const nanoid = customAlphabet(alphabet, 8);

import dayjs from "dayjs";
export async function POST(request) {
  let json = await request.json();
  let { kaId } = json;
  kaId = parseInt(kaId);

  let ka = await prisma.ka.findFirst({ where: { id: kaId } });
  if (!ka) {
    return Response.json({
      status: false,
      message: "套餐不存在",
    });
  }
  let currentHour = dayjs().format("YYYYMMDDHH");
  let no = 1;
  if (ka.currentHour == currentHour) {
    no = ka.currentNo + 1;
  }
  await prisma.ka.update({
    where: { id: kaId },
    data: {
      currentNo: no,
      currentHour: currentHour,
    },
  });
  let price = `${ka.price.toFixed(2)}${no}`;
  if (!process.env.BSC_WALLET) {
    return Response.json({
      status: false,
      message: "未设定收款地址",
    });
  }
  let order = await prisma.order.create({
    data: {
      kaId: kaId,
      price: price,
      hash: nanoid(),
      hours: currentHour,
      address: process.env.BSC_WALLET,
    },
  });

  return Response.json({ status: true, order });
}
