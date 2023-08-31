import React, { Component } from 'react'
import NewsItem from './Newsitem'

export class News extends Component {
    articles = [
        {
          "source": {
            "id": "news-com-au",
            "name": "News.com.au"
          },
          "author": null,
          "title": "‘Very much alive’: Death rumour rocks cricket",
          "description": "Zimbabwean cricket legend Heath Streak has said is &ldquo;hurt&rdquo; after a rumour of his death at the age of 49 spread around the internet.",
          "url": "https://www.news.com.au/sport/cricket/zimbabwean-cricket-legend-heath-streak-very-much-alive-after-death-rumour/news-story/8172447c8800531a9186802fa665d0d4",
          "urlToImage": "https://content.api.news/v3/images/bin/4a67edcc39f59dbebd26eebda92e33b0",
          "publishedAt": "2023-08-23T07:44:00Z",
          "content": "Zimbabwean cricket legend Heath Streak has said is “hurt” after a rumour of his death at the age of 49 spread around the internet.\r\nFans and former teammates of Streak took to social media to mourn t… [+3012 chars]"
        },
        {
          "source": {
            "id": "espn-cric-info",
            "name": "ESPN Cric Info"
          },
          "author": null,
          "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
          "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
          "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
          "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
          "publishedAt": "2020-04-27T11:41:47Z",
          "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
          "source": {
            "id": "espn-cric-info",
            "name": "ESPN Cric Info"
          },
          "author": null,
          "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
          "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
          "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
          "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
          "publishedAt": "2020-03-30T15:26:05Z",
          "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
      ]
    constructor(){
        super();
        console.log("Hello i am a Constructor from news component");
        this.state={
            articles:this.articles,
            loading:false
        }
    }

    async componentDidMount(){
        console.log("cdm");
        let url ='https://newsapi.org/v2/everything?q=apple&from=2023-08-23&to=2023-08-23&sortBy=popularity&apiKey=f5def16f4b2d4c18bec095cf4e44a8c7&page=1&pageSize=2${this.props.pageSize}';
        let data = await fetch(url);
        let parsedData=await data.json()
        console.log(parsedData);
        this.setState({articles:parsedData.articles})
    }

   handlePrevClick = async()=>{
        console.log("Hello Prev");
        let url =`https://newsapi.org/v2/everything?q=apple&from=2023-08-23&to=2023-08-23&sortBy=popularity&apiKey=f5def16f4b2d4c18bec095cf4e44a8c7&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData=await data.json()
        console.log(parsedData);
        this.setState({
          page :this.state.page - 1,
          articles:parsedData.articles
        })
    }

     handleNextClick = async ()=>{
        console.log("Hello Next");

        let url =`https://newsapi.org/v2/everything?q=apple&from=2023-08-23&to=2023-08-23&sortBy=popularity&apiKey=f5def16f4b2d4c18bec095cf4e44a8c7&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData=await data.json()
        console.log(parsedData);
        this.setState({
          page :this.state.page + 1,
          articles:parsedData.articles
        })
    }

     
  render() {
    return (
        <>
      <div className='container my-3'>
      <h2>NewsBuzz-Top Headlines</h2>
      <div className="row">
          {this.state.articles.map((element)=>{
               return  <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} newsurl={element.url}></NewsItem>
              </div>
              
          })}   
             
      </div>
      <div className="container d-flex justify-content-between">
        <button disabled ={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
      </div>
      </>
    )
  }
}

export default News