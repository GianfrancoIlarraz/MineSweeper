import { useEffect, useState } from 'react'
import '../style/container.scss'
import CreateBoard from '../utils/CreateBoard'
import Cell from './Cell'
import { revealed } from '../utils/reveal'
import 'animate.css'

const Board = () => {

    const [grid, setGrid] = useState([])
    const [nonMineCount, setNonMineCount] = useState(0)
    const [mineLocations, setMineLocations] = useState([])
    const [won, setWon] = useState(false)

    // ComponentDidMount
    useEffect(function freshBoard() {
        const newBoard = CreateBoard(10, 10, 20)
        setNonMineCount(10 * 10 - 20)
        setMineLocations(newBoard.mineLocation)
        setGrid(newBoard.board)
    }, [])

    // On Right Click
    const updateFlag = (e, x, y) => {
        e.preventDefault()
        let newGrid = JSON.parse(JSON.stringify(grid))
        newGrid[x][y].flagged = !newGrid[x][y].flagged;
        console.log(newGrid[x][y].flagged)
        setGrid(newGrid)
    }



    // Reveal Cell
    // On Left Click
    const revealCell = (x, y) => {
        let newGrid = JSON.parse(JSON.stringify(grid))
        if (newGrid[x][y].value === 'X') {
            alert('Mine found');
            for (let i = 0; i < mineLocations.length; i++) {
                newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true
            }
            setGrid(newGrid)
        } else {
            if (!newGrid[x][y].revealed) {
                let newRevealedBoard = revealed(newGrid, x, y, nonMineCount)
                setGrid(newRevealedBoard.arr)
                setNonMineCount(newRevealedBoard.newNonMinesCount)
                if (nonMineCount == 1) {
                    setWon(true)
                }
            }
        }


    }

    const easy = () => {
        const newGrid = CreateBoard(5, 5, 5)
        setGrid(newGrid.board)
        setMineLocations(newGrid.mineLocation)
        setNonMineCount(5 * 5 - 5)
    }

    const medium = () => {
        const newGrid = CreateBoard(10, 10, 25)
        setGrid(newGrid.board)
        setMineLocations(newGrid.mineLocation)
        setNonMineCount(10 * 10 - 25)
    }

    const hard = () => {
        const newGrid = CreateBoard(20, 20, 100)
        setGrid(newGrid.board)
        setMineLocations(newGrid.mineLocation)
        setNonMineCount(20 * 20 - 100)
    }

    if (!grid) {
        return <div>Loading...</div>
    }





    return (
        <div className='container'>
            <div className='difficulty'>
                <button onClick={() => easy()}>Easy</button>
                <button onClick={() => medium()}>Medium</button>
                <button onClick={() => hard()}>Hard</button>
            </div>
            {grid.map(singleRow => {
                return (
                    <div className='grid' key={3}>
                        {singleRow.map(singleBlock => {
                            return <Cell details={singleBlock} updateFlag={updateFlag} revealCell={revealCell} key={0} />
                        })}
                    </div>
                )
            })}
            <div className='remaining'>
                {
                    nonMineCount !== 0 ? <h2>Cells remaining: {nonMineCount}</h2> : <button className='playAgain animate__animated animate__wobble' onClick={() => medium()}>Volver a jugar</button>
                }
            </div>
            {
                won && <div>
                    <div className='winBack'>
                    </div>
                    <div className='win'>
                        <h2 className='winText'>Congratulations, you won</h2>
                        <div className='winButtons'>
                            <button className='playAgain animate__animated animate__wobble' onClick={() => {setWon(false);medium()}}>Play Again</button>
                            <button className='playAgain animate__animated animate__wobble' onClick={() => setWon(false)}>Quit</button>
                        </div>
                    </div>
                </div>
            }


        </div>
    )
}

export default Board