import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
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
    FormMessage
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

import ApiClient from '../clients/service'
import ApiBranch from '../branchs/service'
import ApiSerial from './service'


const FormSchema = z.object({
    step: z.string({required_error: "Selecione a fase"}),
    equipment: z.string({required_error: "Selecione o equipamento"}),
    client_name: z.string({required_error: "Selecione o cliente"}),
})


export function AddSerials() {
    const navigate = useNavigate()
    const [clients, setClients] = useState([])
    const [branchs, setBranchs] = useState([])
    const [control, setControl] = useState(true)
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true)
        try {
            const response = await ApiSerial.Insert({ data })
            if (response === 201) {                
                navigate('/serials/results')
            } else {
                console.log('Error inserting branch')
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const clientList = async () => {
        const response = await ApiClient.GetAllClients()
        if (response) {
            setClients(response)
        } else {
            console.log('Error fetching clients on serial')
        }
    }
    
    async function onClientChange(value: string) {
        getBranchs(value);
    }

    const getBranchs = async (client: string) => {
        const response = await ApiBranch.GetBranchsByClients({ client })
        if(response && response.length > 0) {
            setBranchs(response)
            setControl(false)
        } else {
            setControl(true)
        }
    }

    useEffect(() => {
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
                                            <Link to='/serials'>Seriais</Link>
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
                                            name="step"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Fase</FormLabel>
                                                    <Select 
                                                        onValueChange={(value) => {
                                                            field.onChange(value);
                                                        }} 
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecione a Fase" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="3">Estoque</SelectItem>
                                                            <SelectItem value="4">Financeiro</SelectItem>
                                                            <SelectItem value="2">Operacional</SelectItem>
                                                            <SelectItem value="1">Produção</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )} /> 
                                    </div>

                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name="equipment"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Equipamento</FormLabel>
                                                    <Select 
                                                        onValueChange={(value) => {
                                                            field.onChange(value);
                                                        }} 
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecione o Equipamento" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem key={0} value='3000'>ATK 3000</SelectItem>
                                                            <SelectItem key={1} value='6000'>ATK 6000</SelectItem>
                                                            <SelectItem key={2} value='12000'>ATK 12000</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )} /> 
                                    </div>

                                    <div className='w-1/2'>
                                        <FormField
                                                control={form.control}
                                                name="client_name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Cliente</FormLabel>
                                                        <Select 
                                                            onValueChange={(value) => {
                                                                field.onChange(value);
                                                                onClientChange(value);
                                                            }} 
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecione o Cliente" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {
                                                                    clients.length ? (
                                                                        clients.map((client: { id: string, name: string}) => (
                                                                            <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                                                                        ))
                                                                    ) : (
                                                                        <SelectItem value="Nenhum cliente encontrado">Nenhum cliente encontrado</SelectItem>
                                                                    )
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )} /> 
                                    </div>                           


                                </div>

                                <div className='pt-7'>
                                {
                                            loading ? (
                                                <Button type='submit' 
                                                    className='bg-[#23CFCE] hover:bg-[#23CFCE] text-white dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black' disabled>
                                                        Aguarde
                                                </Button>
                                            ) : (
                                                <Button type='submit' 
                                                    className='bg-black hover:bg-[#23CFCE] text-white dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                                        Adicionar
                                                </Button>
                                            )
                                        }
                                    
                                </div>
                            </form>    
                        </Form>
                    </div>
                </div> 
            </SidebarInset>
        </>
    )
}