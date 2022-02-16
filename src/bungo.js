import React, {useEffect, useState} from "react";
import ButtonComponent from "./components/general/Button";
import { v4 as uuidv4 } from 'uuid';


const UserInput = () => {
    // the key with this type of setup is that we need a line & f(x) for each input
    const [inVal, setVal] = useState("");
    const bungo_link = 'https://www.bungie.net/en/OAuth/Authorize?client_id=39340&response_type=code&state='

    useEffect(() => {
        setUrl(window.location.href)
    },[])

    const setUrl = (value) => {
        console.log(value);
        setVal(value);
    }

    const testing = () => {
        let stateVal = uuidv4().replaceAll('-', '')
        console.log(stateVal)
    }

    const goToBungo = () => {
        let stateVal = uuidv4().replaceAll('-', '')
        window.location.href = bungo_link + stateVal;
    }

    return (
        <div>
            <ButtonComponent onClickFunction={goToBungo} label={"Authorize"}/>
            <ButtonComponent onClickFunction={testing} label={"Test"}/>
            <div>
                {inVal}
            </div>
        </div>
    )
}



export default UserInput;