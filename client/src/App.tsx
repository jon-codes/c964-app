import { useState } from "preact/hooks";

import ApplianceForm from "./ApplianceForm";
import { useLocationContext } from "./context/LocationContext";
import HomeForm from "./HomeForm";
import HouseholdForm from "./HouseholdForm";
import HvacForm from "./HvacForm";
import { GeocodeItem, PredictBody } from "./libs/api/types";
import LocationForm from "./LocationForm";
import Results from "./Results";

type ClimateVars = {
  HDD65: number;
  CDD65: number;
};

type Step = "home" | "appliances" | "hvac" | "household" | "predict";

export interface AppState {
  geo: GeocodeItem | null;
  climate: ClimateVars | null;
}

function App() {
  const { climateVars } = useLocationContext();

  const [step, setStep] = useState<Step>("home");
  const [predictBody, setPredictBody] = useState<Partial<PredictBody>>({});

  const proceed = (step: Step, partialBody: Partial<PredictBody>) => {
    setStep(step);
    setPredictBody((prev) => ({ ...prev, ...partialBody }));
  };

  return (
    <>
      <header>
        <h1>⚡️ Energy Forecast</h1>
        <p>Predict your home energy usage.</p>
      </header>
      <main>
        <LocationForm />

        {climateVars && step === "home" && (
          <HomeForm
            proceed={(partial: Partial<PredictBody>) =>
              proceed("appliances", partial)
            }
          />
        )}

        {step === "appliances" && (
          <ApplianceForm
            proceed={(partial: Partial<PredictBody>) =>
              proceed("hvac", partial)
            }
          />
        )}

        {step === "hvac" && (
          <HvacForm
            proceed={(partial: Partial<PredictBody>) =>
              proceed("household", partial)
            }
          />
        )}

        {step === "household" && (
          <HouseholdForm
            proceed={(partial: Partial<PredictBody>) =>
              proceed("predict", partial)
            }
          />
        )}

        {step === "predict" && (
          <Results predictBody={predictBody as PredictBody} />
        )}
      </main>
    </>
  );
}

export default App;
