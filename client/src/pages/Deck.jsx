import { useParams } from "react-router-dom";
import Title from "@/components/Title";

const DeckPage = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col justify-center text-center">
      <Title
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: `Library`, path: `/library` },
          { label: `Deck ID: ${id}`, path: `/decks/${id}` },
        ]}
      >
        Deck ID: {id}
      </Title>
    </div>
  );
};

export default DeckPage;
