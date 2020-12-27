import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';  // YTSearch package is basically like a function that takes argument (an object (search-term)
//and the API key )
import SearchBar from './Components/search_bar'; 
import VideoList from './Components/video_list';
import VideoDetail from './Components/video_details';
import _, { debounce } from 'lodash' 
const API_KEY= 'Enter your YouTube-Data API'; //YouTube Data API helps to make request to Youtube

class App extends Component{  //class based component

constructor(props){
super(props);

this.state ={videos:[],
selectedVideo : null

};
this.videoSearch('Tesla Model Y');
//an empty array
}

videoSearch(term){
YTSearch({key:API_KEY,term : term}, (videos)=> {   
  this.setState({videos,
  selectedVideo:videos[0]        
  });   
});

}

render(){

const videoSearch = _.debounce((term) =>{this.videoSearch(term)},300)
return (
  <div>
  <SearchBar  onSearchTermChange ={videoSearch} />

  <VideoList 
    onVideoSelect ={(selectedVideo) => this.setState({selectedVideo})} 
    videos = {this.state.videos}
    />      

  <VideoDetail video = {this.state.selectedVideo}/>

  </div>
 );   
}


}

ReactDOM.render(<App/>,document.querySelector('.container'));