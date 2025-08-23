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
import { PiMagnifyingGlass } from "react-icons/pi";
import { ROUTES } from "@/routes/paths.js";
import StylishDiv from "@/components/StylishDiv";

const BrowseDecks = () => {
  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const language = searchParams.get("language") || [];
  const numCardsMin = searchParams.get("numCardsMin") || "0";
  const numCardsMax = searchParams.get("numCardsMax") || "100";
  const decksPerPage = searchParams.get("decksPerPage") || "20";
  const sortBy = searchParams.get("sortBy") || "mostRecent";
  const page = parseInt(searchParams.get("page") || "1");

  const updateSearchParams = (key, value) => {
    setSearchParams(
      (newParams) => {
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
          limit: decksPerPage,
          search,
          language,
          numCardsMin,
          numCardsMax,
          sortBy,
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
        <StylishDiv className="flex flex-col">
          <Input
            label="Search Decks"
            type="text"
            radius="full"
            variant="faded"
            color="secondary"
            minLength={2}
            maxLength={100}
            endContent={
              <PiMagnifyingGlass
                className="m-auto hidden md:block"
                size={30}
                fill="hsl(var(--heroui-secondary))"
              />
            }
            value={search}
            onChange={(e) => updateSearchParams("search", e.target.value)}
            classNames={{
              inputWrapper: "px-5 items-center md:items-start",
              input: "text-center md:text-left",
            }}
          />

          <div className="flex flex-wrap items-start gap-4 md:flex-nowrap">
            <Select
              label="Language"
              radius="full"
              selectionMode="multiple"
              variant="faded"
              color="secondary"
              isClearable
              className="basis-full"
              selectedKeys={
                language.length > 0 ? language.toLowerCase().split(",") : []
              }
              onChange={(e) => updateSearchParams("language", e.target.value)}
              classNames={{
                trigger: "px-5 items-center md:items-start",
                value: "text-center md:text-left",
              }}
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

            <div className="bg-default-100 hover:border-secondary border-default-200 border-medium flex min-h-14 basis-full items-center rounded-full px-5 shadow-xs transition-colors">
              <Slider
                label="Number of Cards"
                aria-label="Number of Cards"
                color="secondary"
                maxValue={300}
                minValue={0}
                showTooltip
                size="sm"
                classNames={{
                  labelWrapper: "text-secondary",
                }}
                defaultValue={[Number(numCardsMin), Number(numCardsMax)]}
                onChangeEnd={(e) => {
                  updateSearchParams("numCardsMin", Number(e[0]));
                  updateSearchParams("numCardsMax", Number(e[1]));
                }}
              />
            </div>
          </div>
        </StylishDiv>
      </Form>

      {isLoading ? (
        <div className="flex w-full justify-center py-20">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <>
          <div className="mt-20 flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
            <div className="flex w-full flex-col text-center md:basis-1/2 md:text-left lg:basis-2/3">
              <h3 className="text-secondary text-xl font-bold">
                Browse through our collection of decks
              </h3>
              <p className="text-gray-500">
                {decks && `${totalResults} decks found`}
              </p>
            </div>
            <div className="flex w-full flex-col items-center gap-4 md:basis-1/2 md:flex-row lg:basis-1/3">
              <Select
                label="Sort By"
                radius="full"
                color="secondary"
                variant="faded"
                disallowEmptySelection
                selectedKeys={[sortBy]}
                onChange={(e) => {
                  updateSearchParams("sortBy", e.target.value);
                }}
                classNames={{
                  trigger: "px-5 items-center md:items-start",
                  value: "text-center md:text-left",
                }}
              >
                <SelectItem key={"mostRecent"}>Most Recent</SelectItem>
                <SelectItem key={"oldest"}>Oldest</SelectItem>
                <SelectItem key={"numCardsAsc"}>Most Cards</SelectItem>
                <SelectItem key={"numCardsDesc"}>Least Cards</SelectItem>
              </Select>

              <Select
                label="Decks per Page"
                radius="full"
                color="secondary"
                variant="faded"
                disallowEmptySelection
                selectedKeys={[decksPerPage]}
                onChange={(e) => {
                  updateSearchParams("decksPerPage", e.target.value);
                }}
                classNames={{
                  trigger: "px-5 items-center md:items-start",
                  value: "text-center md:text-left",
                }}
              >
                <SelectItem key="5">5</SelectItem>
                <SelectItem key="10">10</SelectItem>
                <SelectItem key="20">20</SelectItem>
                <SelectItem key="50">50</SelectItem>
              </Select>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {decks.map((deck) => (
              <Deck key={deck._id} deck={deck} className="max-w-full" />
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center">
            <Pagination
              showControls
              showShadow
              color="primary"
              radius="full"
              variant="faded"
              page={page}
              total={totalPages}
              onChange={(newPage) => updateSearchParams("page", newPage)}
            />
            <p className="text-foreground mt-5 text-sm">
              {(() => {
                const limitNum = Number(decksPerPage);
                const start = (page - 1) * limitNum + 1;
                const end = Math.min(page * limitNum, totalResults);
                if (!decks) return null;
                return `Showing ${start}-${end} of ${totalResults} results`;
              })()}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default BrowseDecks;
