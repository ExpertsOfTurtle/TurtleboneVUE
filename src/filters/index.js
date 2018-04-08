function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/* 数字 格式化*/
export function nFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
export function toNumberFilter(num,type) {
    if(type==0 || type==1){
      return (type==0?"+":"-")+(+num || 0.00).toString().replace(/\+|\-/g, "")
    } else {
      return num
    }
  
}
export function NumberToString(value) {
   
    return value.toString()
}

export function checkNull(value) {
     if(!value || value=="null"){
       return ""
     } else {
       return value
     }
}
export function breakLine(value) {
    let res=value.split("/")

    return res[0]+"\n"+res[1]
}
export function toNumberZero(num) {
    if(num){
      let has=num.indexOf("%")>=0?"%":"";
      let bool=+num.toString().replace(/\%/g, "");
      if(!bool){
        return "0.00"+has
      } else {
        return num
      }
    } else {
       return num
    }
    
   
}
export function optionTxt(value,options,key) {

    if(value && options || value=="0"){
        
      let info=Object.assign({name:"label",value:"value",sign:"/"},key)
      let text=[];
      typeof(value)!="object" && (value=value.toString().split("@#$%"));

      for(let i in value){
        
        let obj = {};
        obj = options.find((item)=>{
            
          return item[info.value] == value[i];
        });
       
        obj && text.push(obj[info.name])
      }
      let t=text.toString().replace(/,/g,info.sign)
      return t || "/"
         
    } else {
         return value
    }
}
export function optionType(selectedOptions,options) {
   
    let productClass=[]
    let productClassIndex=[]
    let text=[]

    for(var i in selectedOptions){

    if(i==0){
        productClassIndex[0]=options

    } else {
        if(productClass[i-1]){
            productClassIndex[i]=productClass[i-1].children
        }
    }

    if(productClassIndex[i]){

        productClass[i]=productClassIndex[i].find((item)=>{
            return item.value == selectedOptions[i];
        });

        productClass[i] && text.push(productClass[i].label)
    }

    }
    return text.toString().replace(/,/g,"/")
}
