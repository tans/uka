import Container from "@/components/app/container";
import ManualForm from "./form";
import ManualList from "./list";
import { Button, buttonVariants } from "@/components/ui/button";
import Navbar from "../navbar";
export default async function (props) {
  return (
    <>
      <Container>
        <Navbar current="manual"></Navbar>
        <div className="p-2">
          <div>
            <ManualList></ManualList>
          </div>

          <div className="mt-2">
            <ManualForm>
              <div className={buttonVariants()}>新建</div>
            </ManualForm>
          </div>
        </div>
      </Container>
    </>
  );
}
