import { zodResolver } from "@hookform/resolvers/zod";
import { useReducer } from "preact/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Input from "./components/Input";
import Select from "./components/Select";
import {
  COOKTOPFUEL,
  DRYRFUEL,
  DWCYCLE,
  LOCRFRI2,
  OUTGRILLFUEL,
  OVENFUEL,
  type PredictBody,
  RANGEFUEL,
  TOPFRONT,
  TYPERFR1,
  TYPERFR2,
  UPRTFRZR,
  WASHTEMP,
} from "./libs/api/types";

const FormSchema = z.object({
  NUMFRIG: z.number().int().min(0).optional(),
  TYPERFR1: z
    .nativeEnum(TYPERFR1, {
      errorMap: () => ({ message: "Please select a door arrangement." }),
    })
    .optional(),
  ICE: z.boolean().optional(),
  TYPERFR2: z
    .nativeEnum(TYPERFR2, {
      errorMap: () => ({ message: "Please select a door arrangement." }),
    })
    .optional(),
  LOCRFRI2: z
    .nativeEnum(LOCRFRI2, {
      errorMap: () => ({ message: "Please select a location." }),
    })
    .optional(),
  WINECHILL: z.boolean().optional(),
  NUMFREEZ: z.number().int().min(0).optional(),
  UPRTFRZR: z
    .nativeEnum(UPRTFRZR, {
      errorMap: () => ({ message: "Please select type." }),
    })
    .optional(),
  RANGEFUEL: z
    .nativeEnum(RANGEFUEL, {
      errorMap: () => ({ message: "Please select a fuel type." }),
    })
    .optional(),
  RCOOKUSE: z.number().int().min(0).optional(),
  ROVENUSE: z.number().int().min(0).optional(),
  COOKTOPFUEL: z
    .nativeEnum(COOKTOPFUEL, {
      errorMap: () => ({ message: "Please select a fuel type." }),
    })
    .optional(),
  COOKTOPUSE: z.number().int().min(0).optional(),
  OVENFUEL: z
    .nativeEnum(OVENFUEL, {
      errorMap: () => ({ message: "Please select a fuel type." }),
    })
    .optional(),
  OVENUSE: z.number().int().min(0).optional(),
  MICRO: z.number().int().min(0).optional(),
  AMTMICRO: z.number().int().min(0).optional(),
  OUTGRILLFUEL: z
    .nativeEnum(OUTGRILLFUEL, {
      errorMap: () => ({ message: "Please select a fuel type." }),
    })
    .optional(),
  DISHWASH: z.boolean().optional(),
  DWASHUSE: z.number().int().min(0).optional(),
  DWCYCLE: z
    .nativeEnum(DWCYCLE, {
      errorMap: () => ({ message: "Please select a cycle." }),
    })
    .optional(),
  CWASHER: z.boolean().optional(),
  TOPFRONT: z
    .nativeEnum(TOPFRONT, {
      errorMap: () => ({ message: "Please select a type." }),
    })
    .optional(),
  WASHLOAD: z.number().int().min(0).optional(),
  WASHTEMP: z
    .nativeEnum(WASHTEMP, {
      errorMap: () => ({ message: "Please select a temperature." }),
    })
    .optional(),
  DRYER: z.boolean().optional(),
  DRYRFUEL: z
    .nativeEnum(DRYRFUEL, {
      errorMap: () => ({ message: "Please select a fuel type." }),
    })
    .optional(),
  DRYRUSE: z.number().int().min(0).optional(),
});

type FormData = z.infer<typeof FormSchema>;

interface ApplianceFormProps {
  proceed: (partialBody: Partial<PredictBody>) => void;
}

function ApplianceForm({ proceed }: ApplianceFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
    shouldUnregister: true,
    shouldUseNativeValidation: false,
  });

  const NUMFRIG_VALUE = watch("NUMFRIG");
  const NUMFREEZ_VALUE = watch("NUMFREEZ");
  const MICRO_VALUE = watch("MICRO");
  const DISHWASH_VALUE = watch("DISHWASH");
  const CWASHER_VALUE = watch("CWASHER");
  const DRYER_VALUE = watch("DRYER");

  const [useRange, toggleUseRange] = useReducer((prev) => !prev, false);
  const [useCooktop, toggleUseCooktop] = useReducer((prev) => !prev, false);
  const [useOven, toggleUseOven] = useReducer((prev) => !prev, false);
  const [useGrill, toggleUseGrill] = useReducer((prev) => !prev, false);

  const usesPrimaryFridge = NUMFRIG_VALUE && NUMFRIG_VALUE > 0 ? true : false;
  const usesSecondaryFridge = NUMFRIG_VALUE && NUMFRIG_VALUE > 1 ? true : false;
  const usesPrimaryFreezer =
    NUMFREEZ_VALUE && NUMFREEZ_VALUE > 0 ? true : false;
  const usesMicro = MICRO_VALUE && MICRO_VALUE > 0 ? true : false;
  const usesDwash = DISHWASH_VALUE ? true : false;
  const usesCwash = CWASHER_VALUE ? true : false;
  const usesDryer = DRYER_VALUE ? true : false;

  const onSubmit = (data: FormData) => {
    proceed(data);
  };

  return (
    <div>
      <h2>Appliances</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Refrigerators</legend>
          <Input
            label="Count"
            type="number"
            min={0}
            {...register("NUMFRIG", { setValueAs: (v) => Number(v) })}
            error={errors.NUMFRIG?.message}
          />
          {usesPrimaryFridge && (
            <>
              <h4>Primary</h4>
              <Select
                label="Door arrangement"
                options={[
                  { value: TYPERFR1.ONE_DOOR, label: "One door" },
                  {
                    value: TYPERFR1.TWO_DOOR_FREEZER_BOTTOM,
                    label: "Two door (freezer bottom)",
                  },
                  {
                    value: TYPERFR1.TWO_DOOR_FREEZER_TOP,
                    label: "Two door (freezer top)",
                  },
                  {
                    value: TYPERFR1.TWO_DOOR_FREEZER_SIDE,
                    label: "Two door (freezer side)",
                  },
                  {
                    value: TYPERFR1.THREE_OR_MORE_DOORS,
                    label: "Three or more doors",
                  },
                ]}
                {...register("TYPERFR1")}
                error={errors.TYPERFR1?.message}
              />
              <Input
                type="checkbox"
                label="Ice maker?"
                {...register("ICE")}
                error={errors.ICE?.message}
              />
            </>
          )}

          {usesSecondaryFridge && (
            <>
              <h4>Secondary</h4>
              <Select
                label="Door arrangement"
                options={[
                  { value: TYPERFR2.ONE_DOOR, label: "One door" },
                  {
                    value: TYPERFR2.TWO_DOOR_FREEZER_BOTTOM,
                    label: "Two door (freezer bottom)",
                  },
                  {
                    value: TYPERFR2.TWO_DOOR_FREEZER_TOP,
                    label: "Two door (freezer top)",
                  },
                  {
                    value: TYPERFR2.TWO_DOOR_FREEZER_SIDE,
                    label: "Two door (freezer side)",
                  },
                  {
                    value: TYPERFR2.THREE_OR_MORE_DOORS,
                    label: "Three or more doors",
                  },
                ]}
                {...register("TYPERFR2")}
                error={errors.TYPERFR2?.message}
              />
              <Select
                label="Location"
                options={[
                  {
                    value: LOCRFRI2.BASEMENT,
                    label: "Basement",
                  },
                  {
                    value: LOCRFRI2.GARAGE,
                    label: "Garage",
                  },
                  {
                    value: LOCRFRI2.MAIN_LIVING_AREA,
                    label: "Main living area",
                  },
                  {
                    value: LOCRFRI2.OTHER,
                    label: "Other",
                  },
                ]}
                {...register("LOCRFRI2")}
                error={errors.LOCRFRI2?.message}
              />
            </>
          )}

          <Input
            type="checkbox"
            label="Wine chiller?"
            {...register("WINECHILL")}
            error={errors.WINECHILL?.message}
          />
        </fieldset>
        <br />

        <fieldset>
          <legend>Standalone freezers</legend>

          <Input
            label="Count"
            type="number"
            min={0}
            {...register("NUMFREEZ", { setValueAs: (v) => Number(v) })}
            error={errors.NUMFREEZ?.message}
          />
          {usesPrimaryFreezer && (
            <>
              <h4>Primary</h4>
              <Select
                label="Freezer type"
                options={[
                  { value: UPRTFRZR.CHEST, label: "Chest" },
                  { value: UPRTFRZR.UPRIGHT, label: "Upright" },
                ]}
                {...register("UPRTFRZR")}
                error={errors.UPRTFRZR?.message}
              />
            </>
          )}
        </fieldset>
        <br />

        <fieldset>
          <legend>Range</legend>
          <Input
            label="Range?"
            type="checkbox"
            checked={useRange}
            onChange={toggleUseRange}
          />
          {useRange && (
            <>
              <Select
                label="Fuel type"
                options={[
                  { value: RANGEFUEL.NATURAL_GAS, label: "Natural gas" },
                  { value: RANGEFUEL.PROPANE, label: "Propane" },
                  { value: RANGEFUEL.ELECTRICITY, label: "Electricity" },
                  {
                    value: RANGEFUEL.DUAL_FUEL,
                    label: "Dual fuel (gas/electric)",
                  },
                ]}
              />
              <Input
                label="Cooktop usage"
                type="number"
                min={0}
                helpText="Weekly uses"
                {...register("RCOOKUSE", { setValueAs: (v) => Number(v) })}
                error={errors.RCOOKUSE?.message}
              />
              <Input
                label="Oven usage"
                type="number"
                min={0}
                helpText="Weekly uses"
                {...register("ROVENUSE", { setValueAs: (v) => Number(v) })}
                error={errors.ROVENUSE?.message}
              />
            </>
          )}
        </fieldset>
        <br />

        <fieldset>
          <legend>Standalone cooktops</legend>
          <Input
            label="Standalone cooktops?"
            type="checkbox"
            checked={useCooktop}
            onChange={toggleUseCooktop}
          />
          {useCooktop && (
            <>
              <Select
                label="Fuel type"
                options={[
                  { value: COOKTOPFUEL.NATURAL_GAS, label: "Natural gas" },
                  { value: COOKTOPFUEL.PROPANE, label: "Propane" },
                  { value: COOKTOPFUEL.ELECTRICITY, label: "Electricity" },
                ]}
              />
              <Input
                label="Usage"
                type="number"
                min={0}
                helpText="Weekly uses"
                {...register("COOKTOPUSE", { setValueAs: (v) => Number(v) })}
                error={errors.COOKTOPUSE?.message}
              />
            </>
          )}
        </fieldset>
        <br />

        <fieldset>
          <legend>Standalone ovens</legend>
          <Input
            label="Standalone ovens?"
            type="checkbox"
            checked={useOven}
            onChange={toggleUseOven}
          />
          {useOven && (
            <>
              <Select
                label="Fuel type"
                options={[
                  { value: OVENFUEL.NATURAL_GAS, label: "Natural gas" },
                  { value: OVENFUEL.PROPANE, label: "Propane" },
                  { value: OVENFUEL.ELECTRICITY, label: "Electricity" },
                ]}
              />
              <Input
                label="Usage"
                type="number"
                min={0}
                helpText="Weekly uses"
                {...register("OVENUSE", { setValueAs: (v) => Number(v) })}
                error={errors.OVENUSE?.message}
              />
            </>
          )}
        </fieldset>
        <br />

        <fieldset>
          <legend>Microwaves</legend>
          <Input
            label="Count"
            type="number"
            min={0}
            {...register("MICRO", { setValueAs: (v) => Number(v) })}
            error={errors.MICRO?.message}
          />
          {usesMicro && (
            <Input
              label="Usage"
              type="number"
              min={0}
              helpText="Weekly uses"
              {...register("AMTMICRO", { setValueAs: (v) => Number(v) })}
              error={errors.AMTMICRO?.message}
            />
          )}
        </fieldset>
        <br />

        <fieldset>
          <legend>Outdoor grill</legend>
          <Input
            label="Outdoor grill?"
            type="checkbox"
            checked={useGrill}
            onChange={toggleUseGrill}
          />
          {useGrill && (
            <Select
              label="Fuel type"
              options={[
                { value: OUTGRILLFUEL.NATURAL_GAS, label: "Natural gas" },
                { value: OUTGRILLFUEL.PROPANE, label: "Propane" },
                { value: OUTGRILLFUEL.CHARCOAL, label: "Charcoal" },
              ]}
            />
          )}
        </fieldset>
        <br />

        <fieldset>
          <legend>Dishwasher</legend>
          <Input
            label="Dish washer?"
            type="checkbox"
            {...register("DISHWASH")}
            error={errors.DISHWASH?.message}
          />
          {usesDwash && (
            <>
              <Input
                label="Usage"
                type="number"
                min={0}
                helpText="Weekly cycles"
                {...register("DWASHUSE", { setValueAs: (v) => Number(v) })}
                error={errors.DWASHUSE?.message}
              />
              <Select
                label="Cycle"
                options={[
                  {
                    value: DWCYCLE.NORMAL_WITHOUT_HEAT_DRY,
                    label: "Normal (no heated dry)",
                  },
                  {
                    value: DWCYCLE.NORMAL_WITH_HEAT_DRY,
                    label: "Normal (heated dry)",
                  },
                  {
                    value: DWCYCLE.HEAVY_POTS_AND_PANS,
                    label: "Heavy/Pots and pans",
                  },
                  {
                    value: DWCYCLE.LIGHT_DELICATE,
                    label: "Light/Delicate",
                  },
                  {
                    value: DWCYCLE.ENERGY_SAVER,
                    label: "Energy saver",
                  },
                  {
                    value: DWCYCLE.QUICK,
                    label: "Quick",
                  },
                ]}
                {...register("DWCYCLE")}
                error={errors.DWCYCLE?.message}
              />
            </>
          )}
        </fieldset>
        <br />

        <fieldset>
          <legend>Clothes washer</legend>
          <Input
            label="Clothes washer?"
            type="checkbox"
            {...register("CWASHER")}
            error={errors.CWASHER?.message}
          />
          {usesCwash && (
            <>
              <Input
                label="Washer usage"
                type="number"
                min={0}
                helpText="Weekly loads"
                {...register("WASHLOAD", { setValueAs: (v) => Number(v) })}
                error={errors.WASHLOAD?.message}
              />
              <Select
                label="Type"
                options={[
                  { value: TOPFRONT.TOP_LOADING, label: "Top loading" },
                  { value: TOPFRONT.FRONT_LOADING, label: "Front loading" },
                ]}
                {...register("TOPFRONT")}
                error={errors.TOPFRONT?.message}
              />
              <Select
                label="Temperature"
                options={[
                  { value: WASHTEMP.COLD, label: "Cold" },
                  { value: WASHTEMP.WARM, label: "Warm" },
                  { value: WASHTEMP.HOT, label: "Hot" },
                ]}
                {...register("WASHTEMP")}
                error={errors.WASHTEMP?.message}
              />
            </>
          )}
        </fieldset>
        <br />

        <fieldset>
          <legend>Clothes dryer</legend>

          <Input
            label="Clothes dryer?"
            type="checkbox"
            {...register("DRYER")}
            error={errors.DRYER?.message}
          />
          {usesDryer && (
            <>
              <Select
                label="Fuel type"
                options={[
                  { value: DRYRFUEL.NATURAL_GAS, label: "Natural gas" },
                  { value: DRYRFUEL.PROPANE, label: "Propane" },
                  { value: DRYRFUEL.ELECTRICITY, label: "Electricity" },
                ]}
                {...register("DRYRFUEL")}
                error={errors.DRYRFUEL?.message}
              />
              <Input
                label="Dryer usage"
                type="number"
                min={0}
                helpText="Weekly loads"
                {...register("DRYRUSE", { setValueAs: (v) => Number(v) })}
                error={errors.DRYRUSE?.message}
              />
            </>
          )}
        </fieldset>

        <p>
          <button type="submit">Continue</button>
        </p>
      </form>
    </div>
  );
}

export default ApplianceForm;
