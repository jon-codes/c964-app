import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Input from "./components/Input";
import RadioGroup from "./components/RadioGroup";
import Select from "./components/Select";
import {
  ADQINSUL,
  FUELPOOL,
  PredictBody,
  ROOFTYPE,
  STORIES,
  TYPEGLASS,
  TYPEHUQ,
  WALLTYPE,
  YEARMADERANGE,
} from "./libs/api/types";

const BASEMENT_COMPOSITE = {
  NONE: "0",
  UNFINISHED: "1",
  FINISHED: "2",
} as const;

const ATTIC_COMPOSITE = {
  NONE: "0",
  UNFINISHED: "1",
  FINISHED: "2",
} as const;

const GARAGE_COMPOSITE = {
  NONE: "0",
  ONE_CAR: "1",
  TWO_CAR: "2",
  THREE_OR_MORE_CAR: "3",
} as const;

const FUELTUB_COMPOSITE = {
  NONE: "0",
  NATURAL_GAS: "1",
  PROPANE: "2",
  FUEL_OIL: "3",
  ELECTRICITY: "5",
  OTHER: "99",
} as const;

type BASEMENT_COMPOSITE = "unfinished" | "finished";

const FormSchema = z.object({
  TYPEHUQ: z.nativeEnum(TYPEHUQ, {
    errorMap: () => ({ message: "Please select a home type." }),
  }),
  BASEMENT_COMPOSITE: z
    .nativeEnum(BASEMENT_COMPOSITE, {
      errorMap: () => ({ message: "Please select a basement type." }),
    })
    .optional(),
  ATTIC_COMPOSITE: z
    .nativeEnum(ATTIC_COMPOSITE, {
      errorMap: () => ({ message: "Please select an attic type." }),
    })
    .optional(),
  STORIES: z
    .nativeEnum(STORIES, {
      errorMap: () => ({ message: "Please select the number of stories." }),
    })
    .optional(),
  GARAGE_COMPOSITE: z
    .nativeEnum(GARAGE_COMPOSITE, {
      errorMap: () => ({ message: "Please select a garage size." }),
    })
    .optional(),
  YEARMADERANGE: z.nativeEnum(YEARMADERANGE, {
    errorMap: () => ({ message: "Please select a home age." }),
  }),
  SQFTEST: z.number().int().min(250),
  BEDROOMS: z.number().int().min(1),
  NCOMBATH: z.number().int().min(0),
  NHAFBATH: z.number().int().min(0),
  WALLTYPE: z.nativeEnum(WALLTYPE),
  ROOFTYPE: z.nativeEnum(ROOFTYPE).optional(),
  HIGHCEIL: z.boolean().optional(),
  TYPEGLASS: z.nativeEnum(TYPEGLASS),
  TREESHAD: z.boolean().optional(),
  ADQINSUL: z.nativeEnum(ADQINSUL),
  FUELPOOL: z.nativeEnum(FUELPOOL).optional(),
  FUELTUB_COMPOSITE: z.nativeEnum(FUELTUB_COMPOSITE).optional(),
});

type FormData = z.infer<typeof FormSchema>;

interface HomeFormProps {
  proceed: (partialBody: Partial<PredictBody>) => void;
}

function HomeForm({ proceed }: HomeFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      BASEMENT_COMPOSITE: BASEMENT_COMPOSITE.NONE,
      ATTIC_COMPOSITE: ATTIC_COMPOSITE.NONE,
      GARAGE_COMPOSITE: GARAGE_COMPOSITE.NONE,
      FUELPOOL: FUELPOOL.NONE,
      FUELTUB_COMPOSITE: FUELTUB_COMPOSITE.NONE,
    },
    shouldUnregister: true,
    shouldUseNativeValidation: false,
  });

  const TYPEHUQ_VALUE = watch("TYPEHUQ");

  const isSingleFamily =
    TYPEHUQ_VALUE === TYPEHUQ.SINGLE_FAMILY_DETACHED ||
    TYPEHUQ_VALUE === TYPEHUQ.SINGLE_FAMILY_ATTACHED;

  const showRoof =
    TYPEHUQ_VALUE === TYPEHUQ.SINGLE_FAMILY_DETACHED ||
    TYPEHUQ_VALUE === TYPEHUQ.SINGLE_FAMILY_ATTACHED ||
    TYPEHUQ_VALUE === TYPEHUQ.APARTMENT_SMALL;

  const onSubmit = (data: FormData) => {
    proceed({
      TYPEHUQ: data.TYPEHUQ,
      CELLAR: data.BASEMENT_COMPOSITE === BASEMENT_COMPOSITE.UNFINISHED,
      BASEFIN: data.BASEMENT_COMPOSITE === BASEMENT_COMPOSITE.FINISHED,
      ATTIC: data.ATTIC_COMPOSITE === ATTIC_COMPOSITE.UNFINISHED,
      ATTICFIN: data.ATTIC_COMPOSITE === ATTIC_COMPOSITE.FINISHED,
      STORIES: data.STORIES,
      SIZEOFGARAGE:
        data.GARAGE_COMPOSITE === GARAGE_COMPOSITE.NONE
          ? undefined
          : data.GARAGE_COMPOSITE,
      YEARMADERANGE: data.YEARMADERANGE,
      BEDROOMS: Math.min(data.BEDROOMS, 6),
      NCOMBATH: Math.min(data.NCOMBATH, 4),
      NHAFBATH: Math.min(data.NHAFBATH, 2),
      WALLTYPE: data.WALLTYPE,
      ROOFTYPE: data.ROOFTYPE,
      HIGHCEIL: data.HIGHCEIL,
      TYPEGLASS: data.TYPEGLASS,
      TREESHAD: data.TREESHAD,
      ADQINSUL: data.ADQINSUL,
      FUELPOOL: data.FUELPOOL,
      FUELTUB:
        data.FUELTUB_COMPOSITE === FUELTUB_COMPOSITE.NONE
          ? undefined
          : data.FUELTUB_COMPOSITE,
      SQFTEST: Math.min(data.SQFTEST, 15000),
      BASEHEAT:
        data.BASEMENT_COMPOSITE === BASEMENT_COMPOSITE.FINISHED ? true : false,
      ATTCHEAT:
        data.ATTIC_COMPOSITE === ATTIC_COMPOSITE.FINISHED ? true : false,
    });
  };

  return (
    <div>
      <h2>Home</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RadioGroup
          label="Type"
          name="TYPEHUQ"
          fields={[
            {
              value: TYPEHUQ.MOBILE_HOME,
              label: "Mobile home",
            },
            {
              value: TYPEHUQ.SINGLE_FAMILY_DETACHED,
              label: "Single-family detached",
            },
            {
              value: TYPEHUQ.SINGLE_FAMILY_ATTACHED,
              label: "Single-family attached",
            },
            {
              value: TYPEHUQ.APARTMENT_SMALL,
              label: "Small apartment (2-4 units)",
            },
            {
              value: TYPEHUQ.APARTMENT_LARGE,
              label: "Large apartment (5+ units)",
            },
          ]}
          register={register}
          error={errors.TYPEHUQ?.message}
        />
        <RadioGroup
          label="Age"
          name="YEARMADERANGE"
          fields={[
            { value: YEARMADERANGE.BEFORE_1950, label: "Before 1950" },
            {
              value: YEARMADERANGE.FROM_1950_TO_1959,
              label: "1950 to 1959",
            },
            {
              value: YEARMADERANGE.FROM_1960_TO_1969,
              label: "1960 to 1969",
            },
            {
              value: YEARMADERANGE.FROM_1970_TO_1979,
              label: "1970 to 1979",
            },
            {
              value: YEARMADERANGE.FROM_1980_TO_1989,
              label: "1980 to 1989",
            },
            {
              value: YEARMADERANGE.FROM_1990_TO_1999,
              label: "1990 to 1999",
            },
            {
              value: YEARMADERANGE.FROM_2000_TO_2009,
              label: "2000 to 2009",
            },
            {
              value: YEARMADERANGE.FROM_2010_TO_2015,
              label: "2010 to 2015",
            },
            {
              value: YEARMADERANGE.FROM_2016_TO_PRESENT,
              label: "After 2015",
            },
          ]}
          register={register}
          error={errors.YEARMADERANGE?.message}
        />

        {TYPEHUQ_VALUE !== TYPEHUQ.MOBILE_HOME &&
          TYPEHUQ_VALUE !== TYPEHUQ.APARTMENT_LARGE && (
            <RadioGroup
              label="Stories"
              name="STORIES"
              fields={[
                {
                  value: STORIES.ONE,
                  label: "One story",
                },
                {
                  value: STORIES.TWO,
                  label: "Two stories",
                },
                {
                  value: STORIES.THREE,
                  label: "Three stories",
                },
                {
                  value: STORIES.FOUR_OR_MORE,
                  label: "Four or more stories",
                },
                {
                  value: STORIES.SPLIT,
                  label: "Split-level",
                },
              ]}
              register={register}
              error={errors.STORIES?.message}
            />
          )}

        <fieldset>
          <legend>Size</legend>
          <Input
            label="Square footage"
            type="number"
            min={0}
            {...register("SQFTEST", { setValueAs: (v) => Number(v) })}
            error={errors.SQFTEST?.message}
          />
          <Input
            label="Bedrooms"
            type="number"
            min={0}
            {...register("BEDROOMS", { setValueAs: (v) => Number(v) })}
            error={errors.BEDROOMS?.message}
          />
          <Input
            label="Full bathrooms"
            type="number"
            min={0}
            {...register("NCOMBATH", { setValueAs: (v) => Number(v) })}
            error={errors.NCOMBATH?.message}
          />
          <Input
            label="Half bathrooms"
            type="number"
            min={0}
            {...register("NHAFBATH", { setValueAs: (v) => Number(v) })}
            error={errors.NHAFBATH?.message}
          />
        </fieldset>
        <br />

        <>
          {isSingleFamily && (
            <RadioGroup
              label="Basement"
              name="BASEMENT_COMPOSITE"
              fields={[
                {
                  value: BASEMENT_COMPOSITE.NONE,
                  label: "None",
                },
                {
                  value: BASEMENT_COMPOSITE.UNFINISHED,
                  label: "Unfinished",
                },
                {
                  value: BASEMENT_COMPOSITE.FINISHED,
                  label: "Finished",
                },
              ]}
              register={register}
              error={errors.BASEMENT_COMPOSITE?.message}
            />
          )}
          {isSingleFamily && (
            <RadioGroup
              label="Attic"
              name="ATTIC_COMPOSITE"
              fields={[
                {
                  value: ATTIC_COMPOSITE.NONE,
                  label: "None",
                },
                {
                  value: ATTIC_COMPOSITE.UNFINISHED,
                  label: "Unfinished",
                },
                {
                  value: ATTIC_COMPOSITE.FINISHED,
                  label: "Finished",
                },
              ]}
              register={register}
              error={errors.ATTIC_COMPOSITE?.message}
            />
          )}
          {isSingleFamily && (
            <RadioGroup
              label="Garage"
              name="GARAGE_COMPOSITE"
              fields={[
                {
                  value: GARAGE_COMPOSITE.NONE,
                  label: "None",
                },
                {
                  value: GARAGE_COMPOSITE.ONE_CAR,
                  label: "1 car",
                },
                {
                  value: GARAGE_COMPOSITE.TWO_CAR,
                  label: "2 cars",
                },
                {
                  value: GARAGE_COMPOSITE.THREE_OR_MORE_CAR,
                  label: "3 or more cars",
                },
              ]}
              register={register}
              error={errors.GARAGE_COMPOSITE?.message}
            />
          )}
          <fieldset>
            <legend>Structure</legend>

            <Input
              type="checkbox"
              label="High ceilings?"
              {...register("HIGHCEIL")}
            />

            <Input
              type="checkbox"
              label="Tree shade?"
              {...register("TREESHAD")}
            />

            {showRoof && (
              <Select
                label="Roof material"
                options={[
                  {
                    value: ROOFTYPE.CERAMIC_OR_CLAY_TILE,
                    label: "Ceramic or clay tile",
                  },
                  { value: ROOFTYPE.WOOD_SHINGLES, label: "Wood shingles" },
                  { value: ROOFTYPE.METAL, label: "Metal" },
                  {
                    value: ROOFTYPE.SLATE_OR_SYNTHETIC_SLATE,
                    label: "Slate or synthetic slate",
                  },
                  {
                    value: ROOFTYPE.ASPHALT_SHINGLES,
                    label: "Asphalt shingles",
                  },
                  { value: ROOFTYPE.CONCRETE_TILE, label: "Concrete tile" },
                  { value: ROOFTYPE.OTHER, label: "Other" },
                ]}
                {...register("ROOFTYPE")}
              />
            )}

            <Select
              label="Wall material"
              options={[
                { value: WALLTYPE.BRICK, label: "Brick" },
                { value: WALLTYPE.WOOD, label: "Wood" },
                { value: WALLTYPE.SIDING, label: "Siding" },
                { value: WALLTYPE.STUCCO, label: "Stucco" },
                { value: WALLTYPE.SHINGLE, label: "Shingle" },
                { value: WALLTYPE.STONE, label: "Stone" },
                { value: WALLTYPE.CONCRETE, label: "Concrete" },
              ]}
              {...register("WALLTYPE")}
            />

            <Select
              label="Window type"
              options={[
                {
                  value: TYPEGLASS.SINGLE_PANE,
                  label: "Single-pane",
                },
                {
                  value: TYPEGLASS.DOUBLE_PANE,
                  label: "Double-pane",
                },
                {
                  value: TYPEGLASS.TRIPLE_PANE,
                  label: "Triple-pane",
                },
              ]}
              {...register("TYPEGLASS")}
            />

            <Select
              label="Insulation level"
              options={[
                {
                  value: ADQINSUL.WELL_INSULATED,
                  label: "Well insulated",
                },
                {
                  value: ADQINSUL.ADEQUATELY_INSULATED,
                  label: "Adequately insulated",
                },
                {
                  value: ADQINSUL.POORLY_INSULATED,
                  label: "Poorly insulated",
                },
                {
                  value: ADQINSUL.NOT_INSULATED,
                  label: "Not insulated",
                },
              ]}
              {...register("ADQINSUL")}
            />
          </fieldset>
          <br />
        </>

        <fieldset>
          <legend>Pools</legend>

          <Select
            label="Heated pool fuel"
            options={[
              { value: FUELPOOL.NONE, label: "None" },
              { value: FUELPOOL.NATURAL_GAS, label: "Natural gas" },
              { value: FUELPOOL.PROPANE, label: "Propane" },
              { value: FUELPOOL.FUEL_OIL, label: "Fuel oil" },
              { value: FUELPOOL.ELECTRICITY, label: "Electricity" },
              { value: FUELPOOL.OTHER, label: "Other" },
            ]}
            {...register("FUELPOOL")}
          />

          <Select
            label="Hot tub fuel"
            options={[
              { value: FUELTUB_COMPOSITE.NONE, label: "None" },
              { value: FUELTUB_COMPOSITE.NATURAL_GAS, label: "Natural gas" },
              { value: FUELTUB_COMPOSITE.PROPANE, label: "Propane" },
              { value: FUELTUB_COMPOSITE.FUEL_OIL, label: "Fuel oil" },
              { value: FUELTUB_COMPOSITE.ELECTRICITY, label: "Electricity" },
              { value: FUELTUB_COMPOSITE.OTHER, label: "Other" },
            ]}
            {...register("FUELTUB_COMPOSITE")}
          />
        </fieldset>

        <p>
          <button type="submit">Continue</button>
        </p>
      </form>
    </div>
  );
}

export default HomeForm;
