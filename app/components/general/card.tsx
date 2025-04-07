interface CardObject {
  headline: string;
  children: React.ReactNode;
}

export default function Card({ headline, children }: Readonly<CardObject>) {
  return (
    <div className="w-full h-fit bg-white dark:bg-dark-mode-background dark:text-white rounded-2xl drop-shadow-xl p-8 my-8">
      <div className="flex pt-5 items-center">
        <h1 className="pr-5">{headline}</h1>
        <div className="bg-gradient-to-r from-primary to-secondary w-48 h-0.5 rounded-lg"></div>
      </div>
      <div className="pt-5">{children}</div>
    </div>
  );
}
