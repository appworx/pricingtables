/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//?id = 1ad7hOzasjT4Uo4EKWaXmk6Jz90 - Da1366 - RjtqxBubI & sheet = Sector - A
/* global fakewaffle */
var appScriptUrl = 'https://script.google.com/macros/s/AKfycbypaRmiL4eD7p-AZh6iTfrz49A_DAQ0EdL73vUV9mSokoXVIkI/exec';
var spreadsheetID = "1ad7hOzasjT4Uo4EKWaXmk6Jz90-Da1366-RjtqxBubI";
var sheetNames = ['Sector-A', 'Sector-B', 'Sector-C', 'Sector-D', 'Sector-E'];
var emptySheetMarker = 'SOLD OUT';

$(document).ready(function () {

    for (var i = 0; i < 5; i++) {
        loadTab(i + 1, sheetNames[i]);
    }

    fakewaffle.responsiveTabs(['xs', 'sm']);
});

function loadTab(id, sheet) {
    var url = appScriptUrl + '?id=' + spreadsheetID + '&sheet=' + sheet + '&callback=?';
    var columnNames = [];

    $.getJSON(url, function (entry) {

        if (entry) {
            $(entry).each(function () {
                var row = entry[sheet];

                if (columnNames.length === 0 && row.length > 0) {
                    var columnsIn = row[0];

                    for (var key in columnsIn) {
                        columnNames.push(key);
                    }

                    var html = '<div id="no-more-tables">'
                            + '<table class="col-md-12 table-bordered table-condensed">'
                            + '<thead>'
                            + '<tr>';

                    $(columnNames).each(function (columnId) {
                        html += '<th>' + columnNames[columnId].toString().replace(/_/g, ' ') + '</th>';
                    });

                    html += '</tr>'
                            + '</thead>'
                            + '<tbody id="content' + id + '">'
                            + '</tbody>'
                            + '</table>'
                            + '</div>';

                    $('#' + id).append(html);
                } else {
                    console.log("No columns");
                }

                $(row).each(function (rowId) {
                    html = '<tr>';

                    $(columnNames).each(function (columnId) {
                        var cellValue = row[rowId][columnNames[columnId]];

                        if (cellValue === emptySheetMarker) {
                            html += '<td class="responsive-cell cell-centered text-center" colspan="5" >' + cellValue + '</td>';
                            
                            return false;
                        } else if (columnId === 0) {
                            html += '<td class="responsive-cell header-cell" data-title="' + columnNames[columnId].toString().replace(/_/g, ' ') + '">' + cellValue + '</td>';
                            
                            return true;
                        }

                        html += '<td class="responsive-cell" data-title="' + columnNames[columnId].toString().replace(/_/g, ' ') + '">' + cellValue + '</td>';
                    });

                    html += '</tr>';

                    $('#content' + id).append(html);
                });

            });
        } else {
            $('#' + id).append('<img src="https://d13yacurqjgara.cloudfront.net/users/383/screenshots/419345/sold-out-sign.png" alt="Sold out sign">');
        }
    });
}