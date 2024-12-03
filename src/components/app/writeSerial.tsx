import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from '@/components/ui/sheet';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const FormSchema = z.object({
    serialNumber: z.string({
        required_error: 'Preencha o número serial',
    }),

});

interface WriteSheetProps {
    open: boolean;
    onOpenChange: () => void;
    onSubmit: (data: z.infer<typeof FormSchema>) => void
}

const WriteSerial: React.FC<WriteSheetProps> = ({ open, onOpenChange, onSubmit }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Escrever serial</SheetTitle>
                    <SheetDescription>
                        Informe o número serial, algo parecido com ATK300012000
                    </SheetDescription>
                    <div className='pt-7'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name='serialNumber'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Número</FormLabel>
                                            <Input placeholder='Número serial' {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <p className='p-2' />
                                
                                <div className='pt-8 w-full h-24'>
                                    <Button type='submit' className='w-full bg-black font-mono cursor-pointer rounded-lg h-14'>Escrever Serial</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default WriteSerial
