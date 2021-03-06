import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Atom extends React.Component {
  render() {
    if (this.props.value) {
      return (<button className="square"></button>);
    } else {
      var filename = this.props.type;
      var src = filename + '.svg';
      var alt = filename;
      return (
        <button className="square"><img className="square" src={ src } alt={ alt }/></button>
      );
    }
  }
}
class Achievements extends React.Component {
  render() {
    var achievements = this.props.value.achievements;
    var r = [];
    for(var i=0; i<achievements.length; ++i) {
      r.push(<p class="achievements">{
        achievements[i]
      } Achievement Unlocked</p>)
    }
    return r;
  }
}

class Board extends React.Component {
  renderAtom(horo,type) {
    return <Atom value={horo} type={type}/>;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderAtom(this.props.value<1, this.props.type)}
        </div>
        <div className="board-row">
          {this.renderAtom(this.props.value<2, this.props.type)}
        </div>
        <div className="board-row">
          {this.renderAtom(this.props.value<3, this.props.type)}
        </div>
        <div className="board-row">
          {this.renderAtom(this.props.value<4, this.props.type)}
        </div>
      </div>
    );
  }
}

class InfoBar extends React.Component {
  constructor() {
    super();
    this.state = {
      henabled: true,
      oenabled: true
    }
  }
  add(horo) {
    if (typeof this.props.increase === 'function') {
      this.props.increase(horo);
    } else {
      console.log("increase is not a function");
    }
  }
  check() {
    if (typeof this.props.check === 'function') {
      this.props.check();
    } else {
      console.log("increase is not a function");
    }
  }
  render(){
    return (
      <div className="infobar">
        <button title="Add Hydrogen Atom" 
                onClick={() => this.add(true)}><img src="h.svg" alt="h"/></button>
        <button title="Check what molecule you can get"
                onClick={() => this.check()}><img src="tick.svg" alt="tick"/></button>
        <button title="Add Oxygen Atom"
                onClick={() => this.add(false)}><img src="o.svg" alt="o"/></button>
      </div>
    );
  }
}

class Result extends React.Component {
  render() {
    var r = [        
      <label>{this.props.value.result}</label>        
    ];
    let hs = this.props.value.hs;
    let os = this.props.value.os;
    r.push(<br/>);
    r.push(<a href={this.props.value.url}>{this.props.value.name}</a>);
    let molecule = this.props.value.molecule;
    let name = this.props.value.name;
    if (molecule==="H2O"){
      r.push(<br/>);
      r.push(<img src="h2o.png" alt={name}/>);
    } else if (molecule==="H2O2") {
      r.push(<br/>);
      r.push(<img src="h2o2.png" alt={name}/>);
    } else if (molecule==="O3") {
      r.push(<br/>);
      r.push(<img src="o3.jpg" alt={name}/>);
    } else if (molecule==="O2") {
      r.push(<br/>);
      r.push(<img src="o2.jpg" alt={name}/>);
    } else if (molecule==="H2") {
      r.push(<br/>);
      r.push(<img src="h2.jpg" alt={name}/>);
    }
    return r;
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      hs: 0,
      os: 0,
      result: "",
      molecule: "",
      achievements: []
    };
  }
  increase(that,horo) {
    if(horo) {
      if (that.state.hs<4) {
        that.setState({hs: that.state.hs+1, os:that.state.os});
      }
    } else {
      if (that.state.os<4) {
        that.setState({hs: that.state.hs, os:that.state.os+1});
      }
    }
  }
  check(that) {
    var success = (hc, oc) => {
      var r = [];
      if(hc>0) r.push("H");
      if(hc>1) r.push(<sub>{hc}</sub>);        
      if(oc>0) r.push("O");
      if(oc>1) r.push(<sub>{oc}</sub>);
      return <code>Well done! You get a {r} molecule!</code>;
    }
    var setResult = (result,molecule,name,url) => {
      console.log(result);
      var achievements = that.state.achievements;
      if (typeof molecule !== "undefined" && !achievements.includes(molecule)) {
        achievements.push(molecule);
      }
      that.setState({
        hs:0, 
        os:0, 
        result:result, 
        molecule:molecule,
        name:name,
        url:url,
        achievements:that.state.achievements
      });
    }
    let hs = that.state.hs;
    let os = that.state.os;
    if (hs===2 && os===0){
      setResult(success(hs,os),"H2","Hydrogen gas","https://en.wikipedia.org/wiki/Hydrogen_gas");
    } else if (hs===0 && os===2) {
      setResult(success(hs,os),"O2","Oxygen gas","https://en.wikipedia.org/wiki/Oxygen_gas");
    } else if (hs===0 && os===3) {
      setResult(success(hs,os),"O3","Ozone gas","https://en.wikipedia.org/wiki/Ozone");
    } else if (hs===2 && os===1) {
      setResult(success(hs,os),"H2O","Water","https://en.wikipedia.org/wiki/Water");
    } else if (hs===2 && os===2) {
      setResult(success(hs,os),"H2O2","Dioxidane","https://en.wikipedia.org/wiki/Dioxidane");
    } else {
      setResult(<code>You Lost! Better luck next time!</code>)
    }
  }
  render() {
    return (
      <div>
      <InfoBar increase={ (horo) => this.increase(this, horo) } 
                check={ () => this.check(this) } />
      <div className="game">
        <div className="game-board">
          <Board key="h" value={this.state.hs} type="h" />
        </div>
        <div className="mix">
          <Result key="r" value={this.state}/>
        </div>
        <div className="game-board">
          <Board key="o" value={this.state.os} type="o" />
        </div>
      </div>
      <Achievements key="a" value={this.state} />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  