import App from './App';
import News from './News';

export default [
  {
    ...App,
    routes: [
      {
        ...News,
        path: '/:page',
      },
    ]
  }
];
