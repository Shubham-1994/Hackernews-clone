import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchNextNews } from './store/actions/action';
import { Table, TableData, TableRow, TableHead, Url, Time, Author } from './Style';
import { formatURL, formatDateTime } from './utility/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import { fetchVote,hideNewsRow } from './store/actions/action';

function News({ allNews, location, next,upVote,hideNews }) {
  const url = (url) => {
    if (url)
      return '(' + formatURL(url) + ')';
    else
      return;
  }
  const changeVote = (clickId, points) => {
    console.log(points);
    points = parseInt(points);
    const idsArray = JSON.parse(localStorage.getItem("upvote") || "[]");
    console.log(idsArray);
    let flag = false;
    if (idsArray.length != 0 ) {
        idsArray.forEach((ob,i) => {
            if (ob.id == clickId){
                idsArray.splice(i,1);
                idsArray.push({id:clickId,points:points+1});
                flag=true;
            }
        })
        if(!flag){
            idsArray.push({id:clickId,points:points+1});
        }
    }
    else {
        idsArray.push({id:clickId,points:points+1});
    }
    window.localStorage.setItem('upvote', JSON.stringify(idsArray));
    upVote();
}
const hideHandler=(id)=>{
  const ids = window.localStorage.getItem('hidden');
  if(ids)
      window.localStorage.setItem('hidden',[ids,id]);
  else
      window.localStorage.setItem('hidden',[id]);
  hideNews(window.localStorage.getItem('hidden'));
}
  const query = new URLSearchParams(location.search);
  const page = query.get('page');
  let apiUrl;
  if(page == 0){
    apiUrl = `https://hn.algolia.com/api/v1/search?tags=front_page`;
  }
  else{
    apiUrl = `https://hn.algolia.com/api/v1/search?page=${page}`;
  }
  useEffect(() => {
    fetch(apiUrl).then(res => res.json())
      .then(res => {
        console.log(res);
        next(res);
        if(window.localStorage.getItem('hidden')) {
          console.log("event dispatched");
          hideNews(window.localStorage.getItem('hidden'));
        }
        if(window.localStorage.getItem('upvote')){
            console.log("upvote called");
            upVote();
        }
      })
      .catch(error => {
        throw error;
      });
  }, [page])
  return (
    <>
      <Table>
        <TableRow>
          <TableHead>
            Comments
          </TableHead>
          <TableHead>
            Vote Count
          </TableHead>
          <TableHead>
            UpVote
          </TableHead>
          <TableHead>
            News Details
          </TableHead>
        </TableRow>

        {allNews.map(news => (<TableRow key={news.objectID}>
          <TableData>{news.num_comments ? news.num_comments : '-'}</TableData>
          <TableData>{news.points ? news.points : '-'}</TableData>
          <TableData><FontAwesomeIcon icon={faSortUp} onClick={()=>changeVote(news.objectID,news.points)}/></TableData>
          <TableData>{news.title ? news.title : '-'} <Url>{url(news.url)} by</Url>  <Author>{news.author}</Author> <Time>{formatDateTime(news.created_at_i)} ago</Time><span onClick={()=>hideHandler(news.objectID)}>[Hide]</span></TableData>
        </TableRow>))}
      </Table>
    </>
  )
}
function mapStateToProps(state) {
  // console.log("State",state);
  return {
    allNews: state.hits,
    page: state.page
  };
}
const mapDispatchToProps = (dispatch) => ({
  // dispatching plain actions
  next: (res) => fetchNextNews(dispatch, res),
  upVote: () => fetchVote(dispatch),
  hideNews:(ids) => hideNewsRow(dispatch,ids)
});
export const NewsComponent = connect(mapStateToProps, mapDispatchToProps)(News);
