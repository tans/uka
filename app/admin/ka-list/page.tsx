import Container from "@/components/app/container";
import KaForm from "./form";
import KaList from "./list";
export default async function (props) {
  return (
    <>
      <Container>
        <div>
          <KaList></KaList>
        </div>
        <KaForm>新建</KaForm>
      </Container>
    </>
  );
}
