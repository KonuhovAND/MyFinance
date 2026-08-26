/*
 Я хояу чтобы это было два ряда
 В ряду должно быть: 
  1. слайдер через который можно выбрать что мы хотим изменить
  2. кнопка удаленния 
 */
import { useEffect, useState } from "react";
function Panel({ get_url_act, get_url_cat, operation_name }) {
  const [categories, setCategories] = useState({})
  const [operations, setOperations] = useState([])
  const [operation, setOperation] = useState([])
  const [amount, setAmount] = useState(new Number(0))
  const [category, setCategory] = useState('')
  const [text, setText] = useState('')
  const [date, setDate] = useState(new Date().toString().split('T')[0])
  const [uri, setUri] = useState('')
  useEffect(() => {
    fetch(get_url_cat)
      .then((r) => r.json())
      .then((d) => {
        const catMap = {}
        d.objects.forEach((element) => {
          catMap[element.resource_uri] = element.text
          catMap['id'] = element.id
        });
        setCategories(catMap)
      })
    fetch(get_url_act)
      .then((r) => r.json())
      .then((d) => {
        setOperations(d.objects)

      })
  }, [get_url_cat, get_url_act])
  const handleDeleteRequest = (e) => {
    fetch('http://localhost:8000' + uri,{
      method:"delete",
      headers: { 'Content-Type': 'application/json' },
    })
    .then(window.location.reload())
    .catch(Error => console.error(Error))

  }
  const handleSelect = (e) => {
    fetch('http://localhost:8000' + e.target.value)
      .then((r) => r.json())
      .then((d) => {
        setAmount(d.amount)
        setText(d.text)
        setCategory(categories[d.category])
        setDate(d.created_at.toString().split('T')[0])
        setUri(d.resource_uri)

      })

  }
  const handleRequest = (e) => {

    e.preventDefault()
    fetch('http://localhost:8000' + uri,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            amount: amount,
            category: category,
            text: text,
            created_at: date,
          })
      }
    )
      .then((r) => {
        if (r.ok) { window.location.reload() }
      })
      .catch(error => console.error(error))
  }

  return (
    <>
      <div>
        <form className="fancy-form" onSubmit={handleRequest}>
          <select className="form-select" defaultValue='' onChange={handleSelect}>
            <option value='' disabled >Select your {operation_name}</option>
            {operations.map((item) => (
              <option value={item.resource_uri} key={item.id} >{item.created_at.toString().split('T')[0]} {item.text} {item.id} {categories[item.category]}</option>
            ))}
          </select>
          <input className="form-input" type="number" value={amount} placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
          <input className="form-input" placeholder="Enter text to spending" value={text} type='text' name='text' onChange={(e) => setText(e.target.value)} />

          <input type="date" id="date" name="date" value={date} required onChange={(e) => setDate(e.target.value)} />

          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value='' disabled >Select your {operation_name} category</option>
            {Object.entries(categories).map(([key, item]) => (
              <option key={key} value={key}>{item}</option>
            ))
            }
          </select>

          <button className='form-button' type="submit">Save</button>
          
          <button className='form-button' onClick={handleDeleteRequest}>DELETE</button>


        </form>
        
      </div>
    </>
  )
}
function Edit() {
  return (
    <>
      <Panel get_url_act='http://localhost:8000/fake_api/spending/' get_url_cat='http://localhost:8000/fake_api/category_spend/' operation_name='spending' />
    </>
  )
}
export default Edit;
