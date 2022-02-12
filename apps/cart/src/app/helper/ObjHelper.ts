
export function isEmpty(obj: { hasOwnProperty: (arg0: string) => any; }) {
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
export function order(a: { Nome: number; }, b: { Nome: number; }, desc: any) {
  if (desc) {
    if (a.Nome < b.Nome) {
      return 1;
    }
    if (a.Nome > b.Nome) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }
  else {
    if (a.Nome > b.Nome) {
      return 1;
    }
    if (a.Nome < b.Nome) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }
}
export function orderPreco(a: { Preco: number; }, b: { Preco: number; }, desc: any) {

  if (!a.Preco)
    a.Preco = 0;

  if (!b.Preco)
    b.Preco = 0;

  if (a.Preco && b.Preco)

    if (!desc) {
      if (a?.Preco < b?.Preco) {
        return 1;
      }
      if (a?.Preco > b?.Preco) {
        return -1;
      }
      // a must be equal to b
      return 0;
    }
    else {
      if (a?.Preco > b?.Preco) {
        return 1;
      }
      if (a?.Preco < b?.Preco) {
        return -1;
      }
      // a must be equal to b
      return 0;
    }

    return 0;
}

export function removeDuplicates(myArr: any[], prop: string | number) {
  return myArr.filter((obj: { [x: string]: any; }, pos: any, arr: any[]) => {
    return arr.map((mapObj: { [x: string]: any; }) => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

export function translateEnum(myEnumType: any, myEnum: any) {
  const values = Object.keys(myEnumType).map(key => myEnumType[myEnum] ).filter(value => typeof value === 'string') as string[];
  return values[myEnum];
}

export function sum(arr: any[]) {
  let sum = 0;

  try {
    arr = arr.filter((x: string | undefined) => !isNaN(parseFloat(x)) && x != undefined)
    for (let index = 0; index < arr.length; index++) {
      sum += parseFloat(arr[index]);
    }
    return sum;
  }
  catch (ex) {
    return 0;
  }
}
