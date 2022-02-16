import './App.css';
import UserInput from "./bungo";

const bungo_link = 'https://www.bungie.net/en/OAuth/Authorize?client_id=39340&response_type=code&state=3g5h2hbvndb08'

function App() {
  return (
    <div className="App">
      <UserInput/>
    </div>
  );
}

export default App;
