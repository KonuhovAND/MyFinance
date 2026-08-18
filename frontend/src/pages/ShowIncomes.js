import ShowActionModule from "./ShowActionModule.js";
function ShowIncomes() {
  return (
    <>
      <ShowActionModule get_url_act='http://localhost:8000/fake_api/income/' get_url_cat='http://localhost:8000/fake_api/category_income/' name='income' />
    </>
  )
}
export default ShowIncomes;
