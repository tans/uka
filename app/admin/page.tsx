import Container from "@/components/app/container";
import Navbar from "./navbar";
import prisma from "@/lib/prisma";

export default async function (props) {
  let kaCount = await prisma.ka.count();
  let orderCount = await prisma.order.count();
  let payedCount = await prisma.order.count({ where: { payed: true } });
  let orders = await prisma.order.findMany({ where: { payed: true } });
  let payedAmount = 0;
  orders.map((o) => {
    payedAmount = o.price * 1 + payedAmount;
  });
  let usedCount = await prisma.order.count({ where: { used: true } });
  return (
    <>
      <Container>
        <Navbar current="home"></Navbar>
        <div className="mt-4 bg-gray-50 p-4">
          <div className="font-black text-lg">数据汇总：</div>

          <div className="">销售额：{payedAmount}</div>
          <div className="">销售数：{kaCount}</div>
          <div className="">兑换数：{usedCount}</div>
          <div className="">套餐数：{kaCount}</div>
        </div>
      </Container>
    </>
  );
}
