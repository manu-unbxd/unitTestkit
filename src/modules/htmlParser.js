 const htmlParser = function(htmlTxt) {
    var d = document.createElement('div');
    d.innerHTML = htmlTxt;
    return d.firstChild;
};
export default htmlParser;
