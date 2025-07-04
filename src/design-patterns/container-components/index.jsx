import axios from "axios";
import CurrentUserLoader from "./components/current-user-loader";
import UserLoader from "./components/user-loader";
import ResourceLoader from "./components/resource-loader";
import DataSource from "./components/data-source";
import DataSourceWithRenderProps from "./components/data-source-with-render-props";

import { UserInfo } from "./components/user-info";
import { BookInfo } from "./components/book-info";

const getDataFromServer = async (url) => {
  const response = await axios.get(url);
  return response.data;
}

const getDataFromLocalStorage = (key) => () => {
  return localStorage.getItem(key);
}

const Message = ({ message }) => {
  return <div>{message}</div>
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
        {/* <DataSource getData={() => getDataFromServer("/api/users/2")} resourceName="user">
          <UserInfo />
        </DataSource> */}
      </>
      <>
        {/* fifth container component (with render props) */}
        {/* <DataSourceWithRenderProps
          getData={() => getDataFromServer("/api/users/2")}
          render={(user) => {
            return <UserInfo user={user} />
          }}
        >

        </DataSourceWithRenderProps> */}
      </>
      <>
        {/* sixth container component (with render props) */}
        <DataSource
          getData={() => getDataFromLocalStorage("user")}
          resourceName="message"
        >
          <Message />
        </DataSource>
      </>
    </>
  );
}

export default App;