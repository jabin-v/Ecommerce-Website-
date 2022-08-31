import React from 'react'
import './style.css'

const Progressbar = ({done}) => {

    let width;
	
	
	
	if(done === "Processing"){
		width="0"
		
	}
	if(done === "packed"){
		width="25"
		
	}
	if(done === "shipped"){
		width="50"
		
	}
	if(done === "out for delivery"){
		width="75"
		
	}
	if(done === "delivered"){
		width="100"
		
	}
	const [style, setStyle] = React.useState({});
	
	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${width}%`
		}
		
		setStyle(newStyle);
	}, 200);
	
	return (
		<>
		{done === "Processing" && <p style={{color:"red"}}>We are processing your order</p>}
	
		<div className="progress">
			
			<div className="progress-done" style={style}>
				{`${done !== "Processing"  ? done :""}`}
			</div>
		</div>
		</>
	)
}

export default Progressbar