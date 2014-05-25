$("#signupForm").submit(function(event) {
	event.preventDefault();
	var $form = $(this), 
		username = $form.find("input[name='usename']").val(), 
		login = $form.find("input[name='login']").val(), 
		password = $form.find("input[name='password']").val(), 
		url = $form.attr("action");

	$.ajax({
  		type: "POST",
  		url: url,
  		dataType: "json",
  		contentType: 'application/json', 
  		data: JSON.stringify({ username: username, login: login, password: password}),
  		complete: function() {
      		//called when complete
      		console.log('process complete');
    	},
      	success: function(data) {
      		console.log(data);
      		console.log('process sucess');
   		}
	})
  	.done(function(data) {
    	console.log(data + ' dupa');
    	$( "#signupResult" ).html(message);
  	});
	
}); 