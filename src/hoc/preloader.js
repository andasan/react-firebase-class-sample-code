import React from 'react';

const preloader = WrappedComponent => {

    return function(props){
        console.log("from hoc: ",props);
        if(props.loading){
            return <div className="loader">Loading.....</div>
        }

        return <WrappedComponent {...props}  />

    }
};

export default preloader;