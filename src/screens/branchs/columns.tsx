import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Pen, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import ApiBranch from './service'

export type Branch = {
    id: string
    name: string
    uniorg: string
}


const deleteBranch = async (id: string, name: string, setBranch: React.Dispatch<React.SetStateAction<Branch[]>>) => {

    if (window.confirm(`Confirma a exclusão do Branch ${name}?`)) {
        try {
            await ApiBranch.Delete(id)
            setBranch(prevBranchs => prevBranchs.filter(name => name.id !== id))
        } catch (error) {
            console.error("Error deleting branch:", error)
        }
    }
}

export const columns = (setBranch: React.Dispatch<React.SetStateAction<Branch[]>>): ColumnDef<Branch>[] => [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    className='pl-0 hover:no-underline'
                    variant='link'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Nome</p>
                    <ArrowUpDown className='ml-3 h-4 w-4 text-gray-700 dark:text-white' />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] font-bold'>{row.original.name}</p>
            )
        }
    },
    {
        accessorKey: 'uniorg',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Uniorg</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] font-bold'>{row.original.uniorg}</p>
            )
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const line = row.original
            return (
                <div className='flex justify-end'>
                    <Link to={`/branchs/edit/${row.original.id}`}
                        className='items-center justify-center p-3 rounded-md bg-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE] group'>
                        <Pen className='text-black dark:text-white dark:group-hover:text-black' strokeWidth={2} style={{ 'width': 19, 'height': 19}} />
                    </Link>
                    <Trash2 
                        onClick={() => deleteBranch(line.id, line.name, setBranch)} 
                        strokeWidth={1.75} 
                        className='h-5 w-5 ml-6 mt-[10px] text-black hover:text-gray-800 cursor-pointer'     
                    />
                </div>
            )
        }
    }
]

