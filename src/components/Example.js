
import React, { useState } from 'react'
import Select from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'
import './Example.css'

const Example = () => {

  const [value, setvalue] = useState('')

//   const  handleOnchange  =  val  => {
//     setvalue(val)
//   }

  const  options  = [
    { label:  'Business Analyst', value:  'Business Analyst'  },
    { label:  'Developer', value:  'Developer'  },
    { label:  'Designer', value:  'Designer'  },
    { label:  'QA', value:  'QA'  },
  ]

  return(
    <div className="app">
      <Select
        options={options}
      />
    </div>
)}

export default Example