import { forwardRef, type TargetedEvent, useId } from "preact/compat";

interface InputProps {
  type?: "text" | "number" | "checkbox";
  min?: number | string;
  max?: number | string;
  label: string;
  name?: string;
  error?: string;
  helpText?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  checked?: boolean;
  onBlur?: (event: TargetedEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onChange?: (event: Event) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      min,
      max,
      label,
      name,
      error,
      helpText,
      placeholder,
      disabled,
      value,
      checked,
      onBlur,
      onChange,
      onFocus,
    },
    ref,
  ) => {
    const inputId = useId();

    return (
      <p>
        <label class="no-wrap" htmlFor={inputId}>
          {label}
        </label>
        <span> </span>
        <input
          id={inputId}
          type={type}
          min={min}
          max={max}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={onBlur}
          onInput={onChange}
          onFocus={onFocus}
          value={value}
          checked={type === "checkbox" ? checked : undefined}
          aria-describedby={helpText ? `${inputId}-help` : undefined}
          aria-errormessage={error ? `${inputId}-error` : undefined}
          ref={ref}
        />
        {(error || helpText) && (
          <>
            <span> </span>
            <em
              id={`${inputId}-${error ? "error" : "help"}`}
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

export default Input;
