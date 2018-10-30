import HomePage from './pages/home';
import PlaylistPage from './pages/playlist';
import PlayerPage from './pages/player';
import NewPlaylist from './pages/new';
import CategoriesPage from './pages/categories';
import SearchPage from './pages/search';

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
      path: "/playlist/:playlistId",
      component: PlaylistPage
    },
    {
      path: "/player/:playlistId/:videoId",
      component: PlayerPage
    }
];
