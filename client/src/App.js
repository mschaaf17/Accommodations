import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home/'
import Accommodations  from './pages/Accommodations/';
import BreakTimer from './pages/BreakTimer'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import StudentGraph from './pages/StudentViewableGraphs'
import TeacherDataTracking from './pages/TeacherDataTracking'
import StudentProfile from './pages/StudentProfile'
import DataLogging from './pages/DataLogging'
import StudentCharts from './pages/StudentCharts'
import NoMatch from './pages/NoMatch';


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const httpLink = createHttpLink({
  uri: '/graphql',
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


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
          <Route path ="/breakTimer" element ={<BreakTimer/>} />
          <Route path ="/data" element = {<StudentGraph/>}/>
          <Route path = "/teacherdata" element = {<TeacherDataTracking/>}/>
          <Route path ="/studentProfile:username" element={<StudentProfile/>}/>
            {/* <Route path =":username" element ={<StudentProfile/>}/>
            <Route path ="" element={<StudentProfile />} /> */}
            {/* <Route path ="dataLogging" element={<DataLogging/>}/> */}

            {/* </Route> */}
            <Route path ="/studentProfile:username/dataLogging"element ={<DataLogging/>}/>
            {/* <Route path = "/studentProfile/:username" element ={<DataLogging/>} /> */}
            {/* <Route path =":username" element ={<DataLogging />}/> */}
            {/* <Route path ="dataLogging" element={<DataLogging/>}/> */}
            {/* </Route>  */}
         
          <Route path ="/studentCharts" element ={<StudentCharts/>}/>
          <Route path="*" element={<NoMatch />} />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
