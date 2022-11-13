import React, {useEffect, useState} from "react";
import Field from "./Field";
import {Snake} from "../utils/Snake";
import {BLOCK_SIZE, FIELD_SIZE, MAX_SPEED} from "../utils/Const";
import {generatePoint} from "../utils/Utils";
import {Button} from "react-bootstrap";
import {useSwipeable} from "react-swipeable";

function isDirectionEquals(d1, d2) {
    return d1.dx === d2.dx && d1.dy === d2.dy
}

function isDirectionOpposite(d1, d2) {
    return d1.dx === -d2.dx && d1.dy === -d2.dy
}


export default function Game(props) {
    const [snake, setSnake] = useState(new Snake(FIELD_SIZE, FIELD_SIZE, Math.floor(FIELD_SIZE / 2), Math.floor(FIELD_SIZE / 2)))
    const [run, setRun] = useState(false)
    const [speed, setSpeed] = useState(2)
    const [point, setPoint] = useState(generatePoint(snake.s))
    const [direction, setDirection] = useState({dx: 1, dy: 0})
    const [step, setStep] = useState(0)
    const [score, setScore] = useState(0)
    const [finished, setFinished] = useState(false)

    function restartGame() {
        setRun(false)
        let snake = new Snake(FIELD_SIZE, FIELD_SIZE, Math.floor(FIELD_SIZE / 2), Math.floor(FIELD_SIZE / 2))
        setSnake(snake)
        setSpeed(2)
        setPoint(generatePoint(snake.s))
        setDirection({dx: 1, dy: 0})
        setScore(0)
        setFinished(false)
    }

    function handleKey(key) {
        let d = {dx: 0, dy: 0}
        if (key.key === 'ArrowUp' || key.key === 'w') {
            d.dx = -1
        } else if (key.key === 'ArrowDown' || key.key === 's') {
            d.dx = 1
        } else if (key.key === 'ArrowLeft' || key.key === 'a') {
            d.dy = -1
        } else if (key.key === 'ArrowRight' || key.key === 'd') {
            d.dy = 1
        }
        handleDirection(d)
    }

    function handleDirection(d) {
        if (finished) {
            return
        }
        if (d.dx !== 0 || d.dy !== 0) {
            setDirection(direction => {
                if (isDirectionEquals(direction, d) || isDirectionOpposite(direction, d)) {
                    return direction
                }
                return d
            })
            setRun(true)
        }
    }

    useEffect(() => {
        if (finished) {
            return
        }
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('keydown', handleKey);
        };
    }, [finished]);

    useEffect(() => {
        if (run) {
            const interval = setInterval(() => {
                setStep(step => step + 1)
            }, 1000 / speed)
            return () => clearInterval(interval)
        }
    }, [speed, run, point])

    useEffect(() => {
        setSnake(snake => snake.move(direction.dx, direction.dy, p => p.x === point.x && p.y === point.y))
    }, [step])

    useEffect(() => {
        if (snake.s.at(-1).x === point.x && snake.s.at(-1).y === point.y) {
            setPoint(generatePoint(snake.s))
            setSpeed(s => Math.min(s + 1, MAX_SPEED))
            setScore(score => score + 1)
        }
        if (snake.isFinished()) {
            setFinished(true)
        }
    }, [snake])

    useEffect(() => {
        if (finished) {
            setRun(false)
        }
    }, [finished])

    const swipeHandlers = useSwipeable({
        onSwipedLeft: e => handleDirection({dx: 0, dy: -1}),
        onSwipedRight: e => handleDirection({dx: 0, dy: 1}),
        onSwipedUp: e => handleDirection({dx: -1, dy: 0}),
        onSwipedDown: e => handleDirection({dx: 1, dy: 0}),
        preventScrollOnSwipe: true,
        trackMouse: true
    })

    return (
        <div style={{textAlign: 'center'}}>
            <div className="mt-2 d-flex">
                <div className="ms-auto me-auto">
                    <Button variant="outline-secondary" className="me-1"
                            disabled={finished}
                            onClick={() => setRun(!run)}>{run ? "Pause" : "Start"}</Button>

                    <Button variant="secondary" className="ms-1" onClick={() => {
                        restartGame()
                    }}>Restart</Button>

                </div>

            </div>
            <div className="mt-2 ms-auto me-auto" style={{fontSize: 18}}>
                <b className="">score: </b>
                <label>{score}</label>
            </div>
            <div className="d-flex mt-2">
                <div className={`m-auto ${finished && "translucent"}`} {...swipeHandlers}>
                    <Field speed={speed} point={point} snake={snake} width={FIELD_SIZE} height={FIELD_SIZE}
                           blockSize={BLOCK_SIZE}/>
                </div>
                <div className={`m-auto ${!finished && "d-none"}`} style={{
                    position: "absolute",
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <label style={{fontSize: 30, fontWeight: 'bold'}} className="m-auto">Game over</label>
                </div>

            </div>

        </div>
    )

}


