
import { auth } from '@/services/firebaseConfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, getAuth } from 'firebase/auth';


// export const login =async ({ email, password }: { email: string, password: string }) => {
//     const navigate = useNavigate()

//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             const user = userCredential.user;
//             navigate("/dashboard/home")
//             console.log(user, 'sign in')
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log(errorCode, errorMessage)
//         });
// }


export const login = async ({ email, password }: { email: string, password: string }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return userCredential.user
    }
    catch (err) {
        throw err
    }
}



export const register = async ({ email, password, name }: { email: string, password: string, name: string }) => {
    console.log(name)
    try {
        const userData = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(userData.user, { displayName: name })
        console.log(userData.user, 'userData')
        return userData
    }
    catch (err) {
        console.log(err)
    }
}