import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../../../firebase"
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthContextProps {
    user: any; // Replace 'any' with the appropriate type for your user object
    setUser: (user: any) => void; // Replace 'any' with the appropriate type for your user object
  }
  
  const AuthContext = createContext<AuthContextProps | undefined>(undefined)

interface AuthProviderProps {
    children: React.ReactNode
}

  export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useUserAuth = () => {
    return useContext(AuthContext)
}
    