import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import { NewsComponent } from './News';
import { HomeComponent } from './Home';
import { LinkWrapper, Horizontal } from './Style';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function App({ page, allNews }) {

  const data = [];

  allNews.forEach((news) => {
    if (news.points)
      data.push({ id: news.objectID, votes: news.points });
    else
      data.push({ id: news.objectID, votes: 0 });
  })

  return (

    <>

      <Switch>
        <Route path="/news" component={NewsComponent} />
        <Route path="/" component={HomeComponent} />
      </Switch>

      <LinkWrapper>
        {page != 0 ? <Link style={{ color: '#FF6600', textDecoration: 'none', marginRight: '5px' }} to={`/news?page=${page - 1}`}> Previous </Link> : null}
        {(page > 0 && page < 50) ? <span>|</span> : null}
        {page != 50 ? <Link style={{ color: '#FF6600', textDecoration: 'none', marginLeft: '5px' }} to={`/news?page=${page + 1}`}> Next </Link> : null}
      </LinkWrapper>

      <Horizontal />

      <ResponsiveContainer width="95%" height={200}>
        <LineChart
          data={data}
          margin={{
            top: 5, right: 12, left: 20, bottom: 45,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" label={{ value: "ID", fontWeight: "bold", fontSize: 20 }} angle={-90} interval={0} tickMargin={28} />
          <YAxis dataKey="votes" label={{ value: 'Votes', angle: -90, position: 'insideLeft', fontWeight: "bold", fontSize: 20 }} />
          <Tooltip />
          <Line type="linear" dataKey="votes" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>

      <Horizontal />
    </>

  )
}

function mapStateToProps(state) {
  return {
    allNews: state.hits,
    page: state.page
  };
}


export default connect(mapStateToProps)(App);


