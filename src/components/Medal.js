import React, {Component} from 'react';

const typeMap = {
    'G':'Gold',
    'S':'Silver',
    'B':'Bronze'
};

export default class Modal extends Component {
    
    render(){
        const {type, year, city, event, category} = this.props;
        return (
            <li className='modal'>
                <span className={`symbol symbol-${type}`} title={typeMap[type]}>{type}</span>
                <span className="year">{year}</span>
                <span className="city"> {city}</span>
                <span className="event"> ({event})</span>
                <span className="category"> {category}</span>
            </li>
        )
    }
}