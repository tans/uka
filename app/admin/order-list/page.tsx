import Container from "@/components/app/container";
import Navbar from "../navbar";

export default async function OrderList(props) {
  return (
    <>
      <Container>
        <Navbar current="order"></Navbar>
      </Container>
    </>
  );
}
