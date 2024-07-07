import { Appbar } from "../components/appComponents/AppBar";
import { Balance } from "../components/appComponents/Balance";
import { Users } from "../components/appComponents/Users";

function Dashboard() {
  return (
    <div className="p-2">
      <Appbar />
      <Balance />
      <Users />
    </div>
  );
}

export default Dashboard;
