function cartesian(array) {
  // Number of arrays

  if (array.length > 0) {
    const res = [];

    let max = array.length - 1;
    const helper = (arr, i) => {
      for (let j = 0, l = array[i].length; j < l; j++) {
        let copy = arr.slice(0);
        copy.push(array[i][j]);
        if (i == max) res.push(copy);
        else helper(copy, i + 1);
      }
    };
    helper([], 0);
    //  console.log(res);
    return res;
  }
}

export default cartesian;
