import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth} from "../../../firebase";
import Link from "next/link";
import { toast } from "react-toastify";
import * as Avatar from '@radix-ui/react-avatar';

const Dashboard = () => {

    const username = auth.currentUser?.displayName;
    const url = auth.currentUser?.photoURL;
    const router = useRouter();

    const signOut = () => {
    
        auth.signOut().then(() => {
            toast.info("Signed out successfully");
        }
    )}
    return(
        <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
            <div>Welcome {username}</div>
            <Avatar.Root className="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                {url ? (
                <Avatar.Image
                    className="h-full w-full rounded-[inherit] object-cover" 
                    src={url}
                />
                ) : (
                <Avatar.Fallback
                    className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                    delayMs={600}
                >
                JD
                </Avatar.Fallback>
                )}
            </Avatar.Root>

            <Link href="./" onClick={signOut}>Sign out</Link>
        </div>
    )
}

export default Dashboard