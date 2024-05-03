import Container from "@/components/app/container";
import Navbar from "../navbar";
import prisma from "@/lib/prisma";
import { CheckIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";

export default async function OrderList(props) {
  let orders = await prisma.order.findMany({
    where: {},
    include: { ka: true },
    orderBy: { id: "desc" },
    take: 1000,
  });
  return (
    <>
      <Container>
        <Navbar current="order"></Navbar>
        <div className="mt-4 ">
          <div className="font-black text-sm m-1">最近订单</div>
          {orders.map((order) => (
            <a
              href={"/order/" + order.hash}
              className="block flex items-center p-2 m-1 text-sm hover:bg-gray-50 border rounded"
              key={order.id}
            >
              <div className="w-8">{order.id}</div>
              <div className="flex-1">{order.ka.title}</div>
              <div>{order.price}u </div>
              <div className="mx-2 ">
                {dayjs(order.createdAt).format("MM-DD HH:mm")}
              </div>
              <div className="w-8">
                {order.payed && <CheckIcon className="w-6 h-6"></CheckIcon>}
              </div>
            </a>
          ))}
        </div>
      </Container>
    </>
  );
}
