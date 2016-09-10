CollapsibleLists.apply();
// loop over the unordered list elements with the node
var uls = document.getElementsByTagName('ul');
for (var index = 0; index < uls.length; index ++){
    // find the parent list item of this unordered list
    var li = uls[index];

    // style the unordered list if it is directly within this node
    uls[index].style.display = 'block';

}
var lis = document.getElementsByTagName('li');
// remove the current class from the node
for (var index = 0; index < lis.length; index ++){
if (lis[index].className != undefined) {
lis[index].className =
            lis[index].className.replace(
                /(^| )collapsibleList(Open|Closed)( |$)/, '');
}
    var uls = lis[index].getElementsByTagName('ul');
    // if the node contains unordered lists, set its class
    if (uls.length > 0){
        lis[index].className += ' collapsibleListOpen';
    }
}
