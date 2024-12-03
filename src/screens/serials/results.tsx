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
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    QrCode,
    PenLine,
    Locate,
    Search,
    PlugZap,
    PocketKnife
} from 'lucide-react'
import { 
    Table, 
    TableHeader, 
    TableRow, 
    TableHead, 
    TableBody, 
    TableCell 
} from '@/components/ui/table'

import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import ApiSerial from './service'
import WriteSerial from '@/components/app/writeSerial'
import ReadSheet from '@/components/app/readSheet'
import WriteSheet from '@/components/app/writeField'



export function SerialsResults() {
    const navigate = useNavigate()
    const [gnNumber, setGnNumber] = useState('')
    const [toCompare, setToCompare] = useState([])
    const [registers, setRegisters] = useState([])
    const [loading, setLoading] = useState(true)

    const [serialOpen, setSerialOpen] = useState(false)
    const [writeOpen, setWriteOpen] = useState(false)
    const [readOpen, setReadOpen] = useState(false)
    const [fieldOpen, setFieldOpen] = useState(false)

    // get serial number
    const getSerial = async () => {
        console.log('------- STEP 1')
        const response = await ApiSerial.GetSerialNumber()
        if (response) {
            setGnNumber(response)
            getLast()
        }
    }

    // get last
    const getLast = async () => {
        console.log('------- STEP 2')
        const response = await ApiSerial.GetLast()
        if (response) {
            setToCompare(response)
            parseRegisters(response)
        }
    }

    // parse data
    const parseRegisters =  ( values: any) => {
        const addresses = values.map((item: any) => {
            return item['address']
        })
        getRegisters(addresses)
    }

    const getRegisters = async (toRead) => {
        const response = await ApiSerial.GetRegisters({ toRead })
        if (response) {
            setRegisters(response)
        }
        setLoading(false)
    }

    // convert decimal serial number
    function decimalToAscii(decimal: number) {
        const ascii = String.fromCharCode(decimal)
        return ascii
    }

    // functions
    const triggerGN = async () => {
        const response = await ApiSerial.TriggerGN()
        if (response !== false) {
            navigate('/serials/cmd/countdown')
        }
    }

    // battery test
    const batteryTest = async () => {
        const response = await ApiSerial.BatteryTest()
        if (response !== false) {
            navigate(`/serials/results/22`)
        }
    }

    const toggleSerial = () => {
        setSerialOpen(!writeOpen)
        if (serialOpen === true) {
            document.body.classList.add('closed-sheet');
        }   
    }

    const toggleRead = () => {
        setReadOpen(!writeOpen)
        if (readOpen === true) {
            document.body.classList.add('closed-sheet')
        }   
    }

    // write serial
    async function onSerialSubmit(data: { serial: string }) {
        try { 
            const response = await ApiSerial.RewriteSerial({ data })
            if (response === true) {
                setSerialOpen(false)
                document.body.classList.add('closed-sheet')
                getSerial()
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }

    async function onReadSubmit(data: { register: string }) {
        try { 
            const response = await ApiSerial.ReadOne({ data })
            if (response !== false) {
                setReadOpen(false);
                document.body.classList.add('closed-sheet')
                navigate(`/serials/results/${data.register}`)
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }

    const toggleField = () => {
        setFieldOpen(!writeOpen)
        if (fieldOpen === true) {
            document.body.classList.add('closed-sheet')
        }   
    }

    async function onFieldSubmit(data: { register: string, value: string }) {
        try { 
            const response = await ApiSerial.WriteSingle({ data })
            console.log('RETURN ', response)
            if (response === true) {
                setFieldOpen(false);
                document.body.classList.add('closed-sheet')
                navigate(`/serials/results/${data.register}`)
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }

    
    useEffect(() => {
        getSerial()
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
                            <div className='col-span-2 bg-white shadow-sm p-10 rounded-md dark:bg-[#292929]'>
                                <div className="flex justify-between items-center pb-8">
                                    <h2>
                                        
                                        {
                                            Array.isArray(gnNumber) ? (
                                                gnNumber.map((item: any, index) => (
                                                    <b key={index}>{decimalToAscii(item['value'])}</b>))
                                            ) : (
                                                null
                                            )
                                        }
                                    </h2>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button 
                                                className="bg-black py-5 rounded-lg border-2 border-black hover:bg-white hover:text-black hover:border-2 hover:border-black transition-colors duration-400 flex flex-row justify-between">
                                                    <PocketKnife className="mr-3 h-5 w-5" />
                                                    <span>Ferramentas</span>
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem className="p-3 cursor-pointer"  onClick={triggerGN}>
                                                    <Locate className="mr-3 h-5 w-5" />
                                                    <span>Disparar gerador</span>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem className="p-3 cursor-pointer" onClick={batteryTest}>
                                                    <PlugZap className="mr-3 h-5 w-5" />
                                                    <span>Teste de bateria</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem className="p-3 cursor-pointer" onClick={toggleSerial}>
                                                    <QrCode className="mr-3 h-5 w-5" />
                                                    <span>Gravar número serial</span>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem className="p-3 cursor-pointer" onClick={toggleField}> 
                                                    <PenLine className="mr-3 h-5 w-5" />
                                                    <span>Escrever um campo</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem className="p-3 cursor-pointer" onClick={toggleRead}>
                                                    <Search className="mr-3 h-4 w-4" />
                                                    <span>Ler campo único</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <Table className="mt-6">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>REGISTRADOR</TableHead>
                                            <TableHead className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>VALOR </TableHead>
                                            <TableHead className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>STATUS</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            registers.sort((a: { register: number; }, b: { register: number; }) => a.register - b.register).map((item: any, index: number) => {
                                                const sortedToCompare = toCompare.sort((a: any, b: any) => Number(a.address) - Number(b.address));
                                                const correspondingItem = sortedToCompare.find((compareItem: any) => compareItem.address === String(item.register));
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell className='font-bold'>{item['register']}</TableCell>
                                                        <TableCell>{item['value']}</TableCell>
                                                        <TableCell>
                                                            {
                                                                correspondingItem && item['value'] === Number(correspondingItem['value']) ? (
                                                                    <p className="bg-green-600 w-5 h-5 rounded-full"></p>
                                                                ) : (
                                                                    <p className="bg-red-600 w-5 h-5 rounded-full"></p>
                                                                )
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                        </TableBody>
                                </Table>
                            </div>
                        )
                    }
                </div> 
                <WriteSerial open={serialOpen} onOpenChange={toggleSerial} onSubmit={onSerialSubmit} />
                <ReadSheet open={readOpen} onOpenChange={toggleRead} onSubmit={onReadSubmit} />
                <WriteSheet open={fieldOpen} onOpenChange={toggleField} onSubmit={onFieldSubmit} />
            </SidebarInset>
        </>
    )
}