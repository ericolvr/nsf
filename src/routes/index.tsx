import { 
    BrowserRouter, 
    Route, 
    Routes
} from 'react-router-dom'
import { PrivateRoutes } from '@/routes/privateRoutes'  
import { SignIn } from '@/screens/signin'
import { Dashboard } from '@/screens/dashboard'

import { ListUsers } from '@/screens/users/list'
import { AddUsers } from '@/screens/users/add'
import { EditUser } from '@/screens/users/edit'

import { ListRegisters } from '@/screens/registers/list'
import { AddRegisters } from '@/screens/registers/add'
import { EditRegisters } from '@/screens/registers/edit'

import { ListClients } from '@/screens/clients/list'
import { AddClients } from '@/screens/clients/add'
import { EditClients } from '@/screens/clients/edit'


import { SerialsList } from '@/screens/serials/list'
import { AddSerials } from '@/screens/serials/add'
import { EditSerials } from '@/screens/serials/edit'

import { Unauthorized } from '@/screens/unauthorized'
import { SerialsResults } from '@/screens/serials/results'
import { TriggerGN } from '@/screens/serials/triggerGN'
import { ReadSingle } from '@/screens/serials/readSingle'

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/dashboard' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <Dashboard />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/users' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <ListUsers />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/users/add' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <AddUsers />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/users/edit/:id' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <EditUser />
                    </PrivateRoutes>
                    } 
                />

                <Route path='/registers' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <ListRegisters />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/registers/add' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <AddRegisters />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/registers/edit/:id' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <EditRegisters />
                    </PrivateRoutes>
                    } 
                />

                <Route path='/clients' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <ListClients />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/clients/add' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <AddClients />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/clients/edit/:id' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <EditClients />
                    </PrivateRoutes>
                    } 
                />

                <Route path='/serials' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <SerialsList />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/serials/add' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <AddSerials />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/serials/edit/:id' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <EditSerials />
                    </PrivateRoutes>
                    } 
                />

                <Route path='/serials/results' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <SerialsResults />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/serials/cmd/countdown' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <TriggerGN />
                    </PrivateRoutes>
                    } 
                />

                <Route path='/serials/results/:register' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <ReadSingle />
                    </PrivateRoutes>
                    } 
                />



                <Route path='/unauthorized' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <Unauthorized />
                    </PrivateRoutes>
                } 
                />
            </Routes>
        </BrowserRouter>
    )
}

