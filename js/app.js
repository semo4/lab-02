'use strict';

var optionValue=[];
var uniqueOptionValue = [];
var arrayImages = [];
function Images(title, image_url, description, horns, keyword){
    this.title=title;
    this.image_url=image_url;
    this.description=description;
    this.horns=horns;
    this.keyword=keyword;
    arrayImages.push(this);
    
  
}

Images.prototype.renderImages = function() {

    let sectionImage = $('.photo-template').clone();
    $('main').append(sectionImage)
    sectionImage.find('h2').text(this.title);
    sectionImage.find('img').attr("src",this.image_url);
    sectionImage.find('p').text(this.description);
    sectionImage.find('#num-of-horns').text(`# Of Horns ${this.horns}`);

    sectionImage.removeClass('photo-template');
}

Images.readJson = () => {
    const ajaxSettings ={
      method: 'get',
      dataType: 'json'
    };
    $.ajax('data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(element => {
        optionValue.push(element.keyword);
        let image = new Images(element.title, element.image_url,element.description, element.horns,element.keyword );
        image.renderImages();
      });
      $.each(optionValue, function(i, el){
        if($.inArray(el, uniqueOptionValue) === -1) uniqueOptionValue.push(el);
      });

      uniqueOptionValue.forEach(function(value,i){
        $("#menu").append("<option value="+value+">"+value+"</option>");
      });
    });
};

function selectKeywords(){
    $("#menu").on('change',function(){
      var name=this.options[this.selectedIndex].text;
      var newPhotoTemplate2=$('.photo-template').clone();
      $('main').html("");
      $('main').append(newPhotoTemplate2);  
      arrayImages.forEach(function(value,i){
        if(name===value.keyword){
          value.renderImages();
        }
      
      });
      
  
    });
  }


$( document ).ready(function() {
    Images.readJson();
    selectKeywords();
  });