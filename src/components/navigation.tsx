import * as React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu, UserCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import MobileAuth from "./auth/mobile-auth";
import { Card } from "./ui/card";

type MenuStatus = "open" | "closed";

const MenuIcons = {
  open: () => <X />,
  closed: () => <Menu />,
};

export default function Navigation() {
  const { data: sessionData } = useSession();
  const [menuStatus, setMenuStatus] = React.useState<MenuStatus>("closed");
  const MenuIcon = MenuIcons[menuStatus];

  function handleMenuClick(open: boolean) {
    console.log("Menu clicked");
    open ? setMenuStatus("open") : setMenuStatus("closed");
  }

  function handleUserButtonClick() {
    console.log("User button clicked");
  }

  // background: radial-gradient(166.82% 166.82% at 103.90% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%);
  return (
    <>
      <header className="z-[51] h-[72px] w-full bg-gradient-to-r from-[#E84D70] via-[#A337F6] to-[#28A7ED] px-6 py-4 text-white">
        <div className="flex h-full w-full items-center justify-between">
          <h1>Blocker Tracker</h1>
          {/* Mobile */}
          <div className="flex items-center">
            <MobileAuth />

            <Sheet onOpenChange={handleMenuClick}>
              <SheetTrigger asChild>
                <Button className="ml-4" variant="ghost" size="icon">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <Card>
                  <SheetHeader>
                    <SheetTitle>Main Menu</SheetTitle>
                    <SheetDescription>Description</SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">Hello</div>
                  <SheetFooter></SheetFooter>
                </Card>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
