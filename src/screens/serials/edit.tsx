import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
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
    FormDescription
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


const stepMapping = {
    1: 'Produção',
    2: 'Operacional',
    3: 'Estoque',
    4: 'Financeiro'
}

const FormSchema = z.object({
    step: z.string({required_error: "Selecione a fase"}),
    equipment: z.string({required_error: "Selecione o equipamento"}),
    client_name: z.string({required_error: "Selecione o cliente"}),
    qrcode: z.string().optional(),
    serial_number: z.string().optional()
})


export function EditSerials() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)
    const [serial, setSerial] = useState([])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        
        try {
            const response = await ApiSerial.Update({ id, data })
            if (response === 200) {                
                navigate('/serials')
            } else {
                console.log('Error editing serial')
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
            console.log('Error fetching clients on serial')
        }
    }
    
    const getSerial = async () => {
        const response = await ApiSerial.GetSerialByID({ id })
        console.log(response, '')
        if (response) {
            setSerial(response)
            form.setValue('step', response.step.toString())
            form.setValue('equipment', response.equipment.toString())
            form.setValue('serial_number', response.serial_number)
            form.setValue('qrcode', response.qrcode)
            form.setValue('client_name', response.client_name)
        }
        setLoading(false)
    }

    useEffect(() => {
        getSerial()
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
                                        <BreadcrumbPage>Editando {serial.serial_number}</BreadcrumbPage>
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
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Fase</FormLabel>
                                                    { loading ? (
                                                            <p>loading</p>
                                                        ) : (
                                                            <Select
                                                                defaultValue={serial && serial.step ? serial.step.toString() : ''}
                                                                onValueChange={value => {
                                                                    field.onChange(value)
                                                                }}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Selecione a Fase" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {serial && ![1, 2, 3, 4].includes(serial.step) && (
                                                                        <SelectItem key={serial.id} value={serial.step}>{stepMapping[serial.step]}</SelectItem>
                                                                    )}
                                                                    <SelectItem key={0} value="3">Estoque</SelectItem>
                                                                    <SelectItem key={1} value="4">Financeiro</SelectItem>
                                                                    <SelectItem key={2} value="2">Operacional</SelectItem>
                                                                    <SelectItem key={3} value="1">Produção</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name="equipment"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Equipamento</FormLabel>
                                                    { loading ? (
                                                            <p>loading</p>
                                                        ) : (
                                                            <Select
                                                                defaultValue={serial && serial.equipment ? serial.equipment.toString() : ''}
                                                                onValueChange={value => {
                                                                    field.onChange(value);
                                                                }}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Selecione o Equipamento" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {serial && !["3000", "6000", "12000"].includes(serial.equipment) && (
                                                                        <SelectItem key={serial.id} value={serial.equipment}>{serial.equipment}</SelectItem>
                                                                    )}
                                                                    <SelectItem key={0} value="3000">ATK 3000</SelectItem>
                                                                    <SelectItem key={1} value="6000">ATK 6000</SelectItem>
                                                                    <SelectItem key={2} value="12000">ATK 12000</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                <FormMessage />
                                            </FormItem>
                                        )} /> 
                                    </div>
                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                                control={form.control}
                                                name="client_name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Cliente</FormLabel>
                                                        { loading ? (
                                                            <p>loading</p>
                                                        ) : (
                                                            <Select
                                                                defaultValue={serial && serial.client_name ? serial.client_name.toString() : ''}
                                                                onValueChange={value => {
                                                                    field.onChange(value);
                                                                    onClientChange(value);
                                                                }}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Selecione o Cliente" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {serial && !clients.some(client => client.name === serial.client_name) && (
                                                                        <SelectItem key={serial.id} value={serial.client_name}>{serial.client_name}</SelectItem>
                                                                    )}
                                                                    {
                                                                        clients.map((client: { id: string, name: string}) => (
                                                                            <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                                                                        ))
                                                                    }
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    <FormMessage />
                                                </FormItem>
                                            )} /> 
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