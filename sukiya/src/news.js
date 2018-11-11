import React from 'react'
import ReactDOM from 'react-dom'

export class News extends React.Component {
    render() {
        return (
            <div className="news_bg hide">
                <div className="news_container">
                    <div className="news_slogan"><h2>最新消息</h2></div>
                    <div className="news_list">
                        <div className="news_line">
                            <span className="news_line_newsType">新品上市</span>
                            <p className="news_line_title">5/12到5/19 母親節特別活動</p>
                            <p className="news_line_time">2018/05/12</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}