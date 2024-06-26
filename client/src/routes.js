import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE,
    CHAT_ROUTE,
    HOMEPAGE_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    ZAKAZPAGE_ROUTE
} from "./utils/consts";
import Chat from "./pages/Chat";
import profile from "./pages/Profile";
import homepage from "./pages/Homepage";
import Auth from "./pages/Auth";
import zakazPage from "./pages/ZakazPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]

export const publicRoutes = [
    {
        path: HOMEPAGE_ROUTE,
        Component: homepage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: ZAKAZPAGE_ROUTE + '/:id',
        Component: zakazPage
    },
    {
        path: PROFILE_ROUTE + '/:id',
        Component: profile
    },

    {
        path: CHAT_ROUTE,
        Component: Chat
    }
]