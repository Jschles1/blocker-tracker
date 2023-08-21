import * as React from "react";
import { useSession } from "next-auth/react";
import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";

type HomeServiceFilters = "Alphabetical" | "Status";

function HomeServiceActionDropdownMenuItem({
  filterName,
  currentFilter,
  onClick,
}: {
  filterName: HomeServiceFilters;
  currentFilter: HomeServiceFilters;
  onClick: (e: React.MouseEvent) => void;
}) {
  console.log({ filterName, currentFilter });
  return (
    <DropdownMenuItem
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between px-6 py-3 text-base hover:text-fuschia focus:bg-white focus:text-fuschia"
    >
      {filterName}{" "}
      {currentFilter === filterName && (
        <Check className="text-fuschia" size={16} />
      )}
    </DropdownMenuItem>
  );
}

type HomeServiceActionsProps = {
  disableFilter?: boolean;
};

export default function HomeServiceActions({
  disableFilter = false,
}: HomeServiceActionsProps) {
  const { data: sessionData } = useSession();
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  // TODO: Replace with state from TRPC
  const [currentFilter, setCurrentFilter] =
    React.useState<HomeServiceFilters>("Alphabetical");

  function handleOpenChange(open: boolean) {
    setIsFilterOpen(open);
  }

  function handleFilterChange(e: React.MouseEvent) {
    const newFilter = e.currentTarget.textContent!.trim() as HomeServiceFilters;
    setCurrentFilter(newFilter);
  }

  return (
    <div className="h-[56px] w-full bg-slate px-6 py-2 text-white">
      <div className="flex items-center justify-between">
        <DropdownMenu onOpenChange={handleOpenChange}>
          <DropdownMenuTrigger
            className="h-full text-[0.813rem]"
            disabled={disableFilter}
          >
            <div
              className={cn(
                "flex items-center gap-x-2",
                (disableFilter || isFilterOpen) && "text-gray"
              )}
            >
              Sort By: <span className="font-bold">{currentFilter}</span>
              <ChevronDown
                className={cn(
                  "transition-transform",
                  isFilterOpen && "rotate-180"
                )}
                size={16}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-4 mt-[1.625rem] min-w-[255px]">
            <HomeServiceActionDropdownMenuItem
              filterName="Alphabetical"
              currentFilter={currentFilter}
              onClick={handleFilterChange}
            />
            <DropdownMenuSeparator />
            <HomeServiceActionDropdownMenuItem
              filterName="Status"
              currentFilter={currentFilter}
              onClick={handleFilterChange}
            />
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="h-10">
          {sessionData?.user?.role === "ADMIN" && (
            <Button className="h-full rounded-[10px] bg-fuschia px-4 py-[0.656rem] text-white">
              + Add Service
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
