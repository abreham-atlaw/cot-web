import React from "react"
import { LoadingSpinner } from "../status/LoadingSpinner"

export default class LoadingView extends React.Component{

	render(): React.ReactNode {
		return (
			<div className="w-full h-screen flex">
				<div className="m-auto">
					<div className="w-50">
						<LoadingSpinner />
					</div>
				</div>
			</div>
		)
	}

}