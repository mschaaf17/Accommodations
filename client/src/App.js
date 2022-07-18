import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home/'
import Accommodations  from './pages/Accommodations/';
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'

const httpLink = createHttpLink({
  uri: '/graphql',
})
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})


function App() {
  return (
    <ApolloProvider client = {client}>
      <Router>
        <Header />
        <Routes>
          <Route path ="/" element = {<Home/>} />
          <Route path ="/login" element = {<Login/>} />
          <Route path ="/signup" element = {<Signup/>} />
          <Route path ="/accommodations" element = {<Accommodations/>} />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
