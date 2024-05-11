import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";

export enum Pages{
    dashboard,
    asset,
    category,
    department,
    invitation,
    maintenance,
    request,
    staff,
}

export default class PermissionConfigs{
    static readonly VISIT_PERMISSIONS = new Map<Pages, AuthenticationStatus[]>([
        [Pages.dashboard, Object.values(AuthenticationStatus) as AuthenticationStatus[]],
        [Pages.asset, [AuthenticationStatus.admin, AuthenticationStatus.inventory, AuthenticationStatus.staff]],
        [Pages.category, [AuthenticationStatus.admin, AuthenticationStatus.inventory]],
        [Pages.department, [AuthenticationStatus.admin]],
        [Pages.invitation, [AuthenticationStatus.admin, AuthenticationStatus.hr]],
        [Pages.maintenance, [AuthenticationStatus.admin, AuthenticationStatus.inventory, AuthenticationStatus.staff]],
        [Pages.request, [AuthenticationStatus.admin, AuthenticationStatus.department, AuthenticationStatus.inventory, AuthenticationStatus.staff]],
        [Pages.staff, [AuthenticationStatus.admin, AuthenticationStatus.hr]]
    ])
}