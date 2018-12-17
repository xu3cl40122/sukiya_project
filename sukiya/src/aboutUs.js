import React from 'react'

export class AboutUs extends React.Component{
    render(){
        return(
            <div className='about'>
                <div className='title'>
                    <div className='title_row'>
                        <h2>About</h2>
                        <h3>關於我們</h3>
                    </div>
                </div>
                <div className='main'>
                    <div className='main_wrapper'>
                        <div className='main_logo'></div>
                        <div className='main_logo_2'></div>
                    </div>
                    <div className='main_intro'>
                        <h2>SUKIYA 日本人氣牛丼</h2>
                        <h3>牛丼御三家之首</h3>
                        <p>為源自日本的跨國日式快餐連鎖店品牌，隸屬於日本連鎖餐廳企業善商控股旗下，主力產品為丼物及日式咖哩飯。截至2017年12月13日統計，在日本擁有約2千家店鋪，在中國大陸擁有195家店鋪，在台灣則有30店舖。</p>
                        <p>抱持著對品質、服務、清潔的執著不斷地改進，使顧客們不管到任何一家 SUKIYA 的分店，都能感受到一致美味的食物、親切的服務、乾淨的用餐環境與有系統的管理。</p>
                    </div>                
                </div>
            </div>
        )
    }
}