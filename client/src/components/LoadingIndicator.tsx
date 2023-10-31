import { useId } from "preact/hooks";

interface LoadingIndicatorProps {
  label: string;
}

function LoadingIndicator({ label }: LoadingIndicatorProps) {
  const progressId = useId();
  return (
    <>
      <label htmlFor={progressId}>{label}</label>
      <span> </span>
      <progress id={progressId} />
    </>
  );
}

export default LoadingIndicator;
