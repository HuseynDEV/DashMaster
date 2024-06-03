import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { ChangeEvent, useRef, useState } from "react"
import { imgData } from "@/services/firebaseConfig"
import { v4 as uuidv4 } from 'uuid'
import { uploadBytes, ref, getDownloadURL } from "firebase/storage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addBook } from "@/http/api"
import { useNavigate } from "react-router-dom"
import { LoaderCircle } from "lucide-react"
import { useTokenStore } from "@/store"


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    genre: z.string().min(2, {
        message: "Genre must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    coverImage: z.instanceof(FileList).refine(file => {
        return file.length == 1
    }, "Cover image is required"),
    // file: z.instanceof(FileList).refine(file => {
    //     return file.length == 1;
    // }, "Book PDF is required")
})

const CreateBook = () => {
    const navigate = useNavigate()

    const [image, setImage] = useState<string>('')
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            genre: "",
            description: "",

        }
    })
    const btn = useRef<HTMLButtonElement>(null)
    const addBookStore = useTokenStore(state => state.addBook)

    const coverImageRef = form.register('coverImage')
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: addBook,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['dataBooks'] });
            console.log(data, 'data')
            const allData = form.getValues()
            addBookStore({ ...allData, coverImage: image, id: data.id })
            console.log('added')
            navigate('/dashboard/books')
        }
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutateAsync({ ...values, coverImage: image })
        setImage('')
    }

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (btn.current) {
            btn.current.disabled = true
        }
        if (e.target.files) {
            const dataImg = ref(imgData, `images/${uuidv4()}`)
            uploadBytes(dataImg, e.target.files[0]).then(data => {
                getDownloadURL(data?.ref).then(val => {
                    console.log(coverImageRef)
                    setImage(val)
                    if (btn.current) {
                        btn.current.disabled = false
                    }
                })
            })
        }
    }

    return (
        <section>
            <Form  {...form}>
                <form action="" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex items-center justify-between">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href='/dashboard/books'>Books</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Ceate</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex items-center gap-2 mb-4"
                        >
                            <Button variant={"outline"}>
                                <span>Cancel</span>
                            </Button>
                            <Button type="submit" ref={btn} disabled={mutation.isPending && image !== ''}>

                                <div className="flex gap-1 items-center">{mutation.isPending && <LoaderCircle className="animate-spin" />} Submit</div>
                            </Button>
                        </div>
                    </div>

                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Create a new book</CardTitle>
                            <CardDescription>
                                Fill out the form below to create a new book
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">

                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    className="w-full"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="genre"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Genre</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    {...field}
                                                    className="w-full"
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    className="min-h-32" {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="coverImage"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Cover Image</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    className="w-full"
                                                    {...coverImageRef}
                                                    onChange={handleImage}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                {/* <FormField
                                    control={form.control}
                                    name="file"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Book PDF</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    className="w-full"
                                                    {...fileRef}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}

                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form >

        </section>
    )
}

export default CreateBook