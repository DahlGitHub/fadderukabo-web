import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth} from "../../../firebase";
import Link from "next/link";
import { toast } from "react-toastify";

const Dashboard = () => {

    const username = auth.currentUser?.displayName
    const router = useRouter();

    const signOut = () => {
    
        auth.signOut().then(() => {
            toast.info("Signed out successfully");
        }
    )}
    return(
        <div className="bg-white dark:bg-gray-900 text-black dark:text-white h-[calc(100vh-70px)] ">
            <div>Welcome {username}</div>
            <Link href="./" onClick={signOut}>Sign out</Link>
        </div>
    )
}

export default Dashboard