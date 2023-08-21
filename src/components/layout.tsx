import Navigation from "./navigation";

type AppLayoutProps = {
  children: React.ReactElement;
};

export default function Layout({ children }: AppLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center">
        <Navigation />
        <main className="flex w-full flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
