# Eva Dataset

## Dataset Components

- Dataset UI
- Catalog Service
- Catalog Storage

## Data Store
The Catalog service stores dataset information in a MySQL table.

#### Metadata
```json5
{
  guide: "guide",
  classification: "",
  title: "",
  description: "",
  originating_org: "",
  data_steward: "",
  data_classification: "",
  locations: ["", ... ],
  formats: ["", ... ],
  rcs_values: ["", "", ... ],
  pii: "",
  system_of_record: ""
}
```
The locations and formats listed here are aggregated from the files associated to the dataset.
  
## API

### Create Dataset
```
ngimws/catalog
RequestType = POST
RequestBody = Catalog POJO
```
* Creates a new dataset

### Get Dataset by Guide
```
ngimws/catalog/{guide}
RequestType = GET
PathParamter = {guide}
```
* Get a specific dataset from the database

### Update Dataset by Guide
```
ngimws/catalog/{guide}
RequestType = UPDATE
RequestBody = Catalog POJO
```
* Updates a existing dataset

### Delete Dataset by Guide
```
ngimws/catalog/{guide}
RequestType = DELETE
```
* Deletes dataset

### Search Datasets
```
ngimws/catalog/search
RequestType = GET
PathParameter = {query}
```
* Returns search results for datasets. (This could also call the Holds service if you need to be able to search datasets via holds fields as well)

## Dataset UI

Source draw.io
here: [Draw.io Source](https://app.diagrams.net/?src=about#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FEva%2FDataset%2FDataset.drawio)


## Eva Overarching Architecture:

Source draw.io
here: [Draw.io Source](https://app.diagrams.net/#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FEva%2FArchitecture%2FMainArchitecture.drawio)

## Parent / Child Dataset Architecture Ideas:
Source draw.io here: [Draw.io Source](https://app.diagrams.net/#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FEva%2FDataset%2FParentChild.drawio)

## **Software Development Requirements**
### Who: 
Tech Director Staff
Data Lifecycle Staff

### What:
Create an IMS centric catalog to augment the enterprise catalog to store dataset records on IMS’ holdings.  The catalog should also support data owned by mission partners that are currently in the custody of IMS.  The catalog should manage the dataset attributes that are relevant to the IMS business and link back to broad datasets stored in the enterprise tool.  

### Why: 
The IMS catalog would better enable IMS to manage the organizations data without watering down the enterprise offerings.  The IMS catalog would focus on data in IMS’s custody.  Additionally IMS would have additional control over the attributes in the IMS catalog instead of competing with other organizations to support specific attributes.  

### Acceptance Criteria:

-	As a DMO I can create a new dataset with a defined set of attributes
-	As a DMO I can edit an existing dataset altering attributes about the record.  
-	As a DMO I can link one or more IMS datasets to an enterprise dataset.
-	As a DMO I can associate objects in the IMS repository with a given dataset.  
-	As a DMO I can generate metrics based on the defined attributes on the datasets.

