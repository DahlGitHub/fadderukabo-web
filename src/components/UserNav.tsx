import { LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { UserAvatar } from "./UserAvatar"
import { auth } from "../../firebase"
import { toast } from "./ui/use-toast"

const signOut = () => {
    
  auth.signOut()
    .then(() => {
      toast({
        title: 'Signed out',
        description: 'You have been signed out',
      });
    })
    .catch((error) => {
      // Handle sign out error
      toast({
        title: 'Error signing out',
        description: error.message,
      })
    });
 }

export function UserNav() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="relative h-8 w-8 rounded-full">
            <UserAvatar />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{auth.currentUser?.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {auth.currentUser?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
        <Link href="./" onClick={signOut} className="hover:text-red-500 w-full flex">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}