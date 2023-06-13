import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useEffect, useState } from "react";
import AddAuthorized from "./AddAuthorized";
import Confirmation from "../Confirmation";
import Page from "./Page";

const Authorized = () => {

  return(
        <Page />
  )
}
export default Authorized;