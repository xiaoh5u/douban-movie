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

    //获取一周口碑榜的电影数据
    static getWeeklyMovie() {
        return api.getInfo('weekly')
    }
    
    // 获取Top250数据
    static getTop250Movie() {
        return api.getInfo('top250', { count: 36 })
    }
    // 获取搜索数据
    static getSearchInfo(str: string) {
        return  axios.get(`douban/search/api/j/subject_suggest?q=${str}`)
    }
    // 获取详情
    static getDetail(id: string) {
        return api.getInfo(`subject/${id}`)
    }
}



export default api