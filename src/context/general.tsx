import { createContext, useEffect, useState } from 'react'
import Storage from '@/storage'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [supplierId, setSupplierId] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [initials, setInitials] = useState<string>('')
    const [role, setRole] = useState<string>('')
    const [token, setToken] = useState<string>('')
    const [port, setPort] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)

    const HandleAuthenticated = async (status: boolean) => {
        setAuthenticated(status)
    }

    const HandleUserData = async (data) => {
        setRole(data['role'])
        setUsername(data['name'])
        setToken(data['token'])
        setAuthenticated(true)
        if (data['supplier_id']) {
            setSupplierId(data['supplier_id'])
        }

        const result = cutWords(data['name'])
        setInitials(result)
    }

    const getUserData = () => {
        const response = Storage.RetrieveUserData()
        if (response) {
            setAuthenticated(true)
            setRole(response.role)
            setUsername(response.name)
            setToken(response.token)
            
            if (response['supplierid']) {
                setSupplierId(response.supplierid)
            }

            const result = cutWords(response.name)
            setInitials(result)
        } else {
            console.log('No Data')
        }
    }

    const cutWords = (words: string) => {
        const name = words.split(' ')
        const first = name.map(name => name[0]).join('')
        return first
    }

    const deleteToken = () => {
        Storage.DeleteUserToken()
        setAuthenticated(false)
        setUsername('')
        setInitials('')
        setRole('')
        setToken('')
        setSupplierId('')
    }

    const UpdatePort = (status: boolean) => {
        setPort(status)
    }

    useEffect(() => {
        getUserData()
        setLoading(false)
    }, [])

    if (loading) {
        return <div>Carregando...</div>
    }

    return (
        <AuthContext.Provider value={{ 
            authenticated,
            supplierId,
            username,
            initials,
            role,
            token,
            port,
            HandleAuthenticated,
            HandleUserData,
            deleteToken,
            UpdatePort
        }}>
            {children}
        </AuthContext.Provider>
    )
}
