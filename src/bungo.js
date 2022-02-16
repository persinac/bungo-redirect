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
    const [token, setToken] = useState("");
    const [memershipType, setMemberType] = useState("");
    const [membershipId, setMemberId] = useState("");
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
        setToken('CNXyAxKGAgAgHfmll6fhppjEK7J+R4Tg0c+kLB2LvABRzzc0IJ7w/q/gAAAAk658cDZuuPwFZLj+YFZ780tO+NVVnHT8zEaV792IsWdQi5NTL50xcfVHfa5DL6mZUuHiB+Ssw2GKp+a46JQvcxI5umdEqjZvwNBBW3kksegnerdO6AHNHsQkyA8l3w79dVbtRNQz/RX28BW162sxDz/XjFsUSDf4jATE9ITgah6Odr8cSITen92vBIRmoN4H/CEN6qMOfWNXvuQH9NIFeq2N3ds5Cx4CXRyGQKmQ0ZsmTqKE+9r67Pv7eas2vi8baOYxhBUe0ZvQLt3vk496EvCcU9Elpy1s94lDKlinaPQ=')
    }

    const goToBungo = () => {
        let stateVal = uuidv4().replaceAll('-', '')
        window.location.href = bungo_link + stateVal;
    }

    const reauth = () => {
        window.location.href = bungo_link + uuidState + '&reauth=true';
    }

    const getToken = async () => {
        const data = qs.stringify({
            'client_id': '39340',
            'grant_type': 'authorization_code',
            'code': authCode
        });
        const config = {
            method: 'post',
            url: 'https://www.bungie.net/platform/app/oauth/token/',
            headers: {
                'x-api-key': 'a13c1aa6c60c44129469453f9513a412',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data : data
        }
        const res = await axios(config);
        console.log(res.data['access_token'])
        setToken(res.data['access_token'])
    }

    const getCurrentUserMembership = async () => {
        var config = {
            method: 'get',
            url: 'https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/',
            headers: {
                'x-api-key': 'a13c1aa6c60c44129469453f9513a412',
                'Authorization': 'Bearer ' + token
            }
        };

        const res = await axios(config);
        setMemberType('3');
        setMemberId('4611686018471219555')
        console.log(res)
    }

    const getUserInv = async () => {
        var config = {
            method: 'get',
            url: 'https://www.bungie.net/Platform/Destiny2/' + memershipType + '/Profile/' + membershipId + '/?components=102',
            headers: {
                'x-api-key': 'a13c1aa6c60c44129469453f9513a412',
                'Authorization': 'Bearer ' + token
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <ButtonComponent onClickFunction={goToBungo} label={"1. Authorize"}/>
            <ButtonComponent onClickFunction={reauth} label={"1b. Reauthorize"}/>
            <ButtonComponent onClickFunction={getToken} label={"2. Get Token"}/>
            <ButtonComponent onClickFunction={getCurrentUserMembership} label={"3. Get User Membership"}/>
            <ButtonComponent onClickFunction={getUserInv} label={"4. Get User Inventory"}/>
            <ButtonComponent onClickFunction={testing} label={"Test"}/>
            <div>
                <p>
                    Auth Code: {authCode}
                </p>
                <p>
                    Token: {token}
                </p>
                <p>
                    UUID State: {uuidState}
                </p>
            </div>
        </div>
    )
}



export default UserInput;