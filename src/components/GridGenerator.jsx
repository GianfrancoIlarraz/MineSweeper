import React, { useEffect, useState } from 'react'
import '../style/grid.scss'


const GridGenerator = () => {

    class cellObject {
        constructor(key, x, y) {
            this.value = 0;
            this.revealed = false;
            this.x = x;
            this.y = y;
            this.flagged = false;
            this.key = key;
        }
    }



const generateGrid = () => {
    const grid = [];

    for (let i = 0; i < 10; i++) {
        grid.push([])
    }

    let key = 0

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            grid[i].push(new cellObject(key, i, j))
            key++
        }
    }
    console.log(grid);


    let bombCount = 0;
    while (bombCount < 10){
        let x = Math.floor(Math.random()*10);
        let y = Math.floor(Math.random()*10);

        if (grid[x][y].value === 0) {
            grid[x][y].value = 'X'
            bombCount++
        }
    }
    return grid
}

    const grid = generateGrid()


    // const reveal = (cell) => {
    //     cell.revealed = true;
    //     console.log(cell);
    // }
    
  
    




    return (
        <div>
            {grid.map((cell) => <div className='cell' key={cell[0].key}>{
                cell.map((cell2) => <div className='cell2'  key={cell2.key}>
                    {
                        cell2.revealed ? <span>{cell2.value}</span> : <span onClick={() => {reveal(cell2)}}>?</span>
                    }

                </div>)
            }</div>)}
        </div>
    )
}

export default GridGenerator