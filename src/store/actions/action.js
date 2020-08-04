import 'babel-polyfill';

export async function fetchNextNews(dispatch,res) {     
    dispatch({ type: 'NEXT',payload: res });
}

export async function fetchVote(dispatch,ids) {     
    dispatch({ type: 'INCREMENT_VOTE' });
}

export async function hideNewsRow(dispatch,ids) {
    console.log("entered action")
    dispatch({ type: 'HIDE_NEWS',payload: ids });
}

