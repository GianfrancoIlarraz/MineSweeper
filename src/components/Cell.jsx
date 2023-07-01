/* eslint-disable react/prop-types */
import '../style/container.scss'

const Cell = ({ details, updateFlag, revealCell }) => {
    return (
        <div
            onClick={() => revealCell(details.x, details.y)}
            onContextMenu={(e) => updateFlag(e, details.x, details.y)}
            className={`cell ${details.revealed ? 'revealedCell' : ""}`}>
            {details.revealed ? details.value : ''}
        </div>
    )
}

export default Cell