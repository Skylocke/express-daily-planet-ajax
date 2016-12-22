console.log("JS good to go, sir!");

$(".put-form").on("submit", function(event) {
  event.preventDefault();
  var form_element = $(this);
  var url = form_element.attr("action");
  var form_data = form_element.serialize();

  $.ajax({
    method: "PUT",
    url: url,
    data: form_data
  }).done(function(data) {
    console.log(data);
    window.location = url;
  });
});

$(".delete-action").on("click", function(event) {
  event.preventDefault();
  var article_div = $(event.target).closest('div');
  var article_url = article_div.children(".article-link").attr("href");

  $.ajax({
    method: "DELETE",
    url: article_url
  }).done(function(data) {
    console.log(data);

    article_div.remove();
  });
});
