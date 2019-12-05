import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { css } from "astroturf"

const styles = css`
  .list {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .listItem {
    margin: 0.5rem;
  }
`

export const List = ({ items, renderItem, itemClass }) => (
  <ul className={styles.list}>
    { items.map((item, index) => (
      <li className={classNames(styles.listItem, itemClass)} key={`list-item-${index}`}>
        { renderItem(item) }
      </li>
    )) }
  </ul>
)

List.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  itemClass: PropTypes.string
}
