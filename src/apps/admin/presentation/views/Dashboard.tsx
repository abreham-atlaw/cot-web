import { IoPerson } from "react-icons/io5";
import styles from '../components/Dashboard.module.css';
import { FaBug } from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Overview from "@/common/components/views/Overview";
import ReportBar from "@/common/components/views/ReportBar";
import DashboardBaseState from "@/apps/core/application/states/dashboardBaseState";
interface DashBoardProps{
	state:DashboardBaseState
}

function DashBoard(props:DashBoardProps) {
	const rightbar = [
		{
			title: "You fixed a bug",
			icons: <FaBug />,
		},
		{
			title: "New user registered",
			icons: <IoPerson />,
		},
		{
			title: "You fixed a bug",
			icons: <FaBug />,
		},
		{
			title: "New user registered",
			icons: <IoPerson />,
		},
		{
			title: "You fixed a bug",
			icons: <FaBug />,
		},
		{
			title: "New user registered",
			icons: <IoPerson />,
		},
		{
			title: "You fixed a bug",
			icons: <FaBug />,
		},
		{
			title: "New user registered",
			icons: <IoPerson />,
		},
	];


	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [recent, setRecent] = useState(rightbar)
	return (
	<div className={styles.dashboard}>
		<div className={styles.content}>
			
			<div className={styles.body}>
				<MainContent state={props.state}/>
			</div>
		</div>

		<div className="fixed top-1/10 right-0 max-w-md w-[20%] md:w-md min-w-md h-full border-l border-gray-300 p-4 overflow-auto">

  <div className="recent h-[100%] overflow-auto">
    <h3 className="text-xl font-semibold mb-4">Notifications</h3>
    <div className="flex flex-col gap-2  ">
      {recent.map((item) => (
        <div className="bg-gray-100 rounded-md p-2">
          <p className="text-sm">{item.title}</p>
        </div>
      ))}
    </div>
  </div>

  <div className="maintenance mt-8">
    <h3 className="text-lg font-medium mb-4">Maintenance</h3>
    <div className="flex items-center gap-2">
      <p className=" font-medium text-gray-500">Pending</p>
      <span className="text-base font-bold text-gray-700">{props.state.pendingmaintenace ?? "-"}</span>
    </div>
    <div className="flex items-center gap-2 mt-2">
      <p className=" font-medium text-gray-500">Resolved</p>
      <span className="text-base font-bold text-gray-700">{props.state.resolvedmaintenance ?? "-"}</span>
    </div>
  </div>

</div>


	</div>
	
	)
}
function MainContent(props:DashBoardProps) {
	const quickStat = [
		{
			title: "Total Asset",
			value: props.state.totalasset,
		},
		{
			title: "Available Asset",
			value: props.state.avaliableasset,
		},

		{
			title: "Assigned Asset",
			value: props.state.assignedasset,
		},
	];
	const Requests = [
		{
			title: "Total Requests",
			value: props.state.totalrequest,
		},
		{
			title: "Pending Requests",
			value: props.state.pendingrequest,
		},

		{
			title: "Resolved Requests",
			value: props.state.resolvedrequest,
		},
	];
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const [statistics, setStatistics] = useState(stat)
	return <>
		<h3>Quick Stat</h3>
		<Overview stat={quickStat}/>
		<h3>Request Overview</h3>
		<Overview stat={Requests} />
		<h3>Report</h3>
		
			<ReportBar/>
		
	</>
}
export default DashBoard