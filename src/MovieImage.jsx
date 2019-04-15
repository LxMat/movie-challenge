import React, { Component } from 'react';
const FLICKR_APIKEY = process.env.REACT_APP_FLICKR;

export class MovieImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  componentDidMount() {
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+FLICKR_APIKEY+'&text='+this.props.searchText+'&sort=relevance&format=json&nojsoncallback=1')
    .then(response => response.json())
    .then(data => this.setState({ data }));
  }
  render() {
    const { data } = this.state;
    var imginfo = null;
    var imgsrc = null;
    if (data !== imginfo) {
      imginfo = data["photos"]["photo"][0];
      imgsrc = 'https://farm' + imginfo["farm"] + '.staticflickr.com/' + imginfo["server"] + '/' + imginfo["id"] + '_' + imginfo["secret"] + '.jpg/>';
    }
    var img = imginfo != null ? <img src={imgsrc} alt='' /> : "loading";
    return (img);
  }
}
