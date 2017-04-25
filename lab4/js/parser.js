'use strict';

var XHRequest = 'onload' in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
var xhr = new XHRequest();

var path = './xml/subjects.xml';
xhr.open('GET', path, true);

xhr.onload = function() {
    var respXML = this.responseXML;
    var mainContainer = document.getElementById('root');
    var subjectsArr = respXML.getElementsByTagName('subject');

    for (var i = 0; i < subjectsArr.length; i++) {
        var subContainer = document.createElement('div');
        subContainer.classList.add('subject');

        var subName = document.createElement('h3');
        subName.classList.add('subject__name');
        var name = subjectsArr[i].getElementsByTagName('name')[0].innerHTML;
        subName.innerHTML = name;
        subContainer.appendChild(subName);

        var subRoom = document.createElement('p');
        subRoom.classList.add('subject__room');
        var room = subjectsArr[i].getElementsByTagName('room')[0].innerHTML;
        subRoom.innerHTML = room;
        subContainer.appendChild(subRoom);

        var subTeacher = document.createElement('p');
        subTeacher.classList.add('subject__teacher');
        var teacher = subjectsArr[i].getElementsByTagName('teacher')[0].innerHTML;
        subTeacher.innerHTML = teacher;
        subContainer.appendChild(subTeacher);

        mainContainer.appendChild(subContainer);
    }
};

xhr.onerror = function() {
    console.log('Error! ' + this.status + ':' + this.statusText);
};

xhr.send();
