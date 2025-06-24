import axios from "axios";
import CurrentUserLoader from "./components/current-user-loader";
import UserLoader from "./components/user-loader";
import ResourceLoader from "./components/resource-loader";
import DataSource from "./components/data-source";

import { UserInfo } from "./components/user-info";
import { BookInfo } from "./components/book-info";

const getDataFromServer = async (url) => {
  const response = await axios.get(url);
  return response.data;
}

const App = () => {
  return (
    <>
      <>
        {/* first container component */}
        {/* <CurrentUserLoader>
          <UserInfo />
        </CurrentUserLoader> */}
      </>
      <>
        {/* second container component (with props) */}
        {/* <UserLoader userId="1">
          <UserInfo />
        </UserLoader>
        <UserLoader userId="2">
          <UserInfo />
        </UserLoader>
        <UserLoader userId="3">
          <UserInfo />
        </UserLoader> */}
      </>
      <>
        {/* third container component (with props) */}
        {/* <ResourceLoader resourceUrl="/api/users/2" resourceName="user">
          <UserInfo />
        </ResourceLoader>
        <ResourceLoader resourceUrl="/api/books/2" resourceName="book">
          <BookInfo />
        </ResourceLoader> */}
      </>
      <>
        {/* fourth container component (with props) */}
        <DataSource getData={() => getDataFromServer("/api/users/2")} resourceName="user">
          <UserInfo />
        </DataSource>
      </>
    </>
  );
}

export default App;