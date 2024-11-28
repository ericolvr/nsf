import axios from 'axios'
const BASE_URL = import .meta.env.VITE_API_URL


class ApiSerial {
    static async GetSerials() {
        try {
            const response = await axios.get(
                `${BASE_URL}/serials/`
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
}

export default ApiSerial