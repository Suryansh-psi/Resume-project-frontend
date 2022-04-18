import React, {useState} from 'react'
import $ from 'jquery'
import Popper from '@popperjs/core'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './Sidebar'
import {Outlet} from 'react-router-dom'
import Template from './Template'
import './Layout.css'

const Layout = () => {
	const [term, setTerm] = useState(0);

	const ChangeState = (num) => {
		setTerm(num);
	}
	
	return (
		<div className="resumeBuilder">
			{true && <Sidebar />}
			<main className="mainsection" >	{<Outlet context={[term, setTerm]}/>}</main>
			{true && <Template term={term}/>}
		</div>
	)
}

export default Layout