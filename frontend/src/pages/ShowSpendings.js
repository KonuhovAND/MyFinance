import ShowActionModule from './ShowActionModule.js'


function ShowSpendings() {
  return (
    <>
      <ShowActionModule get_url_act='http://localhost:8000/fake_api/spending/' get_url_cat='http://localhost:8000/fake_api/category_spend/' name='spendings' />
    </>
  )
}
export default ShowSpendings;
