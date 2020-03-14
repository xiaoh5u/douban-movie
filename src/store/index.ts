import { observable, action } from 'mobx' // mobx的方法

class display {
    // 使用observable，定义一个可以被观察的变量
    @observable isBlock = false

    // 使用computed，定义一个计算属性，它会根据被观察的变量去变
    // @computed get num2() {
    //     return this.num.toFixed(2)
    // }

    // 使用action，定义一个函数，在这个函数中，可以改变被观察的变量
    @action.bound changeBlock(newVal: boolean) {
        this.isBlock = newVal
    }
    /*   如果函数中包含异步操作，就要使用promise封装这个异步操作，并返回一个promise对象
      @action.bound changeNum_async(newVal){
          return new Promise((resolve,reject) => {
              setTimeout(() => {
                  this.changeNum(newVal)
                  resolve('异步操作执行完毕')
              },2000)
          })
      }     */
}

// 基于这个与计数器有关的类，创建一个对象，得到一个与计数器有关的仓库对象


// 导出一个总的仓库对象
export default {
    display: new display()
}