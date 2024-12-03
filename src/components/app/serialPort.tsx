import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PocketKnife, Wrench } from 'lucide-react'

import { AuthContext } from '@/context/general'
import ApiModbus from '@/screens/serials/modbusapi'


export function SerialPort() {
    const {port , UpdatePort} = useContext(AuthContext)

    const checkSerial = async () => {
        
        const response = await ApiModbus.ReadSerialPort()
        if (response) {
            UpdatePort(response)
        } else {
            UpdatePort(false)
        }
    }
    
    useEffect(() => {
        
        // const interval = setInterval(() => {
        //     checkSerial()
        //     return () => clearInterval(interval)
        // }, 10000)
    }, [])

    return (
        <>
            {
                port ? (
                    <Link to='/serials/results' className='bg-transparent p-[9px] rounded-sm border border-[#DEDEDE]'>
                        <Wrench strokeWidth={2} className="h-[18px] w-[18px] tex-white" /> 
                    </Link> 
                ) : (
                    null
                )
            }
        </>
    )
}

