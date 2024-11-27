import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbPage, 
    BreadcrumbSeparator 
} from '@/components/ui/breadcrumb'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { AppSidebar } from '@/components/app/app-sidebar'
import { ToggleTheme } from '@/components/toggleTheme'
import { 
    SidebarInset, 
    SidebarTrigger 
} from '@/components/ui/sidebar'

import ApiBranch from './service'
import ApiClient from '../clients/service'


const FormSchema = z.object({
    client: z.string({required_error: 'Selecione o cliente'}),
    name: z.string().min(1, { message: 'Informe o nome da agência' }),
    uniorg: z.string().min(4, { message: 'Informe o uniorg da agência' }),
})


export function EditBranchs() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [clients, setClients] = useState([])
    const [branchs, setBranchs] = useState('')

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            client: '',
            name: '',
            uniorg: ''
        }
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await ApiBranch.Update({ id, data })
            if (response === 200) {                
                navigate('/branchs/select')
            } else {
                console.log('Error updating branch')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const clientList = async () => {
        const response = await ApiClient.GetAllClients()
        if (response) {
            setClients(response)
        } else {
            console.log('Error fetching branch')
        }
    }

    const getBranch = async () => {
        const response = await ApiBranch.GetBranchByID({ id })
        if (response) {
            setBranchs(response)
            form.setValue('client', response.client.toString())
            form.setValue('name', response.name.toString())
            form.setValue('uniorg', response.uniorg)
        }
        setLoading(false)
    }

    useEffect(() => {
        getBranch()
        clientList()
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
                                            <Link to='/registers'>Registradores</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className='hidden md:block' />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Adicionar</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    <div className='pr-8'>
                        <ToggleTheme />
                    </div>
                </header>
                <div className='flex flex-1 flex-col  p-4 mt-1 mr-3 ml-3'>
                    <div className='col-span-2 bg-white shadow-sm p-10 rounded-md dark:bg-[#292929]'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>                            
                                <div className='flex items-center'>
                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name="client"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Cliente</FormLabel>
                                                    { loading ? (
                                                            <p>loading</p>
                                                        ) : (
                                                            <Select
                                                                defaultValue={branchs && branchs.client ? branchs.client.toString() : ''}
                                                                onValueChange={value => {
                                                                    field.onChange(value);
                                                                }}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder='Selecione o Cliente' />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {branchs && !clients.some(client => client.name === branchs.client) && (
                                                                        <SelectItem key={branchs.id} value={branchs.client}>{branchs.client}</SelectItem>
                                                                    )}
                                                                    {
                                                                        clients.map((client) => {
                                                                            return (
                                                                                <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                                                                            )
                                                                        })
                                                                    }
                                                                </SelectContent>
                                                            </Select>
                                                        )
                                                        }
                                                <FormMessage />
                                            </FormItem>
                                        )} /> 
                                    </div>
                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='name'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nome</FormLabel>
                                                    <Input placeholder='Nome da Agência' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name='uniorg'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Uniorg</FormLabel>
                                                    <Input placeholder='Uniorg da Agência' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>                                    
                                </div>

                                <div className='pt-7'>
                                    <Button type='submit' 
                                        className='bg-black hover:bg-[#23CFCE] text-white dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                        Salvar
                                    </Button>
                                </div>
                            </form>    
                        </Form>
                    </div>
                </div> 
            </SidebarInset>
        </>
    )
}