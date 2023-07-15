import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { auth } from "../../firebase"


export function UserAvatar() {

    return (
        <Avatar className="h-9 w-9">
        {auth.currentUser?.photoURL? (
          <AvatarImage alt="Picture" src={auth.currentUser?.photoURL} />
        ) : (
          <AvatarFallback>
            <AvatarFallback>{auth.currentUser?.displayName?.charAt(0)}</AvatarFallback>
          </AvatarFallback>
        )}
      </Avatar>
    )
}