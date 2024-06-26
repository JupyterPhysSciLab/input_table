# jupyter_datainputtable

[![Github Actions Status](https://github.com/JupyterPhysSciLab/jupyter-datainputtable/workflows/Build/badge.svg)](https://github.com/JupyterPhysSciLab/jupyter-datainputtable/actions/workflows/build.yml)

Tools for generating predefined data input tables for use in Jupyter notebooks.
This is primarily for student worksheets.

#### Current Features:

* Can create a table using a python command in the Jupyter notebook.
* If using JupyterPhysSciLab/InstructorTools tables can be
created using menu items in the Jupyter notebook (recommended usage).
* Table column and row labels can be locked once set.
* Number of rows and columns must be chosen on initial creation.
* Table will survive deletion of all cell output data.
* Default setting is to protect the code cell that creates the table. This 
  blocks editing and deleting.
* Table creation code will work without this package installed in the Jupyter
kernel. Tables are viewable, but not editable in a plain vanilla Jupyter install.
* Menu option to create a Pandas DataFrame from the table.

#### Wishlist:

* Add rows to existing table.

#### Usage:
If you are using and have initialized the JupyterPhysSciLab/InstructorTools
select the "insert table..." item from the menu. This will initiate the table
creation process with a dialogbox.

If you are not using the InstructorTools package, but the package 
`jupyter_datainputtable` is installed in your Jupyter/Python 
environment start by importing it:
```
import input_table
```
You initiate the table creation process with the command:
```
input_table.create_input_table()
```
## Requirements

- JupyterLab >= 4.0.0

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

### Testing the extension

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
