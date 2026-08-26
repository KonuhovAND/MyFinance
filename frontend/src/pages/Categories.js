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


    let loadCategories = () =>{
        fetch(url_categories)
        .then((r) => r.json())
        .then((d) => {
            setCategories(d.objects)
            setCategory(d.objects[0].resource_uri)
    })
    };
    useEffect(() => {loadCategories();},[]);

    const handleRequest =(e)=> {
        e.preventDefault();
        fetch(url_categories,{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
            resource_uri:category,
            text:text,
        }
)
        })
        .then((res) =>{
            loadCategories();
            setCategory('');
        }).then((res) =>{
            if (res.ok){window.location.reload()}
      }).catch(error => console.error("Error:",error) )

    } 

    return(
        <>
        <div className="block" >
            <p className="catagories-text">Available catagories to {category_type}</p>
            {categories.map((item) => (
                <p key ={item.resource_uri}className="catagories-text">{item.text}</p>
            ))}
            <form className="fancy-form" onSubmit={(e) => handleRequest(e)}>
                <input className="form-input" type="text" value={text} onChange={(e) => {setText(e.target.value)}} />
                <button className='form-button'  type="submit">Save</button>
            </form>
        </div>
        </>
    );
}
function Categories(){
  return(
  <>
  <Panel url_categories ='http://localhost:8000/fake_api/category_spend/'  category_type='spendings' />
  <Panel url_categories ='http://localhost:8000/fake_api/category_income/'  category_type='income' />
  </>
  );
}
export default Categories;
