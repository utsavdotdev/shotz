import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { NhostClient, NhostReactProvider } from "@nhost/react";
import {NhostApolloProvider} from "@nhost/react-apollo"

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Image from "./pages/Image";
import Collection from "./pages/Collection";

function App() {
  const nhost = new NhostClient({
    subdomain: process.env.REACT_APP_NHOST_SUBDOMAIN,
    region: process.env.REACT_APP_NHOST_REGION,
  });
  return (
    <>
      <NhostReactProvider nhost={nhost}>
        <NhostApolloProvider nhost={nhost}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout nhost={nhost} />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="image" element={<Image />} />
              <Route path="mycollection" element={<Collection />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
        </NhostApolloProvider>
      </NhostReactProvider>
    </>
  );
}

export default App;
