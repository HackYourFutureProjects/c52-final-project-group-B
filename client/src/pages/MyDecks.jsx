import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import Title from "@/components/Title";
import { Form, Input, Spinner, Button, Link, Pagination } from "@heroui/react";
import Deck from "@/components/Deck";
import { SearchIcon } from "@/components/Icons";
import { ROUTES } from "@/routes/paths";
import { getMyDecks } from "@/api/decksAPI";
import { UserContext } from "@/context/UserContext";

const MyDecks = () => {
  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isUserLoaded, forceLogin } = useContext(UserContext);

  useEffect(() => {
    if (isUserLoaded && !user) forceLogin();
  }, [isUserLoaded, user]);

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;

  const updateSearchParams = (key, value) => {
    setSearchParams(
      (np) => {
        if (value !== null && value !== "") np.set(key, value);
        else np.delete(key);
        return np;
      },
      { replace: true }
    );
  };

  useEffect(() => {
    const fetchDecks = async () => {
      setIsLoading(true);
      try {
        const result = await getMyDecks({
          page,
          limit,
          search,
        });
        setDecks(result.items || []);
        setTotalPages(result.pages || 1);
        setTotalResults(result.total || 0);
      } catch (e) {
        console.error(e);
        setDecks([]);
        setTotalPages(1);
        setTotalResults(0);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchDecks();
  }, [user, searchParams]);

  if (!user) return null;

  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: ROUTES.HOME },
            { label: "My Decks", path: ROUTES.MY_DECKS },
          ]}
        >
          My Decks
        </Title>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          as={Link}
          href={ROUTES.DECK_CREATE}
          color="primary"
          radius="full"
          className="font-bold"
        >
          Create New Deck
        </Button>
      </div>

      <Form className="mt-6 items-stretch">
        <div className="bg-default-200 flex flex-col gap-3 rounded-[35px] p-8">
          <Input
            label="Search My Decks"
            type="text"
            radius="full"
            minLength={2}
            maxLength={100}
            endContent={<SearchIcon />}
            value={search}
            onChange={(e) => updateSearchParams("search", e.target.value)}
          />
        </div>
      </Form>

      {isLoading ? (
        <div className="flex w-full justify-center py-20">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold">My decks</h3>
              <p className="text-gray-500">{totalResults} found</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {decks.map((deck) => (
              <Deck key={deck._id} deck={deck} className="max-w-full" />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-20 flex flex-col items-center justify-center">
              <Pagination
                showControls
                radius="full"
                page={page}
                total={totalPages}
                onChange={(newPage) => updateSearchParams("page", newPage)}
              />
              <p className="text-default-800 mt-2 text-sm">
                Showing {(page - 1) * limit + 1}–
                {Math.min(page * limit, totalResults)} of {totalResults} results
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyDecks;
