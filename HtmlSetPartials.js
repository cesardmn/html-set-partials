class HtmlSetPartials {
  constructor() {
    this._html = document.querySelector('html')
    Object.freeze(this)
  }

  setIncludes() {
    let templateTags = this._getTemplateTags()
    templateTags.forEach(templateTag => this._setTamplateTag(templateTag))
  }

  _getTemplateTags() {
    let pattern = /\{\%\s*include\s*('|").+\.html\s*\1\s*\%\}/gm
    let target = this._html.innerHTML
    return this._listMatch(pattern, target)
  }


  async _setTamplateTag(templateTag) {
    let fileName = this._getFileName(templateTag)
    let fileContent = await (await fetch(fileName)).text()
    let new_html = this._html.innerHTML.replace(templateTag, fileContent)
    this._html.innerHTML = new_html
  }

  _getFileName(templateTag) {
    let pattern = /'\s*.+\.html\s*'/g
    return (this._listMatch(pattern, templateTag)[0]).slice(1, -1)
  }


  _listMatch(regex, string) {
    let result = []
    let matchs = null
    while (matchs = regex.exec(string)) {
      result.push(matchs[0])
    }
    return result
  }

}

const htmlSetPartial = new HtmlSetPartials()
htmlSetPartial.setIncludes()
