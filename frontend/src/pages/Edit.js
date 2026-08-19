/*
 Я хояу чтобы это было два ряда
 В ряду должно быть: 
  1. слайдер через который можно выбрать что мы хотим изменить
  2. кнопка удаленния 
 */
import { useEffect, useState } from "react";
function Panel({ get_url_act, get_url_cat, name }) {
  const [categories, setCategories] = useState({})
  const [actions, setActions] = useState([])
  const [action, setAction] = useState([])
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [text, setText] = useState('')
  const [date, setDate] = useState(new Date().toString().split('T')[0])
  let uri;

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
        setActions(d.objects)

      })
  }, [get_url_cat, get_url_act])

  const handleRequest = (e) => {

    e.preventDefault()
    fetch('http://localhost:8000' + uri, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      // FIX: 
      /*
       Uncaught TypeError: JSON.stringify(...).then is not a function
      at handleRequest (Edit.js:48:1
       */
      body: JSON.stringify({
        amount: amount,
        category: category,
        text: text,
        created_at: date,
      })
        .then((r) => {
          if (r.ok) { window.location.reload() }
        })
        .catch(error => console.error(error))
    }
    )
  }
  //FIX: no auto loading in form
  return (
    <>
      <div>
        <form className="fancy-form" onSubmit={handleRequest}>
          <select>
            {actions.map((item) => (
              <option value={item.id} key={item.id} onChange={(e) => { setAction(e.target.value); uri = item.resource_uri }}>{item.created_at.toString().split('T')[0]} {item.text} {item.id} {categories[item.category]}</option>
            ))}
          </select>
          <input className="form-input" type="number" value={action.amount} placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
          <input className="form-input" placeholder="Enter text to spending" type='text' name='text' onChange={(e) => setText(e.target.value)} />

          <input type="date" id="date" name="date" value={date} required onChange={(e) => setDate(e.target.value)} />

          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            {Object.entries(categories).map(([key, item]) => (
              <option key={key} value={key}>{item}</option>
            ))
            }
          </select>

          <button className='form-button' type="submit">Save</button>


        </form>
      </div>
    </>
  )
}
function Edit() {
  return (
    <>
      <Panel get_url_act='http://localhost:8000/fake_api/spending/' get_url_cat='http://localhost:8000/fake_api/category_spend/' name='spending' />
    </>
  )
}
export default Edit;
