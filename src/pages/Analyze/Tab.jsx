import React, { Component } from 'react'

export class Tab extends Component {
    render() {
        if(this.props.isSelected){
            return (
                <>
                    {this.props.children}
                </>
            );
        }

        return null;
    }
}

export default Tab;
