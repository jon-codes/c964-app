import { useState } from "preact/hooks";

function usePosition() {
  const [positionLoading, setPositionLoading] = useState(false);
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [positionError, setPositionError] =
    useState<GeolocationPositionError | null>(null);

  function requestPosition() {
    setPositionLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition(position);
        setPositionLoading(false);
      },
      (err) => {
        setPositionError(err);
        setPositionLoading(false);
      },
    );
  }

  const supported = "geolocation" in navigator;

  return [
    supported ? requestPosition : null,
    { positionLoading, position, positionError },
  ] as const;
}

export default usePosition;
