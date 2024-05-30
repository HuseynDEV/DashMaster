import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import { useRef } from "react"
import { Link } from "react-router-dom"

import { useNavigate } from "react-router-dom"
import { login } from "@/http/api"

const Login = () => {

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordref = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            console.log('login successfuly')
            navigate('/dashboard/home')
        },
        onError: () => {
            alert("Email or Password is incorrect")
        }
    })


    const handleLoginSubmit = () => {
        const email = emailRef.current?.value
        const password = passwordref.current?.value
        if (!email || !password) {
            return alert("Please enter email and password")
        }
        mutation.mutateAsync({ email, password })
    }

    return (
        <section className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                        {mutation.isPending && <div>Loading....</div>}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input ref={emailRef} id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input ref={passwordref} id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleLoginSubmit} className="w-full" disabled={mutation.isPending} >Sign in</Button>
                </CardFooter>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/auth/register" className="underline">
                        Sign up
                    </Link>
                </div>
            </Card>

        </section>
    )
}

export default Login