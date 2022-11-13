import React, {useEffect, useState} from "react";
import {BLOCK_SIZE, FIELD_SIZE} from "../utils/Const";


function distance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

function createSnake(s, prev) {
    let result = []
    s = [...s].reverse()
    for (let index = 0; index < s.length; index++) {
        let item = {
            key: `snake_${index}`,
            position: s[index],
            headClass: index === 0 ? "head" : "",
            isHead: index === 0,
            isAnimation: (prev?.[result.length]?.position == null || distance(prev[result.length].position, s[index]) <= 2),
        }
        result.push(item)
        if (index !== 0) {
            item = {
                key: `snake_${index - 1}-5`,
                position: {
                    x: Math.abs(s[index - 1].x - s[index].x) < 2 ? (s[index - 1].x + s[index].x) / 2 : s[index].x,
                    y: Math.abs(s[index - 1].y - s[index].y) < 2 ? (s[index - 1].y + s[index].y) / 2 : s[index].y,
                },
                headClass: "",
                isAnimation: (prev?.[result.length]?.position == null || distance(prev[result.length].position, s[index]) <= 2),
            }

            result.push(item)
        }
    }
    return result
}

function Snake({rawSnake, speed}) {

    const [snake, setSnake] = useState(createSnake(rawSnake?.s))

    useEffect(() => {
        setSnake(prev => createSnake(rawSnake.s, prev))
    }, [rawSnake])


    return (
        <>
            {
                snake.map(c =>
                    <div
                        id={c.key}
                        key={c.key}
                        className={`snake ${c.headClass}`}
                        style={{
                            top: c.position.x * BLOCK_SIZE + 'px',
                            left: c.position.y * BLOCK_SIZE + 'px',
                            width: BLOCK_SIZE,
                            height: BLOCK_SIZE,
                            transitionProperty: c.isAnimation ? 'top, left' : 'none',
                            transitionDuration: 1000 / speed + 'ms',
                            transitionTimingFunction: 'linear',
                            zIndex: c.isHead ? "2" : "1",
                            borderRadius: '10px'
                        }}>
                    </div>
                )
            }
        </>
    )
}

function Point({position}) {

    return (<div style={{
        position: 'absolute',
        top: position.x * BLOCK_SIZE + 'px',
        left: position.y * BLOCK_SIZE + 'px',
        width: BLOCK_SIZE,
        height: BLOCK_SIZE,
        backgroundColor: 'red',
        borderRadius: '10px'
    }}/>)
}


export default function Field({snake, point, speed, onAnimationEnd}) {

    return (<div className="border" style={{
        width: FIELD_SIZE * BLOCK_SIZE, height: FIELD_SIZE * BLOCK_SIZE, position: 'relative'
    }}>
        <Point position={point}/>
        <Snake rawSnake={snake} speed={speed} onAnimationEnd={onAnimationEnd}/>

    </div>)

}
