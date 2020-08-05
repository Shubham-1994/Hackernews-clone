export function NewsReducer(state = {}, action) {
    switch (action.type) {
        case 'NEXT': {
            return { ...action.payload };
        }
        case 'INCREMENT_VOTE': {
            const idsArray = JSON.parse(window.localStorage.getItem('upvote'));
            const newState=Object.assign({},state);
            if (idsArray.length != 0) {
                newState.hits.forEach(news =>  idsArray.forEach(idOb => {
                    if(idOb.id == news.objectID){
                        news.points = idOb.points;
                    }
                }))
            }
            return Object.assign({},state,{hits: [...newState.hits]});
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
