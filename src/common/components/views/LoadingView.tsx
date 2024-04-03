import React from "react"

export default class LoadingView extends React.Component{

	render(): React.ReactNode {
		return (
			<div className="w-full h-screen flex">
				<div className="m-auto">
					<div className="w-50">
					</div>
					<h1 className="mt-5 text-xl text-center">Loading...</h1>

				</div>
			</div>
		)
	}

}