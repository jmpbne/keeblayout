export default function KeyboardError({ message }) {
  if (!message) return null;

  return <p className="error">Invalid data: {message}</p>;
}
