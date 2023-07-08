import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"

export function UserAvatar() {

  const session = useSession();
    return (
        <Avatar className="h-9 w-9">
        {session.data?.user?.image ? (
          <AvatarImage alt="Picture" src={session?.data?.user?.image} />
        ) : (
          <AvatarFallback>
            <AvatarFallback>{session?.data?.user?.name?.charAt(0)}</AvatarFallback>
          </AvatarFallback>
        )}
      </Avatar>
    )
}