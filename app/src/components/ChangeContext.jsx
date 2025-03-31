import React from "react";

const ChangeContext = React.createContext({change: false, setChange: () => {}})

export default ChangeContext;