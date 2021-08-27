## jupyter-datainputtable
[Introduction](#introduction) | [Current Features](#current-features) | 
[Wishlist](#wishlist) | [Usage](#usage) | [Installation](#installation) | 
[Change log](#change-log) | [Issues or comments](#issues-or-comments) | 
[License](#this-software-is-distributed-under-the-gnu-v3-license)
#### Introduction:
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

#### Installation

Installation using pip into a virtual environment is recommended.

_Production_

This is best installed by install the pseudo packages
[JPSLInstructor](https://github.com/JupyterPhysSciLab/JPSLInstructor)
or
[JPSLStudent](https://github.com/JupyterPhysSciLab/JPSLStudent).

If you wish to install just this package follow the instructions below.

1. If not installed, install pipenv:`$ pip3 install --user pipenv`. You may
need to add `~/.local/bin` to your `PATH` to make `pipenv`
available in your command shell. More discussion: 
[The Hitchhiker's Guide to Python](https://docs.python-guide.org/dev/virtualenvs/).
1. Navigate to the directory where this package will be installed.
1. Start a shell in the environment `$ pipenv shell`.
1. Install using pip.
    1. `$ pip install jupyter-datainputtable`. This will install Jupyter into the same virtual
    environment if you do not already have it on your machine. If Jupyter is already
    installed the virtual environment will use the existing installation. This takes
    a long time on a Raspberry Pi. It will not run on a 3B+ without at least 1 GB of
    swap. See: [Build Jupyter on a Pi](https://www.uwosh.edu/facstaff/gutow/computer-and-programming-how-tos/installing-jupyter-on-raspberrian).
    1. Still within the environment shell test this by starting jupyter
`$ jupyter notebook`. Jupyter should launch in your browser.
        1. Open a new notebook using the default (Python 3) kernel.
        1. In the first cell import the input_table module:
            `import input_table`
        1. To try use the command `input_table.create_input_table()` in the 
           next cell. This should generate a blank code cell
        and another code cell that has a table in the output for you to define your table dimensions.
        1. If you define the dimensions the input table will be created for you.
        
1. _Optional_ You can make this environment available to an alternate Jupyter install as a special kernel when you are the user.
    1. Make sure you are running in your virtual environment `$ pipenv shell` in the directory for  virtual
    environment will do that.
    1. Issue the command to add this as a kernel to your personal space: 
    `$ python -m ipykernel install --user --name=<name-you-want-for-kernel>`.
    1. More information is available in the Jupyter/Ipython documentation. A simple tutorial from Nikolai Jankiev
    (_Parametric Thoughts_) can be found [here](https://janakiev.com/til/jupyter-virtual-envs/). 
    
_Development_

Simply replace `$ pip install jupyter-datainputtable` with `$ pip install 
-e ../jupyter-datainputtable` in the _Production_
instructions.

#### Change Log

* 0.7.4 Colored and bigger table caption. README updates.
* 0.7.3
  * Use jQuery style dialogs.
  * When creating Pandas DataFrame from a table import numpy and Pandas 
    only if necessary.
  * README updates.  
* 0.7.2 
  * Ability to have a table caption.
  * Created a file for future custom css.
  * Expansion and cleanup of README.md.  
* 0.7.1 Bug fixes.
* 0.7.0
  * Better handling of empty, string and NaN cells.
  * Set Pandas indexes if row labels are not just numeric indexes.  
* 0.6.0
  * Added dialog for getting initial table dimensions.
  * Added export table data to a Pandas DataFrame table action.
  * Bug fixes.  
* 0.5.0 Initial beta release
#### Issues or comments:

[JupyterPhysSciLab/jupyter-datainputtable](https://github.com/JupyterPhysSciLab/jupyter-datainputtable)

##### [This software is distributed under the GNU V3 license](https://gnu.org/licenses)
This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

Copyright - Jonathan Gutow, 2020, 2021.