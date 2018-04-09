import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class YoutubeService {

  url:string = "https://www.googleapis.com/youtube/v3/";
  apiKey:string = "AIzaSyAwL8VdiCo6sMeA2TcjQou6dMj658JbFqU";
  list:string = "UUuaPTYj15JSkETGnEseaFFg";
  nextToken:string = "";

  constructor(
    private http:Http
  ) { }

  getVideos(){
    let url = `${this.url}playlistItems`;
    let params = new URLSearchParams();
    params.set('part', 'snippet');
    params.set('playlistId', this.list);
    params.set('maxResults', '10');
    params.set('key', this.apiKey);
    if(this.nextToken)
      params.set('pageToken', this.nextToken);

    return this.http.get(url, { search: params})
      .map(
        res => {
          console.log(res.json());
          this.nextToken = res.json().nextPageToken;
          let videos:any[]=[];
          for(let video of res.json().items){
            videos.push(video.snippet);
          }

          return videos;
        }
      );
  }
}
