import { useEffect, useState } from "react";
import Title from "@/components/Title";
import { Form, Input, Select, SelectItem, Avatar, Slider } from "@heroui/react";
import { getDecks } from "@/api/decksAPI";
import Deck from "@/components/Deck";
import languages from "@/data/languages.js";
import { SearchIcon } from "@/components/Icons";

const BrowseDecks = () => {
  const [decks, setDecks] = useState(null);

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
            name="search"
            label="Search Decks"
            type="text"
            radius="full"
            minLength={2}
            maxLength={100}
            endContent={<SearchIcon />}
          />
          <div className="flex flex-wrap gap-3 md:flex-nowrap">
            <Select
              name="language"
              label="Language"
              radius="full"
              /* TODO: If multiple selection is needed in the future, add (selectionMode="multiple") to the Select component. */
              isRequired
              className="basis-full"
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
            <div className="bg-default-100 flex min-h-13 basis-full items-center rounded-full px-5 shadow-xs">
              <Slider
                defaultValue={[30, 100]}
                label="Number of Cards"
                aria-label="Number of Cards"
                maxValue={300}
                minValue={0}
                showTooltip={true}
                size="sm"
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
