import Navbar from '../../Navbar/Pages/RecruiterNav'
// import AppliedJobs from '../USER/Pages/Applied Jobs/AppliedJobs';
import { useState } from 'react';
import Home from './Home'
import AppliedCandidate from './AppliedCandidate';
import History from './History';
import Test from './test';
import RecommendedCandidates from './RecommendedCandidate';

export default function Recurter(){
  const [active, setActive] = useState(1);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Home />;
      case 2:
        return <History />;
      case 3:
        return <AppliedCandidate />;
      // case 4:
      //   return <Test />
      default:
        return <Home />;
    }
  };
    return(
        <div>
            <Navbar active={active} setActive={setActive}/>
            <main>{displayData()}</main>
        </div>
    );
}