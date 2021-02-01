# Eva Digitization

Eva Digitization allows user to upload files against specific datasets, place files into a holding pen, or allow Eva to route files "automatically" based on predetermined attributes on the files.

## Upload Options

### User Selected Dataset

Through the Eva Digization UI a user can select a specific dataset to upload 1-n files against.

#### File Format

Standard Formats are supported

- PDF (preview supported)
- Image Files (.jpg, .tiff, .bmp) (preview NOT supported)
- MS Office Files (.doc, .docx, .ppt, .pptx, .xls, .xlsx) (preview NOT supported)

### Holding Pen

This is a location where users can securely place files of almost any format for a short duration if they are not yet ready to upload files into place them into a specific dataset

### Auto Eva

Auto Eva will route files into a specific dataset based on specific attributes on the file.  

#### Attributes

- Job + Box + Folder + Sequence

## Reprocess Options

Objects that fail to process, will sit on the reprocessor page waiting for human intervention.  

## Data Store

<insert here>
  

##  API

<insert here>
## Digitization UI

Source draw.io
here: [Draw.io Source](https://app.diagrams.net/#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FEva%2FDigitization%2FEva%20Digitization.drawio)

## **Software Development Requirements**
### Who: 
- Tech Director Staff
- Data Lifecycle Staff

### What:
Provide a straightforward interface to allow IMS users to upload digital objects into one or more approved repositories.  The digitization process should allow users to add attributes to the objects before sending those objects to the defined repository.  The digitization services should allow IMS users to add objects to a short term holding pen before transmitting them to a defined repository.  Additionally the tool should allow users to either select a defined dataset to associate the files with, or automatically route the files under a given dataset based on pre-defined attributes.  There should be an option to reprocess objects that failed the initial upload.  

### Why: 
IMS has a large number of digital and physical holdings spread throughout a number of tools, services, repositories and storage locations.  IMS needs to be able to quickly move these objects though the pipeline into a defined repository.  

### Acceptance Criteria:

-	As a DMO I can drag files into a browser and have those files end up in a tempory holding pen
-	As a DMO, I can drag files into a browser, define a dataset, and upload those files into a repository.
-	As a DMO, I can alter attributes about a file before sending it to the final repository.  
-	tbd

