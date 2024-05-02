import Container from "@/components/app/container";
import KaForm from "./form";
import KaList from "./list";
import { Button, buttonVariants } from "@/components/ui/button";
import Navbar from "../navbar";
export default async function (props) {
  return (
    <>
      <Container>
        <Navbar current="ka"></Navbar>
        <div className="p-2">
          <div>
            <KaList></KaList>
          </div>

          <div className="mt-2">
            <KaForm>
              <div className={buttonVariants()}>新建</div>
            </KaForm>
          </div>
        </div>
      </Container>
    </>
  );
}
