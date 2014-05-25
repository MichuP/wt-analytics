$("#loginForm").submit(function(event) {
	event.preventDefault();
	var $form = $(this), 
		login = $form.find("input[name='login']").val(), 
		password = $form.find("input[name='password']").val(), 
		url = $form.attr("action");

	$.ajax({
  		type: "POST",
  		url: url,
  		contentType: 'application/json', 
  		data: JSON.stringify({login: login, password: password})
	})
  	.done(function(message) {
    	$( "#loginResult" ).append(message);
  	});
	
}); 