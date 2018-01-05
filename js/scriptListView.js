var startX;
var itemArray = ["Example 1", "Example 2", "Example 3", "Example 4", "Example 5", "Example 6", "Example 7",
    "Example 8", "Example 9", "Example 10"];

// Facilitates the back navigation functionality.
function goBack() {
    window.history.back();
}

// Returns img tag for diamond/item image
function getItemImage() {
    return "<img src=\"../images/logo-symbol1.png\" class=\"itemImage\"   alt=\"diamond\">";
}

// Created and return img tag for delete/trash-can image
function getDeleteImage(id) {
    var deleteId = id
    var imgTag = "<img src=\"../images/delete.png\" class=\"deleteImage\"   alt=\"Trash Can\"";
    imgTag += "id=" + deleteId + " onclick=deleteSelectedItem(" + deleteId + ") >";
    return imgTag;
}

// Delete seleted item for itemArray
function deleteSelectedItem(deleteId) {
    cleanListview()
    if (deleteId > -1) {
        itemArray.splice(deleteId, 1);
        populateListView();
    }
}

//  Clean and prepare list view page for populateListView()
function cleanListview() {
    var parent = document.getElementById("parent").getElementsByTagName("div");
    var children = document.getElementsByClassName("listContainer");
    var childLen = parent.length;
    for (var i = (childLen - 1); i >= 0; i--) {
        if (parent[i].className.toLowerCase() == "listcontainer") {
            parent[i].parentNode.removeChild(parent[i]);
        }
    }
}

// Populate list view with items
function populateListView() {
    var text;
    if (itemArray.length == 0) {
        var newDiv = document.createElement("div");
        newDiv.className = "noItems";
        text = "<i>No Items.. </i>";
        newDiv.innerHTML = text;
        document.body.appendChild(newDiv);
    } else {
        for (i = 0; i < itemArray.length; i++) {
            if (itemArray[i] != null) {
                var newDiv = document.createElement("div");
                newDiv.className = "listContainer";
                text = getItemImage() + "<span class=\"itemList\" id = \"item" + i + "\" style=\"width:81%\" >"
                    + itemArray[i] + "</span>" + getDeleteImage(i);
                newDiv.innerHTML = text
                document.body.appendChild(newDiv);
            }
        }
    }
}

// Register touch and get the coordinates for first touch.
function touchStart(e) {
    var target = e.target;
    startX = e.touches[0].clientX;
    var targetDeleteId = target.getAttribute("id");
    var itemDeleteArray = document.getElementsByTagName("span");
    for (i = 0; i < itemDeleteArray.length; i++) {
        if (target.className != "deleteImage") {
            itemDeleteArray[i].style.width = '86%';
        }
    }
}

// Registers touch and reduce span width as touch moves.
function touchMove(e) {
    var target = e.target;
    var touch = e.touches[0];
    if (target.className == "itemList") {
        var change = startX - touch.clientX;
        var targetDeleteId;
        if (target != null) {
            targetDeleteId = target.getAttribute("id");
            if (change > 0 && change < 40) {
                document.getElementById(targetDeleteId).style.width = 86 - change + '%';
                document.getElementById(targetDeleteId).parentElement.getElementsByClassName("deleteImage").item(0).style.visibility = 'vissible';
            } else if (change < 0) {
                document.getElementById(targetDeleteId).style.width = '86%';
            }

        }
    }
    e.preventDefault();
}

document.querySelector("body").addEventListener('touchstart', touchStart, false);
document.querySelector("body").addEventListener('touchmove', touchMove, false);