export default function Br({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array(count)
        .fill("")
        .map(() => (
          <br />
        ))}
    </>
  );
}
