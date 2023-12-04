import React from 'react';
import './App.css';

let cleanUpTimeout = null;

function App() {
  const [usernames, setUsernames] = React.useState([])
  const [userData, setUserData] = React.useState([])

  React.useEffect(() => {
    if (usernames.length !== 0) {
      const requests = usernames.map(username => 
        fetch(`https://api.github.com/users/${username}`));
      Promise.allSettled(requests)
        .then(response => Promise.all(response.map(response => response.value.json())))
        .then(data => data.filter(user => user.name))
        .then(data => setUserData(data))
    }
  }, [usernames])

  console.log(userData)

  const handleOnChange = (event) => {
    clearTimeout(cleanUpTimeout)
    cleanUpTimeout = setTimeout(() => {
      const usernamesArray = event.target.value
        .split(',')
        .map(string => string.trim())
      setUsernames(usernamesArray)
    }, 500);
  };

  return (
    <div>
      <form>
        <label>Enter Github Usernames: </label>
        <input type="text" onChange={handleOnChange}></input>
      </form>
      <div>
        {userData.map((user) => <div>
          <div><a href={`${user.url}`}>{user.name}</a></div>
          <img alt={`logo-${user.name}`} src={`${user.avatar_url}`}></img>
          </div>)}
      </div>
    </div>
  );
}

export default App;
