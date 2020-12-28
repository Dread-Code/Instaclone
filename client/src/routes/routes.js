//Layouts
import LayoutBasic from '../layouts/LayoutBasic' 
// Pages
import Home from '../pages/Home'
import User from '../pages/User'
import Error404 from '../pages/Error404'

const routes = [
    {
        path: '/', 
        component: Home,
        layout: LayoutBasic,
        exact: true
    },
    {
        path: '/:username',
        component: User,
        layout: LayoutBasic,
        exact: true
    }, 
    {
        component: Error404,
        layout: LayoutBasic
    }
]

export default routes
