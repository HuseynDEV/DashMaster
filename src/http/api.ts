
import { auth, dataBooks } from '@/services/firebaseConfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, getDocs, deleteDoc, doc, DocumentData } from 'firebase/firestore';


export type bookDataType = {
    username: string,
    genre: string,
    description: string,
    coverImage: string,
}

export type bookDataTypeId = {
    id: string
} & bookDataType

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


export const addBook = async (data: bookDataType): Promise<DocumentData> => {
    const dataCollection = collection(dataBooks, 'dataBooks')
    return await addDoc(dataCollection, data)

}


export const deleteBook = async (id: string): Promise<string> => {
    const deletedBook = doc(dataBooks, 'dataBooks', id)
    await deleteDoc(deletedBook)
    return id
}


export const getBooks = async (): Promise<bookDataTypeId[]> => {
    try {
        const data = collection(dataBooks, "dataBooks")
        const resp = await getDocs(data)
        return resp.docs.map(doc => {
            const data = doc.data() as bookDataType
            return { ...data, id: doc.id }
        })
    }
    catch (err) {
        console.log(err)
        throw err
    }
}
