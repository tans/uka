import Container from "@/components/app/container";
import Navbar from "./navbar";

export default async function (props) {
  return (
    <>
      <Container>
        <Navbar current="home"></Navbar>
      </Container>
    </>
  );
}
