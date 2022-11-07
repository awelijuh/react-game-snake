import React, {useEffect, useState} from "react";
import Field from "./Field";
import {Snake} from "../utils/Snake";
import {BLOCK_SIZE, FIELD_SIZE} from "../utils/Const";
import {generatePoint} from "../utils/Utils";


export default function Game(props) {
    const [snake, setSnake] = useState(new Snake(FIELD_SIZE, FIELD_SIZE, 15, 15))
    const [run, setRun] = useState(false)
    const [s, setS] = useState(snake.s)
    const [speed, setSpeed] = useState(2)
    const [point, setPoint] = useState(generatePoint(s))
    const [speedFactor, setSpeedFactor] = useState(1)

    function handleKey(key) {
        let dx = 0
        let dy = 0
        if (key.keyCode === 38) {
            dx = -1
        } else if (key.keyCode === 40) {
            dx = 1
        } else if (key.keyCode === 37) {
            dy = -1
        } else if (key.keyCode === 39) {
            dy = 1
        }
        if (dx !== 0 || dy !== 0) {
            if (snake.isDirectionEquals(dx, dy)) {
                setSpeedFactor(2)
            } else {
                setSpeedFactor(1)
            }
            snake.updateDirection(dx, dy)
            setRun(true)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('keydown', handleKey);
        };
    }, [snake]);

    useEffect(() => {
        if (run) {
            const interval = setInterval(() => {
                console.log('point', point)
                snake.move(0, 0, p => p.x === point.x && p.y === point.y)
                if (snake.s.at(-1).x === point.x && snake.s.at(-1).y === point.y) {
                    setPoint(generatePoint(snake.s))
                    setSpeed(s => Math.min(s + 1, 30))
                }
                setS([...snake.s])
                setSpeedFactor(1)
            }, 1 / (speed * speedFactor) * 1000)
            return () => clearInterval(interval)
        }
    }, [speed, run, point])


    return (
        <div>
            <div className="d-flex mt-4">
                <div className="m-auto">
                    <Field speed={speed * speedFactor} point={point} snake={s} width={FIELD_SIZE} height={FIELD_SIZE} blockSize={BLOCK_SIZE}/>
                </div>
            </div>
        </div>
    )

}


