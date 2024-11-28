import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
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

import ApiRegister from './service'
import ApiClient from '../clients/service'


const FormSchema = z.object({
    client: z.string({required_error: "Selecione o cliente"}),
    equipment: z.string({required_error: "Selecione o equipamento"}),
    register_type: z.string({required_error: "Selecione o tipo"}),

    address: z.string().min(1, { message: 'Informe o número do registrador' }),
    value: z.string().min(1, {message: 'Mínimo 1 caracter'}),
    description: z.string().min(3, {message: 'Mínimo 3 caracteres'}),  
    special: z.string({required_error: "Selecione o se é único"}),
})


export function AddRegisters() {
    const navigate = useNavigate()
    const [clients, setClients] = useState([])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            client: '',
            equipment: '',
            register_type: '',
            address: '',
            value: '',
            description: '',
            special: ''
        }
    })

    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await ApiRegister.Insert({ data })
            if (response === 201) {                
                navigate('/registers')
            } else {
                toast.error('Error adding branch');
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
            console.log('Error fetching clients')
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
                                                    <Select 
                                                        onValueChange={(value) => {
                                                            field.onChange(value);
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
                                                                clients.map((client) => {
                                                                    return (
                                                                        <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                                                                    )
                                                                })
                                                            }
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
                                            name="register_type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tipo</FormLabel>
                                                    <Select 
                                                        onValueChange={(value) => {
                                                            field.onChange(value);
                                                        }} 
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Tipo de Registrador" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem key={0} value='0'>Leitura</SelectItem>
                                                            <SelectItem key={1} value='1'>Escrita</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )} /> 
                                    </div>
                                </div>

                                <div className='flex items-center mt-5'>
                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name="special"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Escrita Única</FormLabel>
                                                    <Select 
                                                        onValueChange={(value) => {
                                                            field.onChange(value);
                                                        }} 
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Escrita Única" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem key={0} value='0'>Não</SelectItem>
                                                            <SelectItem key={1} value='1'>Sim</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )} /> 
                                    </div>

                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='address'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Registrador</FormLabel>
                                                    <Input placeholder='Número do Registrador' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name='value'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Valor</FormLabel>
                                                    <Input placeholder='Valor do Registrador' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className='flex items-center mt-5'>
                                    <div className='w-full'>
                                        <FormField
                                            control={form.control}
                                            name='description'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Descrição</FormLabel>
                                                    <Input placeholder='Breve Descrição' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>    
                                </div>

                                <div className='pt-7'>
                                    <Button type='submit' 
                                        className='bg-black hover:bg-[#23CFCE] text-white dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                        Adicionar
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