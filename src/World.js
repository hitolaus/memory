import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './World.css'
import unicorn from './assets/themes/unicorn/circle.png';
import flower1 from './assets/themes/unicorn/flower1.png';
import flower2 from './assets/themes/unicorn/flower2.png';

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
                <img className="elem1" src={flower1} alt="" />
                <img className="elem2" src={flower2} alt="" />
            </div>
        </button>
    );
}

export default WorldsView;
