import HomePage from './pages/home';
import PlaylistPage from './pages/playlist';
import PlayerPage from './pages/player';
import NewPlaylist from './pages/new';
import CategoriesPage from './pages/categories';
import SearchPage from './pages/search';
import ProfilePage from './pages/profile';

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
      path: "/categories",
      component: CategoriesPage,
    },
    {
      path: "/search/",
      component: SearchPage
    },
    {
      path: "/profile/:profileId",
      component: ProfilePage
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
