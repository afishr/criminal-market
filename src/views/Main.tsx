import React, { useState } from 'react';
import CSS from 'csstype';
import Particles from 'react-particles-js';
import VizSensor from 'react-visibility-sensor';
import data from "../august_2018.json";
import { CustomSelect } from '../components/CustomSelect';

export const MainPage: React.FC = () => {
	let [number, setNumber] = useState<number>(20);
	

	const getLessCriminal = () => {
		let min = 9999999;
		let minName = '';
		data.map(e => {
			if (e.district.heads[0].value < min) {
				min = Number(e.district.heads[0].value);
				minName = e.district.name
			}

			/* console.log(e.district.name);
			console.log(e.district.heads[0].name);
			console.log(e.district.heads[0].value); */
		})
		
		return {
			name: minName,
			value: min
		};
	}

	const getListOfDistricts = () => {
		return data.map(e => {
			return e.district.name;
		})
	}

	const getMoreCriminal = () => {
		let max = 0;
		let maxName = '';
		data.map(e => {
			if (e.district.heads[0].value > max && e.district.name !== 'TOTAL') {
				max = Number(e.district.heads[0].value);
				maxName = e.district.name
			}
		})
		
		return {
			name: maxName,
			value: max
		};
	}

	const getCriminalByDistrict = (districtName: any) => {
		if (districtName) {
			const obj = data.find(e => e.district.name.toLowerCase() === districtName.toLowerCase());

			return {
				name: obj?.district.name,
				value: Number(obj?.district.heads[0].value)
			}
		} else {
			return {
				name: 'null',
				value: 0
			};
		}
	}

	const getTopFiveCategoriesByDistrict = (districtName: any) => {
		if (districtName) {
			const obj = data.find(e => e.district.name.toLowerCase() === districtName.toLowerCase());

			obj?.district.heads.sort((a, b) => {
				if (a.value > b.value) {
					return -1;
				}
				
				if (a.value < b.value) {
					return 1;
				}

				return 0;
			});

			console.log(obj);
			

		} else {
			return null;
		}
	};

	let [userSelect, setUserSelect] = useState<{name: any, value: any}>(getCriminalByDistrict('total'));

	let lessCriminal = getLessCriminal();
	let moreCriminal = getMoreCriminal();

	return <>
		<div className="testContainer">
			
		</div>
		<div className="dynamicBackground">
			<div className="overlay"></div>
			<Particles
				canvasClassName="dynamicBackgroundCanvas"
				width={window.innerWidth + "px"}
				height={window.innerHeight + "px"}
				style={dynamicBackground}
				params={{
					"particles": {
							"line_linked": {
								"enable": false,
								"distance": 100,
								"color": "#000000",
								"opacity": 0.2,
								"width": 1
							},
							"shape": {
								"type": "circle"
							},
							"color": {
								"value": "#000000"
							},
							"size": {
								"value": 10
							},
							"number": {
								"value": number
							},
							"move": {
								"speed": 10
							}
						}
				}}
    	/>
		</div>
		<div className="container">
			<div className="screen page-top">
				<div className="page-header">
				See a Plethora of Comitted Crimes Throghout The Distrcts of Moldova
				</div>
				<div className="page-desc">
				We visualized different categories of crimes that have occured for the duration of the past couple of years. From Dubăsari to Chișinău, see how each individual district compares to one another.
				</div>
			</div>
			<VizSensor
				partialVisibility 
				onChange={(isVisible) => {

					if (isVisible) {
						let val = lessCriminal.value / 20;
						setNumber( val );
					}
					
				}}
			>
				<div className="screen">
					<div className="card">
						<div className="card-header">
							<h1>{lessCriminal.name}</h1>
						</div>
						<div className="card-body">
							<p>Raion cu cea mai mare rată de criminalitate</p>
						</div>
					</div>
				</div>
			</VizSensor>
			<VizSensor
				partialVisibility 
				onChange={(isVisible) => {
					if (isVisible) {
						let val = moreCriminal.value / 30;
						setNumber( val );
					}
				}}
				>
				<div className="screen">
					<div className="card">
						<div className="card-header">
							<h1>{moreCriminal.name}</h1>
						</div>
						<div className="card-body">
							<p>Oraș cu cea mai mare rată de criminalitate</p>
						</div>
					</div>
				</div>
			</VizSensor>
			<VizSensor
				partialVisibility 
				onChange={(isVisible) => {
					if (isVisible) {
						let val = userSelect.value / 30;
						setNumber( val );
					}
				}}
			>
				<div className="screen last">
					<div className="card">
						<div className="card-header">
							<h1>{userSelect.name}</h1>
						</div>
						<div className="card-body">
							<p>Alegeți localitatea:</p>
							<p>
								<CustomSelect 
									items={getListOfDistricts()} 
									passEvent={(value: string) => {
										const temp = getCriminalByDistrict(value);
										setUserSelect(temp)
										let val = temp.value / 30;
										setNumber( val );
									}}
								/>
							</p>
						</div>
					</div>
				</div>
			</VizSensor>
			
		</div>
	</>
}

const dynamicBackground: CSS.Properties = {
	position: 'fixed',
	top: '0',
	zIndex: -999,
	animationName: ''
};