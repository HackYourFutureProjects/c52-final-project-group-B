import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Title from "@/components/Title";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Avatar,
  Slider,
  Pagination,
  Spinner,
} from "@heroui/react";
import { getDecks } from "@/api/decksAPI";
import Deck from "@/components/Deck";
import languages from "@/data/languages.js";
import { SearchIcon } from "@/components/Icons";
import { ROUTES } from "@/routes/paths";

const BrowseDecks = () => {
  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const language = searchParams.get("language") || "";
  const numCardsMin = searchParams.get("numCardsMin") || "10";
  const numCardsMax = searchParams.get("numCardsMax") || "100";
  const decksPerPage = searchParams.get("decksPerPage") || "20";
  const sortBy = searchParams.get("sortBy") || "most_recent";
  const page = parseInt(searchParams.get("page") || "1");

  const updateSearchParams = (key, value) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        if (value !== null && value !== "") {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
        return newParams;
      },
      { replace: true }
    );
  };

  useEffect(() => {
    const fetchDecks = async () => {
      setIsLoading(true);
      try {
        const result = await getDecks({
          page,
          limit: Number(decksPerPage),
          search,
          language,
          numCardsMin,
          numCardsMax,
          sortBy,
        });
        setDecks(result.items || []);
        setTotalPages(result.pages || 1);
      } catch (e) {
        console.error(e);
        setDecks([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDecks();
  }, [searchParams]);

  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: ROUTES.HOME },
            { label: `Browse Decks`, path: ROUTES.BROWSE },
          ]}
        >
          Browse Decks
        </Title>
      </div>

      <Form className="mt-20 items-stretch">
        <div className="bg-default-200 flex flex-col gap-3 rounded-[35px] p-8">
          <Input
            label="Search Decks"
            type="text"
            radius="full"
            minLength={2}
            maxLength={100}
            endContent={<SearchIcon />}
            value={search}
            onChange={(e) => updateSearchParams("search", e.target.value)}
          />

          <div className="flex flex-wrap items-start gap-3 md:flex-nowrap">
            <Select
              label="Language"
              radius="full"
              isClearable
              className="basis-full"
              selectedKeys={[language]}
              onChange={(e) => updateSearchParams("language", e.target.value)}
            >
              {languages.map((lang) => (
                <SelectItem
                  key={lang.key}
                  startContent={
                    <Avatar
                      alt={lang.label}
                      className="h-6 w-6"
                      src={`https://flagcdn.com/${lang.code}.svg`}
                    />
                  }
                >
                  {lang.label}
                </SelectItem>
              ))}
            </Select>

            <div className="bg-default-100 flex min-h-14 basis-full items-center rounded-full px-5 shadow-xs">
              <Slider
                label="Number of Cards"
                aria-label="Number of Cards"
                maxValue={300}
                minValue={0}
                showTooltip={true}
                size="sm"
                defaultValue={[Number(numCardsMin), Number(numCardsMax)]}
                onChangeEnd={(e) => {
                  updateSearchParams("numCardsMin", e[0]);
                  updateSearchParams("numCardsMax", e[1]);
                }}
              />
            </div>
          </div>
        </div>
      </Form>

      {isLoading ? (
        <div className="flex w-full justify-center py-20">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {decks.map((deck) => (
              <Deck
                key={deck._id}
                deckID={deck._id}
                title={deck.title}
                description={deck.description}
                user={deck.userInfo?.username}
                numCards={deck.cardsCount}
                className="max-w-full"
              />
            ))}
          </div>
          <div className="flex basis-1/4 items-center gap-3">
            <Select
              label="Sort By"
              radius="full"
              disallowEmptySelection
              selectedKeys={[sortBy]}
              onChange={(e) => {
                updateSearchParams("sortBy", e.target.value);
              }}
            >
              <SelectItem key={"most_recent"}>Most Recent</SelectItem>
              <SelectItem key={"alphabetical"}>Alphabetical</SelectItem>
              <SelectItem key={"num_cards_asc"}>
                Number of Cards (Asc)
              </SelectItem>
              <SelectItem key={"num_cards_desc"}>
                Number of Cards (Desc)
              </SelectItem>
            </Select>

            <Select
              label="Decks per Page"
              radius="full"
              disallowEmptySelection
              selectedKeys={[decksPerPage]}
              onChange={(e) => {
                updateSearchParams("decksPerPage", e.target.value);
              }}
            >
              <SelectItem key={"5"}>5</SelectItem>
              <SelectItem key={"10"}>10</SelectItem>
              <SelectItem key={"20"}>20</SelectItem>
              <SelectItem key={"50"}>50</SelectItem>
            </Select>
          </div>
          <div className="mt-20 flex flex-col items-center justify-center">
            <Pagination
              showControls
              radius="full"
              page={page}
              total={totalPages}
              onChange={(newPage) => updateSearchParams("page", newPage)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default BrowseDecks;
