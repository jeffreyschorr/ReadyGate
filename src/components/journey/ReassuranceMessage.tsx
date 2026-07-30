type ReassuranceMessageProps = {
  message: string;
};

export function ReassuranceMessage({ message }: ReassuranceMessageProps) {
  return (
    <p className="max-w-2xl text-base leading-relaxed text-muted">{message}</p>
  );
}
