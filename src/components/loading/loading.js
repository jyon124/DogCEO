import React from "react";
import "./loading.css";

function Loading(){
    return (
        <React.Fragment>
            <div className="lds">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </React.Fragment>
    );
}
export default Loading;