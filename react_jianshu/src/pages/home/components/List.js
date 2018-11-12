import React, { Component } from 'react'

import { ListItem, ListInfo } from '../style'

class List extends Component {
  render () {
    return (
      <ListItem>
        <img className='pic'  src="//upload-images.jianshu.io/upload_images/12588682-7e4a8060438d6ff1?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240" alt=""/>
        <ListInfo>
          <h3 className='title'>Python 彻底甩掉 Java，位居 48 种编程语言之首！</h3>
          <p className='dec'>昨日，IEEE Spectrum 杂志发布了一年一度的编程语言排行榜。Python再次居首！而Java则被甩到第四位。 IEEE 的榜单结合 9...</p>
        </ListInfo>
      </ListItem>
    )
  }
}

export default List
