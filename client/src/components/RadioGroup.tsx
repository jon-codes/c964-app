import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface RadioGroupProps<F extends FieldValues> {
  label: string;
  fields: { value?: string; label: string }[];
  name: Path<F>;
  register: UseFormRegister<F>;
  error?: string;
}

function RadioGroup<F extends FieldValues>({
  label,
  fields,
  name,
  register,
  error,
}: RadioGroupProps<F>) {
  return (
    <>
      <fieldset>
        <legend>{label}</legend>
        {fields.map(({ value, label }) => (
          <>
            <label>
              <input type="radio" value={value} {...register(name)} />
              {label}
            </label>
            <br />
          </>
        ))}
        {error && <em className="error">{error}</em>}
      </fieldset>
      <br />
    </>
  );
}

export default RadioGroup;
