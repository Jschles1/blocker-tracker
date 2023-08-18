import Navigation from "./navigation";

type AppLayoutProps = {
  children: React.ReactElement;
};

export default function Layout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray">
      <Navigation />
      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        {children}
      </main>
    </div>
  );
}
