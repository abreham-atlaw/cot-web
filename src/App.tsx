import "./App.css";
import "./index.css";
import StaffView from "./apps/staff/presentation/views/Staff";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StaffDetail from "./apps/staff/presentation/views/StaffDetail";
import SideBar from "./common/components/views/SideBar";
import AssetView from "./apps/asset/presentation/views/AssetView";
import AssetDetail from "./apps/asset/presentation/views/AssetDetail";
import DashBoard from "./apps/admin/presentation/views/Dashboard";

function App() {
	return (
		<div className='app'>
			<DashBoard/>
			<SideBar />
			<div className='main-content'>
				<BrowserRouter>
					<Routes>
						<Route path='staffs' element={<StaffView />} />
						<Route path='staffs/:staffId' element={<StaffDetail />} />
						<Route path='assets' element={<AssetView />} />
						<Route path='assets/:assetId' element={<AssetDetail />} />
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
