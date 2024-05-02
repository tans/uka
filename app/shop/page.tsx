import prisma from "@/lib/prisma";
import Cart from "./cart";
import Container from "@/components/app/container";

export default async function Shop(props) {
  let kaList = await prisma.ka.findMany({
    where: { show: true },
    orderBy: { price: "asc" },
  });

  return (
    <>
      <Container>
        <Cart kaList={kaList}></Cart>
      </Container>
    </>
  );
}
