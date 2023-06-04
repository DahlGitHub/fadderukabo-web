import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth} from "../../../firebase";
import Link from "next/link";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserNav } from "../UserNav";

const Dashboard = () => {

    const username = auth.currentUser?.displayName;

    return(
        <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
            <div>Welcome {username} !

            </div>

        </div>
    )
}

export default Dashboard