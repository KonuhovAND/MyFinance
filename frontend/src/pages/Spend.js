import Show_ from './Show.js'


function Show_spendings() {
  return (
    <>
      <Show_ get_url_act='http://localhost:8000/fake_api/spending/' get_url_cat='http://localhost:8000/fake_api/category_spend/' name='spendings' />
    </>
  )
}
export default Show_spendings;
