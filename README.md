# ABBYY-Field-QConsole-Demo

# Background 
A prospect wanted to understand how MarkLogic integrated with OCR tools to ingest a bunch of forms as structured data.  Most OCR demos
return unstructured text, but this demo uses a webservice provided by ABBYY (a well-known OCR company) to do exactly that--turn forms in to 
structured text.

For this to work, you need to define areas on the form for ABBYY to analyze.  This structure is captured in an xml file, and is explained in
more detail on this page: http://ocrsdk.com/documentation/apireference/processFields/  As you would expect, the OCR process is not perfect.
This file references a demo .tif provided by ABBYY, and you'll notice some of the information is incorrectly OCR'd.  However, ABBYY flags characters
as "suspicious" that it believes it could have gotten wrong.  This demo doesn't show the suspicous data, but to look at it, uncomment the last line to see 
the full XML response body that includes it.  One could obviously build something to have a human verify this information, paying particular attnetion to the 
suspicious characters. 

The URLs for the image and the XML file that defines the fields are available in the "image" and "schema" variables below.

# Usage
To use this demo, you need to first get a username and password from https://cloud.ocrsdk.com/Account/Register/?skipIfLoggedIn=true.
As a part of creating an account, you will also create what ABBYY refers to as an "application".  This application name is the username
you should use, along with the password you specified.  

As long as you use demonstration images provided by ABBYY, there is no limit to the service's usage.  Otherwise, you'll need to purchase
additional credits.

Once you have an account, enter the username and password on the first two lines below.  After that, you can simply run the code.

