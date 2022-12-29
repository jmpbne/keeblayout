export default function KeyboardError({ message }) {
  if (!message) return null;

  return <p className="error">This configuration is invalid: {message}</p>;
}
