interface CardObject {
  headline: string;
  children: Readonly<{
    children: React.ReactNode;
  }>;
}

export default function Card({ headline, children }: CardObject) {
  return (
    <div className="w-full h-fit">
      <h1>{headline}</h1>
      <div>{children}</div>
    </div>
  );
}
