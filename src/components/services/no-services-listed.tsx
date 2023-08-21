import { useSession } from "next-auth/react";
import Image, { type StaticImageData } from "next/image";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import IllustrationEmpty from "public/images/illustration-empty.svg";

export default function NoServicesListed() {
  const { data: sessionData } = useSession();
  const isAdmin = sessionData?.user?.role === "ADMIN";
  const message = isAdmin
    ? 'Click the "Add Service" button to get started.'
    : "Please try again later.";

  return (
    <Card className="h-full w-full px-6 py-[4.75rem] text-center">
      <Image
        className="mx-auto"
        src={IllustrationEmpty as StaticImageData}
        alt="No Services"
      />
      <p className="mt-[2.438rem] text-[1.125rem] font-bold text-slate">
        There are no services listed yet.
      </p>
      <p className="mb-6 mt-[0.875rem] text-dark-gray">{message}</p>
      {isAdmin && (
        <Button className="h-10 rounded-[10px] bg-fuschia px-4 py-[0.656rem] text-white">
          + Add Service
        </Button>
      )}
    </Card>
  );
}
