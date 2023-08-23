/* eslint-disable @typescript-eslint/no-misused-promises */
import * as React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { UserCircle, X } from "lucide-react";
import type { User } from "@prisma/client";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaAtlassian } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Card } from "../ui/card";

function GuestOptions() {
  async function handleUserSignIn(): Promise<void> {
    try {
      await signIn("google");
    } catch (e) {
      console.error("Error signing into Google", e);
    }
  }

  async function handleAdminSignIn(): Promise<void> {
    try {
      await signIn("atlassian");
    } catch (e) {
      console.error("Error signing into Atlassian", e);
    }
  }

  return (
    <div>
      <div>
        <p className="mb-2">User Sign in:</p>
        <Button
          className="w-full rounded-[10px] bg-slate py-[0.656rem]"
          onClick={handleUserSignIn}
        >
          <AiFillGoogleCircle size={24} className="mr-2" /> Sign in with Google
        </Button>
      </div>
      <div className="mt-4">
        <p className="mb-2">Admin Sign in:</p>
        <Button
          className="w-full rounded-[10px] bg-slate py-[0.656rem]"
          onClick={handleAdminSignIn}
        >
          <FaAtlassian size={24} className="mr-2" /> Sign in with Atlassian
        </Button>
      </div>
    </div>
  );
}

function SignedInOptions({ user }: { user: User }) {
  async function handleSignOut(): Promise<void> {
    try {
      await signOut();
    } catch (e) {
      console.error("Error signing out", e);
    }
  }

  return (
    <div>
      <p className="mb-4">
        Signed in as: <br /> <span className="font-bold">{user.name}</span>
      </p>
      <Button
        className="w-full rounded-[10px] bg-slate py-[0.656rem]"
        onClick={handleSignOut}
      >
        Sign out
      </Button>
    </div>
  );
}

type MenuStatus = "open" | "closed";

const MenuIcons = {
  open: () => <X />,
  closed: () => <UserCircle />,
};

export default function MobileAuth() {
  const { data: sessionData } = useSession();
  const [menuStatus, setMenuStatus] = React.useState<MenuStatus>("closed");
  const MenuIcon = MenuIcons[menuStatus];

  function handleMenuClick(open: boolean) {
    console.log("Menu clicked");
    open ? setMenuStatus("open") : setMenuStatus("closed");
  }

  const isLoggedIn = !!sessionData?.user;
  console.log(sessionData?.user);

  return (
    <Sheet onOpenChange={handleMenuClick}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Card className="p-6">
          <SheetHeader className="mb-4">
            <SheetTitle>Welcome!</SheetTitle>
          </SheetHeader>
          {isLoggedIn ? (
            <SignedInOptions user={sessionData.user as User} />
          ) : (
            <GuestOptions />
          )}
          <SheetFooter></SheetFooter>
        </Card>
      </SheetContent>
    </Sheet>
  );
}
