 import { useState, useEffect } from "react";
import { data } from "react-router-dom";
//TODO: передаелть на сбор данных который мы используем
// {
//   "meta": {
//     "limit": 20,
//     "next": null,
//     "offset": 0,
//     "previous": null,
//     "total_count": 1
//   },
//   "objects": [
//     {
//       "amount": 100,
//       "category": "/fake_api/categories_spend/1/",
//       "created_at": "2026-07-16T10:29:00.898310",
//       "id": 1,
//       "resource_uri": "/fake_api/spendings/1/",
//       "text": "купил булочку"
//     }
//   ]
// }
function Add_operation({url_get_categories_,url_post_operation_,operation_name}){
    const [amount,setAmount] = useState('')
    const [category,setCategory] = useState('')
    const [categories,setCategories] = useState([])
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [text,setText] = useState('')




    useEffect(() =>{
        fetch(url_get_categories_)
        .then((r) => r.json())
        .then((d) => {setCategories(d.objects);console.log(d,d.objects);setCategory(d.objects[0].resource_uri);})
    },[]);
    const handleRequest = (e) =>{
        e.preventDefault()
        const data = {
            amount: amount,
            category: category,
            text: text,
            created_at:date,
        }


        fetch(url_post_operation_,{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
    }
    return(
        <>
        <div className="catagories">
            <p className="catagories-text">Available catagories to {operation_name}</p>
            {categories.map((item) => (
                <p key ={item.id}className="catagories-text">{item.text}</p>
            ))}

        </div>
        <form className="fancy-form" onSubmit={handleRequest}>
            <input className="form-input" type="number" value={amount} placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
            <input className="form-input" placeholder="Enter text to spending" type='text' name='text' onChange={(e) => setText(e.target.value)}/>

            <input type="date" id="date" name="date" onChange={(e) => setDate(e.target.value)}/>

            <select className="form-select" value={category} onChange={(e) =>setCategory(e.target.value)}>{categories.map((cat) => (<option value={cat.resource_uri} key={cat.id}>{cat.text}</option>))}</select>

            <button className='form-button'  type="submit">Save</button>
        </form>
        </>
    )


}


function App_add(){
    return(
        <>
            <Add_operation url_get_categories_='http://localhost:8000/fake_api/category_spend/' url_post_operation_='http://localhost:8000/fake_api/spending/' operation_name='spending'/>
            <Add_operation url_get_categories_='http://localhost:8000/fake_api/category_income/' url_post_operation_='http://localhost:8000/fake_api/income/' operation_name='income'/>
        </>
    );

}

export default App_add;