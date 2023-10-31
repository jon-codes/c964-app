import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "./components/LoadingIndicator";
import { getPrediction } from "./libs/api";
import { PredictBody } from "./libs/api/types";

interface ResultsProps {
  predictBody: PredictBody;
}

function Results({ predictBody }: ResultsProps) {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["prediction", predictBody],
    queryFn: ({ signal }) => getPrediction(predictBody, signal),
  });

  return (
    <div>
      <h2>Result</h2>

      {isLoading && <LoadingIndicator label="Loading results:" />}

      {isError && <em className="error">{error.message}</em>}

      {data && (
        <>
          <h3>Electricity</h3>
          <p>
            <b>
              {((data.BTUEL * 1_000) / 3_412).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </b>
            <span> </span>
            kWh yearly
            <br />
            (~$
            {((((data.BTUEL * 1_000) / 3_412) * 15.93) / 100).toLocaleString(
              undefined,
              {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              },
            )}
            )
          </p>
          <h3>Natural Gas</h3>
          <p>
            <b>
              {data.BTUNG > 0
                ? ((data.BTUNG * 1_000) / 100_000).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })
                : "0"}
            </b>
            <span> </span>
            therms yearly
            <br />
            (~$
            {data.BTUNG > 0
              ? (((data.BTUNG * 1_000) / 1036) * 0.02185).toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  },
                )
              : "0"}
            )
          </p>
          <h3>Propane</h3>
          <p>
            <b>
              {data.BTULP
                ? ((data.BTULP * 1_000) / 91_452).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })
                : "0"}
            </b>
            <span> </span>
            gallons yearly
            <br />
            (~$
            {data.BTULP > 0
              ? (((data.BTULP * 1_000) / 91_452) * 2.396).toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  },
                )
              : "0"}
            )
          </p>
          <h3>Fuel Oil</h3>
          <p>
            <b>
              {data.BTUFO > 0
                ? ((data.BTUFO * 1_000) / 138_500).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })
                : "0"}
            </b>
            <span> </span>
            gallons yearly
            <br />
            (~$
            {data.BTUFO > 0
              ? (((data.BTUFO * 1_000) / 138_500) * 4.288).toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  },
                )
              : "0"}
            )
          </p>
          <h3>Wood</h3>
          <p>
            <b>
              {data.BTUWD
                ? ((data.BTUWD * 1_000) / 20_000_000).toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 0,
                    },
                  )
                : "0"}
            </b>
            <span> </span>
            cords yearly
            <br />
            (~$
            {data.BTUWD > 0
              ? (((data.BTUWD * 1_000) / 20_000_000) * 300).toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  },
                )
              : "0"}
            )
          </p>
        </>
      )}
    </div>
  );
}

export default Results;
