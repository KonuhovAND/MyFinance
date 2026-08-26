//возвращать данные по категориям в виде json
// отдельно можно возвращать данные по тратам и по заработкам
// выбор, либо выгрузить сразу sql таблицу или json"ы
import { useState, useEffect } from "react";
function Panel({url_get_operation,url_get_categories,operation_name}){
  const [operations,setOperations] = useState([])
  const [categories,setCategories] = useState([])
  const [categoriesSum,setCategoriesSum] = useState([])
  const [month,setMonth] = useState(0)
  const [year,setYear] = useState(2026)
  const monthDict = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
}
function Stats(){
  return(
  <Panel/>
  )
}
export default Stats;
