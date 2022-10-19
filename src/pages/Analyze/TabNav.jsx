import React, { Component } from 'react'

export class TabNav extends Component {
    render() {
        return (
            <>
                <div className="nav-scroller bg-white shadow-sm">
                    <nav className="nav nav-underline" style={{justifyContent:"center",color:"black"}}>
                        {
                            this.props.tabs.map ( (tab, i) => {
                                const active = (tab === this.props.selected ? 'active' : '' );

                                return (
                                    <button key={i} className="rounded-md hover:bg-gray-200 font-medium pr-5 pl-5">
                                        <a key={ tab } className={"nav-link " + active} onClick={ () => {this.props.setSelected(tab); return false;}}>
                                            { tab }
                                        </a>
                                    </button>
                                );
                            })

                        }
                    </nav>
                </div>
                { this.props.children }
            </>
        )
    }
}

export default TabNav
