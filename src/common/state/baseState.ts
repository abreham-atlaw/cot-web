import { AsyncStatus } from "./asyncState";


class SlideState {
    slideIndex: number;
    bgImage: string;

    constructor() {
        this.slideIndex = 0;
        this.bgImage = '';
    }
}

export default class BaseState {
    public context: Record<string, any>;
    public initState = {
        status: AsyncStatus.none,
        error: null,
    };

    public slideState: SlideState;  // New SlideState property

    constructor(context?: object) {
        if(context === undefined){
            context = {}
        }
        this.context = context;
        this.slideState = new SlideState();  // Initialize the SlideState
    }
}