import React from "react";

const preloader = WrappedComponent => {
  
  return function(props) {
    console.log("isLoading? ", props.loading);
    if (props.loading) {
      return <div className="loader">Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
};

export default preloader;
