/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global fakewaffle */

var spreadsheetID = "1ad7hOzasjT4Uo4EKWaXmk6Jz90-Da1366-RjtqxBubI";
var columnNames = ['Plot Size (sq yd)', 'Total Price of Plot (PKR)', 'Down Payment (25%)', '18 Months Installments', '6 Quarterly Installments'];
$(document).ready(function () {

    for (var i = 1; i <= 5; i++) {
        loadTab(i);
    }

    fakewaffle.responsiveTabs(['xs', 'sm']);
});

function loadTab(id) {
    var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/" + id + "/public/values?alt=json";

    $('#' + id).append('<div id="no-more-tables">'
            + '<table class="col-md-12 table-bordered table-condensed">'
            + '<thead>'
            + '<tr>'
            + '<th>' + columnNames[0] + '</th>'
            + '<th>' + columnNames[1] + '</th>'
            + '<th>' + columnNames[2] + '</th>'
            + '<th>' + columnNames[3] + '</th>'
            + '<th>' + columnNames[4] + '</th>'
            + '</tr>'
            + '</thead>'
            + '<tbody id="content' + id + '">'
            + '</tbody>'
            + '</table>'
            + '</div>');

    $.getJSON(url, function (data) {
        var entry = data.feed.entry;

        if (entry) {
            $(entry).each(function () {
                $('#content' + id).append('<tr>'
                        + '<td class="responsive-cell header-cell" data-title="' + columnNames[0] + '">' + this.gsx$plotsizesqyd.$t + '</td>'
                        + '<td class="responsive-cell" data-title="' + columnNames[1] + '">' + this.gsx$totalpriceofplotpkr.$t + '</td>'
                        + '<td class="responsive-cell" data-title="' + columnNames[2] + '">' + this.gsx$downpayment25.$t + '</td>'
                        + '<td class="responsive-cell" data-title="' + columnNames[3] + '">' + this.gsx$monthsinstallments.$t + '</td>'
                        + '<td class="responsive-cell" data-title="' + columnNames[4] + '">' + this.gsx$quarterlyinstallments.$t + '</td>'
                        + '</tr>');
            });
        } else {
            $('#content' + id).append('<tr>'
                    + '<td colspan="5" class="cell-centered text-center">SOLD OUT</td>'
                    + '</tr>');
        }
    });
}