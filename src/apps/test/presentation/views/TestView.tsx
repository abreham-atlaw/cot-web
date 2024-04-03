import { ReactNode } from "react";
import ViewModelView from "../../../../common/components/views/ViewModelView";
import TestState from "../../application/states/testState";
import TestViewModel from "../../application/viewModels/testViewModel";



export default class TestView extends ViewModelView<TestViewModel, unknown, TestState>{
    
    onCreateViewModel(state: TestState): TestViewModel {
        return new TestViewModel(state, this.setState.bind(this));
    }
    onCreateState(): TestState {
        return new TestState();
    }

    handleClick = () => {
        this.getViewModel().create();
    } 

    onCreateMain(): ReactNode {
        return (<>
            <div>{ this.state.status }</div>
            <div>{ this.state.error?.message??"" }</div>

            <ul>
                { this.state.items!.map(
                    (item) => <div key={item.id!}>Id: {item.id} <br/> Name: {item.name}<br/>Quantity: {item.quantity}</div>
                )}
            </ul>

            <button onClick={this.handleClick}>Create New</button>
            <h1>Hello</h1>
        </>)
    }

}