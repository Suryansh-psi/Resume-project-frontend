import React, {useState} from 'react'
import $ from 'jquery'
import Popper from '@popperjs/core'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap/dist/css/bootstrap.min.css'
import EditSidebar from './EditSidebar'
import {Outlet, useParams} from 'react-router-dom'
import EditTemplate from './EditTemplate'
import './EditLayout.css'

const EditLayout = () => {
	const [term, setTerm] = useState(0);
	const params = useParams();
	// console.log(params.id);

	const ChangeState = (num) => {
		setTerm(num);
	}
	
	return (
		<div className="resumeBuilder">
			{true && <EditSidebar idForRequest={params.id}/>}
			<main className="mainsection" >	{<Outlet context={[term, setTerm]} idForRequest={params.id}/>}</main>
			{true && <EditTemplate term={term} idForRequest={params.id}/>}
		</div>
	)
}

export default EditLayout;