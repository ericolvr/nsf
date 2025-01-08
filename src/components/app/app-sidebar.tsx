'use client'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    BadgeCheck,
    Building,
    Bolt,
    ChevronsUpDown,
    LogOut,
    Users,
    NotebookTabs,
    Tickets,
    QrCode,
    DatabaseZap
} from 'lucide-react'

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar'

import { AuthContext} from '@/context/general'


export function AppSidebar() {
    const navigate = useNavigate()
    const { username, initials, deleteToken, role } = useContext(AuthContext)
    
    const handleUserToken = () => {
        deleteToken()
        navigate('/')
    }


    return (
        <Sidebar className="w-64 md:w-64 lg:w-72">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link to="/dashboard">
                            <SidebarMenuButton
                                size='lg'
                                className=' mt-3 ml-3 bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent'
                            >
                                <Bolt className='text-[#23CFCE]' style={{ width: '27px', height: '27px' }} />
                                <div className='flex flex-col gap-0.5 leading-none pl-2'>
                                    <span className='font-semibold'>Alarmtek </span>
                                    <span className='text-gray-400 text-[11px]'>Produção geradores</span>
                                </div>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup key={1} className='pl-5 mt-3 w-[270px]'>
                    <SidebarGroupLabel>Operacional</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {
                            role === '0' && (
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <Link to='/serials' className='flex items-center ml-2'>
                                            <SidebarMenuButton className='h-12 hover:bg-[#23CFCE] dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                                <QrCode style={{ width: '20px', height: '20px' }} />
                                                <span className='font-mono ml-4'>Seriais</span>
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <Link to='/registers' className='flex items-center ml-2'>
                                            <SidebarMenuButton className='h-12 hover:bg-[#23CFCE] dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                                <DatabaseZap style={{ width: '20px', height: '20px' }} />
                                                <span className='font-mono ml-4'>Registradores</span>
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <Link to='/clients' className='flex items-center ml-2'>
                                            <SidebarMenuButton className='h-12 hover:bg-[#23CFCE] dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                                <Users style={{ width: '21px', height: '21px' }} />
                                                <span className='font-mono ml-4'>Clientes</span>
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            )
                        }
                        {
                            role === '1' && (
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <Link to='/tickets' className='flex items-center ml-2'>
                                            <SidebarMenuButton className='h-12 hover:bg-[#23CFCE] dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                                <Tickets style={{ width: '20px', height: '20px' }} />
                                                <span className='font-mono ml-4'>Tíckets</span>
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <Link to='/appointments' className='flex items-center ml-2'>
                                            <SidebarMenuButton className='h-12 hover:bg-[#23CFCE] dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                                <NotebookTabs style={{ width: '20px', height: '20px' }} />
                                                <span className='font-mono ml-4'>Apontamentos</span>
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            )
                        }
                    </SidebarGroupContent>
                </SidebarGroup>
                {
                    role === '0' && (
                    <>
                    <SidebarGroup key={3} className='pl-5 mt-3'>
                        <SidebarGroupLabel>Gerenciamento</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <Link to='/users' className='flex items-center ml-2'>
                                        <SidebarMenuButton className='h-12 hover:bg-[#23CFCE] dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                            <Users style={{ width: '21px', height: '21px' }} />
                                            <span className='font-mono ml-4'>Usuários</span>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                    
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    </>
                    )
                }        
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size='lg'
                                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                            >
                                <Avatar className='h-8 w-8 rounded-lg'>
                                    <AvatarImage
                                        src=''
                                />
                                    <AvatarFallback className='rounded-lg'>{initials}</AvatarFallback>
                                </Avatar>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-semibold pl-2'>{username}</span>
                                </div>
                                <ChevronsUpDown className='ml-auto size-4' />
                            </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg dark:bg-[#212121]'
                                side='bottom'
                                align='end'
                                sideOffset={4}
                                
                            >
                                <DropdownMenuLabel className='p-0 font-normal'>
                                    <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                                        <Avatar className='h-8 w-8 rounded-lg'>
                                            <AvatarImage
                                                src=''
                                                alt='Erico'
                                            />
                                            <AvatarFallback className='rounded-lg'>{initials}</AvatarFallback>
                                        </Avatar>
                                        <div className='grid flex-1 text-left text-sm leading-tight'>
                                            <span className='truncate font-semibold'>{username}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Minha Conta
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={handleUserToken} className='cursor-pointer'>
                                        <LogOut />
                                        Log out
                                        </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
