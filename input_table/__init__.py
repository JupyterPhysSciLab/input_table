name = "input_table"
#Python to generate a table that the user can input data into in a Jupyter
# notebook. Requires input_table.js.
# Jonathan Gutow <gutow@uwosh.edu> Feb. 3, 2020
# license GPL V3 or greater

from IPython.display import HTML
from IPython.display import Javascript as JS
import JPSLUtils

import os

#Locate input_table package directory
mydir=os.path.dirname(__file__) #absolute path to directory containing this file.

#load the supporting css
tempcssfile = open(os.path.join(mydir,'css','input_table.css'))
tempstyle = '<style type="text/css">'
tempstyle += tempcssfile.read()+'</style>'
tempcssfile.close()
display(HTML(tempstyle))

#load the supporting javascript
tempJSfile=open(os.path.join(mydir,'javascript','input_table.js'))
tempscript='<script type="text/javascript">'
tempscript+=tempJSfile.read()+'</script>'
tempJSfile.close()
display(HTML(tempscript))

def create_input_table():
    """
    This function calls the javascript function `get_table_dim()` to start building a data input table
    that will be created in the output area of a Jupyter cell. Because the tools are
    meant to be used with direct calls to javascript from a html/javascript menu, when you call this python
    function it will add an extra blank cell before the cell in which the table is created. This does
    not occur when doing things in javascript.
    """
    JPSLUtils.OTJS('get_table_dim();')