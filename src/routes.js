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
import ResetPasswordPage from "./pages/reset-password";
import AuthyPage from "./pages/authy";
import OnboardingPage from "./pages/onboarding";
import BookmarksPage from "./pages/bookmarks";
import GiveawayPage from "./pages/giveaway";
import PromoPage from "./pages/promo-early-adopters";
import TestPage from "./pages/test";
import { HOME_PAGE, PLAYLIST_PAGE, SEARCH_PAGE, PLAYER_PAGE } from "./constants/pages";
import MyPlaylistsPage from "./pages/my-playlists";
import NotificationsPage from "./pages/notifications";

export const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true,
    analytics: {
      pageName: HOME_PAGE,
      pageLeave: "HomepageEvent"
    }
  },
  {
    path: "/promo-early-adopters",
    component: PromoPage,
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
    path: "/authy/:platform",
    component: AuthyPage,
    fullscreen: true,
  },
  {
    path: "/reset-password",
    component: ResetPasswordPage,
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
    path: "/onboarding",
    component: OnboardingPage,
    fullscreen: true,
  },
  {
    path: "/my-playlists",
    component: MyPlaylistsPage,
  },
  {
    path: "/notifications",
    component: NotificationsPage,
  },
  {
    path: "/search/",
    component: SearchPage,
    analytics: {
      pageName: SEARCH_PAGE,
      pageEnter: "SearchEvent",
      pageLeave: "SearchEvent"
    }
  },
  {
    path: "/bookmarks",
    component: BookmarksPage
  },
  {
    path: "/giveaway",
    component: GiveawayPage
  },
  {
    path: "/_test",
    component: TestPage
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
    component: PlaylistPage,
    analytics: {
      pageName: PLAYLIST_PAGE,
      pageLeave: "PlaylistEvent"
    }
  },
  {
    path: "/player/:playlistId/:videoId",
    component: PlayerPage,
    fullscreen: true,
    analytics: {
      pageName: PLAYER_PAGE,
      pageLeave: "PlayerEvent"
    }
  }
];
