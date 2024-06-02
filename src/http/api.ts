
import { auth, dataBooks } from '@/services/firebaseConfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';


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

export type bookDataType = {
    username: string,
    genre: string,
    description: string,
    coverImage: string,
}

export const login = async ({ email, password }: { email: string, password: string }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const accessToken = await userCredential.user.getIdToken()
        return { accessToken, user: userCredential.user }
    }
    catch (err) {
        throw err
    }
}



export const register = async ({ email, password }: { email: string, password: string, name: string }) => {
    try {
        const userData = await createUserWithEmailAndPassword(auth, email, password)
        return userData
    }
    catch (err) {
        console.log(err)
    }
}


export const addBook = async (data: bookDataType) => {
    try {
        const dataCollection = collection(dataBooks, 'dataBooks')
        await addDoc(dataCollection, data)
    }
    catch (err) {
        console.log(err, 'err')
    }
}


export const getBooks = async () => {
    try {
        const data = collection(dataBooks, "dataBooks")
        const resp = await getDocs(data)
       return resp.docs.map(doc=>{
        const data=doc.data()
        return {...data, id:doc.id}
       })
    }
    catch (err) {
        console.log(err)
    }
}
