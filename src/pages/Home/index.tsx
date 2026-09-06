import { Button, Flex, Image, PageHeader } from "acioleui";
import logo from "../../assets/logo.png";

export function HomePage() {
  return (
    <div className="home-page">
      <PageHeader
        title="Template"
        description="Template pronto para uso com o design system acioleui."
      />

      <Flex className="home-content" direction="column" align="center" gap="10">
        <Image alt="" src={logo} width={260} />
        <Flex className="home-actions" gap="6">
          <Button full>Confirmar</Button>
          <Button full variant="soft">
            Cancelar
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
