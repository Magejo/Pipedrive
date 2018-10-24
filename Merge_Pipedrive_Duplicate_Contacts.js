var fs = require('fs');
var csv = require('fast-csv');
var axios = require('axios');
var counter = 0;
var responseCounter = 0;

exports.csvHandler = function() {
	csvData();
}

function csvData() {

	var stream = fs.createReadStream(__dirname + "/FINAL_Duplicate_People_Pipedrive_Fixing.csv");
 
	var csvStream = csv()
    	.on("data", function(data){
    		if (counter!=0) {
    			setTimeout(function(){processData(data);},200);
    		}
    		++counter;
    	})
    	.on("end", function(){
        	 console.log("done");
    	});

	stream.pipe(csvStream);
}

async function processData (data) {

	var splitData = data[0].split(";");

	var apiKey = "Your_Personal_API_Token_Here";

	var dataObject = {
		Merge_With_ID: splitData[0],
		Person_Name: splitData[1],
		Person_Email: splitData[2],
		Person_Organization: splitData[3],
		Merge_ID: splitData[4],
		Person2_Name: splitData[5],
		Person2_Email: splitData[6],
		Person2_Organization: splitData[7]
	}

	var endPoint = "https://vainuio.pipedrive.com/v1"+"/persons/"+dataObject.Merge_ID+"/merge?api_token="+apiKey;

	axios.put(endPoint,{id:dataObject.Merge_ID,merge_with_id:dataObject.Merge_With_ID})
		.then((res) =>{
			console.log("Row " +responseCounter+ " processed");
			++responseCounter;
		})
		.catch((error) =>{
			console.log(error.data.error);
		})
}