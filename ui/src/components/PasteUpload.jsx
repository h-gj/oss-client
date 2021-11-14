import React from "react";
import Uploady from "@rpldy/uploady";
import { usePasteUpload } from "@rpldy/upload-paste";
import {useRef, useCallback} from "react"
import baseUrl from "../config"

const ElementPaste = (props) => {
    const containerRef = useRef(null);

    const onPasteUpload = useCallback(({ count }) => {
        console.log("ELEMENT PASTE-TO-UPLOAD files: ", count);
    }, []);

    const { toggle, getIsEnabled } = usePasteUpload(props, containerRef, onPasteUpload);

    //toggle can be used in a button click handler to turn paste listening on/off
    
    return <>
        <div ref={containerRef} style={{backgroundColor: "white", height: "10vh"}}>
            Click Here & Paste Your Files
            {/* Paste is: {getIsEnabled() ? "enabled" : "disabled"} */}
        </div>
    </>;
};


const MyApp = () => {
    return <Uploady destination={{ url: `${baseUrl}/` }} concurrent={true} maxConcurrent={10}>
        <ElementPaste autoUpload={true} params={{ }}/>
    </Uploady>;
};


export default MyApp