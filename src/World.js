import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './World.css'
import unicorn from './assets/themes/unicorn/circle.png';

class WorldsView extends React.Component {
    render() {
        return (
            <div className="worlds-view" >
                <WorldSelector />
            </div>
        );
    }
}

class WorldSelector extends React.Component {
    render() {
        return (
            <div className="world-selector" >
                <World id="unicorn" name="Unicorn World" />
            </div>
        );
    }
}


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
