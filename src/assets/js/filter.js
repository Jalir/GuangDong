const extractText = (value) => {
  value = value.replace(/<p><br><\/p>/g, '')
  value = value.replace(/<p class="video-play-area".*?<\/video><\/p>/g, '')
  value = value.replace(/<blockquote>.*?<\/blockquote>/g, '')
  value = value.replace(/<strong>.*?<\/strong>/g, '')
  value = value.replace(/<\/p><p><img data-key=.*?<\/p>/g, '')
  value = value.replace(/<p style="text-align: left;">/g, '')
  value = value.replace(/<imgsrc=".*?100%;">/g, '')
  let index = value.indexOf('<p style="text-align: justify;">')
  if (index !== -1) {
    value = value.slice(0, index)
  }
  index = value.indexOf('<p>来源：广东广播电视台')
  if (index !== -1) {
    value = value.slice(0, index)
  }
  index = value.indexOf('<h1 style="text-align: left;">原标题')
  if (index !== -1) {
    value = value.slice(0, index)
  }
  value = value.replace(/<h1>(.*?)<\/h1>/g, '')
  value = value.replace(/<p>/g, '')
  value = value.replace(/<\/p>/g, '')
  value = value.replace(/&nbsp;/g, '')
  value = value.replace(/ /g, '')
  value = value.replace(/<imgdata-key.*?>/g, '')
  return value
}

const removeVideoTag = (content) => {
  content = content.replace(/<p class="video-play-area".*?<\/video><\/p>/g, '')
  content = content.replace(/style="max-height: 100%;max-width: 100%;"/g, 'style="max-width: 100%; display: flex; justify-content: center; align-items: center";')
  content = content.replace(/<h1 style="text-align: left;">/g, '<h1 style="color: #A43754; font-size: 20rpx">')
  content = content.replace(/<h1>/g, '<h1 style="color: #581D26; font-size: 30rpx">')
  content = content.replace(/<p><br><\/p>/g, '')
  return content
}

const dataMoment = (t = new Date(), type, format) => {
  const newType = type || 'normal'
  t = new Date(t)
  const year = t.getFullYear()

  let month = (t.getMonth() + 1)

  let date = t.getDate()
  date = (date + '').padStart(2, '0')

  let hour = t.getHours()
  hour = (hour + '').padStart(2, '0')

  let min = t.getMinutes()
  min = (min + '').padStart(2, '0')

  let se = t.getSeconds()
  se = (se + '').padStart(2, '0')
  if (newType === 'normal') {
    month = (month + '').padStart(2, '0')
    return month + '-' + date + ' ' + hour + ':' + min + ':' + se
  }
  if (format) {
    return `${year}-${month}-${date}`
  }
  return `${month}月${date}日`
}

module.exports = {
  extractText,
  removeVideoTag,
  dataMoment
}
