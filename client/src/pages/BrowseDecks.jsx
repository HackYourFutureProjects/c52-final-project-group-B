import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Title from "@/components/Title";
import { Form, Input, Select, SelectItem, Avatar, Slider } from "@heroui/react";
import { getDecks } from "@/api/decksAPI";
import Deck from "@/components/Deck";
import languages from "@/data/languages.js";
import { SearchIcon } from "@/components/Icons";

const BrowseDecks = () => {
  const [decks, setDecks] = useState(null);
  const [filterParams, setFilterParams] = useSearchParams();
  const [search, setSearch] = useState();
  const [language, setLanguage] = useState();
  const [numCardsMin, setNumCardsMin] = useState(10);
  const [numCardsMax, setNumCardsMax] = useState(100);

  useEffect(() => {
    setSearch(filterParams.get("search") || "");
    setLanguage(filterParams.get("language") || null);
    setNumCardsMin(filterParams.get("numCardsMin") || 10);
    setNumCardsMax(filterParams.get("numCardsMax") || 100);
  }, [filterParams]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const result = await getDecks();
        setDecks(result);
      } catch (e) {
        console.error(e);
      }
    };
    fetchDecks();
  }, []);

  const updateFilterParams = (key, value) => {
    setFilterParams(
      (filterParams) => {
        if (value !== null && value !== "") {
          filterParams.set(key, value);
        } else {
          filterParams.delete(key);
        }
        return filterParams;
      },
      { replace: true }
    ); // true to avoid history push when updating search params
  };

  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: `Browser Decks`, path: `/browse` },
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
            onChange={(e) => {
              updateFilterParams("search", e.target.value);
            }}
          />
          <div className="flex flex-wrap items-start gap-3 md:flex-nowrap">
            <Select
              label="Language"
              radius="full"
              /* TODO: If multiple selection is needed in the future, add (selectionMode="multiple") to the Select component. */
              isRequired
              isClearable
              className="basis-full"
              selectedKeys={[language]}
              onChange={(e) => {
                updateFilterParams("language", e.target.value);
              }}
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
                value={[numCardsMin, numCardsMax]}
                onChange={(e) => {
                  setNumCardsMin(e[0]);
                  setNumCardsMax(e[1]);
                }}
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
            {decks && `${decks.length} decks found`}
          </p>
        </div>
        <div className="flex basis-1/4 items-center gap-3">
          <Select
            label="Sort By"
            radius="full"
            defaultSelectedKeys={["most_recent"]}
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
            defaultSelectedKeys={["20"]}
          >
            <SelectItem key={"5"}>5</SelectItem>
            <SelectItem key={"10"}>10</SelectItem>
            <SelectItem key={"20"}>20</SelectItem>
            <SelectItem key={"50"}>50</SelectItem>
          </Select>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {decks &&
          decks.map((deck) => (
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
    </>
  );
};

export default BrowseDecks;
