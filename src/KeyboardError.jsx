export default function KeyboardError({ message }) {
  return message ? (
    <p className="error">This configuration is invalid: {message}</p>
  ) : null;
}
