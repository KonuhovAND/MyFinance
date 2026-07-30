import { useState, useEffect } from "react";
//TODO:переделать fetch на то что мы используем
// ну короче, нужно управлять категориями, добавлять это точно
// но удалять хз, если я чето добавил, скорее всего легче просто удалить трату из бд
// а тут только работать с категориями которые есть(добавлять в разные короче)
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

function Category({url_get_categories,url_post_categories,category_type}){
    const [categories,setCategories] = useState([])
    const [text,setText] = useState('')
    const [category,setCategory] = useState('')

    let url_ = 'http://localhost:8000/app/api/categories'
    let url_POST = 'http://localhost:8000/app/api/recieve_categories'

    let loadCategories = () =>{
        fetch(url_get_categories)
        .then((r) => r.json())
        .then((d) => {
            setCategories(d.objects)
            setCategory(d.objects[-1].resource_uri)
    })
    };
    useEffect(() => {loadCategories();},[]);

    const handleRequest =(e)=> {
        e.preventDefault();
        let data = {
            text:text,
            type:category_type,
        }
        
        fetch(url_post_categories,{
            method: 'POST',
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
        <div className="catagories" >
            <p className="catagories-text">Available catagories to {category_type}</p>
            {categories.map((item) => (
                <p key ={item.resource_uri}className="catagories-text">{item.text}</p>
            ))}
            <form className="fancy-form" onSubmit={(e) => handleRequest(e)}>
                <input className="form-input" type="text" value={category} onChange={(e) => {setCategory(e.target.value)}} />
                <button className='form-button'  type="submit">Save</button>
            </form>
        </div>
        </>
    );
}

export default Category({url_get_categories:'http://localhost:8000/fake_api/category_income/' ,url_post_categories='http://localhost:8000/fake_api/category_income/',category_type='income' });