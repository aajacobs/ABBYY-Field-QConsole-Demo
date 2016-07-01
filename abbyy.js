var username = "";
var password = "";
var authType = "basic";
var image = fn.subsequence(xdmp.httpGet("https://raw.githubusercontent.com/abbyysdk/ocrsdk.com/master/SampleData/Page_08.tif"),2);
var schema = xdmp.unquote(fn.subsequence(xdmp.httpGet("https://raw.githubusercontent.com/abbyysdk/ocrsdk.com/master/SampleData/processFields.xml"),2));

function post(endpoint, payload, params) {
    params = (params != "") ? ("?" + params) : "";
    var url = "http://cloud.ocrsdk.com/" + endpoint + params;
    var response = xdmp.httpPost(url,
          {
       "authentication" : {
         "method" : authType,
         "username" : username,
         "password" : password
       }},
        payload);
    return response;
};

function get(endpoint, params) {
  params = (params != "") ? ("?" + params) : "";
  var response = xdmp.httpGet(("http://cloud.ocrsdk.com/" + endpoint + params),
          {
       "authentication" : {
         "method" : authType,
         "username" : username,
         "password" : password
       }});
  return response;
};

function submitImage() {
  var response = post("submitImage", image, "" );
  return response;
};

function processFields(taskId) {
  var response = post("processFields", schema, "taskId=" + taskId);
  return response;
};

function getTaskStatus(params) {
  var response = get("getTaskStatus", params);
  return response;
};

function getURL(taskID) {
  var response;
  do {
    response = getTaskStatus("taskId=" + taskID);
    var status = (response.toArray()[1]).xpath("response/task/@status");
  } while (status != "Completed");
  return (response.toArray()[1]).xpath("response/task/@resultUrl");
};

var taskID = (submitImage().toArray()[1]).xpath("response/task/@id");
console.log(fn.subsequence(submitImage(), 2));

var res = processFields(taskID);
var url = getURL(taskID);
var ocrText = (xdmp.httpGet(url).toArray()[1]);
var pageElement = ocrText.root.getElementsByTagNameNS("http://ocrsdk.com/schema/resultDescription-1.0.xsd", "page");
var children = pageElement.item(0).xpath("child::*");

// Construct the JSON
var doc = {};
doc.form = {};
for (var child of children) {
      var name = child.getAttribute("id");
      var val = child.xpath("value").next().value.textContent;
      doc.form[name] = (name == "bottom") ? xdmp.base64Decode(val) : val;
}
doc.metadata = {};
doc.metadata.url = url;
doc.metadata.ocrDateTime = fn.currentDateTime();

doc;

// Uncomment the following line to see the full XML response from ABBYY--it includes marking individual characters as "suspicious".
// Another process could analyze thse and present them to a human for validation to avoid OCR errors.

//ocrText.root
