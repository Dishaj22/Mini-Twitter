import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import AuthGuard from "./components/AuthGuard";
import TweetForm from "./components/TweetForm";
import TweetFeed from "./components/TweetFeed";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";

 function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={
            <>
              <TweetForm />
              <TweetFeed />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userId" element={<Profile />} />

        <Route element={<AuthGuard />}>
          <Route path="/settings" element={<Setting />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;