// можно здесь отображать график трат за этот месяц, я хз как это сделать, наверно нужно сначала сделать бд
// а потом уже из нее качать все и делать графики, даже может быть делать эти графики локально через библеотеку 
// либо сделать просто загрузчик чтобы он выгружал просто траты
// а через реакт приложение я думюа можно как это обрабатывать 
import {useEffect,useState} from 'react'
function Show({get_url_act,get_url_cat,name}){
  const [actions,setActions] = useState([])
  const [categories,setCategories] = useState({})
  useEffect(() =>{
    fetch(get_url_act)
    .then((r)=>r.json())
    .then((d) =>setActions(d.objects))

    fetch(get_url_cat)
    .then((r)=>r.json())
    .then((d) => {
        const catMap = {};
        d.objects.forEach((cat) => {
         catMap[cat.resource_uri] = cat.text;
        });
      setCategories(catMap)
      })

  },[])


  console.log(actions)
  return(
  <>
    <div>
    {actions.map((item)=>(
    <p className='line' key={item.resource_uri}>CREATED_AT: {item.created_at.toString().split('T')[0]} AMOUNT: {item.amount} CATEGORY: {categories[item.category]} TEXT: {item.text} ID: {item.id}</p>
    ))}
    </div>
  </>
  );
}

function Home(){
  return(
  <>
      <Show get_url_act='http://localhost:8000/fake_api/spending/' get_url_cat='http://localhost:8000/fake_api/category_spend/' name = 'spending' />
  </>
  );
}

export default Home;
