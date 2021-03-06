function $(selector, context) {
    return (context || document).querySelector(selector)
}

$.all = function (selector, context) {
    return Array.prototype.slice.call (
        (context || document).querySelectorAll(selector)
    )
}

var ul = document.createElement('ul'),
    current = 'NoFilter',
    vision = {
        NoFilter: '',
        'HueRotate': '6%',
        'TrueColor': '6%',
        'Protanopia-Red': '6%',
        'Deuteranopia-Green': '6%',
        'Tritanopia-Blue': '6%',
        "BlackWhite": '6%',
    }

Object.keys(vision).forEach(function (el) {
    var li = document.createElement('li')
    li.dataset['type'] = el
    li.textContent = el
    li.addEventListener('click', handler, false)
    el == current && li.classList.add('current')
    ul.appendChild(li)
})

document.body.appendChild(ul)

function handler(e) {
    current = this.dataset['type']
    $.all('li').forEach(function(li) {
        li.classList.remove('current')
    })
    this.classList.add('current')
    chrome.tabs.insertCSS(null, { code: 'html { -webkit-filter: url(#' + current + '); }'})
}