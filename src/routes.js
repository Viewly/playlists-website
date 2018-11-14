import HomePage from "./pages/home";
import PlaylistPage from "./pages/playlist";
import PlayerPage from "./pages/player";
import CreatePlaylist from "./pages/create-playlist";
import CategoriesPage from "./pages/categories";
import SearchPage from "./pages/search";
import ProfilePage from "./pages/profile";
import AccountPage from "./pages/account";
import CategoryPage from "./pages/category";
import HashtagsPage from "./pages/hashtags";
import LatestPlaylists from "./pages/new";
import LoginPage from "./pages/login";
import RegistrationPage from "./pages/register";
import EmailConfirmPage from "./pages/confirm-email";

export const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true
  },
  {
    path: "/create-playlist",
    component: CreatePlaylist,
  },
  {
    path: "/new",
    component: LatestPlaylists,
  },
  {
    path: "/categories",
    component: CategoriesPage,
  },
  {
    path: "/hashtags",
    component: HashtagsPage,
  },
  {
    path: "/login",
    component: LoginPage,
    fullscreen: true,
  },
  {
    path: "/account",
    component: AccountPage,
  },
  {
    path: "/register",
    component: RegistrationPage,
    fullscreen: true,
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
    path: "/confirm-email/:token",
    component: EmailConfirmPage
  },
  {
    path: "/category/:categorySlug",
    component: CategoryPage
  },
  {
    path: "/playlist/:playlistId",
    component: PlaylistPage
  },
  {
    path: "/player/:playlistId/:videoId",
    component: PlayerPage,
    fullscreen: true,
  }
];
