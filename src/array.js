/**
 * 通过递归将数组排平
 * @param {*} arr 传入的数组 如: [[1, 2], [3, 4]]
 * @returns array
 */
export const flattenByRecursion = (arr = []) => {
  if (!Array.isArray(arr)) {
    return arr
  }
  let res = []
  arr.forEach(item => {
    if (Array.isArray(item)) {
      res = res.concat(flattenByRecursion(item))
    } else {
      res.push(item)
    }
  })
  return res
}
/**
 * 通过reduce方法将数组排平
 * @param {*} arr 传入的数组 如: [[1, 2], [3, 4]]
 * @returns array
 */
export const flattenByReduce = (arr = []) => {
  if (!Array.isArray(arr)) {
    return arr
  }
  return arr.reduce((result, item) => {
    return result.concat(Array.isArray(item) ? flattenByRecursion(item) : item)
  }, [])
}
/**
 * 通过原生flat方法将数组排平
 * @param {*} arr 传入的数组 如: [[1, 2], [3, 4]]
 * @returns array
 */
export const flattenByOrigin = (arr = [], level = Infinity) => {
  if (!Array.isArray(arr)) {
    return arr
  }
  return arr.flat(level)
}
/**
 * 执行队列函数
 * @param {*} queue 函数数组
 * @param {*} fn 执行函数
 * @param {*} cb 执行完成回调
 */
export const runQueue  = (queue = [], fn, cb) => {
  const step = index => {
    if (index >= queue.length) {
      cb()
    } else {
      if (queue[index]) {
        fn(queue[index], () => {
          step(index + 1)
        })
      } else {
        step(index + 1)
      }
    }
  }
  step(0)
}
