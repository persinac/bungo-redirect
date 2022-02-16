import React, {useEffect, useState} from "react";
import ButtonComponent from "./components/general/Button";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
const qs = require('qs')

/**
 * Useful links:
 * https://www.bungie.net/nl/Groups/Post?groupId=39966&postId=69434813&sort=0&path=0&showBanned=0
 * https://bungie-net.github.io/multi/operation_get_Destiny2-GetProfile.html#operation_get_Destiny2-GetProfile
 * https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType
 *
 * https://bungie-net.github.io/multi/schema_Destiny-Definitions-DestinyInventoryItemDefinition.html#schema_Destiny-Definitions-DestinyInventoryItemDefinition
 *
 * Rally Flag ID: 3282419336
 *
 * @returns {JSX.Element}
 * @constructor
 */

const UserInput = () => {
    // the key with this type of setup is that we need a line & f(x) for each input
    const [authCode, setAuthCode] = useState("");
    const [uuidState, setUUIDState] = useState("");
    const bungo_link = 'https://www.bungie.net/en/OAuth/Authorize?client_id=39340&response_type=code&state='

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        setDaCode(params.get('code'));
        setUniqueState(params.get('state'))
    },[])

    const setDaCode = (value) => {
        console.log(value);
        setAuthCode(value);
    }

    const setUniqueState = (value) => {
        console.log(value);
        setUUIDState(value);
    }

    const testing = () => {
        let stateVal = uuidv4().replaceAll('-', '')
        console.log(stateVal)
    }

    const goToBungo = () => {
        let stateVal = uuidv4().replaceAll('-', '')
        window.location.href = bungo_link + stateVal;
    }

    const reauth = () => {
        window.location.href = bungo_link + uuidState + '&reauth=true';
    }

    const getToken = async () => {
        const res = await axios.post(
            'https://www.bungie.net/platform/app/oauth/token/',
            qs.stringify({
                client_id: 39340,
                grant_type: 'authorization_code',
                code: authCode
            }),
            {
                headers: {
                    'X-API-KEY': 'a13c1aa6c60c44129469453f9513a412',
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }
        );
        console.log(res);
    }

    return (
        <div>
            <ButtonComponent onClickFunction={goToBungo} label={"Authorize"}/>
            <ButtonComponent onClickFunction={reauth} label={"Reauthorize"}/>
            <ButtonComponent onClickFunction={getToken} label={"Get Token"}/>
            <ButtonComponent onClickFunction={testing} label={"Test"}/>
            <div>
                <p>
                    Auth Code: {authCode}
                </p>
                <p>
                    Token: {authCode}
                </p>
                <p>
                    UUID State: {uuidState}
                </p>
            </div>
        </div>
    )
}



export default UserInput;