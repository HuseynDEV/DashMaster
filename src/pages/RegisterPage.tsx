
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '@/services/firebaseConfig'
import { FormEvent, useState } from "react"
import { register } from "@/http/api"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"




const RegisterPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()



    const mutate = useMutation({
        mutationFn: register,
        onSuccess: () => {
            console.log('register successfully')
            navigate('/dashboard/home')
        }
    })
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!email || !password || !name) {
            alert("Please fill the all blanks")
        }
        mutate.mutateAsync({ email, password, name })
    }
    return (
        <section className="h-screen flex justify-center items-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">Name</Label>
                                <Input value={name} onChange={(e) => setName(e.target.value)} id="first-name" placeholder="Max" required />
                            </div>

                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Button type="submit" className="w-full" onClick={handleSubmit}>
                            Create an account
                        </Button>
                        <Button variant="outline" className="w-full">
                            Sign up with GitHub
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}

export default RegisterPage