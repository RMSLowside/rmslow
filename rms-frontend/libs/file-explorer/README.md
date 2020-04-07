# file-explorer

This library is a generic file explorer. This library currently relies on only the core module for Angular Material componnents

# Exported Members

## FileElement
Generic element class. Could be a file or a folder.

## file-explorer.component

### Inputs

* fileElements - A list of File Element objects that are to be displayed
* path - The current path of the file explorer to show at the top
* canNavigateUp - A boolean value if you can navigate up or not

### Outputs

* folderAdded - Event that outputs the name of the new folder
* filesUploaded - Event that outputs a list of file elements that were uploaded
* elementRemoved - Event that oututs an element to remove
* elementRenamed - Event that outputs the renames element
* elementMoved - Event that outputs 2 elements, the element that is being movedand the element it is being moved to
* navigatedDown - Event that outputs an element to navigate to
* navigatedUp - Event that outputs anevent with no value, used to navigate up one folder

# Internal Components

## new-folder-modal

Modal used to create a new folder, has an input box for name

## rename-modal

Modal used to rename an element, has an input boxforthe new name


# Running unit tests

Run `nx test file-explorer` to execute the unit tests.
