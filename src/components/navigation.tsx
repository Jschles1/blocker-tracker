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

export default function Navigation() {
  const { data: sessionData } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function handleMenuClick() {
    console.log("Menu clicked");
  }

  function handleUserButtonClick() {
    console.log("User button clicked");
  }

  // background: radial-gradient(166.82% 166.82% at 103.90% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%);
  return (
    <>
      <header className="z-[51] h-[72px] w-full bg-blue px-6 py-4 text-white">
        <div className="flex h-full w-full items-center justify-between">
          <h1>Blocker Tracker</h1>
          {/* Mobile */}
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleUserButtonClick}
                >
                  <UserCircle />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>Description</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">Hello</div>
                <SheetFooter></SheetFooter>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="pl-4 md:hidden"
                  variant="ghost"
                  size="icon"
                  onClick={handleMenuClick}
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Main Menu</SheetTitle>
                  <SheetDescription>Description</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">Hello</div>
                <SheetFooter></SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
