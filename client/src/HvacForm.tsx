import { zodResolver } from "@hookform/resolvers/zod";
import { useReducer } from "preact/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Input from "./components/Input";
import Select from "./components/Select";
import {
  ACEQUIPAUXTYPE_PUB,
  ACEQUIPM_PUB,
  DEHUMTYPE,
  EQUIPAUXTYPE,
  EQUIPM,
  FUELAUX,
  FUELH2O,
  FUELH2O2,
  FUELHEAT,
  HUMIDTYPE,
  type PredictBody,
  WHEATSIZ,
} from "./libs/api/types";

const FormSchema = z.object({
  HEATHOME: z.boolean(),
  HEATAPT: z.boolean().optional(),
  EQUIPM: z
    .nativeEnum(EQUIPM, {
      errorMap: () => ({ message: "Please select a type." }),
    })
    .optional(),
  FUELHEAT: z
    .nativeEnum(FUELHEAT, {
      errorMap: () => ({ message: "Please select a fuel type." }),
    })
    .optional(),
  EQUIPAUXTYPE: z
    .nativeEnum(EQUIPAUXTYPE, {
      errorMap: () => ({ message: "Please select a type." }),
    })
    .optional(),
  EQUIPAUX: z.boolean().optional(),
  FUELAUX: z
    .nativeEnum(FUELAUX, {
      errorMap: () => ({ message: "Please select a fuel type." }),
    })
    .optional(),
  NUMPORTEL: z.number().min(0).optional(),
  NUMFIREPLC: z.number().min(0).optional(),
  NUMPORTHUM: z.number().min(0).optional(),
  AIRCOND: z.boolean(),
  COOLAPT: z.boolean().optional(),
  ACEQUIPM_PUB: z
    .nativeEnum(ACEQUIPM_PUB, {
      errorMap: () => ({ message: "Please select a type." }),
    })
    .optional(),
  ACEQUIPAUXTYPE_PUB: z
    .nativeEnum(ACEQUIPAUXTYPE_PUB, {
      errorMap: () => ({ message: "Please select a type." }),
    })
    .optional(),
  NUMWWAC: z.number().min(0).optional(),
  NUMPORTAC: z.number().min(0).optional(),
  NUMCFAN: z.number().min(0).optional(),
  NUMFLOORFAN: z.number().min(0).optional(),
  NUMPORTDEHUM: z.number().min(0).optional(),
  H2OAPT: z.boolean().optional(),
  WHEATSIZ: z.nativeEnum(WHEATSIZ, {
    errorMap: () => ({ message: "Please select a size." }),
  }),
  FUELH2O: z.nativeEnum(FUELH2O, {
    errorMap: () => ({ message: "Please select a fuel type." }),
  }),
  MORETHAN1H2O: z.boolean().optional(),
  FUELH2O2: z
    .nativeEnum(FUELH2O2, {
      errorMap: () => ({ message: "Please select a fuel type." }),
    })
    .optional(),
});

type FormData = z.infer<typeof FormSchema>;

interface HvacFormProps {
  proceed: (partialBody: Partial<PredictBody>) => void;
}

function HvacForm({ proceed }: HvacFormProps) {
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

  const HEATHOME_VALUE = watch("HEATHOME");
  const EQUIPM_VALUE = watch("EQUIPM");
  const EQUIPAUX_VALUE = watch("EQUIPAUX");
  const EQUIPAUXTYPE_VALUE = watch("EQUIPAUXTYPE");
  const AIRCOND_VALUE = watch("AIRCOND");
  const ACEQUIPM_PUB_VALUE = watch("ACEQUIPM_PUB");
  const ACEQUIPAUXTYPE_PUB_VALUE = watch("ACEQUIPAUXTYPE_PUB");
  const MORETHAN1H2O_VALUE = watch("MORETHAN1H2O");

  const [usesHumidifier, toggleUsesHumidifier] = useReducer(
    (prev) => !prev,
    false,
  );
  const [usesDehumidifier, toggleUsesDehumidifier] = useReducer(
    (prev) => !prev,
    false,
  );
  const [usesSecondaryAc, toggleUsesSecondaryAc] = useReducer(
    (prev) => !prev,
    false,
  );

  const usesHeating = HEATHOME_VALUE === true;
  const usesSecondaryHeating = EQUIPAUX_VALUE === true;

  const usesPortableElectricHeaters =
    EQUIPM_VALUE === EQUIPM.PORTABLE_ELECTRIC_HEATERS ||
    EQUIPAUXTYPE_VALUE === EQUIPAUXTYPE.PORTABLE_ELECTRIC_HEATERS;
  const usesFireplace = EQUIPAUXTYPE_VALUE === EQUIPAUXTYPE.FIREPLACE;

  const usesAc = AIRCOND_VALUE === true;
  const usesWindowAc =
    ACEQUIPM_PUB_VALUE === ACEQUIPM_PUB.ROOM_AIR_CONDITIONER ||
    ACEQUIPAUXTYPE_PUB_VALUE === ACEQUIPM_PUB.ROOM_AIR_CONDITIONER;
  const usesPortableAc =
    ACEQUIPM_PUB_VALUE === ACEQUIPM_PUB.PORTABLE_AIR_CONDITIONER ||
    ACEQUIPAUXTYPE_PUB_VALUE === ACEQUIPAUXTYPE_PUB.PORTABLE_AIR_CONDITIONER;

  const moreThanOneWaterHeater = MORETHAN1H2O_VALUE === true;

  const onSubmit = (data: FormData) => {
    proceed({
      ...data,
      DEHUMTYPE: data.NUMPORTDEHUM
        ? DEHUMTYPE.PORTABLE_DEHUMIDIFIER
        : DEHUMTYPE.NONE,
      HUMIDTYPE: usesHumidifier
        ? HUMIDTYPE.PORTABLE_HUMIDIFIER
        : HUMIDTYPE.NONE,
      EQUIPAUXTYPE: data.EQUIPAUX ? data.EQUIPAUXTYPE : EQUIPAUXTYPE.NONE,
      ACEQUIPAUXTYPE_PUB: data.ACEQUIPAUXTYPE_PUB || ACEQUIPAUXTYPE_PUB.NONE,
    });
  };

  return (
    <div>
      <h2>Heating & cooling</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Heating</legend>
          <Input
            label="Heating?"
            type="checkbox"
            {...register("HEATHOME")}
            error={errors.HEATHOME?.message}
          />
          {usesHeating && (
            <>
              <Input
                label="Heating shared?"
                type="checkbox"
                {...register("HEATAPT")}
                error={errors.HEATAPT?.message}
              />
              <Select
                label="Equipment type"
                options={[
                  { value: EQUIPM.STEAM, label: "Steam pump" },
                  { value: EQUIPM.CENTRAL_FURNACE, label: "Central furnace" },
                  { value: EQUIPM.CENTRAL_PUMP, label: "Central pump" },
                  {
                    value: EQUIPM.BUILT_IN_ELECTRIC_UNITS,
                    label: "Built-in electric units",
                  },
                  {
                    value: EQUIPM.BUILT_IN_GAS_OR_OIL_UNITS,
                    label: "Built-in gas or oil units",
                  },
                  { value: EQUIPM.WOOD_STOVE, label: "Wood stove" },
                  {
                    value: EQUIPM.PORTABLE_ELECTRIC_HEATERS,
                    label: "Portable electric heaters",
                  },
                  {
                    value: EQUIPM.DUCTLESS_HEAT_PUMP,
                    label: "Ductless heat pump",
                  },
                  { value: EQUIPM.OTHER, label: "Other" },
                ]}
                {...register("EQUIPM")}
                error={errors.EQUIPM?.message}
              />
              <Select
                label="Fuel type"
                options={[
                  { value: FUELHEAT.NATURAL_GAS, label: "Natural gas" },
                  { value: FUELHEAT.PROPANE, label: "Propane" },
                  { value: FUELHEAT.FUEL_OIL, label: "Fuel oil" },
                  { value: FUELHEAT.ELECTRICITY, label: "Electricity" },
                  { value: FUELHEAT.WOOD, label: "Wood" },
                  { value: FUELHEAT.OTHER, label: "Other" },
                ]}
                {...register("FUELHEAT")}
                error={errors.FUELHEAT?.message}
              />
            </>
          )}
        </fieldset>
        <br />

        {usesHeating && (
          <>
            <fieldset>
              <legend>Secondary heating</legend>
              <Input
                label="Secondary heating?"
                type="checkbox"
                {...register("EQUIPAUX")}
                error={errors.EQUIPAUX?.message}
              />
              {usesSecondaryHeating && (
                <>
                  <Select
                    label="Equipment type"
                    options={[
                      {
                        value: EQUIPAUXTYPE.BUILT_IN_ELECTRIC_UNITS,
                        label: "Built-in electric units",
                      },
                      { value: EQUIPAUXTYPE.WOOD_STOVE, label: "Wood stove" },
                      { value: EQUIPAUXTYPE.FIREPLACE, label: "Fireplace" },
                      {
                        value: EQUIPAUXTYPE.PORTABLE_ELECTRIC_HEATERS,
                        label: "Portable electric heaters",
                      },
                      {
                        value: EQUIPAUXTYPE.DUCTLESS_MINI_SPLIT,
                        label: "Ductless mini-split",
                      },
                      { value: EQUIPAUXTYPE.OTHER, label: "Other" },
                    ]}
                    {...register("EQUIPAUXTYPE")}
                    error={errors.EQUIPAUXTYPE?.message}
                  />

                  <Select
                    label="Fuel type"
                    options={[
                      { value: FUELAUX.NATURAL_GAS, label: "Natural gas" },
                      { value: FUELAUX.PROPANE, label: "Propane" },
                      { value: FUELAUX.FUEL_OIL, label: "Fuel oil" },
                      { value: FUELAUX.ELECTRICITY, label: "Electricity" },
                      { value: FUELAUX.WOOD, label: "Wood" },
                      { value: FUELAUX.OTHER, label: "Other" },
                    ]}
                    {...register("FUELAUX")}
                    error={errors.FUELAUX?.message}
                  />
                </>
              )}
            </fieldset>
            <br />
          </>
        )}

        <fieldset>
          <legend>Other heating</legend>
          {usesPortableElectricHeaters && (
            <Input
              label="Electric heaters"
              type="number"
              min={0}
              {...register("NUMPORTEL", {
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
              error={errors.NUMPORTEL?.message}
            />
          )}
          {usesFireplace && (
            <Input
              label="Fireplaces"
              type="number"
              min={0}
              {...register("NUMFIREPLC", {
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
              error={errors.NUMFIREPLC?.message}
            />
          )}
          <Input
            label="Humidifier?"
            type="checkbox"
            checked={usesHumidifier}
            onChange={toggleUsesHumidifier}
          />

          {usesHumidifier && (
            <Input
              label="Portable humidifiers"
              type="number"
              min={0}
              {...register("NUMPORTHUM", {
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
              error={errors.NUMPORTHUM?.message}
            />
          )}
        </fieldset>
        <br />

        <fieldset>
          <legend>Cooling</legend>
          <Input
            label="Air conditioning?"
            type="checkbox"
            {...register("AIRCOND")}
            error={errors.AIRCOND?.message}
          />
          {usesAc && (
            <>
              <Input
                label="AC shared?"
                type="checkbox"
                {...register("COOLAPT")}
                error={errors.COOLAPT?.message}
              />
              <Select
                label="Cooling type"
                options={[
                  {
                    value: ACEQUIPM_PUB.CENTRAL_AIR_CONDITIONER,
                    label: "Central air conditioner",
                  },
                  {
                    value: ACEQUIPM_PUB.DUCTLESS_MINI_SPLIT,
                    label: "Ductless mini-split",
                  },
                  {
                    value: ACEQUIPM_PUB.ROOM_AIR_CONDITIONER,
                    label: "Room unit",
                  },
                  {
                    value: ACEQUIPM_PUB.PORTABLE_AIR_CONDITIONER,
                    label: "Portable air conditioner",
                  },
                  {
                    value: ACEQUIPM_PUB.EVAPORATIVE_COOLER,
                    label: "Evaporative cooler",
                  },
                ]}
                {...register("ACEQUIPM_PUB")}
                error={errors.ACEQUIPM_PUB?.message}
              />
            </>
          )}
        </fieldset>
        <br />

        {usesAc && (
          <>
            <fieldset>
              <legend>Secondary cooling</legend>
              <Input
                label="Secondary cooling?"
                type="checkbox"
                checked={usesSecondaryAc}
                onChange={toggleUsesSecondaryAc}
              />
              {usesSecondaryAc && (
                <Select
                  label="Equipment type"
                  options={[
                    {
                      value: ACEQUIPAUXTYPE_PUB.CENTRAL_AIR_CONDITIONER,
                      label: "Central air conditioner",
                    },
                    {
                      value: ACEQUIPAUXTYPE_PUB.DUCTLESS_MINI_SPLIT,
                      label: "Ductless mini-split",
                    },
                    {
                      value: ACEQUIPAUXTYPE_PUB.ROOM_AIR_CONDITIONER,
                      label: "Window unit",
                    },
                    {
                      value: ACEQUIPAUXTYPE_PUB.PORTABLE_AIR_CONDITIONER,
                      label: "Portable air conditioner",
                    },
                    {
                      value: ACEQUIPAUXTYPE_PUB.EVAPORATIVE_COOLER,
                      label: "Evaporative cooler",
                    },
                  ]}
                  {...register("ACEQUIPAUXTYPE_PUB")}
                  error={errors.ACEQUIPAUXTYPE_PUB?.message}
                />
              )}
            </fieldset>
            <br />
          </>
        )}

        <fieldset>
          <legend>Other cooling</legend>
          {usesWindowAc && (
            <Input
              label="Window ACs"
              type="number"
              min={0}
              {...register("NUMWWAC", {
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
              error={errors.NUMWWAC?.message}
            />
          )}
          {usesPortableAc && (
            <Input
              label="Portable ACs"
              type="number"
              min={0}
              {...register("NUMPORTAC", {
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
              error={errors.NUMPORTAC?.message}
            />
          )}
          <Input
            label="Ceiling fans"
            type="number"
            min={0}
            {...register("NUMCFAN", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            error={errors.NUMCFAN?.message}
          />
          <Input
            label="Floor fans"
            type="number"
            min={0}
            {...register("NUMFLOORFAN", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            error={errors.NUMFLOORFAN?.message}
          />
          <Input
            label="Dehumidifier?"
            type="checkbox"
            checked={usesDehumidifier}
            onChange={toggleUsesDehumidifier}
          />
          {usesDehumidifier && (
            <Input
              label="Portable dehumidifiers"
              type="number"
              min={0}
              {...register("NUMPORTDEHUM", {
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
              error={errors.NUMPORTDEHUM?.message}
            />
          )}
        </fieldset>
        <br />

        <fieldset>
          <legend>Water heating</legend>
          <Input
            label="Shared water heating?"
            type="checkbox"
            {...register("H2OAPT")}
            error={errors.H2OAPT?.message}
          />
          <Select
            label="Water heater size"
            options={[
              { value: WHEATSIZ.SMALL, label: "Small" },
              { value: WHEATSIZ.MEDIUM, label: "Medium" },
              { value: WHEATSIZ.LARGE, label: "Large" },
              { value: WHEATSIZ.TANKLESS, label: "Tankless" },
            ]}
            {...register("WHEATSIZ")}
            error={errors.WHEATSIZ?.message}
          />
          <Select
            label="Fuel type"
            options={[
              { value: FUELH2O.NATURAL_GAS, label: "Natural gas" },
              { value: FUELH2O.PROPANE, label: "Propane" },
              { value: FUELH2O.FUEL_OIL, label: "Fuel oil" },
              { value: FUELH2O.ELECTRICITY, label: "Electricity" },
              { value: FUELH2O.WOOD, label: "Wood" },
              { value: FUELH2O.OTHER, label: "Other" },
            ]}
            {...register("FUELH2O")}
            error={errors.FUELH2O?.message}
          />
        </fieldset>
        <br />

        <fieldset>
          <legend>Secondary water heating</legend>
          <Input
            label="More than one water heater?"
            type="checkbox"
            {...register("MORETHAN1H2O")}
            error={errors.MORETHAN1H2O?.message}
          />
          {moreThanOneWaterHeater && (
            <Select
              label="Fuel type"
              options={[
                { value: FUELH2O2.NATURAL_GAS, label: "Natural gas" },
                { value: FUELH2O2.PROPANE, label: "Propane" },
                { value: FUELH2O2.FUEL_OIL, label: "Fuel oil" },
                { value: FUELH2O2.ELECTRICITY, label: "Electricity" },
                { value: FUELH2O2.WOOD, label: "Wood" },
                { value: FUELH2O2.OTHER, label: "Other" },
              ]}
              {...register("FUELH2O2")}
              error={errors.FUELH2O2?.message}
            />
          )}
        </fieldset>

        <p>
          <button type="submit">Continue</button>
        </p>
      </form>
    </div>
  );
}

export default HvacForm;
