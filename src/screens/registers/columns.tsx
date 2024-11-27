import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MapPin, Pen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'


export type Register = {
    id: string
    client: string
    equipment: string
    description: string
    address: string
    value: string
    register_type: string
}


const typeMap = {
    0: 'Leitura',
    1: 'Escrita'
}


export const columns = (setRegister: React.Dispatch<React.SetStateAction<Register[]>>): ColumnDef<Register>[] => [
    {
        accessorKey: 'client',
        header: ({ column }) => {
            return (
                <Button
                    className='pl-0 hover:no-underline'
                    variant='link'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Cliente</p>
                    <ArrowUpDown className='ml-3 h-4 w-4 text-gray-700 dark:text-white' />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] font-bold'>{row.original.client}</p>
            )
        }
    },
    {
        accessorKey: 'equipment',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Equipamento</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] font-bold'>{row.original.equipment}</p>
            )
        }
    },
    {
        accessorKey: 'address',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Registrador</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px]'>{row.original.address}</p>
            )
        }
    },
    {
        accessorKey: 'value',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Valor</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] subpixel-antialiased'>{row.original.value}</p>
            )
        }
    },
    {
        accessorKey: 'register_type',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Tipo</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] subpixel-antialiased'>{typeMap[row.original.register_type]}</p>
            )
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return (
                <div className='flex justify-end'>
                    <Link to={`/registers/edit/${row.original.id}`}
                        className='items-center justify-center p-3 rounded-md bg-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE] group'>
                        <Pen className='text-black dark:text-white dark:group-hover:text-black' strokeWidth={2} style={{ 'width': 19, 'height': 19}} />
                    </Link>
                </div>
            )
        }
    }
]

