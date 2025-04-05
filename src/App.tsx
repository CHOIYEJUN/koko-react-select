import Select from "./component/Select.tsx";

function App() {


    const optionList = [
        {label : '셀트리온', value : '1'},
        {label : '더즌 테스트', value : '2'},
        {label : '카카오뱅크', value : '3'},
        {label : 'LG 유플러스', value : '4'},
        {label : '쿠팡', value : '5'},
        {label : '쿠팡', value : '6'},
        {label : '쿠팡', value : '7'},
    ]
  return (
    <>
      <Select value={''} placeholder={'...select'} optionList={optionList} isClearable={true} isSearchable={true} disabled={false}/>
    </>
  )
}

export default App
