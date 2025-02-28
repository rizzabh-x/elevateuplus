import { createRoot } from "react-dom/client";
import { useState } from "react";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import Login from "./Login.jsx";

const domain = "codetitans.us.auth0.com";
const clientId = "sYPMN71AjAS0JWeSJ5Rm9mUw2pdovMKb";

const Main = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="screen">
      <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{ redirect_uri: window.location.origin }}>
      <div className="flex items-center justify-center min-h-screen">
        {clicked ? <App /> : <Login set={setClicked} />}
      </div>
    </Auth0Provider>
    </div>
    
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Main />);
