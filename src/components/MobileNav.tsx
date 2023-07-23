import { cn } from "@/lib/utils";
import Link from "next/link";

export function MobileNav() {

    return (
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
        )}
      >
        <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
          <Link href="/" className="flex items-center space-x-2">
            
            <span className="font-bold">He</span>
          </Link>
          <nav className="grid grid-flow-row auto-rows-max text-sm">
              <Link
                href="/"
                className={cn(
                  "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                )}
              >
                Title
              </Link>
          </nav>
        </div>
      </div>
    )
  }