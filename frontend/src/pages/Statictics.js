//возвращать данные по категориям в виде json
// отдельно можно возвращать данные по тратам и по заработкам
// выбор, либо выгрузить сразу sql таблицу или json"ы
import { useState, useEffect } from "react";
function Panel({url_get_operation,url_get_categories,operation_name}){
  const [categoriesSum,setCategoriesSum] = useState({})
  const [month,setMonth] = useState(0)
  const [year,setYear] = useState(2026)
  const [categories, setCategories] = useState({})
  const [operations, setOperations] = useState([])

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
 
  useEffect(() => {
    fetch(url_get_categories)
      .then((r) => r.json())
      .then((d) => {
        const catMap = {}
        d.objects.forEach((element) => {
          catMap[element.resource_uri] = element.text
        });
        setCategories(catMap)
      })

  }, [url_get_categories])

  const handleSelect = (e) =>{
    fetch("http://localhost:8000/fake_api/" + operation_name + `/?year=${year}&month=${month}` )
    .then((r)=>r.json())
    .then((d) => {
        setOperations(d.objects)
        const sum = {}
        for(const cat in categories){
         sum[categories[cat]] = 0  
        }
        for(const operation of operations){
          sum[categories[operation.category]] += Number(operation.amount) || 0
        }
        setCategoriesSum(sum)
      })
    .catch(Error => console.error(Error))
    
  }
  return(
  <>
  <div className="block">
  <p>Enter {operation_name}</p>
  <form
    className="fancy-form"
    onSubmit={(e) => {
      e.preventDefault();
      handleSelect();
    }}
  >
    {/* Year */}
    <select
      className="form-select"
      value={year}
      onChange={(e) => setYear(e.target.value)}
    >
      <option value="">Select year</option>

      {Array.from({ length: 10 }, (_, index) => {
        const selectedYear = new Date().getFullYear() - index;

        return (
          <option key={selectedYear} value={selectedYear}>
            {selectedYear}
          </option>
        );
      })}
    </select>

    {/* Month */}
    <select
      className="form-select"
      value={month}
      onChange={(e) => setMonth(e.target.value)}
    >

      <option value=''>Select your {operation_name}</option>

      {Array.from({ length: 12 }, (_, index) => {
        const monthNumber = Number(index + 1);

        return (
          <option key={monthNumber} value={monthNumber}>
            {monthDict[monthNumber]} 
          </option>
        );
      })}
    </select>

    <button className="form-button" type="submit">
      Load data
    </button>
  </form>

  {/* Results */}
  {Object.keys(categoriesSum).length > 0 && (
    <table className="mytable">
      <thead>
        <tr>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(categoriesSum).map(([category, amount]) => (
          <tr key={category} className='table-row-0'>
            <td>{category}</td>
            <td>{amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
  </>
  )
}
function Stats(){
  return(
    <>  <Panel url_get_operation = 'http://localhost:8000/fake_api/spending/' url_get_categories='http://localhost:8000/fake_api/category_spend/' operation_name = 'spending'/>
  <Panel url_get_operation = 'http://localhost:8000/fake_api/income/' url_get_categories='http://localhost:8000/fake_api/category_income/' operation_name = 'income' />
  </>

  )
}
export default Stats;
