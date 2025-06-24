import CurrentUserLoader from "./components/current-user-loader";
import UserLoader from "./components/user-loader";

import { UserInfo } from "./components/user-info";

const App = () => {
  return (
    <>
      <>
      {/* first container component */}
        <CurrentUserLoader>
          <UserInfo />
        </CurrentUserLoader>
      </>
      <>
        {/* second container component (with props) */}
        <UserLoader userId="1">
          <UserInfo />
        </UserLoader>
        <UserLoader userId="2">
          <UserInfo />
        </UserLoader>
        <UserLoader userId="3">
          <UserInfo />
        </UserLoader>
      </>
    </>
  );
}

export default App;