import axios, { type AxiosError } from "axios";

import type {
  ClimateResponse,
  Coordinates,
  GeocodeResponse,
  HealthCheckResponse,
  PredictBody,
  PredictResponse,
} from "./types";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}

const api = axios.create({
  baseURL: "/api",
});

async function getHealthcheck(signal?: AbortSignal) {
  const response = await api.get<HealthCheckResponse>("/healthcheck", {
    signal,
  });
  return response.data;
}

async function getForwardGeocode(search: string, signal?: AbortSignal) {
  const response = await api.get<GeocodeResponse>("/geocode", {
    params: { search },
    signal,
  });
  return response.data;
}

async function getReverseGeocode(coords: Coordinates, signal?: AbortSignal) {
  const response = await api.get<GeocodeResponse>("/geocode", {
    params: coords,
    signal,
  });
  return response.data;
}

async function getClimateVars(coords: Coordinates, signal?: AbortSignal) {
  const response = await api.get<ClimateResponse>("/climate", {
    params: coords,
    signal,
  });
  return response.data;
}

async function getPrediction(body: PredictBody, signal?: AbortSignal) {
  const response = await api.put<PredictResponse>("/predict", body, {
    signal,
  });
  return response.data;
}

export {
  getClimateVars,
  getForwardGeocode,
  getHealthcheck,
  getPrediction,
  getReverseGeocode,
};
