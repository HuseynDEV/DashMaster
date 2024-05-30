
import { auth } from '@/services/firebaseConfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


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



export const register = async ({ email, password }: { email: string, password: string }) => {
    try {
        const userData = await createUserWithEmailAndPassword(auth, email, password)
        return userData
    }
    catch (err) {
        console.log(err)
    }
}