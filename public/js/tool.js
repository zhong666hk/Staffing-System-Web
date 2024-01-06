// eslint-disable-next-line no-undef
Tool = {
  /**
   * 空校验 null或""都返回true
   */
  isEmpty: (obj) => {
    if ((typeof obj === 'string')) {
      return !obj || obj.replace(/\s+/g, "") === ""
    } else {
      return (!obj || JSON.stringify(obj) === "{}" || obj.length === 0);
    }
  },

  /**
   * 非空校验
   */
  isNotEmpty: (obj) => {
    // eslint-disable-next-line no-undef
    return !Tool.isEmpty(obj);
  },

  /**
   * 对象复制
   * @param obj
   */
  copy: (obj) => {
    // eslint-disable-next-line no-undef
    if (Tool.isNotEmpty(obj)) {
      return JSON.parse(JSON.stringify(obj));
    }
  },

  /**
   * 使用递归将数组转为树形结构
   * 父ID属性为parent
   */
  array2Tree: (array, parentId) => {
    // eslint-disable-next-line no-undef
    if (Tool.isEmpty(array)) {
      return [];
    }

    const result = [];
    for (let i = 0; i < array.length; i++) {
      const c = array[i];
      // console.log(Number(c.parent), Number(parentId));
      if (Number(c.parent) === Number(parentId)) {
        result.push(c);

        // 递归查看当前节点对应的子节点
        // eslint-disable-next-line no-undef
        const children = Tool.array2Tree(array, c.id);
        // eslint-disable-next-line no-undef
        if (Tool.isNotEmpty(children)) {
          c.children = children;
        }
      }
    }
    return result;
  },

  /**
   * 随机生成[len]长度的[radix]进制数
   * @param len
   * @param radix 默认62
   * @returns {string}
   */
  uuid: (len, radix = 62) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    radix = radix || chars.length;

    for (let i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }

    return uuid.join('');
  }
};
