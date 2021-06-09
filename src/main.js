class Tag {
    constructor(url) {
        this.url = url
    }

    getTagName() {
        return this.getSimpleUrl()[0]
    }

    getUrl() {
        return this.url
    }

    getSimpleUrl() {
        let resultUrl = this.url
        if (this.url.indexOf("https") !== -1) {
            resultUrl = resultUrl.replace("https://", '')
        }
        let replace = resultUrl.replace("http://", '')
            .replace("www.", '')
        let lastIndexOf = replace.lastIndexOf(".");
        return replace.substr(0, lastIndexOf);
    }
}

let tagList = [new Tag("https://developer.mozilla.org")]

let $addImg = $('.addImg')[0]
$addImg.addEventListener('click', () => {
    let promptUrl = prompt("请输入要添加的网址");
    while (promptUrl === '' || promptUrl === null) {
        alert('地址不能为空')
        promptUrl = prompt("请输入要添加的网址");
    }
    if (promptUrl.indexOf("http") === -1) {
        promptUrl = "https://" + promptUrl
    }
    let tag = new Tag(promptUrl)
    render(tag)
    tagList.push(tag)
    console.log(tagList)
    console.log(JSON.stringify(tagList))
    console.log(tagList.toString())
})

let createSite = tag => {
    return $(`<li> 
                        <div class="site">
                            <div class="markName">${tag.getTagName()}</div>
                            <div class="targetUrl">${tag.getSimpleUrl()}</div>
                        </div>
                    </li>`)[0]

}
let render = tag => {
    let $newSite = createSite(tag);

    $('.linkList')[0].insertBefore($newSite, $('.addSite')[0])

    $newSite.addEventListener('click', () => {
        window.open(tag.url)
    })
    return $newSite
}
const data = localStorage.getItem('data')
if (data !== null) {
    tagList = JSON.parse(data);
    console.log(tagList)
}
tagList.forEach(tag => {
    if ('url' in tag) {
        render(new Tag(tag.url))
    }
})

window.onbeforeunload = () => {
    const string = JSON.stringify(tagList)
    localStorage.setItem('data', string)
}


