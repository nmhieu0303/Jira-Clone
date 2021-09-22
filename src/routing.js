import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Detail from "./pages/Detail";
import DropDrag from "./pages/DropDrag";
import Home from "./pages/Home";
import CreateProject from "./pages/Jira/CreateProject";
import ProjectDetail from "./pages/Jira/ProjectDetail";
import ProjectManagement from "./pages/Jira/ProjectManagement";
import LoginWithFormik from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import { ROUTE_PATHS } from "./utils/constant/router";

export const anonymousRouters = [{
    href: ROUTE_PATHS.HOME,
    exact: true,
    component: Home,
    template: 'default',
}, {
    href: ROUTE_PATHS.ABOUT_US,
    exact: true,
    component: AboutUs,
    template: 'default',
}, {
    href: ROUTE_PATHS.CONTACT,
    exact: true,
    component: Contact,
    template: 'default',
}, {
    href: ROUTE_PATHS.LOGIN,
    exact: true,
    component: LoginWithFormik,
    template: 'auth',
},{
    href: ROUTE_PATHS.SIGNUP,
    exact: true,
    component: SignUp,
    template: 'auth',
}, {
    href: ROUTE_PATHS.DETAIL,
    exact: true,
    component: Detail,
    template: 'default',
}, {
    href: ROUTE_PATHS.PROFILE,
    exact: true,
    component: Profile,
    template: 'default',
}, {
    href: ROUTE_PATHS.PROFILE,
    exact: true,
    component: Profile,
    template: 'default',
},
{
    href: ROUTE_PATHS.DRAG_DROP,
    exact: true,
    component: DropDrag,
    template: 'default',
},
// =================    JIRA    ========================
{
    href: ROUTE_PATHS.JIRA,
    exact: true,
    component: ProjectManagement,
    template: 'jira',
},
{
    href: ROUTE_PATHS.CREATE_PROFILE,
    exact: true,
    component: CreateProject,
    template: 'jira',
}, {
    href: ROUTE_PATHS.PROJECT_DETAIL,
    exact: true,
    component: ProjectDetail,
    template: 'jira',
},
{
    href: ROUTE_PATHS.PROJECT_MANAGEMENT,
    exact: true,
    component: ProjectManagement,
    template: 'jira',
}, 
{
    href: ROUTE_PATHS.PAGE_NOT_FOUND,
    exact: true,
    component: PageNotFound,
    template: 'non',
},
]