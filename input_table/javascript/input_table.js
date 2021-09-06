//Javascript for input_table to use in Jupyter notebook
//Jonathan Gutow <gutow@uwosh.edu> March 24, 2019
// updates: October 31, 2020, July 2021
//license GPL V3 or greater.

//Get input table dimensions and build
function get_table_dim_old(){
    Jupyter.notebook.insert_cell_below();
    Jupyter.notebook.select_next(true);
    Jupyter.notebook.focus_cell();
    var currentcell = Jupyter.notebook.get_selected_cell();
//    var htmlstr =`
//    <div id="input_table_dim_dlg" style="border:thick;border-color:red;border-style:solid;">
//      <div>Set table size remembering to include enough rows and columns for labels.</div>
//      <table id="init_input_table_dim"><tr>
//        <td> Rows:</td><td><input id="init_row_dim" type="text" size="7" value="2"
//          onblur="record_input(this)"></input></td>
//        <td>Columns:</td><td><input id="init_col_dim" type="text" size="7" value="2"
//          onblur="record_input(this)"></input></td>
//        <td><button onclick="create_table()">Create Table</button></td>
//      </tr></table>
//    </div>`

    var instructions = "Set table size remembering to include enough rows and columns for labels.";
    var fields = ["Table Title (caption)","Number of Rows",
    "Number of Columns"];
    input_dialog("input_table_dim_dlg", create_table,"not used", instructions,fields);
    //currentcell.set_text('display(HTML("""'+htmlstr+'"""))');
    //currentcell.execute();
}

function get_table_dim(){
    Jupyter.notebook.insert_cell_below();
    Jupyter.notebook.select_next(true);
    Jupyter.notebook.focus_cell();
    var currentcell = Jupyter.notebook.get_selected_cell();
    var instructions = "Set table size remembering to include enough rows and columns for labels.";
    var fields = ["Table Title (caption)","Number of Rows",
    "Number of Columns"];
    var fieldlen = [40, 15, 15]
    var tempdialog = document.createElement('div');
    tempdialog.setAttribute('id',"input_table_dim_dlg");
    var tempinstr = document.createElement('H4');
    tempinstr.setAttribute('style','text-align:center;');
    tempinstr.innerHTML = instructions;
    tempdialog.append(tempinstr);
    for (var i = 0; i < fieldlen.length;i++){
        var templine=document.createElement('div');
        var inputstr = fields[i]+': ';
        inputstr +='<input type="text" size="'+fieldlen[i]+'" value="" ';
        inputstr += 'onblur="record_input(this)"></input>';
        templine.innerHTML=inputstr;
        templine.setAttribute('style','text-align:center;');
        tempdialog.append(templine);
    }
    $(tempdialog).dialog({modal:true, width:400,
                  close: function(){$(this).dialog('destroy')},
                  buttons:[
                  {text: 'Cancel',
                  click: function(){$(this).dialog('destroy')}},
                  {text: 'OK/Do It',
                  click: function(){create_table();
                                    $(this).dialog('destroy')}}
                  ]
    })
    Jupyter.notebook.focus_cell();//Make sure keyboard manager doesn't grab inputs.
    Jupyter.notebook.keyboard_manager.enabled=false;
    tempdialog.focus();
    Jupyter.notebook.keyboard_manager.enabled=false; //Make sure keyboard manager doesn't grab inputs.
}

//Update html on change of cell content.
function record_input(element){
    var tempval = ''+element.value;//force to string
    var tempsize = ''+element.size;
    if (tempsize==null){tempsize='7'};
    var tempclass = element.className;
    if (tempclass==null){tempclass=''};
    var tempid = element.id;
    if (tempid==null){tempid=''};
    var tempelem = document.createElement('input');
    tempelem.className =tempclass;
    tempelem.id=tempid;
    tempelem.setAttribute('size',tempsize);
    tempelem.setAttribute('value',tempval);
    tempelem.setAttribute('onblur','record_input(this)');
    element.replaceWith(tempelem);
}

// Convert table input element to fixed value.
function input_element_to_fixed(element){
    var tempelem =document.createElement('span');
    tempelem.className=element.className;
    tempelem.innerHTML = element.value;
    element.replaceWith(tempelem);
}

function data_cell_to_input_cell(element){
    var tempelem=document.createElement('input');
    var tempsize = 4;
    tempelem.setAttribute('size',tempsize);
    var tempid = element.id;
    if (tempid==null){tempid=''};
    tempelem.id=tempid;
    tempelem.className=element.className;
    tempelem.setAttribute('value',element.innerHTML);
    element.replaceWith(tempelem);
}

    
function table_menu(tableID){
    var menu = document.createElement('select');
    menu.classList.add('form-control');
    menu.classList.add('table-actions');
    var actionstr = 'var lastvalue = this.value;';
    actionstr+='this.value = "Table Actions";';
    actionstr+='if(lastvalue=="Edit Data"){edit_input_table("'+tableID+'");}';
    actionstr+='if(lastvalue=="Data to Pandas..."){data_table_to_Pandas("'+tableID+'");}';
    menu.setAttribute('onchange',actionstr);
    var optiontxt = '<option title="Things you can do to this table.">Table Actions</option>';
    optiontxt+='<option title="Start editing the data.">Edit Data</option>';
    optiontxt+='<option title="Create a Panda DataFrame from table.">Data to Pandas...</option>';
    menu.innerHTML=optiontxt;
    return menu
}

function lock_labels(tableID){
//Will need to use querySelectorAll(css)
    var parentTable = document.getElementById(tableID);
    var labelinputs = parentTable.querySelectorAll('.table_label');
    for(var i=0;i<labelinputs.length;i++){
        input_element_to_fixed(labelinputs[i]);
    }
    var lockbtn = parentTable.querySelector('.lock_btn');
    var tempelem = table_menu(tableID);
    lockbtn.replaceWith(tempelem);
    save_input_table(tableID);
}

function input_table_prestr(){
    var prestr='# If no data table appears in the output of this cell, run the cell to display the table.\n\n';
    prestr+='from IPython.display import HTML\n';
    prestr+='try:\n';
    prestr+='    import input_table\n';
    prestr+='except (ImportError, FileNotFoundError) as e:\n';
    prestr+='    print("Table editing will not work because `jupyter_datainputtable` module is not installed in python kernel")\n';
    return prestr
}

//Create the table using the info collected in the dimension table.
var create_table = function (){
/*
    var nrows = document.getElementById("init_row_dim").value;
    var ncols = document.getElementById("init_col_dim").value;
*/
    var dialog = document.getElementById("input_table_dim_dlg");
    var inputs = dialog.querySelectorAll("input");
    var caption = inputs[0].value;
    var nrows = inputs[1].value;
    var ncols = inputs[2].value;
    //alert(nrows+', '+ncols)
    var d = new Date();
    var ID = "it_"+(Math.round(d.getTime()));
    var labelClass = "table_label";
    var dataCellClass="data_cell";
    var prestr = input_table_prestr();
    var tempstr='<table class="input_table" id="'+ID+'">';
    tempstr += '<caption  style="font-weight:bold;font-size:1.5em;'
    tempstr += 'color:darkkhaki">'+caption+'</caption><tbody>';
    for(var i = 0; i < nrows; i++){
        tempstr+=' <tr class="input_table r'+i+'">';
        for(var k = 0;k < ncols; k++){
            if (k==0 && i==0){
                tempstr+='  <th class="input_table r'+i+' c'+k+'">';
                tempstr+='<button class="lock_btn" onclick="lock_labels(\\\''+ID+'\\\')">';
                tempstr+='Lock Column and Row Labels</button></th>';
            }
            if (k==0 && i>0){
                tempstr+='<th class="input_table r'+i+' c'+k+'">';
                tempstr+='<input class="'+labelClass+'" type="text" size="7" value="'+(i-1)+'"';
                tempstr+=' onblur="record_input(this)"></input></th>';
            }
            if (i==0 && k>0){
                tempstr+='<th class="input_table r'+i+' c'+k+'">';
                tempstr+='<input class="'+labelClass+'" type="text" size="15" value="Col_'+(k-1)+'"';
                tempstr+=' onblur="record_input(this)"></input></th>';
            }
            if (k>0 && i>0){
                tempstr+='  <td class="input_table r'+i+' c'+k+'">';
                tempstr+='<input class="'+dataCellClass+'" type="text" size="7"';
                tempstr+=' onblur="record_input(this)"></input></td>';
            }
        }
        tempstr+=' </tr>';
    }
    tempstr+='</tbody></table>';
    var currentcell = Jupyter.notebook.get_selected_cell();
    currentcell.set_text(prestr+'display(HTML(\''+tempstr+'\'))');
    //protect the cell so user cannot edit or delete the code without knowing 
    // what they are doing.
    currentcell.metadata.editable=false;
    if (!currentcell.metadata.JPSL){
        currentcell.metadata.JPSL={};}
    currentcell.metadata.JPSL.input_table_cell=true;
    currentcell.execute();
};

//Utility function that is not used because the Jupyter notebook cell indexing is maintained
// independently of the DOM.
function findAncestor (el, sel) {
    while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,sel)));
    return el;
}

function select_containing_cell(elem){
    //Create a synthetic click in the cell to force selection of the cell containing the table
    var event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
    });
    var cancelled = !elem.dispatchEvent(event);
    if (cancelled) {
    // A handler called preventDefault.
    alert("Something is wrong. Try running the cell that creates this table.");
    }    
}
//Allow editing of the unlocked table elements.
function edit_input_table(tableID){
    var table = document.getElementById(tableID);
    select_containing_cell(table); //force selection of cell containing the table.
    var currentcell = Jupyter.notebook.get_selected_cell();
    var datainputs = table.querySelectorAll('.data_cell');
    for(var i=0;i<datainputs.length;i++){
        data_cell_to_input_cell(datainputs[i]);
    }
    var menu = table.querySelector('.table-actions');
    var tempelem = document.createElement('button');
    tempelem.classList.add('save_btn');
    var onclickstr = "save_input_table('"+tableID+"');"
    tempelem.setAttribute('onclick',onclickstr);
    tempelem.innerHTML='Save Data';
    menu.replaceWith(tempelem);
}

//Save table by making the code cell create it. Actuated by button.
//***For this to work the following import need to be made into
//   the jupyter notebook by the python code that utilizes this function:
//   from IPython.display import HTML

function save_input_table(tableID){
    var table = document.getElementById(tableID);
    select_containing_cell(table); //force selection of cell containing the table.
    var currentcell = Jupyter.notebook.get_selected_cell();
    var datainputs = table.querySelectorAll('.data_cell');
    for(var i=0;i<datainputs.length;i++){
        input_element_to_fixed(datainputs[i]);
    }
    if(table.querySelector('.save_btn')){
        table.querySelector('.save_btn').replaceWith(table_menu(tableID));
    }
    var tablecnt = table.innerHTML;
    var tablestr= input_table_prestr();
    tablestr+='display(HTML(\'';
    tablestr+='<table class="input_table" id="'+tableID+'">';
    var re=/\n/g;
    var re2=/'/g;
    tablestr+=tablecnt.replace(re,' ').replace(re2,'\\\'')+'</table>';
    tablestr+='\'))';
    currentcell.set_text(tablestr);
    currentcell.execute();
}
/**
 * Utility functions for getting user input
 **/

 /**
 * Create a simple input dialog (modal) that does not depend on a library, but works in Jupyter.
 * @param dialogid a single word string that will be used as the dialog id to that it can be accessed in the DOM.
 * @param post_processor a function definition to be called by the do-it button (see example later in this comment).
 * @param instructions a string providing general instructions for the user or at minimum a dialog title.
 * @param fields a list of strings that will be used as the titles for the fields. The length of this list
 *               determines how many input fields the dialog will contain (1 per line).
 *
 * post_processor function must be based on the following skeleton. Replace <...> with appropriate variables or
 *  strings.
 *
 * var <name_of_post_processor> = '('+function (){
 *    var dialog = document.getElementById("<dialogid_string>");
 *    var inputs = dialog.querySelectorAll('input');
 *    var values = [];
 *    for (var i=0;i<inputs.length;i++){
 *        values[i]=inputs[i].value;
 *    }
 *    var info = dialog.querySelectorAll('#post_pr_info')[0].innerHTML;
 *    dialog.remove();
 *    <code to use the items in values and post_pr_info> //order of items is
 *    the same as the fields list.
 *}+')();';
 *
 **/
function input_dialog(dialogid, post_processor, post_pr_info, instructions,fields){
    var backdialog = document.createElement('div');
    backdialog.setAttribute('id',"background_div")
    var stylestr = 'position:fixed;left:0%;top:0%;width:100%;height:100%;z-index:-1;';
    stylestr+='background-color:white;opacity:60%;';
    backdialog.setAttribute('style',stylestr);
    var tempdialog = document.createElement('div');
    stylestr = 'position:fixed;left:20%;';
    stylestr+='top:25%;width:60%;z-index:99;background-color:navajowhite;opacity:100%!important;';
    stylestr+='border-style:solid!important;border:thick;border-color:red;';
    tempdialog.setAttribute('style',stylestr);
    tempdialog.setAttribute('id',dialogid);
    if (instructions!=''){
        var tempinstr = document.createElement('H3');
        tempinstr.setAttribute('style','text-align:center;');
        tempinstr.innerHTML = instructions;
        tempdialog.append(tempinstr);
    }
    for (var i=0;i<fields.length;i++){
        var templine=document.createElement('p');
        templine.innerHTML = fields[i]+': ';
        var fieldstr = fields[i].replace(' ','_').replace('\'','').replace('/','_').replace('*','_').replace('\"','_');
        var inputstr = '<input id="'+fieldstr+'" type="text" size="30" value="" ';
        inputstr += 'onblur="record_input(this)"></input>';
        templine.innerHTML+=inputstr;
        templine.setAttribute('style','text-align:center;');
        tempdialog.append(templine);
    }
    var tempinfo = document.createElement('div');
    tempinfo.setAttribute('id','post_pr_info');
    tempinfo.setAttribute('hidden', true);
    tempinfo.innerHTML = post_pr_info;
    tempdialog.append(tempinfo);
    var cancel_btn = document.createElement('button');
    cancel_btn.innerHTML = "CANCEL"
    var onclickstr = 'document.getElementById("'+dialogid+'").remove()';
    cancel_btn.setAttribute('onclick',onclickstr);
    tempdialog.append(cancel_btn);
    var save_btn = document.createElement('button');
    save_btn.setAttribute('onclick',post_processor);
    save_btn.innerHTML = "OK/Do-It"
    tempdialog.append(save_btn);
    tempdialog.append(backdialog);
    document.body.append(tempdialog);
    Jupyter.notebook.focus_cell();//Make sure keyboard manager doesn't grab inputs.
    Jupyter.notebook.keyboard_manager.enabled=false; 
    tempdialog.focus();
    Jupyter.notebook.keyboard_manager.enabled=false; //Make sure keyboard manager doesn't grab inputs.
}

function checkfornumpy_startTblToDF(tableID, DFname){
    //tableID is to be passed on to later functions in this chain
    var parentTable = document.getElementById(tableID);
    //Make sure the cell containing the table is selected by Jupyter.
    JPSLUtils.select_containing_cell(parentTable);
    Jupyter.notebook.insert_cell_below();
    Jupyter.notebook.select_next(true);
    Jupyter.notebook.focus_cell();
    var execstr = '"'+tableID+'","'+DFname+'",str(input_table.JPSLUtils.havenp())';
    //alert('checkfornumpy_startTblToDF: '+execstr);
    JPSLUtils.executePython(execstr).then(result => fixnp_checkpd(result));
}

function fixnp_checkpd(result){
    // result is comma separate list from the last execution element 0 should
    // be the tableID and element 1 should be the results of havenp().
    var results = result.split(' ');
    //alert(results)
    //Make sure proper cell is selected.
    var parentTable = document.getElementById(results[0]);
    JPSLUtils.select_containing_cell(parentTable);
    Jupyter.notebook.select_next(true);
    Jupyter.notebook.focus_cell();
    if (results[2]!='True'){
        var templine = 'import numpy as np # numpy not imported previously.';
        JPSLUtils.insert_text_at_beginning_of_current_cell(templine);
    }
    var execstr = '"'+results[0]+'","'+results[1]+'",str(input_table.JPSLUtils.havepd())';
    //alert('fixnp_checkpd: '+execstr);
    JPSLUtils.executePython(execstr).then(result => fixpd_makeDF(result));
}

function fixpd_makeDF(result){
    // result is comma separate list from the last execution element 0 should
    // be the tableID and element 2 should be the results of havepd().
    var results = result.split(' ');
    //Make sure proper cell is selected.
    var parentTable = document.getElementById(results[0]);
    JPSLUtils.select_containing_cell(parentTable);
    Jupyter.notebook.select_next(true);
    Jupyter.notebook.focus_cell();
    if (results[2]!='True'){
        var templine = 'import pandas as pd # pandas not imported previously.';
        JPSLUtils.insert_newline_at_end_of_current_cell(templine);
    }
     //info = dialog.querySelectorAll('#post_pr_info')[0].innerHTML;
     //dialog.remove();
 //    <code to use the items in values and post_pr_info> //order of items is
 //    the same as the fields list.
    var rows = parentTable.querySelectorAll('tr');
    var nrows = rows.length;
    var ncols = rows[0].querySelectorAll('th').length;
    var colnames = [];
    var escnamestr = []
    var data = [];
    //sort data into columns
    for(var i=1;i<ncols;i++){
        var classstr='.c'+i
        colnames[i-1]=rows[0].querySelector(classstr).querySelector(".table_label").innerHTML;
        escnamestr[i-1] = colnames[i-1].replaceAll(' ','_').replaceAll('(','_')
        .replaceAll(')','_').replaceAll('/','_').replaceAll('*','_').replaceAll('+','_')
        .replaceAll('-','_').replaceAll('^','_').replaceAll('$','')
        .replaceAll('{','_').replaceAll('}','_');
        var tempcol =[];
        for (var k=1;k<nrows;k++){
            classstr = '.r'+k+'.c'+i;
            tempcol[k-1] = rows[k].querySelector(classstr).querySelector(".data_cell").innerHTML;
            alphare = /[a-zA-Z]/
            if (alphare.test(tempcol[k-1])){
                tempcol[k-1]='\''+tempcol[k-1]+'\'';
            }
            if (tempcol[k-1]==''){
                tempcol[k-1]='np.nan';
            }
            nanre = /np\.nan/i
            if(nanre.test(tempcol[k-1])){
                tempcol[k-1]='np.nan';
            }

        }
        data[i-1]=tempcol;
    }
    //get indexes if they are not just numeric
    use_indexes = false;
    var indexes = [];
    for (var i = 1; i < nrows;i++){
        var classstr = '.r'+i+' .c0';
        indexes[i-1] = parentTable.querySelector(classstr).querySelector(".table_label").innerHTML;
        if (indexes[i-1] != (i-1)){use_indexes = true;}
    }
    var pythoncode = "";
    var dataframe_param = "{\""+colnames[0]+"\":"+escnamestr[0]+",\n";
    for (var i=0;i<(ncols-1);i++){
        pythoncode += escnamestr[i]+"=["+data[i]+"]\n";
        if (i>0){dataframe_param +="    \""+colnames[i]+"\":"+escnamestr[i]+",\n";}
    }
    dataframe_param +="    }"
    if (use_indexes){
        dataframe_param +=", index = [";
        for (var i = 0; i < indexes.length;i++){
            dataframe_param += "\""+indexes[i]+"\", ";
        }
        dataframe_param += "]";
    }
    pythoncode += results[1]+ "= pd.DataFrame("+dataframe_param+")\n";
    pythoncode += "print('DataFrame `"+results[1]+"`:')\n";
    pythoncode += results[1];


    // Insert code into cell. Load with Python code that is non-coder readable.
    //Make sure the proper cell is still selected.
    JPSLUtils.select_containing_cell(parentTable);
    Jupyter.notebook.select_next(true);
    Jupyter.notebook.focus_cell();

    // Run the cell to create the DataFrame.
    JPSLUtils.insert_newline_at_end_of_current_cell(pythoncode);
   Jupyter.notebook.get_selected_cell().execute();
 }


function data_table_to_Pandas(tableID){
    // Use dialog to get user choice for name of the DataFrame. Assumes Pandas import as `pd`.
    var instructions = "Provide a one-word name for the Pandas DataFrame:";
    var fields = ["Name"];
    var fieldlen = [30];
    //input_dialog("DFName_dia", table_data_to_named_DF, tableID, instructions,fields);
    var tempdialog = document.createElement('div');
    tempdialog.setAttribute('id',"DFName_dia");
    var tempinstr = document.createElement('H4');
    tempinstr.setAttribute('style','text-align:center;');
    tempinstr.innerHTML = instructions;
    tempdialog.append(tempinstr);
    for (var i = 0; i < fieldlen.length;i++){
        var templine=document.createElement('div');
        var inputstr = fields[i]+': ';
        inputstr +='<input type="text" size="'+fieldlen[i]+'" value="" ';
        inputstr += 'onblur="record_input(this)"></input>';
        templine.innerHTML=inputstr;
        templine.setAttribute('style','text-align:center;');
        tempdialog.append(templine);
    }
    $(tempdialog).dialog({modal:true,
                  close: function(){$(this).dialog('destroy')},
                  buttons:[
                  {text: 'Cancel',
                  click: function(){$(this).dialog('destroy')}},
                  {text: 'OK/Do It',
                  click: function(){var DFname = tempdialog.querySelector('input').value;
                                   checkfornumpy_startTblToDF(tableID, DFname);
                                   $(this).dialog('destroy');}}
                  ]
    })
    Jupyter.notebook.focus_cell();//Make sure keyboard manager doesn't grab inputs.
    Jupyter.notebook.keyboard_manager.enabled=false;
    tempdialog.focus();
    Jupyter.notebook.keyboard_manager.enabled=false; //Make sure keyboard manager doesn't grab inputs.
}

function csv_to_data_table(csv){
/**
* @param csv comma separated string of values each row ending with a '\n'.
*   First row and column interpreted as headers.
*
*   This creates the code to put into a Jupyter code cell to create the table
*   and then executes the cell. This is very similar to create_table, but
*   including values in the cells.
**/
    var prestr = input_table_prestr()
    var d = new Date();
    var ID = "it_"+(Math.round(d.getTime()));
    var labelClass = "table_label";
    var dataCellClass="data_cell";
    var menu = table_menu(ID);
//TODO: Complete csv to data table JS?

}