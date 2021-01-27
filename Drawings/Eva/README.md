# Eva

The Eva service is a brand of services that encompasses the core capabilities of the records management lifecycle and facilitates two key DLMD business objectives - manage records in place and transition from physical to digital records.  Eva services reside on the customer's primary network, but is AWS mission agnostic. As long as the services operate in the appropriate domains, the locations of the individual services themselves is unimportant; operational cohesion between the services is of greater importance.

- A user can also create / update datasets from the EVA UI itself, as well as add files and update metadata 
- Newly processed data are kept in their appropriate datastore (P&L information, Metadata, Object, or Catalog storage)
- There are also some ubiquitous service calls throughout this process (GUIDE, enterprise authentication)

## Components

- DMO Dashboard (UI)
- Dataset Catalog
- Object Search
- Metadata Search
- API Gateway
- Data Logistics (NiFi)
- Digitzation
- Pedigree & Lineage
- Metrics

## EVA Drawings
- Architecture draw.io
here: [Draw.io Source](https://app.diagrams.net/?src=about#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FEva%2FArchitecture%2FMainArchitecture.drawio)

- Dashboard draw.io
here: [Draw.io Source](https://app.diagrams.net/?src=about#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FEva%2FDashboard%2FDashboard.drawio)
- Dataset draw.io
here: [Draw.io Source](https://app.diagrams.net/?src=about#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FEva%2FDataset%2FDataset.drawio)

- Digitization draw.io
here: [Draw.io Source](https://app.diagrams.net/#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FEva%2FDigitization%2FEva%20Digitization.drawio)

- Object Search draw.io
here: [Draw.io Source](https://app.diagrams.net/#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FEva%2FSearch%2FEva%20Search.drawio)
