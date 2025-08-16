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
  const [decks, setDecks] = useState(null);
  const [filterParams, setFilterParams] = useSearchParams();

  const search = filterParams.get("search") || "";
  const language = filterParams.get("language") || "";
  const numCardsMin = filterParams.get("numCardsMin") || "10";
  const numCardsMax = filterParams.get("numCardsMax") || "100";
  const decksPerPage = filterParams.get("decksPerPage") || "20";
  const sortBy = filterParams.get("sortBy") || "most_recent";
  const page = parseInt(filterParams.get("page")) || 1;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      setIsLoading(true);
      try {
        const result = await getDecks({ page, limit: Number(decksPerPage) });
        setDecks(result);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDecks();
  }, [filterParams]);

  const updateFilterParams = (key, value) => {
    setFilterParams(
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
            onChange={(e) => updateFilterParams("search", e.target.value)}
          />
          <div className="flex flex-wrap items-start gap-3 md:flex-nowrap">
            <Select
              label="Language"
              radius="full"
              isClearable
              className="basis-full"
              selectedKeys={[language]}
              onChange={(e) => updateFilterParams("language", e.target.value)}
            >
              {languages.map((language) => (
                <SelectItem
                  key={language.key}
                  startContent={
                    <Avatar
                      alt={language.label}
                      className="h-6 w-6"
                      src={`https://flagcdn.com/${language.code}.svg`}
                    />
                  }
                >
                  {language.label}
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
                defaultValue={[numCardsMin, numCardsMax]}
                onChangeEnd={(e) => {
                  updateFilterParams("numCardsMin", e[0]);
                  updateFilterParams("numCardsMax", e[1]);
                }}
              />
            </div>
          </div>
        </div>
      </Form>

      <div className="mt-20 flex items-center justify-between">
        <div className="flex basis-3/4 flex-col">
          <h3 className="text-xl font-bold">
            Browse through our collection of decks
          </h3>
          <p className="text-gray-500">
            {decks && `${decks.total} decks found`}
          </p>
        </div>
        <div className="flex basis-1/4 items-center gap-3">
          <Select
            label="Sort By"
            radius="full"
            disallowEmptySelection
            defaultSelectedKeys={[sortBy]}
            onChange={(e) => updateFilterParams("sortBy", e.target.value)}
          >
            <SelectItem key={"most_recent"}>Most Recent</SelectItem>
            <SelectItem key={"alphabetical"}>Alphabetical</SelectItem>
            <SelectItem key={"num_cards_asc"}>Number of Cards (Asc)</SelectItem>
            <SelectItem key={"num_cards_desc"}>
              Number of Cards (Desc)
            </SelectItem>
          </Select>
          <Select
            label="Decks per Page"
            radius="full"
            disallowEmptySelection
            defaultSelectedKeys={[decksPerPage]}
            onChange={(e) => updateFilterParams("decksPerPage", e.target.value)}
          >
            <SelectItem key={"5"}>5</SelectItem>
            <SelectItem key={"10"}>10</SelectItem>
            <SelectItem key={"20"}>20</SelectItem>
            <SelectItem key={"50"}>50</SelectItem>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex w-full justify-center py-20">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {decks?.items?.map((deck) => (
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

          <div className="mt-20 flex flex-col items-center justify-center">
            <Pagination
              showControls
              radius="full"
              page={page}
              total={decks?.pages ?? 1}
              onChange={(newPage) => updateFilterParams("page", newPage)}
            />
            <p className="text-default-800 mt-2 text-sm">
              {(() => {
                const limitNum = Number(decksPerPage);
                const start = (page - 1) * limitNum + 1;
                const end = Math.min(page * limitNum, decks?.total ?? 0);
                if (!decks) return null;
                return `Showing ${start}-${end} of ${decks.total} results`;
              })()}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default BrowseDecks;
