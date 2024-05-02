import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import _ from "lodash";

export async function GET(request) {
  let list = await prisma.ka.findMany({});
  return Response.json({ status: true, list });
}

export async function POST(request: NextRequest) {
  let json = await request.json();

  let data = {
    title: json.title,
    price: parseFloat(json.price),
  };
  if (json.id) {
    await prisma.ka.update({
      where: { id: json.id },
      data,
    });
  } else {
    await prisma.ka.create({
      data,
    });
  }

  return Response.json({ status: true });
}
