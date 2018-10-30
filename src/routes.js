import HomePage from './pages/home';
import PlaylistPage from './pages/playlist';
import PlayerPage from './pages/player';
import NewPlaylist from './pages/new';
import SearchPage from './pages/search';
import LoginPage from './pages/login';
import RegistrationPage from './pages/register';

export const routes = [
    {
      path: "/",
      component: HomePage,
      exact: true
    },
    {
      path: "/new",
      component: NewPlaylist,
    },
    {
      path: "/login",
      component: LoginPage,
    },
    {
      path: "/register",
      component: RegistrationPage,
    },
    {
      path: "/search/",
      component: SearchPage
    },
    {
      path: "/playlist/:playlistId",
      component: PlaylistPage
    },
    {
      path: "/player/:playlistId/:videoId",
      component: PlayerPage
    }
];
