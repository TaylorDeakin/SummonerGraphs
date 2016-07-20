module.exports = {
    matchedSelect: function (arrayText, arrayValues, selected) {
        var resultString = "";
        var text = arrayText.split(',');
        var values = arrayValues.split(',');
        for(var i = 0; i < text.length; i++){
            if(values[i] == selected){
                resultString += '<option selected value="' + values[i] + '">' + text[i] + "</option>";
            } else {
                resultString += '<option value="' + values[i] + '">' + text[i] + "</option>";
            }
        }

        return resultString;
    }
}