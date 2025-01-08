import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Pen, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import ApiSerial from './service'


export type Serial = {
    id: string
    serial_number: string
    client_name: string
    step: string
    equipment: string
}

const stepMapping = {
    1: 'Produção',
    2: 'Operacional',
    3: 'Estoque',
    4: 'Financeiro'
}


const deleteSerial = async (id: string, name: string, setBranch: React.Dispatch<React.SetStateAction<Serial[]>>) => {
    if (window.confirm(`Confirma a exclusão do Serial ${name}?`)) {
        try {
            await ApiSerial.Delete(id)
            setBranch(prevBranchs => prevBranchs.filter(name => name.id !== id))
        } catch (error) {
            console.error("Error deleting branch:", error)
        }
    }
}

export const columns = (setSerial: React.Dispatch<React.SetStateAction<Serial[]>>): ColumnDef<Serial>[] => [
    {
        accessorKey: 'serial_number',
        header: ({ column }) => {
            return (
                <Button
                    className='pl-0 hover:no-underline'
                    variant='link'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Número</p>
                    <ArrowUpDown className='ml-3 h-4 w-4 text-gray-700 dark:text-white' />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] font-bold'>{row.original.serial_number}</p>
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
                <p className='text-black dark:text-white text-[14.5px]'>ATK {row.original.equipment}</p>
            )
        }
    },
    {
        accessorKey: 'client_name',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Cliente</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px]'>{row.original.client_name}</p>
            )
        }
    },
    {
        accessorKey: 'step',

        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Fase</p>
            )
        },
        cell: ({ row }) => {
            const step = stepMapping[row.original.step]
            return (
                <p className='text-black dark:text-white text-[14.5px]'>{step}</p>
            )
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return (
                <div className='flex justify-end'>
                    <Link to={`/serials/edit/${row.original.id}`}
                        className='items-center justify-center p-3 rounded-md bg-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE] group'>
                        <Pen className='text-black dark:text-white dark:group-hover:text-black' strokeWidth={2} style={{ 'width': 19, 'height': 19}} />
                    </Link>
                    <Trash2 
                        onClick={() => deleteSerial(row.original.id, row.original.serial_number, setSerial)} 
                        strokeWidth={1.75} 
                        className='h-5 w-5 ml-6 mt-[10px] text-black hover:text-gray-800 cursor-pointer'     
                    />
                </div>
            )
        }
    }
]

