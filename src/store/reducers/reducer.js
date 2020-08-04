export function NewsReducer(state = {}, action) {
    switch (action.type) {
        case 'NEXT': {
            return { ...action.payload };
        }
        case 'INCREMENT_VOTE': {
            const idsArray = JSON.parse(window.localStorage.getItem('upvote'));
            console.log("reducer",idsArray);
            const newState=Object.assign({},state);
            if (idsArray.length != 0) {
                newState.hits.forEach(news =>  idsArray.forEach(idOb => {
                    if(idOb.id == news.objectID){
                        news.points = idOb.points;
                    }
                }))
            }
            console.log("NewState",newState);
            return Object.assign({},state,{hits: [...newState.hits]});
            
            // return Object.assign({}, state, {
            //     hits: state.hits.map(
            //         (news) => news.objectID === action.payload ? { ...news, points: window.localStorage.getItem(action.payload) } : news
            //     )
            // });
        }
        case 'HIDE_NEWS': {
            const ids = action.payload.split(',');
            const newHits = state.hits.filter(news => !ids.includes(news.objectID));
            return { ...state, hits: newHits };
        }
        default:
            return state;
    }
}
