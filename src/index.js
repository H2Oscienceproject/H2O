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
          <button title="Add Hydrogen" 
                  onClick={() => this.add(true)}><img src="h.svg" alt="h"/></button>
          <button title="Check what you can get"
                  onClick={() => this.check()}><img src="tick.svg" alt="tick"/></button>
          <button title="Add Oxygen"
                  onClick={() => this.add(false)}><img src="o.svg" alt="o"/></button>
        </div>
      );
    }
  }

  class Result extends React.Component {
    render() {
      return (
        <label>{this.props.value}</label>
      )
    }
  }
  
  class Game extends React.Component {
    constructor() {
      super();
      this.state = {
        hs: 0,
        os: 0,
        result: ""
      }
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
      var subrender = (hc, oc) => {
        var r = [];
        if(hc>0) r.push("H");
        if(hc>1) r.push(<sub>{hc}</sub>);        
        if(oc>0) r.push("O");
        if(oc>1) r.push(<sub>{oc}</sub>);
        return <code>Well done! You get a {r} molecule!</code>;
      }
      var setResult = (result) => {
        console.log(result);
        that.setState({hs:0, os:0, result:result});
      }
      let hs = that.state.hs;
      let os = that.state.os;
      if (hs===2 && os===0){
        setResult(subrender(hs,os));
      } else if (hs===0 && os===2) {
        setResult(subrender(hs,os));
      } else if (hs===0 && os===3) {
        setResult(subrender(hs,os));
      } else if (hs===2 && os===1) {
        setResult(subrender(hs,os));
      } else if (hs===2 && os===2) {
        setResult(subrender(hs,os));
      } else {
        setResult(<code>Failed! You didn't make any molecule!</code>)
      }
    }
    render() {
      return (
        <div>
        <InfoBar increase={ (horo) => this.increase(this, horo) } 
                 check={ () => this.check(this) } />
        <div className="game">
          <div className="game-board">
            <Board value={this.state.hs} type="h" />
          </div>
          <div className="mix">
            <Result value={this.state.result}/>
          </div>
          <div className="game-board">
            <Board value={this.state.os} type="o" />
          </div>
        </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  