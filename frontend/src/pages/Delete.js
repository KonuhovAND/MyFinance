import { useState, useEffect } from "react";
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

function Panel({url_categories,category_type}){
    const [categories,setCategories] = useState([])
    const [text,setText] = useState('')
    const [category,setCategory] = useState('')
    let selected;
    let uri;


    let loadCategories = () =>{
        fetch(url_categories)
        .then((r) => r.json())
        .then((d) => {
            setCategories(d.objects)
            setCategory(d.objects[0].resource_uri)
            // setText(d.objects[0].text)
    })
    };
    useEffect(() => {loadCategories();},[]);

    const handleSelect = (e) =>{
      uri = e.target.value;
      setCategory(uri);
      selected = categories.find((c) => c.resource_uri === uri)
      if (selected) setText(selected.text)
  }
    const handleRequest =(e)=> {
        
        e.preventDefault();
        let data = {
            category:category,
            text:text,
        }
        

        fetch('http://localhost:8000' + category,{
            method: 'PATCH',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then((res) =>{
            loadCategories();
            setCategory('');
        })

    } 
    return(
        <>
      <div className='categories'>
        <form className='fancy-form' onSubmit={handleRequest}>
          <select className='form-select' value ={category} onChange={handleSelect}>
            {categories.map((item) =>(
            <option value={item.resource_uri} key={item.resource_uri}>{item.text}</option>
            ))}

          </select>
          <input className='form-input' type='text' value={text} placeholder='Enter new name of category' onChange={(e) => setText(e.target.value)}/>
          <button className='form-button'  type="submit">Save</button>
        </form>
      </div>
        </>
    );
}


 function Delete(){
    return(
    <>    
    <Panel url_categories ='http://localhost:8000/fake_api/category_spend/'  category_type='spendings' />
    <Panel url_categories ='http://localhost:8000/fake_api/category_income/'  category_type='income' />
</>

    );
}
export default Delete;
