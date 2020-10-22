import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './World.css'
import unicorn from './assets/themes/unicorn/circle.png';

class WorldsView extends React.Component {
    render() {
        return (
            <div className="WorldsView" >
                <WorldSelector />
            </div>
        );
    }
}

class WorldSelector extends React.Component {
    render() {
        return (
            <div className="WorldSelector" >
                <World id="unicorn" name="Unicorn World" />
            </div>
        );
    }
}

/*
class World extends React.Component {
    

    navigate(id) {
        this.setState({transition: true})
        setTimeout(() => this.props.history.push(`/${id}`), 2000);
    }

    render () {
        return (
            <button className={`world ${this.state.transition ? 'transition' : ''}`} 
                    onClick={() => this.navigate(this.props.id)}>
                <div className="name">{this.props.name}</div>
                <div className="circle">
                    <img src={unicorn} alt="" />
                </div>
            </button>
        );
    }
}
*/

function World(props) {
    const history = useHistory();
    const [transition, setTransition] = useState('');

    function navigate(id) {
        setTransition(true);
        setTimeout(() => history.push(`/${id}`), 1000);
    }

    return (
        <button className={`world ${transition ? 'transition' : ''}`} 
                onClick={() => navigate(props.id)}>
            <div className="name">{props.name}</div>
            <div className="circle">
                <img src={unicorn} alt="" />
            </div>
        </button>
    );
}

export default WorldsView;
