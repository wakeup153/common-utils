/**
 * 利用对象引用将array转tree
 * @param {*} arr 传的数组
 * @param {*} parentId 父级id字段名
 * @param {*} children 子节点字段名
 * @returns array
 */
export const arrayToTreeByRef = (arr = [], parentId = 'pid', children = 'children') => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return []
  }
  let result = []
  let map = {}
  arr.forEach(item => map[item.id] = item)
  arr.forEach(item => {
    const parent = map[item[parentId]]
    if (parent) {
      (parent[children] || (parent[children] = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
/**
 * 通过递归将array转tree
 * @param {*} arr 传的数组
 * @param {*} parentId 父级id字段名
 * @param {*} children 子节点字段名
 * @returns array
 */
export const arrayToTreeByRecursion = (arr = [], pid = 0, id = 'id', parentId = 'pid', children = 'children') => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return []
  }
  let result = []
  arr.forEach(item => {
    if (item[parentId] === pid) {
      const itemChildren = arrayToTreeByRecursion(arr, item[id], id, parentId, children)
      if (itemChildren.length) {
        item[children] = itemChildren
      }
      result.push(item)
    }
  })
  return result
}
/**
 * 通过深度优先将树形数据转为数组
 * @param {*} tree 树形数据
 * @param {*} children 子节点字段名
 * @returns 
 */
export const treeToArrayByDFS = (tree = [], children = 'children') => {
  if (!Array.isArray(tree) || tree.length === 0) {
    return []
  }
  let stack = tree.slice()
  let result = []
  while (stack.length !== 0) {
    const last = stack.pop()
    if (last === null || last === undefined) {
      continue
    }
    result.push(last)
    const childrenArr = last[children] || []
    if (Array.isArray(childrenArr)) {
      for (let i = childrenArr.length; i >= 0; i--) {
        stack.push(childrenArr[i])
      }
    }
  }
  return result
}
/**
 * 通过广度优先将树形数据转为数组
 * @param {*} tree 
 * @param {*} children 
 * @returns 
 */
export const treeToArrayByBFS = (tree = [], children = 'children') => {
  if (!Array.isArray(tree) || tree.length === 0) {
    return []
  }
  let queue = tree.slice(0)
  let result = []
  while (queue.length !== 0) {
    const first = queue.shift()
    if (first === null || first === undefined) {
      continue
    }
    result.push(first)
    const childrenArr = first[children]
    if (Array.isArray(childrenArr)) {
      for (let i = 0; i < childrenArr.length; i++) {
        queue.push(childrenArr[i])
      }
    }
  }
  return result
}
/**
 * 通过递归将树形数据转数组
 * @param {*} tree 
 * @param {*} children 
 * @returns 
 */
export const treeToArrayByRecursion = (tree = [], children = 'children') => {
  if (!Array.isArray(tree) || tree.length === 0) {
    return []
  }
  let result = []
  tree.forEach(item => {
    result.push(item)
    const childrenArr = item[children]
    if (Array.isArray(childrenArr)) {
      result.push(...treeToArrayByRecursion(childrenArr))
    }
  })
  return result.map(item => {
    if (item[children]) {
      delete item[children]
    }
    return item
  })
}
/**
 * 通过函数筛选树形数据
 * @param {*} tree 树形数据
 * @param {*} func 过滤函数
 * @param {*} children 子节点字段名
 * @returns array
 */
export const filterTreeByFunc = (tree, func = () => {}, children = 'children') => {
  if (!Array.isArray(tree) || tree.length === 0) {
    return []
  }
  if (typeof func !== 'function') {
    return tree
  }
  return tree.filter(item => {
    item[children] = item[children] && filterTreeByFunc(item[children], func, children)
    return func(item) || (item[children] &&  item[children].length)
  })
}
/**
 * 通过id获取节点路径
 * @param {*} tree 
 * @param {*} id 
 * @param {*} children 
 * @param {*} onlyGetIdArray 返回结果是否为数组
 * @returns 
 */
export const getNodePath = (tree, id, onlyGetIdArray = true, idField = 'id', children = 'children') => {
  if (!Array.isArray(tree) || tree.length === 0) {
    return []
  }
  const path = []
  const treeFindPath = (tree, id, path) => {
    for (const item of tree) {
      if (onlyGetIdArray) {
        path.push(item[idField])
      } else {
        path.push(item)
      }
      if (item[idField] === id) {
        return path
      }
      const childrenArr = item[children]
      if (childrenArr) {
        const findChildren = treeFindPath(childrenArr, id, path);
        if (findChildren.length) {
          return findChildren
        }
      }
      path.pop()
    }
    return []
  }
  return treeFindPath(tree, id, path)
}
/**
 * 模糊查询树
 * @param {*} arr 
 * @param {*} field 搜索字段名
 * @param {*} value 搜索字符
 * @param {*} children 
 * @returns array
 */
export const fuzzyQueryTree = (arr, field = 'name', value, children = 'children') => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return []
  }
  let result = [];
  arr.forEach(item => {
    const childrenArr = item[children]
    if (item[field].indexOf(value) > -1) {
      const childrenRes = fuzzyQueryTree(childrenArr, field, value, children)
      const obj = { ...item, [children]: childrenRes }
      result.push(obj)
    } else {
      if (childrenArr && childrenArr.length > 0) {
        const childrenRes = fuzzyQueryTree(childrenArr, field, value, children);
        const obj = { ...item, [children]: childrenRes }
        if (childrenRes && childrenRes.length > 0) {
          result.push(obj);
        }
      }
    }
  })
  return result
}
/**
 * 获取树中的叶子节点
 * @param {*} tree 树形数据
 * @param {*} children 
 * @returns 
 */
export const getTreeAllLeaf = (tree, children = 'children') => {
  const result = []
  const getLeaf = (tree = []) => {
    tree.forEach(item => {
      if (!item[children]) {
        result.push(item)
      } else {
        getLeaf(item[children])
      }
    })
  }
  getLeaf(tree)
  return result
}

