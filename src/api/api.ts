import axios from 'axios'
const API_KEY = "0b2bdeda43b5688921839c8ecb20399b";
class api {
    static getInfo(url: any, param?: any): any {
        let params: object = {
            "apikey": API_KEY,
        }
        if(param!=''){
            Object.assign(params,param)
        }
        return axios.get('/douban/api/' + url, {
            params
        })
    }
}

export default api