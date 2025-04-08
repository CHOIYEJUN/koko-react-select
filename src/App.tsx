import Select from './component/Select.tsx';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState<string | number>('');

  const optionList = [
    { label: '셀트리온', value: '1' },
    { label: '더즌 테스트', value: '2' },
    { label: '카카오뱅크', value: '3' },
    { label: 'LG 유플러스', value: '4' },
    { label: '쿠팡', value: '5' },
    { label: '쿠팡', value: '6' },
    { label: '쿠팡', value: '7' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Select
        value={value}
        onChange={(value) => setValue(value || '')}
        placeholder={'...select'}
        optionList={optionList}
        isClearable={true}
        isSearchable={true}
        disabled={false}
      />
    </div>
  );
}

export default App;
