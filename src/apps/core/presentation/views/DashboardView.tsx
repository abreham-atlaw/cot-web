import ViewModelView from "@/common/components/views/ViewModelView";
import { ReactNode } from "react";
import DashboardViewModel from "../../application/viewModels/dashboardViewModel";
import DashboardState from "../../application/states/dashboardState";
import DashboardStatComponent from "../components/DashboardStatComponent";
import DashboardCategoryChart from "../components/DashboardCategoryChart";
import AsyncButton from "@/common/components/buttons/AsyncButton";




export default class DashboardView extends ViewModelView<DashboardViewModel, unknown, DashboardState>{
    
    onCreateViewModel(state: DashboardState): DashboardViewModel {
        return new DashboardViewModel(state, this.setState.bind(this));
    }

    onCreateState(): DashboardState {
        return new DashboardState();
    }

    handleGenerateReport = () => {
        this.viewModel.generateReport();
    }



    onCreateMain(): ReactNode {
        return (
            <div className="p-16">
                <section className="">
                    <h2>Quick Stats</h2>
                    <div className="flex flex-wrap mt-7">
                        {
                            [
                                ["Total Assets", this.state.totalAssets!],
                                ["Available Assets", this.state.availableAssets!],
                                ["Allocated Assets", this.state.assignedAssets!]
                            ].map(
                                (value: (string | number)[]) => (
                                    <div className="my-5 md:my-0 w-full md:w-1/4 pr-0 md:pr-10">
                                        <DashboardStatComponent title={value[0] as string} value={value[1] as number}/>
                                    </div>
                                )
                            )
                        }
                    </div>
                </section>

                <section className="mt-16">
                    <h2>Requests Overview</h2>
                    <div className="flex flex-wrap mt-7">
                        {
                            [
                                ["Total Requests", this.state.totalRequests!],
                                ["Pending Requests", this.state.pendingRequests!],
                                ["Approved Requests", this.state.approvedRequests!],
                                ["Rejected Requests", this.state.rejectedRequests!]
                            ].map(
                                (value: (string | number)[]) => (
                                    <div className="my-5 md:my-0 w-full md:w-1/4 pr-0 md:pr-10">
                                        <DashboardStatComponent title={value[0] as string} value={value[1] as number}/>
                                    </div>
                                )
                            )
                        }
                    </div>
                </section>


                <section className="mt-24">
                    <h2>Report</h2>
                    <div className="flex mt-10">
                        <div className="w-full md:w-3/5">
                            <div onClick={this.handleGenerateReport}>
                                <AsyncButton state={this.state} bg="primary">Generate Report</AsyncButton>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-24">
                    <h2>Categories</h2>
                    <div className="flex mt-10">
                        <div className="w-full md:w-3/5">
                            <DashboardCategoryChart data={this.state.categoryAssetCounts!}/>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}