import { useQuery } from "@tanstack/react-query";
import { ComponentChildren, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";

import usePosition from "../hooks/usePosition";
import { getClimateVars, getReverseGeocode } from "../libs/api";
import type { GeocodeItem } from "../libs/api/types";

type LocationValue = {
  climateLoading: boolean;
  dataErrorMessage: string | null;
  climateVars: {
    HDD65: number;
    CDD65: number;
  } | null;
  deviceLoading: boolean;
  deviceErrorMessage: string | null;
  requestPosition: (() => void) | null;
  geo: GeocodeItem | null;
  setGeo: (value: GeocodeItem) => void;
};

const LocationContext = createContext<LocationValue | null>(null);

function getPositionErrorMessage(error: GeolocationPositionError): string {
  switch (error.code) {
    case 1:
      return "Location permission denied";
    case 3:
      return "Location request timed out";
    default:
      return "Location information is unavailable";
  }
}

interface LocationProviderProps {
  children: ComponentChildren;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [requestPosition, { positionLoading, position, positionError }] =
    usePosition();
  const positionCoords = position?.coords
    ? { lat: position.coords.latitude, lng: position.coords.longitude }
    : null;

  const {
    isLoading: revGeoIsLoading,
    isError: revGeoIsError,
    error: revGeoError,
    data: revGeoData,
  } = useQuery({
    queryKey: ["revGeo", positionCoords],
    queryFn: ({ signal }) => getReverseGeocode(positionCoords!, signal),
    enabled: !!position,
    staleTime: Infinity,
  });

  const deviceLoading = positionLoading || revGeoIsLoading;

  const deviceErrorMessage = positionError
    ? getPositionErrorMessage(positionError)
    : revGeoIsError && revGeoError.status === 400
    ? "Device outside supported area"
    : null;

  const revGeoErrorMessage =
    revGeoIsError && revGeoError.status !== 400 ? revGeoError.message : null;

  const [geo, setGeo] = useState<GeocodeItem | null>(null);

  useEffect(() => {
    if (revGeoData) {
      setGeo((prev) => (prev ? prev : revGeoData[0]));
    }
  }, [revGeoData, setGeo]);

  const coords = geo
    ? { lat: Number(geo.lat.toFixed(3)), lng: Number(geo.lng.toFixed(3)) }
    : null;

  const {
    isLoading: climateLoading,
    isError: climateIsError,
    error: climateErrorObject,
    data: climateData,
  } = useQuery({
    queryKey: ["climateVars", geo],
    queryFn: ({ signal }) => getClimateVars(coords!, signal),
    enabled: !!coords,
    staleTime: Infinity,
  });

  const climateErrorMessage = climateIsError
    ? climateErrorObject.message
    : null;
  const dataErrorMessage = revGeoErrorMessage || climateErrorMessage;

  const climateVars = climateData
    ? { HDD65: climateData.HDD65, CDD65: climateData.CDD65 }
    : null;

  const value = {
    dataErrorMessage,
    climateLoading:
      climateLoading || (geo && !climateData && !climateIsError) ? true : false,
    climateVars,
    deviceLoading,
    deviceErrorMessage,
    requestPosition,
    geo: climateVars && geo ? geo : null,
    setGeo,
  };

  return (
    <LocationContext.Provider {...{ value }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (context === null) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
