import axios from 'axios'
const RASP_URL = import .meta.env.VITE_RASP_URL


class ApiModbus {
    static async ReadSerialPort() {
        try {
            const response = await axios.get(
                `http://localhost:7878/utils/connection`
            )
            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export default ApiModbus