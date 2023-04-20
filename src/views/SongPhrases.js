import Zoom from 'react-reveal/Zoom';

// import NeuralNet from './NeuralNet'
import LangData from '../data/SocialPhraseCLM'
import TokenGrid2 from './TokenGrid2';
// import TallySound from '../sonic/nxTally0d.mp3'
import { useState,useEffect } from 'react';


//ai DESIGN PATTERNS:
//1 influence many data types.
//2 ALGORITHM - add METADATA to DATA and load STATE(MACHINE).
//3 FALSE answer replacment.
//4 STYLE as METADATA because STYLE represents STATE.
//5 MASK the data from the human...
//6 USER INPUT check TXT ANSWER vs STATE.
// import initSound from './sonic/nxSonar1d.mp3'
export default function SongPhrases(){ //first letter needs to be capital to have class.

    //:ai: 1 MANY DIFFERENT DATA TYPES to influence. In this case: TXT = 'text' data.  
    let [gameIDX, setGameIDX] = useState(0);
    let [rightCOUNT, setRightCOUNT] = useState(0);
    let [wrongCOUNT, setWrongCOUNT] = useState(0);
    let [solutionARR, setSolutionARR] = useState([]);
    let [aPhraseTXT, setPhraseTXT] = useState("");
    let [cursorIDX, setCursorIDX] = useState(0);
    
    let [stemsARR, setStemsARR] = useState([]);
    let [rootsARR, setRootsARR] = useState([]);
    let [showResults, setShowResults] = useState(false);
    let [promptTXT, setPromptTXT] = useState('');

    useEffect(() => {
        var initSOUND = new Audio("./sonic/nxSonar1d.mp3");
        initSOUND.play();
      },[]);

    function getStemsView(){
        function btnClick ( e ) {  console.log(e.target.innerText);    }
        return stemsARR.map( (arr,i)=> {
            return <button onClick={btnClick} style={promptStyle} className={ getPromptBtnCLASSName(arr) }  >
                {arr.join(' ')}
            </button>
        });
    }

    function getTokenGridView(){
        function btnClick ( e ) {  console.log(e.target.innerText);    }
        return rootsARR.map( (token,i)=> {
            return <button onClick={btnClick} style={promptStyle} className={ getPromptBtnCLASSName(token) }  >
                {/* BUILD TOKEN GRID: {arr} */
                
                      
                
                
                
                
                
                
                }



            </button>
        });
    }


    function getRootsView(){
        function btnClick ( e ) {  console.log(e.target.innerText);    }
        return rootsARR.map( (txt,i)=> {
            return <button onClick={btnClick} style={promptStyle} className={ getPromptBtnCLASSName(txt) }  >
                {txt}
            </button>
        });
    }

    //:ai: 4: STYLE as METADATA - STYLE represents STATE.
    function getPromptBtnCLASSName (txt,idx) {
        if(solutionARR[idx] && solutionARR[idx] === txt){ return 'promptSELECTED';  }
    }

    let promptStyle = {
        background: '#6facf7', border: '1px solid #444', lineHeight: '34px', textAlign: 'center',
        margin: '0.5em', borderRadius: '13px', boxShadow: 'inset 1px 1px 5px 0px blue',
        cursor: 'pointer', fontFamily: 'fangsong', color: '#013434', textShadow: '-1px 0px 1px whitesmoke',
        userSelect:'none',fontSize:'large',fontFamily:'monospace',padding:'0 1em'     
    }

    let txtAnswerStyle = {
        background:'floralwhite',border:'1px solid #444',lineHeight:'34px',padding:'1em',textAlign:'center',
        height:'66px',margin:'0.5em',borderRadius:'13px',fontFamily:'fangsong',
        color:'#013434',textShadow:'-1px 0px 1px whitesmoke',userSelect:'none',cursor:'no-drop',
        boxShadow:'darkslategrey 0px 0px 8px 1px inset'// ,boxShadow:'red 0px 0px 8px 1px inset'// ,boxShadow:'lime 0px 0px 8px 1px inset'
    } 

    function generateTXTCLICK(){
        setShowResults(true);
        var nextSOUND = new Audio("./sonic/nxWoop1.mp3");
        nextSOUND.play();
        generateTXT1();
    }

    function generateTXT1(){ //:ai: - LEXICAL-TOKENIZER !!!
        let nn = LangData(); 
        console.log('GENERATING from', promptTXT);
        let lineOfTXTARR = promptTXT.split('\n');
        //AGENT - LAST WORD
        let lastLineTXT = lineOfTXTARR[lineOfTXTARR.length-1];
        let lastLineARR = lastLineTXT.split(' ');
        let lastWord = lastLineARR[lastLineARR.length-1];
        let promptSuffix = getSuffix1(lastWord);
        let tgtARR = [], tgtItemARR = [], tgtItemSET = [], tgtSTR = '', tgtSuffix = '';
        for(let i=0; i<nn.length;i++){
            tgtItemARR = nn[i].split(' ');
            tgtSTR = tgtItemARR[tgtItemARR.length-1];
            tgtSuffix = getSuffix1(tgtSTR);
            if(tgtSuffix===promptSuffix){ //console.log('MATCH',tgtSuffix, tgtSTR);
                tgtARR.push(tgtSTR);
                tgtItemSET.push(tgtItemARR);
            }
        }
        setRootsARR( tgtARR );
        setStemsARR( tgtItemSET );
    }

    //:ai: FUNCTIONAL-AGENCY. With arrays of functions.
    //RHYME_AGENT: alter RHYME-SCHEME "Attention" matrix
    // agent_SuffixARR = [getSuffix1, getSuffix2,...n]
    // let all_rhymes = agent_SuffixARR.map( (fn)=>{ fn() }); //Attention

    //:ai: FUNCTIONAL-AGENCY - how to Rhyme, across many rhyme types, and syllable.
    //PHRASE_AGENT: alter PHRASE-SCHEME "Attention" matrix
    // agent_GenerateTXTARR = [generateTXT1, generateTXT2,...n]
    // let all_phrases = agent_GenerateTXTARR.map( (fn)=>{ return fn(all_rhymes) });


/*:ai: FUNCTIONAL-AGENCY 
- "Behavior Factory": many fn's to build ARR.  
- "Attenion" sorts importance, each fn's weight.
- "Distant Weight", added later (forever) as...fns(). 
- "Tug" on sort order "importance". EXAMPLE: syllables.
*/

    function getSuffix1(tgt){ //:ai: TODO graduated difficulty *tion *sion *cion *zion *cean AGENT.
        return ( tgt.length > 4 ) ? tgt.slice(tgt.length-4,tgt.length) : tgt.slice(tgt.length-2,tgt.length);
    }

    return (
        <>
            <h1 style={{display:'flex',justifyContent:'center'}}>
                <Zoom>Lyric Generator &nbsp; {gameIDX}</Zoom></h1>
            <gameframe style={{display:'flex',alignItems:'flex-start',flexDirection:'column',
                borderTop:'2px solid purple',borderRadius:'13px',margin:'1em 3% 0px',padding:'2%'}}>
                <aside style={{width:'25%',paddingTop:'1em',width:'100%',paddingTop:'1em'}}>
                    <h2 style={{marginRight:'1em'}}>
                        your lyrics:</h2>
                <section style={{border:'1px solid skyblue',borderRadius:'8px',marginRight:'2%',
                        padding:'0.8em',overflowX:'hidden',overflowY:'auto',display:'flex',
                        boxShadow:'inset 0px 1px 8px 0px blue'}}>
                    <textarea name="TXTInput" cols="1" rows="4" spellcheck='false' placeholder='type text to generate rhymes'
                         onChange={(event)=>{ setPromptTXT(event.target.value)}} 
                        //  value='I cant get no satisfaction'
                            style={{boxShadow:'inset 0px 0px 8px 0px #1a0038',width:'100%',
                                borderRadius:'8px',padding:'1em',background:'#feecd6'}}></textarea>
                </section>
                <button style={{borderRadius:'8px',padding:'0.5em',background:'darkseagreen',marginTop:'1.3em',
                            boxShadow:'0px -1px 5px 1px gold', cursor:'pointer',userSelect:'none' }}
                            onClick={generateTXTCLICK}>GENERATE TXT</button>
            </aside>
                {
                   (showResults) ?
                    <aside style={{width:'90%',paddingTop:'1em',margin:'0 auto'}}>



                    <h2>token_grid:</h2>
                        <section style={{border:'1px solid steelblue',borderRadius:'8px',
                            display:'flex',flexDirection:'column',height:'100%',padding:'0.444em'}}>
                            <gameboard style={{borderBottom:'1px solid darkslategray',borderRadius:'8px',
                                display:'flex',flexDirection:'row',alignContent:'center',minHeight:'300px',
                                justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
                                {/* { getTokenGridView() } */}
                                { <TokenGrid2 langData = {{roots:rootsARR,stems:[]}}/> }
                            </gameboard>
                            <article style={{padding:'0.666em',color:'darkslategray'}}>
                                <aside style={{display:'flex',justifyContent:'space-around',color:'steelblue'
                                    ,fontFamily:'sans-serif'}}>
                                    <div style={{ color:'#197c19'}}>RHYME-STRENGTH: {stemsARR.length}</div>
                                    <div style={{ color:'#946218'}}>RHYME-TYPE: {rootsARR.length}</div>
                                    <div style={{ color:'steelblue'}}>count: {stemsARR.length + rootsARR.length} </div>
                                </aside>
                            </article>
                        </section>



                        <h2 style={{marginRight:'1em',marginTop:'1em'}}>
                            rhyme_roots:</h2>
                        <section style={{border:'1px solid skyblue',borderRadius:'8px',marginRight:'2%',
                            padding:'0.8em',overflowX:'hidden',overflowY:'auto',display:'flex',
                            overflowX:'scroll',marginBottom:'1.5em'}}>
                            { getRootsView() }
                        </section>

                        <h2>rhyme_stems:</h2>
                        <section style={{border:'1px solid steelblue',borderRadius:'8px',
                            display:'flex',flexDirection:'column',height:'100%',padding:'0.444em'}}>
                            <gameboard style={{borderBottom:'1px solid darkslategray',borderRadius:'8px',
                                display:'flex',flexDirection:'row',alignContent:'center',minHeight:'300px',
                                justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
                                { getStemsView() }
                            </gameboard>
                            <article style={{padding:'0.666em',color:'darkslategray'}}>
                                <aside style={{display:'flex',justifyContent:'space-around',color:'steelblue'
                                    ,fontFamily:'sans-serif'}}>
                                    <div style={{ color:'#197c19'}}>words: {stemsARR.length}</div>
                                    <div style={{ color:'#946218'}}>types: {rootsARR.length}</div>
                                    <div style={{ color:'steelblue'}}>count: {stemsARR.length + rootsARR.length} </div>
                                </aside>
                            </article>
                        </section>
...
                    </aside>
                    : ''
                }
            </gameframe>
            <footer style={{color:'darkcyan',fontSize:'small',paddingBottom:'1em',fontFamily:'sans-serif'}}>
                { 
                    <>type in lyrics and click GENERATE TXT, to see rhyme options. <br/>
                    then click ROOT or STEM, to update lyrics, generate again, or add more txt.</> 
                }
            </footer>
            <section style={{marginBottom:'2em'}}>
                Shows: NLP Text Generation, Agents, State and Language Model Training.
            </section>
        </>
    )
}