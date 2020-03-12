import axios from 'axios'
const API_KEY = "0b2bdeda43b5688921839c8ecb20399b";

class api {
    static getInfo = (url: any, param?: any): any => {
        let params: object = {
            "apikey": API_KEY,
        }
        if (param != '') {
            Object.assign(params, param)
        }
        return axios.get('/douban/api/' + url, {
            params
        })
    }
    //获取正在热映的电影数据
    static getHotMovie() {
        return api.getInfo('in_theaters', { start: 0, count: 12 })
    }
    //获取豆瓣电影新片榜的电影数据
    static getNewMovie() {
        return api.getInfo('new_movies')
    }

    //获取北美榜的电影数据
    static getusMovie() {
        return api.getInfo('us_box')
    }


}



export default api