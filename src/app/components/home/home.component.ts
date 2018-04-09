import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos:any [] = [];
  videoSel:any;

  constructor(
    private yServ: YoutubeService
  ) {
    this.yServ.getVideos().subscribe(
      videos => {
        this.videos = videos;
        console.log(this.videos)
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit() {
  }

  verVideo(video){
    this.videoSel = video;
    $(".modal").modal();
  }

  cerrarVideo(){
    this.videoSel = null;
    $(".modal").modal('hide');
  }

  cargarMas(){
    this.yServ.getVideos().subscribe(
      videos => {
      this.videos.push.apply(this.videos, videos);
      },
      error => {
        console.error(error);
      }
    );
  }
}
