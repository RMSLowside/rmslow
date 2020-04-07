# S3

This application is to be used to wrap S3 in a familiar file explorer view. This application relies on the file-explorer lib for all of the visuals. It is currently a good example on how to structure smart vs dumb components as all of the business logic is handled with the app component and all of the view logic is held within the file-explorer library. This apllication uses NGXS to manage the state. 

## Known issues

If you upload a nested folder with folders of the same name, example: "folder/folder/file.txt", it will not preserve the folder structure.

SInce the file-explorer lib does not supportinternal drang and drop, then it is not supported in this app either.

## Running unit tests

Run `nx test s3` to execute the unit tests.
