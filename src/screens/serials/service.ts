import axios from 'axios'
import { error } from 'console'
const BASE_URL = import .meta.env.VITE_API_URL
const RASP_URL = import .meta.env.VITE_RASP_URL


class ApiSerial {
    static async GetSerials() {
        try {
            const response = await axios.get(
                `${BASE_URL}/serials`
            )
            if (response.status === 200) {
                return response.data
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async Insert({ data }) {
        
        try {
            const response = await axios.post(
                `${BASE_URL}/serials/`,
                data
            )
            if (response.status === 201) {
                return response.status
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async GetSerialByID({ id }) {
        try {
            const response = await axios.get(
                `${BASE_URL}/serials/id?id=${id}`,
            )
            if (response.status === 200) {
                return response.data
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async Update({ id, data }) {
        try {
            const response = await axios.patch(`${BASE_URL}/serials/update/${id}`, data)
            if (response.status === 200) {
                return response.status
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async Delete(id) {
        try {
            const response = await axios.delete(
                `${BASE_URL}/serials/delete/${id}`
            )
            if (response.status === 204) {
                return response.status
            }
            return response.data
        } catch (error) {}
    }

    static async GetSerialNumber() {
        try {
            const response = await axios.get(
                `${RASP_URL}/read/serial`
            )
            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async GetLast() {
        try {
            const response = await axios.get(
                `${BASE_URL}/serials/last`
            )
            if (response.status === 200) {
                const equipment = response.data['equipment']
                const client = response.data['client_name']
                const registersList = await this.ExtractData({ equipment, client })
                return registersList
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async ExtractData({ equipment, client }) {
        const format = {
            'equipment': equipment,
            'client': client
        }
        try {
            const response = await axios.post(`${BASE_URL}/registers/get-configs`, format)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async GetRegisters({ toRead }) {
        const data = {'registers': toRead}
        try {
            const response = await axios.post(
                `${RASP_URL}/status/registers`, data
            )
            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async TriggerGN() {
        try {
            const response = await axios.get(`${RASP_URL}/write/trigger`);
            if (response.status === 200) {
                return true // mocked for test interface - dont write 1 on register 112
            } else {
                return false
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }

    static async BatteryTest() {
        try {
            const response = await axios.get(`${RASP_URL}/status/battery`)
            if (response.status === 200) {
                return response.data
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static async ReadSingle(register) {
        console.log('Service', register)
        try {
            const response = await axios.get(`${RASP_URL}/read/single?register=${register}`)
            console.log(response.data)
            
            if (response.status === 200) {
                return response.data
            }
             else {
                return false
             }
        } catch (error) {
            console.log(error);
            return false
        }
    }

    static async RewriteSerial({data}) {
        const parsed = data['serialNumber']
        const serial = {'serial_number': parsed}
        console.log(serial, 'fornated')
        try {
            const response = await axios.post(`${RASP_URL}/write/serial`, serial);
            if (response.status === 200) {
                return response.data
            }
            return false
        } catch (error) {
            console.log(error)
        }
    }

    static async ReadOne({ data }) {
        const register = data['register']
        try {
            const response = await axios.get(`${RASP_URL}/read/single?register=${register}`)        
            console.log(response.data)
            if (response.status === 200) {
                return response.data
            }
             else {
                return false
             }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static async WriteSingle({ data }) {
        
        const register = data['register']
        const value = data['value']
        try {
            const response = await axios.get(`${RASP_URL}/write/single?register=${register}&value=${value}`);
            if (response.status === 200) {
                return response.data
            } else {
                return false
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }

}

export default ApiSerial