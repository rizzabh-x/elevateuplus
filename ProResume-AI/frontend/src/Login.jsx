import { useState } from "react";
import PropTypes from "prop-types";

const Login = ({ set }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regist, setRegist] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "transparent" }}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">{regist ? "Register" : "Login"}</h2>

        <form onSubmit={(e) => {
          e.preventDefault();
          set(true);
        }}>
          {regist && (
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                className="w-full px-3 text-gray-900 py-2 border rounded-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 text-gray-900 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 text-gray-900 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-gray-900 text-white py-2 rounded-lg hover:bg-blue-700">
            {regist ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-900 mt-4">
          {regist ? "Already have an account? " : "Don't have an account? "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setRegist(!regist)}
          >
            {regist ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  set: PropTypes.func.isRequired, // Fixed prop validation
};

export default Login;
