
import React from "react"
import { Link } from "react-router-dom"


interface ErrorViewProps{
	error: Error | null
}

export default class ErrorView extends React.Component<ErrorViewProps>{



	render(): React.ReactNode {
		return (
			<div className="w-full h-screen flex">
				<div className="m-auto text-center">
					<div className="w-50">
					</div>
					<h1 className="mt-5 text-xl text-center">Sorry, an error has occurred.</h1>
					<h6 className="mt-5 text-xl text-center">{this.props.error?.message??""}</h6>
					<button className="text-center bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"><Link to="/">Go to Home</Link></button>


				</div>
			</div>
		)
	}
}