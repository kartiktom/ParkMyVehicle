import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));
    // console.table(auth, auth.token);
  return auth&&auth.token? <Route {...rest} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
