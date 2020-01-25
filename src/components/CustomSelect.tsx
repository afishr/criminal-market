import React from 'react';

export const CustomSelect: React.FC<{items: any, passEvent: Function}> = (props) => {

	const makeItem = (x: any) => {
		return <option value={x}>{x}</option>
	}

	const handleChange = (event: any) => {
		props.passEvent(event.target.value)
	}

	return <>
			<select
				onChange={handleChange}
			>{props.items.map(makeItem)}</select>
	</>
}