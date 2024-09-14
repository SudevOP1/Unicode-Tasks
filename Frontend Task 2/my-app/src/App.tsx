import Button from "./components/Button";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);
  return (
    <div>
      { alertVisible && <Alert onClose={() => setAlertVisibility(false)}>Button was clicked!</Alert> }
      <Button color="primary" onClick={() => setAlertVisibility(true)}>I am primary</Button>
    </div>
  );
}

export default App;
