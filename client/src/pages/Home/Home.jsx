import TEST_ID from "./Home.testid";
import Title from "../../components/Title";

const Home = () => {
  return (
    <div
      className="flex max-w-7xl mx-auto my-8"
      data-testid={TEST_ID.container}
    >
      <div className="flex flex-col gap-5 basis-2/5">
        <div className="flex flex-col gap-1">
          <Title>Study Your Way, Every Day</Title>
          <p className="text-xl font-bold">Create. Flip. Master.</p>
        </div>
        <p>
          Memix is a playful, all-purpose flashcard app that helps you learn
          anything—faster. Create custom decks, flip through fun, focused cards,
          and boost your memory with smart repetition. Simple to use, fun to
          master.
        </p>
      </div>
    </div>
  );
};

export default Home;
