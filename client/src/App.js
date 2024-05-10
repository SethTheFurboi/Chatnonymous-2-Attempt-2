
import socketIO from "socket.io-client"

import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const socket = socketIO.connect("http://localhost:4000")
function App() {
  return (
    <ApolloProvider>
        <div>
          <Outlet socket={socket}/>
    </div>
    </ApolloProvider>
    
  );
}

export default App;
