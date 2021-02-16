'use strict';

var optionValue=[];
var optionValueTwo=[];

var uniqueOptionValue = ["default"];
var uniqueOptionValueTwo = ["default"];

var arrayImages = [];
var arrayImagesTwo = [];



function Images(title, image_url, description, horns, keyword){
    this.title=title;
    this.image_url=image_url;
    this.description=description;
    this.horns=horns;
    this.keyword=keyword;
    arrayImages.push(this);
}

function ImagesTwo(title, image_url, description, horns, keyword){
  this.title=title;
  this.image_url=image_url;
  this.description=description;
  this.horns=horns;
  this.keyword=keyword;
  arrayImagesTwo.push(this);
}

ImagesTwo.prototype.renderImagesTwo = function() {
    let temp = $('#template-2').html();
    $('.main-2').append(Mustache.render(temp, this));  
}


Images.prototype.renderImages = function() {
  // let sectionImage = $('.photo-template').clone();
  // $('.main-1').append(sectionImage)
  // sectionImage.find('h2').text(this.title);
  // sectionImage.find('img').attr("src",this.image_url);
  // sectionImage.find('p').text(this.description);
  // sectionImage.find('#num-of-horns').text(`# Of Horns ${this.horns}`);
  // sectionImage.removeClass('photo-template');
  let temp = $('#template-2').html();
  $('.main-1').append(Mustache.render(temp, this));  
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

ImagesTwo.readJson2 = () => {
  const ajaxSettings ={
    method: 'get',
    dataType: 'json'
  };
  $.ajax('data/page-2.json', ajaxSettings)
  .then(data => {
    data.forEach(element => {
      optionValueTwo.push(element.keyword);
      let image = new ImagesTwo(element.title, element.image_url,element.description, element.horns,element.keyword );
      image.renderImagesTwo();

    });
    $.each(optionValueTwo, function(i, el){
      if($.inArray(el, uniqueOptionValueTwo) === -1) uniqueOptionValueTwo.push(el);
    });

    uniqueOptionValueTwo.forEach(function(value,i){
      $("#menu").append("<option value="+value+">"+value+"</option>");
    });
  });
};

function selectKeywords(){
    $("#menu").on('change',function(){
      var name=this.options[this.selectedIndex].text;
      var newPhotoTemplate2=$('.photo-template').clone();
      $('.main-1').html("");
      $('.main-1').append(newPhotoTemplate2);  
      arrayImages.forEach(function(value,i){
        if(name===value.keyword){
          value.renderImages();
        }
      });
    });
  }
  function selectKeywordsTwo(){
    $("#menu").on('change',function(){
      var name=this.options[this.selectedIndex].text;
      var newPhotoTemplateTwo=$('#template-2').clone();
      $('.main-2').html("");
      $('.main-2').append(newPhotoTemplateTwo);  
      arrayImagesTwo.forEach(function(value,i){
        if(name===value.keyword){
          value.renderImagesTwo();
        }
      });
    });
  }


$("document").ready(function() {

  Images.readJson();
  selectKeywords();
  });

var pageName ="page-1";
  $("#page-1").on("click", function(){
    // $('.photo-template').html("");
    $("#menu").html("");
    $(".main-2").hide();
    $(".main-1").show();
    $(".main-1").empty();
    Images.readJson();
    selectKeywords();
    pageName = "page-1";
    
    arrayImages = [];
  });
   
    $("#page-2").on("click", function(){
      // $(".photo-template2").html("");
      $("#menu").html("");
      $(".main-1").hide();
      $(".main-2").show();
      $(".main-2").empty();
      ImagesTwo.readJson2();
      selectKeywordsTwo();
      pageName = "page-2";
      arrayImagesTwo = [];
      // $(".photo-template2").html("");
    });

    $("#title").on("click", function(){
      compareTitle();
    });
    $("#horns").on("click", function(){
      compareHorns();
    });
 


    function compareTitle(){
      arrayImages.sort(function(a, b) {
      if (a.title > b.title) return 1;
      if (b.title > a.title) return -1;
    
      return 0;
    });
    $('.main-1').html("");
    if(pageName === "page-1"){
      arrayImages.forEach(function(value,i){
        value.renderImages();
      });
    }
    if(pageName === "page-2"){
    arrayImagesTwo.forEach(function(value,i){
      value.renderImagesTwo();
    });
  }
  }

  function compareHorns(){
    arrayImages.sort(function(a, b) {
    if (a.horns > b.horns) return 1;
    if (b.horns > a.horns) return -1;
  
    return 0;
  });
  $('.main-1').html("");
  if(pageName === "page-1"){
    arrayImages.forEach(function(value,i){
      value.renderImages();
    });
  }
  if(pageName === "page-2"){
  arrayImagesTwo.forEach(function(value,i){
    value.renderImagesTwo();
  });
}
}
    




