import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus"
import AuthenticatedComponent from "@/common/components/views/AuthenticatedComponent"
import LoadingView from "@/common/components/views/LoadingView"


const SplashScreen: React.FC<unknown> = () => {
    return (
        <AuthenticatedComponent
            redirectTo={"/base/dashboard"}
            redirectionMap={
                new Map<AuthenticationStatus, string>([
                [AuthenticationStatus.none, "/core/home",],
            ])} 
            children={<LoadingView/>}    
            validStatus={[]}    
            />
    );
}

export default SplashScreen;