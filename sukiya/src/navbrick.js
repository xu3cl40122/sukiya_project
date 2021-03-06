import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
export class Navbrick extends React.Component {
    render() {
        return (
            <div className="navBrick_row">
                <div className="navBrick_col navBrick_col_buy">
                    <div>
                        <h2>線上訂餐</h2>
                        <Link to='/products/bowl' className='link'>
                            <div className="button navBrick_col_button">GO</div>
                        </ Link>
                    </div>
                </div>
                <div className="navBrick_col navBrick_col_site">
                    <div>
                        <h2>門市據點</h2>
                        <Link to='/map' className='link'>
                            <div className="button navBrick_col_button">GO</div>
                        </ Link>
                    </div>
                </div>
                <div className="navBrick_col navBrick_col_about">
                    <div>
                        <h2>關於我們</h2>
                        <Link to='/about' className='link'>
                            <div className="button navBrick_col_button">GO</div>
                        </ Link>
                    </div>
                </div>
            </div>
        )
    }
}