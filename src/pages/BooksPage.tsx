import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { getBooks } from "@/http/api"

import { Link } from "react-router-dom"


const BooksPage = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['books'],
        queryFn: getBooks
    })


    return (
        <div>
            <div className="mb-5 flex  items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Books</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <Link to='/dashboard/books/create' className="bg-black text-white rounded-md px-4 py-2">Add Book</Link>
            </div>


            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Books</CardTitle>
                    <CardDescription>
                        Manage your books and view their sales performance.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                </TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Genre</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Price
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Author name
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Created at
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="">

                            {/* {isLoading && <div className="text-[40px] w-[100%] h-screen flex items-center justify-center">Loading</div>} */}

                            {

                                data && data?.map(item => {
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell className="hidden sm:table-cell">

                                                <img alt="Product image"
                                                    className="aspect-square rounded-md object-cover"
                                                    height="64"
                                                    src={item.coverImage}
                                                    width="64" />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {item.description}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">Fiction</Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                $499.99
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {item.username}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {item.genre}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            aria-haspopup="true"
                                                            size="icon"
                                                            variant="ghost"
                                                        >
                                                            {/* <MoreHorizontal className="h-4 w-4" /> */}
                                                            <span className="">...</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem>Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>

                                    )
                                })
                            }

                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                        products
                    </div>
                </CardFooter>
            </Card>

        </div>
    )
}

export default BooksPage