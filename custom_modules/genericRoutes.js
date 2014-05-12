exports.renderView = function(app, reqPath, viewToRender, dataObject, method){
	try {
		if (method.toString().toLowerCase()=="get") {
			app.get(reqPath, function(req, res) {
        		res.render(viewToRender, dataObject);
    		});	
		}
		else if (method.toString().toLowerCase()=="post") {
			app.post(reqPath, function(req, res) {
        		res.render(viewToRender, dataObject);
    		});
		}
	}
	catch(err) {
		console.log(err);
	}
};