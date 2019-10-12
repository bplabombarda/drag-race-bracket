import React from 'react'
import { any } from 'prop-types'

module.exports = new Proxy({}, {
  get: (target, property) => {
    const Mock = (props) => (
      <span { ...props } className={ property }>
        { props.children }
      </span>
    )

    Mock.displayName = property
    Mock.propTypes = {
      children: any,
    }

    return Mock
  },
})
