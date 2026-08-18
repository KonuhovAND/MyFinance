import { useEffect, useState } from 'react'

function Show({ get_url_act = '', get_url_cat = '', name = '' }) {
  const [actions, setActions] = useState([])
  const [categories, setCategories] = useState({})
  useEffect(() => {
    fetch(get_url_act)
      .then((r) => r.json())
      .then((d) => setActions(d.objects))

    fetch(get_url_cat)
      .then((r) => r.json())
      .then((d) => {
        const catMap = {};
        d.objects.forEach((cat) => {
          catMap[cat.resource_uri] = cat.text;
        });
        setCategories(catMap)
      })

  }, [get_url_act, get_url_cat])


  console.log(actions)
  return (
    <>
      <table className='mytable'>
        <thead>
          <tr>
            <th colSpan={5} className='table-name-title'>Last 100 {name}</th>
          </tr>
          <tr>
            <th> CREATED_AT</th>
            <th> AMOUNT</th>
            <th> CATEGORY</th>
            <th> TEXT</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((item, index) => (
            <tr key={item.id} className={index % 2 === 1 ? 'table-row-1' : 'table-row-0'}>
              <td>{item.created_at.toString().split('T')[0]}</td>
              <td>{item.amount}</td>
              <td>{categories[item.category]}</td>
              <td>{item.text}</td>
              <td>{item.id}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </>
  );
}

export default Show;
