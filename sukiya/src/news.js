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
                            <span className="news_line_title">SUKIYA 祝大家聖誕節快樂!! 推出聖誕特別套餐</span>
                            <span className="news_line_time">18/12/13</span>
                        </div>
                        <div className="news_line">
                            <span className="news_line_newsType">特別活動</span>
                            <span className="news_line_title">5/12到5/19 歡慶母親節特別活動</span>
                            <span className="news_line_time">18/05/12</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}