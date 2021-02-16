'use strict';

var arrayImages = [];
var keywordArray = [];
function Images(title, image_url, description, horns, keyword){
    this.title=title;
    this.image_url=image_url;
    this.description=description;
    this.horns=horns;
    this.keyword=keyword;
    arrayImages.push(this);
}

Images.prototype.render = function(){
    let temp = $('#template-2').html();
    return Mustache.render(temp, this);
}

Images.readJson = () => {
    const ajaxSettings ={
      method: 'get',
      dataType: 'json'
    };
    $.ajax('data/page-2.json', ajaxSettings)
    .then(data => {
      data.forEach(element => {
        keywordArray.push(element.keyword);
        let image = new Images(element.title, element.image_url,element.description, element.horns,element.keyword );
        image.renderImages();
      });
    });
};

$( document ).ready(function() {
    Images.readJson();
  });