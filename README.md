# jupyter_datainputtable
<!-- Set this up once working on github
[![Github Actions Status](https://github.com/JupyterPhysSciLab/jupyter-datainputtable/workflows/Build/badge.svg)](https://github.com/JupyterPhysSciLab/jupyter-datainputtable/actions/workflows/build.yml)
-->
Tools for generating predefined data input tables for use in Jupyter notebooks.
This is primarily for student worksheets. This is part of the
[Jupyter Physical Science Lab project](https://jupyterphysscilab.github.io/Documentation/),
but can be used independently of the rest of the project.

TOC: [Current Features](#current-features) | [Usage](#usage) | 
[Requirements](#requirements) | [Install](#install) | [Uninstall](#uninstall) |
[Contributing](#contributing)

## Current Features:

* Can create a table using the `Insert Data Entry Table` command in the 
  Jupyter Lab command palette.
* If using [JupyterPhysSciLab/InstructorTools](https://github.com/JupyterPhysSciLab/jupyter-instructortools)
  tables can be created using an item in the "Instructor Tools" menu 
  (recommended usage).
* Table column and row labels can be locked once set.
* Number of rows and columns must be chosen on initial creation.
* Table will survive deletion of all cell output data.
* The code that creates the table and stores the data is not editable or 
  deletable by the user of the notebook unless they manually change the cell 
  metadata (not easily accessible in the simpler `jupyter notebook` mode rather 
  than `jupyter lab` mode).
* Table creation code will work without this extension installed. Tables are 
  viewable, but not editable in a plain vanilla Jupyter install.
* Tables include a button to create a [Pandas](https://pandas.pydata.org/) 
  dataframe from the table data. The code to create the dataframe is 
  automatically inserted into a new cell immediately below the table and run.
  This cell is editable by the user.

### Wishlist:

* Add rows or columns to existing table.

## Usage:
### Create a new table using the currently selected code cell.
*NB: This will replace anything currently in the cell!*

If you are using JupyterPhysSciLab/InstructorTools and have activated the menu
select the "Insert New Data Table..." item from the menu (figure 1).

![JPSL Instructor Tools Menu](https://raw.github.com/JupyterPhysSciLab/jupyter-datainputtable/master/JPSL_Instructor_Menu_ann.png)

**Figure 1:** Menu item in JPSL Instructor Tools menu.

Alternatively, you can create a new table using the "Insert Data Entry Table"
command in the Jupyter Lab command pallet (figure 2).

![Jupyter Command Pallet](https://raw.github.com/JupyterPhysSciLab/jupyter-datainputtable/master/Command_Palette_ann.png)

**Figure 2:** Item in the Jupyter Lab command palette.

Either will initiate the table creation process with a dialog (figure 3).

![Data table creation dialog](https://raw.github.com/JupyterPhysSciLab/jupyter-datainputtable/master/Data_table_creation_dialog.png)

**Figure 3:** Data table creation dialog.
### Entering and saving data
Once the table is created and you have edited and locked the column and row 
labels, users can enter information in the data cells after clicking the 
"Edit Data" button (figure 4). To save their edits they click the "Save 
Table" button.

![Data table in edit mode.](https://raw.github.com/JupyterPhysSciLab/jupyter-datainputtable/master/table_in_edit_mode.png)

**Figure 4:** Data table in edit mode.

The table actions are inactive if this extension is not installed.

![Table without extension installed](https://raw.github.com/JupyterPhysSciLab/jupyter-datainputtable/master/table_without_extension.png)

**Figure 5:** Data table in notebook without this extension installed.
## Requirements

- JupyterLab >= 4.0.0
- notebook >= 7.0.0

## Install

To install the extension, execute:

```bash
pip install jupyter_datainputtable
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyter_datainputtable
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyter_datainputtable directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyter_datainputtable
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyter-datainputtable` within that folder.

### Testing the extension (currently incomplete)

#### Frontend tests

This extension is using [Jest](https://jestjs.io/) for JavaScript code testing.

To execute them, execute:

```sh
jlpm
jlpm test
```

#### Integration tests

This extension uses [Playwright](https://playwright.dev/docs/intro) for the integration tests (aka user level tests).
More precisely, the JupyterLab helper [Galata](https://github.com/jupyterlab/jupyterlab/tree/master/galata) is used to handle testing the extension in JupyterLab.

More information are provided within the [ui-tests](./ui-tests/README.md) README.

### Packaging the extension

See [RELEASE](RELEASE.md)
