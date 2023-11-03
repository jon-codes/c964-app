import { useQuery } from "@tanstack/react-query";
import { useState } from "preact/hooks";

import Input from "./components/Input";
import LoadingIndicator from "./components/LoadingIndicator";
import { useLocationContext } from "./context/LocationContext";
import useDebounce from "./hooks/useDebounce";
import { getForwardGeocode } from "./libs/api";
import { GeocodeItem } from "./libs/api/types";

interface DeviceLocationProps {
  requestPosition: (() => void) | null;
  deviceLoading: boolean;
  errorMessage?: string | null;
}

function DeviceLocation({
  requestPosition,
  deviceLoading,
  errorMessage,
}: DeviceLocationProps) {
  return (
    <fieldset>
      <legend>Device</legend>
      <p>
        <button
          type="button"
          onClick={requestPosition ? requestPosition : undefined}
          disabled={!!errorMessage || deviceLoading}
        >
          {requestPosition == null
            ? "Device location not supported"
            : "Use my location"}
        </button>
        {errorMessage && (
          <>
            <span> </span>
            <em className="no-wrap error">{errorMessage}</em>
          </>
        )}
      </p>
    </fieldset>
  );
}

interface SearchLocationProps {
  setGeo: (item: GeocodeItem) => void;
  disabled?: boolean;
}

function SearchLocation({ setGeo, disabled }: SearchLocationProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const search = useDebounce(searchValue, 500);

  const {
    isPending: searchIsPending,
    isLoading: searchIsLoading,
    isError: searchIsError,
    error: searchError,
    data: searchData,
  } = useQuery({
    queryKey: ["geoSearch", search],
    queryFn: ({ signal }) => getForwardGeocode(search, signal),
    enabled: !disabled && search.length >= 3,
    staleTime: Infinity,
  });

  const searchErrorMessage = searchIsError ? searchError.message : undefined;

  function handleOnChange(this: HTMLInputElement, e: Event) {
    if (e.target instanceof HTMLInputElement) {
      setSearchValue(e.target.value);
    }
  }

  return (
    <fieldset>
      <legend>Address</legend>
      <Input
        label="Search"
        placeholder="Zip or City, State"
        value={searchValue}
        onChange={handleOnChange}
        error={searchErrorMessage}
        disabled={disabled}
      />

      {searchIsLoading && <LoadingIndicator label="Searching:" />}
      {!searchIsPending && searchData && searchData.length === 0 && (
        <em>No results</em>
      )}

      {searchData && (
        <ul>
          {searchData.map((item) => (
            <li key={item.id}>
              <button onClick={() => setGeo(item)} disabled={disabled}>
                {item.formatted}
              </button>
            </li>
          ))}
        </ul>
      )}
    </fieldset>
  );
}

interface ShowLocationProps {
  geo: GeocodeItem;
}

function ShowLocation({ geo }: ShowLocationProps) {
  return (
    <>
      <p>
        {geo.formatted}
        <br />
        <em>
          ({geo.lat.toFixed(3)}, {geo.lng.toFixed(3)})
        </em>
      </p>
      <hr />
    </>
  );
}

interface LocationErrorProps {
  errorMessage: string;
}

function LocationError({ errorMessage }: LocationErrorProps) {
  return <em className="error">{errorMessage}</em>;
}

function LocationForm() {
  const {
    dataErrorMessage,
    climateLoading,
    deviceLoading,
    deviceErrorMessage,
    requestPosition,
    geo,
    setGeo,
  } = useLocationContext();

  const loadingMessage =
    climateLoading || deviceLoading
      ? climateLoading
        ? "Fetching climate data"
        : "Fetching location data"
      : null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2>Location</h2>
      {geo ? (
        <ShowLocation geo={geo} />
      ) : dataErrorMessage ? (
        <LocationError errorMessage={dataErrorMessage} />
      ) : loadingMessage ? (
        <LoadingIndicator label={loadingMessage} />
      ) : (
        <>
          <DeviceLocation
            requestPosition={requestPosition}
            errorMessage={deviceErrorMessage}
            deviceLoading={deviceLoading}
          />
          <p>Or, enter your location manually:</p>
          <SearchLocation setGeo={setGeo} disabled={deviceLoading} />
        </>
      )}
    </form>
  );
}

export default LocationForm;
