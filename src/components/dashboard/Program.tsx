import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth} from "../../../firebase";
import Link from "next/link";
import { toast } from "react-toastify";
import * as Avatar from '@radix-ui/react-avatar';

const Program = () => {


    return(
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <div className="min-h-screen bg-gray-200">
                Hi
            </div>
            <div className="min-h-screen bg-gray-300">
                Hi
            </div>
            <div className="min-h-screen bg-gray-400">
                Hi
            </div>
        </section>
    )
}

export default Program