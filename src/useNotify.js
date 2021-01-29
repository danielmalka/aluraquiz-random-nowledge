import * as React from "react";
import { NotifyContext } from "./components/NotificationProvider";

function useNotify() {
  return React.useContext(NotifyContext);
}

export default useNotify;
