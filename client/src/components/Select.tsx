import { forwardRef, useId } from "preact/compat";

interface SelectProps {
  name?: string;
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  helpText?: string;
  disabled?: boolean;
  onBlur?: (event: FocusEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onChange?: (event: Event) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      name,
      label,
      options,
      error,
      helpText,
      disabled,
      onBlur,
      onChange,
      onFocus,
    },
    ref,
  ) => {
    const selectId = useId();

    return (
      <p>
        <label class="no-wrap" htmlFor={selectId}>
          {label}
        </label>
        <span> </span>
        <select
          id={selectId}
          name={name}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          aria-describedby={helpText ? `${selectId}-help` : undefined}
          aria-errormessage={error ? `${selectId}-error` : undefined}
          ref={ref}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {(error || helpText) && (
          <>
            <span> </span>
            <em
              id={`${selectId}-${error ? "error" : "help"}`}
              class={`no-wrap ${error ? "error" : ""}`}
            >
              {error || helpText}
            </em>
          </>
        )}
      </p>
    );
  },
);

export default Select;
