import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Input from "./components/Input";
import Select from "./components/Select";
import { COOLCNTL, HEATCNTL, TYPETHERM } from "./libs/api/types";

const FormSchema = z.object({
  TVCOLOR: z.number().int().min(0).optional(),
  PLAYSTA: z.number().int().min(0).optional(),
  DESKTOP: z.number().int().min(0).optional(),
  NUMLAPTOP: z.number().int().min(0).optional(),
  NUMTABLET: z.number().int().min(0).optional(),
  NUMSMPHONE: z.number().int().min(0).optional(),
  TYPETHERM: z.nativeEnum(TYPETHERM, {
    errorMap: () => ({ message: "Please select a type." }),
  }),
  COOLCNTL: z.nativeEnum(COOLCNTL, {
    errorMap: () => ({ message: "Please select a type." }),
  }),
  TEMPHOMEAC: z.number().int().min(0).optional(),
  HEATCNTL: z.nativeEnum(HEATCNTL, {
    errorMap: () => ({ message: "Please select a type." }),
  }),
  TEMPHOME: z.number().int().min(0).optional(),
  NHSLDMEM: z.number().int().min(0),
  EVCHRGHOME: z.boolean().optional(),
});

type FormData = z.infer<typeof FormSchema>;

interface HouseholdFormProps {
  proceed: (partialBody: Partial<FormData>) => void;
}

function HouseholdForm({ proceed }: HouseholdFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
    shouldUnregister: true,
    shouldUseNativeValidation: false,
  });

  const onSubmit = (data: FormData) => {
    proceed(data);
  };

  return (
    <div>
      <h2>Household</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Members</legend>
          <Input
            label="People in household"
            type="number"
            min={1}
            {...register("NHSLDMEM", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            error={errors.NHSLDMEM?.message}
          />
        </fieldset>
        <br />

        <fieldset>
          <legend>Thermostat</legend>
          <Select
            label="Type"
            options={[
              { value: TYPETHERM.NONE, label: "None" },
              { value: TYPETHERM.MANUAL, label: "Manual" },
              { value: TYPETHERM.PROGRAMMABLE, label: "Programmable" },
              { value: TYPETHERM.SMART, label: "Smart" },
            ]}
            {...register("TYPETHERM")}
            error={errors?.TYPETHERM?.message}
          />
          <Select
            label="Heating control"
            options={[
              { value: HEATCNTL.NO_CONTROL, label: "No control over heating" },
              {
                value: HEATCNTL.SET_AND_LEAVE_IT,
                label: "Set to one temperature and leave it",
              },
              { value: HEATCNTL.MANUALLY_ADJUST, label: "Adjust manually" },
              { value: HEATCNTL.PROGRAMMABLE, label: "Program thermostat" },
              {
                value: HEATCNTL.TURN_ON_AND_OFF_AS_NEEDED,
                label: "Turn on and off as needed",
              },
              {
                value: HEATCNTL.OTHER,
                label: "Other",
              },
            ]}
            {...register("HEATCNTL")}
            error={errors?.HEATCNTL?.message}
          />
          <Input
            label="Heating setpoint"
            type="number"
            min={50}
            max={90}
            helpText="°F"
            {...register("TEMPHOME", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            error={errors.TEMPHOME?.message}
          />
          <Select
            label="Cooling control"
            options={[
              { value: COOLCNTL.NO_CONTROL, label: "No control over cooling" },
              {
                value: COOLCNTL.SET_AND_LEAVE_IT,
                label: "Set to one temperature and leave it",
              },
              { value: COOLCNTL.MANUALLY_ADJUST, label: "Adjust manually" },
              { value: COOLCNTL.PROGRAMMABLE, label: "Program thermostat" },
              {
                value: COOLCNTL.TURN_ON_AND_OFF_AS_NEEDED,
                label: "Turn on and off as needed",
              },
              {
                value: COOLCNTL.OTHER,
                label: "Other",
              },
            ]}
            {...register("COOLCNTL")}
            error={errors?.COOLCNTL?.message}
          />
          <Input
            label="Cooling setpoint"
            type="number"
            min={50}
            max={90}
            helpText="°F"
            {...register("TEMPHOMEAC", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            error={errors.TEMPHOMEAC?.message}
          />
        </fieldset>
        <br />

        <fieldset>
          <legend>Devices</legend>

          <Input
            label="TVs"
            type="number"
            min={0}
            {...register("TVCOLOR", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            error={errors.TVCOLOR?.message}
          />
          <Input
            label="Game consoles"
            type="number"
            min={0}
            {...register("PLAYSTA", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            error={errors.PLAYSTA?.message}
          />
          <Input
            label="Desktop computers"
            type="number"
            min={0}
            {...register("DESKTOP", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            error={errors.DESKTOP?.message}
          />
          <Input
            label="Laptops"
            type="number"
            min={0}
            {...register("NUMLAPTOP", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            error={errors.NUMLAPTOP?.message}
          />
          <Input
            label="Tablets"
            type="number"
            min={0}
            {...register("NUMTABLET", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            error={errors.NUMTABLET?.message}
          />
          <Input
            label="Smartphones"
            type="number"
            min={0}
            {...register("NUMSMPHONE", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            error={errors.NUMSMPHONE?.message}
          />
          <Input
            label="Electric vehicle charged at home"
            type="checkbox"
            {...register("EVCHRGHOME", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            error={errors.EVCHRGHOME?.message}
          />
        </fieldset>
        <br />

        <p>
          <button type="submit">Continue</button>
        </p>
      </form>
    </div>
  );
}

export default HouseholdForm;
