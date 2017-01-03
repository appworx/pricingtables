/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global fakewaffle */

var spreadsheetID = "1ad7hOzasjT4Uo4EKWaXmk6Jz90-Da1366-RjtqxBubI";

$(document).ready(function () {

    for (var i = 1; i <= 5; i++) {
        loadTab(i);
    }

    fakewaffle.responsiveTabs(['xs', 'sm']);
});

function loadTab(id) {
    var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/" + id + "/public/values?alt=json";

    $('#' + id).append('<div id="no-more-tables">'
            + '<table class="col-md-12 table-bordered table-striped table-condensed">'
            + '<thead>'
            + '<tr>'
            + '<th>Plot Size (sq yd)</th>'
            + '<th>Total Price of Plot (PKR)</th>'
            + '<th>Down Payment (25%)</th>'
            + '<th>18 Months Installments</th>'
            + '<th>6 Quarterly Installments</th>'
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
                        + '<td data-title="Plot Size">' + this.gsx$plotsizesqyd.$t + '</td>'
                        + '<td data-title="Total / Plot">' + this.gsx$totalpriceofplotpkr.$t + '</td>'
                        + '<td data-title="Down Payment">' + this.gsx$downpayment25.$t + '</td>'
                        + '<td data-title="Monthly Inst.">' + this.gsx$monthsinstallments.$t + '</td>'
                        + '<td data-title="Quarterly Inst.">' + this.gsx$quarterlyinstallments.$t + '</td>'
                        + '</tr>');
            });
        } else {
            $('#content' + id).append('<tr>'
                    + '<td colspan=5>SOLD OUT</td>'
                    + '</tr>');
        }
    });
}