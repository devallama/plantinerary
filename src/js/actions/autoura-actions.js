import { AUTOURA_SEARCH_STOPS } from './types';
import axios from 'axios';
import QueryString from 'query-string';
import AutouraKey from '../AutouraKey.confid';

export const autouraSearchStops = (searchTerms) => (dispatch) => {
    const queryString = QueryString.stringify(searchTerms);

    const url = `https://api.autoura.com/api/stops/search?${queryString}`;

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer: ${AutouraKey}`
        },
        mode: 'cors'
    };

    axios.get(url, config)
        .then(resp => {
            console.log(resp);

            dispatch({
                type: AUTOURA_SEARCH_STOPS,
                data: resp
            });
        })
        .catch(err => {
            console.log(err);

            dispatch({
                type: AUTOURA_SEARCH_STOPS,
                data: resp
            });
        });
};