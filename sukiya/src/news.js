import React from 'react'
import ReactDOM from 'react-dom'

export class News extends React.Component {
    render() {
        return (
            <div className="news_bg">
                <div className="news_container">
                    <div className="news_slogan"><h2>最新消息</h2></div>
                    <div className="news_list" onClick={() => { alert('功能開發中 敬請期待~~') }} >
                        <div className="news_line">
                            <span className="news_line_newsType">特別活動</span>
                            <p className="news_line_title">SUKIYA 祝大家聖誕節快樂</p>
                            <p className="news_line_time">2018/12/13</p>
                        </div>
                        <div className="news_line">
                            <span className="news_line_newsType">特別活動</span>
                            <p className="news_line_title">5/12到5/19 歡慶母親節特別活動</p>
                            <p className="news_line_time">2018/05/12</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}