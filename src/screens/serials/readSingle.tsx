import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { AppSidebar } from '@/components/app/app-sidebar'
import { ToggleTheme } from '@/components/toggleTheme'
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbPage, 
    BreadcrumbSeparator 
} from '@/components/ui/breadcrumb'

import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import ApiSerial from './service'

import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'



export function ReadSingle() {
    const [loading, setLoading] = useState(true)
    const url = useParams()
    const received = url['register']
    const[read, setRead] = useState([])
    
    const getResult = async () => {
        console.log('GET RESULt', received)
        const response = await ApiSerial.ReadSingle(received)
        if (response !== false) {
            setRead(response)
            setLoading(false)  
        }
    }
    
    useEffect(() => {
        getResult()
    }, [])

    return (
        <>
            <AppSidebar />
            <SidebarInset className='pl-9'>
                <header className='flex justify-between h-16 mt-3 ml-3 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                    <div className='flex items-center gap-2 px-4'>
                        <SidebarTrigger className='-ml-1' />
                            <Separator className='mr-2 h-4' />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className='hidden md:block'>
                                        <BreadcrumbLink>
                                            <Link to='/dashboard'>Dashboard</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className='hidden md:block' />
                                    <BreadcrumbItem className='hidden md:block'>
                                        <BreadcrumbLink>
                                            <Link to='/serials/results'>Seriais</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className='hidden md:block' />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Resultado</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                    </div>
                    <div className='pr-8'>
                        <div className='flex items-center gap-2'>
                            
                            <ToggleTheme />
                        </div>
                    </div>
                </header>

                <div className='flex flex-1 flex-col  p-4 mt-1 mr-3 ml-3'>
                    {
                        loading ? (
                            <div className="flex items-center justify-center min-h-screen">
                                <div className="w-16 h-16 border-4 border-t-transparent border-black rounded-full animate-spin" />
                            </div>
                            

                        ) : (
                            <div className='flex flex-1 flex-col  p-4 mt-1 mr-3 ml-3'>
                                <div className='col-span-2 bg-white shadow-sm p-10 rounded-md dark:bg-[#292929]'>
                                    <div className="flex justify-between items-center pb-8">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Registrador</TableHead>
                                                    <TableHead className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Valor</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className='text-black dark:text-white text-[14.5px] font-bold'>{read['register']}</TableCell>
                                                    <TableCell className='text-black dark:text-white text-[14.5px] font-bold'>{read['value']}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div> 
            </SidebarInset>
        </>
    )
}