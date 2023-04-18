import './App.css';
import MainView from './views/MainView';
import OverView from './views/OverView';
import TikTacToe from './views/TikTacToeView';
import AWordaGami1 from './views/aWordaGami1';
import Zoom from 'react-reveal/Zoom';
import { useState } from 'react';

function App() {
  const [viewIDX, setViewIDX] = useState('aWORDaGAMi');

  
  function CLICKview (e) {
    setViewIDX(e.target.innerText);
  }

  return (
    <div className="App" style={{display:'flex',flexDirection:'column',backgroundColor: 'black',minHeight: '77vh',maxWidth:'55em',margin:'0 auto'}}>
      <header className="App-header" style={{borderRadius:'13px'}}>
      <Zoom>{viewIDX}</Zoom>
      </header>
      <main style={{backgroundColor: 'rgb(22 35 62)', color:'skyblue',color:'skyblue',paddingTop:'1.5em',
        borderRadius:'13px',margin:'1em',height:'42em'}}>

      {         
        (() => { //SIMPLE-DYNAMIC-VIEW-DISPLAY: (design~innovation) // Routing - nah!
          if (viewIDX === "aWORDaGAMi") {
              return <AWordaGami1/>;
          } else if (viewIDX === "TikTacToe") {
            return <TikTacToe /> ;
          } else if (viewIDX === "more") {
            return <OverView/> ;
          } else {
            return <MainView /> ;
          }
        })()
      }
      </main>
      <nav style={{marginTop:'1em'}}>
        <button style={{borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px purple'}}
           onClick={CLICKview}>MAIN</button>
        <button style={{borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px lime'}}
           onClick={CLICKview}>aWORDaGAMi</button>
        <button style={{borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px yellow'}}
           onClick={CLICKview}>TikTacToe</button>
        <button style={{borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px orange'}}
           onClick={CLICKview}>more</button>
      </nav>
      <section style={{color:'steelblue',fontSize:'0.666em',marginTop:'2em'}}>
        work in progress by spazefalcon &copy; 2023
      </section>      
    </div>
  );
}

export default App;
